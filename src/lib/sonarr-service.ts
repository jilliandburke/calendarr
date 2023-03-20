import axios from 'axios'
import config from '@/config'

const startOfMonth = new Date('2023-03-01').toUTCString()
const endOfMonth = new Date('2023-03-31').toUTCString()

function sonarrApiUrl(endpoint: string) {
  return `https://sonarr.plexbox.dev/api/${endpoint}?apikey=${config.sonarrApiKey}&includeSeries=true&start=${startOfMonth}&end=${endOfMonth}`
}

const getSonarrCalendar = async () => {
  try {
    const data = await axios.get(sonarrApiUrl('v3/calendar'))

    return data
  } catch(error) {
    console.log(error)
  }
}

export default { getSonarrCalendar }
