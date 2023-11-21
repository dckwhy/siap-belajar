const router = [
  {
    path: '/sekolah/:instansi_id/kelas',
    name: 'kelas',
    meta: {
      auth: true,
      module: 'Kelola Kelas',
    },
    component: () => import('./pages/List.vue'),
  },
  {
    path: '/sekolah/:instansi_id/kelas/:kelas_id',
    name: 'kelas.detail',
    meta: {
      module: 'Detil Kelas',
      auth: true,
    },
    component: () => import('./pages/Detail.vue'),
  },
  {
    path: '/kelasku/:instansi_id',
    name: 'kelasku',
    meta: {
      auth: true,
      module: 'Kelas Anda',
    },
    component: () => import('./pages/Kelas.vue'),
  },
]

export default router
