'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, SlidersHorizontal, ChevronDown, ChevronUp, ArrowUp } from 'lucide-react'
import CareerCard from '@/components/CareerCard'
import {
  CAREERS,
  INDUSTRY_FILTERS,
  FUNCTION_FILTERS,
} from '@/lib/careers'
import type { IndustryCategory, FunctionCategory } from '@/lib/careers'
import { useFavorites } from '@/lib/useFavorites'
import { useAuth } from '@/lib/auth'
import { getProgressByCareer } from '@/lib/userProgress'

// ── Skeleton card shown before hydration ──────────────────────────────────────

function CareerCardSkeleton() {
  return (
    <article className="bg-white rounded-card border border-border shadow-card overflow-hidden">
      {/* Teal top accent */}
      <div className="h-[4px] skeleton rounded-none" />
      <div className="p-5">
        {/* Row 1: emoji placeholder + heart placeholder */}
        <div className="flex items-center justify-between mb-3">
          <div className="w-8 h-8 skeleton rounded" />
          <div className="w-5 h-5 skeleton rounded" />
        </div>
        {/* Title */}
        <div className="h-4 w-3/4 skeleton rounded mb-3" />
        {/* Description lines */}
        <div className="h-3 w-full skeleton rounded mb-2" />
        <div className="h-3 w-5/6 skeleton rounded mb-4" />
        {/* Skill pills */}
        <div className="flex gap-2 mb-4">
          <div className="h-5 w-16 skeleton rounded-pill" />
          <div className="h-5 w-14 skeleton rounded-pill" />
          <div className="h-5 w-20 skeleton rounded-pill" />
        </div>
        {/* Bottom row */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex gap-2">
            <div className="h-5 w-20 skeleton rounded-pill" />
            <div className="h-5 w-24 skeleton rounded-pill" />
          </div>
          <div className="h-4 w-16 skeleton rounded" />
        </div>
      </div>
    </article>
  )
}

/**
 * §5.2.2 Career Grid
 *
 * Cream background section below hero containing:
 *  - Full-width search bar (magnifier icon, "Search careers..." placeholder)
 *  - Horizontal Industry + Function filter pills
 *  - Results count label ("X careers found")
 *  - Responsive grid: 3-col desktop / 2-col tablet / 1-col mobile
 *  - Empty state when no results (§7.6.6)
 */
export default function CareerGrid() {
  const [search, setSearch]                           = useState('')
  const [industryFilters, setIndustryFilters]         = useState<IndustryCategory[]>([])
  const [functionFilters, setFunctionFilters]         = useState<FunctionCategory[]>([])
  const [simOnly, setSimOnly]                         = useState(false)
  const [completedCareerIds, setCompletedCareerIds]   = useState<Set<string>>(new Set())
  const [isHydrated, setIsHydrated]                   = useState(false)
  // Mobile-only UI state: chips collapse behind a "Filters" button so the first
  // career cards fit in the first screen; a back-to-top button appears after
  // roughly two viewport-heights of scroll. Neither affects desktop (md+).
  const [filtersOpen, setFiltersOpen]                 = useState(false)
  const [showBackToTop, setShowBackToTop]             = useState(false)
  const { isFavorite, toggle }                        = useFavorites()
  const { user }                                      = useAuth()

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > window.innerHeight * 2)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // /explore?filter=simulations opens with the "Has simulation" filter already
  // active (the landing-page CTA links here). Read once on mount — deliberately
  // NOT re-applied later, so the user can still turn the filter off. Reading
  // window.location instead of useSearchParams keeps this statically
  // prerenderable without a Suspense boundary.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('filter') === 'simulations') setSimOnly(true)
  }, [])

  // Load "started a simulation" indicators from Supabase for the logged-in user.
  useEffect(() => {
    setIsHydrated(true)
    if (!user) {
      setCompletedCareerIds(new Set())
      return
    }
    let active = true
    ;(async () => {
      const progress = await getProgressByCareer(user.id)
      if (!active) return
      const started = new Set(
        Object.keys(progress).filter((careerId) => progress[careerId].length > 0),
      )
      setCompletedCareerIds(started)
    })()
    return () => { active = false }
  }, [user])

  // ── Filter pill toggle helpers ──────────────────────────────────────────────

  function toggleIndustry(filter: IndustryCategory) {
    setIndustryFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    )
  }

  function toggleFunction(filter: FunctionCategory) {
    setFunctionFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    )
  }

  function clearAll() {
    setSearch('')
    setIndustryFilters([])
    setFunctionFilters([])
    setSimOnly(false)
  }

  const hasActiveFilters =
    search.length > 0 || industryFilters.length > 0 || functionFilters.length > 0 || simOnly

  // Chip count for the mobile Filters button badge.
  const activeChipCount =
    industryFilters.length + functionFilters.length + (simOnly ? 1 : 0)

  // ── Derived filtered list ───────────────────────────────────────────────────

  const filteredCareers = useMemo(() => {
    return CAREERS.filter((career) => {
      // Text search across title, description, skills, industry
      if (search.trim()) {
        const q = search.toLowerCase()
        const matched =
          career.title.toLowerCase().includes(q) ||
          career.description.toLowerCase().includes(q) ||
          career.skills.some((s) => s.toLowerCase().includes(q)) ||
          career.industry.toLowerCase().includes(q)
        if (!matched) return false
      }

      // Industry filter (single industry per career; multi-select)
      if (industryFilters.length > 0 && !industryFilters.includes(career.industry)) {
        return false
      }

      // Function filter (career can have multiple; requires overlap)
      if (functionFilters.length > 0) {
        const overlap = career.functions.some((f) => functionFilters.includes(f))
        if (!overlap) return false
      }

      // "Has simulation" filter — same flag that gates the sim routes.
      if (simOnly && !career.hasSimulation) return false

      return true
    })
  }, [search, industryFilters, functionFilters, simOnly])

  // ── Shared pill class helper ────────────────────────────────────────────────

  function pillClass(active: boolean) {
    return [
      'px-3 py-1.5 rounded-pill text-[13px] font-medium transition-all duration-150',
      active
        // §7.6.5-inspired active state: navy bg, white text, teal border
        ? 'bg-navy text-white border border-teal'
        : 'bg-white text-dark border border-border hover:border-teal hover:text-teal',
    ].join(' ')
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  const simCareers = CAREERS.filter((c) => c.hasSimulation)

  return (
    <section className="bg-cream py-12 px-6 max-md:py-8">
      <div className="max-w-7xl mx-auto">

        {/* Featured strip — the two careers with built simulations, surfaced
            above the search/grid so they can't be missed. Reuses the standard
            CareerCard. Desktop: two cards side by side, width-capped so it stays
            a strip rather than a billboard. Mobile: one horizontally scrollable
            card row to protect the first-screen space Wave 1 reclaimed. */}
        <div className="mb-10 max-md:mb-5">
          <h2 className="font-serif text-[22px] font-bold text-navy leading-tight mb-1">
            Step into a simulation
          </h2>
          <p className="font-sans text-[13px] text-muted mb-4">
            These careers have full simulations — shadow a real week of the job, with audio.
          </p>
          <div
            className="md:grid md:grid-cols-2 md:gap-5 md:max-w-3xl
              max-md:flex max-md:gap-4 max-md:overflow-x-auto max-md:pb-2 max-md:-mx-6 max-md:px-6"
          >
            {simCareers.map((career) => (
              <div key={career.id} className="max-md:w-[300px] max-md:shrink-0">
                <CareerCard
                  career={career}
                  isFavorite={isFavorite(career.id)}
                  onToggleFavorite={() => toggle(career.id)}
                  isSimulated={completedCareerIds.has(career.id)}
                  simBadgePurple
                />
              </div>
            ))}
          </div>
        </div>

        {/* §5.2.2: Full-width search bar with magnifier icon.
            On mobile it sticks below the fixed navbar (h-16) while the grid
            scrolls; the -mx/px bleed keeps the cream backdrop edge-to-edge. */}
        <div
          className="mb-6 max-md:sticky max-md:top-16 max-md:z-20 max-md:bg-cream
            max-md:-mx-6 max-md:px-6 max-md:py-3 max-md:mb-3"
        >
          {/* Visible label — persists after the placeholder disappears.
              Styled like the Industry/Function filter group labels for consistency. */}
          <label
            htmlFor="career-search"
            className="block font-sans text-[11px] font-semibold text-muted
              uppercase tracking-wider mb-2"
          >
            Search careers
          </label>
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="career-search"
              type="search"
              placeholder="Search careers…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full pl-11 pr-4 py-3 rounded-btn border border-border bg-white
                font-sans text-[15px] text-dark placeholder:text-muted
                outline-none focus:border-teal focus:ring-2 focus:ring-teal/20
                transition-colors duration-150
              "
            />
          </div>
        </div>

        {/* Mobile-only "Filters" toggle — the chip rows below collapse behind it
            so career cards are reachable on the first screen. Count badge shows
            how many chips are active. Desktop always shows the chips. */}
        <div className="mb-3 md:hidden">
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            aria-controls="career-filters"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-btn border border-border
              bg-white font-sans text-[14px] font-medium text-dark hover:border-teal
              hover:text-teal transition-colors duration-150"
          >
            <SlidersHorizontal size={15} aria-hidden="true" />
            Filters
            {activeChipCount > 0 && (
              <span
                className="min-w-[20px] h-5 px-1.5 rounded-pill bg-teal text-white text-[12px]
                  font-semibold inline-flex items-center justify-center"
              >
                {activeChipCount}
              </span>
            )}
            {filtersOpen
              ? <ChevronUp size={15} aria-hidden="true" />
              : <ChevronDown size={15} aria-hidden="true" />}
          </button>
        </div>

        {/* §5.2.2: Horizontal filter pill row — Industry + Function groups */}
        {/* Decision: split into two labeled rows (Industry / Function) for
            clarity since the spec names both groups explicitly. A flat single
            row of 10 unlabeled pills would be harder to scan. */}
        <div
          id="career-filters"
          className={`mb-6 space-y-3 ${filtersOpen ? '' : 'max-md:hidden'}`}
        >

          {/* Industry filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="font-sans text-[11px] font-semibold text-muted
                uppercase tracking-wider shrink-0 w-16"
            >
              Industry
            </span>
            {INDUSTRY_FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => toggleIndustry(filter)}
                aria-pressed={industryFilters.includes(filter)}
                className={pillClass(industryFilters.includes(filter))}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Function filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="font-sans text-[11px] font-semibold text-muted
                uppercase tracking-wider shrink-0 w-16"
            >
              Function
            </span>
            {FUNCTION_FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => toggleFunction(filter)}
                aria-pressed={functionFilters.includes(filter)}
                className={pillClass(functionFilters.includes(filter))}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Experience filter — currently just the simulation flag */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="font-sans text-[11px] font-semibold text-muted
                uppercase tracking-wider shrink-0 w-16"
            >
              Experience
            </span>
            <button
              type="button"
              onClick={() => setSimOnly((v) => !v)}
              aria-pressed={simOnly}
              className={pillClass(simOnly)}
            >
              Has simulation
            </button>
          </div>
        </div>

        {/* Results count + clear filters (§5.2.2, §7.6.6) */}
        <div className="flex items-center justify-between mb-6 max-md:mb-4">
          <p className="font-sans text-[14px] text-muted">
            {filteredCareers.length === 0
              ? 'No careers match your search'
              : `${filteredCareers.length} career${filteredCareers.length !== 1 ? 's' : ''} found`}
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="font-sans text-[13px] font-medium text-teal
                hover:text-teal-light transition-colors duration-150"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Grid or empty state ────────────────────────────────────────────── */}

        {!isHydrated ? (
          /* Skeleton grid shown until the client has hydrated */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CareerCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredCareers.length > 0 ? (
          /*
           * §5.2.2 responsive grid:
           *   Mobile  (<768px): 1 column
           *   Tablet  (768–1023px): 2 columns  → md:
           *   Desktop (≥1024px): 3 columns     → lg:
           */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCareers.map((career) => (
              <CareerCard
                key={career.id}
                career={career}
                isFavorite={isFavorite(career.id)}
                onToggleFavorite={() => toggle(career.id)}
                isSimulated={completedCareerIds.has(career.id)}
              />
            ))}
          </div>
        ) : (
          /* §7.6.6 Empty state — no search results */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-[48px] mb-4 select-none" aria-hidden="true">
              🔍
            </div>
            <p className="font-sans font-semibold text-[16px] text-dark mb-1">
              No careers match your search
            </p>
            <p className="font-sans text-[14px] text-muted mb-4">
              Try adjusting your filters or search terms.
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="font-sans text-[14px] font-medium text-teal
                hover:text-teal-light transition-colors duration-150 underline
                underline-offset-2"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Mobile-only floating back-to-top — the grid runs very long on phones
          and the filters live at the top. z-30 keeps it under the navbar (z-40). */}
      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="md:hidden fixed bottom-5 right-5 z-30 w-11 h-11 rounded-full
            bg-navy text-white shadow-panel flex items-center justify-center"
        >
          <ArrowUp size={18} aria-hidden="true" />
        </button>
      )}
    </section>
  )
}
