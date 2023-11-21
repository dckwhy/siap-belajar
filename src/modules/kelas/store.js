import axios from 'axios'
import { API } from '../../const'
import { normParam } from '../../tools'
const M_API = API + '/api'

const store = {
  namespaced: true,
  state: {
    kelas: null,
  },
  getters: {
    kelas(state) {
      return state.kelas
    },
  },
  mutations: {},
  actions: {
    // eslint-disable-next-line
    get({}, { sekolah_id, params }) {
      return axios
        .get(`${M_API}/sekolah/${sekolah_id}/kelas${normParam(params)}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    getKelas({}, { sekolah_id, kelas_id }) {
      return axios
        .get(`${M_API}/sekolah/${sekolah_id}/kelas/${kelas_id}/lihatkelas`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    detail(_, { sekolah_id, kelas_id }) {
      return axios
        .get(`${M_API}/sekolah/${sekolah_id}/kelas/${kelas_id}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    getKelasku({}, { sekolah_id, params }) {
      return axios
        .get(`${M_API}/sekolah/${sekolah_id}/kelasku${normParam(params)}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    getAll(_, params) {
      return [
        {
          id: 1,
          nama: 'IPA',
          tingkat_id: 1,
        },
        {
          id: 2,
          nama: 'IPS',
          tingkat_id: 1,
        },
      ]
    },
    form(_, { sekolah_id, obj }) {
      if (obj.id) {
        return axios
          .put(`${M_API}/sekolah/${sekolah_id}/kelas/${obj.id}`, obj)
          .then((res) => {
            return res
          })
          .catch((e) => e)
      } else {
        return axios
          .post(`${M_API}/sekolah/${sekolah_id}/kelas`, obj)
          .then((res) => {
            return res
          })
          .catch((e) => e)
      }
    },
    formRombel(_, { sekolah_id, kelas_id, obj }) {
      return axios
        .post(`${M_API}/sekolah/${sekolah_id}/kelas/${kelas_id}/rombel`, obj)
        .then((res) => {
          return res
        })
        .catch((e) => e)
    },
    formGuru(_, { instansi_id, kelas_id, obj }) {
      return axios
        .post(`${M_API}/sekolah/${instansi_id}/kelas/${kelas_id}/enrolguru`, obj)
        .then((res) => {
          return res
        })
        .catch((e) => e)
    },
    // eslint-disable-next-line
    unenrolled(_, { sekolah_id, kelas_id, obj }) {
      return axios
        .post(`${M_API}/sekolah/${sekolah_id}/kelas/${kelas_id}/unrombel`, obj)
        .then((res) => {
          return res
        })
        .catch((e) => e)
    },
    // eslint-disable-next-line
    unenrolledGuru(_, { sekolah_id, kelas_id, obj }) {
      return axios
        .post(`${M_API}/sekolah/${sekolah_id}/kelas/${kelas_id}/unenrolguru`, obj)
        .then((res) => {
          return res
        })
        .catch((e) => e)
    },
    // eslint-disable-next-line
    drop(_, item) {
      return axios.delete(`${M_API}/sekolah/${item.sekolah_id}/kelas/${item.id}`).then((res) => {
        return res.data
      })
    },

    // eslint-disable-next-line
    syncCourse({}, { sekolah_id, kelas_id }) {
      return axios
        .post(`${M_API}/sekolah/${sekolah_id}/kelas/${kelas_id}/sync_course`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    syncModul({}, { sekolah_id, kelas_id }) {
      return axios
        .post(`${M_API}/sekolah/${sekolah_id}/kelas/${kelas_id}/sync_modul`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
  },
}

export default store
