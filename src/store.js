import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import menu from './menu'
import user from './modules/user/store'
import modul from './modules/modul/store'
import kelas from './modules/kelas/store'
import tingkat from './modules/tingkat/store'
import rombel from './modules/rombel/store'
import instansi from './modules/instansi/store'
import mapel from './modules/mapel/store'
import ruang from './modules/ruang/store'
import akses from './modules/akses/store'
import kandidat from './modules/kandidat/store'
import ajuan from './modules/ajuan/store'
import siswappdb from './modules/siswappdb/store'

const main = {
  namespaced: true,
  state: {
    is_403: false,
    progress: 0, // counter progress,
    lDrawer: false,
    rDrawer: false,
    hSidebar: false,

    no_instansi: false,
    no_kegiatan: false,
    no_grup: false,

    totalInstansi: 0,

    CONFIG: {
      INSTANSI_ID: process.env.VUE_APP_INSTANSI_ID,
      TITLE: process.env.VUE_APP_TITLE,
      SINGKRONISASI: process.env.VUE_APP_SINGKRONISASI,
      LABEL_TAGGING: process.env.VUE_APP_LABEL_TAGING,
      LOGIN_OAUTH: process.env.VUE_APP_LOGIN_OAUTH,
    },
  },
  getters: {
    403(state) {
      return state.is_403
    },
    noInstansi(state) {
      return state.no_instansi
    },
    noKegiatan(state) {
      return state.no_kegiatan
    },
    noGrup(state) {
      return state.no_grup
    },
    CONFIG(state) {
      return state.CONFIG
    },
    isAnyProgress(state) {
      return state.progress > 0
    },
    lDrawer(state) {
      return state.lDrawer
    },
    rDrawer(state) {
      return state.rDrawer
    },
    hSidebar(state) {
      return state.hSidebar
    },
    totalInstansi(state) {
      return state.totalInstansi
    },
  },
  mutations: {
    cleanFlag(state) {
      state.is_403 = false
      state.no_instansi = false
      state.no_kegiatan = false
      state.no_grup = false
    },
    setConfig(state, obj) {
      state.CONFIG = {
        ...state.CONFIG,
        ...obj,
      }
    },
    403(state, val) {
      state.is_403 = val
    },
    noInstansi(state, val) {
      state.no_instansi = val
    },
    noKegiatan(state, val) {
      state.no_kegiatan = val
    },
    noGrup(state, val) {
      state.no_grup = val
    },
    pStart(state) {
      state.progress++
    },
    pEnd(state) {
      state.progress--
      if (state.progress < 0) state.progress = 0
    },
    rToggle(state) {
      state.rDrawer = !state.rDrawer
    },
    lToggle(state) {
      state.lDrawer = !state.lDrawer
    },
    setLDrawer(state, val) {
      state.lDrawer = val
    },
    setHsidebar(state, val) {
      state.lDrawer = val
    },
    setRDrawer(state, val) {
      state.rDrawer = val
    },
    lToggleSidebar(state) {
      state.hSidebar = !state.hSidebar
    },
    setTotalInstansi(state, val) {
      state.totalInstansi = val
    },
  },
  actions: {},
}
const store = new Vuex.Store({
  modules: {
    main,
    menu,
    user,
    modul,
    kelas,
    tingkat,
    rombel,
    instansi,
    mapel,
    ruang,
    akses,
    kandidat,
    ajuan,
    siswappdb,
  },
})

export default store
