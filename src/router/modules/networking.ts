import { RouteRecordRaw } from 'vue-router'
import auth from '../_middleware/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/networking',
    name: 'networking',
    component: () => import('@/pages/networking/NetworkingPage.vue'),
    meta: { middleware: [{ middleware: auth }] },
    redirect: { name: 'networking-list' },
    children: [
      {
        path: 'list',
        name: 'networking-list',
        component: () => import('@/pages/networking/children/networking-list/NetworkingListPage.vue'),
        meta: { middleware: [{ middleware: auth }] },
        children: [
          {
            path: ':id/item',
            name: 'networking-item',
            component: () => import('@/pages/networking/children/networking-item/NetworkingItem.vue'),
            meta: { middleware: [{ middleware: auth }] },
          },
        ]
      },
    ],
  },
]

export default routes
