<template>
  <div>
    <FormKit type="form" @submit="submitForm" v-if="currentConfig">
      <FormKit
        type="url"
        name="sonarrUrl"
        id="sonarrUrl"
        label="Sonarr URL"
        v-model="currentConfig.sonarrUrl"
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
        v-model="currentConfig.sonarrApiKey"
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
        v-model="currentConfig.radarrUrl"
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
        v-model="currentConfig.radarrApiKey"
        validation="required"
        help="Enter your Radarr API key. This can be found in the General section of settings."
        :input-class="{
          'text-gray-700': false,
          'text-gray-200': true
        }"
      />

      <FormKit
        type="text"
        name="hostingUrl"
        id="hostingUrl"
        label="Hosting URL"
        v-model="currentConfig.hostingUrl"
        validation="required"
        help="If you plan to host this from a specific URL, please enter it here"
        :input-class="{
          'text-gray-700': false,
          'text-gray-200': true
        }"
      />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { useConfigStore } from '../stores/config-store'

const configStore = useConfigStore()
const currentConfig = computed(() => configStore.currentConfig)

onBeforeMount(async () => {
  try {
    await configStore.readConfig()
  } catch (error) {
    console.log(error)
  }
})

function cleanUrl(url: string) {
  if (url.charAt(url.length - 1) == '/') {
    return url = url.slice(0, -1);
  }

  return url
}

const submitForm = async (fields: any) => {
  // Remove trailing forward slash from URLs if it exists
  fields.sonarrUrl = cleanUrl(fields.sonarrUrl)
  fields.radarrUrl = cleanUrl(fields.radarrUrl)

  console.log(fields)

  try {
    await configStore.updateConfig(fields)
  } catch (error) {
    console.log(error)
  }
}
</script>
