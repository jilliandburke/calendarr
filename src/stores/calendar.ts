import { defineStore } from 'pinia'
import sonarr from '@/lib/sonarr-service'
import { add, format } from 'date-fns'
import type { SonarrEvent, CalendarEvent } from '@/types'

export const useCalendarStore = defineStore('calendar', () => {
  let events: CalendarEvent[] = []

  async function getSonarrCalendar() {
    try {
      const data = await sonarr.getSonarrCalendar();

      formatSonarrEvents(data?.data)

      return events
    } catch (error) {
      console.log(error)
    }
  }

  function formatSonarrEvents(rawEvents: SonarrEvent[]) {
    rawEvents.forEach((event: SonarrEvent) => {
      events.push({
        title: event.title,
        time: formatStartEndTimes(event.airDate, event.series.airTime, event.series.runtime),
        seasonNumber: event.seasonNumber,
        episodeNumber: event.episodeNumber,
        description: event.overview,
        colorScheme: event.hasFile ? 'sonarrDownloaded' : 'sonarr',
        id: event.id
      })
    })
  }

  function formatStartEndTimes(airDate: string, airTime: string, runtime: number) {
    const calculatedEndTime = add(new Date(`${airDate} ${airTime}`), { minutes: runtime })
    const start = `${airDate} ${airTime}`
    const end = format(calculatedEndTime, 'y-MM-dd hh:mm')

    return {
      start,
      end
    }
  }

  return { getSonarrCalendar }
})