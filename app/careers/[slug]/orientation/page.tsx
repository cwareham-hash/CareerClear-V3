// Legacy career-level Orientation URL. Orientation is now per-project, so this
// route no longer renders a shared briefing — it redirects to the project
// chooser, where each project surfaces its own Orientation.
import { redirect } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export default function LegacyOrientationRedirect({ params }: Props) {
  redirect(`/careers/${params.slug}/simulate`)
}
