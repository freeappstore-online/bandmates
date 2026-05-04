export type EventType = 'gig' | 'rehearsal' | 'audition' | 'jam_session' | 'recording' | 'workshop' | 'other'

export interface BandEvent {
  id: string
  bandId: string
  bandName: string
  title: string
  description?: string
  eventType: EventType
  startDate: string
  endDate?: string
  location?: {
    venue?: string
    city?: string
    state?: string
    country?: string
    isOnline?: boolean
  }
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  price?: number
  currency?: string
  tags?: string[]
}
