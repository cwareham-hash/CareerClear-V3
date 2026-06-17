// Server-component layout so this client-component route can still set a
// per-route browser-tab title (a 'use client' page cannot export metadata).
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Career Quiz — Career Clear',
}

export default function QuestionnaireLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
