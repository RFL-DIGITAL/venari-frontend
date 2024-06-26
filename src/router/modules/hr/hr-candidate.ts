import { RouteRecordRaw } from 'vue-router'
import auth from '../../_middleware/auth'
import hr from '@/router/_middleware/hr'

const routes: RouteRecordRaw[] = [
  {
    path: 'candidate',
    name: 'hr-candidate',
    component: () => import('@/pages/hr/children/candidate/HrCandidatePage.vue'),
    meta: { middleware: [{ middleware: auth }, { middleware: hr }] },
    children: [],
  },
  {
    path: 'candidate/list',
    name: 'hr-candidate.list',
    component: () => import('@/pages/hr/children/candidate/children/candidate-list/HrCandidateListPage.vue'),
    meta: { middleware: [{ middleware: auth }, { middleware: hr }] },
    children: [],
  },
  {
    path: 'candidate/candidates',
    name: 'hr-candidate.candidates',
    component: () => import('@/pages/hr/children/candidate/children/candidates/HrCandidatesPage.vue'),
    meta: { middleware: [{ middleware: auth }, { middleware: hr }] },
    children: [],
  },
]

export default routes
