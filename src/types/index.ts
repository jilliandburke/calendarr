export interface CalendarEmittedEvent {
  start?: string,
  end?: string,
  mode?: string,
  period?: {
    start: string,
    end: string
  }
}
export interface SonarrEvent {
  title: string,
  airDate: string,
  series: {
    title: string,
    airTime: string,
    runtime: number,
    titleSlug: string
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
  year: number,
  runtime: number,
  ratings: {
    tmdb: {
      value: number
    }
  }
  hasFile: boolean,
  titleSlug: string,
  id: number
}

export interface CalendarEvent {
  title: string,
  series?: string,
  time: {
    start: string,
    end: string
  },
  year?: number,
  runtime?: string,
  seasonNumber?: number,
  episodeNumber?: number,
  rating?: number | string,
  description: string,
  slug: string,
  onServer: boolean,
  id: number,
  service: 'sonarr' | 'radarr',
  isCustom?: boolean
}

export interface ConfigObject {
  sonarrUrl: string,
  sonarrApiKey: string,
  radarrUrl: string,
  radarrApiKey: string
}

export interface ServiceConfig {
  url: string,
  apiKey: string
}
