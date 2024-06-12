import { RouteRecordRaw } from 'vue-router'
import auth from '../../_middleware/auth'

const routes: RouteRecordRaw[] = [
  {
    path: 'vacancy',
    name: 'hr-vacancy',
    component: () => import('@/pages/hr/children/vacancy/HrVacancyPage.vue'),
    meta: { middleware: [{ middleware: auth }] },
    children: [],
  },
]

export default routes
