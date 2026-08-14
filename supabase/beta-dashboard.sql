-- ============================================================================
-- Career Clear — Beta dashboard reference queries
-- ============================================================================
-- These mirror the two saved queries in the Supabase SQL Editor:
--   "REPORT - Beta Dashboard"  (per user)
--   "REPORT - Beta Headline"   (funnel)
-- Last updated Aug 14, 2026 to add quiz_results columns. Keep this file and the
-- saved queries in step: edit one, edit the other.
--
-- READ-ONLY. Both are single SELECT statements that make NO writes. Both read
-- auth.users for email, which only works from the SQL Editor's admin role —
-- keep them for your eyes only, not the client app.
--
-- Scope: Meridian (Management Consultant) and Kestrel (Investment Banking).
-- ============================================================================


-- ============================================================
-- REPORT - Beta Dashboard (per user)
-- ============================================================
select
  u.email,
  p.full_name,
  p.university,
  p.beta_access,
  p.created_at as signup_date,
  coalesce(max(jsonb_array_length(up.completed_blocks)) filter (
    where up.simulation_id = 'management-consultant' and up.tier = 'orientation'), 0) as mc_orientation,
  coalesce(max(jsonb_array_length(up.completed_blocks)) filter (
    where up.simulation_id = 'management-consultant' and up.tier = 'day-in-life'), 0) as mc_ditl,
  coalesce(max(jsonb_array_length(up.completed_blocks)) filter (
    where up.simulation_id = 'management-consultant' and up.tier = 'full'), 0) as mc_full,
  coalesce(max(jsonb_array_length(up.completed_blocks)) filter (
    where up.simulation_id = 'ib-analyst' and up.tier = 'orientation'), 0) as ib_orientation,
  coalesce(max(jsonb_array_length(up.completed_blocks)) filter (
    where up.simulation_id = 'ib-analyst' and up.tier = 'day-in-life'), 0) as ib_ditl,
  coalesce(max(jsonb_array_length(up.completed_blocks)) filter (
    where up.simulation_id = 'ib-analyst' and up.tier = 'full'), 0) as ib_full,
  coalesce(q.quiz_attempts, 0) as quiz_attempts,
  q.last_quiz_at,
  max(up.last_activity_at) as last_activity
from public.profiles p
join auth.users u on u.id = p.id
left join public.user_progress up
       on up.user_id = p.id
      and (
            (up.simulation_id = 'management-consultant' and up.scenario = 'meridian')
         or (up.simulation_id = 'ib-analyst'            and up.scenario = 'kestrel')
          )
left join (
  select user_id, count(*) as quiz_attempts, max(taken_at) as last_quiz_at
  from public.quiz_results
  group by user_id
) q on q.user_id = p.id
group by u.email, p.full_name, p.university, p.beta_access, p.created_at,
         q.quiz_attempts, q.last_quiz_at
order by last_activity desc nulls last;


-- ============================================================
-- REPORT - Beta Headline (funnel)
-- ============================================================
with sims (ord, label, sim_id, scenario, orientation_total, ditl_total, full_total) as (
  values
    (1, 'Management Consulting (Meridian)', 'management-consultant', 'meridian', 4, 6, 20),
    (2, 'Investment Banking (Kestrel)',      'ib-analyst',            'kestrel',  4, 5, 19)
)
select
  s.label as simulation,
  (select count(*) from public.profiles) as total_signups,
  count(distinct up.user_id) filter (
    where up.tier = 'orientation' and jsonb_array_length(up.completed_blocks) > 0
  ) as started_orientation,
  count(distinct up.user_id) filter (
    where up.tier = 'orientation' and jsonb_array_length(up.completed_blocks) >= s.orientation_total
  ) as finished_orientation,
  count(distinct up.user_id) filter (
    where up.tier = 'day-in-life' and jsonb_array_length(up.completed_blocks) > 0
  ) as started_ditl,
  count(distinct up.user_id) filter (
    where up.tier = 'day-in-life' and jsonb_array_length(up.completed_blocks) >= s.ditl_total
  ) as finished_ditl,
  count(distinct up.user_id) filter (
    where up.tier = 'full' and jsonb_array_length(up.completed_blocks) > 0
  ) as started_full,
  count(distinct up.user_id) filter (
    where up.tier = 'full' and jsonb_array_length(up.completed_blocks) >= s.full_total
  ) as finished_full
from sims s
left join public.user_progress up
       on up.simulation_id = s.sim_id
      and up.scenario      = s.scenario
group by s.ord, s.label, s.orientation_total, s.ditl_total, s.full_total

union all

select
  'Career Quiz (saved attempts)' as simulation,
  (select count(*) from public.profiles) as total_signups,
  (select count(distinct user_id) from public.quiz_results),
  (select count(*) from public.quiz_results),
  null, null, null, null
order by simulation;
