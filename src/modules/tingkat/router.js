const router = [
  {
    path: "/tingkat",
    name: "tingkat",
    meta: {
      module: "Kelola Tingkat",
      auth: true
    },
    component: () => import("./pages/List.vue")
  }
];

export default router;
