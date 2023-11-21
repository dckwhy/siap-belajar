import Vue from 'vue'
import { STATUS_DRAFT, STATUS_DIAJUKAN, STATUS_DITERIMA, STATUS_DITOLAK } from './const'
const plugin = {
  install(Vue) {
    // 4. add an instance method
    Vue.prototype.$ajuan = {
      statusColor: (status) => {
        switch (+status) {
          case STATUS_DITERIMA:
            return 'success'
          case STATUS_DITOLAK:
            return 'error'
          case STATUS_DIAJUKAN:
            return 'warning'
          case STATUS_DRAFT:
            return 'info'
          default:
            return 'default'
        }
      },
      STATUS_DRAFT,
      STATUS_DIAJUKAN,
      STATUS_DITERIMA,
      STATUS_DITOLAK,
    }
  },
}

Vue.use(plugin)
