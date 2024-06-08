import { RouteRecordRaw } from 'vue-router'
import auth from '../_middleware/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/chats',
    name: 'chats',
    component: () => import('@/pages/chat/ChatPage.vue'),
    meta: { middleware: [{ middleware: auth }] },
    children: [
      {
        path: ':id/?chatType=:chatType',
        name: 'chats-active',
        component: () => import('@/pages/chat/ChatWindow.vue'),
        meta: { middleware: [{ middleware: auth }] },
      },
    ],
  },
]

export default routes
