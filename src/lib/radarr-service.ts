import axios from 'axios'
import config from '@/config'
import { startOfMonth, endOfMonth } from 'date-fns'

// Get default timeframe (current month)
const now = Date.now()
const currentMonthStart = startOfMonth(now).toUTCString()
const currentMonthEnd = endOfMonth(now).toUTCString()

function radarrApiUrl(start = currentMonthStart, end = currentMonthEnd) {
  return `${config.radarrApiUrl}/v3/calendar?apikey=${config.radarrApiKey}&includeSeries=true&start=${start}&end=${end}`
}

const getRadarrCalendar = async (start?: string, end?: string) => {
  try {
    const data = await axios.get(radarrApiUrl(start, end))

    return data
  } catch (error) {
    console.log(error)
  }
}

export default { getRadarrCalendar }
