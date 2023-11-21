import axios from 'axios'
import { API } from '../../const'
import { normParam } from '../../tools'
const M_API = API + '/api'

const store = {
  namespaced: true,
  state: {
    ajuan: null,
  },
  getters: {
    ajuan(state) {
      return state.ajuan
    },
  },
  mutations: {},
  actions: {
    // eslint-disable-next-line
    get({}, { sekolah_id, params }) {
      return axios
        .get(`${M_API}/sekolah/${sekolah_id}/ajuan${normParam(params)}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    detail({}, { sekolah_id, ajuan_id }) {
      return axios
        .get(`${M_API}/sekolah/${sekolah_id}/ajuan/${ajuan_id}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    ajuanku({}, { sekolah_id }) {
      return axios
        .get(`${M_API}/sekolah/${sekolah_id}/ajuanku`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    persetujuan(_, { sekolah_id, ajuan_id, obj }) {
      return axios
        .post(`${M_API}/sekolah/${sekolah_id}/ajuan/${ajuan_id}/persetujuan`, obj)
        .then((res) => {
          return res
        })
        .catch((e) => e)
    },
  },
}

export default store
