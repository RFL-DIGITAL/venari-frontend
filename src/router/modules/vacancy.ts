import { RouteRecordRaw } from 'vue-router'
import auth from '../_middleware/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/vacancy',
    name: 'vacancy',
    component: () => import('@/pages/vacancy/VacancyPage.vue'),
    meta: { middleware: [{ middleware: auth }] },
    redirect: { name: 'vacancy-list' },
    children: [
      {
        path: 'list',
        name: 'vacancy-list',
        component: () => import('@/pages/vacancy/children/vacancy-list/VacancyListPage.vue'),
        meta: { middleware: [{ middleware: auth }] },
      },
      {
        path: ':id/item',
        name: 'vacancy-item',
        component: () => import('@/pages/vacancy/children/vacancy-item/VacancyItemPage.vue'),
        meta: { middleware: [{ middleware: auth }] },
      },
    ],
  },
]

export default routes
