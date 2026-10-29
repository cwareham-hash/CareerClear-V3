// Narration-length labels ("9 min") for a block, from lib/audioDurations.ts.
// Blocks without audio render no label. Screen readers hear "about 9 minutes"
// rather than the abbreviation.
import { formatTimeRange, type TimeBlock } from '@/lib/simulation'
import { blockMinutes, isReadingEstimate } from '@/lib/audioTime'

function Minutes({ minutes, afterTime = false }: { minutes: number; afterTime?: boolean }) {
  return (
    <>
      <span aria-hidden="true">{minutes} min</span>
      <span className="sr-only">
        {afterTime ? ', ' : ''}about {minutes} {minutes === 1 ? 'minute' : 'minutes'}
      </span>
    </>
  )
}

/** Just the length, e.g. "9 min". Renders nothing for a block without audio. */
export default function BlockDuration({ blockId }: { blockId: string }) {
  const minutes = blockMinutes(blockId)
  return minutes === null ? null : <Minutes minutes={minutes} />
}

/**
 * A block's time line: its time range followed by " · 9 min". On Orientation
 * readings the authored "~3 min read" estimate is replaced by the real length.
 */
export function BlockTimeLabel({ block }: { block: TimeBlock }) {
  const minutes = blockMinutes(block.id)
  if (isReadingEstimate(block.timeRange)) {
    return minutes === null ? null : <Minutes minutes={minutes} />
  }
  return (
    <>
      {formatTimeRange(block.timeRange)}
      {minutes !== null && (
        <>
          {' '}
          <span className="whitespace-nowrap">
            <span aria-hidden="true">· </span>
            <Minutes minutes={minutes} afterTime />
          </span>
        </>
      )}
    </>
  )
}
