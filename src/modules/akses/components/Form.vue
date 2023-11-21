<template>
  <m-dialog ref="dlg" :btnsave="false" :title="akses && akses.user_id ? 'Ubah Akses' : 'Tambah Akses'">
    <v-row row wrap justify="center" align="center">
      <v-col cols="12" sm="12" md="10" lg="8" xl="8">
        <v-form @submit.prevent data-vv-scope="form" lazy-validation>
          <v-card flat class="py-5 rounded-lg">
            <v-row class="ma-1 my-0 px-5">
              <v-col cols="12">
                <m-alert show :title="alert.akses.form.judul" :info="alert.akses.form.keterangan" closable></m-alert>
              </v-col>
            </v-row>
            <v-card-text>
              <v-row wrap class=" px-5">
                <v-col cols="12" class="py-0 ">
                  <v-text-field
                    outlined
                    dense
                    autocomplete="false"
                    name="Nama"
                    placeholder="Isikan Nama"
                    label="Nama"
                    v-model="akses.keterangan"
                    persistent-hint
                    data-vv-name="nama"
                    data-vv-as="Nama"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.nama')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12" class="mx-2">
                  <v-row class="py-0">
                    <v-col cols="12" class="py-0 title font-weight-bold">Hak Akses</v-col>
                    <v-col class="py-0" v-for="item in itemAkseses" :key="item.id" cols="12" sm="6" md="6" lg="6">
                      <v-checkbox
                        class="caption py-0"
                        v-model="item.value"
                        :label="pVal(item, 'keterangan') | toTitleCase"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider class="mx-5"></v-divider>
            <v-col cols="12" class="pb-5 mb-5">
              <m-button
                right
                absolute
                class="pa-5"
                text="Simpan"
                icon="mdi-content-save"
                action="save"
                @save="save"
              ></m-button>
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
      akses: {},
      defModul: {
        nama: '',
      },
      itemAkseses: [],
      alert: ALERT_INFO,
    }
  },
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.loadAksesModul()
      this.akses = obj ? { ...obj, ...this.cekAkses(obj.akses) } : { ...this.defModul }
      let x = this.$refs.dlg.open()
      this.$validator.reset()
      return x
    },

    loadAksesModul() {
      this.itemAkseses = [
        {
          id: 8,
          nama: 'read-pengguna',
          keterangan: 'Kelola Pengguna (Read)',
          is_deleted: 0,
          value: false,
        },
        {
          id: 1,
          nama: 'pengguna',
          keterangan: 'Kelola Pengguna',
          is_deleted: 0,
          value: false,
        },
        {
          id: 12,
          nama: 'read-mapel',
          keterangan: 'Kelola Mapel (Read)',
          is_deleted: 0,
          value: false,
        },
        {
          id: 2,
          nama: 'mapel',
          keterangan: 'Kelola Mapel',
          is_deleted: 0,
          value: false,
        },
        {
          id: 9,
          nama: 'read-rombel',
          keterangan: 'Kelola Rombel (Read)',
          is_deleted: 0,
          value: false,
        },
        {
          id: 3,
          nama: 'rombel',
          keterangan: 'Kelola Rombel',
          is_deleted: 0,
          value: false,
        },
        {
          id: 10,
          nama: 'kelas',
          keterangan: 'Kelola Kelas (Read)',
          is_deleted: 0,
          value: false,
        },
        {
          id: 7,
          nama: 'kelas',
          keterangan: 'Kelola Kelas',
          is_deleted: 0,
          value: false,
        },
        {
          id: 11,
          nama: 'read-kelas',
          keterangan: 'Kelola Hak Akses (Read)',
          is_deleted: 0,
          value: false,
        },
        {
          id: 6,
          nama: 'kelas',
          keterangan: 'Kelola Hak Akses',
          is_deleted: 0,
          value: false,
        },
      ]
    },

    cekAkses(val) {
      this.itemAkseses.forEach((master) => {
        val.forEach((akses) => {
          if (akses.nama == master.nama) {
            master.value = true
          }
        })
      })
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
          this.akses.akses = this.itemAkseses
          return this.$store
            .dispatch('akses/form', {
              sekolah_id: this.instansi_id,
              obj: this.akses,
            })
            .then(() => {
              this.$info('Simpan Data Berhasil')
              this.$refs.dlg.resolve()
            })
            .catch((e) => e)
        })
        .catch((e) => e)
    },
  },
}
</script>
