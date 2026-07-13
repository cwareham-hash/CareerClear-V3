-- ============================================================================
-- Career Clear — Beta dashboard reference queries
-- ============================================================================
-- READ-ONLY. Both queries below are single SELECT statements that make NO
-- writes of any kind. Paste into the Supabase SQL Editor (Dashboard → SQL
-- Editor → New query) and Run. Save each as a named query so you can re-run it
-- with one click.
--
-- Scope: the Meridian scenario of the Management Consultant track
--   simulation_id = 'management-consultant', scenario = 'meridian'
--   tiers: 'orientation' (4 blocks), 'day-in-life' (6 blocks), 'full' (20 blocks)
--
-- Note: both queries read auth.users for email, which only works from the SQL
-- Editor's admin role — keep these for your eyes only, not the client app.
--
-- Note: career-quiz participation is NOT counted here. Quiz results live only in
-- the browser's localStorage (key cc_quiz_history), not in the database, so
-- there is nothing to query. Add a quiz column once the quiz-persistence build
-- lands and quiz attempts are written to Postgres.
-- ============================================================================


-- ────────────────────────────────────────────────────────────────────────────
-- QUERY 1 — Beta Dashboard: one row per signed-up user
-- ────────────────────────────────────────────────────────────────────────────
-- Every signed-up user (including those who never started, via LEFT JOIN) with
-- their Meridian progress per tier and their most recent activity. Ordered by
-- most recent activity first; never-started signups sink to the bottom so you
-- can see dead signups too.
select
  u.email,
  p.full_name,
  p.university,
  p.beta_access,
  p.created_at as signup_date,

  -- completed_blocks is a JSON array, so its length = number of blocks done.
  -- At most one row per (user, sim, scenario, tier), so max() surfaces that
  -- single row's value; coalesce turns "no row yet" into 0.
  coalesce(max(jsonb_array_length(up.completed_blocks))
           filter (where up.tier = 'orientation'), 0) as orientation_done,   -- out of 4
  coalesce(max(jsonb_array_length(up.completed_blocks))
           filter (where up.tier = 'day-in-life'), 0) as ditl_done,          -- out of 6
  coalesce(max(jsonb_array_length(up.completed_blocks))
           filter (where up.tier = 'full'), 0)        as full_done,          -- out of 20

  max(up.last_activity_at) as last_activity

from public.profiles p
join auth.users u on u.id = p.id
-- Meridian filter lives in the JOIN (not WHERE) so users who signed up but
-- never started still appear in the results.
left join public.user_progress up
       on up.user_id       = p.id
      and up.simulation_id  = 'management-consultant'
      and up.scenario       = 'meridian'
group by u.email, p.full_name, p.university, p.beta_access, p.created_at
order by last_activity desc nulls last;


-- ────────────────────────────────────────────────────────────────────────────
-- QUERY 2 — Beta Headline: single-row per-tier funnel
-- ────────────────────────────────────────────────────────────────────────────
-- Total signups, then a started/finished pair for each Meridian tier so you can
-- read drop-off across the funnel. "started" = at least one block done;
-- "finished" = all blocks in that tier done (orientation 4, DITL 6, full 20).
select
  (select count(*) from public.profiles) as total_signups,
  (select count(distinct user_id) from public.user_progress
     where simulation_id = 'management-consultant' and scenario = 'meridian'
       and tier = 'orientation' and jsonb_array_length(completed_blocks) > 0) as started_orientation,
  (select count(*) from public.user_progress
     where simulation_id = 'management-consultant' and scenario = 'meridian'
       and tier = 'orientation' and jsonb_array_length(completed_blocks) >= 4) as finished_orientation,
  (select count(distinct user_id) from public.user_progress
     where simulation_id = 'management-consultant' and scenario = 'meridian'
       and tier = 'day-in-life' and jsonb_array_length(completed_blocks) > 0) as started_ditl,
  (select count(*) from public.user_progress
     where simulation_id = 'management-consultant' and scenario = 'meridian'
       and tier = 'day-in-life' and jsonb_array_length(completed_blocks) >= 6) as finished_ditl,
  (select count(distinct user_id) from public.user_progress
     where simulation_id = 'management-consultant' and scenario = 'meridian'
       and tier = 'full' and jsonb_array_length(completed_blocks) > 0) as started_full,
  (select count(*) from public.user_progress
     where simulation_id = 'management-consultant' and scenario = 'meridian'
       and tier = 'full' and jsonb_array_length(completed_blocks) >= 20) as finished_full;
