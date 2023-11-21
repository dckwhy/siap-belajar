<template>
  <v-row class="pa-0 ma-0">
    <v-col cols="12" md="4" sm="6" lg="5" class="pa-5 ma-0">
      <v-form autocomplete="on" @submit.prevent data-vv-scope="form" lazy-validation>
        <v-row class="mt-5 pt-5">
          <v-col cols="12" sm="4" md="8" lg="7" class="ml-auto mr-auto">
            <div class="pa-0 my-5 mx-5">
              <v-avatar size="33" class="primary rounded-lg mr-2">
                <v-img
                  class="mr-auto ml-auto my-5 rounded-lg"
                  height="50px"
                  src="https://cdn.siap.id/s3/siap_belajar/portal/img/avatar.png"
                  lazy-src="https://cdn.siap.id/s3/siap_belajar/portal/img/avatar.png"
                  contain
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img> </v-avatar
              ><span class="font-weight-bold" style="font-size:15pt">Siap Belajar.</span>
            </div>
            <!-- <p class="font-weight-regular mb-0 px-3">Silakan melakukan</p>
            <p class="px-3 display-2 font-weight-bold">Login</p>
            <div class="px-3">
              <v-text-field
                outlined
                dense
                placeholder="Alamat Surel"
                append-icon="mdi-gmail"
                name="email"
                type="text"
                color="primary"
                background-color="white"
                v-model.trim="model.email"
                data-vv-name="email"
                data-vv-as="Surel"
                v-validate="'required|email'"
                @keyup.enter="login"
                :error-messages="errors.collect('form.email')"
              ></v-text-field>
            </div>
            <div class="px-3">
              <label class="caption">Kata Sandi</label>
              <v-text-field
                outlined
                dense
                placeholder="Kata Sandi"
                :append-icon="appendIcon"
                @click:append="switchVisibility"
                name="password"
                id="password"
                :type="passwordFieldType"
                color="primary"
                background-color="white"
                v-model="model.password"
                data-vv-name="password"
                data-vv-as="Kata Sandi"
                v-validate="'required'"
                @keyup.enter="login"
                :error-messages="errors.collect('form.password')"
              ></v-text-field>
              <div class="caption text-right mb-5">
                <br />
              </div>
            </div>
            <div class="px-3">
              <v-btn block large class="primary white--text" @click="login">Login</v-btn>
            </div> -->
            <div class="px-3 caption text-center">
              <br />
              <br />
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
    <v-col cols="12" md="8" sm="6" lg="7" class="pa-0 ma-0 d-none d-sm-flex">
      <v-img height="100%" src="https://cdn.siap.id/s3/siap_belajar/sim/Login-projects-siap-blajar.png">
        <v-row class="mt-10">
          <v-col cols="12" md="6" sm="12" lg="6" class="white--text mr-auto ml-auto"> </v-col>
        </v-row>
      </v-img>
    </v-col>
  </v-row>
</template>

<script>
import ChangeDlg from '../components/Register.vue'
import { SITE_KEY, BASE_API, CLIENT_ID, CLIENT_SECRET } from '@/const'
import ForgotPassword from '../components/ForgotPassword.vue'
const lc = window.localStorage
const TOKEN = 'token'
export default {
  components: {
    ChangeDlg,
    ForgotPassword,
  },
  $_veeValidate: {
    validator: 'new',
  },
  data: () => ({
    drawer: true,
    loading: false,
    appendIcon: 'mdi-eye-off',
    passwordFieldType: 'password',
    ForgotPassword: false,
    errorMessage: false,
    registerForm: {
      recaptchaVerified: false,
      pleaseTickRecaptchaMessage: '',
    },
    model: {
      email: null,
      password: null,
      grant_type: null,
    },
    show1: false,
    show2: true,
    show3: false,
    show4: false,
    password: 'Password',
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => "The email and password you entered don't match",
    },
  }),
  mounted() {
    lc.removeItem(TOKEN)
    this.$validator.reset()
    this.checkQuery()
  },
  computed: {
    sitekey() {
      return SITE_KEY
    },
  },
  methods: {
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
      this.passwordFieldType === 'password' ? (this.appendIcon = 'mdi-eye-off') : (this.appendIcon = 'mdi-eye')
    },
    login() {
      // this.checkIfRecaptchaVerified();
      this.loading = true
      this.$validator
        .validateAll('form')
        .then((res) => {
          if (!res) return Promise.reject()
          return res
        })
        .then(() => {
          // if (this.registerForm.recaptchaVerified) {
          if (!this.CONFIG.INSTANSI_ID) {
            return this.$store.dispatch('user/login', {
              grant_type: 'password',
              client_id: CLIENT_ID,
              client_secret: CLIENT_SECRET,
              username: this.model.email,
              password: this.model.password,
            })
          } else {
            return this.$store.dispatch('user/login', {
              grant_type: 'password',
              client_id: CLIENT_ID,
              client_secret: CLIENT_SECRET,
              username: this.model.email,
              password: this.model.password,
              instansi_id: this.CONFIG.INSTANSI_ID ? this.CONFIG.INSTANSI_ID : this.model.instansi_id,
            })
          }
          // }
        })
        .then((res) => {
          if (res && res.error == 'invalid_credentials') {
            this.errorMessage = true
          } else {
            this.$router.push({ name: 'beranda' })
          }

          this.loading = false
        })
        .catch(() => (this.loading = false))
    },
    checkQuery() {
      if (this.$route.query.token) {
        this.token = this.$route.query.token
        // clean query
        window.history.replaceState({}, document.title, '/login')
        // langsung lakukan verifikasi
        this.$nextTick(() => {
          this.verify()
        })
      } else {
        if (lc.getItem(TOKEN)) {
          this.$router.push({ name: 'instansi.pilih' })
        } else {
          window.location.href = BASE_API
        }
      }
    },
    verify() {
      this.$validator
        .validateAll('form')
        .then((res) => {
          if (!res) return Promise.reject()
        })
        .then(() => {
          this.loading = true
          this.$store
            .dispatch('user/login', { token: this.token })
            .then((res) => {
              this.loading = false
              res.id ? this.st++ : Promise.reject
            })
            .catch(() => {
              this.loading = false
            })
        })
        .catch((e) => e)
    },
  },
}
</script>
<style>
.bg {
  position: fixed;
  background-size: cover;
  background-image: url('https://cdn.siap.id/s3/siap_belajar/sim/logo-siap-belajar-login.png') no-repeat;
}
</style>
