const router = [
  {
    path: '/sekolah/:instansi_id/ajuan',
    name: 'ajuan',
    meta: {
      auth: true,
      module: 'Kelola Ajuan Data Siswa',
    },
    component: () => import('./pages/List.vue'),
  },
  {
    path: '/sekolah/:instansi_id/ajuan/:ajuan_id',
    name: 'ajuan.detail',
    meta: {
      auth: true,
      module: 'Detail Ajuan Data Siswa',
    },
    component: () => import('./pages/Detail.vue'),
  },
  {
    path: '/sekolah/:instansi_id/ajuanku',
    name: 'ajuan.me',
    meta: {
      auth: true,
      module: 'Detail Ajuan Anda',
    },
    component: () => import('./pages/Ajuanku.vue'),
  },
]

export default router
