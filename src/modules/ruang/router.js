const router = [
  {
    path: "/ruang/:instansi_id",
    name: "ruang",
    meta: {
      auth: true,
      module: "Kelola Mata pelajaran"
    },
    component: () => import("./pages/List.vue")
  }
];

export default router;
