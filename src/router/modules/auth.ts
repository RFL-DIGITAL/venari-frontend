import { RouteRecordRaw } from 'vue-router'
import { isAuthicatedGuard } from '../_middleware/is-authenticated.guard'

const routes: RouteRecordRaw[] = [
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('@/pages/auth/SignUpPage.vue'),
    meta: { middleware: [{ middleware: isAuthicatedGuard }] },
  },
]

export default routes
