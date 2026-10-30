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
        gold: {
          DEFAULT: '#d4a017',
          tint:    '#faf2dc', // "In progress" status badge background
          ink:     '#7a5a00', // its text, 5.7:1 on the tint
        },
        'tag-bg': '#e6f4f2',
        // Used only for time block left-border color coding (§7.6.2)
        'block-green':  '#22c55e',
        'block-purple': '#8b5cf6',
        'block-coral':  '#e76f51',

        // ── Wave A button system (Oct 2026) ─────────────────────────────
        // Buttons and text links use this deeper teal: white text passes WCAG
        // AA in every state (5.16:1 default, 6.77:1 hover, 8.86:1 pressed).
        // The brand teal above stays for accents: borders, icons, progress.
        action: {
          DEFAULT: '#1f7a6f',
          hover:   '#19665d',
          press:   '#14534c',
          tint:    '#f3faf8', // secondary button hover fill
        },
        // Primary buttons on navy backgrounds: light teal fill, navy ink text
        // (6.96:1 default, 8.50:1 hover).
        'action-inverse': {
          DEFAULT: '#3db89a',
          hover:   '#5cc9ad',
          ink:     '#0f1b33',
        },
        mint: {
          DEFAULT: '#8ee3cd', // tertiary links on navy (9.9:1)
          hover:   '#c4f3e6',
        },
        line: '#c3cad2', // secondary button border
        // Simulation badge: purple everywhere, never teal (teal = clickable).
        sim: {
          DEFAULT: '#8b5cf6', // dot
          ink:     '#6d28d9', // text, 6.29:1 on the tint
          tint:    '#f3effe',
        },
        // Non-clickable labels (skills, industry, categories): neutral grey.
        label: {
          DEFAULT: '#eef1f4',
          ink:     '#374151',
        },
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
        // Wave A: secondary button lift, and the hairline drawn inside outline
        // badges (an inset shadow, so outlined and filled badges match height).
        'btn':        '0 1px 2px rgba(16,24,40,0.06)',
        'label-line': 'inset 0 0 0 1px #d6dbe1',
      },

      // Wave A: any bare `ring` focus style is brand teal at full strength
      // (Tailwind's default was a 50% blue).
      ringColor: {
        DEFAULT: '#2a9d8f',
      },
      ringOpacity: {
        DEFAULT: '1',
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
