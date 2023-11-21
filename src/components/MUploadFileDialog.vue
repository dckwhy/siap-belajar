<template>
  <div>
    <m-dialog ref="dlg" :ready="data.length > 0 && is_valid" @save="save" :title="options.title" :loading="uploading">
      <v-form ref="fr" lazy-validation>
        <v-row>
          <v-col cols="10"
            ><span class="black--text"
              >Anda dapat mengunduh dokumen unggah pengguna secara masal melalui tombol berikut
            </span>
            <m-button
              small
              class="ma-2"
              color="orange white--text"
              icon="mdi-download"
              text="Unduh"
              action="download"
              @download="download(link)"
            ></m-button
          ></v-col>
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
          <v-btn :disabled="uploading" color="success" @click="browseImg" class="mx-0">
            <v-icon small class="mr-2">mdi-folder-open</v-icon>Cari File
          </v-btn>
          <v-btn :disabled="uploading || !file_val" color="primary" @click="unggah" class="mx-2">
            <v-icon small class="mr-2">mdi-cloud-upload</v-icon>Unggah dan Verifikasi Data
          </v-btn>
        </v-layout>

        <v-row class="pt-4" wrap v-for="item in data" :key="item.index" no-gutters>
          <v-col cols="12" sm="4" md="4" lg="4">
            <label class="caption mb-2">Surel</label>
            <p class="black--text mt-0 pt-0">{{pVal(item,'email')}}</p>

          </v-col>
          <v-col cols="12" sm="4" md="4" lg="4">
            <label class="caption mb-2">Nama</label>
           <p class="black--text mt-0 pt-0">{{pVal(item,'nama')}}</p>
          </v-col>
          <v-col cols="12" sm="4" md="4" lg="4">
            <label class="caption mb-2">Peran</label>
            <p class="black--text mt-0 pt-0">{{pVal(item,'peran')}}</p>
          </v-col>
          <v-col cols="12"><div v-if="item.error_message.length>0" class="grey lighten-2 rounded pa-2">
            <p class="caption my-0 py-0 error--text " v-for="err in item.error_message" :key="err.index">{{ err }}</p>

          </div></v-col>
        </v-row>
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
      link: 'https://cdn.siap.id/s3/siap_belajar/sim/Template_Unggah_Pengguna_SIAP_Belajar.xlsx',

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
  },
  methods: {
    // eslint-disable-next-line
    open(obj = {}) {
      this.data = []
      this.$refs.file.value = null
      this.file_blob = null
      this.file_val = null
      this.description = null
      this.file_url = null

      this.$validator.reset()
      this.options = { ...this.defOptions, ...obj }
      return this.$refs.dlg.open()
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
            file: this.file_val,
          }
          if (this.options.id) obj.id = this.options.id
          if (this.options.description) obj.keterangan = this.description

          return this.$store
            .dispatch('user/importUser', obj)
            .then((res) => {
              if (res.status == 201) {
                this.$info('Unggah pengguna berhasil. Silakan pilih peran setiap pengguna yang diunggah.')
                this.uploading = false
                this.data = res.data
                return res
              } else {
                this.uploading = false
              }
            })
            .catch(() => {
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
              this.$refs.dlg.resolve()
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
    download(link) {
      window.open(link, '_blank')
    },
  },
}
</script>
