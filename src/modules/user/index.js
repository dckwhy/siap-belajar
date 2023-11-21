import Vue from 'vue'

const plugin = {
  install(Vue) {
    // 4. add an instance method
    Vue.prototype.$user = {
      statusColor: (status) => {
        switch (+status) {
          case 1: //admin
            return 'success'
          case 2: //operator
            return 'error'
          case 3: // pengawas
            return 'grey'
          case 4: // kepsek
            return 'teal'
          case 5: // guru
            return 'info'
          case 6: // siswa
            return 'orange'
          default:
            return 'default'
        }
      },
    }
  },
}

Vue.use(plugin)
