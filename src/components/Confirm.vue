<template>
  <v-dialog v-model="dialog" :max-width="options.width" @keydown.esc="cancel()">
    <v-toolbar dark :color="options.color" dense>
      <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
    </v-toolbar>
    <v-card tile>
      <v-card-text>
        <span v-if="message" v-html="message"></span>
        <v-form @submit.prevent data-vv-scope="form" lazy-validation>
          <v-select
            v-if="options.organisasi"
            v-model="organisasi"
            :items="options.organisasi"
            label="Organisasi"
            item-text="nama"
            item-value="no_reg"
            v-validate="'required'"
            data-vv-name="organisasi"
            data-vv-as="organisasi"
            :error-messages="errors.collect('form.organisasi')"
          ></v-select>
          <v-select
            v-if="options.role"
            v-model="role"
            :items="options.role"
            label="Peran"
            item-text="nama"
            item-value="no_reg"
            v-validate="'required'"
            data-vv-name="role"
            data-vv-as="role"
            :error-messages="errors.collect('form.role')"
          ></v-select>
          <v-textarea
            v-if="options.keterangan"
            class="mt-2"
            :label="options.keterangan.label || 'Keterangan'"
            :rows="4"
            filled
            v-model="keterangan"
            :hint="options.keterangan.hint"
            persistent-hint
          ></v-textarea>
          <v-img
            v-if="options.image"
            class="mt-2"
            :src="options.src"/>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <template v-if="options.okOnly">
          <v-btn text :color="options.color+' darken-1'" @click.native="agree">OK</v-btn>
        </template>
        <template v-else-if="options.cancelOnly">
          <v-btn text :color="options.color+' darken-1'" @click.native="cancel">Keluar</v-btn>
        </template>
        <template v-else>
          <v-btn text @click.native="cancel">Tidak</v-btn>
          <v-btn text :color="options.color+' darken-1'" @click.native="agree">Ya</v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      resolve: null,
      reject: null,
      message: null,
      title: null,
      keterangan: null,
      organisasi: null,
      role: null,
      options: {}
    };
  },
  methods: {
    open(message, options = {}, title) {
      this.$validator.reset();
      this.organisasi = [];
      this.role = [];
      this.keterangan = null;
      this.title = title || "Perhatian!";
      this.message = message;
      let def = {
        color: "primary",
        width: 600,
        okOnly: false
      };
      this.options = { ...def, ...options };
      // apply keterangan jika ada
      if (this.options.keterangan)
        this.keterangan = this.options.keterangan.data || "";

      this.dialog = true;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    agree() {
      this.$validator
        .validateAll("form")
        .then(res => {
          if (!res) return Promise.reject();
          return res;
        })
        .then(() => {
          this.dialog = false;
          let resObj = {
            organisasi: this.organisasi,
            role: this.role,
            keterangan: this.keterangan
          };
          return this.resolve(resObj);
        })
        .catch(e => e);
    },
    cancel() {
      if (!this.dialog) return;
      this.reject(false);
      this.dialog = false;
    }
  }
};
</script>
