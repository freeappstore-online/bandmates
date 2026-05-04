import { Calendar, MapPin, Tag } from 'lucide-react'
import type { BandEvent } from '../types/event.ts'

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatEventType(t: string): string {
  return t.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export function EventCard({ event }: { event: BandEvent }) {
  const locationParts = [event.location?.venue, event.location?.city, event.location?.country].filter(Boolean)
  const locationStr = locationParts.join(', ') || 'TBD'

  return (
    <div className="rounded-[1.25rem] border border-[var(--line)] bg-[var(--glass)] p-4 backdrop-blur-xl">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <div className="text-sm font-bold text-[var(--ink)]">{event.title}</div>
          <div className="text-xs text-[var(--muted)]">{event.bandName}</div>
        </div>
        <span className="shrink-0 rounded-full border border-[var(--line)] bg-[var(--accent-soft)] px-2 py-0.5 text-[0.65rem] font-bold uppercase text-[var(--accent-deep)]">
          {formatEventType(event.eventType)}
        </span>
      </div>

      {event.description && (
        <p className="mb-3 line-clamp-2 text-xs text-[var(--muted)]">{event.description}</p>
      )}

      <div className="flex flex-wrap gap-2 text-[0.7rem] text-[var(--muted)]">
        <span className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] px-2 py-0.5">
          <Calendar className="h-3 w-3" strokeWidth={2} />
          {formatDate(event.startDate)}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] px-2 py-0.5">
          <MapPin className="h-3 w-3" strokeWidth={2} />
          {locationStr}
        </span>
        {event.price !== undefined && (
          <span className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] px-2 py-0.5">
            <Tag className="h-3 w-3" strokeWidth={2} />
            {event.price === 0 ? 'Free' : `${event.currency} ${event.price}`}
          </span>
        )}
      </div>
    </div>
  )
}
