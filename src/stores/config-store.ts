import { ref } from 'vue'
import { defineStore } from 'pinia'
import config from '@/lib/config-service'
import type { ConfigObject, ServiceConfig } from '@/types'

export const useConfigStore = defineStore('config', () => {
  const currentConfig = ref()
  const sonarrConfig = ref<ServiceConfig>()
  const radarrConfig = ref<ServiceConfig>()

  const readConfig = async () => {
    try {
      currentConfig.value = await config.readConfig()

      if (currentConfig.value) {
        sonarrConfig.value = {
          url: currentConfig.value.sonarrUrl,
          apiKey: currentConfig.value.sonarrApiKey
        }
        radarrConfig.value = {
          url: currentConfig.value.radarrUrl,
          apiKey: currentConfig.value.radarrApiKey
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateConfig = async (body: ConfigObject) => {
    try {
      await config.updateConfig(body)
      await readConfig()
    } catch (error) {
      console.log(error)
    }
  }

  return { readConfig, updateConfig, currentConfig, sonarrConfig, radarrConfig }
})
