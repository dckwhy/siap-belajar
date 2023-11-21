import {
  API,
  BASE_API,
  LOGO,
  GMAP_KEY,
  COPYRIGHT,
  ROLE_OWNER,
  ROLE_ADMIN_DESA,
  ROLE_PELAPOR,
  ROLE_ADMIN_INSTITUSI,
  SIM,
} from '@/const'

const Consts = {
  install(Vue) {
    // 4. add an instance method
    Vue.prototype.$consts = {
      API,
      BASE_API,
      GMAP_KEY,
      LOGO,
      COPYRIGHT,
      ROLE_OWNER,
      ROLE_ADMIN_DESA,
      ROLE_PELAPOR,
      ROLE_ADMIN_INSTITUSI,
      SIM,
    }
  },
}

export default Consts
