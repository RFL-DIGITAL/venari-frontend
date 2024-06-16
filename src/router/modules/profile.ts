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
      {
        path: 'me/resume',
        name: 'profile-resume',
        component: () => import('@/pages/profile/children/resume/ProfileResumePage.vue'),
        meta: { middleware: [{ middleware: auth }, { middleware: profile }] },
        redirect: { name: 'profile-resume.create'},
        children: [
          {
            path: 'create',
            name: 'profile-resume.create',
            component: () => import('@/pages/profile/children/resume/ProfileResumeCreatePage.vue'),
            meta: { middleware: [{ middleware: auth }, { middleware: profile }] },
          },
          {
            path: 'edit',
            name: 'profile-resume.edit',
            component: () => import('@/pages/profile/children/resume/ProfileResumeEditPage.vue'),
            meta: { middleware: [{ middleware: auth }, { middleware: profile }] },
          }
        ]
      },
    ],
  },
]

export default routes
