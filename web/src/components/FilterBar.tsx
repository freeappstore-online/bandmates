import { Search, SlidersHorizontal } from 'lucide-react'

interface FilterBarProps {
  search: string
  onSearchChange: (v: string) => void
  genre: string
  onGenreChange: (v: string) => void
  location: string
  onLocationChange: (v: string) => void
  genres: string[]
  locations: string[]
}

export function FilterBar({ search, onSearchChange, genre, onGenreChange, location, onLocationChange, genres, locations }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex-1 min-w-[10rem]">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" strokeWidth={2} />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-full border border-[var(--line)] bg-[var(--glass)] py-2 pl-9 pr-3 text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-1">
        <SlidersHorizontal className="h-4 w-4 text-[var(--muted)]" strokeWidth={2} />
      </div>

      <select
        value={genre}
        onChange={(e) => onGenreChange(e.target.value)}
        className="rounded-full border border-[var(--line)] bg-[var(--glass)] px-3 py-2 text-xs font-semibold text-[var(--ink)] focus:outline-none"
      >
        <option value="">All Genres</option>
        {genres.map((g) => <option key={g} value={g}>{g}</option>)}
      </select>

      <select
        value={location}
        onChange={(e) => onLocationChange(e.target.value)}
        className="rounded-full border border-[var(--line)] bg-[var(--glass)] px-3 py-2 text-xs font-semibold text-[var(--ink)] focus:outline-none"
      >
        <option value="">All Locations</option>
        {locations.map((l) => <option key={l} value={l}>{l}</option>)}
      </select>
    </div>
  )
}
