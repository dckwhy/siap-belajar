<template>
  <m-dialog ref="dlgPassword" @save="save" :btnsave="false" title>
    <v-layout class row fill-height align-center justify-center>
      <v-flex xl5 lg6 md8 sm8>
        <v-stepper v-model="st" class="ra-2">
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card text>
                <v-card-title primary-title>
                  <span class="display-1 d-block primary--text">Lupa Password</span>
                </v-card-title>
                <v-card-text>
                  <v-form data-vv-scope="form-1" lazy-validation>
                    <v-layout column wrap>
                      <v-flex>
                        <v-text-field
                          label="Email"
                          v-model="email"
                          hint="Silahkan masukkan email Anda*"
                          persistent-hint
                          data-vv-name="email"
                          data-vv-as="Email"
                          v-validate="'required|email'"
                          :error-messages="errors.collect('form-1.email')"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn :loading="loading" color="success" @click="save">Reset Password</v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-card>
                <v-card-text>
                  <span class="display-1 font-weight-light d-block">
                    Link Reset Password telah dikirim ke email
                    <p class="blue--text">{{email}}</p>
                  </span>
                  <p class="mt-3 mb-0 red--text">
                    <v-divider></v-divider>
                    <br />Cek folder inbox atau spam pada email Anda dan klik link yang dikirim oleh sistem
                  </p>
                </v-card-text>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-layout>
  </m-dialog>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
export default {
  components: { VueRecaptcha },
  $_veeValidate: {
    validator: "new"
  },

  data() {
    return {
      st: 1,
      email: "",
      loading: false
    };
  },
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.st = 1;
      this.$validator.reset();
      this.user = obj ? { ...obj } : { ...this.defUser };
      // return this.loadRole().then(() => {
      return this.$refs.dlgPassword.open();
      // });
    },
    // eslint-disable-next-line
    markRecaptchaAsVerified(response) {
      this.registerForm.pleaseTickRecaptchaMessage = "";
      this.registerForm.recaptchaVerified = true;
    },
    // eslint-disable-next-line
    checkIfRecaptchaVerified() {
      if (!this.registerForm.recaptchaVerified) {
        this.registerForm.pleaseTickRecaptchaMessage = "Please tick recaptcha.";
        return true; // prevent form from submitting
      }
    },
    save() {
      // this.checkIfRecaptchaVerified()
      this.$validator
        .validateAll("form-1")
        .then(res => {
          if (!res) return Promise.reject();
          return res;
        })
        .then(() => {
          return this.$store.dispatch("user/link_password", {
            email: this.email
          });
        })
        .then(res => {
          this.st++;
          // this.$info("Reset Password Berhasil");
          return res;
        })
        .catch(e => e);
    }
  }
};
</script>
