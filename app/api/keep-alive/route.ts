// app/api/keep-alive/route.ts — daily Supabase keep-alive, called by Vercel Cron.
//
// GET /api/keep-alive
//   Authorization: Bearer <CRON_SECRET>
//
// The free Supabase project pauses after 7 days of low database activity, which
// breaks login, progress, and audio on the live site. Vercel Cron calls this
// route once a day (schedule in vercel.json) and it runs one small read so the
// project stays active. When the CRON_SECRET environment variable is set on the
// Vercel project, Vercel Cron sends the Authorization header above by itself;
// any request without exactly that header gets a 401.
//
// The read is a head-only count on profiles: no row data is fetched, returned,
// or logged. The response carries only ok and a timestamp. Uses
// SUPABASE_SERVICE_ROLE_KEY server-side only, like the block-audio route.

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
// Never cache this route's Supabase call: a cached answer would skip the very
// database read that keeps the project awake (same setting as block-audio).
export const fetchCache = 'force-no-store'

export async function GET(req: NextRequest) {
  // 1. Only the cron (or someone holding the secret) may call this.
  const secret = process.env.CRON_SECRET
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ ok: false, error: 'Not configured.' }, { status: 500 })
  }

  // 2. One read-only query. head: true returns no rows, only a count, which
  //    is neither returned nor logged.
  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  const { error } = await admin.from('profiles').select('id', { count: 'exact', head: true })
  if (error) {
    return NextResponse.json({ ok: false, error: 'Database check failed.' }, { status: 502 })
  }

  // 3. A small, data-free answer.
  return NextResponse.json(
    { ok: true, checkedAt: new Date().toISOString() },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}
