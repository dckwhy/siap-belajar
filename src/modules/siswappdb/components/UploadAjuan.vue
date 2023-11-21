<template>
  <div>
    <m-dialog
      ref="dlgUpload"
      :ready="data.length > 0 && is_valid"
      @save="save"
      :title="options.title"
      :loading="uploading"
    >
      <v-form ref="fr" lazy-validation>
        <v-row>
          <v-col cols="10">
            <span class="black--text"
              >Anda dapat mengunduh dokumen templat unggah ajuan siswa PPDB secara masal melalui tombol
              <strong>UNDUH</strong> berikut. Selanjutnya, inputkan nilai mata pelajar pada tiap-tiap kolom semester
              pada templat, simpan pada lokal komputer Anda lalu unggah pada sistem dengan cara klik tombol
              <strong>CARI FILE</strong> dan <strong>UNGGAH DATA</strong> >> <strong>SIMPAN</strong> .
            </span>
            <p class="black--text mt-2" v-if="current_instansi.kode_jateng"
              >Nilai rapor didasarkan atas Nilai Rapor Semester I s.d V SMP/MTs atau yang sederajat, yaitu nilai mata
              pelajaran Bahasa Indonesia, Matematika, Bahasa Inggris, dan IPA. Apabila hasil Rapor Semester I s.d V
              untuk nilai Bahasa Indonesia, Matematika, Bahasa Inggris, dan IPA dalam rentang 0 (nol) sampai dengan 100
              (seratus) maka nilai dikonversi menjadi rentang nilai 0 (nol) sampai dengan 10 (sepuluh) hingga 2 (dua)
              digit di belakang koma. Nilai rapor dimaksud merupakan nilai rata–rata pada aspek kompetensi pengetahuan
              dan kompetensi keterampilan bagi satuan pendidikan yang melaksanakan kurikulum 2013, sedangkan untuk
              satuan pendidikan yang melaksanakan kurikulum 2006 adalah nilai rata-rata pada aspek kompetensi
              pengetahuan.</p
            >
            <br />
            <br />
            <m-button
              small
              color="orange white--text"
              icon="mdi-download"
              text="Unduh"
              action="download"
              @download="download()"
            ></m-button
          ></v-col>
        </v-row>
        <v-row v-if="errorUpload">
          <v-col cols="12">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      <v-icon color="red">mdi-alert</v-icon><strong> Data gagal diunggah</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="err in errorUpload.messages" :key="err.index">
                    <td>{{ err.message }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table></v-col
          >
        </v-row>

        <v-divider class="my-4"></v-divider>

        <v-layout row class="pa-0" v-if="isPreview">
          <v-img
            v-if="file_url"
            aspec-ratio="1.7"
            height="300"
            :src="file_url"
            class="grey darken-4"
            contain
            style="cursor:pointer"
            @click="browseImg"
          ></v-img>
        </v-layout>
        <v-layout column v-else>
          <v-list v-if="file_val">
            <v-list-item avatar>
              <v-list-item-avatar>
                <v-icon>mdi-file</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ file_val.name }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action v-if="false">
                <v-btn icon>
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-layout>

        <v-layout column class="py-2 px-4">
          <v-text-field v-if="options.description" v-model="description" label="Keterangan"></v-text-field>
        </v-layout>
        <v-layout wrap :justify-center="!file_val">
          <v-btn :disabled="uploading || !isCan('usermeta')" color="success" @click="browseImg" class="mx-0">
            <v-icon small class="mr-2">mdi-folder-open</v-icon>Cari File
          </v-btn>
          <v-btn :disabled="uploading || !file_val || !isCan('usermeta')" color="primary" @click="unggah" class="mx-2">
            <v-icon small class="mr-2">mdi-cloud-upload</v-icon>Unggah Data
          </v-btn>
        </v-layout>
      </v-form>
    </m-dialog>
    <input
      type="file"
      :accept="options.mime"
      :multiple="false"
      ref="file"
      @change="onFileChange"
      style="display:none"
    />
  </div>
</template>

<script>
import { BASE_API } from '@/const'
export default {
  inheritAttrs: false,
  $_veeValidate: {
    validator: 'new',
  },
  props: {
    perans: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      data: [],
      file_blob: null,
      file_val: null,
      uploading: false,
      file_url: null,
      description: null,
      options: {},
      defOptions: {
        id: null,
        category: false,
        preview: true,
        description: false,
        mime: '*',
        module: null,
        title: 'Upload File',
      },
      errorUpload: null,
    }
  },
  mounted() {},
  computed: {
    isPreview() {
      return this.file_val && this.file_val.type.indexOf('image/') >= 0
    },
    is_valid() {
      var statusValid = true
      this.data.forEach((item) => {
        if (!item.status) {
          statusValid = false
        }
      })

      return statusValid
    },
    token() {
      return this.$store.getters['user/token']
    },
  },
  methods: {
    // eslint-disable-next-line
    open(obj = {}, err) {
      this.errorUpload = err ? { ...err } : null
      this.data = []
      this.$refs.file.value = null
      this.file_blob = null
      this.file_val = null
      this.description = null
      this.file_url = null

      this.$validator.reset()
      this.options = { ...this.defOptions, ...obj }
      return this.$refs.dlgUpload.open()
    },
    unggah() {
      this.$validator
        .validateAll()
        .then((res) => {
          if (!res) return Promise.reject()
          return res
        })
        .then(() => {
          this.uploading = true
          let obj = {
            id: this.instansi_id,
            file: this.file_val,
          }
          if (this.options.id) obj.id = this.options.id
          if (this.options.description) obj.keterangan = this.description

          return this.$store
            .dispatch('siswappdb/importAjuan', obj)
            .then((res) => {
              this.$refs.dlgUpload.resolve(res)
              if (res && res.status == 201) {
                this.file_val = null
                this.$info('Unggah data ajuan siswa berhasil.')
                this.uploading = false
                this.data = res.data
                return res
              } else {
                this.file_val = null
                this.uploading = false
              }
            })
            .catch((e) => {
              this.file_val = null
              this.uploading = false
              this.open({}, e)

              this.uploading = false
              return Promise.reject()
            })
        })
        .catch((e) => e)
    },
    save() {
      this.$validator
        .validateAll()
        .then((res) => {
          if (!res) return Promise.reject()
          return res
        })
        .then(() => {
          return this.$store
            .dispatch('user/unggahPengguna', {
              sekolah_id: this.instansi_id,
              obj: this.data,
            })
            .then((res) => {
              this.$refs.dlgUpload.resolve()
              return res
            })
            .catch((e) => e)
        })

        .catch((e) => e)
    },
    onFileChange(e) {
      let fl = e.target.files ? e.target.files[0] : null
      if (fl) {
        this.file_val = fl
        let fr = new FileReader()
        fr.addEventListener('load', () => {
          this.file_url = fr.result
        })
        fr.readAsDataURL(fl)
      }
    },
    browseImg() {
      this.$refs.file.click()
    },
    download() {
      var url = ''
      url = BASE_API + '/api/sekolah/' + this.instansi_id + '/siswa_download?access_token=' + this.token

      window.open(url, '_blank')
    },
  },
}
</script>
