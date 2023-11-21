<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12">
        <m-alert show :title="alert.kelas.list.judul" :info="alert.kelas.list.deskripsi" closable></m-alert>
      </v-col>
      <v-col cols="12" class="mb-12">
        <m-card-list
          title="Daftar Kelas"
          search
          id-key
          :add="isCan('kelas')"
          addText="Kelas"
          addHint="Tambah Kelas"
          filter
          refresh
          @refresh="load"
          :items="items"
          :variablePencarian="keywords"
          footerLabel="Kelas Mata Pelajaran"
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
          @add="add"
          footer
        >
          <template v-slot:action>
            <div>portl</div>
          </template>
          <template v-slot:items="{ props, item }">
            <v-container>
              <v-row class="">
                <v-col cols="1" lg="1" md="1" sm="1" v-if="$vuetify.breakpoint.smAndUp">
                  <v-avatar size="40" color="secondary">
                    <v-icon color="white">mdi-google-classroom</v-icon>
                  </v-avatar>
                </v-col>
                <v-col cols="10" lg="10" md="10" sm="10">
                  <v-row>
                    <v-col class="py-0" cols="12" sm="4" md="4" lg="4">
                      <p class="caption my-0 py-1 grey--text align-left">
                        Kelas
                      </p>
                      <p class="subtitle-1 font-weight-bold primary--text my-0 py-0 mt-n2">
                        <router-link
                          class="ok"
                          :to="{ name: 'kelas.detail', params: { sekolah_id: item.sekolah_id, kelas_id: item.id } }"
                          >{{ pVal(item, 'nama') }}</router-link
                        >
                      </p>
                      <p class="caption my-0 py-0 grey--text align-left">
                        Mata Pelajaran
                      </p>
                      <p class="subtitle-2 my-0 py-1 mt-n2">
                        {{ pVal(item.mapel, 'keterangan') }}
                      </p>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="2" md="2" lg="2">
                      <p class="caption my-0 py-0 grey--text align-left">
                        Tingkat
                      </p>
                      <p class="subtitle-2 my-0 py-1 mt-n2">
                        {{ pVal(item.tingkat, 'keterangan2') }}
                      </p>
                    </v-col>

                    <v-col class="py-0" cols="12" sm="4" md="4" lg="4">
                      <p class="caption my-0 py-0 grey--text">
                        Pelaksanaan
                      </p>
                      <p class="subtitle-2 my-0 py-0">{{ pVal(item, 'tanggal_mulai') | toDT }} </p>
                      <p class="caption my-0 py-0 grey--text">s/d</p>
                      <p class="subtitle-2 my-0 py-0">{{ pVal(item, 'tanggal_selesai') | toDT }}</p>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="2" md="2" lg="2">
                      <p class="caption my-0 py-0 grey--text">Tautan</p>
                      <m-button
                        :large="false"
                        color="success"
                        text="Kelas"
                        icon="mdi-link"
                        action="toLD"
                        @toLD="toLD(item)"
                      ></m-button>
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
      <ChangeDlg ref="dlg" />
    </v-row>
  </v-container>
</template>

<script>
import { isCan } from '@/tools'
import { ALERT_INFO, PASSPORT } from '@/const'
import ChangeDlg from '../../kelas/components/Form.vue'

export default {
  components: {
    ChangeDlg,
    // DetailDlg
  },
  data() {
    return {
      alert: ALERT_INFO,
      items: [],
      itemMapels: [],
      peran: null,
      textSearch: null,
      keywords: [
        {
          label: 'Kelas',
          value: 's',
        },
      ],
      page: null,
      cp: 1,
      more_menu: [
        // eslint-disable-next-line
        {
          title: 'Detail',
          click: (i, o) =>
            this.$router.push({
              name: 'kelas.detail',
              params: {
                sekolah_id: o.sekolah_id,
                kelas_id: o.id,
              },
            }),
        },
        {
          title: 'Ubah',
          click: (i, o) => this.edit(o),
          check: () => isCan('kelas'),
        },
        {
          title: 'Hapus',
          click: (i, o) => this.hapus(o),
          check: () => isCan('kelas'),
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
        params[this.textSearch.param] = this.textSearch.s
      }
      return this.$store
        .dispatch('kelas/get', {
          sekolah_id: this.instansi_id,
          params: params,
        })
        .then((res) => {
          this.page = res
          this.items = res.data
        })
        .catch((e) => e)
    },
    syncKelas(val) {
      this.$store
        .dispatch('kelas/syncCourse', {
          sekolah_id: this.instansi_id,
          kelas_id: val.id,
        })
        .then((res) => {
          if (res) {
            this.$info('Singkronisasi Sukses')
          }
          return this.$store.dispatch('kelas/syncModul', {
            sekolah_id: this.instansi_id,
            kelas_id: val.id,
          })
        })
        .catch((e) => e)
    },
    filter(data) {
      this.peran = data.peran
      this.load()
    },
    add() {
      this.$refs.dlg.open().then(res => {
        this.load()
        this.$router.push({ name: 'kelas.detail', params: { kelas_id: res.data.id } })
      })
    },
    edit(item) {
      this.$refs.dlg.open(item).then(res => {
        this.load()
        this.$router.push({ name: 'kelas.detail', params: { kelas_id: res.data.id } })
      })
    },

    hapus(item) {
      this.$confirm(
        `Apakah Anda yakin akan menghapus kelas mata pelajaran ini ?<br>
        <div class="mt-2 title grow text-center">
          ${item.nama}<br>
        </div>`,
        {
          cancelOnly: item.laporan_accepted_count > 0 ? true : false,
        }
      )
        .then(() => this.$store.dispatch('kelas/drop', item))
        .then(() => {
          this.$info('Kelas Mata Pelajaran ' + item.nama + ' berhasil dihapus')
        })
        .then(() => this.load())
        .catch((e) => e)
    },
    toLD(val) {
      var courseWindow = window.open('', '_blank')
      return this.$store
        .dispatch('kelas/getKelas', {
          sekolah_id: val.sekolah_id,
          kelas_id: val.id,
        })
        .then((res) => {
          courseWindow.location.href = PASSPORT + res.url
        })
        .catch((e) => e)
    },
  },
  watch: {},
}
</script>
