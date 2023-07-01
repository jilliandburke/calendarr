<template>
  <div class='flex flex-row shrink-0 w-100 items-stretch mt-1 mx-2 rounded min-h-fit border border-zinc-500 cursor-pointer hover:bg-neutral-900'>
    <div class='w-2 rounded-l-sm bg-green-600' v-if='event.onServer'></div>
    <div class='w-2 rounded-l-sm bg-red-600' v-if='!event.onServer'></div>
    <div class='flex flex-row py-1'>
      <span class='mx-[8px] relative'>
        <font-awesome-icon :icon="['fas', serviceIcon(event)]" class='h-4 w-4' />
      </span>
      <div class='flex flex-col flex-grow'>
        <p class='text-xs mb-0 break-normal pt-[3px]' v-if='event.series'>{{ event.series }}</p>
        <p class='mb-0 break-normal' :class="event.service !== 'radarr' ? 'text-[10px] py-[3px]' : 'text-xs py-[4px]'">{{ event.title }}</p>
        <p v-if="event.service === 'radarr'" class='mb-o text-[10px]'>
          <span class='mr-2'>
            <font-awesome-icon :icon="['fas', 'star']" class='h-3 w-3 text-yellow-500' />
            {{ event.rating }}
          </span>
          <span class='mr-2'>{{ event.year }}</span>
          <span>{{ event.runtime }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CalendarEvent } from '../types'
import { ref } from 'vue';

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const event = ref(props.event)

function serviceIcon(event: CalendarEvent | any) {
  if (event.service === 'sonarr') {
    return 'tv'
  }

  if (event.service === 'radarr') {
    return 'film'
  }
}
</script>
