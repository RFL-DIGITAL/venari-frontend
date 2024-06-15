import { RouteRecordRaw } from 'vue-router'
import auth from '../../_middleware/auth'

const routes: RouteRecordRaw[] = [
  {
    path: 'publications',
    name: 'hr-publications',
    component: () => import('@/pages/hr/children/publication/HrPublicationPage.vue'),
    meta: { middleware: [{ middleware: auth }] },
    children: [],
  },
]

export default routes
