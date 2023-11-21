<template>
  <m-dialog ref="aktivasiDlg" :btnsave="false" title="Detail Aktivasi Instansi">
    <v-row row wrap justify="center" align="center" class="pt-5" v-if="instansi">
      <v-col cols="12" sm="12" md="10" lg="8" xl="8">
        <v-form @submit.prevent data-vv-scope="form" lazy-validation>
          <v-card flat class="pb-5 mb-5">
            <v-card-text class="pa-5">
              <v-row no-gutters>
                <v-col cols="12" sm="6" md="6" lg="12" xl="12">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>Nama Sekolah</v-list-item-subtitle>
                      <v-list-item-title class="subtitle-1 font-weight-bold primary--text">{{
                        pVal(instansi, 'nama') | toTitleCase
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>NPSN</v-list-item-subtitle>
                      <v-list-item-title class="black--text">{{ pVal(instansi, 'npsn') }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>Status Sekolah</v-list-item-subtitle>
                      <v-list-item-title class="black--text"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>Kota, Provinsi</v-list-item-subtitle>
                      <v-list-item-title class="black--text"
                        >{{ pVal(instansi, 'kota') }},{{ pVal(instansi, 'propinsi') }}</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>Status Aktivasi</v-list-item-subtitle>
                      <div>
                        <v-chip
                          :class="instansi.is_aktif ? 'green--text text--darken-2' : 'orange--text text--darken-2'"
                          small
                          label
                          :color="instansi.is_aktif ? 'green lighten-5' : 'orange lighten-5'"
                          ><v-icon small :color="instansi.is_aktif ? 'green' : 'orange'">{{
                            instansi.is_aktif ? 'mdi-check' : 'mdi-timelapse'
                          }}</v-icon
                          >&nbsp;{{ instansi.is_aktif ? 'Aktif' : 'Belum Aktif' }}</v-chip
                        >
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12"><v-divider></v-divider></v-col>
              </v-row>
              <br />
              <div class="text-center">
                <v-row>
                  <v-col cols="12">
                    <div class="text-center">Email Pengaktivasi</div>
                    <p class="subtitle-2 my-0 py-0 black--text"
                      >{{ instansi.email_admin ? instansi.email_admin : 'Belum Aktivasi' }}
                    </p>
                  </v-col>
                  <v-col cols="12">
                    <div class="text-center">Token</div>
                    <p class="title my-0 py-0">{{ pVal(instansi, 'token') }} </p>
                  </v-col>
                  <v-col cols="12">
                    <div class="text-center">URL Aktivasi</div>
                    <p class="title my-0 py-0 blue--text" v-if="instansi.kode_aktivasi"
                      >{{ this.$consts.SIM }} /#/aktivasi-instansi?kode_aktivasi= {{ instansi.kode_aktivasi }}</p
                    >
                    <p class="title my-0 py-0 error--text" v-else>Belum melakukan aktivasi</p>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
      <v-col cols="12" sm="12" md="8"> </v-col>
    </v-row>
  </m-dialog>
</template>

<script>
import ChangeCoordinate from '../components/PilihMarker'
export default {
  $_veeValidate: {
    validator: 'new',
  },
  components: { ChangeCoordinate },

  mounted() {
    // this.load();
  },

  data() {
    return {
      instansi: null,
      defModul: {
        nama: '',
        mAlamat: {
          id: 0,
          keterangan: 'Lain-Lain',
        },
      },
    }
  },

  computed: {},

  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.instansi = obj ? { ...obj } : { ...this.defModul }
      this.step = 1
      this.konfirmasi = null
      let x = this.$refs.aktivasiDlg.open()
      this.$validator.reset()
      return x
    },
    // eslint-disable-next-line
    // load wordpress_id
  },
}
</script>
