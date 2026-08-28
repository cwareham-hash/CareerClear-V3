// app/api/block-audio/[blockId]/route.ts — signed streaming access to block audio.
//
// GET /api/block-audio/<blockId>
//   Authorization: Bearer <supabase access token from the browser session>
//
// Auth model: the app keeps its Supabase session in the browser (lib/supabase.ts),
// so the caller proves who they are by sending their session's access token. The
// server verifies the token, checks profiles.beta_access (the same gate the
// simulation UI uses), and only then mints a short-lived signed URL for the
// block's audio in the PRIVATE `block-audio` Storage bucket, returned together
// with the stitch-timestamp metadata. Callers who are logged out or lack beta
// access get an error and never a URL.
//
// The Storage bucket is private and this route runs server-side only: it uses
// SUPABASE_SERVICE_ROLE_KEY (no NEXT_PUBLIC_ prefix — never exposed to the
// browser, set in .env.local locally and Vercel in production).

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const BUCKET = 'block-audio'
// Signed URLs die after roughly an hour — long enough for any listening
// session, short enough that a leaked link goes stale quickly.
const SIGNED_URL_SECONDS = 60 * 60

export async function GET(
  req: NextRequest,
  { params }: { params: { blockId: string } },
) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) {
    // Server not configured for audio (e.g. env var missing) — never a URL.
    return NextResponse.json({ error: 'Audio is not available.' }, { status: 500 })
  }

  // Server-side client with the service key. Created per request and never
  // persisted — this is not the shared browser client from lib/supabase.ts.
  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  // 1. Who is calling? Verify the browser session's access token.
  const authHeader = req.headers.get('authorization') ?? ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice('Bearer '.length) : ''
  if (!token) {
    return NextResponse.json({ error: 'You must be logged in.' }, { status: 401 })
  }
  const { data: userData, error: userError } = await admin.auth.getUser(token)
  if (userError || !userData.user) {
    return NextResponse.json({ error: 'You must be logged in.' }, { status: 401 })
  }

  // 2. Same access rule as simulations: profiles.beta_access must be true.
  const { data: profile } = await admin
    .from('profiles')
    .select('beta_access')
    .eq('id', userData.user.id)
    .maybeSingle()
  if (!profile?.beta_access) {
    return NextResponse.json({ error: 'Beta access is required.' }, { status: 403 })
  }

  // 3. Look up the block's audio. Block ids are frozen kebab-case slugs.
  const blockId = params.blockId
  if (!/^[a-z0-9-]+$/.test(blockId)) {
    return NextResponse.json({ error: 'Invalid block id.' }, { status: 400 })
  }

  const { data: files, error: listError } = await admin.storage.from(BUCKET).list(blockId)
  if (listError) {
    return NextResponse.json({ error: 'Audio storage is unavailable.' }, { status: 502 })
  }
  const hasAudio = (files ?? []).some((f) => f.name === 'audio.mp3')
  if (!hasAudio) {
    // Clean "no audio" answer — the player shows nothing for these blocks.
    return NextResponse.json({ audio: false }, { status: 200 })
  }

  // 4. Mint the short-lived signed URL.
  const { data: signed, error: signError } = await admin.storage
    .from(BUCKET)
    .createSignedUrl(`${blockId}/audio.mp3`, SIGNED_URL_SECONDS)
  if (signError || !signed?.signedUrl) {
    return NextResponse.json({ error: 'Could not create an audio link.' }, { status: 502 })
  }

  // 5. Attach the stitch-timestamp metadata (segment voices + start times).
  //    Missing/corrupt metadata degrades to null rather than blocking playback.
  let timestamps: unknown = null
  const { data: metaFile } = await admin.storage
    .from(BUCKET)
    .download(`${blockId}/timestamps.json`)
  if (metaFile) {
    try {
      timestamps = JSON.parse(await metaFile.text())
    } catch {
      timestamps = null
    }
  }

  return NextResponse.json({
    audio: true,
    url: signed.signedUrl,
    expiresInSeconds: SIGNED_URL_SECONDS,
    timestamps,
  })
}
