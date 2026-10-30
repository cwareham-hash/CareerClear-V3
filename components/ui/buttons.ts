// components/ui/buttons.ts — the shared button system (Wave A, Direction A
// "Refined", from the Oct 2026 visual audit style board).
//
// Every button and text-button on the site takes its classes from here.
//
// Why a class helper and not a <Button> component: each call site keeps its own
// element — a Next <Link>, a <button>, an <a>, or a <span> for a disabled look —
// with every href, onClick, ref, aria-* attribute, analytics call and native
// event listener exactly as it was. Only the className comes from here. That
// also means server components (the career page) can use it, and the portaled
// overlays' native listeners (see HtmlArtifact) never get wrapped or moved.
//
// Tailwind only generates classes it finds written out in full in the source,
// so every class below is a complete literal string. Never assemble one from
// pieces (no `bg-${color}`).

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'quiet'
export type ButtonSize = 'lg' | 'md' | 'inline'
export type ButtonSurface = 'light' | 'dark'

export interface ButtonOptions {
  /** primary = filled action teal · secondary = white with a grey border ·
   *  tertiary = action-teal text · quiet = muted text (back links, Close). */
  variant?: ButtonVariant
  /** lg = 48px tall (page-level CTAs) · md = 40px, 44px on phones (inline
   *  actions). `inline` is for tertiary/quiet links inside sentences and dense
   *  rows: it inherits the surrounding text size (pass e.g. `text-[13px]` in
   *  className to set one) and adds an invisible layer that pads the tap area
   *  to ~44px, so the row doesn't grow. */
  size?: ButtonSize
  /** 'dark' when the button sits on a navy background. */
  surface?: ButtonSurface
  /** Disabled look for elements that can't take the `disabled` attribute
   *  (a <span>, a link). A real <button disabled> gets it automatically. */
  disabled?: boolean
  fullWidth?: boolean
  /** Layout-only extras (margins, shrink-0, responsive width). Colours, sizes
   *  and padding belong to the variant and size above. */
  className?: string
}

const BASE =
  'group/btn inline-flex items-center justify-center gap-2 text-center leading-tight rounded-btn ' +
  'transition-[color,background-color,border-color,text-decoration-color,box-shadow] duration-150 ease-out ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'disabled:cursor-not-allowed'

// Filled and outlined buttons
const BOX_SIZE: Record<'lg' | 'md', string> = {
  // Slightly tighter side padding on phones so long labels stay on one line.
  lg: 'min-h-12 px-4 sm:px-[22px] py-2 text-[15px]',
  md: 'min-h-11 sm:min-h-10 px-4 py-2 text-[14px]',
}

// Text buttons (tertiary, quiet): same heights, narrow padding
const TEXT_SIZE: Record<ButtonSize, string> = {
  lg: 'min-h-12 px-1.5 text-[15px]',
  md: 'min-h-11 sm:min-h-10 px-1.5 text-[14px]',
  inline: "relative after:absolute after:-inset-x-2 after:-inset-y-3.5 after:content-['']",
}

// On cream / white. Hover always darkens or firms up; nothing fades.
const ON_LIGHT: Record<ButtonVariant, string> = {
  primary:
    'font-semibold border border-transparent bg-action text-white hover:bg-action-hover active:bg-action-press ' +
    'focus-visible:outline-teal disabled:bg-label disabled:text-muted',
  secondary:
    'font-semibold border border-line bg-white text-navy shadow-btn hover:border-action hover:bg-action-tint hover:text-action ' +
    'active:bg-tag-bg focus-visible:outline-teal disabled:border-border disabled:bg-label disabled:text-muted disabled:shadow-none',
  tertiary:
    'font-semibold text-action underline decoration-transparent decoration-2 underline-offset-[5px] ' +
    'hover:text-action-hover hover:decoration-current focus-visible:outline-teal disabled:text-muted disabled:decoration-transparent',
  quiet:
    'font-medium text-muted underline decoration-transparent decoration-2 underline-offset-[5px] ' +
    'hover:text-action hover:decoration-current focus-visible:outline-teal disabled:text-muted/60 disabled:decoration-transparent',
}

// On navy
const ON_DARK: Record<ButtonVariant, string> = {
  primary:
    'font-semibold border border-transparent bg-action-inverse text-action-inverse-ink hover:bg-action-inverse-hover ' +
    'focus-visible:outline-white',
  secondary:
    'font-semibold border border-white/[0.45] bg-transparent text-white hover:border-white hover:bg-white/[0.08] ' +
    'focus-visible:outline-white',
  tertiary:
    'font-semibold text-mint underline decoration-transparent decoration-2 underline-offset-[5px] ' +
    'hover:text-mint-hover hover:decoration-current focus-visible:outline-white',
  quiet:
    'font-medium text-white/70 underline decoration-transparent decoration-2 underline-offset-[5px] ' +
    'hover:text-white hover:decoration-current focus-visible:outline-white',
}

const DISABLED_LOOK = 'font-semibold border border-border bg-label text-muted cursor-not-allowed select-none'

export function buttonClasses({
  variant = 'primary',
  size = 'md',
  surface = 'light',
  disabled = false,
  fullWidth = false,
  className = '',
}: ButtonOptions = {}): string {
  const isText = variant === 'tertiary' || variant === 'quiet'
  const sizing = isText ? TEXT_SIZE[size] : BOX_SIZE[size === 'inline' ? 'md' : size]
  const look = disabled ? DISABLED_LOOK : (surface === 'dark' ? ON_DARK : ON_LIGHT)[variant]
  return [BASE, sizing, look, fullWidth ? 'w-full' : '', className].filter(Boolean).join(' ')
}

/** Add to a trailing arrow icon: it nudges 2px right while the button is hovered. */
export const BUTTON_ARROW = 'transition-transform duration-150 group-hover/btn:translate-x-0.5'

/** Icon sizes that match the two button sizes. */
export const BUTTON_ICON = { lg: 18, md: 16 } as const
