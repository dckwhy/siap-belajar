<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12">
        <m-alert show :title="alert.siswappdb.list.judul" :info="alert.siswappdb.list.deskripsi" closable>
          <template
            ><span class="blue--text"
              ><b>Info (Data Siswa)</b> pada menu ini Anda dapat melakukan pengelolaan data ajuan peserta PPDB.
              <br />Anda juga dapat menggunakan fitur unggah data &nbsp;<m-button
                fab
                x-small
                icon="mdi-dots-vertical"
              ></m-button>
              untuk set masal nilai rapor siswa
            </span></template
          >
        </m-alert>
      </v-col>
      <v-col cols="12" class="mb-5">
        <m-card-list
          class="mb-5"
          title="Kelola Data Siswa"
          search
          id-key
          :add="isCan('usermeta') && !current_instansi.kode_jateng"
          more
          @upload="upload"
          :variablePencarian="keywords"
          filter
          refresh
          @refresh="load"
          :items="items"
          footerLabel="Siswa"
          @add="add"
          @search="
            (search) => {
              textSearch = search
              load()
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
              <v-row>
                <v-col class="py-0" cols="12" sm="4" md="4" lg="4">
                  <p class="font-weight-bold primary--text my-0 py-0" style="font-size:13pt">
                    {{ pVal(item, 'nama') }}
                  </p>

                  <p class="caption my-0 py-0 black--text align-left"> NISN. {{ pVal(item, 'nisn') }} </p>
                </v-col>
                <v-col class="py-0" cols="12" sm="3" md="3" lg="3">
                  <p class="caption my-0 py-0 black--text align-left">
                    NIK
                  </p>
                  <p class=" black--text my-0 py-0">
                    {{ pVal(item, 'nik') }}
                  </p>
                </v-col>
                <v-col class="py-0" cols="12" sm="3" md="3" lg="3">
                  <p class="caption my-0 py-0 black--text align-left">
                    Status
                  </p>
                  <v-chip outlined :color="item.status_id == 1 ? 'success' : 'error'">{{
                    item.status_id == 1 ? 'Lengkap' : 'Belum Lengkap'
                  }}</v-chip>
                </v-col>
                <v-col class="py-0" cols="12" sm="2" md="2" lg="2">
                  <p class="caption my-0 py-0 black--text align-left">
                    Aksi
                  </p>
                  <m-menu left style="float:left" :items="more_menu" :object="item" />
                </v-col>
              </v-row>
            </v-container>
            <v-divider class="my-3" />
          </template>
        </m-card-list>
      </v-col>
      <AjuanDlg ref="dlgAjuan" @load="load" />
      <ChangeDlg ref="dlg" />
      <DetailDlg ref="dlgDetail" />
      <DetailIntegrasiDlg ref="dlgIntegrasi" />
      <UploadAjuan ref="dlgUpload" />
    </v-row>
  </v-container>
</template>

<script>
import { isCan } from '@/tools'
import { ALERT_INFO, BASE_API } from '@/const'
import AjuanDlg from '../../siswappdb/components/Ajuan.vue'
import ChangeDlg from '../../siswappdb/components/Form.vue'
import DetailDlg from '../../siswappdb/components/Detail.vue'
import DetailIntegrasiDlg from '../../siswappdb/components/DetailIntegrasi.vue'
import UploadAjuan from '../../siswappdb/components/UploadAjuan.vue'
import FilterPengguna from '@/filter/FilterPengguna.vue'

export default {
  components: {
    AjuanDlg,
    ChangeDlg,
    FilterPengguna,
    DetailDlg,
    DetailIntegrasiDlg,
    UploadAjuan,
  },
  data() {
    return {
      alert: ALERT_INFO,
      items: [],
      itemMapels: [],
      itemPerans: [],
      peran: null,
      textSearch: null,
      keywords: [
        {
          label: 'Nama',
          value: 'nama',
        },
        {
          label: 'NISN',
          value: 'nisn',
        },
        {
          label: 'NIK',
          value: 'nik',
        },
      ],
      page: null,
      cp: 1,
      options: {
        title: 'Unggah Data Ajuan Siswa',
        module: 'siswappdb/importAjuan',
        category: false,
        id: 1,
      },
      more_menu: [
        {
          title: 'Detail',
          click: (i, o) => this.detail(o),
        },
        {
          title: 'Unduh Rapor',
          click: (i, o) => this.rapor(o),
        },
        {
          title: 'Ubah Data',
          click: (i, o) => this.form(o, 1),
          check: () => isCan('usermeta') && this.current_instansi.kode_jateng,
        },
        {
          title: 'Ubah',
          click: (i, o) => this.form(o, 2),
          check: () => isCan('usermeta') && !this.current_instansi.kode_jateng,
        },
      ],
    }
  },
  computed: {
    headers() {
      const a = [
        { text: '', align: 'left', value: '' },
        { text: '', align: 'left', value: '' },
        { text: '', sortable: false },
      ]
      return a
    },
    token() {
      return this.$store.getters['user/token']
    },
  },
  activated() {
    this.load()
  },
  methods: {
    load() {
      var params = {
        page: this.cp,
        peran_id: this.peran,
      }
      if (this.textSearch) {
        params[this.textSearch.param] = this.textSearch.s
      }
      return this.$store
        .dispatch('siswappdb/get', {
          sekolah_id: this.instansi_id,
          params: params,
        })
        .then((res) => {
          this.page = res
          this.items = res.data
        })
        .catch((e) => e)
    },
    filter(data) {
      this.peran = data.akses
      this.load()
    },
    add() {
      this.$refs.dlgAjuan.open().then(() => {
        this.load()
      })
    },
    form(item, pola) {
      if (pola == 1) {
        this.$refs.dlg.open(item).then(() => {
          this.load()
        })
      } else {
        this.$refs.dlgAjuan.open(item).then(() => {
          this.load()
        })
      }
    },
    detail(item) {
      if (!this.current_instansi.kode_jateng) {
        this.$refs.dlgDetail.open(item).then(() => {
          this.load()
        })
      } else {
        this.$refs.dlgIntegrasi.open(item).then(() => {
          this.load()
        })
      }
    },
    rapor(item) {
      this.$confirm(
        `Anda akan mengunduh rapor siswa berikut ?<br>
        <div class="mt-2 title grow text-center">
          ${item.nama}<br>
        </div>`,
        {
          cancelOnly: item.laporan_accepted_count > 0 ? true : false,
        }
      )
        .then(() => {
          var url = ''
          url =
            BASE_API +
            '/api/sekolah/' +
            this.instansi_id +
            '/siswa/' +
            item.id +
            '/download_nilai?access_token=' +
            this.token

          window.open(url, '_blank')
        })
        .catch((e) => e)
    },
    upload() {
      this.options.id = this.instansi_id
      this.$refs.dlgUpload
        .open(this.options)
        .then((res) => {
          this.load()
          this.$refs.dlg.resolve()
          this.$info('Data Anggota berhasil di import')
          return res
        })
        .catch((e) => e)
    },
  },
  watch: {},
}
</script>
