<template>
  <div
    v-if="eventDialog && event"
    class="flex flex-col min-h-fit rounded-lg bg-neutral-900 shadow-lg"
  >
    <div class='flex flex-row justify-between items-start border-b px-4 py-2 rounded-t'>
      <div class="flex flex-col flex-grow">
        <h4 class='w-4/5 break-words'>{{ event.title }}</h4>
        <p v-if="event.service === 'sonarr'" class='mb-o text-sm text-gray-400'>{{ event.series }} - S{{ event.seasonNumber }}E{{ event.episodeNumber }}</p>
        <p v-else class='mb-o text-sm text-gray-400'>
           <span class='mr-2'>
            <font-awesome-icon :icon="['fas', 'star']" class='h-3 w-3 text-yellow-500' />
            {{ event.rating }}
          </span>
          <span class='mr-3'>{{ event.year }}</span>
          <span>{{ event.runtime }}</span>
        </p>
      </div>
      <button class="text-gray-400 hover:text-white cursor-pointer" @click="eventDialog.closeEventDialog">
        <font-awesome-icon :icon="['fas', 'close']" class='h-4 w-4' />
      </button>
    </div>
    <div class='p-4'>{{ event.description || 'No description available' }}</div>
    <div class='px-4 pb-4 rounded-b flex flex-row'>
      <a :href="serviceLink(event)" target='_blank' class='text-sm text-gray-400 hover:text-white'>
        View in {{ formatServiceName(event.service) }}
        <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" class='h-4 w-4' />
      </a>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { CalendarEvent } from '../types'
import config from '@/config';

defineProps({
  eventDialog: {
    type: Object,
    required: true,
  },
  event: {
    type: Object,
  }
});

function formatServiceName(service: string) {
  return service.charAt(0).toUpperCase() + service.slice(1);
}

function serviceLink(event: CalendarEvent | any) {
  if (event.service === 'sonarr') {
    return `${config.sonarrUrl}series/${event.slug}`
  }

  if (event.service === 'radarr') {
    return `${config.radarrUrl}movie/${event.slug}`
  }
}
</script>
