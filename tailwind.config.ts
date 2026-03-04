import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── §7.5.1 Color Palette ──────────────────────────────────────────
      colors: {
        navy:    '#1a2744',
        teal: {
          DEFAULT: '#2a9d8f',
          light:   '#3db89a',
        },
        cream:   '#f8f6f1',
        dark:    '#111827',
        muted:   '#6b7280',
        border:  '#e5e7eb',
        gold:    '#d4a017',
        'tag-bg': '#e6f4f2',
        // Used only for time block left-border color coding (§7.6.2)
        'block-green':  '#22c55e',
        'block-purple': '#8b5cf6',
      },

      // ── §7.5.2 Typography ─────────────────────────────────────────────
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:  ['var(--font-inter)',    'system-ui', 'sans-serif'],
        mono:  ['var(--font-jetbrains)', 'Menlo', 'monospace'],
      },

      // ── §7.5.4 Border Radius ──────────────────────────────────────────
      // Tailwind defaults already cover all spec values:
      //   rounded-xl   = 12px   (cards)
      //   rounded-lg   = 8px    (buttons, inputs)
      //   rounded-full = 9999px (pills, badges)
      //   rounded-2xl  = 16px   (modals, panels)
      // Named aliases added for explicit spec alignment:
      borderRadius: {
        card:  '12px',
        btn:   '8px',
        pill:  '9999px',
        modal: '16px',
      },

      // ── §7.5.5 Shadows & Elevation ────────────────────────────────────
      boxShadow: {
        'card':       '0 1px 3px rgba(0,0,0,0.08)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.12)',
        'panel':      '0 20px 60px rgba(0,0,0,0.20)',
        'nav':        '0 2px 8px rgba(0,0,0,0.08)',
      },

      // ── §7.5.3 Spacing Scale (base 4px) ──────────────────────────────
      // Tailwind's default spacing scale already uses 4px base:
      //   1=4px  2=8px  4=16px  6=24px  8=32px  12=48px  16=64px  ✓
      // No custom overrides needed.
    },
  },
  plugins: [],
}

export default config
