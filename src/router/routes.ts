import { RouteRecordRaw } from 'vue-router'
import auth from './_middleware/auth'

import chatRoutes from './modules/chat'
import vacancyRoutes from './modules/vacancy'
import networkingRoutes from './modules/networking'
import authRoutes from './modules/auth'
import feedRoutes from './modules/feed'
import profileRoutes from './modules/profile'
import hrRoutes from './modules/hr/index'

const routes: RouteRecordRaw[] = [
  ...chatRoutes,
  ...vacancyRoutes,
  ...networkingRoutes,
  ...authRoutes,
  ...feedRoutes,
  ...profileRoutes,
  ...hrRoutes,
  {
    path: '/',
    name: '',
    redirect: { name: 'feed' },
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
