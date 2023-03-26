export interface SonarrEvent {
  title: string,
  airDate: string,
  series: {
    title: string,
    airTime: string,
    runtime: number,
  }
  seasonNumber: number,
  episodeNumber: number,
  overview: string,
  hasFile: boolean,
  id: number
}
export interface RadarrEvent {
  title: string,
  digitalRelease: string,
  inCinemas?: string,
  overview: string,
  hasFile: boolean,
  id: number
}

export interface CalendarEvent {
  title: string,
  series?: string,
  time: {
    start: string,
    end: string
  },
  seasonNumber?: number,
  episodeNumber?: number,
  description: string,
  onServer: boolean,
  id: number,
  service: 'sonarr' | 'radarr',
  isCustom?: boolean
}
