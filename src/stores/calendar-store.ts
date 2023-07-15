import { ref } from 'vue' 
import { defineStore } from 'pinia'
import sonarr from '@/lib/sonarr-service'
import radarr from '@/lib/radarr-service'
import { useConfigStore } from '@/stores/config-store'

import { add, format, formatRFC3339 } from 'date-fns'
import type { SonarrEvent, RadarrEvent, CalendarEvent } from '@/types'

export const useCalendarStore = defineStore('calendar', () => {
  let sonarrEvents: CalendarEvent[] = []
  let radarrEvents: CalendarEvent[] = []
  const events = ref<CalendarEvent[]>([])

  const configStore = useConfigStore()

  async function getEvents(start?: string, end?: string, service?: string) {
    events.value = []
    if (service && service === 'sonarr') {
      await getSonarrCalendar(start, end)
      events.value.push(...sonarrEvents)
    } else if (service && service === 'radarr') {
      await getRadarrCalendar(start, end)
      events.value = radarrEvents
    } else {
      await getSonarrCalendar(start, end)
      await getRadarrCalendar(start, end)

      events.value = sonarrEvents.concat(radarrEvents)
    }
  }

  async function getSonarrCalendar(start?: string, end?: string) {
    try {
      let data
      const startDate = start ? new Date(start) : undefined
      const endDate = end ? new Date(end) : undefined
      
      if (!configStore.sonarrConfig) {
        return 'Configuration unset!'
      }
      
      if (startDate && endDate) {
        data = await sonarr.getSonarrCalendar(configStore.sonarrConfig, formatRFC3339(startDate), formatRFC3339(endDate))
      } else {
        data = await sonarr.getSonarrCalendar(configStore.sonarrConfig)
      }

      formatSonarrEvents(data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function getRadarrCalendar(start?: string, end?: string) {
    try {
      let data
      const startDate = start ? new Date(start) : undefined
      const endDate = end ? new Date(end) : undefined

       if (!configStore.radarrConfig) {
        return 'Configuration unset!'
      }

      if (startDate && endDate) {
        data = await radarr.getRadarrCalendar(configStore.radarrConfig, formatRFC3339(startDate), formatRFC3339(endDate))
      } else {
        data = await radarr.getRadarrCalendar(configStore.radarrConfig)
      }

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
        slug: event.series.titleSlug,
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
        year: event.year,
        runtime: formatRuntime(event.runtime),
        rating: event.ratings.tmdb.value.toFixed(1),
        description: event.overview,
        onServer: event.hasFile,
        slug: event.titleSlug,
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

  function formatRuntime(runtime: number) {
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60

    return `${hours}h ${minutes}m`
  }

  return { getSonarrCalendar, getRadarrCalendar, getEvents, events }
})
