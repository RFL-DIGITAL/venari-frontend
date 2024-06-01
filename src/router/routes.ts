import { RouteRecordRaw } from 'vue-router'
import auth from './_middleware/auth'

import App from '@/App.vue'

const routes: RouteRecordRaw[] = [
  /* ...routes */
  {
    path: '/',
    component: App,
    meta: { middleware: [{ middleware: auth }] },
    redirect: { name: 'home' },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: { middleware: [{ middleware: auth }] },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: { middleware: [{ middleware: auth }] },
  },
]

export default routes
