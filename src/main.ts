import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './css/app.scss'

import App from './App.vue'

import PrimeVue from 'primevue/config';
/* Тема primevue */
import 'primevue/resources/themes/aura-light-green/theme.css'

import router from './router/index'

const pinia = createPinia()
const app = createApp(App)

app
.use(PrimeVue)
.use(router)
.use(pinia)
.mount('#app')
