import { RouteRecordRaw } from 'vue-router'
import auth from '../_middleware/auth'
import { isAuthicatedGuard } from '../_middleware/is-authenticated.guard'

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/pages/vacancy/VacancyPage.vue'),
    meta: { middleware: [{ middleware: isAuthicatedGuard }] },
    redirect: { name: 'auth.login' },
    children: [
      {
        path: 'login',
        name: 'auth.login',
        component: () => import('@/pages/auth/children/LoginPage.vue'),
        meta: { middleware: [{ middleware: isAuthicatedGuard }] },
      },
      {
        path: 'register',
        name: 'auth.register',
        component: () => import('@/pages/auth/children/RegisterPage.vue'),
        meta: { middleware: [{ middleware: isAuthicatedGuard }] },
      },
    ],
  },
]

export default routes
