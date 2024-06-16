import { RouteRecordRaw } from 'vue-router'
import auth from '../_middleware/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/application',
    name: 'application',
    component: () => import('@/pages/candidate/ApplicationPage.vue'),
    meta: { middleware: [{ middleware: auth }] },
    redirect: { name: 'candidate-list' },
    children: [
      {
        path: 'application:id',
        name: 'application-item',
        component: () => import('@/pages/candidate/children/ApplicationItemPage.vue'),
        meta: { middleware: [{ middleware: auth }] },
      },
      {
        path: 'list/:code',
        name: 'application-list',
        component: () => import('@/pages/candidate/children/ApplicationListPage.vue'),
        meta: { middleware: [{ middleware: auth }] },
      },
    ],
  },
]

export default routes
