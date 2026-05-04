import { Guitar, MapPin } from 'lucide-react'
import type { Musician } from '../types/musician.ts'

export function MusicianCard({ musician }: { musician: Musician }) {
  const location = [musician.city, musician.state, musician.country].filter(Boolean).join(', ')

  return (
    <div className="rounded-[1.25rem] border border-[var(--line)] bg-[var(--glass)] p-4 backdrop-blur-xl">
      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--sky-soft)] text-sm font-bold text-[var(--sky-deep)]">
          {musician.displayName.charAt(0)}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-bold text-[var(--ink)]">{musician.displayName}</div>
          <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
            <Guitar className="h-3 w-3" strokeWidth={2} />
            {musician.instrument}
          </div>
        </div>
      </div>

      {musician.bio && (
        <p className="mb-3 line-clamp-2 text-xs text-[var(--muted)]">{musician.bio}</p>
      )}

      <div className="flex flex-wrap gap-2 text-[0.7rem] text-[var(--muted)]">
        {musician.genres.map((g) => (
          <span key={g} className="rounded-full border border-[var(--line)] px-2 py-0.5">{g}</span>
        ))}
        {location && (
          <span className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] px-2 py-0.5">
            <MapPin className="h-3 w-3" strokeWidth={2} />
            {location}
          </span>
        )}
      </div>
    </div>
  )
}
