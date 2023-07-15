import axios from 'axios'
import type { ServiceConfig } from '@/types'
import { startOfMonth, endOfMonth, formatRFC3339 } from 'date-fns'

// Get default timeframe (current month)
const now = Date.now()
const currentMonthStart = formatRFC3339(startOfMonth(now))
const currentMonthEnd = formatRFC3339(endOfMonth(now))

function radarrApiUrl(radarrConfig: ServiceConfig, start = currentMonthStart, end = currentMonthEnd) {
  const { url, apiKey } = radarrConfig
  return `${url}/api/v3/calendar?unmonitored=false&apikey=${apiKey}&start=${start}&end=${end}`
}

const getRadarrCalendar = async (radarrConfig: ServiceConfig, start?: string, end?: string) => {
  try {
    const data = await axios.get(radarrApiUrl(radarrConfig, start, end))

    return data
  } catch (error) {
    console.log(error)
  }
}

export default { getRadarrCalendar }
