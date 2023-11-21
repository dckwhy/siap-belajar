<template>
  <div class="white">
    <v-app-bar :color="darkMode ? 'background' : 'background'" app flat class=" my-4 mx-3 px-1 rounded-t-xl">
      <v-avatar
        size="30px"
        class="secondary mr-3"
        style=" webkit-box-shadow: 3px 3px 5px 2px #d5d0e4;"
        v-if="current_instansi && this.$vuetify.breakpoint.smAndDown"
      >
        <v-app-bar-nav-icon
          :color="darkMode ? 'white' : 'white'"
          @click.stop="$store.commit('main/lToggle')"
          v-show="isShow"
        ></v-app-bar-nav-icon>
      </v-avatar>
      <div :class="darkMode ? 'white--text' : 'primary--text'">
        {{ moduleName }}
      </div>
      <v-spacer></v-spacer>
      <m-button class="mr-2" fab x-small outlined icon="mdi-help" action="toGuide" @toGuide="toGuide"></m-button>

      <a>
        <v-avatar
          @click.stop="$store.commit('main/rToggle')"
          :size="37"
          color="white"
          style=" webkit-box-shadow: 3px 3px 5px 2px #d5d0e4;"
        >
          <img v-if="user.image" :src="user.image.url.logo" alt="avatar" />
          <img v-else src="img/avatar-l.png" alt="avatar" />
        </v-avatar>
      </a>
    </v-app-bar>
    <PilihInstansi ref="dlg" />
    <PanduanAjuan ref="dlgPanduan" />
  </div>
</template>

<script>
import PilihInstansi from '../modules/instansi/components/PilihInstansiDialog'
import PanduanAjuan from '@/components/PanduanAjuan.vue'
const lc = window.localStorage
export default {
  components: {
    PilihInstansi,
    PanduanAjuan,
  },
  data() {
    return {
      sidebar: false,
      avatar: null,
      menu: false,
      // message : 'asdasd',
      // fav : false,
      loading: false,
      items: [
        { to: { name: 'home' }, title: 'Halaman Depan' },
        { to: { name: 'home' }, title: 'Perencanaan' },
        { to: { name: 'home' }, title: 'Implementasi' },
        { to: { name: 'home' }, title: 'Laporan' },
      ],
    }
  },
  computed: {
    totalInstansi() {
      return this.$store.getters['main/totalInstansi']
    },
    user() {
      let u = this.$store.getters['user/user']
      // if(u.file_foto.data==null){
      //   u.file_foto=null
      // }

      // eslint-disable-next-line

      return u ? u : null
    },
    moduleName() {
      return this.$route.meta && this.$route.meta.module ? this.$route.meta.module : ''
    },
    isShow() {
      return this.$route.name !== 'instansi.pilih'
    },
    instansiTerpilih() {
      let i = this.$store.getters['instansi/instansi_aktif']
      if (i && i.roleku && i.roleku.id == 3) {
        return false
      } else {
        return true
      }
    },
    darkMode() {
      return lc.getItem('DARKMODE') == 'true' ? true : false
    },
  },
  methods: {
    toGuide() {
      this.$refs.dlgPanduan.open()
    },
    clickDrawer() {
      this.$emit('dclicked')
    },
    pilihInstansi() {
      this.$refs.dlg
        .open()
        .then((res) => res)
        .catch((e) => e)
    },
    logout() {
      this.loading = true
      this.$store
        .dispatch('user/logout')
        .then(() => {
          this.menu = false
          this.loading = false
          this.$router.push({ name: 'login' })
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
  watch: {
    // hSidebar(n) {
    //   this.sidebar = n;
    // }
  },
}
</script>
