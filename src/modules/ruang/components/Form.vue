<template>
  <m-dialog
    ref="dlg"
    :btnsave="false"
    :title="ruang && ruang.user_id ? 'Ubah Ruang':'Tambah Ruang'"
  >
    <v-row row wrap justify="center" align="center">
      <v-col cols="12" sm="12" md="10" lg="8" xl="8">
        <v-form @submit.prevent data-vv-scope="form" lazy-validation>
          <v-row>
            <v-col cols="12">
              <m-alert
                show
                :title="alert.ruang.form.judul"
                :info="alert.ruang.form.deskripsi"
                closable
              ></m-alert>
            </v-col>
          </v-row>
          <v-card flat class="mt-4">
            <v-card-text>
              <v-row wrap>
                <v-col cols="12">
                  <v-text-field
                    outlined
                    dense
                    name="Nama"
                    placeholder="Isikan Nama"
                    label="Nama"
                    v-model="ruang.keterangan"
                    persistent-hint
                    data-vv-name="nama"
                    data-vv-as="Nama"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.nama')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <m-button
                    isBlock
                    text="Simpan Ruang Saya"
                    icon="mdi-content-save"
                    action="save"
                    @save="save"
                  ></m-button>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
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
      ruang: {},
      defRuang: {
        nama: ""
      },
      alert: ALERT_INFO
    };
  },
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.ruang = obj ? { ...obj } : { ...this.defRuang };
      let x = this.$refs.dlg.open();
      this.$validator.reset();
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
          return this.$store.dispatch("ruang/form", {
            sekolah_id: this.instansi_id,
            obj: this.ruang
          });
        })
        .then(res => {
          this.$info("Simpan Data Berhasil");
          this.$refs.dlg.resolve();
          this.$router.push({ name: "ruang" });
          return res;
        })
        .catch(e => e);
    }
  }
};
</script>


