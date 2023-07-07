import axios from 'axios'
import type { ServiceConfig } from '@/types'
import { startOfMonth, endOfMonth, formatRFC3339 } from 'date-fns'

// Get default timeframe (current month)
const now = Date.now()
const currentMonthStart = formatRFC3339(startOfMonth(now))
const currentMonthEnd = formatRFC3339(endOfMonth(now))

function sonarrApiUrl(sonarrConfig: ServiceConfig, start = currentMonthStart, end = currentMonthEnd) {
  const { url, apiKey } = sonarrConfig
  console.log(url, apiKey)
  return `${url}/api/v3/calendar?apikey=${apiKey}&includeSeries=true&start=${start}&end=${end}`
}

const getSonarrCalendar = async (sonarrConfig: ServiceConfig, start?: string , end?: string) => {
  try {
    const data = await axios.get(sonarrApiUrl(sonarrConfig, start, end))

    return data
  } catch(error) {
    console.log(error)
  }
}

export default { getSonarrCalendar }
