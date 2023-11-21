import store from "../../store";
const router = [
  {
    path: "/beranda/:instansi_id",
    name: "beranda",
    meta: { module: "Beranda", auth: true },
    component: () => import("./pages/Home"),
    beforeEnter: (to, from, next) => {
      let ins = store.getters["instansi/instansi_aktif"];
      if (!ins) {
        next({
          name: "instansi.pilih"
        });
      } else {
        next();
      }
    }
  }
];

export default router;
