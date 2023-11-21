import Vue from 'vue'
import Router from 'vue-router'

import home from './modules/home/router'
import user from './modules/user/router'
import modul from './modules/modul/router'
import mapel from './modules/mapel/router'
import kelas from './modules/kelas/router'
import instansi from './modules/instansi/router'
import tingkat from './modules/tingkat/router'
import rombel from './modules/rombel/router'
import ruang from './modules/ruang/router'
import akses from './modules/akses/router'
import kandidat from './modules/kandidat/router'
import ajuan from './modules/ajuan/router'
import siswappdb from './modules/siswappdb/router'

import store from './store'
import { isCan } from './tools'

Vue.use(Router)

const other = [
  {
    path: '/',
    name: 'root',
    redirect: {
      name: 'beranda',
    },
    meta: {
      analyticsIgnore: true,
    },
  },
  {
    path: '*',
    name: '404',
    component: () => import('./modules/404/pages/404'),
  },
]

let routers = [
  ...home,
  ...modul,
  ...tingkat,
  ...kelas,
  ...mapel,
  ...rombel,
  ...instansi,
  ...other,
  ...user,
  ...ruang,
  ...akses,
  ...kandidat,
  ...ajuan,
  ...siswappdb,
]

const router = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: routers,
})

router.beforeResolve((to, from, next) => {
  if (to.name) {
    store.commit('main/pStart')
  }
  next()
})

router.beforeEach((to, from, next) => {
  //cek apakah perlu login
  store.commit('main/cleanFlag')
  if (to.meta && to.meta.auth) {
    // cek apakah sudah login
    if (store.getters['user/check']) {
      //load permission
      store
        .dispatch('user/fetch')
        .then(() => {
          // jika auth ok, maka cek routing var
          // cek apakah perlu load instansi
          if (!store.getters['main/403'] && to.params.instansi_id) {
            return store.dispatch('instansi/switchInstansi', to.params.instansi_id)
          }
        })
        .then(() => {
          // cek apakah dapat mengakses route
          return store.commit('main/403', !isCan(to.meta.auth))
          //return store.dispatch('user/getRole')
        })
        .then(() => {
          let o = store.getters['instansi/instansi_aktif']
          if (to.meta.cekPic == false) {
            return store.commit('instansi/has_pic', true)
          } else if (o && to.name !== 'instansi.pilih' && to.meta.auth && o.email_penanggung_jawab) {
            return store.commit('instansi/has_pic', true)
          } else {
            return store.commit('instansi/has_pic', false)
          }
        })

        .then(() => {
          next()
        })
        .catch(() => {
          // cek apakah dapat mengakses route
          store.commit('main/403', !isCan(to.meta.auth))
        })
    } else {
      next({
        name: 'login',
      })
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  store.commit('main/pEnd')
  window.scrollTo(0, 0)
})

export default router
