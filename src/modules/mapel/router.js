const router = [
  {
    path: "/mapel/:instansi_id",
    name: "mapel",
    meta: {
      auth: true,
      module: "Kelola Mata pelajaran"
    },
    component: () => import("./pages/List.vue")
  }
];

export default router;
