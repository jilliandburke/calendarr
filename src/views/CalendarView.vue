<script setup lang="ts">
import { Qalendar } from "qalendar";
import { useCalendarStore } from '../stores/calendar'
import { ref, onBeforeMount } from 'vue';

const qalendarConfig = {
  defaultMode: 'month',
  style: {
    colorSchemes: {
      sonarr: {
        color: "#fff",
        backgroundColor: "#2193b5",
      },
      sonarrDownloaded: {
        color: "#fff",
        backgroundColor: "#2E7D32",
      },
      radarr: {
        color: "#fff",
        backgroundColor: "#ff4081",
      },
      radarrDownloaded: {
        color: "#fff",
        backgroundColor: "#ff4081",
      },
    },
  },
}
const calendarStore = useCalendarStore()
const eventsV2 = ref()

onBeforeMount(async () => {
  eventsV2.value = await calendarStore.getSonarrCalendar()
})

function updateTimeframe($event: { start: string, end: string}) {
  const { start, end } = $event
  calendarStore.getSonarrCalendar(start, end)
}

</script>

<template>
  <Qalendar :events="eventsV2" @updated-period="updateTimeframe($event)" :config="qalendarConfig" />
</template>

<style>
@import "qalendar/dist/style.css";

.event-flyout__relative-wrapper,
.date-picker__week-picker,
.calendar-header__mode-options {
  background-color: var(--color-background) !important;
}

.date-picker__week-picker-navigation .is-icon {
  color: var(--qalendar-gray-quite-dark) !important;
}

.date-picker__week-picker-navigation .is-icon:hover {
  color: darken(var(--qalendar-gray-quite-dark), 50%) !important;
}

.calendar-month__event:hover {
  background-color: rgb(66 66 66) !important;
}

.event-flyout__menu-close {
  z-index: 100;
}
</style>
