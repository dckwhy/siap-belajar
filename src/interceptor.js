import Vue from 'vue'
import axios from 'axios'
import store from './store'
import router from './router'

// Request interceptor
axios.interceptors.request.use((request) => {
  if (request.params && request.params.noprogress == true) {
    //
  } else {
    store.commit('main/pStart')
  }
  const token = store.getters['user/token']

  if (token) {
    request.headers.common['Authorization'] = `Bearer ${token}`
  }

  return request
})

const checkError = (status, message, res, conf) => {
  if (conf.params && conf.params.hideerror) {
    return Promise.reject(res)
  } else {
    const statusError = [400, 403]
    if (+status == 401) {
      Vue.prototype.$error('Sesi Anda telah Habis. Silakan masuk kembali')
      store.commit('user/logout')
      router.push({ name: 'login' })
      return Promise.reject(res)
    } else if (statusError.includes(status)) {
      Vue.prototype.$error(message)
      return Promise.reject(res)
    } else {
      Vue.prototype.$error('Terjadi kesalahan sistem. Silakan menghubungi Administrator.')

      return Promise.reject(res)
    }
  }
}

const createData = (status, message, response) => {
  Vue.prototype.$success(message)
  return response
}

// Response interceptor
axios.interceptors.response.use(
  (response) => {
    if (response.config.params && response.config.params.noprogress == true) {
      //
    } else {
      store.commit('main/pEnd')
    }
    if (+response.status == 201) {
      const { code = 201 } = response.data ? response.data : {}
      const { message = 'Data berhasil disimpan' } = response.data ? response.data : {}
      return createData(code, message, response)
    }
    // else
    return response
  },
  (error) => {
    if (!error.response) {
      alert('Periksa koneksi internet Anda.')
    }

    const originalRequest = error.config

    store.commit('main/pEnd')
    const { status = 500 } = error.response ? error.response : {}

    var { message = 'Unknown error' } = error.response ? error.response.data : {}

    if (typeof error.response.data == 'string') {
      message = error.response.data
    }

    return checkError(status, message, error.response.data, originalRequest)
  }
)
