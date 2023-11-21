<template>
  <v-navigation-drawer v-model="drawer" right temporary fixed width="300" style="z-index:10">
    <v-card flat class="pa-5">
      <v-row class="ml-3 pl-1 text-center">
        <v-col cols="12" sm="12" md="12" lg="12" xl="12">
          <v-avatar :size="150" class="grey lighten-4 mb-3 outlined">
            <img v-if="user.image" :src="user.image.url.logo" alt="avatar" />
            <img v-else src="img/avatar-l.png" alt="avatar" />
          </v-avatar>
          <p class="subtitle primary--text mb-0 font-weight-bold">{{ user.name }}</p>
          <p class="caption mb-0 grey--text">{{ user.email }}</p>
        </v-col>
      </v-row>

      <v-divider class="my-5"></v-divider>
      <v-list dense></v-list>
      <v-list class="mt-0 pt-0">
        <v-list-item class="grey--text" @click="toProfile">
          <v-list-item-action class="primary2 rounded-lg">
            <v-icon class="ma-3 primary--text">mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Profil Pengguna</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list-item class="mb-5" @click="pilihInstansi">
        <v-list-item-action class="secondary rounded-lg">
          <v-icon class="white--text ma-2">mdi-swap-horizontal-bold</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="caption grey--text">Instansi</v-list-item-title>
          <v-list-item-title class="caption mt-2">{{
            current_instansi ? current_instansi.nama : ''
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list>
        <v-list-item class="grey--text primary rounded-xl elevation-6 mt-5" @click="logout">
          <v-list-item-content>
            <v-list-item-title class="white--text">Keluar</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action class="white rounded-lg">
            <v-icon class="ma-2 primary--text">mdi-logout-variant</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
    <PilihDialog ref="dlgInstansi" />
  </v-navigation-drawer>
</template>

<script>
import { BASE_API } from '@/const'
import PilihDialog from '@/modules/instansi/components/PilihInstansiDialog'
const lc = window.localStorage
const TOKEN = 'token'
export default {
  components: { PilihDialog },
  data() {
    return {
      darkMode: false,
      drawer: false,
    }
  },
  computed: {
    rDrawer() {
      return this.$store.getters['main/rDrawer']
    },
    user() {
      return this.$store.getters['user/user']
    },
    token() {
      return this.$store.getters['user/token']
    },
  },
  mounted() {
    this.darkMode = lc.getItem('DARKMODE') == 'true' ? true : false
  },
  methods: {
    pilihInstansi() {
      this.$refs.dlgInstansi
        .open()

        .then((res) => res)
        .catch((e) => e)
    },
    toProfile() {
      this.$router.push({
        name: 'profil',
      })
    },
    changeMode(mode) {
      lc.setItem('DARKMODE', mode)
      this.darkMode = location.reload()
    },
    switchRole() {
      this.$confirm(
        `Silakan pilih Peran`,
        {
          role: [
            { id: 1, name: 'Admin' },
            { id: 2, name: 'Kontributor' },
            { id: 3, name: 'Kurator' },
          ],
        },
        'Pilih Peran'
      )
        .then((res) => {
          var obj = {
            name: this.user.name,
            no_hp: this.user.no_hp,
            change: true,
            peran: {
              id: res.role,
              name: res.role == 1 ? 'Administrator' : res.role == 2 ? 'Kontributor' : 'Kurator',
            },
          }
          return this.$store.commit('user/setUser', obj)
        })
        .then(() => {
          // this.$router.push({
          //   name: "home"
          // });
        })
        .catch((e) => e)
    },
    logout() {
      this.drawer = false
      var token = lc.getItem(TOKEN)

      if (token) {
        window.location.href = `${BASE_API}/logoutcas?access_token=` + token
        lc.removeItem(TOKEN)
      } else {
        window.location.href = `${BASE_API}/logoutcas`
      }

      // window.location.href = `${API}/api/logoutcas?access_token=` + token;
      // lc.removeItem(TOKEN)
      // this.$store
      //   .dispatch('user/logout')
      //   .then(() => this.$router.push({ name: 'login' }))
      //   .catch((e) => e)
    },
  },
  watch: {
    rDrawer(n) {
      this.drawer = n
    },
    drawer(n) {
      this.$store.commit('main/setRDrawer', n)
    },
  },
}
</script>

<style></style>
