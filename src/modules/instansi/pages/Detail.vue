<template>
  <v-container class="pa-2" fluid v-if="instansi">
    <v-row wrap>
      <v-col cols="12">
        <v-alert
          dismissible
          color="info"
          border="left"
          elevation="2"
          colored-border
          icon="mdi-information"
          close-icon="mdi-close"
        >
          Halaman ini menginformasikan semua data instansi (sekolah) naungan Anda. Diharapkan data disesuaikan dengan
          kondisi terbaru saat ini
        </v-alert>
      </v-col>
      <v-col cols="12">
        <m-card title="Profil Instansi" :edit="isCan('instansi')" @edit="edit" @cetak="cetak">
          <v-row wrap class="my-2">
            <v-col cols="12" sm="12" md="3">
              <v-card text color="primary" flat>
                <v-img class="white--text" height="220px" src="img/parallax.png">
                  <v-container fill-height container--fluid>
                    <v-row fill-height>
                      <v-col class="text-center" cols="12" align-end colbox>
                        <v-avatar :size="180" color="grey lighten-4">
                          <img
                            :src="
                              instansi && instansi.logo
                                ? instansi.logo
                                : 'https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png'
                            "
                            alt="avatar"
                          />
                        </v-avatar>
                        <div class="card-footer text-muted" v-html="message"></div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-img>
                <!-- <v-btn icon large color="white" style="position: absolute;right: 0px;top: 5px;" id="pick-avatar">
                  <v-icon>mdi-camera</v-icon>
                </v-btn> -->
                <avatar-cropper
                  :upload-handler="cropperHandler"
                  trigger="#pick-avatar"
                  :output-mime="cropperOutputMime"
                  :output-quality="0.8"
                  :output-options="{ width: 400, height: 400 }"
                  :labels="{ submit: 'Simpan', cancel: 'Hapus' }"
                />
              </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="8">
              <div v-for="(profil, key) in mInfoInstansi" :key="key">
                <p class="font-weight-bold primary--text my-5 ml-3">{{ key }}</p>
                <v-row dense no-gutters>
                  <v-col v-for="(item, i) in mInfoInstansi[key]" :key="i" v-bind="item.grid">
                    <m-list-tile-info :label="item.label" :value="item.value" />
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <m-button
                      class="ml-3"
                      v-if="key == 'Penanggung Jawab'"
                      small
                      icon="mdi-pencil"
                      color="primary"
                      text="Penanggung Jawab"
                      action="updatePic"
                      @updatePic="updatePic(instansi)"
                    ></m-button>
                    <v-divider class="my-2" />
                  </v-col>
                </v-row>
              </div>
              <div>
                <GmapMap
                  :options="{
                    zoomControl: true,
                    mapTypeControl: false,
                    scaleControl: true,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false,
                    disableDefaultUi: false,
                    scrollwheel: false,
                    gestureHandling: 'cooperative',
                  }"
                  :center="{ lat: instansi.latitude, lng: instansi.longitude }"
                  :zoom="13"
                  style="width: 100%; height: 300px;"
                >
                  <GmapMarker v-if="Object.keys(coordinates).length" :position="coordinates" />
                </GmapMap>
              </div>
            </v-col>
          </v-row>
        </m-card>
      </v-col>
      <ChangeDlg ref="dlg" />
      <PicDlg ref="dlgPic" @load="load" />
    </v-row>
  </v-container>
</template>
<script>
import { API } from '../../../const'
import AvatarCropper from 'vue-avatar-cropper'
import ChangeDlg from '../components/Form.vue'
import PicDlg from '../components/penanggungJawab.vue'
export default {
  components: {
    AvatarCropper,
    ChangeDlg,
    PicDlg,
  },
  data() {
    return {
      allow: false,
      instansi: null,
      message: '',
      cropperOutputMime: null,
      token: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
      urlUploadCover: null,
      urlUploadPhoto: null,
      itemStatus: {
        status: {
          1: 'Negeri',
          2: 'Swasta',
        },
        inklusi: {
          1: 'Inklusi',
          2: 'Bukan Inklusi',
        },
      },
      coordinates: {},
    }
  },
  computed: {
    mInfoInstansi() {
      return {
        Dasar: [
          {
            label: 'Nama Sekolah',
            value: this.pVal(this.instansi, 'nama') || '',
            grid: { cols: 12, md: 12, sm: 12 },
          },
          {
            label: 'NPSN',
            value: this.pVal(this.instansi, 'npsn') || '',
            grid: { cols: 12, md: 6, sm: 12 },
          },
          {
            label: 'Akreditasi',
            value: this.pVal(this.instansi.akreditasi, 'nama') || '',
            grid: { cols: 12, md: 6, sm: 12 },
          },
          {
            label: 'NSS',
            value: this.pVal(this.instansi, 'nss') || '',
            grid: { cols: 12, md: 6, sm: 12 },
          },
          {
            label: 'Status',
            value: this.itemStatus.status[this.instansi.status_id] || '-',
            grid: { cols: 12, md: 6, sm: 12 },
          },
          {
            label: 'Jenjang',
            value: this.pVal(this.instansi.jenjang, 'keterangan') || '',
            grid: { cols: 12, md: 6, sm: 12 },
          },
          {
            label: 'Status Inklusi',
            value: this.itemStatus.inklusi[this.instansi.status_inklusi_id] || '-',
            grid: { cols: 12, md: 6, sm: 12 },
          },
        ],
        'Penanggung Jawab': [
          {
            label: 'Kepala Sekolah',
            value: this.pVal(this.instansi, 'kepala_sekolah') || '',
            grid: { cols: 12, md: 6, sm: 12 },
          },
          {
            label: 'Penanggung Jawab',
            value: this.pVal(this.instansi, 'penanggung_jawab') || '',
            grid: { cols: 12, md: 6, sm: 12 },
          },
          {
            label: 'Surel Penanggung Jawab',
            value: this.pVal(this.instansi, 'email_penanggung_jawab') || '',
            grid: { cols: 12, md: 6, sm: 12 },
          },
        ],
        Kontak: [
          {
            label: 'Email',
            value: this.pVal(this.instansi, 'email') || '-',
            grid: { cols: 12, md: 6, sm: 12 },
          },
          {
            label: 'facebook',
            value: this.pVal(this.instansi, 'facebook') || '-',
            grid: { cols: 12, md: 6, sm: 12 },
          },
          {
            label: 'No Telepon',
            value: this.pVal(this.instansi, 'no_telepon') || '-',
            grid: { cols: 12, md: 6, sm: 12 },
          },
          {
            label: 'twitter',
            value: this.pVal(this.instansi, 'twitter') || '-',
            grid: { cols: 12, md: 6, sm: 12 },
          },
          {
            label: 'website',
            value: this.pVal(this.instansi, 'website') || '-',
            grid: { cols: 12, md: 6, sm: 12 },
          },
          {
            label: 'Instagram',
            value: this.pVal(this.instansi, 'instagram') || '-',
            grid: { cols: 12, md: 6, sm: 12 },
          },
        ],
        Alamat: [
          {
            label: 'Alamat Sekolah',
            value: this.pVal(this.instansi, 'alamat') || '-',
            grid: { cols: 12, md: 12, sm: 12 },
          },
          {
            label: 'Propinsi',
            value: this.pVal(this.instansi.propinsi, 'keterangan') || '-',
            grid: { cols: 12, md: 6, sm: 12 },
          },
          {
            label: 'Kota',
            value: this.pVal(this.instansi.kota, 'keterangan') || '-',
            grid: { cols: 12, md: 6, sm: 12 },
          },
          {
            label: 'Kecamatan',
            value: this.pVal(this.instansi.kecamatan, 'keterangan') || this.pVal(this.instansi, 'kecamatan') || '-',
            grid: { cols: 12, md: 6, sm: 12 },
          },
          {
            label: 'Kelurahan',
            value: this.pVal(this.instansi.kelurahan, 'keterangan') || this.pVal(this.instansi, 'kelurahan') || '-',
            grid: { cols: 12, md: 6, sm: 12 },
          },
          {
            label: 'RT',
            value: this.pVal(this.instansi, 'rt') || '-',
            grid: { cols: 12, md: 6, sm: 12 },
          },
          {
            label: 'RW',
            value: this.pVal(this.instansi, 'rw') || '-',
            grid: { cols: 12, md: 6, sm: 12 },
          },
        ],
      }
    },
  },
  activated() {
    this.urlUploadPhoto = API + '/api/instansi/' + this.instansi_id + '/image'
    this.urlUploadCover = API + '/api/instansi/' + this.instansi_id + '/image'
    this.load()
  },
  methods: {
    load() {
      this.$store
        .dispatch('instansi/detail', this.instansi_id)
        .then((res) => {
          this.instansi = res
          this.$set(this.coordinates, 'lng', (res && res.longitude) || 0)
          this.$set(this.coordinates, 'lat', (res && res.latitude) || 0)
        })
        .catch((e) => e)
    },
    updatePic() {
      this.$refs.dlgPic.open()
    },
    cetak() {
      this.loading = true
      return this.$store
        .dispatch('instansi/cetakAkun', this.current_instansi.url_unduh)
        .then((res) => {
          if (res) {
            this.loading = false
            this.$info('Proses Cetak Akun berhasil.')
          }
        })
        .catch(() => {
          this.loading = false
          this.$error('Proses Cetak Akun gagal.')
        })
    },
    reloadInstansi(item) {
      this.$store
        .dispatch('instansi/switchInstansi', item.id)
        .then(() => {
          this.load()
        })
        .catch((e) => e)
    },
    edit() {
      this.$refs.dlg.open(this.instansi).then(() => {
        this.load()
      })

      this.$nextTick(() => {
        let init = { ...this.instansi }

        this.$set(init, 'kecamatan', typeof init.kecamatan === 'object' ? null : init.kecamatan)
        this.$set(init, 'kelurahan', typeof init.kelurahan === 'object' ? null : init.kelurahan)

        this.$refs.dlg.instansi = init
      })
    },
    // eslint-disable-next-line
    handleUploaded(response) {
      if (response.status) {
        // this.message = "Load photo..";
      }
    },
    // eslint-disable-next-line
    handleUploading(form, xhr) {
      this.message = 'uploading...'
    },
    // eslint-disable-next-line
    handleCompleted(commit, response, form, xhr) {
      this.$info('Update Foto Berhasil')
      this.message = ''
      this.reloadInstansi(this.instansi)
    },
    // eslint-disable-next-line
    handlerError(message, type, xhr) {
      // this.$error("Update Foto Gagal");
      this.message = 'Oops! Something went wrong...'
    },
    close() {
      this.$router.push({
        name: 'instansi',
      })
    },
    cropperHandler(cropper) {
      var imgdat = cropper.getCroppedCanvas().toDataURL(this.cropperOutputMime)
      var file = this.dataURLtoFile(imgdat, 'test.png')

      this.$store
        .dispatch('organisasi/uploadImage', {
          organisasi_id: this.organisasi_id,
          data: file,
        })
        .then(() => {
          this.load()
        })
        .catch((e) => e)
    },
  },
  watch: {
    instansi_id() {
      this.load()
    },
  },
}
</script>
