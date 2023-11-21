import axios from 'axios'
import { API } from '../../const'
import { normParam } from '../../tools'
const M_API = API + '/api'
// import { normParam } from '@/tools'
// import Vue from 'vue'

// const M_API = API + '/user'
const lc = window.localStorage
const TOKEN = 'token'
const RTOKEN = 'rToken'

const store = {
  namespaced: true,
  state: {
    user: null,
    config: null,
    token: lc.getItem(TOKEN),
    rToken: lc.getItem(RTOKEN),
    permission: [],
    roles: [],
    meta: null,
    promiseRT: null,
    arrayOfRT: [],
    retryRefresh: true,
  },
  getters: {
    user(state) {
      return state.user
    },
    permission(state) {
      return state.permission
    },
    userMeta(state) {
      return state.meta ? state.meta.users_meta : null
    },
    roles(state) {
      return state.roles
    },
    check(state) {
      return state.token
    },
    token(state) {
      return state.token
    },
    rToken(state) {
      return state.rToken
    },
    promiseRT(state) {
      return state.promiseRT
    },
    arrayOfRT(state) {
      return state.arrayOfRT
    },
    retryRefresh(state) {
      return state.retryRefresh
    },
  },
  mutations: {
    addArrayRT(state, val) {
      state.arrayOfRT.push(val)
    },
    setPromiseRT(state, val) {
      state.promiseRT = val
      state.promiseRT.then(() => {
        //jalankan function request ulang API
        var y = state.arrayOfRT.map((f) => f())

        //setelah semua promise y dijalankan set null
        Promise.allSettled(y)
          .then(() => {
            state.promiseRT = null
            state.arrayOfRT = []
          })
          .catch(() => {
            state.promiseRT = null
            state.arrayOfRT = []
          })
      })
    },
    retryRefresh(state, val) {
      state.retryRefresh = val
    },
    login(state, { user, token, rToken }) {
      let u = {
        ...user,
      }
      delete u.token

      state.user = user
      state.token = token
      state.rToken = rToken
      lc.setItem(TOKEN, token)
      lc.setItem(RTOKEN, rToken)
    },
    logout(state) {
      state.user = null
      state.token = null
      state.rToken = null
      state.instansi_aktif = null
      // state.role = null
      state.roles = []
      state.permission = []
      state.promiseRT = null
      state.arrayOfRT = []
      state.retryRefresh = true

      lc.removeItem(TOKEN)
      lc.removeItem(RTOKEN)
      // lc.removeItem(INSTANSI_AKTIF)
      // lc.removeItem(ROLE)
      // if (Vue.prototype.$Tawk) {
      //   Vue.prototype.$Tawk.$hideWidget()
      //   Vue.prototype.$Tawk.$endChat()
      // }
    },
    setToken(state, { token }) {
      state.token = token
      lc.setItem(TOKEN, token)
    },
    setrToken(state, { rToken }) {
      state.rToken = rToken
      lc.setItem(RTOKEN, rToken)
    },
    delToken(state) {
      state.token = null
      lc.removeItem(TOKEN)
    },
  },
  actions: {
    // eslint-disable-next-line
    get({}, { sekolah_id, params }) {
      return axios
        .get(`${M_API}/sekolah/${sekolah_id}/user${normParam(params)}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    getKandidat({}, { sekolah_id, params }) {
      return axios
        .get(`${M_API}/sekolah/${sekolah_id}/rombel_kandidat${normParam(params)}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    cetak(_, { sekolah_id, obj }) {
      const url = `${M_API}/sekolah/${sekolah_id}/user/${obj.id}/reset_password`
      axios({
        url: url,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]))
        var fileLink = document.createElement('a')

        fileLink.href = fileURL
        var fileName = ''
        fileLink.setAttribute('download', 'Cetak Akun' + fileName + ' ' + new Date() + '.pdf')
        document.body.appendChild(fileLink)

        fileLink.click()
      })
    },
    // eslint-disable-next-line
    getGuru({}, { sekolah_id, kelas_id, params }) {
      return axios
        .get(`${M_API}/sekolah/${sekolah_id}/kelas/${kelas_id}/kandidat${normParam(params)}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    getAllUser({}, { sekolah_id, params }) {
      return axios
        .get(`${M_API}/sekolah/${sekolah_id}/kandidat${normParam(params)}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    getPeran({}, sekolah_id) {
      return axios
        .get(`${M_API}/sekolah/${sekolah_id}/perans`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    cekToken(_, obj) {
      return axios
        .get(`${M_API}/siswa_ppdb_token/${obj.token}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    aktivasiToken(_, obj) {
      return axios
        .post(`${M_API}/siswa_ppdb_aktivasi_token`, obj)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    aktivasiByKode(_, obj) {
      return axios
        .get(`${M_API}/siswa_ppdb_aktivasi_kode/${obj.kodeAktivasi}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    aktivasiAkunInstansi(_, obj) {
      return axios
        .get(`${M_API}/sekolah_aktivasi_kode/${obj.kodeAktivasi}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    cekPasspor(_, email) {
      // 1 = email sudah digunakan (paspor dan sim ada)
      // 2 = ada di paspor saja
      // 9 = baru
      return axios
        .get(`${M_API}/cekemail/${email}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    checkAvailable({}, { sekolah_id, params }) {
      return axios
        .get(`${M_API}/sekolah/${sekolah_id}/user_by_email${normParam(params)}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    importUser({}, obj) {
      let formData = new FormData()
      formData.append('sekolah_id', obj.id)
      formData.append('file', obj.file)
      return axios.post(`${M_API}/sekolah/${obj.id}/user_upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    // eslint-disable-next-line
    unggahPengguna({}, { sekolah_id, obj }) {
      return axios
        .post(`${M_API}/sekolah/${sekolah_id}/user_upload_simpan`, obj)
        .then((res) => {
          return res
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    instansi({}, params) {
      return axios
        .get(`${M_API}/tenant${normParam(params)}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    profil({ state }) {
      return axios
        .get(`${M_API}/profilku`)
        .then((res) => {
          state.user = {
            ...res.data,
          }
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    detail(_, user_id) {
      return axios.get(`${API}/users/${user_id}`).then((res) => {
        return res.data
      })
    },
    // eslint-disable-next-line
    verify(_, token) {
      return axios.post(`${M_API}/verify`, token).then((res) => {
        return res.data
      })
    },
    link_password(_, data) {
      return axios.post(`${M_API}/link_password`, data).then((res) => {
        return res.data
      })
    },
    changePassword(_, data) {
      return axios.put(`${M_API}/ganti_password`, data).then((res) => {
        return res.data
      })
    },
    resetPassword(_, data) {
      return axios.post(`${M_API}/password`, data).then((res) => {
        return res.data
      })
    },
    setPassword(_, data) {
      return axios.post(`${M_API}/siswa_ppdb_kirim_email`, data).then((res) => {
        return res.data
      })
    },
    setPasswordInstansi(_, data) {
      return axios.post(`${M_API}/sekolah_kirim_email`, data).then((res) => {
        return res.data
      })
    },
    // eslint-disable-next-line
    create({}, { sekolah_id, obj }) {
      if (obj.editable) {
        return axios
          .put(`${M_API}/sekolah/${sekolah_id}/user/${obj.id}`, obj)
          .then((res) => {
            return res
          })
          .catch((err) => Promise.reject(err))
      } else {
        return axios
          .post(`${M_API}/sekolah/${sekolah_id}/user`, obj)
          .then((res) => {
            return res
          })
          .catch((err) => Promise.reject(err))
      }
    },
    // eslint-disable-next-line
    register(_, obj) {
      return axios
        .post(`${M_API}/register`, obj)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    drop(_, item) {
      return axios.delete(`${API}/users/${item.id}`).then((res) => {
        return res.data
      })
    },
    refreshToken(_, { grant_type, client_id, client_secret, refresh_token }) {
      return axios
        .post(`${API}/oauth/token`, {
          grant_type,
          client_id,
          client_secret,
          refresh_token,
        })
        .then((res) => {
          return res.data
        })
    },
    saveToken({ dispatch, commit }, token) {
      commit('setToken', token)
      // try get me
      return dispatch('fetch').catch(() => {
        commit('delToken', null)
        return Promise.reject()
      })
    },
    // eslint-disable-next-line
    login(
      { commit, dispatch, state },
      // eslint-disable-next-line
      { grant_type, client_id, client_secret, username, password, instansi_id }
    ) {
      return axios
        .post(`${API}/oauth/token`, {
          grant_type,
          client_id,
          client_secret,
          username,
          password,
          instansi_id,
        })
        .then((res) => {
          let token = res.data.access_token
          let rToken = res.data.refresh_token
          state.token = token
          commit('login', {
            token,
            rToken,
          })
          return dispatch('fetch')
        })
        .catch((err) => {
          Promise.reject(err)
          return err
        })
    },
    // eslint-disable-next-line
    logout({ commit }) {
      // return axios.get(`${BASE_API}/logout`)
      //   .then(() => {
      //     commit('logout')
      //   })
      commit('logout')
      return Promise.resolve()
    },
    // eslint-disable-next-line
    fetch({ state, dispatch }) {
      if (!state.token) return Promise.reject(null)
      else {
        if (state.user) {
          return Promise.resolve()
        } else {
          // state.user = { email: "test@test.com", nama: "Admin" };
          return axios.get(`${M_API}/self`).then((res) => {
            state.user = {
              ...res.data,
              nama: res.data.name,
            }
          })
        }
      }
    },
    // eslint-disable-next-line
    getRole({ state }) {
      return axios.get(`${API}/users/list-permissions`).then((res) => {
        state.permission = res.data.data
      })
    },
  },
}

export default store
