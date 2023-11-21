<template>
  <m-dialog ref="dlg" @save="save" :title="user && user.user_id ? 'Ubah Akun':'Daftar Akun'">
    <v-form v-on:submit.prevent data-vv-scope="form" lazy-validation>
      <v-text-field
        autofocus
        label="Nama*"
        v-model="user.name"
        hint="Nama"
        data-vv-name="name"
        data-vv-as="Nama"
        v-validate="'required'"
        :error-messages="errors.collect('form.name')"
      ></v-text-field>
      <v-text-field
        label="Email*"
        v-model="user.email"
        hint="Email"
        data-vv-name="email"
        data-vv-as="Email"
        v-validate="'required|email'"
        :error-messages="errors.collect('form.email')"
      ></v-text-field>
      <v-text-field
        v-if="!user.user_id"
        ref="password"
        type="password"
        label="Password"
        v-model="user.password"
        hint="Password"
        data-vv-name="password"
        data-vv-as="Password"
        v-validate="'required|min:6'"
        :error-messages="errors.collect('form.password')"
      ></v-text-field>
      <v-text-field
        v-if="!user.user_id"
        type="password"
        label="Konfirmasi password"
        v-model="user.password_confirmation"
        hint="Konfirmasi password"
        data-vv-name="password_confirmation"
        data-vv-as="Konfirmasi password"
        v-validate="'required|min:6|confirmed:password'"
        :error-messages="errors.collect('form.password_confirmation')"
      ></v-text-field>
      <div>
        <vue-recaptcha @verify="markRecaptchaAsVerified" :sitekey="sitekey"></vue-recaptcha>
      </div>
      <div>
        <strong>{{ registerForm.pleaseTickRecaptchaMessage }}</strong>
      </div>
    </v-form>
  </m-dialog>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
import { SITE_KEY } from "@/const";
export default {
  components: { VueRecaptcha },
  $_veeValidate: {
    validator: "new"
  },

  data() {
    return {
      registerForm: {
        recaptchaVerified: false,
        pleaseTickRecaptchaMessage: ""
      },
      user: {},
      defUser: {
        name: null,
        email: ""
      }
    };
  },
  computed: {
    sitekey() {
      return SITE_KEY;
    }
  },
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.$validator.reset();
      this.user = obj ? { ...obj } : { ...this.defUser };
      // return this.loadRole().then(() => {
      return this.$refs.dlg.open();
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
      this.checkIfRecaptchaVerified();
      this.$validator
        .validateAll("form")
        .then(res => {
          if (!res) return Promise.reject();
          return res;
        })
        .then(() => {
          if (this.registerForm.recaptchaVerified) {
            return this.$store.dispatch("user/register", this.user);
          }
        })
        .then(res => {
          if (this.registerForm.recaptchaVerified) {
            this.$info("Registrasi Berhasil");
            this.$refs.dlg.resolve();
          }
          return res;
        })
        .catch(e => e);
    }
  }
};
</script>
