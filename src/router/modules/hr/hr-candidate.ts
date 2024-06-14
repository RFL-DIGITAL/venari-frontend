import { RouteRecordRaw } from 'vue-router'
import auth from '../../_middleware/auth'

const routes: RouteRecordRaw[] = [
  {
    path: 'candidate',
    name: 'hr-candidate',
    component: () => import('@/pages/hr/children/candidate/HrCandidatePage.vue'),
    meta: { middleware: [{ middleware: auth }] },
    children: [],
  },
  {
    path: 'candidate/list',
    name: 'hr-candidate.list',
    component: () => import('@/pages/hr/children/candidate/children/candidate-list/HrCandidateListPage.vue'),
    meta: { middleware: [{ middleware: auth }] },
    children: [],
  },
]

export default routes
