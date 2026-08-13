-- ============================================================================
-- Career Clear — quiz_results table
-- ============================================================================
-- ALREADY RUN AGAINST PRODUCTION ON 2026-08-13. This file exists as a RECORD of
-- the schema the app expects, not as a migration to execute. Do NOT re-run it
-- against the live database.
--
-- PROVENANCE: the table was created directly in the Supabase SQL Editor, so
-- this file is a reconstruction of that schema from the column list and the
-- behavior verified against the live table — not a dump of the original DDL.
-- If the authoritative SQL still exists, diff it against this file and let this
-- one lose.
--
-- What it stores: one row per completed quiz attempt. The app writes attempts
-- for signed-in users at the moment they finish, and copies attempts taken
-- anonymously into the account when that visitor later signs up or logs in on
-- the same browser (preserving the original taken_at). See lib/quizResults.ts.
--
-- KEEP-ALL BY DESIGN: there are deliberately NO update and NO delete policies.
-- Every attempt is a new row, so a user can see how their results shifted over
-- time. Do not add update/delete policies without revisiting that decision.
-- ============================================================================

create table if not exists public.quiz_results (
  id                  uuid        primary key default gen_random_uuid(),
  user_id             uuid        not null references auth.users(id) on delete cascade,
  answers             jsonb       not null,   -- { questionId: selectedOptionValue }
  recommended_careers jsonb       not null,   -- [{ careerId, matchPct }], sorted best-first, top 20
  quiz_version        text        not null default 'v1',
  taken_at            timestamptz not null default now(),  -- when the quiz was COMPLETED
  created_at          timestamptz not null default now()   -- when the row was written
);

alter table public.quiz_results enable row level security;

-- A user can read ONLY their own attempts.
drop policy if exists "quiz_results_select_own" on public.quiz_results;
create policy "quiz_results_select_own"
  on public.quiz_results for select
  to authenticated
  using (user_id = auth.uid());

-- A user can insert ONLY their own attempts. This is the sole write path:
-- direct saves on completion and claimed anonymous attempts both land here.
drop policy if exists "quiz_results_insert_own" on public.quiz_results;
create policy "quiz_results_insert_own"
  on public.quiz_results for insert
  to authenticated
  with check (user_id = auth.uid());

-- No update policy and no delete policy — intentional. See the header.

-- The dashboard reads a single user's attempts newest-first.
create index if not exists quiz_results_user_taken_at_idx
  on public.quiz_results (user_id, taken_at desc);
