import { RouteRecordRaw } from 'vue-router'
import auth from '../../_middleware/auth'
import hr from '@/router/_middleware/hr'

const routes: RouteRecordRaw[] = [
  {
    path: 'vacancy',
    name: 'hr-vacancy',
    component: () => import('@/pages/hr/children/vacancy/HrVacancyPage.vue'),
    meta: { middleware: [{ middleware: auth }, { middleware: hr }] },
    children: [],
  },
]

export default routes
