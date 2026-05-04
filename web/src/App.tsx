import { useState, useMemo, useCallback, useEffect } from 'react'
import { Music2, CalendarDays, Users2, ExternalLink } from 'lucide-react'
import { BandCard } from './components/BandCard.tsx'
import { EventCard } from './components/EventCard.tsx'
import { MusicianCard } from './components/MusicianCard.tsx'
import { FilterBar } from './components/FilterBar.tsx'
import { mockBands } from './data/mockBands.ts'
import { mockEvents } from './data/mockEvents.ts'
import { mockMusicians } from './data/mockMusicians.ts'

type Tab = 'bands' | 'events' | 'musicians'

const TABS: { key: Tab; label: string }[] = [
  { key: 'bands', label: 'Bands' },
  { key: 'events', label: 'Events' },
  { key: 'musicians', label: 'Musicians' },
]

const PATH_TO_TAB: Record<string, Tab> = {
  '/': 'bands',
  '/bands': 'bands',
  '/events': 'events',
  '/musicians': 'musicians',
}

function getTabFromPath(): Tab {
  return PATH_TO_TAB[window.location.pathname] ?? 'bands'
}

export default function App() {
  const [tab, setTab] = useState<Tab>(getTabFromPath)
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('')
  const [location, setLocation] = useState('')

  const navigate = useCallback((t: Tab) => {
    setTab(t)
    setSearch('')
    setGenre('')
    setLocation('')
    window.history.pushState(null, '', `/${t}`)
  }, [])

  useEffect(() => {
    const onPop = () => setTab(getTabFromPath())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const genres = useMemo(() => {
    const set = new Set<string>()
    mockBands.forEach((b) => { if (b.primaryGenre) set.add(b.primaryGenre) })
    mockMusicians.forEach((m) => m.genres.forEach((g) => set.add(g)))
    return Array.from(set).sort()
  }, [])

  const locations = useMemo(() => {
    const set = new Set<string>()
    mockBands.forEach((b) => { if (b.bandCity) set.add(b.bandCity) })
    mockMusicians.forEach((m) => { if (m.city) set.add(m.city) })
    mockEvents.forEach((e) => { if (e.location?.city) set.add(e.location.city) })
    return Array.from(set).sort()
  }, [])

  const filteredBands = useMemo(() => {
    return mockBands.filter((b) => {
      if (search && !b.name.toLowerCase().includes(search.toLowerCase()) && !b.description?.toLowerCase().includes(search.toLowerCase())) return false
      if (genre && b.primaryGenre !== genre) return false
      if (location && b.bandCity !== location) return false
      return true
    })
  }, [search, genre, location])

  const filteredEvents = useMemo(() => {
    return mockEvents.filter((e) => {
      if (search && !e.title.toLowerCase().includes(search.toLowerCase()) && !e.bandName.toLowerCase().includes(search.toLowerCase())) return false
      if (location && e.location?.city !== location) return false
      return true
    })
  }, [search, location])

  const filteredMusicians = useMemo(() => {
    return mockMusicians.filter((m) => {
      if (search && !m.displayName.toLowerCase().includes(search.toLowerCase()) && !m.instrument.toLowerCase().includes(search.toLowerCase())) return false
      if (genre && !m.genres.includes(genre)) return false
      if (location && m.city !== location) return false
      return true
    })
  }, [search, genre, location])

  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-18%] top-[-8%] h-72 w-72 rounded-full bg-[var(--accent-soft)]/35 blur-3xl lg:h-[34rem] lg:w-[34rem]" />
        <div className="absolute right-[-14%] top-[18%] h-72 w-72 rounded-full bg-[var(--sky-soft)]/30 blur-3xl lg:top-[-2%] lg:h-[28rem] lg:w-[28rem]" />
        <div className="absolute bottom-[-10%] left-[10%] h-80 w-80 rounded-full bg-[var(--mint-soft)]/25 blur-3xl lg:left-[45%] lg:h-[26rem] lg:w-[26rem]" />
      </div>

      <div className="relative mx-auto flex min-h-[100dvh] max-w-[1540px] flex-col px-2 pt-1 pb-14 sm:px-4 lg:px-8 lg:py-8">
        <div className="flex flex-1 flex-col lg:grid lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-7">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:flex lg:min-h-[calc(100dvh-4rem)] lg:flex-col lg:gap-5 lg:rounded-[2rem] lg:border lg:border-[var(--line)] lg:bg-[var(--glass-strong)] lg:p-6 lg:shadow-[var(--shadow-soft)] lg:backdrop-blur-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-[var(--glass)] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[var(--accent-deep)]">
              <Music2 className="h-4 w-4" strokeWidth={2} />
              FreeBandmates
            </div>

            <nav className="space-y-1">
              {TABS.map((item) => (
                <button
                  key={item.key}
                  className={`w-full rounded-[1rem] px-4 py-3 text-left text-sm font-semibold transition duration-200 ${
                    tab === item.key
                      ? 'border border-[var(--accent-soft)] bg-[var(--accent-gradient)] text-[var(--ink)] shadow-[var(--shadow-card)]'
                      : 'border border-transparent text-[var(--muted)] hover:bg-[var(--glass-hover)] hover:text-[var(--ink)]'
                  }`}
                  onClick={() => navigate(item.key)}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="mt-auto space-y-3">
              <a
                href="https://freeappstore.online"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--glass-soft)] px-3 py-1.5 text-[0.7rem] font-semibold text-[var(--muted)] hover:text-[var(--ink)]"
              >
                <ExternalLink className="h-3 w-3" strokeWidth={2} />
                Part of FreeAppStore
              </a>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex min-w-0 flex-1 flex-col">
            {/* Mobile header */}
            <header className="mb-3 flex items-center justify-between lg:hidden">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-[var(--glass)] px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-[var(--accent-deep)]">
                <Music2 className="h-3.5 w-3.5" strokeWidth={2} />
                FreeBandmates
              </div>
              <a
                href="https://freeappstore.online"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.65rem] font-semibold text-[var(--muted)]"
              >
                FreeAppStore
              </a>
            </header>

            <section className="flex flex-1 flex-col rounded-[1.25rem] bg-[var(--panel-quiet)] p-3 backdrop-blur-xl sm:p-4 lg:rounded-[1.5rem] lg:p-5">
              <div className="mb-4">
                <h1 className="display-font mb-1 text-xl font-bold text-[var(--ink)] sm:text-2xl">
                  {tab === 'bands' && 'Discover Bands'}
                  {tab === 'events' && 'Upcoming Events'}
                  {tab === 'musicians' && 'Musicians'}
                </h1>
                <p className="text-xs text-[var(--muted)] sm:text-sm">
                  {tab === 'bands' && 'Browse band profiles and find your next collaboration.'}
                  {tab === 'events' && 'See what gigs, jams, and events are coming up.'}
                  {tab === 'musicians' && 'Explore musician profiles and their instruments.'}
                </p>
              </div>

              <div className="mb-4">
                <FilterBar
                  search={search}
                  onSearchChange={setSearch}
                  genre={genre}
                  onGenreChange={setGenre}
                  location={location}
                  onLocationChange={setLocation}
                  genres={genres}
                  locations={locations}
                />
              </div>

              <div className="flex-1">
                {tab === 'bands' && (
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredBands.map((band) => (
                      <BandCard key={band.id} band={band} onClick={() => {}} />
                    ))}
                    {filteredBands.length === 0 && <EmptyState />}
                  </div>
                )}

                {tab === 'events' && (
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                    {filteredEvents.length === 0 && <EmptyState />}
                  </div>
                )}

                {tab === 'musicians' && (
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredMusicians.map((musician) => (
                      <MusicianCard key={musician.id} musician={musician} />
                    ))}
                    {filteredMusicians.length === 0 && <EmptyState />}
                  </div>
                )}
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Mobile dock */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-[var(--dock)]/92 px-2 pb-[calc(env(safe-area-inset-bottom)+0.25rem)] pt-1 backdrop-blur-2xl lg:hidden">
        <div className="mx-auto grid max-w-sm grid-cols-3">
          <DockButton icon="bands" label="Bands" active={tab === 'bands'} onClick={() => navigate('bands')} />
          <DockButton icon="events" label="Events" active={tab === 'events'} onClick={() => navigate('events')} />
          <DockButton icon="musicians" label="Musicians" active={tab === 'musicians'} onClick={() => navigate('musicians')} />
        </div>
      </nav>
    </div>
  )
}

function DockButton({ icon, label, active, onClick }: { icon: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      className={`relative flex flex-col items-center gap-1 rounded-[1rem] px-2 py-2 text-center ${
        active
          ? 'bg-[var(--ink)] text-[var(--paper)] shadow-[var(--shadow-card)]'
          : 'text-[var(--muted)]'
      }`}
      onClick={onClick}
      type="button"
    >
      <DockIcon name={icon} />
      <span className="text-[0.6rem] font-bold uppercase tracking-[0.14em]">{label}</span>
    </button>
  )
}

function DockIcon({ name }: { name: string }) {
  switch (name) {
    case 'bands':
      return <Music2 className="h-5 w-5" strokeWidth={1.7} />
    case 'events':
      return <CalendarDays className="h-5 w-5" strokeWidth={1.7} />
    case 'musicians':
      return <Users2 className="h-5 w-5" strokeWidth={1.7} />
    default:
      return null
  }
}

function EmptyState() {
  return (
    <div className="col-span-full py-12 text-center">
      <p className="text-sm text-[var(--muted)]">No results found. Try adjusting your filters.</p>
    </div>
  )
}
