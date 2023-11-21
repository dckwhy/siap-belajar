const router = [
  {
    path: "/rombel/:instansi_id",
    name: "rombel",
    meta: {
      module: "Kelola Rombongan Belajar",
      auth: true
    },
    component: () => import("./pages/List.vue")
  },
  {
    path: "/sekolah/:instansi_id/rombel/:rombel_id",
    name: "rombel.detail",
    meta: {
      module: "Kelola Rombongan Belajar",
      auth: true
    },
    component: () => import("./pages/Detail.vue")
  }
];

export default router;
