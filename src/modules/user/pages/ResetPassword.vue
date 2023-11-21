<template>
  <v-app id="login" class="primary">
    <v-container container--fluid fill-height>
      <span class="laptop"></span>
      <span class="write"></span>
      <span class="paper"></span>
      <v-layout row fill-height align-center justify-center>
        <v-flex xl5 lg6 md8 sm8>
          <v-stepper v-model="st" class="ra-2">
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card text>
                  <v-card-title primary-title>
                    <span class="display-1 font-weight-light d-block">Reset Password</span>
                  </v-card-title>
                  <v-card-text>
                    <v-form data-vv-scope="form" lazy-validation>
                      <v-layout column wrap>
                        <v-flex>
                          <v-text-field
                            ref="password"
                            type="password"
                            label="Password"
                            v-model="password"
                            hint="Password"
                            data-vv-name="password"
                            data-vv-as="Password"
                            v-validate="'required|min:6'"
                            :error-messages="errors.collect('form.password')"
                          ></v-text-field>
                          <v-text-field
                            type="password"
                            label="Konfirmasi password"
                            v-model="password_confirmation"
                            hint="Konfirmasi password"
                            data-vv-name="password_confirmation"
                            data-vv-as="Konfirmasi password"
                            v-validate="'required|min:6|confirmed:password'"
                            :error-messages="errors.collect('form.password_confirmation')"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :loading="loading" color="success" @click="resetPassword">Reset Password</v-btn>
                  </v-card-actions>
                </v-card>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card>
                  <v-card-text>
                    <span class="display-1 font-weight-light d-block">Reset Password berhasil</span>
                    <p class="mt-3 mb-0">
                      <br />Selanjutnya, silahkan login ke dalam aplikasi dengan cara menekan tombol Login di bawah ini
                    </p>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-layout class="mt-2" justify-end>
                      <v-btn @click="$router.push({name:'login'})" text color="success">Login</v-btn>
                      <v-spacer></v-spacer>
                    </v-layout>
                  </v-card-actions>
                </v-card>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
  <!-- <v-layout class="primary" row fill-height align-center justify-center>
    <v-stepper v-model="st" class="ra-2">
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card text>
            <v-card-title primary-title>
              <span class="display-1 font-weight-light d-block">Reset Password</span>
            </v-card-title>
            <v-card-text>
              <v-form data-vv-scope="form" lazy-validation>
                <v-layout column wrap>
                  <v-flex>
                    <v-text-field
                      ref="password"
                      type="password"
                      label="Password"
                      v-model="password"
                      hint="Password"
                      data-vv-name="password"
                      data-vv-as="Password"
                      v-validate="'required|min:6'"
                      :error-messages="errors.collect('form.password')"
                    ></v-text-field>
                    <v-text-field
                      type="password"
                      label="Konfirmasi password"
                      v-model="password_confirmation"
                      hint="Konfirmasi password"
                      data-vv-name="password_confirmation"
                      data-vv-as="Konfirmasi password"
                      v-validate="'required|min:6|confirmed:password'"
                      :error-messages="errors.collect('form.password_confirmation')"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :loading="loading" text color="success" @click="resetPassword">Reset Password</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card>
            <v-card-text>
              <span class="display-1 font-weight-light d-block">Reset Password berhasil</span>
              <p class="mt-3 mb-0">
                <br />Selanjutnya, silahkan login ke dalam aplikasi dengan cara menekan tombol Login di bawah ini
              </p>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-layout class="mt-2" justify-end>
                <v-btn @click="$router.push({name:'login'})" text color="success">Login</v-btn>
                <v-spacer></v-spacer>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-layout>-->
</template>


<script>
import MLoginBtn from "@/components/MLoginBtn";

export default {
  $_veeValidate: {
    validator: "new"
  },
  components: {
    MLoginBtn
  },
  data() {
    return {
      st: 1,
      token: null,
      password: null,
      password_confirmation: null,
      loading: false
    };
  },
  mounted() {},
  methods: {
    resetPassword() {
      this.$validator
        .validateAll("form")
        .then(res => {
          if (!res) return Promise.reject();
        })
        .then(() => {
          this.loading = true;
          this.token = this.$route.query.token;
          this.$store
            .dispatch("user/resetPassword", {
              token: this.token,
              password: this.password,
              password_confirmation: this.password_confirmation
            })
            .then(() => {
              this.loading = false;
              this.st++;
            })
            .catch(() => {
              this.loading = false;
            });
        })
        .catch(e => e);
    }
  }
};
</script>

<style scoped lang="css">
#login {
  font-family: "Roboto Condensed", sans-serif;
  position: relative;
  font-weight: 400;
}
.logo {
  height: 60px;
  margin-bottom: 2rem !important;
}
.divanim {
  position: relative;
  -webkit-animation-name: example; /* Safari 4.0 - 8.0 */
  -webkit-animation-duration: 3s; /* Safari 4.0 - 8.0 */
  -webkit-animation-fill-mode: forwards; /* Safari 4.0 - 8.0 */
  animation-name: example;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}
/* Safari 4.0 - 8.0 */
@-webkit-keyframes example {
  from {
    top: -200px;
  }
  to {
    top: 0px;
  }
}

@keyframes example {
  from {
    top: -200px;
  }
  to {
    top: 0px;
  }
}

body {
  padding: 0 !important;
  margin: 0 !important;
  background: #90cbe6;
  position: relative;
}

.laptop {
  position: fixed;
  width: 606px;
  height: 447px;
  background: url(/img/laptop.png) repeat scroll 0 0;
  bottom: 0;
  left: 0;
}

.write {
  position: fixed;
  width: 441px;
  height: 340px;
  background: url(/img/write.png) repeat scroll 0 0;
  bottom: 0;
  right: 0;
}

.paper {
  background: url(/img/paper.png) repeat scroll 0 0;
  bottom: -130px;
  height: 318px;
  right: 480px;
  position: fixed;
  width: 289px;
}

.panel {
  border: none;
  box-shadow: none;
  padding: 20px;
  box-shadow: 2px 2px 5px #649ddd;
}

.rounded-card {
  border-radius: 15px;
}
</style>

