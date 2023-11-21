<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12" class="mb-12">
        <m-card-list
          title="Daftar Instansi"
          search
          id-key
          refresh
          @refresh="load"
          :items="items"
          :variablePencarian="keywords"
          footerLabel="Instansi"
          @search="
            (search) => {
              textSearch = search
              pencarian()
            }
          "
          :page="page"
          @change:page="
            (pg) => {
              cp = pg
              load()
            }
          "
          footer
        >
          <template v-slot:items="{ item }">
            <v-container>
              <v-row class="">
                <v-col cols="1" lg="1" md="1" sm="2" v-if="$vuetify.breakpoint.smAndUp">
                  <v-avatar size="80">
                    <img src="https://cdn.siap.id/s3/siap_belajar/sim/berhasil.png" alt />
                  </v-avatar>
                </v-col>
                <v-col cols="10" lg="10" md="10" sm="10">
                  <v-row>
                    <v-col class="py-0" cols="12" sm="5" md="5" lg="5">
                      <p class="subtitle-1 font-weight-bold primary--text my-0 py-0">
                        {{ pVal(item, 'nama') }}
                      </p>
                      <p class="caption my-0 py-0 black--text align-left"> NPSN. {{ pVal(item, 'npsn') }} </p>
                      <p class="caption my-0 py-0 black--text align-left">
                        <v-icon small>mdi-google-maps</v-icon> {{ pVal(item, 'kota') }},{{ pVal(item, 'propinsi') }}
                      </p>
                    </v-col>

                    <v-col class="py-0" cols="12" sm="2" md="2" lg="2">
                      <p class="caption my-0 py-0 grey--text">
                        Status
                      </p>
                      <p class="caption my-0 py-0 black--text align-left"
                        ><v-chip
                          :class="item.is_aktif ? 'green--text text--darken-2' : 'orange--text text--darken-2'"
                          small
                          label
                          :color="item.is_aktif ? 'green lighten-5' : 'orange lighten-5'"
                          ><v-icon small :color="item.is_aktif ? 'green' : 'orange'">{{
                            item.is_aktif ? 'mdi-check' : 'mdi-timelapse'
                          }}</v-icon
                          >&nbsp;{{ item.is_aktif ? 'Aktif' : 'Belum Aktif' }}</v-chip
                        >
                      </p>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="5" md="5" lg="5">
                      <p class="caption my-0 py-0 grey--text">
                        URL Aktivasi
                      </p>
                      <p class="subtitle-2 my-0 py-0 blue--text" v-if="item.kode_aktivasi"
                        >{{ $consts.SIM }}/#/aktivasi-instansi?kode_aktivasi={{ item.kode_aktivasi }}
                      </p>
                      <p class="error--text my-0 py-0" v-else>Belum melakukan aktivasi</p>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="1" md="1" lg="1" class="align-self-center">
                  <m-menu class="clearfix" style="float:right" :items="more_menu" :object="item" />
                </v-col>
              </v-row>
            </v-container>
            <v-divider />
          </template>
        </m-card-list>
      </v-col>
      <AktivasiDlg ref="aktivasiDlg" />
    </v-row>
  </v-container>
</template>

<script>
import AktivasiDlg from '../components/DetailAktivasi.vue'

export default {
  components: {
    AktivasiDlg,
  },
  data() {
    return {
      instansi: {},
      items: [],
      sekolahPPDB: [],
      current_page: 1,
      hsidebar: false,
      page: null,
      cp: 1,
      dialog: true,
      textSearch: '',
      paging: 6,
      page_key: 0,
      keywords: [
        {
          label: 'Nama',
          value: 's',
        },
      ],
      more_menu: [
        // eslint-disable-next-line
        {
          title: 'Detail',
          click: (i, o) => this.detail(o),
        },
        {
          title: 'Reset Aktivasi',
          click: (i, o) => this.reset(o),
        },
      ],
    }
  },
  computed: {
    headers() {
      const a = [
        { text: '', align: 'left', value: '' },
        { text: '', align: 'left', value: '' },
        { text: '', align: 'left', value: '' },
        { text: '', align: 'left', value: '' },
        { text: '', sortable: false },
      ]
      return a
    },
  },
  activated() {
    this.load()
  },
  methods: {
    load() {
      var params = {
        page: this.cp,
      }
      if (this.textSearch) {
        this.cp = 1
        params[this.textSearch.param] = this.textSearch.s
      }
      return this.$store
        .dispatch('instansi/getKelola', { params })
        .then((res) => {
          this.page = res
          this.items = res.data
        })
        .catch((e) => e)
    },
    detail(obj) {
      this.$refs.aktivasiDlg.open(obj).then(() => {
        this.load()
      })
    },
    reset(item) {
      this.$confirm(
        `Apakah Anda yakin akan <strong>Mereset Aktivasi</strong> instansi berikut ?<br>
        <div class="mt-2 title grow text-center primary--text">
          ${item.nama}<br>
        </div>
        <br>
        <p class='caption error--text'>*Jika Anda pilih Ya, maka instansi dianggap belum melakukan aktivasi instansi</p>`,
        {
          cancelOnly: item.laporan_accepted_count > 0 ? true : false,
        }
      )
        .then(() => {
          this.$store
            .dispatch('instansi/resetAktivasi', item)
            .then(() => {
              this.$info('Reset aktivasi sekolah ' + item.nama + ' berhasil')
              this.load()
            })
            .catch((e) => e)
        })
        .catch((e) => e)
    },
    pencarian() {
      this.cp = 1
      this.current_page = 1
      this.load()
    },
  },
  watch: {},
}
</script>
