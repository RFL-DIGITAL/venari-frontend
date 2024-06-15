import { RouteRecordRaw } from 'vue-router'
import auth from '../_middleware/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/candidate',
    name: 'candidate',
    component: () => import('@/pages/candidate/CandidatePage.vue'),
    meta: { middleware: [{ middleware: auth }] },
    redirect: { name: 'candidate-list' },
    children: [
      {
        path: ':id',
        name: 'candidate-item',
        component: () => import('@/pages/candidate/children/CandidateItemPage.vue'),
        meta: { middleware: [{ middleware: auth }] },
      },
      {
        path: 'list',
        name: 'candidate-list',
        component: () => import('@/pages/candidate/children/CandidateListPage.vue'),
        meta: { middleware: [{ middleware: auth }] },
      },
    ],
  },
]

export default routes
