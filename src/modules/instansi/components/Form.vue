<template>
  <m-dialog ref="dlg" :btnsave="false" :title="instansi && instansi.id ? 'Ubah Instansi' : 'Tambah Instansi'">
    <v-row row wrap justify="center" align="center" class="pt-5">
      <v-col cols="12" sm="12" md="10" lg="8" xl="8">
        <v-form @submit.prevent data-vv-scope="form" lazy-validation>
          <v-card flat class="pb-5 mb-5">
            <v-row class="px-5 pt-5">
              <v-col cols="12">
                <m-alert
                  show
                  :title="alert.instansi.form.judul"
                  :info="alert.instansi.form.deskripsi"
                  closable
                ></m-alert>
              </v-col>
            </v-row>
            <v-card-text class="pa-5">
              <v-stepper v-model="step" vertical class="elevation-0">
                <template v-for="(item, key) in formStepper">
                  <div :key="key">
                    <v-stepper-step :step="item.step">
                      <span>{{ item.label }}</span>
                    </v-stepper-step>
                    <v-stepper-content :step="item.step" style="border-left: 1px solid rgba(0, 0, 0, 0.12)">
                      <v-row class="pt-2">
                        <v-col v-for="(form, i) in item.forms" :key="i" v-bind="form.grid">
                          <component
                            v-if="step === item.step"
                            :is="form.type"
                            v-model="instansi[form.name]"
                            v-bind="form.options"
                            outlined
                            dense
                            :data-vv-name="form.validate && form.validate.dataVvName ? form.validation : ''"
                            :data-vv-as="form.validate && form.validate.dataVvAs ? form.validate.dataVvAs : ''"
                            v-validate="form.validate && form.validate.vValidate ? form.validate.vValidate : ''"
                            :error-messages="errors.collect(`form.${form.validation}`)"
                          >
                            <template v-slot:append-outer>
                              <v-btn
                                v-if="form.name === 'file' && (instansi && instansi.logo)"
                                color="purple"
                                small
                                depressed
                                dark
                                @click="onViewImg"
                              >
                                Lihat
                              </v-btn>
                            </template>
                          </component>
                          <template
                            v-if="['kecamatan_id', 'kelurahan_id'].indexOf(form.name) > -1 && instansi[form.name] === 0"
                          >
                            <v-text-field
                              v-model="instansi[formOther[form.name]['name']]"
                              v-bind="formOther[form.name]['options']"
                              outlined
                              dense
                              :data-vv-name="formOther[form.name]['validation']"
                              :data-vv-as="formOther[form.name]['as']"
                              v-validate="'required'"
                              :error-messages="errors.collect(`form.${formOther[form.name]['validation']}`)"
                            />
                          </template>
                        </v-col>
                        <v-col v-if="key === 'alamat'" cols="12" md="12" sm="12">
                          <ChangeCoordinate ref="map" v-model="instansi" use-search searchKey="alamat" @mark="onMark" />
                        </v-col>
                        <v-col cols="12" md="12" sm="12">
                          <span class="black--text">{{ item.desc }}</span>
                          <template v-if="step === 4">
                            <v-checkbox v-model="konfirmasi" label="Informasi yang di inputkan sudah sesuai" />
                          </template>
                        </v-col>
                        <v-col cols="12" md="12" sm="12">
                          <v-btn v-if="step !== 4" small dark @click="onNextStep">Selanjutnya</v-btn>
                          <v-btn v-if="step !== 1" small text @click="step--">kembali</v-btn>
                        </v-col>
                      </v-row>
                    </v-stepper-content>
                  </div>
                </template>
              </v-stepper>
            </v-card-text>
            <v-divider></v-divider>
            <v-row class="mb-5">
              <v-col cols="12" class="ma-3">
                <m-button absolute right text="Simpan" icon="mdi-content-save" action="save" @save="save"></m-button>
              </v-col>
            </v-row>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </m-dialog>
</template>

<script>
import { ALERT_INFO } from '@/const'
import ChangeCoordinate from '../components/PilihMarker'
export default {
  $_veeValidate: {
    validator: 'new',
  },
  components: { ChangeCoordinate },

  mounted() {
    // this.load();
    this.fetchMasters('propinsi', 'master=propinsi')
  },

  data() {
    return {
      instansi: {},
      defModul: {
        nama: '',
        mAlamat: {
          id: 0,
          keterangan: 'Lain-Lain',
        },
      },
      itemJenjangs: [
        {
          id: 1,
          keterangan: 'TK',
        },
        {
          id: 2,
          keterangan: 'SD',
        },
        {
          id: 3,
          keterangan: 'SMP',
        },
        {
          id: 4,
          keterangan: 'SMA',
        },
        {
          id: 5,
          keterangan: 'SMK',
        },
      ],
      itemStatus: [
        {
          id: 1,
          keterangan: 'Negeri',
        },
        {
          id: 2,
          keterangan: 'Swasta',
        },
      ],
      itemStatusInklusi: [
        {
          id: 1,
          keterangan: 'Menerima',
        },
        {
          id: 2,
          keterangan: 'Tidak Menerima',
        },
      ],
      itemStatusAkreditasi: [
        {
          id: 1,
          nama: 'A',
        },
        {
          id: 2,
          nama: 'B',
        },
        {
          id: 3,
          nama: 'C',
        },
        {
          id: 4,
          nama: 'Belum Terakreditasi',
        },
      ],
      itemWP: [1, 2, 3, 4, 5],
      alert: ALERT_INFO,
      step: 1,
      masters: {
        propinsi: [],
        kota: [],
        kecamatan: [],
        kelurahan: [],
      },
      konfirmasi: null,
      isOther: {
        kecamatan: false,
        kelurahan: false,
      },
    }
  },

  computed: {
    formStepper() {
      return {
        informasi: {
          label: 'Informasi Sekolah',
          step: 1,
          forms: [
            {
              type: 'VTextField',
              name: 'nama',
              validation: 'nama',
              grid: { cols: 12, md: 12, sm: 12 },
              options: {
                autocomplete: false,
                name: 'Nama',
                placeholder: 'Isikan Nama',
                label: 'Nama',
                persistentHint: true,
              },
              validate: {
                name: 'nama',
                dataVvName: 'nama',
                dataVvAs: 'Nama',
                vValidate: 'required',
              },
            },
            {
              type: 'VFileInput',
              name: 'file',
              validation: 'file',
              grid: { cols: 12, md: 12, sm: 12 },
              options: {
                label: 'Logo Sekolah',
                chips: true,
                smallChips: true,
                singleLine: true,
                solo: true,
                prependIcon: '',
                accept: '.png,.jpg,.jpeg',
                appendIcon: 'mdi-attachment',
                hint: 'File unggahan harus berupa file (.png .jpeg .jpg)',
                rules: [
                  (value) =>
                    !value ||
                    (value && value.size < this.roundDecimal(1500 * 1000)) ||
                    'File yang Anda pilih melebihi kapasitas maksimum!',
                ],
              },
              validate: {
                name: 'file',
                dataVvName: 'file',
                dataVvAs: 'File',
                vValidate: 'required',
              },
            },
            {
              type: 'VTextField',
              name: 'npsn',
              validation: 'npsn',
              grid: { cols: 12, md: 6, sm: 12 },
              options: {
                autocomplete: false,
                name: 'NPSN',
                placeholder: 'Isikan NPSN',
                label: 'NPSN',
                persistentHint: true,
              },
              validate: {
                name: 'npsn',
                dataVvName: 'npsn',
                dataVvAs: 'NPSN',
                vValidate: 'required|numeric',
              },
            },
            {
              type: 'VTextField',
              name: 'nss',
              validation: 'nss',
              grid: { cols: 12, md: 6, sm: 12 },
              options: {
                autocomplete: false,
                name: 'NSS',
                placeholder: 'Isikan NSS',
                label: 'NSS',
                persistentHint: true,
              },
              validate: {
                name: 'nss',
                dataVvName: 'nss',
                dataVvAs: 'NSS',
                vValidate: 'required|numeric',
              },
            },
            {
              type: 'VSelect',
              name: 'jenjang_id',
              validation: 'tingkat',
              grid: { cols: 12, md: 6, sm: 12 },
              options: {
                autocomplete: false,
                items: this.itemJenjangs,
                noDataText: 'Data Tidak Tersedia',
                placeholder: 'Pilih Jenjang',
                label: 'Untuk Jenjang',
                name: 'Jenjang',
                itemValue: 'id',
                itemText: 'keterangan',
              },
              validate: {
                name: 'tingkat',
                dataVvName: 'tingkat',
                dataVvAs: 'Jenjang',
                vValidate: 'required',
              },
            },
            {
              type: 'VSelect',
              name: 'akreditasi_id',
              grid: { cols: 12, md: 6, sm: 12 },
              options: {
                autocomplete: false,
                items: this.itemStatusAkreditasi,
                noDataText: 'Data Tidak Tersedia',
                placeholder: 'Pilih Akreditasi',
                label: 'Untuk Akreditasi',
                name: 'Akreditasi',
                itemValue: 'id',
                itemText: 'nama',
                disabled: false,
              },
            },
            {
              type: 'VSelect',
              name: 'status_id',
              grid: { cols: 12, md: 6, sm: 12 },
              options: {
                autocomplete: false,
                items: this.itemStatus,
                noDataText: 'Data Tidak Tersedia',
                placeholder: 'Pilih Status',
                label: 'Untuk Status',
                name: 'Jenjang',
                itemValue: 'id',
                itemText: 'keterangan',
              },
            },
            {
              type: 'VSelect',
              name: 'status_inklusi_id',
              grid: { cols: 12, md: 6, sm: 12 },
              options: {
                autocomplete: false,
                items: this.itemStatusInklusi,
                noDataText: 'Data Tidak Tersedia',
                placeholder: 'Pilih Status Inklusi',
                label: 'Untuk Status Inklusi',
                name: 'Jenjang',
                itemValue: 'id',
                itemText: 'keterangan',
              },
            },
          ],
        },
        kontak: {
          label: 'Kontak',
          step: 2,
          forms: [
            {
              type: 'VTextField',
              name: 'email',
              validation: 'email',
              grid: { cols: 12, md: 6, sm: 12 },
              options: {
                placeholder: 'Alamat Surel',
                label: 'Alamat Surel',
                type: 'email',
              },
              validate: {
                name: 'email',
                dataVvName: 'email',
                dataVvAs: 'Alamat Surel',
                vValidate: 'email',
              },
            },
            {
              type: 'VTextField',
              name: 'no_telepon',
              validation: 'no_telepon',
              grid: { cols: 12, md: 6, sm: 12 },
              options: {
                placeholder: 'Nomor Telp',
                label: 'Nomor Telp',
              },
              validate: {
                name: 'no_telp',
                dataVvName: 'no_telp',
                dataVvAs: 'Nomor Telp',
                vValidate: 'numeric',
              },
            },
            {
              type: 'VTextField',
              name: 'website',
              validation: 'website',
              grid: { cols: 12, md: 6, sm: 12 },
              options: {
                placeholder: 'Website',
                label: 'Website',
              },
            },
            {
              type: 'VTextField',
              name: 'facebook',
              validation: 'facebook',
              grid: { cols: 12, md: 6, sm: 12 },
              options: {
                placeholder: 'Facebook',
                label: 'Facebook',
              },
            },
            {
              type: 'VTextField',
              name: 'twitter',
              validation: 'twitter',
              grid: { cols: 12, md: 6, sm: 12 },
              options: {
                placeholder: 'Twitter',
                label: 'Twitter',
              },
            },
            {
              type: 'VTextField',
              name: 'instagram',
              validation: 'instagram',
              grid: { cols: 12, md: 6, sm: 12 },
              options: {
                placeholder: 'Instagram',
                label: 'Instagram',
              },
            },
          ],
        },
        alamat: {
          label: 'Alamat',
          step: 3,
          forms: [
            {
              type: 'VTextField',
              name: 'alamat',
              validation: 'alamat',
              grid: { cols: 12, md: 12, sm: 12 },
              options: {
                placeholder: 'Alamat Lengkap',
                label: 'Alamat',
              },
              validate: {
                name: 'alamat',
                dataVvName: 'alamat',
                dataVvAs: 'Alamat',
                vValidate: 'required',
              },
            },
            {
              type: 'VAutocomplete',
              name: 'propinsi_id',
              validation: 'propinsi',
              grid: { cols: 12, md: 6, sm: 12 },
              options: {
                placeholder: 'Pilih Propinsi',
                items: this.masters.propinsi,
                noDataText: 'Data tidak ditemukan',
                label: 'Propinsi',
                itemValue: 'id',
                itemText: 'keterangan',
              },
              validate: {
                name: 'propinsi_id',
                dataVvName: 'propinsi',
                dataVvAs: 'Provinsi',
                vValidate: 'required',
              },
            },
            {
              type: 'VAutocomplete',
              name: 'kota_id',
              validation: 'kota',
              grid: { cols: 12, md: 6, sm: 12 },
              options: {
                placeholder: 'Pilih Kota',
                items: this.masters.kota,
                noDataText: 'Harap pilih kota terlebih dahulu',
                label: 'Kota',
                itemValue: 'id',
                itemText: 'keterangan',
              },
              validate: {
                name: 'kota_id',
                dataVvName: 'kota',
                dataVvAs: 'Kota',
                vValidate: 'required',
              },
            },
            {
              type: 'VAutocomplete',
              name: 'kecamatan_id',
              validation: 'kecamatan',
              grid: { cols: 12, md: 6, sm: 12 },
              options: {
                placeholder: 'Pilih Kecamatan',
                items: this.masters.kecamatan,
                noDataText: 'Harap pilih kota terlebih dahulu',
                label: 'Kecamatan',
                itemValue: 'id',
                itemText: 'keterangan',
              },
              validate: {
                name: 'kecamatan_id',
                dataVvName: 'kecamatan',
                dataVvAs: 'Kecamatan',
                vValidate: 'required',
              },
            },
            {
              type: 'VAutocomplete',
              name: 'kelurahan_id',
              validation: 'kelurahan',
              grid: { cols: 12, md: 6, sm: 12 },
              options: {
                placeholder: 'Pilih Kelurahan',
                items: this.masters.kelurahan,
                noDataText: 'Pilih kecamatan terlebih dahulu',
                label: 'Kelurahan',
                itemValue: 'id',
                itemText: 'keterangan',
              },
              validate: {
                name: 'kelurahan_id',
                dataVvName: 'kelurahan',
                dataVvAs: 'Kelurahan',
                vValidate: 'required',
              },
            },
            {
              type: 'VTextField',
              name: 'rt',
              validation: 'rt',
              grid: { cols: 12, md: 6, sm: 12 },
              options: {
                placeholder: 'RT',
                label: 'RT',
              },
              validate: {
                name: 'rt',
                dataVvName: 'rt',
                dataVvAs: 'RT',
                vValidate: 'numeric|required',
              },
            },
            {
              type: 'VTextField',
              name: 'rw',
              validation: 'rw',
              grid: { cols: 12, md: 6, sm: 12 },
              options: {
                placeholder: 'RW',
                label: 'RW',
              },
              validate: {
                name: 'rw',
                dataVvName: 'rw',
                dataVvAs: 'RW',
                vValidate: 'numeric|required',
              },
            },
          ],
        },
        konfirmasi: {
          step: 4,
          label: 'Konfirmasi',
          desc: 'Pastikan informasi sekolah diatas telah terisi dengan benar dan dapat dipertanggung jawabkan.',
        },
      }
    },

    formOther() {
      return {
        kecamatan_id: {
          type: 'VTextField',
          name: 'kecamatan',
          validation: 'kecamatan_other',
          as: 'Kecamatan',
          grid: { cols: 12, md: 6, sm: 12 },
          options: {
            placeholder: 'Kecamatan Lainnya',
            label: 'Kecamatan Lainya',
          },
        },
        kelurahan_id: {
          type: 'VTextField',
          name: 'kelurahan_other',
          validation: 'kelurahan_other',
          as: 'Kelurahan',
          grid: { cols: 12, md: 6, sm: 12 },
          options: {
            placeholder: 'Kelurahan Lainnya',
            label: 'Kelurahan Lainya',
          },
        },
      }
    },
  },

  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.instansi = obj ? { ...obj } : { ...this.defModul }
      this.step = 1
      this.konfirmasi = null
      let x = this.$refs.dlg.open()
      this.$validator.reset()
      return x
    },
    // eslint-disable-next-line
    // load wordpress_id
    load() {
      return this.$store
        .dispatch('instansi/getWP')
        .then((res) => {
          this.itemWP = res.data
        })
        .catch((e) => e)
    },

    // eslint-disable-next-line
    save() {
      const formData = new FormData()
      Object.keys(this.instansi).forEach((key) => {
        if (this.instansi[key]) {
          formData.append(key, this.instansi[key])
        }
      })

      if (!this.konfirmasi) {
        this.$error('Harap melakukan konfirmasi terlebih dahulu')
        return
      }

      this.$validator
        .validateAll('form')
        .then((res) => {
          if (!res) return Promise.reject()
          return res
        })
        .then(() => {
          this.instansi.moodle_id = 1
          return this.$store
            .dispatch('instansi/form', { formData, id: this.instansi.id })
            .then((res) => {
              if (res.message) {
                this.$error(res.message)
              } else {
                this.$info('Simpan Data Berhasil')
                this.$refs.dlg.resolve()
                return res
              }
            })
            .catch((e) => e)
        })
        .catch((e) => e)
    },

    onMark(value) {
      const { lat, lng } = (value && value.marker) || {}
      this.$set(this.instansi, 'latitude', lat)
      this.$set(this.instansi, 'longitude', lng)
    },

    fetchMasters(type, url) {
      this.$store.dispatch('instansi/getMasters', url).then((res) => {
        this.$set(this.masters, type, res || [])
        if (['kecamatan', 'keluarahan'].indexOf(type) > -1) {
          this.masters[type].push(this.defModul.mAlamat)
        }
      })
    },

    onViewImg() {
      const options = {
        image: true,
        src: this.instansi && this.instansi.logo,
        okOnly: true,
        color: 'purple',
      }

      this.$infoDlg('', options, 'Preview Logo')
    },

    onNextStep() {
      if (this.step === 3 && (!this.instansi.latitude && !this.instansi.longitude)) {
        this.$error('Harap Menentukan Pointing Lokasi')
        return
      }

      this.$validator.validateAll('form').then((res) => {
        if (!res) {
          this.$error('Harap melengkapi data yang diwajibkan')
          return
        }
        this.step++
      })
    },

    roundDecimal(number) {
      return Math.round((number + Number.EPSILON) * 100) / 100
    },
  },

  watch: {
    'instansi.propinsi_id'(s) {
      if (!s) return
      this.fetchMasters('kota', `master=kota&propinsi_id=${s}`)
    },
    'instansi.kota_id'(s) {
      if (!s) return
      this.fetchMasters('kecamatan', `master=kecamatan&kota_id=${s}`)
    },
    'instansi.kecamatan_id'(s) {
      if (!s) {
        this.$set(this.masters, 'kelurahan', [this.defModul.mAlamat])
        return
      }
      this.fetchMasters('kelurahan', `master=kelurahan&kecamatan_id=${s}`)
    },
    'instansi.file'(s) {
      if (!s) return
      if (s.size > this.roundDecimal(1500 * 1000)) return

      const blob = new Blob([s], { type: s.type })
      this.instansi.logo = window.URL.createObjectURL(blob)
    },
  },
}
</script>
