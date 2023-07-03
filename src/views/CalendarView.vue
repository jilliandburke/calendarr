<template>
  <div class="flex flex-col items-center h-full">
    <AlertMessage variant="warning" v-if="!hasConfiguration" class="mb-8 w-2/3">
      <template #title> Setup Needed </template>
      <template #description>
        <p class="mb-3 w-4/5">
          Welcome to Calendarr! In order for the calendar to have access to your servers please
          enter Sonarr and Radarr details on the Settings page.
        </p>
        <router-link to="settings" class="font-bold underline">View Settings</router-link>
      </template>
    </AlertMessage>

    <Qalendar
      :events="events"
      @updated-period="updateTimeframe($event)"
      @updated-mode="updateTimeframe($event)"
      :config="qalendarConfig"
      style="color-scheme: dark"
      v-if="hasConfiguration"
    >
      <template #eventDialog="eventDialogProps">
        <EventDialogView
          :eventDialog="eventDialogProps"
          :event="eventDialogProps?.eventDialogData"
          class="rounded border border-white"
        />
      </template>
      <template #monthEvent="monthEventProps">
        <EventViewMonth :event="monthEventProps.eventData" />
      </template>
      <template #weekDayEvent="eventProps">
        <EventViewWeekDay :event="eventProps.eventData" />
      </template>
    </Qalendar>
  </div>
</template>

<script setup lang="ts">
import { Qalendar } from 'qalendar'
import { computed, onBeforeMount } from 'vue'
import { useCalendarStore } from '../stores/calendar-store'
import { useConfigStore } from '../stores/config-store'
import type { CalendarEmittedEvent } from '@/types'
import AlertMessage from '@/components/AlertMessage.vue'
import EventViewMonth from '../components/EventViewMonth.vue'
import EventDialogView from '../components/EventDialogView.vue'
import EventViewWeekDay from '../components/EventViewWeekDay.vue'

const qalendarConfig = {
  defaultMode: 'month',
  showCurrentTime: true,
  eventDialog: {
    isCustom: true
  },
  style: {
    colorSchemes: {
      sonarr: {
        color: '#fff',
        backgroundColor: '#2193b5'
      },
      sonarrDownloaded: {
        color: '#fff',
        backgroundColor: '#2E7D32'
      },
      radarr: {
        color: '#fff',
        backgroundColor: '#ffc230'
      },
      radarrDownloaded: {
        color: '#fff',
        backgroundColor: '#2E7D32'
      }
    }
  }
}
const calendarStore = useCalendarStore()
const configStore = useConfigStore()
const events = computed(() => calendarStore.events)
const hasConfiguration = computed(() => configStore.currentConfig)

onBeforeMount(async () => {
  await calendarStore.getEvents()
})

async function updateTimeframe(event: CalendarEmittedEvent) {
  const start = event.period ? event.period.start : event.start
  const end = event.period ? event.period.end : event.end
  await calendarStore.getEvents(start, end)
}
</script>

<style>
@import 'qalendar/dist/style.css';

.calendar-root {
  border-color: white !important;
}

.calendar-month__weeks > div:last-child > .calendar-month__weekday {
  border-bottom: 0 !important;
}

.calendar-month__weekday-more {
  margin-top: 8px !important;
  margin-left: 5px !important;
  margin-bottom: 10px !important;
}

.calendar-header__mode-options,
.date-picker__week-picker {
  background-color: #18181b !important;
}

.calendar-week__event .is-event {
  border: none !important;
  height: auto !important;
}

.week-timeline__event {
  background-color: #9f1239 !important;
  padding: 0.5rem !important;
  font-size: 0.75rem !important;
  height: auto !important;
  cursor: pointer !important;
}

.calendar-month__weekday.is-today > .calendar-month__day-date,
.week-timeline__day.is-today > .week-timeline__date {
  background-color: #9f1239 !important;
  height: 1.5rem !important;
  width: 1.5rem !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  padding: 0 !important;
}

.agenda__header-day-name {
  color: #ffffff !important;
}

.agenda__header-date,
.agenda__event.is-event {
  background-color: #9f1239 !important;
}

.date-picker__value-display:hover,
.calendar-header__mode-picker:hover,
.calendar-header__mode-option:hover {
  background-color: #3f3f46 !important;
}

.event-flyout__menu-close {
  z-index: 100;
}

/* .qalendar-is-small .calendar-month__event {
  background-color: #f59e0b !important;
} */
</style>
