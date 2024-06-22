import { RouteRecordRaw } from 'vue-router'
import auth from '../../_middleware/auth'
import hr from '@/router/_middleware/hr'

const routes: RouteRecordRaw[] = [
  {
    path: 'calendar',
    name: 'hr-calendar',
    component: () => import('@/pages/hr/children/calendar/HrCalendarPage.vue'),
    meta: { middleware: [{ middleware: auth }, { middleware: hr }] },
    children: [],
  },
]

export default routes
