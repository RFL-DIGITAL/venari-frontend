import { RouteRecordRaw } from 'vue-router'
import auth from '../_middleware/auth'
import profile from '../_middleware/profile'

const routes: RouteRecordRaw[] = [
  {
    path: '/profile/:id',
    name: 'profile',
    component: () => import('@/pages/profile/ProfilePage.vue'),
    meta: { middleware: [{ middleware: auth }, { middleware: profile }] },
    redirect: { name: 'profile-user' },
    children: [
      {
        path: 'user',
        name: 'profile-user',
        component: () => import('@/pages/profile/children/ProfleUser.vue'),
        meta: { middleware: [{ middleware: auth }, { middleware: profile }] },
      },
      {
        path: 'me',
        name: 'profile-current-user',
        component: () => import('@/pages/profile/children/ProfileCurrentUser.vue'),
        meta: { middleware: [{ middleware: auth }, { middleware: profile }] },
      },
      {
        path: 'me/edit',
        name: 'profile-edit',
        component: () => import('@/pages/profile/children/ProfileEdit.vue'),
        meta: { middleware: [{ middleware: auth }, { middleware: profile }] },
      },
    ],
  },
]

export default routes
