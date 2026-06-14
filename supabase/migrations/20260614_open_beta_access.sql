-- ============================================================================
-- Migration: open beta access (2026-06-14)
-- ============================================================================
-- Purpose: new signups should get beta_access = true automatically, removing
-- the manual per-user flip in the Supabase dashboard.
--
-- Apply ONCE in the Supabase SQL Editor (Dashboard → SQL Editor → New query →
-- paste → Run) against the live project. Safe to re-run.
--
-- This does TWO things:
--   1. Changes the profiles.beta_access column default to TRUE (affects future
--      inserts that don't specify a value).
--   2. Replaces the signup trigger so it sets beta_access = true explicitly,
--      so the profile-creation logic and the column default agree.
--
-- It intentionally does NOT touch existing rows — accounts already in the table
-- keep whatever beta_access they currently have. (If you ever DO want to grant
-- access to everyone retroactively, the optional backfill at the bottom does
-- that; it is commented out on purpose.)
-- ============================================================================

-- 1. New default for the column.
alter table public.profiles
  alter column beta_access set default true;

-- 2. Trigger sets beta_access explicitly on signup.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, university, beta_access)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'university',
    true
  );
  return new;
end;
$$;

-- ── Optional, NOT run by default ────────────────────────────────────────────
-- Grant access to all EXISTING accounts too (uncomment only if you want this):
-- update public.profiles set beta_access = true where beta_access = false;
