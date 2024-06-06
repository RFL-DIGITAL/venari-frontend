import { RouteRecordRaw } from 'vue-router'
import auth from '../_middleware/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/vacancy',
    name: 'vacancy',
    component: () => import('@/pages/vacancy/VacancyPage.vue'),
    meta: { middleware: [{ middleware: auth }] },
    children: [
      /* {
        path: ':id',
        name: 'chats-active',
        component: () => import('@/pages/chat/ChatWindow.vue'),
        meta: { middleware: [{ middleware: auth }] },
      }, */
    ],
  },
]

export default routes
