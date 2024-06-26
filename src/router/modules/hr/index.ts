import { RouteRecordRaw } from 'vue-router'
import auth from '../../_middleware/auth'
import hr from '@/router/_middleware/hr'

import vacancyRoutes from './hr-vacancy'
import candidateRoutes from './hr-candidate'
import calendarRoutes from './hr-calendar'
import publicationsRoutes from './hr-publications'

const routes: RouteRecordRaw[] = [
  {
    path: '/hr',
    name: 'hr',
    component: () => import('@/pages/hr/HrPage.vue'),
    meta: { middleware: [{ middleware: auth }, { middleware: hr }] },
    redirect: { name: 'hr-vacancy' },
    children: [
      ...vacancyRoutes,
      ...candidateRoutes,
      ...calendarRoutes,
      ...publicationsRoutes,
    ],
  },
]

export default routes
