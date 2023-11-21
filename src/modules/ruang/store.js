import axios from "axios";
import { API } from "../../const";
import { normParam } from "../../tools";
const M_API = API + "/api";

const store = {
  namespaced: true,
  state: {
    ruang: null
  },
  getters: {
    ruang(state) {
      return state.ruang;
    }
  },
  mutations: {},
  actions: {
    // eslint-disable-next-line
    get({}, { sekolah_id, params }) {
      return axios
        .get(`${M_API}/sekolah/${sekolah_id}/ruang${normParam(params)}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },

    // eslint-disable-next-line
    getAll(_, params) {
      return [
        {
          id: 1,
          nama: "IPA",
          tingkat_id: 1
        },
        {
          id: 2,
          nama: "IPS",
          tingkat_id: 1
        }
      ];
    },
    form(_, { sekolah_id, obj }) {
      if (obj.id) {
        return axios
          .put(`${M_API}/sekolah/${sekolah_id}/ruang/${obj.id}`, obj)
          .then(res => {
            return res;
          })
          .catch(e => e);
      } else {
        return axios
          .post(`${M_API}/sekolah/${sekolah_id}/ruang`, obj)
          .then(res => {
            return res;
          })
          .catch(e => e);
      }
    },
    // eslint-disable-next-line
    drop(_, { sekolah_id, obj }) {
      return axios
        .delete(`${M_API}/sekolah/${sekolah_id}/ruang/${obj.id}`)
        .then(res => {
          return res.data;
        });
    }
  }
};

export default store;
