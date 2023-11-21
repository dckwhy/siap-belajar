<template>
  <v-container container--fluid fill-height class="primary">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="12" md="4" lg="4" xl="4">
        <v-stepper v-model="st" class="ra-2">
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card text class="rounded-lg">
                <div align="center" justify="center">
                  <v-img src="https://cdn.siap.id/s3/siap_belajar/sim/aktivasi.png" width="200px"></v-img>
                </div>
                <v-card-title primary-title class="justify-space-around mb-0 pb-0">
                  <h3 class="tittle primary--text d-block text-center">Aktivasi</h3>
                </v-card-title>
                <v-card-text>
                  <v-form data-vv-scope="form-aktivasi" lazy-validation>
                    <v-row column wrap>
                      <v-col cols="12" class="justify-space-around text-center"
                        >Silakan melakukan aktivasi akun dengan memasukkan kode token yang Anda dapat</v-col
                      >
                      <v-col cols="12" class="my-3 py-0">
                        <v-text-field
                          label="Kode Token"
                          v-model="token"
                          hint="Silakan masukkan kode token Anda*"
                          outlined
                          dense
                          persistent-hint
                          data-vv-name="token"
                          data-vv-as="Kode Token"
                          v-validate="'required'"
                          :error-is_ssos="errors.collect('form-aktivasi.token')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" class="my-3 py-0">
                        <v-text-field
                          outlined
                          dense
                          persistent-hint
                          autocomplete="false"
                          hint="Silakan masukkan surel Siap Online Anda"
                          name="Alamat Surel"
                          label="Surel"
                          v-model="email"
                          data-vv-name="email"
                          data-vv-as="Surel"
                          v-validate.persistent="'required|email'"
                          :error-messages="errors.collect('form-aktivasi.email')"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" class="justify-space-around text-center pt-0 mt-0">
                        <v-btn
                          :loading="loading"
                          medium
                          block
                          class="black--text"
                          color="secondary"
                          @click="aktivasi"
                          style=" webkit-box-shadow: 0px 2px 7px 5px #D3D3D3;"
                          >AKTIFKAN</v-btn
                        >
                        <router-link class="ok" :to="{ name: 'login' }">
                          <p class="mt-4 mb-0">Kembali ke halaman Login</p>
                        </router-link>
                      </v-col>
                      <br />
                    </v-row>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
            <!-- <v-stepper-content step="2">
              <v-card text class="rounded-lg mb-0 pb-0">
                <div align="center" justify="center">
                  <v-img src="https://cdn.siap.id/s3/siap_belajar/sim/katasandi.png" width="200px"></v-img>
                </div>
                <v-card-title primary-title class="justify-space-around mb-0 pb-0">
                  <h3 class="tittle primary--text d-block text-center">Aktivasi Anda Berhasil!</h3>
                </v-card-title>
                <v-card-text class="mb-0 pb-0">
                  <v-form @submit.prevent data-vv-scope="form-sandi" lazy-validation>
                    <v-row align="center" justify="center">
                      <v-col cols="12" class="justify-space-around text-center"
                        >Langkah selanjutnya silakan inputkan Data Akun yang nantinya akan Anda gunakan untuk Login pada
                        SIAP Belajar</v-col
                      >
                      <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                        <v-text-field
                          outlined
                          dense
                          persistent-hint
                          autocomplete="false"
                          name="Nama"
                          label="Nama"
                          v-model="nama"
                          @keyup.13.prevent=""
                          data-vv-name="nama"
                          data-vv-as="Nama"
                          v-validate.persistent="'required'"
                          :error-messages="errors.collect('form-sandi.nama')"
                        ></v-text-field>

                        <v-text-field
                          outlined
                          dense
                          persistent-hint
                          autocomplete="false"
                          name="Alamat Surel"
                          label="Surel"
                          v-model="email"
                          data-vv-name="email"
                          data-vv-as="Surel"
                          v-validate.persistent="'required|email'"
                          :error-messages="errors.collect('form-sandi.email')"
                        ></v-text-field>

                        <v-text-field
                          ref="password"
                          outlined
                          dense
                          persistent-hint
                          :append-icon="appendIcon"
                          @click:append="switchVisibility"
                          :type="passwordFieldType"
                          label="Masukkan Kata Sandi"
                          v-model="password"
                          data-vv-name="password"
                          data-vv-as="Kata Sandi"
                          v-validate="'required|min:6'"
                          :error-messages="errors.collect('form-sandi.password')"
                        ></v-text-field>

                        <v-text-field
                          outlined
                          dense
                          persistent-hint
                          :append-icon="appendIcon"
                          @click:append="switchVisibility"
                          :type="passwordFieldType"
                          label="Konfirmasi Kata Sandi"
                          v-model="password_confirmation"
                          data-vv-name="password_confirmation"
                          data-vv-as="Konfirmasi Kata Sandi"
                          v-validate="'required|min:6|confirmed:password'"
                          :error-messages="errors.collect('form-sandi.password_confirmation')"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
                <v-card-actions class="pt-0 mt-0">
                  <v-btn
                    :loading="loading"
                    block
                    class="black--text mb-2"
                    color="secondary"
                    @click="setPassword"
                    style=" webkit-box-shadow: 0px 2px 7px 5px #D3D3D3;"
                    >Buat Kata Sandi</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-stepper-content> -->
            <v-stepper-content step="3">
              <v-card>
                <div align="center" justify="center">
                  <v-img src="https://cdn.siap.id/s3/siap_belajar/sim/katasandi.png" width="200px"></v-img>
                </div>
                <v-card-title primary-title class="justify-space-around mb-0 pb-0">
                  <h3 class="tittle primary--text d-block text-center">Aktivasi Berhasil</h3>
                </v-card-title>
                <v-card-text class="black--text">
                  <div v-if="user">
                    <p class="my-0 orange--text text-center title">{{ pVal(user, 'nama_sekolah') }}</p>
                    <br />
                    <!-- <p class="my-0 black--text text-center">Hai {{ pVal(user, 'nama_akun_institusi') }}</p> -->
                    <p class="my-0 text-center"
                      ><a class="blue--text text-center" :href="'mailto:' + email"
                        ><u>{{ email }}</u></a
                      ></p
                    >
                    <p class="mt-3 text-center">
                      Anda telah berhasil melakukan aktivasi institusi Anda. Silakan Login dengan surel di atas melalui
                      tombol berikut</p
                    >
                    <p
                      ><v-btn
                        :loading="loading"
                        block
                        color="secondary"
                        class="black--text mt-3"
                        style=" webkit-box-shadow: 0px 2px 7px 5px #D3D3D3;"
                        @click="toLogin"
                        >Masuk</v-btn
                      ></p
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
export default {
  components: { VueRecaptcha },
  $_veeValidate: {
    validator: 'new',
  },

  data() {
    return {
      st: 1,
      dialog: false,
      user: null,
      nama: null,
      appendIcon: 'mdi-eye-off',
      passwordFieldType: 'password',
      token: '',
      password: null,
      email: null,
      password_confirmation: null,
      loading: false,
      is_sso: null,
    }
  },
  activated() {
    this.user = null
    this.dialog = false
    this.is_sso = false
  },
  mounted() {
    this.checkQuery()
  },
  methods: {
    checkQuery() {
      if (this.$route.query.token) {
        this.token = this.$route.query.token
      }
    },
    // eslint-disable-next-line
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
      this.passwordFieldType === 'password' ? (this.appendIcon = 'mdi-eye-off') : (this.appendIcon = 'mdi-eye')
    },
    toLogin() {
      this.dialog = false
      this.$router.push({
        name: 'login',
      })
    },
    aktivasi() {
      this.$validator
        .validateAll('form-aktivasi')
        .then((res) => {
          if (!res) return Promise.reject()
          return res
        })
        .then(() => {
          return this.$store
            .dispatch('instansi/aktivasi', {
              token: this.token,
              email: this.email,
            })
            .then((res) => {
              this.user = res
              this.st = 3
              this.is_sso = false
              return res
            })
            .catch((e) => e)
        })
        .catch((e) => e)
    },
    setPassword() {
      this.$validator
        .validateAll('form-sandi')
        .then((res) => {
          if (!res) return Promise.reject()
          return res
        })
        .then(() => {
          return this.$store
            .dispatch('user/setPassword', {
              email: this.email,
              nama: this.nama,
              password: this.password,
              password_confirm: this.password_confirmation,
              token: this.token,
            })
            .then((res) => {
              this.st = 3
              this.dialog = true
              return res
            })
            .catch((e) => e)
        })

        .catch((e) => e)
    },
  },
}
</script>
