<template>
  <div>
    <FormKit type="form" @submit="submitForm">
      <FormKit
        type="url"
        name="sonarrUrl"
        id="sonarrUrl"
        label="Sonarr URL"
        :value="currentConfig?.sonarrUrl"
        validation="required|url"
        help="Enter the URL of your Sonarr installation"
        placeholder="http://localhost:8989"
        :input-class="{
          'text-gray-700': false,
          'text-gray-200': true
        }"
      />

      <FormKit
        type="text"
        name="sonarrApiKey"
        id="sonarrApiKey"
        label="Sonarr API Key"
        :value="currentConfig?.sonarrApiKey"
        validation="required"
        help="Enter your Sonarr API key. This can be found in the General section of settings."
        :input-class="{
          'text-gray-700': false,
          'text-gray-200': true
        }"
      />

      <FormKit
        type="url"
        name="radarrUrl"
        id="radarrURL"
        label="Radarr URL"
        :value="currentConfig?.radarrUrl"
        validation="required|url"
        help="Enter the URL of your Radarr installation"
        placeholder="http://localhost:7878"
        :input-class="{
          'text-gray-700': false,
          'text-gray-200': true
        }"
      />

      <FormKit
        type="text"
        name="radarrApiKey"
        id="radarrApiKey"
        label="Radarr API Key"
        :value="currentConfig?.radarrApiKey"
        validation="required"
        help="Enter your Radarr API key. This can be found in the General section of settings."
        :input-class="{
          'text-gray-700': false,
          'text-gray-200': true
        }"
      />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useConfigStore } from '@/stores/config-store'

const configStore = useConfigStore()

const currentConfig = computed(() => {
  return {
    sonarrUrl: configStore.currentConfig?.sonarrUrl,
    sonarrApiKey: configStore.currentConfig?.sonarrApiKey,
    radarrUrl: configStore.currentConfig?.radarrUrl,
    radarrApiKey: configStore.currentConfig?.radarrApiKey
  }
})

const submitForm = async (fields: any) => {
  try {
    console.log(fields)
    await configStore.updateConfig(fields)
  } catch (error) {
    console.log(error)
  }
}
</script>
