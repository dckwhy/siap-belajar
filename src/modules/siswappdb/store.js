import axios from 'axios'
import { API } from '../../const'
import { normParam } from '../../tools'
const M_API = API + '/api'

const store = {
  namespaced: true,
  state: {
    siswappdb: null,
  },
  getters: {
    siswappdb(state) {
      return state.siswappdb
    },
  },
  mutations: {},
  actions: {
    // eslint-disable-next-line
    get({}, { sekolah_id, params }) {
      return axios
        .get(`${M_API}/sekolah/${sekolah_id}/siswa${normParam(params)}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    getProvinsi({}, { params }) {
      return axios
        .get(`${M_API}/master?master=propinsi`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    getKota({}, { id, params }) {
      return axios
        .get(`${M_API}/master?master=kota&propinsi_id=${id}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    getKecamatan({}, { id, params }) {
      return axios
        .get(`${M_API}/master?master=kecamatan&kota_id=${id}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    getKelurahan({}, { id, params }) {
      return axios
        .get(`${M_API}/master?master=kelurahan&kecamatan_id=${id}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    getDukcapil({}, nik) {
      return axios
        .get(`${M_API}/dukcapil/${nik}`, {
          params: {
            noprogress: true,
          },
        })
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    detail({}, { sekolah_id, siswa }) {
      return axios
        .get(`${M_API}/sekolah/${sekolah_id}/siswa/${siswa.id}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    biodata(_, { sekolah_id, obj }) {
      if (obj.id) {
        return axios
          .put(`${M_API}/sekolah/${sekolah_id}/siswa/${obj.id}`, obj)
          .then((res) => {
            return res
          })
          .catch((e) => e)
      } else {
        return axios
          .post(`${M_API}/sekolah/${sekolah_id}/siswa`, obj)
          .then((res) => {
            return res
          })
          .catch((e) => e)
      }
    },
    unggah(_, { sekolah_id, siswa_id, obj }) {
      let formData = new FormData()
      formData.append('file_piagam', obj)
      return axios.post(`${M_API}/sekolah/${sekolah_id}/siswa/${siswa_id}/uploadpiagam`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    // eslint-disable-next-line
    getPrestasi({}, params) {
      return axios
        .get(`${M_API}/master${normParam(params)}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    // eslint-disable-next-line
    importAjuan({}, obj) {
      let formData = new FormData()
      formData.append('sekolah_id', obj.id)
      formData.append('file', obj.file)
      return axios
        .post(`${M_API}/sekolah/${obj.id}/siswa_upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          params: {
            hideerror: true,
          },
        })
        .catch((err) => {
          return Promise.reject(err)
        })
    },
  },
}

export default store
