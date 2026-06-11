// lib/supabase.ts — single shared Supabase client for the whole app.
//
// Every component/hook imports `supabase` from here, so there is exactly one
// client (and one auth session) in the browser. Credentials come from the
// NEXT_PUBLIC_* env vars (see .env.local locally, Vercel in production).

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Fail loudly during dev/build if the env vars are missing, rather than
// silently producing a broken client that errors on every request.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and ' +
      'NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local (local) and Vercel (deployed).',
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Keep the user logged in across page reloads and refresh tokens
    // automatically. Session lives in browser localStorage (client-only app).
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
