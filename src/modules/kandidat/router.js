// import store from '../../store'
// import { BASE_API } from '@/const'
const router = [
  {
    path: '/kandidat/:instansi_id',
    name: 'kandidat',
    module: 'Kelola Kandidat',
    meta: {
      auth: true,
      module: 'Kelola Kandidat',
    },
    component: () => import('./pages/List.vue'),
  },
]

export default router
