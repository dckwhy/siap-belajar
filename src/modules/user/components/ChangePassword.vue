<template>
  <m-dialog ref="dlg" @save="save" title="Ubah password">
    <v-form lazy-validation>
      <v-text-field
        autofocus
        outlined
        dense
        label="Password Lama"
        v-model="pass.current_password"
        hint="Password Anda yang lama"
        data-vv-name="current_password"
        data-vv-as="Password lama"
        v-validate="'required'"
        type="password"
        :error-messages="errors.collect('current_password')"
      ></v-text-field>
      <v-text-field
        outlined
        dense
        class="mt-3"
        ref="password"
        type="password"
        label="Password baru"
        v-model="pass.password"
        hint="Isi ulang password baru"
        data-vv-name="password"
        data-vv-as="Password baru"
        v-validate="'required|min:6'"
        :error-messages="errors.collect('password')"
      ></v-text-field>
      <v-text-field
        outlined
        dense
        type="password"
        label="Konfirmasi password baru"
        v-model="pass.password_confirmation"
        hint="Konfirmasi password baru"
        data-vv-name="password_confirmation"
        data-vv-as="Konfirmasi password baru"
        v-validate="'required|min:6|confirmed:password'"
        :error-messages="errors.collect('password_confirmation')"
      ></v-text-field>
    </v-form>
  </m-dialog>
</template>

<script>
export default {
  $_veeValidate: {
    validator: 'new',
  },

  data() {
    return {
      pass: {},
      passDef: {
        password: null,
        password_confirmation: null,
      },
    }
  },
  mounted() {},
  computed: {},
  methods: {
    // eslint-disable-next-line
    open() {
      this.pass = { ...this.passDef }
      this.$validator.reset()
      return this.$refs.dlg.open()
    },
    save() {
      this.$validator
        .validateAll()
        .then((res) => {
          if (!res) return Promise.reject()
          return res
        })
        .then(() => {
          return this.$store.dispatch('user/changePassword', this.pass)
        })
        .then((res) => {
          this.$refs.dlg.resolve(res)
          this.$info('Password berhasil diperbarui')
          return res
        })
        .catch((e) => e)
    },
  },
}
</script>
