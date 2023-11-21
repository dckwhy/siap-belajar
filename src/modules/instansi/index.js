import Vue from 'vue'
import {
  ROLE_ADMIN_DESA,
  ROLE_OWNER,
  ROLE_PELAPOR
} from '@/const'
const plugin = {
  install(Vue) {
    // 4. add an instance method
    Vue.prototype.$instansi = {
      statusColor: (status) => {
        switch (status) {

          case ROLE_ADMIN_DESA:
            return 'orange lighten-1';
          case ROLE_OWNER:
            return 'red lighten-1';
          case ROLE_PELAPOR:
            return 'green lighten-1'
          default:
            return 'default'
        }
      },
      ROLE_ADMIN_DESA,
      ROLE_OWNER,
      ROLE_PELAPOR,
    }
  }
}

Vue.use(plugin)
