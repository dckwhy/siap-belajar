const router = [
  {
    path: "/akses/:instansi_id",
    name: "akses",
    meta: {
      module: "Kelola Akses",
      auth: true
    },
    component: () => import("./pages/List.vue")
  }
];

export default router;
