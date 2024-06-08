import { RouteRecordRaw } from 'vue-router'
import auth from '../_middleware/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/feed',
    name: 'feed',
    component: () => import('@/pages/feed/FeedPage.vue'),
    meta: { middleware: [{ middleware: auth }] },
    redirect: { name: 'feed-list' },
    children: [
      {
        path: '',
        name: 'feed-list',
        component: () => import('@/pages/feed/children/feed-list/FeedList.vue'),
        meta: { middleware: [{ middleware: auth }] },
      },
      {
        path: 'article/:id',
        name: 'feed-article',
        component: () => import('@/pages/feed/children/feed-article/FeedArticlePage.vue'),
        meta: { middleware: [{ middleware: auth }] },
      },
    ],
  },
]

export default routes
