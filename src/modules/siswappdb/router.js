const router = [
  {
    path: '/instansi/:instansi_id/siswappdb',
    name: 'siswappdb',
    module: 'Kelola Data Siswa',
    meta: {
      auth: true,
      module: 'Kelola Data Siswa',
    },
    component: () => import('./pages/List.vue'),
  },
]

export default router
