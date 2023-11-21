import axios from "axios";
import { API } from "../../const";
import { normParam } from "../../tools";
const M_API = API + "/api";

const store = {
  namespaced: true,
  state: {
    modul: null
  },
  getters: {
    modul(state) {
      return state.modul;
    }
  },
  mutations: {},
  actions: {
    // eslint-disable-next-line
    get({}, { sekolah_id, params }) {
      return axios
        .get(`${M_API}/sekolah/${sekolah_id}/modul${normParam(params)}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },

    // eslint-disable-next-line
    getAll({}, { sekolah_id, params }) {
      return axios
        .get(`${M_API}/sekolah/${sekolah_id}/moduls${normParam(params)}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    form(_, { sekolah_id, obj }) {
      if (obj.id) {
        return axios
          .put(`${M_API}/sekolah/${sekolah_id}/modul/${obj.id}`, obj)
          .then(res => {
            return res;
          })
          .catch(e => e);
      } else {
        return axios
          .post(`${M_API}/sekolah/${sekolah_id}/modul`, obj)
          .then(res => {
            return res;
          })
          .catch(e => e);
      }
    },
    // eslint-disable-next-line
    drop(_, { sekolah_id, obj }) {
      return axios
        .delete(`${M_API}/sekolah/${sekolah_id}/modul/${obj.id}`)
        .then(res => {
          return res.data;
        });
    }
  }
};

export default store;
