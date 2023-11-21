import store from '../../store'
// import { BASE_API } from '@/const'
const router = [
  {
    path: '/login',
    name: 'login',
    module: 'Login',
    meta: {
      analyticsIgnore: true,
    },
    component: () => import('./pages/Login'),
    beforeEnter: (to, from, next) => {
      if (to.query.token) {
        // cleanup flag/info/user
        store.commit('user/logout')
        store.commit('user/setToken', to.query)
        // if (store.getters['user/lastURL']) {
        //   // window.location.href = `${window.location.origin}${store.commit('user/popLastURL')}`
        //   const u = store.getters['user/lastURL']
        //   store.commit('user/delLastURL')
        //   next({ path: u })
        //   return
        // }
        next({
          name: 'instansi.pilih',
        })
      }
      // jika sudah login, maka redirect ke home
      if (to.name == 'login' && store.getters['user/check']) {
        next({
          name: 'beranda',
        })
      } else {
        // window.location.href = BASE_API
        // redirect ke halaman login api
        next()
      }
    },
  },
  // {
  //   path: '/aktivasi-akun',
  //   name: 'user.aktivasi',
  //   meta: {
  //     auth: false,
  //   },
  //   component: () => import('./components/Activation.vue'),
  // },
  {
    path: '/pengguna/:instansi_id',
    name: 'pengguna',
    module: 'Kelola Pengguna',
    meta: {
      auth: true,
      module: 'Kelola Pengguna',
    },
    component: () => import('./pages/List.vue'),
  },
  {
    path: '/instansi/:instansi_id/profil',
    name: 'profil',
    meta: {
      module: 'Kelola Pengguna',
      auth: true,
    },
    component: () => import('./pages/Profile.vue'),
  },
  {
    path: '/verifikasi',
    name: 'user.activation',
    meta: {
      module: 'Kelola Pengguna',
      auth: false,
    },
    component: () => import('./pages/Activation.vue'),
  },
  {
    path: '/403',
    name: 'no-akses',
    module: 'Akses Tidak Tersedia',
    meta: {
      auth: false,
      module: 'Akses Tidak Tersedia',
    },
    component: () => import('../404/pages/NoAccess.vue'),
  },
  {
    path: '/lupapassword',
    name: 'user.resetpassword',
    meta: {
      module: 'Kelola Pengguna',
      auth: false,
    },
    component: () => import('./pages/ResetPassword.vue'),
  },
]

export default router
