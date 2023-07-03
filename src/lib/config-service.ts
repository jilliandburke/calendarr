import axios from 'axios'
import type { ConfigObject } from '@/types'

const configApiUrl = 'http://localhost:3333/config'

const readConfig = async () => {
  try {
    const response = await axios.get(configApiUrl)

    return response.data.configData[0]
  } catch (error) {
    console.log(error)
  }
}

const updateConfig = async (body: ConfigObject) => {
  try {
    await axios.patch(configApiUrl, body)

  } catch (error) {
    console.log(error)
  }
}

export default { readConfig, updateConfig }
