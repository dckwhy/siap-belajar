<template>
  <v-container class="pa-0 mt-5">
    <v-row class="ma-5">
      <v-col cols="12" md="6" sm="12" align-self="center">
        <p class="display-1">Akun Anda belum terdaftar pada layanan SIAP Belajar. </p>
        <br />
        <p class="body-1 grey--text text--darken-1"
          >Hal ini dapat disebabkan karena instansi Anda belum mendapatkan akses ke layanan SIAP Belajar. <br />Terima
          kasih
        </p>
        <div class="my-2">
          <v-btn @click="logout" color="primary white--text"> <v-icon left>mdi-chevron-left</v-icon>Kembali </v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <v-img height="auto" src="https://cdn.siap.id/s3/simpkb/asset img/guru-praktik-baik/403.png"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { BASE_API } from '@/const'
const lc = window.localStorage
const TOKEN = 'token'
export default {
  $_veeValidate: {
    validator: 'new',
  },
  components: {},

  data() {
    return {}
  },
  methods: {
    // eslint-disable-next-line
    logout() {
      this.drawer = false
      var token = lc.getItem(TOKEN)

      if (token) {
        window.location.href = `${BASE_API}/logoutcas?access_token=` + token
        lc.removeItem(TOKEN)
      } else {
        window.location.href = `${BASE_API}/logoutcas`
      }
      // this.$store
      // .dispatch("user/logout")
      // .then(() => this.$router.push({ name: "login" }))
      // .catch(e => e);
    },
  },
}
</script>
<style scoped lang="css">
@media only screen and (min-width: 960px) {
  .container {
    max-width: 1140px;
  }
  .v-content__wrap {
    background-color: white;
  }
}
</style>
