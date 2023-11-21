<template>
  <m-dialog ref="dlg" :btnsave="false" :title="mapel && mapel.user_id ? 'Ubah Mapel' : 'Tambah Mapel'">
    <v-row row wrap justify="center" align="center">
      <v-col cols="12" sm="12" md="10" lg="8" xl="8">
        <v-form autocomplete="false" @submit.prevent data-vv-scope="form" lazy-validation>
          <v-card flat color="white" class="mt-4 pb-5">
            <v-row class="mx-3 pt-5">
              <v-col cols="12">
                <m-alert show :title="alert.mapel.form.judul" :info="alert.mapel.form.deskripsi" closable></m-alert>
              </v-col>
            </v-row>
            <v-card-text class="pa-5 pb-0">
              <v-row wrap>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <v-text-field
                    outlined
                    dense
                    autocomplete="false"
                    name="Nama"
                    placeholder="Nama Mata Pelajaran"
                    label="Nama Mata Pelajaran"
                    v-model="mapel.keterangan"
                    persistent-hint
                    data-vv-name="nama"
                    data-vv-as="Nama Mapel"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.nama')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <v-select
                    outlined
                    dense
                    autocomplete="false"
                    v-model="mapel.tingkat"
                    :items="itemTingkats"
                    no-data-text="Data Tidak Tersedia"
                    placeholder="Pilih Tingkat"
                    label="Tingkat"
                    name="Tingkat"
                    item-value="id"
                    item-text="keterangan2"
                    return-object
                    data-vv-name="tingkat"
                    data-vv-as="Tingkat"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.tingkat')"
                  ></v-select>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider class="mx-5"></v-divider>

            <v-col cols="12" class="mb-5 pa-5">
              <m-button right absolute text="Simpan" icon="mdi-content-save" action="save" @save="save"></m-button>
            </v-col>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </m-dialog>
</template>

<script>
import { ALERT_INFO } from '@/const'
export default {
  $_veeValidate: {
    validator: 'new',
  },
  components: {},

  data() {
    return {
      mapel: {},
      defMapel: {
        nama: '',
      },
      itemTingkats: [],
      alert: ALERT_INFO,
    }
  },
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.loadTingkat()
      this.mapel = obj ? { ...obj } : { ...this.defMapel }
      let x = this.$refs.dlg.open()
      this.$validator.reset()
      return x
    },

    // eslint-disable-next-line
    loadTingkat() {
      return this.$store
        .dispatch('tingkat/get', {
          sekolah_id: this.instansi_id,
          params: {},
        })
        .then((res) => {
          return (this.itemTingkats = res)
        })
        .catch((e) => e)
    },
    // eslint-disable-next-line
    save() {
      this.$validator
        .validateAll('form')
        .then((res) => {
          if (!res) return Promise.reject()
          return res
        })
        .then(() => {
          return this.$store.dispatch('mapel/form', {
            sekolah_id: this.instansi_id,
            obj: this.mapel,
          })
        })
        .then((res) => {
          this.$info('Simpan Data Berhasil')
          this.$refs.dlg.resolve()
          return res
        })
        .catch((e) => e)
    },
  },
}
</script>
