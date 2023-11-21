<template>
  <m-dialog
    ref="dlg"
    :btnsave="false"
    :title="kelas && kelas.id ? 'Ubah Kelas Mata Pelajaran Baru' : 'Tambah Kelas Mata Pelajaran Baru'"
  >
    <v-row row wrap justify="center" align="center">
      <v-col cols="12" sm="12" md="10" lg="8" xl="8">
        <v-card flat color="white" class="mt-4  mb-5 pb-5">
          <v-row class="mx-2 pt-3">
            <v-col cols="12" class="px-5">
              <m-alert show :title="alert.kelas.form.judul" :info="alert.kelas.form.deskripsi" closable></m-alert>
            </v-col>
          </v-row>
          <v-card-text class="pa-5 pt-0">
            <v-form autocomplete="false" @submit.prevent data-vv-scope="form" lazy-validation>
              <v-row wrap>
                <v-col cols="12">
                  <v-text-field
                    outlined
                    dense
                    autocomplete="false"
                    name="Nama"
                    placeholder="Isikan Nama"
                    label="Nama Kelas Mata Pelajaran"
                    v-model="kelas.nama"
                    persistent-hint
                    data-vv-name="nama"
                    data-vv-as="Nama"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.nama')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    outlined
                    autocomplete="false"
                    name="Deskripsi"
                    placeholder="Isikan Deskripsi"
                    label="Deskripsi Kelas"
                    v-model="kelas.keterangan"
                    persistent-hint
                    data-vv-name="keterangan"
                    data-vv-as="Deskripsi"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.keterangan')"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" md="6" sm="12" lg="6">
                  <v-autocomplete
                    outlined
                    dense
                    autocomplete="false"
                    v-model="kelas.tingkat"
                    :items="itemTingkats"
                    no-data-text="Data Tidak Tersedia"
                    placeholder="Pilih Tingkat"
                    label="Untuk Tingkat"
                    name="Tingkat"
                    item-value="id"
                    item-text="keterangan2"
                    @change="changeTingkat(kelas.tingkat.id)"
                    return-object
                    data-vv-name="tingkat"
                    data-vv-as="Tingkat"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.tingkat')"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="6" sm="12" lg="6">
                  <v-autocomplete
                    outlined
                    dense
                    autocomplete="false"
                    v-model="kelas.mapel"
                    :items="itemMapels"
                    no-data-text="Data Tidak Tersedia"
                    placeholder="Pilih Mata Pelajaran"
                    label="Untuk Mata Pelajaran"
                    name="Mata Pelajaran"
                    item-value="id"
                    item-text="keterangan"
                    return-object
                    data-vv-name="mapel"
                    data-vv-as="Mata Pelajaran"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.mapel')"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="6" sm="12" lg="6">
                  <span>Tanggal Mulai</span>
                  <datetime
                    type="datetime"
                    value-zone="Asia/Jakarta"
                    zone="Asia/Jakarta"
                    :format="{
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    }"
                    :phrases="{ ok: 'Lanjut', cancel: 'Batal' }"
                    v-model="kelas.tanggal_mulai"
                    class="timepicker"
                  ></datetime>
                </v-col>
                <v-col cols="12" md="6" sm="12" lg="6">
                  <span>Tanggal Selesai</span>
                  <datetime
                    type="datetime"
                    :min-datetime="
                      kelas.tanggal_mulai ? new Date(kelas.tanggal_mulai).toISOString() : new Date().toISOString()
                    "
                    value-zone="Asia/Jakarta"
                    zone="Asia/Jakarta"
                    :format="{
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    }"
                    :phrases="{ ok: 'Lanjut', cancel: 'Batal' }"
                    v-model="kelas.tanggal_selesai"
                    class="timepicker"
                  ></datetime>
                </v-col>
                <!-- <v-col cols="12" md="6" sm="12" lg="6" v-if="kelas.id">
                  <v-autocomplete
                    outlined
                    dense
                    multiple
                    autocomplete="false"
                    v-model="kelas.guru"
                    :items="itemPengampus"
                    no-data-text="Data Tidak Tersedia"
                    placeholder="Pilih Guru"
                    label="Untuk Guru"
                    name="Guru"
                    item-value="id"
                    item-text="name"
                    return-object
                    data-vv-name="guru"
                    data-vv-as="Guru"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.guru')"
                  ></v-autocomplete>
                </v-col> -->
              </v-row>
            </v-form>
          </v-card-text>

          <v-divider class="mx-5 mb-5"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <m-button right text="Simpan" icon="mdi-content-save" action="save" @save="save"></m-button>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </m-dialog>
</template>

<script>
import moment from 'moment'
import { ALERT_INFO } from '@/const'
export default {
  $_veeValidate: {
    validator: 'new',
  },
  components: {},

  data() {
    return {
      step: 1,
      editable: false,
      searchInput: '',
      duplicate: false,
      kelas: {},
      defMapel: {
        nama: '',
        tanggal_mulai: new Date().toISOString(),
        tanggal_selesai: new Date().toISOString(),
      },
      itemPengampus: [],
      itemTingkats: [],
      itemMapels: [],
      itemModuls: [],
      itemRombels: [],
      countMapelPilihan: 0,
      itemModulPilihan: [],
      pilihanId: [],
      alert: ALERT_INFO,
    }
  },
  methods: {
    // eslint-disable-next-line
    open(obj) {
      // this.step = 1;
      this.itemModulPilihan = []
      this.loadTingkat()
      this.loadPengampu()
      // this.loadModul()
      this.loadRombel()
      this.kelas = obj
        ? {
            ...obj,
            ...(this.editable = true),
          }
        : {
            ...this.defMapel,
            ...(this.editable = false),
          }

      if (obj) {
        this.kelas.tanggal_mulai = moment(obj.tanggal_mulai).toISOString()
        this.kelas.tanggal_selesai = moment(obj.tanggal_selesai).toISOString()
        this.changeTingkat(obj.tingkat ? obj.tingkat.id : null)
      } else {
        this.countMapelPilihan = 0
      }
      let x = this.$refs.dlg.open()
      this.$validator.reset()
      return x
    },

    // eslint-disable-next-line
    loadRombel() {
      return this.$store
        .dispatch('rombel/getAll', {
          sekolah_id: this.instansi_id,
          params: {},
        })
        .then((res) => {
          return (this.itemRombels = res)
        })
        .catch((e) => e)
    },

    // eslint-disable-next-line
    loadPengampu() {
      // clearTimeout(this._timerId)

      // // delay new call 500ms
      // this._timerId = setTimeout(() => {
      return this.$store
        .dispatch('user/getGuru', {
          sekolah_id: this.instansi_id,
          kelas_id: this.kelas_id,
          params: {
            s: this.searchInput,
          },
        })
        .then((res) => {
          return (this.itemPengampus = res.data)
        })
        .catch((e) => e)
      // }, 1500)
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

    validasiStep(e) {
      this.$validator.validateAll('form').then((res) => {
        if (!res) return
        this.step = e
        return this.e
      })
    },

    changeTingkat(val) {
      return this.$store
        .dispatch('mapel/getAll', {
          sekolah_id: this.instansi_id,
          params: {
            tingkat_id: val,
          },
        })
        .then((res) => {
          return (this.itemMapels = res)
        })
        .catch((e) => e)
    },
    // eslint-disable-next-line
    loadModul() {
      return this.$store
        .dispatch('modul/getAll', {
          sekolah_id: this.instansi_id,
          params: {},
        })
        .then((res) => {
          return (this.itemModuls = res)
        })
        .catch((e) => e)
    },
    // eslint-disable-next-line
    addMapel() {
      this.countMapelPilihan += 1
      this.itemModulPilihan.push({
        modul: null,
        tanggal_mulai: null,
        tanggal_selesai: null,
      })
    },
    // eslint-disable-next-line
    remove(index) {
      this.countMapelPilihan -= 1
      this.itemModulPilihan.splice(index, 1)
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
          this.kelas.tanggal_mulai = moment(this.kelas.tanggal_mulai).format('YYYY-MM-DD HH:mm:ss')
          this.kelas.tanggal_selesai = moment(this.kelas.tanggal_selesai).format('YYYY-MM-DD HH:mm:ss')
          return this.$store
            .dispatch('kelas/form', {
              sekolah_id: this.instansi_id,
              obj: this.kelas,
            })
            .then(res => {
              this.$refs.dlg.resolve(res)
            })
            .catch((e) => e)
        })
        .catch((e) => e)
    },
    checkDuplicate() {
      this.duplicate = false
      for (var i = 0; i < this.itemModulPilihan.length; i++) {
        for (var j = i + 1; j < this.itemModulPilihan.length; j++) {
          if (this.itemModulPilihan[i].kelas == this.itemModulPilihan[j].kelas) {
            this.duplicate = true
          }
        }
      }
      if (this.duplicate) {
        this.$error('Anda memasukkan data Mata pelajaran yang sama')
      }
    },
  },
  watch: {
    searchInput(val) {
      if (!val) {
        return
      }
      this.loadPengampu()
    },
    kelas: {
      handler(n) {
        if (this.kelas.tanggal_selesai < n.tanggal_mulai) this.kelas.tanggal_selesai = n.tanggal_mulai
      },
      deep: true,
    },
  },
}
</script>
<style>
.timepicker {
  color: rgba(0, 0, 0, 0.87);
  padding: 9px 8px 9px;
  max-width: 100%;
  width: 100%;
  border: 1px solid grey;
  outline: 1px;
  background: transparent;
  border-radius: 4px;
}
.vdatetime-input {
  width: 500px;
}
</style>
