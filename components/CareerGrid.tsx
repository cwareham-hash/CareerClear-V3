'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search } from 'lucide-react'
import CareerCard from '@/components/CareerCard'
import {
  CAREERS,
  INDUSTRY_FILTERS,
  FUNCTION_FILTERS,
} from '@/lib/careers'
import type { IndustryCategory, FunctionCategory } from '@/lib/careers'
import { useFavorites } from '@/lib/useFavorites'

// ── Skeleton card shown before localStorage hydration ─────────────────────────

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
  const [completedCareerIds, setCompletedCareerIds]   = useState<Set<string>>(new Set())
  const [isHydrated, setIsHydrated]                   = useState(false)
  const { isFavorite, toggle }                        = useFavorites()

  // Load completed simulation indicators from localStorage on mount
  useEffect(() => {
    setIsHydrated(true)
    const completed = new Set<string>()
    CAREERS.forEach((career) => {
      if (career.hasSimulation) {
        try {
          const stored = localStorage.getItem(`cc_sim_${career.id}_completed`)
          if (stored) {
            const blocks = JSON.parse(stored) as string[]
            if (blocks.length > 0) completed.add(career.id)
          }
        } catch {
          // ignore
        }
      }
    })
    setCompletedCareerIds(completed)
  }, [])

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
  }

  const hasActiveFilters =
    search.length > 0 || industryFilters.length > 0 || functionFilters.length > 0

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

      return true
    })
  }, [search, industryFilters, functionFilters])

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

  return (
    <section className="bg-cream py-12 px-6">
      <div className="max-w-7xl mx-auto">

        {/* §5.2.2: Full-width search bar with magnifier icon */}
        <div className="relative mb-6">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search careers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search careers"
            className="
              w-full pl-11 pr-4 py-3 rounded-btn border border-border bg-white
              font-sans text-[15px] text-dark placeholder:text-muted
              outline-none focus:border-teal focus:ring-2 focus:ring-teal/20
              transition-colors duration-150
            "
          />
        </div>

        {/* §5.2.2: Horizontal filter pill row — Industry + Function groups */}
        {/* Decision: split into two labeled rows (Industry / Function) for
            clarity since the spec names both groups explicitly. A flat single
            row of 10 unlabeled pills would be harder to scan. */}
        <div className="mb-6 space-y-3">

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
        </div>

        {/* Results count + clear filters (§5.2.2, §7.6.6) */}
        <div className="flex items-center justify-between mb-6">
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
          /* Skeleton grid while waiting for localStorage */
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
    </section>
  )
}
