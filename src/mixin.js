import Vue from 'vue'
import { isCan } from './tools'

// const M_API = API + '/user'
// const lc = window.localStorage
// const INST_ACTIVE = 'lms_mt_inst'

Vue.mixin({
  methods: {
    isCan(perm) {
      return isCan(perm)
    },
    pVal(obj, a, b = undefined, c = undefined) {
      let r = '-'
      if (!obj) return r
      if (!obj[a]) return '-'
      r = obj[a]
      if (typeof b == 'undefined') return r
      if (!r[b]) return '-'
      r = r[b]
      if (typeof c == 'undefined') return r
      if (!r[c]) return '-'
      r = r[c]
      return r
    },
  },
  computed: {
    current_user() {
      return this.$store.getters['user/user']
    },
    current_kegiatan() {
      return this.$store.getters['kegiatan/kegiatan']
    },
    CONFIG() {
      return this.$store.getters['main/CONFIG']
    },
    user_id() {
      return this.$route.params.user_id
    },
    grup_id() {
      return this.$route.params.grup_id
    },
    kelas_id() {
      return this.$route.params.kelas_id
    },
    laporan_id() {
      return this.$route.params.laporan_id
    },
    survei_id() {
      return this.$route.params.survei_id
    },
    instansi_id() {
      return this.$route.params.instansi_id
    },
    rombel_id() {
      return this.$route.params.rombel_id
    },
    ajuan_id() {
      return this.$route.params.ajuan_id
    },
    list_laporan() {
      return this.$route.params.list_laporan
    },
    current_instansi() {
      return this.$store.getters['instansi/instansi_aktif']
    },
  },
})
