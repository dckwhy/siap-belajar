import axios from 'axios'
import { API } from '../../const'
import { normParam } from '../../tools'
const M_API = API + '/api'

const store = {
  namespaced: true,
  state: {
    kandidat: null,
  },
  getters: {
    kandidat(state) {
      return state.kandidat
    },
  },
  actions: {
    // eslint-disable-next-line
    get({}, { sekolah_id, params }) {
      return axios
        .get(`${M_API}/sekolah/${sekolah_id}/siswa_ppdb${normParam(params)}`)
        .then((res) => {
          return res.data
        })
        .catch((err) => Promise.reject(err))
    },
    cetak(_, { sekolah_id, obj }) {
      const url = `${M_API}/sekolah/${sekolah_id}/siswa_ppdb/${obj.id}/cetak`
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
  },
}

export default store
