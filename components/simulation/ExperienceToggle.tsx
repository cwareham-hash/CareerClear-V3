'use client'

// In-project experience toggle: Day in the Life vs Full Simulation for the SAME
// project. Orientation is NOT here — it is a separate career-level destination.
import { useState } from 'react'

export type Experience = 'day-in-life' | 'full'

const OPTIONS: { value: Experience; display: string; label: string }[] = [
  { value: 'day-in-life', display: 'Day in the Life', label: 'One representative day'   },
  { value: 'full',        display: 'Full Simulation', label: 'Complete multi-day arc'  },
]

interface Props {
  selected: Experience
  onChange: (value: Experience) => void
}

export default function ExperienceToggle({ selected, onChange }: Props) {
  const [hoveredValue, setHoveredValue] = useState<Experience | null>(null)

  return (
    <div className="flex items-stretch gap-2">
      {OPTIONS.map(({ value, display, label }) => {
        const active    = selected === value
        const isHovered = !active && hoveredValue === value
        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            onMouseEnter={() => setHoveredValue(value)}
            onMouseLeave={() => setHoveredValue(null)}
            className="flex-1 flex flex-col items-center justify-center px-3 py-3 rounded-btn border
              font-sans transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/30"
            style={
              active
                ? { backgroundColor: 'var(--color-navy)', color: '#ffffff', borderColor: 'var(--color-teal)' }
                : isHovered
                ? { backgroundColor: '#ffffff', color: 'var(--color-teal)', borderColor: 'var(--color-teal)' }
                : { backgroundColor: '#ffffff', color: 'var(--color-dark-text)', borderColor: 'var(--color-border)' }
            }
            aria-pressed={active}
          >
            <span className="font-bold text-[14px] leading-tight">{display}</span>
            <span
              className="text-[11px] leading-tight mt-0.5"
              style={{ color: active ? 'rgba(255,255,255,0.75)' : isHovered ? 'var(--color-teal)' : 'var(--color-muted)' }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
