export interface Musician {
  id: string
  displayName: string
  instrument: string
  genres: string[]
  city?: string
  state?: string
  country?: string
  avatarURL?: string
  bio?: string
  experienceLevel?: string
  bandIds?: string[]
}
