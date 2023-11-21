<template>
  <m-dialog ref="dlg" :btnsave="false" :title="user && user.id ? 'Ubah Pengguna' : 'Tambah Pengguna'">
    <v-row row wrap justify="center" align="center" v-if="user">
      <v-col cols="12" sm="12" md="10" lg="8" xl="8">
        <v-card flat color="white" v-if="step == 1" class="mt-4 px-2 rounded-lg">
          <v-card-text>
             <v-form autocomplete="false" data-vv-scope="form" lazy-validation>
            <v-row wrap class="ma-5 pt-5">
              <v-col cols="12">
                <m-alert
                  show
                  :title="alert.pengguna.form.judul"
                  :info="alert.pengguna.form.deskripsi"
                  closable
                ></m-alert>
              </v-col>
              <v-col cols="12" sm="12" md="10" lg="10" class="pb-0">
                <v-text-field
                  id="surel"
                  outlined
                  dense
                  autocomplete="false"
                  name="Alamat Surel"
                  placeholder="Masukkan alamat surel yang akan ditambahkan"
                  hint="* Ketikan surel dengan format yang sesuai"
                  label="Surel"
                  v-model="user.email"
                  persistent-hint
                  @keyup.13.prevent="cek"
                  data-vv-name="email"
                  data-vv-as="Surel"
                  v-validate="'required|email'"
                  :error-messages="errors.collect('form.email')"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="2" lg="2" class="my-0">
                <m-button
                  depressed
                  isBlock
                  class="text-capitalize"
                  text="Cari"
                  icon="mdi-magnify"
                  action="cek"
                  @cek="cek"
                ></m-button>
              </v-col>
            </v-row>
             </v-form>
          </v-card-text>
        </v-card>
        <v-card flat color="white" v-else-if="step == 2" class="mt-4 pb-5 rounded-lg">
          <v-card-text>
            <v-form autocomplete="false" data-vv-scope="form" lazy-validation class="ma-5">
              <v-row wrap>
                <v-col cols="12" class="mb-4">
                  <m-alert
                    show
                    :title="alert.pengguna.form2.judul"
                    :info="alert.pengguna.form2.deskripsi"
                    closable
                  ></m-alert>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="6" class="py-2">
                  <v-text-field
                    id="name"
                    autofocus
                    dense
                    autocomplete="false"
                    outlined
                    label="Nama lengkap"
                    v-model="user.name"
                    placeholder="Masukkan Nama Lengkap Anggota"
                    data-vv-name="nama"
                    data-vv-as="Nama Lengkap"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.nama')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12" class="py-2">
                  <v-text-field
                    id="surel2"
                    dense
                    autocomplete="false"
                    outlined
                    readonly
                    label="Surel"
                    v-model="user.email"
                    placeholder="Masukkan Surel"
                    data-vv-name="email"
                    data-vv-as="Surel"
                    v-validate="'required|email'"
                    :error-messages="errors.collect('form.email')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="6" class="py-2">
                  <span>Jenis Kelamin</span>
                  <v-radio-group v-model="user.kelamin" row class="mt-0 mb-2">
                    <v-radio v-for="kelamin in itemKelamins" :key="kelamin.index" :label="kelamin == 'L' ? 'Laki-Laki' : 'Perempuan'" :value="kelamin"></v-radio>
                  </v-radio-group>
                </v-col>

              </v-row>
              <v-row wrap>
                <v-col cols="12" sm="12" md="12" lg="6" class="py-2" v-if="showPassword && false">
                  <v-text-field
                    id="sandi"
                    dense
                    autocomplete="false"
                    outlined
                    placeholder="Kata Sandi"
                    :append-icon="appendIcon"
                    @click:append="switchVisibility"
                    ref="password"
                    :type="passwordFieldType"
                    label="Kata Sandi *"
                    v-model="user.password"
                    data-vv-name="password"
                    data-vv-as="Kata Sandi"
                    v-validate="'required|min:6'"
                    :error-messages="errors.collect('form.password')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="6" class="py-2" v-if="showPassword && false">
                  <v-text-field
                    id="konfirmasi"
                    dense
                    autocomplete="false"
                    outlined
                    placeholder="Konfirmasi Kata Sandi"
                    type="password"
                    label="Konfirmasi Kata Sandi *"

                    v-model="user.password_confirmation"
                    data-vv-name="password_confirmation"
                    data-vv-as="Konfirmasi Kata Sandi"
                    v-validate="'required|min:6|confirmed:password'"
                    :error-messages="errors.collect('form.password_confirmation')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="6" class="py-2">
                  <v-autocomplete
                    outlined
                    dense
                    multiple
                    id="tingkat"
                    clearable
                    autocomplete="false"
                    v-model="tingkat"
                    :items="itemTingkats"
                    no-data-text="Data Tidak Tersedia"
                    placeholder="Pilih Tingkat"
                    label="Untuk Tingkat"
                    name="Tingkat"
                    item-value="id"
                    return-object
                    item-text="keterangan2"
                    data-vv-name="tingkat"
                    data-vv-as="Tingkat"
                    v-validate="''"
                    :error-messages="errors.collect('form.tingkat')"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="6" class="py-2">
                  <v-select
                    id="peran"
                    multiple
                    dense
                    autocomplete="false"
                    outlined
                    :items="itemPerans"
                    item-text="keterangan"
                    item-value="id"
                    data-vv-name="Hak Akses"
                    data-vv-as="     "
                    placeholder="Hak Akses"
                    v-model="user.peran"
                    return-object
                    v-validate="''"
                    label="Hak Akses"
                    :error-messages="errors.collect('form.akses')"
                  ></v-select>
                </v-col>
                <v-col cols="12" class="black--text">
                  Keterangan <br/>
                  * = Wajib diisi
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-divider class="mx-5"></v-divider>
          <v-card-actions class="pt-5 my-1">
            <v-spacer></v-spacer>
            <m-button
              right
              class="elevation-7"
              text="Simpan"
              icon="mdi-content-save"
              action="save"
              @save="save"
            ></m-button>
          </v-card-actions>
        </v-card>

        <v-card flat color="grey lighten-4" text v-else class="mt-4">
          <v-card-text>
            <v-form data-vv-scope="form" lazy-validation>
              <v-row wrap>
                <v-col cols="12">
                  <m-alert
                    show
                    title="Info"
                    :info="
                      `Surel ` +
                        user.email +
                        ` telah terdaftar atas nama ` +
                        user.name +
                        ` jika Anda ingin menambahkan ke Instansi Anda silahkan pilih Hak Akses dan tekan tombol simpan`
                    "
                    closable
                  ></m-alert>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="6" class="py-2">
                  <v-text-field
                    autofocus
                    dense
                    autocomplete="false"
                    outlined
                    readonly
                    label="Nama lengkap"
                    v-model="user.name"
                    placeholder="Masukkan Nama Lengkap Anggota"
                    data-vv-name="nama"
                    data-vv-as="Nama Lengkap"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.nama')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="6" class="py-2">
                  <v-text-field
                    dense
                    autocomplete="false"
                    outlined
                    readonly
                    label="Surel"
                    v-model="user.email"
                    placeholder="Masukkan Surel"
                    data-vv-name="email"
                    data-vv-as="Surel"
                    v-validate="'required|email'"
                    :error-messages="errors.collect('form.email')"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row wrap>
                <v-col cols="12" sm="12" md="12" lg="6" class="py-2">
                  <v-autocomplete
                    outlined
                    dense
                    autocomplete="false"
                    v-model="user.tingkat"
                    :items="itemTingkats"
                    no-data-text="Data Tidak Tersedia"
                    placeholder="Pilih Tingkat"
                    label="Untuk Tingkat"
                    name="Tingkat"
                    item-value="id"
                    return-object
                    item-text="keterangan2"
                    data-vv-name="tingkat"
                    data-vv-as="Tingkat"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.tingkat')"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="6" class="py-2">
                  <v-select
                    dense
                    autocomplete="false"
                    outlined
                    :items="itemPerans"
                    item-text="nama"
                    item-value="id"
                    data-vv-name="Hak Akses"
                    data-vv-as="     "
                    placeholder="Hak Akses"
                    v-model="user.role_id"
                    v-validate="'required'"
                    label="Hak Akses"
                    :error-messages="errors.collect('form.akses')"
                  ></v-select>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-divider class="mx-5"></v-divider>

          <v-card-actions class="pt-5 my-1">
            <v-spacer></v-spacer>
            <m-button
              right
              class="elevation-7"
              text="Simpan"
              icon="mdi-content-save"
              action="save"
              @save="save"
            ></m-button>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </m-dialog>
</template>

<script>
import { ALERT_INFO } from '@/const'
import { KELAMIN } from '@/const'
export default {
  $_veeValidate: {
    validator: 'new',
  },

  data() {
    return {
      alert: ALERT_INFO,
      user: null,
      itemKelamins: ['L','P'],
      step: 1,
      appendIcon: 'mdi-eye-off',
      passwordFieldType: 'password',
      defUser: {
        nama: null,
        email: null,
        no_hp: '62',
        kelamin: 'L',
      },
      showPassword: true,
      KELAMIN: KELAMIN,
      itemPerans: [],
      itemTingkats: [],
    }
  },
  methods: {
    open(obj, editable) {
      this.loadPeran()
      this.loadTingkat()

      if (obj) {
        this.showPassword = false
        this.user = obj
        this.tingkat = obj.tingkat
        this.step = 2
      } else {
        this.showPassword = true
        this.tingkat = []
        this.user = { ...this.defUser, email: '' }
        this.step = 1
      }
      this.user.editable = editable

      this.$validator.reset()
      return this.$refs.dlg.open()
    },

    // eslint-disable-next-line
    loadPeran() {
      return this.$store
        .dispatch('user/getPeran', this.instansi_id)
        .then((res) => {
          return (this.itemPerans = res)
        })
        .catch((e) => e)
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

    cek() {
      this.$validator
        .validateAll('form')
        .then((res) => {
          if (!res) return Promise.reject()
          return res
        })
        .then(() => {
          return this.$store
            .dispatch('user/cekPasspor', this.user.email)
            .then((res) => {
              if (res.status == 1 || res.status == 2) {
                this.showPassword = false
                this.step = 2
              } else {
                this.showPassword = true
                this.step = 2
              }
            })
            .catch((e) => e)
        })
        .catch((e) => e)
    },

    // eslint-disable-next-line
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
      this.passwordFieldType === 'password' ? (this.appendIcon = 'mdi-eye-off') : (this.appendIcon = 'mdi-eye')
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
          this.user.tingkat = this.tingkat
          return this.$store
            .dispatch('user/create', {
              sekolah_id: this.instansi_id,
              obj: this.user,
            })
            .then((res) => {
              this.$refs.dlg.resolve()
              return res
            })
            .catch((e) => e)
        })

        .catch((e) => e)
    },
  },
}
</script>
