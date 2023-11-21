<template>
  <div ref="dlgPic" class="text-center" fill-height fluid>
    <v-dialog v-model="dialog" width="700">
      <template v-slot:activator="{}"></template>

      <v-card class="pa-5 text-center rounded-lg">
        <div class="center" align="center" justify="center">
          <v-avatar size="80">
            <img src="https://cdn.siap.id/s3/siap_belajar/sim/berhasil.png" alt />
          </v-avatar>
        </div>
        <p class="title mt-5">
          Hai, Selamat Datang
        </p>
        <p class="black--text">Silakan lengkapi data penanggung jawab Instansi Anda terlebih dahulu</p>
        <v-card-text class="my-0 pb-2"> </v-card-text>
        <v-form autocomplete="false" @submit.prevent data-vv-scope="form" lazy-validation>
          <v-row no-gutters>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                class="mx-1"
                outlined
                dense
                autocomplete="false"
                name="Nama Penanggung Jawab"
                placeholder="Isikan Penanggung Jawab"
                label="Nama Penanggung Jawab"
                v-model="pic.penanggung_jawab"
                persistent-hint
                data-vv-name="penanggung_jawab"
                data-vv-as="Penanggung Jawab"
                v-validate="'required'"
                :error-messages="errors.collect('form.penanggung_jawab')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                class="mx-1"
                outlined
                dense
                autocomplete="false"
                name="No HP Penanggung Jawab"
                placeholder="Isikan Penanggung Jawab"
                label="No HP Penanggung Jawab"
                v-model="pic.hp_penanggung_jawab"
                persistent-hint
                data-vv-name="hp_penanggung_jawab"
                data-vv-as="No HP Penanggung Jawab"
                v-validate="'required|numeric|min:10|max:14'"
                :error-messages="errors.collect('form.hp_penanggung_jawab')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                class="mx-1"
                outlined
                dense
                autocomplete="false"
                name="Nama Kepala Sekolah"
                placeholder="Isikan Kepala Sekolah"
                label="Nama Kepala Sekolah"
                v-model="pic.kepala_sekolah"
                persistent-hint
                data-vv-name="kepala_sekolah"
                data-vv-as="Kepala Sekolah"
                v-validate="'required'"
                :error-messages="errors.collect('form.kepala_sekolah')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                class="mx-1"
                outlined
                dense
                autocomplete="false"
                name="No HP Kepala Sekolah"
                placeholder="Isikan Kepala Sekolah"
                label="No HP Kepala Sekolah"
                v-model="pic.hp_kepala_sekolah"
                persistent-hint
                data-vv-name="hp_kepala_sekolah"
                data-vv-as="No HP Kepala Sekolah"
                v-validate="'required|numeric|min:10|max:14'"
                :error-messages="errors.collect('form.hp_kepala_sekolah')"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                class="mx-1"
                id="surel"
                outlined
                dense
                autocomplete="false"
                name="Email Penanggung Jawab"
                placeholder="Masukkan alamat surel yang akan ditambahkan"
                label="Email Penanggung Jawab"
                v-model="pic.email_penanggung_jawab"
                persistent-hint
                @keyup.13.prevent="cek"
                data-vv-name="email"
                data-vv-as="Email Penanggung Jawab"
                v-validate="'required|email'"
                :error-messages="errors.collect('form.email')"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                attach
                outlined
                dense
                autocomplete="false"
                v-model="pic.akreditasi_id"
                :items="itemAkreditasi"
                item-text="nama"
                item-value="id"
                no-data-text="Data Tidak Tersedia"
                placeholder="Pilih Akreditasi Sekolah"
                label="Akreditasi Sekolah"
                name="Akreditasi Sekolah"
                data-vv-name="akreditasi"
                data-vv-as="Akreditasi Sekolah"
                v-validate="'required'"
                :error-messages="errors.collect('form.akreditasi')"
              >
              </v-select>
            </v-col>
          </v-row>
        </v-form>
        <v-card-actions class="pb-4 pt-0 mt-0">
          <v-row no-gutters>
            <v-col cols="12">
              <v-checkbox
                v-model="setuju"
                dense
                color="black"
                name="setuju"
                label=""
                data-vv-name="setuju"
                data-vv-as="Persetujuan"
                v-validate="'required'"
                :error-messages="errors.collect('form.setuju')"
              >
                <template v-slot:label>
                  <div class="body-2 teal--text">
                    Saya telah menginputkan data Penanggung Jawab dan kepala Sekolah dengan benar dan dapat
                    dipertanggungjawabkan.
                  </div>
                </template>
              </v-checkbox>
            </v-col>
            <v-col cols="12">
              <m-button
                class="mx-1"
                :disabled="!setuju"
                :small="$vuetify.breakpoint.smAndDown ? true : false"
                textButton="Daftar"
                icon=""
                action="simpan"
                @simpan="simpan"
              ></m-button>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      dialog: false,
      setuju: false,
      itemAkreditasi: [
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
      pic: {
        penanggung_jawab: null,
        hp_penanggung_jawab: null,
        kepala_sekolah: null,
        hp_kepala_sekolah: null,
        email_penanggung_jawab: null,
        akreditasi_id: null,
      },
      defPic: {
        penanggung_jawab: null,
        hp_penanggung_jawab: null,
        kepala_sekolah: null,
        hp_kepala_sekolah: null,
        email_penanggung_jawab: null,
        akreditasi_id: null,
      },
    }
  },
  activated() {
    this.pic = this.defPic
  },
  methods: {
    open() {
      this.pic.penanggung_jawab = this.current_instansi.penanggung_jawab
      this.pic.email_penanggung_jawab = this.current_instansi.email_penanggung_jawab
      this.pic.hp_penanggung_jawab = this.current_instansi.hp_penanggung_jawab
      this.pic.kepala_sekolah = this.current_instansi.kepala_sekolah
      this.pic.hp_kepala_sekolah = this.current_instansi.hp_kepala_sekolah
      this.pic.akreditasi_id = this.current_instansi.akreditasi_id
      this.dialog = true
    },
    reloadInstansi() {
      this.$store
        .dispatch('instansi/switchInstansi', this.$route.params.instansi_id)
        .then(() => {
          this.load()
        })
        .catch((e) => e)
    },
    simpan() {
      this.$validator
        .validateAll('form')
        .then((res) => {
          if (!res) return Promise.reject()
          return res
        })
        .then(() => {
          return this.$store
            .dispatch('instansi/setPenanggungJawab', { instansi_id: this.instansi_id, obj: this.pic })
            .then((res) => {
              if (!res.message) {
                this.$info('Data Penanggung Jawab telah ditambahkan')
                this.$store.commit('instansi/has_pic', true)
                this.pic = this.defPic
                this.reloadInstansi()
                this.$validator.reset()
                this.dialog = false
                this.$emit('load')
                return this.resolve(res)
              }
            })
            .catch((e) => e)
        })
    },
  },
}
</script>
