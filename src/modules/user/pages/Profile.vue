<template>
  <v-container grid-list-lg class="pa-5">
    <progress-c :loading="loading" />
    <v-row row v-if="user">
      <v-col cols="12">
        <m-card title="Profil Diri">
          <v-row wrap>
            <v-col cols="12" sm="3" md="3" lg="3" xl="3" class="pr-2">
              <v-card text color="#fff" flat>
                <v-container fill-height container--fluid>
                  <v-row fill-height>
                    <v-col class="text-center" cols="12" align-end colbox>
                      <v-avatar :size="150" color="grey lighten-4">
                        <img src="img/avatar-l.png" alt="avatar" />
                      </v-avatar>
                      <div class="card-footer text-muted" v-html="message"></div>
                    </v-col>
                  </v-row>
                </v-container>
                <!-- <v-btn icon large color="grey" style="position: absolute;right: 0px;top: 5px;" id="pick-avatar">
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
            <v-col cols="12" sm="9" md="9" lg="9" xl="9">
              <v-list>
                <v-divider v-show="user.is_super_admin == 0 && user.is_admin == 0"></v-divider>
                <v-subheader v-if="user.is_super_admin == 0 && user.is_admin == 0" class="title primary--text"
                  >Detail</v-subheader
                >

                <v-row>
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-subtitle>Nama Lengkap</v-list-item-subtitle>
                        <v-list-item-title>
                          {{ $tools.pVal(user, 'nama') }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-subtitle>Hak Akses</v-list-item-subtitle>
                        <v-list-item-title>- </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-subtitle>Surel</v-list-item-subtitle>
                        <v-list-item-title>
                          {{ $tools.pVal(user, 'email') }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <span>
                      <v-btn color="error" depressed @click="ubahSandi">
                        <v-icon>mdi-lock</v-icon>&nbsp;Ubah Kata Sandi
                      </v-btn>
                    </span>
                  </v-col>
                </v-row>
              </v-list>
            </v-col>
          </v-row>
        </m-card>
      </v-col>
    </v-row>
    <ChangePasswordDlg ref="dlgPass" />
  </v-container>
</template>

<script>
import ChangePasswordDlg from '../../user/components/ChangePassword.vue'
import AvatarCropper from 'vue-avatar-cropper'
export default {
  components: {
    AvatarCropper,
    ChangePasswordDlg,
  },
  data() {
    return {
      message: '',
      loading: false,
      cropperOutputMime: null,
      randomImg: 'sqwea12',
    }
  },
  activated() {
    this.message = ''
    // this.createIDCard();
  },
  computed: {
    user() {
      return this.current_user
    },
  },
  methods: {
    load() {
      return this.current_user
    },
    ubahSandi() {
      this.$confirmDanger('', {}, 'Apakah Anda ingin mengubah Kata Sandi Anda')
        .then(() => {
          this.$refs.dlgPass.open().catch((e) => e)
        })
        .catch((e) => e)
    },
    cropperHandler(cropper) {
      var imgdat = cropper.getCroppedCanvas().toDataURL(this.cropperOutputMime)
      var file = this.dataURLtoFile(imgdat, 'test.png')

      return this.$store
        .dispatch('user/uploadImage', {
          user_id: this.user.user_id,
          data: file,
        })
        .then(() => {
          this.$success('Foto profil berhasil diperbarui')
          this.randomImg = Math.random()
          this.$store.dispatch('user/getProfil')
        })
        .catch((e) => e)
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }

      return new File([u8arr], filename, { type: mime })
    },
  },
  watch: {},
}
</script>
