-- ============================================================================
-- Migration: scenario-scope progress & ratings (2026-06-14)
-- ============================================================================
-- Purpose: a career now has ONE shared Orientation plus MANY Scenarios, and each
-- Scenario owns its own Day-in-the-Life and Full Simulation. Progress and ratings
-- must therefore be tracked per scenario for those two tiers, while Orientation
-- stays tracked once at the career level (it is identical across every scenario).
--
-- Apply ONCE in the Supabase SQL Editor (Dashboard → SQL Editor → New query →
-- paste → Run) against the live project. Safe to re-run.
--
-- What this does:
--   1. Adds a nullable `scenario` column to user_progress and ratings.
--        - Orientation rows leave scenario = NULL (career-level, shared).
--        - Day-in-the-Life / Full rows store the scenario slug, e.g. 'fresca'.
--   2. Replaces the user_progress uniqueness rule so a row is unique per
--        (user, simulation, scenario, tier) instead of (user, simulation, tier).
--        It uses NULLS NOT DISTINCT (Postgres 15+, which Supabase runs) so the
--        Orientation rows — which have scenario = NULL — still collapse to exactly
--        one row per user and continue to upsert correctly.
--   3. ratings has no uniqueness rule (rating history is append-only), so it only
--        gets the new column.
--
-- This does NOT migrate or rescue any existing rows. Rows created under the old
-- (user, simulation, tier) scheme keep scenario = NULL, so old Day-in-the-Life
-- and Full progress is effectively detached/reset under the new scheme. That is
-- expected and accepted — we are not carrying old test data forward.
-- ============================================================================

-- 1. New column on both tables.
alter table public.user_progress add column if not exists scenario text;
alter table public.ratings        add column if not exists scenario text;

-- 2. Swap the user_progress uniqueness rule to include scenario.
--    Drop the old auto-named constraint and any prior run of the new one, then
--    add the scenario-aware constraint (NULLS NOT DISTINCT keeps Orientation —
--    scenario = NULL — unique per user/career/tier).
alter table public.user_progress
  drop constraint if exists user_progress_user_id_simulation_id_tier_key;
alter table public.user_progress
  drop constraint if exists user_progress_user_sim_scenario_tier_key;
alter table public.user_progress
  add  constraint user_progress_user_sim_scenario_tier_key
  unique nulls not distinct (user_id, simulation_id, scenario, tier);
