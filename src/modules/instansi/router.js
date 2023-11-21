const router = [
  {
    path: '/instansi/:instansi_id/instansi/detail',
    name: 'instansi.detail',
    meta: {
      auth: true,
    },
    component: () => import('./pages/Detail.vue'),
  },
  {
    path: '/daftar-instansi',
    name: 'instansi.pilih',
    meta: {
      auth: true,
      cekPic: false,
    },
    component: () => import('./pages/PilihInstansi'),
  },
  {
    path: '/kelola-instansi',
    name: 'instansi.kelola',
    meta: {
      auth: true,
      cekPic: false,
    },
    component: () => import('./pages/List'),
  },
  {
    path: '/aktivasi',
    name: 'instansi.aktivasi',
    meta: {
      auth: false,
    },
    component: () => import('./components/Activation.vue'),
  },
  {
    path: '/aktivasi/:kode_aktivasi',
    name: 'aktivasi.ppdb',
    meta: {
      auth: false,
    },
    component: () => import('./components/Activation.vue'),
  },
  {
    path: '/aktivasi-instansi',
    name: 'aktivasi.instansi',
    meta: {
      auth: false,
    },
    component: () => import('./components/AktivasiInstansi.vue'),
  },
]

export default router
