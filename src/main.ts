import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config'

import './assets/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTv, faFilm, faCircleCheck, faClose, faArrowUpRightFromSquare, faStar, faTriangleExclamation, faFileCircleCheck } from '@fortawesome/free-solid-svg-icons'

const app = createApp(App)
library.add(faTv, faFilm, faCircleCheck, faClose, faArrowUpRightFromSquare, faStar, faTriangleExclamation, faFileCircleCheck)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(plugin, defaultConfig(config))
app.use(createPinia())
app.use(router)

app.mount('#app')
