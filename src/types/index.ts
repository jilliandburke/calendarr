export interface SonarrEvent {
  title: string,
  airDate: string,
  series: {
    airTime: string,
    runtime: number,
  }
  seasonNumber: number,
  episodeNumber: number,
  overview: string,
  hasFile: boolean,
  id: number
}

export interface CalendarEvent {
  title: string,
  time: {
    start: string,
    end: string
  },
  seasonNumber: number,
  episodeNumber: number,
  description: string,
  colorScheme: string,
  id: number
}
