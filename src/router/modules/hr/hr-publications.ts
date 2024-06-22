import { RouteRecordRaw } from 'vue-router'
import auth from '../../_middleware/auth'
import hr from '@/router/_middleware/hr'

const routes: RouteRecordRaw[] = [
  {
    path: 'publications',
    name: 'hr-publications',
    component: () => import('@/pages/hr/children/publication/HrPublicationPage.vue'),
    meta: { middleware: [{ middleware: auth }, { middleware: hr }] },
    children: [],
  },
]

export default routes
