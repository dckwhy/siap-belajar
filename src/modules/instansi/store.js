import axios from 'axios'
import { API } from '../../const'
import { normParam } from '@/tools'

const M_API = API + '/api'
const store = {
  namespaced: true,
  state: {
    instansi_aktif: null,
    instansi_id: null,
    permission: [],
    has_pic: false,
  },
  getters: {
    instansi_aktif(state) {
      return state.instansi_aktif
    },
    permission(state) {
      return state.permission
    },
    instansi_id(state) {
      return state.instansi_id
    },
    has_pic(state) {
      return state.has_pic
    },
  },
  mutations: {
    pilihInstansi(state, instansi_aktif) {
      state.instansi_aktif = instansi_aktif
    },
    setInstansi(state, val) {
      state.instansi_aktif = val
    },
    setInstansiId(state, val) {
      state.instansi_id = val
    },
    has_pic(state, val) {
      state.has_pic = val
    },
  },
  actions: {
    get({ commit }, params) {
      return axios
        .get(`${M_API}/sekolah${normParam(params)}`)
        .then((res) => {
          commit('main/setTotalInstansi', res.data.total, {
            root: true,
          })
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },

    getKelola(_, { params }) {
      return axios
        .get(`${M_API}/sekolahall${normParam(params)}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },

    getSekolahPPDB({ commit }, params) {
      return axios
        .get(`${M_API}/sekolah_ppdb${normParam(params)}`)
        .then((res) => {
          commit('main/setTotalInstansi', res.data.total, {
            root: true,
          })
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },

    getWP() {
      return axios
        .get(`${M_API}/wordpress`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    getSekolah(_, params) {
      return axios
        .get(`${M_API}/organisasi${normParam(params)}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    getAll() {
      return axios
        .get(`${M_API}/sekolah`)
        .then((res) => {
          return res.data.data
        })
        .catch((err) => Promise.reject(err))
    },
    detail(_, id_instansi) {
      if (id_instansi) {
        return axios
          .get(`${M_API}/sekolah/${id_instansi}`)
          .then((res) => {
            return res.data
          })
          .catch((err) => Promise.reject(err))
      } else {
        return
      }
    },
    profil(_, instansi_id) {
      return axios.get(`${M_API}/sekolah/${instansi_id}`).then((res) => {
        return res.data
      })
    },
    akses({ state }, instansi_id) {
      return axios.get(`${M_API}/sekolah/${instansi_id}/akses`).then((res) => {
        state.permission = res.data
      })
    },

    aktivasi(_, obj) {
      return axios
        .post(`${M_API}/sekolah_ppdb_aktivasi`, obj)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },

    resetAktivasi(_, item) {
      return axios
        .put(`${M_API}/sekolahall/${item.id}/reset_aktivasi`, item)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },

    switchInstansi({ state, commit, dispatch }, instansi_id) {
      // cek apakah perlu load ulang instansi
      return dispatch('detail', instansi_id)
        .then((res) => {
          // reject jika instansi tidak ditemukan
          if (res.id) {
            state.instansi_aktif = res
            state.instansi_id = res.id
            commit('main/noInstansi', false, {
              root: true,
            })
          } else {
            commit('main/noInstansi', true, {
              root: true,
            })
            return Promise.reject()
          }
        })
        .then(() => {
          return dispatch('akses', instansi_id)
        })
    },

    form(_, obj) {
      if (obj.id) {
        return axios
          .post(`${M_API}/sekolah/${obj.id}`, obj.formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            return res
          })
          .catch((e) => e)
      } else {
        return axios
          .post(`${M_API}/sekolah`, obj.formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            return res
          })
          .catch((e) => e)
      }
    },

    setPenanggungJawab(_, { instansi_id, obj }) {
      return axios
        .put(`${M_API}/sekolah/${instansi_id}/penanggungjawab`, obj)
        .then((res) => {
          return res
        })
        .catch((e) => e)
    },

    // eslint-disable-next-line
    cetakAkun({}, url) {
      return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      })
        .then((res) => (res.ok ? res.blob() : Promise.reject(res)))
        .then((res) => {
          const url = window.URL.createObjectURL(res)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', `Akun Anda`)
          document.body.appendChild(link)
          link.click()
          // eslint-disable-next-line
          window.URL.revokeObjectURL(url)
        })
        .catch((e) => {
          let p = e.json ? e.json().then((a) => Promise.reject(a)) : Promise.reject(e)
          return p
        })
        .catch((e) => {
          //Vue.prototype.$error(e.message);
          return Promise.reject(e)
        })
    },

    drop(_, instansi_id) {
      return axios.delete(`${M_API}/sekolah/${instansi_id}`).then((res) => {
        return res.data
      })
    },

    getMasters(_, params) {
      return axios.get(`${M_API}/master?${params}`).then((res) => {
        return res.data
      })
    },

    cekToken(_, token) {
      return axios.get(`${M_API}/sekolah_token/${token}`).then((res) => {
        return res.data
      })
    },
  },
}

export default store
