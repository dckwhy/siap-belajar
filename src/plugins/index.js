import Vue from 'vue'
import Consts from './const'
import Tools from './tools'
import './vuetify'
import './gmap'

import VeeValidate, { Validator } from 'vee-validate'
import id from 'vee-validate/dist/locale/id'

import { GA } from '../const'
// import VueAnalytics from 'vue-analytics'
import VueGtag from 'vue-gtag'
import router from '../router'

if (GA) {
  Vue.use(
    VueGtag,
    {
      config: { id: GA },
    },
    router
  )
}

import '../modules/home/index'
import '../modules/user/index'
import '../modules/kelas/index'
import '../modules/mapel/index'
import '../modules/rombel/index'
import '../modules/instansi/index'
import '../modules/ajuan/index'

Vue.use(VeeValidate)
Validator.localize('id', id)

Vue.use(Consts)
Vue.use(Tools)
