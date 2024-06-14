import { RouteRecordRaw } from 'vue-router'
import auth from '../../_middleware/auth'

const routes: RouteRecordRaw[] = [
  {
    path: 'publications',
    name: 'hr-publications',
    component: () => import('@/pages/hr/children/candidate/HrCandidatePage.vue'),
    meta: { middleware: [{ middleware: auth }] },
    children: [],
  },
]

export default routes
