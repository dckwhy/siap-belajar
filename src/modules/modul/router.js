const router = [
  {
    path: "/modul/:instansi_id",
    name: "modul",
    meta: {
      module: "Kelola Materi",
      auth: true
    },
    component: () => import("./pages/List.vue")
  },
  {
    path: "/modulku/:instansi_id",
    name: "modulku",
    meta: {
      module: "Materi Anda",
      auth: true
    },
    component: () => import("./pages/Modul.vue")
  }
];

export default router;
