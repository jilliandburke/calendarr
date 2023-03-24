import axios from 'axios'
import config from '@/config'
import { startOfMonth, endOfMonth } from 'date-fns'

// Get default timeframe (current month)
const now = Date.now()
const currentMonthStart = startOfMonth(now).toUTCString()
const currentMonthEnd = endOfMonth(now).toUTCString()

function radarrApiUrl(endpoint: string, start = currentMonthStart, end = currentMonthEnd) {
  return `https://radarr.plexbox.dev/api/${endpoint}?apikey=${config.radarrApiKey}&includeSeries=true&start=${start}&end=${end}`
}

const getRadarrCalendar = async (start?: string, end?: string) => {
  try {
    const data = await axios.get(radarrApiUrl('v3/calendar', start, end))

    return data
  } catch (error) {
    console.log(error)
  }
}

export default { getRadarrCalendar }
