import { MapPin, Users, Music } from 'lucide-react'
import type { BandPublic } from '../types/band.ts'

export function BandCard({ band, onClick }: { band: BandPublic; onClick: (id: string) => void }) {
  const location = [band.bandCity, band.bandState, band.bandCountry].filter(Boolean).join(', ')

  return (
    <button
      type="button"
      onClick={() => onClick(band.id)}
      className="w-full rounded-[1.25rem] border border-[var(--line)] bg-[var(--glass)] p-4 text-left backdrop-blur-xl hover:border-[var(--line-strong)] hover:bg-[var(--glass-hover)] hover:shadow-[var(--shadow-card)]"
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-sm font-bold text-[var(--accent-deep)]">
          {band.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-bold text-[var(--ink)]">{band.name}</div>
          {band.tagline && <div className="truncate text-xs text-[var(--muted)]">{band.tagline}</div>}
        </div>
      </div>

      {band.description && (
        <p className="mb-3 line-clamp-2 text-xs text-[var(--muted)]">{band.description}</p>
      )}

      <div className="flex flex-wrap gap-2 text-[0.7rem] text-[var(--muted)]">
        {band.primaryGenre && (
          <span className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] px-2 py-0.5">
            <Music className="h-3 w-3" strokeWidth={2} />
            {band.primaryGenre}
          </span>
        )}
        {location && (
          <span className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] px-2 py-0.5">
            <MapPin className="h-3 w-3" strokeWidth={2} />
            {location}
          </span>
        )}
        {band.bandSize && (
          <span className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] px-2 py-0.5">
            <Users className="h-3 w-3" strokeWidth={2} />
            {band.bandSize}
          </span>
        )}
      </div>
    </button>
  )
}
