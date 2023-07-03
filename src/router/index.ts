import { createRouter, createWebHistory } from 'vue-router'
import CalendarView from '@/views/CalendarView.vue'
import SettingsView from '@/views/SettingsView.vue'
import Error404View from '@/views/Error404View.vue'

import { useConfigStore } from '@/stores/config-store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CalendarView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    },
    {
      path: '/404',
      name: '404',
      component: Error404View
    }
  ]
})

router.beforeEach(async() => {
  // Pull user's config before app loads in
  const configStore = useConfigStore()
  await configStore.readConfig()

  if (!configStore.currentConfig) {
    return '/404'
  }
})

export default router
