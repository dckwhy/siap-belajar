import Vue from "vue";
import { STATUS_AKTIF, STATUS_NONAKTIF, STATUS_ARSIP } from "./const";
const plugin = {
  install(Vue) {
    // 4. add an instance method
    Vue.prototype.$ruang = {
      statusColor: status => {
        switch (+status) {
          case STATUS_AKTIF:
            return "success";
          case STATUS_NONAKTIF:
            return "error";
          case STATUS_ARSIP:
            return "grey";
          default:
            return "default";
        }
      },
      STATUS_AKTIF,
      STATUS_NONAKTIF,
      STATUS_ARSIP
    };
  }
};

Vue.use(plugin);
