-- ============================================================================
-- Career Clear — quiz_results table
-- ============================================================================
-- ALREADY RUN AGAINST PRODUCTION ON 2026-08-13. This file exists as a RECORD of
-- the schema the app expects, not as a migration to execute. Do NOT re-run it
-- against the live database — `create table` (no `if not exists`) and the
-- policy statements will error against the existing table.
--
-- What it stores: one row per completed quiz attempt. The app writes attempts
-- for signed-in users at the moment they finish, and copies attempts taken
-- anonymously into the account when that visitor later signs up or logs in on
-- the same browser (preserving the original taken_at). See lib/quizResults.ts.
--
-- KEEP-ALL BY DESIGN: there are deliberately NO update and NO delete policies.
-- Every attempt is a new row, so a user can see how their results shifted over
-- time. Do not add update/delete policies without revisiting that decision.
--
-- Note that taken_at has NO default: the app always supplies it, which is what
-- lets a claimed anonymous attempt keep its original completion time rather
-- than the moment it was copied across.
-- ============================================================================

-- Quiz results: one row per completed quiz attempt, keep-all, no updates or deletes.
create table public.quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  answers jsonb not null,
  recommended_careers jsonb not null,
  quiz_version text not null default 'v1',
  taken_at timestamptz not null,
  created_at timestamptz not null default now()
);

-- Fast lookup of a user's history, newest first.
create index quiz_results_user_taken_idx
  on public.quiz_results (user_id, taken_at desc);

-- Row Level Security: users see and write only their own rows.
alter table public.quiz_results enable row level security;

create policy "Users can read own quiz results"
  on public.quiz_results for select
  using (auth.uid() = user_id);

create policy "Users can insert own quiz results"
  on public.quiz_results for insert
  with check (auth.uid() = user_id);

-- Deliberately NO update or delete policies: keep-all is enforced at the database level.
