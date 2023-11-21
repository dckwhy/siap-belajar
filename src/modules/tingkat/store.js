import axios from "axios";
import { API } from "../../const";
import { normParam } from "../../tools";
const M_API = API + "/api";

const store = {
  namespaced: true,
  state: {
    tingkat: null
  },
  getters: {
    tingkat(state) {
      return state.tingkat;
    }
  },
  mutations: {},
  actions: {
    // eslint-disable-next-line
    get({}, { sekolah_id, params }) {
      return axios
        .get(`${M_API}/sekolah/${sekolah_id}/tingkat${normParam(params)}`)
        .then(res => {
          return res.data;
        })
        .catch(err => Promise.reject(err));
    },
    // eslint-disable-next-line
    drop(_, item) {
      return axios.delete(`${API}/tingkat/${item.user_id}`).then(res => {
        return res.data;
      });
    }
  }
};

export default store;
