import axios from 'axios'
import config from '@/config'
import { startOfMonth, endOfMonth } from 'date-fns'

// Get default timeframe (current month)
const now = Date.now()
const currentMonthStart = startOfMonth(now).toUTCString()
const currentMonthEnd = endOfMonth(now).toUTCString()

function sonarrApiUrl(endpoint: string, start = currentMonthStart, end = currentMonthEnd) {
  return `https://sonarr.plexbox.dev/api/${endpoint}?apikey=${config.sonarrApiKey}&includeSeries=true&start=${start}&end=${end}`
}

const getSonarrCalendar = async (start?: string , end?: string) => {
  try {
    const data = await axios.get(sonarrApiUrl('v3/calendar', start, end))

    return data
  } catch(error) {
    console.log(error)
  }
}

export default { getSonarrCalendar }
