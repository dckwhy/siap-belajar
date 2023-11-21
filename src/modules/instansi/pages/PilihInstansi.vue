<template>
  <v-container grid-list-xl class="pa-0">
    <div
      class="background mb-2 ma-0 mx-3 pa-0 rounded-b-xl"
      style="position:fixed; bottom:10px; right:0; left:0px; z-index: 7; height:30px;"
    ></div>

    <v-row align="center" justify="center">
      <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="text-center" align="center" justify="center">
        <v-card
          class="px-0 mb-10 elevation-0"
          style="margin-top:150px; padding-top:60px; z-index:0"
          v-if="$vuetify.breakpoint.mdAndUp"
        >
          <v-card-text class="py-0">
            <v-row align="center" justify="center" class="mb-5">
              <v-col
                cols="12"
                sm="5"
                md="5"
                lg="5"
                xl="5"
                class="text-center px-5 my-0 pa-0"
                style="position:relative;"
              >
                <v-card
                  class="pa-5 mb-0 mt-5 rounded-lg"
                  style="position:absolute;top:-172px;z-index:1
                  webkit-box-shadow: 0px 0px 7px 5px rgba(51, 51, 51, 0.178);"
                >
                  <p class="font-weight-bold primary--text mb-3 mt-3" style="font-size:30px;">
                    Hi, <span class="orange--text">{{ current_user.name }}</span>
                  </p>
                  <p style="word-break: break-word;">
                    Selamat Datang di Sistem Informasi Manajemen <b>Siap Belajar</b>, Silakan pilih instansi Anda
                  </p>
                  <v-text-field
                    outlined
                    class="mt-2 mx-4"
                    dense
                    autofocus
                    v-model="textSearch"
                    placeholder="Cari Sekolah"
                    hint
                    clearable
                    append-icon="mdi-magnify"
                    @click:append="pencarian(textSearch)"
                    @keyup.enter="pencarian(textSearch)"
                    @click:clear="hapusPencarian()"
                    persistent-hint
                  ></v-text-field>
                  <m-button
                    v-if="current_user.is_super_admin"
                    class="pa-5"
                    text="Kelola Instansi"
                    icon="mdi-cog"
                    action="toKelola"
                    @toKelola="toKelola"
                  ></m-button>
                </v-card>
              </v-col>
            </v-row>
            <v-row row class="py-0" style="margin-top:10%">
              <v-col cols="12" sm="6" md="3" lg="3" xl="3" v-for="item in sekolahPPDB" :key="item.index">
                <BlockCard
                  :item="item"
                  :title="item.nama_sekolah"
                  :height="185"
                  :is_overlay="true"
                  :logo="item.logo"
                  :cover="item.cover"
                  @aktivasi="aktivasi(item)"
                  color="grey"
                />
              </v-col>
              <v-col cols="12" sm="6" md="3" lg="3" xl="3" v-for="item in items" :key="item.id">
                <BlockCard
                  :item="item"
                  :title="item.nama"
                  :height="185"
                  :jenjang="item.jenjang.keterangan"
                  :logo="item.logo"
                  :cover="item.cover"
                  color="primary"
                  @pilih="pilihInstansi(item)"
                  @cetak="cetak"
                  to
                />
              </v-col>
            </v-row>
            <v-row wrap class="pb-0" v-if="page && page.last_page > 1">
              <v-col cols="5" sm="2" md="2" lg="2" class="text-left" align="center" justify="center">
                <p class="caption font-weight-bold">{{ page.total }} &nbsp;Instansi</p>
              </v-col>
              <v-col cols="1" sm="8" md="8" lg="8" v-if="$vuetify.breakpoint.smAndUp" class="text-center">
                <v-pagination
                  v-if="page.total"
                  :key="page_key"
                  v-model="current_page"
                  :length="page.last_page"
                  :total-visible="7"
                  @input="change"
                ></v-pagination>
              </v-col>
              <v-col cols="6" sm="2" md="2" lg="2" v-if="page.from" class="text-right">
                <p class="caption font-weight-bold">{{ page.from }} - {{ page.to }} dari {{ page.total }}</p>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions></v-card-actions>
        </v-card>
        <!-- -------------mobile -->
        <v-card class="px-0 mb-10 elevation-0" style="z-index:0" v-if="$vuetify.breakpoint.smAndDown">
          <v-card-text class="py-0">
            <v-row align="center" justify="center">
              <v-col cols="12" sm="5" md="5" lg="5" xl="5" class="text-center px-5 my-0 pa-0">
                <v-card flat class="pa-5 mb-0 mt-5 rounded-lg">
                  <p class="font-weight-bold primary--text mb-3 mt-3" style="font-size:30px;">
                    Hi, <span class="orange--text">{{ current_user.name }}</span>
                  </p>
                  <p style="word-break: break-word;">
                    Selamat Datang di Sistem Informasi Manajemen <b>Siap Belajar</b>, Silakan pilih instansi Anda
                  </p>
                  <v-text-field
                    outlined
                    class="mt-2 mx-4"
                    dense
                    autofocus
                    v-model="textSearch"
                    placeholder="Cari Sekolah"
                    hint
                    clearable
                    append-icon="mdi-magnify"
                    @click:append="pencarian(textSearch)"
                    @keyup.enter="pencarian(textSearch)"
                    @click:clear="hapusPencarian()"
                    persistent-hint
                  ></v-text-field>
                </v-card>
              </v-col>
            </v-row>
            <v-row row class="py-0">
              <v-col cols="12" sm="6" md="3" lg="3" xl="3" v-for="item in sekolahPPDB" :key="item.index">
                <BlockCard
                  :item="item"
                  :title="item.nama_sekolah"
                  :height="185"
                  :is_overlay="true"
                  :logo="item.logo"
                  :cover="item.cover"
                  @aktivasi="aktivasi(item)"
                  color="grey"
                />
              </v-col>
              <v-col cols="12" sm="6" md="3" lg="3" xl="3" v-for="item in items" :key="item.id">
                <BlockCard
                  :item="item"
                  :title="item.nama"
                  :height="185"
                  :jenjang="item.jenjang.keterangan"
                  :logo="item.logo"
                  :cover="item.cover"
                  color="primary"
                  @pilih="pilihInstansi(item)"
                  @cetak="cetak"
                  to
                />
              </v-col>
            </v-row>

            <v-row wrap class="pb-0" v-if="page && page.last_page > 1">
              <!-- <v-col :cols="$vuetify.breakpoint.smAndUp ? 2 : 4" class="text-left" align="center" justify="center"> -->
              <v-col cols="5" sm="2" md="2" lg="2" class="text-left" align="center" justify="center">
                <p class="caption font-weight-bold">{{ page.total }} &nbsp;Instansi</p>
              </v-col>

              <v-col cols="6" sm="2" md="2" lg="2" v-if="page.from" class="text-right">
                <p class="caption font-weight-bold">{{ page.from }} - {{ page.to }} dari {{ page.total }}</p>
              </v-col>
              <v-col cols="12" sm="2" md="2" lg="2" v-if="$vuetify.breakpoint.smAndDown" class="text-center">
                <v-pagination
                  v-if="page.total"
                  :key="page_key"
                  v-model="current_page"
                  :length="page.last_page"
                  :total-visible="7"
                  @input="change"
                ></v-pagination>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions></v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BlockCard from '@/components/BlockCard'
import Form from '../components/Form'

export default {
  components: {
    BlockCard,
    Form,
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
    }
  },
  activated() {
    this.dialog = true
  },
  mounted() {
    this.current_page = 1
    this.load(this.current_page)
    this.loadSekolahPPDB()
  },
  methods: {
    add() {
      this.$refs.dlg.open().then(() => {
        this.load()
      })
    },
    pencarian(s) {
      this.textSearch = s
      this.cp = 1
      this.current_page = 1
      this.load(1)
    },
    hapusPencarian() {
      this.textSearch = null
      this.load(1)
    },
    aktivasi(item) {
      // this.$router.push({ name: 'instansi.aktivasi', params: { kode_aktivasi: 123 } })
      // window.location.href = `${API}/#/aktivasi?kode_aktivasi=` + item.token
      this.$router.push({
        name: 'aktivasi.ppdb',
        params: { kode_aktivasi: item.token },
      })
    },
    load(current_page) {
      var paging = this.$vuetify.breakpoint.lgAndUp ? 8 : 6
      return this.$store
        .dispatch('instansi/get', { page: current_page, pagination: paging, s: this.textSearch })
        .then((res) => {
          this.page = res
          this.items = res.data

          if (res.data.length == 1 && !this.current_user.is_super_admin) {
            this.pilihInstansi(res.data[0])
          }
        })
        .catch((e) => e)
    },
    loadSekolahPPDB() {
      return this.$store
        .dispatch('instansi/getSekolahPPDB')
        .then((res) => {
          this.sekolahPPDB = res.data
        })
        .catch((e) => e)
    },
    // eslint-disable-next-line
    cetak(val) {
      this.loading = true
      return this.$store
        .dispatch('instansi/cetakAkun', val.url_unduh)
        .then((res) => {
          if (res) {
            this.loading = false
            this.$info('Proses Cetak Sertifikat berhasil.')
          }
        })
        .catch(() => {
          this.loading = false
          this.$error('Proses Cetak Sertifikat gagal.')
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
          return this.$store.dispatch('instansi/create', this.instansi)
        })
        .then((res) => {
          this.instansi.nama = ''
          this.pilihInstansi(res.data)
          this.$refs.dlg.resolve()
          return res
        })
        .catch((e) => e)
    },
    change() {
      this.load(this.current_page)
    },
    pilihInstansi(item) {
      return this.$store
        .dispatch('instansi/switchInstansi', item.id)
        .then(() => {
          this.$store.commit('main/setLDrawer', true)
          return this.$router.push({
            name: 'instansi.detail',
            params: { instansi_id: item.id },
          })
        })
        .catch((e) => e)
    },
    toKelola() {
      this.$router.push({
        name: 'instansi.kelola',
      })
    },
  },
  watch: {
    page(n) {
      if (n) {
        this.current_page = n.current_page
        this.jump_page = n.current_page
        this.page_key = Math.random()
      }
    },
    hsidebar(n) {
      this.$store.commit('main/setHsidebar', n)
    },
  },
  computed: {
    is_disabled() {
      return this.CONFIG.SINGKRONISASI == 'true' ? true : false
    },
  },
}
</script>

<style></style>
