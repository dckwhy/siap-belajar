<template>
  <m-dialog
    ref="dlg"
    @save="save"
    :title="tingkat && tingkat.user_id ? 'Ubah Modul':'Tambah Modul'"
  >
    <v-row row wrap justify="center" align="center">
      <v-col cols="8" sm="8" md="8" lg="8" xl="8">
        <v-form @submit.prevent data-vv-scope="form" lazy-validation>
          <v-row wrap>
            <v-col cols="12">
              <m-alert show :title="alert.tingkat.judul" :info="alert.tingkat.deskripsi" closable></m-alert>
            </v-col>
            <v-col cols="12">
              <span class="font-weight-bold primary--text">Nama</span>
              <span class="error--text">&nbsp;*</span>
              <v-text-field
                outlined
                dense
                v-model="tingkat.nama"
                placeholder="Nama"
                hint="Isikan Nama"
                persistent-hint
                data-vv-name="nama"
                data-vv-as="Nama"
                v-validate="'required'"
                :error-messages="errors.collect('form.nama')"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <span class="font-weight-bold primary--text">Deskripsi</span>
              <span class="error--text">&nbsp;*</span>
              <vue-editor v-model="tingkat.deskripsi"></vue-editor>
            </v-col>
            <v-col cols="6">
              <span class="font-weight-bold primary--text">Untuk Tingkat</span>
              <span class="error--text">&nbsp;*</span>
              <v-select
                outlined
                dense
                v-model="tingkat.tingkat"
                :items="itemTingkat"
                no-data-text="Data Tidak Tersedia"
                placeholder="Pilih Tingkat"
                name="Tingkat"
                data-vv-name="tingkat"
                data-vv-as="Tingkat"
                v-validate="'required'"
                :error-messages="errors.collect('form.tingkat')"
              ></v-select>
            </v-col>
            <v-col cols="6">
              <span class="font-weight-bold primary--text">Rekomendasi mata pelajaran</span>
              <span class="error--text">&nbsp;*</span>
              <v-select
                outlined
                dense
                v-model="tingkat.tingkat"
                :items="itemMapel"
                no-data-text="Data Tidak Tersedia"
                placeholder="Pilih Mata Pelajaran"
                name="Mata Pelajaran"
                data-vv-name="tingkat"
                data-vv-as="Mata Pelajaran"
                v-validate="'required'"
                :error-messages="errors.collect('form.tingkat')"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <span class="font-weight-bold primary--text">Topik Bahasan</span>
              <span class="error--text">&nbsp;*</span>
              <v-select
                outlined
                dense
                v-model="tingkat.topik"
                :items="itemTopik"
                no-data-text="Data Tidak Tersedia"
                placeholder="Pilih Topik"
                name="Topik"
                data-vv-name="topik"
                data-vv-as="Topik"
                v-validate="'required'"
                :error-messages="errors.collect('form.topik')"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <m-button isBlock text="Simpan Data Modul" action="save" @save="save"></m-button>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </m-dialog>
</template>

<script>
import { ALERT_INFO } from "@/const";
export default {
  $_veeValidate: {
    validator: "new"
  },
  components: {},

  data() {
    return {
      tingkat: {},
      defModul: {
        nama: ""
      },
      itemTingkat: ["I", "II", "III", "IV"],
      itemMapel: ["IPA", "IPS", "BAHASA"],
      itemTopik: ["TOPIK 1", "TOPIK 2", "TOPIK 3"],
      alert: ALERT_INFO
    };
  },
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.tingkat = obj ? { ...obj } : { ...this.defModul };
      let x = this.$refs.dlg.open();
      this.$validator.reset();
      // this.isReset = true;
      // this.$nextTick(() => {
      //   this.isReset = false;
      // });
      return x;
    },

    // eslint-disable-next-line
    save() {
      this.$validator
        .validateAll("form")
        .then(res => {
          if (!res) return Promise.reject();
          return res;
        })
        .then(() => {
          return this.$store.dispatch("tingkat/create", this.tingkat);
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$info("Simpan Data Berhasil");
            this.$refs.dlg.resolve();
            this.$router.push({ name: "tingkat" });
            return res;
          } else {
            // this.$error("Simpan Data Gagal");
            // this.$refs.dlg.resolve();
            // this.$router.push({ name: "tingkat" });
          }
        })
        .catch(e => e);
    }
  }
};
</script>


