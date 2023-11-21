import axios from 'axios'
import { API } from '../../const'
import { normParam } from '../../tools'
const M_API = API + '/api'

const store = {
  namespaced: true,
  state: {
    rombel: null,
  },
  getters: {
    rombel(state) {
      return state.rombel
    },
  },
  mutations: {},
  actions: {
    // eslint-disable-next-line
    get({}, { sekolah_id, params }) {
      return axios
        .get(`${M_API}/sekolah/${sekolah_id}/rombel${normParam(params)}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    getAll(_, { sekolah_id, params }) {
      return axios
        .get(`${M_API}/sekolah/${sekolah_id}/rombels${normParam(params)}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    getKandidatGrup({}, { instansi_id, rombel_id, params }) {
      var _url = `${M_API}/sekolah/${instansi_id}/rombel/${rombel_id}/kandidat`
      return axios
        .get(`${_url}${normParam(params)}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    getKandidatRombel({}, { instansi_id, kelas_id, params }) {
      var _url = `${M_API}/sekolah/${instansi_id}/kelas/${kelas_id}/kandidatrombel`
      return axios
        .get(`${_url}${normParam(params)}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    formKandidat(_, { instansi_id, rombel_id, obj }) {
      return axios
        .post(`${M_API}/sekolah/${instansi_id}/rombel/${rombel_id}/peserta`, obj)
        .then((res) => {
          return res
        })
        .catch((e) => e)
    },
    // eslint-disable-next-line
    unenrolled(_, { instansi_id, rombel_id, obj }) {
      return axios
        .post(`${M_API}/sekolah/${instansi_id}/rombel/${rombel_id}/unpeserta`, obj)
        .then((res) => {
          return res
        })
        .catch((e) => e)
    },
    form(_, { sekolah_id, obj }) {
      if (obj.id) {
        return axios
          .put(`${M_API}/sekolah/${sekolah_id}/rombel/${obj.id}`, obj)
          .then((res) => {
            return res
          })
          .catch((e) => e)
      } else {
        return axios
          .post(`${M_API}/sekolah/${sekolah_id}/rombel`, obj)
          .then((res) => {
            return res
          })
          .catch((e) => e)
      }
    },
    // eslint-disable-next-line
    detail(_, { sekolah_id, rombel_id }) {
      return axios
        .get(`${M_API}/sekolah/${sekolah_id}/rombel/${rombel_id}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    drop(_, item) {
      return axios.delete(`${M_API}/sekolah/${item.sekolah_id}/rombel/${item.id}`).then((res) => {
        return res.data
      })
    },
  },
}

export default store
