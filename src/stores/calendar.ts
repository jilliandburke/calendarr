import { defineStore } from 'pinia'
import sonarr from '@/lib/sonarr-service'
import radarr from '@/lib/radarr-service'
import { add, format } from 'date-fns'
import type { SonarrEvent, RadarrEvent, CalendarEvent } from '@/types'

export const useCalendarStore = defineStore('calendar', () => {
  let sonarrEvents: CalendarEvent[] = []
  let radarrEvents: CalendarEvent[] = []
  let events: CalendarEvent[] = []

  async function getEvents(service?: string, start?: string, end?: string) {
    events = []
    if (service && service === 'sonarr') {
      await getSonarrCalendar(start, end)
      events.push(...sonarrEvents)
    } else if (service && service === 'radarr') {
      await getRadarrCalendar(start, end)
      events = radarrEvents
    } else {
      await getSonarrCalendar(start, end)
      await getRadarrCalendar(start, end)

      events = sonarrEvents.concat(radarrEvents)
    }

    return events
  }

  async function getSonarrCalendar(start?: string, end?: string) {
    try {
      const data = await sonarr.getSonarrCalendar(formatToDate(start), formatToDate(end));

      formatSonarrEvents(data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function getRadarrCalendar(start?: string, end?: string) {
    try {
      const data = await radarr.getRadarrCalendar(formatToDate(start), formatToDate(end));

      formatRadarrEvents(data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  function formatSonarrEvents(rawEvents: SonarrEvent[]) {
    sonarrEvents = []
    rawEvents.forEach((event: SonarrEvent) => {
      sonarrEvents.push({
        title: event.title,
        series: event.series.title,
        time: formatStartEndTimes(event.airDate, event.series.airTime, event.series.runtime),
        seasonNumber: event.seasonNumber,
        episodeNumber: event.episodeNumber,
        description: event.overview,
        onServer: event.hasFile,
        id: event.id,
        service: 'sonarr',
        isCustom: true
      })
    })
  }

  function formatRadarrEvents(rawEvents: RadarrEvent[]) {
    radarrEvents = []
    rawEvents.forEach((event: RadarrEvent) => {
      const releaseDate = event.inCinemas ? event.inCinemas : event.digitalRelease

      radarrEvents.push({
        title: event.title,
        time: {
          start: releaseDate.substring(0, 10),
          end: releaseDate.substring(0, 10)
        },
        description: event.overview,
        onServer: event.hasFile,
        id: event.id,
        service: 'radarr',
        isCustom: true
      })
    })
  }

  function formatStartEndTimes(airDate: string, airTime: string, runtime: number) {
    const calculatedEndTime = add(new Date(`${airDate} ${airTime}`), { minutes: runtime })
    const start = `${airDate} ${airTime}`
    const end = format(calculatedEndTime, 'y-MM-dd HH:mm')

    return {
      start,
      end
    }
  }

  function formatToDate(date: string | undefined) {
    if (typeof date === 'string') {
      const temp = new Date(date)

      return temp.toUTCString()
    }
  }

  return { getSonarrCalendar, getRadarrCalendar, getEvents }
})
