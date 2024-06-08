import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import PrimeVue from 'primevue/config'

/* Тема primevue */
import 'primevue/resources/themes/aura-light-green/theme.css'

// vee-validate
import * as rules from '@vee-validate/rules'
import router from './router/index'
import { configure, defineRule } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import { veeValidateRu } from './i18n/vee-validate-ru'

const pinia = createPinia()
const app = createApp(App)
/* Define the rule globally */
Object.keys(rules).forEach((rule) => {
  if (typeof rules[rule] === 'function') {
    defineRule(rule, rules[rule])
  }
})



configure({
  // Generates an English message locale generator
  generateMessage: localize({
    ru: veeValidateRu,
  }),
})
localize('ru')

app.use(PrimeVue).use(router).use(pinia).mount('#app')
