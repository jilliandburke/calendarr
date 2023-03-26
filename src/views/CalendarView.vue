<script setup lang="ts">
import { Qalendar } from 'qalendar'
import { useCalendarStore } from '../stores/calendar'
import { ref, onBeforeMount } from 'vue'
import EventViewMonth from '../components/eventViewMonth.vue'
import EventViewWeekDay from '../components/eventViewWeekDay.vue'

const qalendarConfig = {
  defaultMode: 'month',
  showCurrentTime: true,
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
        backgroundColor: "#ffc230",
      },
      radarrDownloaded: {
        color: "#fff",
        backgroundColor: "#2E7D32",
      },
    },
  },
}
const calendarStore = useCalendarStore()
const eventsV2 = ref()

onBeforeMount(async () => {
  eventsV2.value = await calendarStore.getEvents()
})

function updateTimeframe($event: { start: string, end: string}) {
  const { start, end } = $event
  calendarStore.getEvents(start, end)
}
</script>

<template>
  <Qalendar :events="eventsV2" @updated-period="updateTimeframe($event)" :config="qalendarConfig">
    <template #monthEvent="monthEventProps">
      <EventViewMonth :event='monthEventProps.eventData' />
    </template>
    <template #weekDayEvent="eventProps">
      <EventViewWeekDay :event='eventProps.eventData' />
    </template>
  </Qalendar>
</template>

<style>
@import "qalendar/dist/style.css";

.event-flyout__relative-wrapper,
.date-picker__week-picker,
.calendar-header__mode-options {
  background-color: #27272a !important;
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

.calendar-month__weekday-more,
.calendar-month__day-name,
.calendar-month__day-date {
  color: white !important;
}

.calendar-month__weekday-more {
  margin-top: 8px !important;
  margin-left: 10px !important;
}

.calendar-month__weekday {
  padding: 0 5px 15px 5px !important;
}

.calendar-week__event {
  border: none !important;
}

.event-flyout__menu-close {
  z-index: 100;
}
</style>
