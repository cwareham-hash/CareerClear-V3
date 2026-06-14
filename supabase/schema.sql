-- ============================================================================
-- Career Clear — Phase 2 database schema
-- ============================================================================
-- Run this ONCE in the Supabase SQL Editor (Dashboard → SQL Editor → New query
-- → paste → Run). It is written to be safely re-runnable: re-running it will
-- not drop your data, only re-assert tables, policies, and the signup trigger.
--
-- What this sets up:
--   • profiles        — one row per user, created automatically on signup
--   • user_progress   — which simulation activities a user has completed
--   • ratings         — post-simulation rating + written feedback
--   • favorites       — careers a user saved or is actively pursuing
--
-- Security model: Row Level Security (RLS) is ON for every table, so the
-- public anon key used by the browser can only ever read/write the logged-in
-- user's OWN rows. `beta_access` now DEFAULTS TO TRUE, so a new signup can open
-- simulations as soon as they log in — no manual flip required. It is still
-- locked against user modification: a user cannot change their own beta_access
-- (see the column-level grant below); only you (dashboard / service role) can.
-- ============================================================================


-- ───────────────────────────────────────────────────────────────────────────
-- 1. PROFILES
-- ───────────────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id          uuid        primary key references auth.users(id) on delete cascade,
  full_name   text,
  university  text,                          -- nullable / optional
  beta_access boolean     not null default true,   -- open beta: new signups get access automatically
  created_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- A user can read and edit ONLY their own profile row.
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

-- INSERT policy is a safety net; in practice the trigger below creates the row.
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  to authenticated
  with check (id = auth.uid());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- Lock down beta_access at the COLUMN level: Supabase grants authenticated
-- users UPDATE on new tables by default, so we revoke blanket UPDATE and
-- re-grant it for only the two columns a user is allowed to change. Any
-- attempt to UPDATE beta_access from the browser is rejected by Postgres
-- before RLS even runs. The service role (your dashboard) bypasses this.
revoke update on public.profiles from anon, authenticated;
grant  update (full_name, university) on public.profiles to authenticated;

-- Auto-create a profile row whenever a new auth user signs up. full_name and
-- university are read from the signup metadata the app passes through.
-- beta_access is set to TRUE explicitly here (matching the column default) so
-- new signups can open simulations immediately, with no manual flip.
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

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ───────────────────────────────────────────────────────────────────────────
-- 2. USER_PROGRESS
-- ───────────────────────────────────────────────────────────────────────────
-- One row per (user, simulation, tier). `tier` currently stores the numeric
-- duration as text ('10' | '30' | '120' | '300'); it will hold the experiential
-- tier names later without any schema change. completed_blocks is the list of
-- finished activity ids.
create table if not exists public.user_progress (
  id               uuid        primary key default gen_random_uuid(),
  user_id          uuid        not null references auth.users(id) on delete cascade,
  simulation_id    text        not null,
  tier             text        not null,
  completed_blocks jsonb       not null default '[]'::jsonb,
  is_completed     boolean     not null default false,
  completed_at     timestamptz,
  last_activity_at timestamptz not null default now(),
  unique (user_id, simulation_id, tier)
);

create index if not exists user_progress_user_id_idx on public.user_progress(user_id);

alter table public.user_progress enable row level security;

drop policy if exists "user_progress_select_own" on public.user_progress;
create policy "user_progress_select_own"
  on public.user_progress for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "user_progress_insert_own" on public.user_progress;
create policy "user_progress_insert_own"
  on public.user_progress for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "user_progress_update_own" on public.user_progress;
create policy "user_progress_update_own"
  on public.user_progress for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());


-- ───────────────────────────────────────────────────────────────────────────
-- 3. RATINGS
-- ───────────────────────────────────────────────────────────────────────────
create table if not exists public.ratings (
  id                   uuid        primary key default gen_random_uuid(),
  user_id              uuid        not null references auth.users(id) on delete cascade,
  simulation_id        text        not null,
  tier                 text        not null,
  score                int         not null check (score between 1 and 10),
  feedback_liked       text,
  feedback_disliked    text,
  feedback_questions   text,
  feedback_comparison  text,
  created_at           timestamptz not null default now()
);

create index if not exists ratings_user_id_idx on public.ratings(user_id);

alter table public.ratings enable row level security;

drop policy if exists "ratings_select_own" on public.ratings;
create policy "ratings_select_own"
  on public.ratings for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "ratings_insert_own" on public.ratings;
create policy "ratings_insert_own"
  on public.ratings for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "ratings_update_own" on public.ratings;
create policy "ratings_update_own"
  on public.ratings for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());


-- ───────────────────────────────────────────────────────────────────────────
-- 4. FAVORITES
-- ───────────────────────────────────────────────────────────────────────────
-- favorite_type is constrained to the two categories the UI uses. One row per
-- (user, career); changing category is an UPDATE, un-favoriting is a DELETE.
create table if not exists public.favorites (
  id            uuid        primary key default gen_random_uuid(),
  user_id       uuid        not null references auth.users(id) on delete cascade,
  career_id     text        not null,
  favorite_type text        not null check (favorite_type in ('saved_to_try', 'actively_pursuing')),
  created_at    timestamptz not null default now(),
  unique (user_id, career_id)
);

create index if not exists favorites_user_id_idx on public.favorites(user_id);

alter table public.favorites enable row level security;

drop policy if exists "favorites_select_own" on public.favorites;
create policy "favorites_select_own"
  on public.favorites for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "favorites_insert_own" on public.favorites;
create policy "favorites_insert_own"
  on public.favorites for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "favorites_update_own" on public.favorites;
create policy "favorites_update_own"
  on public.favorites for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- DELETE is required so a user can un-favorite a career (the heart toggle
-- removes the row, matching today's localStorage behavior).
drop policy if exists "favorites_delete_own" on public.favorites;
create policy "favorites_delete_own"
  on public.favorites for delete
  to authenticated
  using (user_id = auth.uid());

-- ============================================================================
-- End of schema.
-- ============================================================================
