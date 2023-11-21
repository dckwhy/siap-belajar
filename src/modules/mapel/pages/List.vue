<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12">
        <m-alert show :title="alert.mapel.list.judul" :info="alert.mapel.list.deskripsi" closable></m-alert>
      </v-col>
      <v-col cols="12" class="mb-12">
        <m-card-list
          title="Daftar Mata Pelajaran"
          search
          id-key
          :add="isCan('mapel')"
          addText="Mata Pelajaran"
          addHint="Tambah Mata Pelajaran"
          filter
          refresh
          @refresh="load"
          :items="items"
          :variablePencarian="keywords"
          footerLabel="Mata Pelajaran"
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
          <template v-slot:items="{ props, item }">
            <v-container>
              <v-row>
                <v-col cols="1" lg="1" md="1" sm="1" v-if="$vuetify.breakpoint.smAndUp">
                  <v-avatar size="40" color="secondary">
                    <v-icon color="white">mdi-book</v-icon>
                  </v-avatar>
                </v-col>
                <v-col cols="10" lg="10" md="10" sm="10">
                  <v-row>
                    <v-col class="py-0" cols="12" md="8" sm="5">
                      <p class="caption my-0 py-0 grey--text align-left">Kelas Mata Pelajaran</p>
                      <p class="subtitle-1 font-weight-bold primary--text my-0 py-0 mt-n2">
                        {{ pVal(item, 'keterangan') | toTitleCase }}
                      </p>
                    </v-col>
                    <v-col class="py-0" cols="12" md="4" sm="5">
                      <p class="caption my-0 py-0 grey--text align-left">Tingkat</p>
                      <p class="subtitle-1 my-0 py-0 mt-n2">{{ pVal(item.tingkat, 'keterangan2') }}</p>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col lg="1" md="1" sm="1" cols="2">
                  <p class="caption my-0 py-0 grey--text align-left">
                    Aksi
                  </p>
                  <m-menu right class="clearfix" style="float:right" :items="more_menu" :object="item" />
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
import { ALERT_INFO } from '@/const'
import ChangeDlg from '../../mapel/components/Form.vue'

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
          label: 'Nama',
          value: 's',
        },
      ],
      page: null,
      cp: 1,
      more_menu: [
        // eslint-disable-next-line
        {
          title: 'Ubah',
          click: (i, o) => this.edit(o),
          check: () => isCan('mapel'),
        },
        {
          title: 'Hapus',
          click: (i, o) => this.hapus(o),
          check: () => isCan('mapel'),
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
        .dispatch('mapel/get', {
          sekolah_id: this.instansi_id,
          params: params,
        })
        .then((res) => {
          this.page = res
          this.items = res.data
        })
        .catch((e) => e)
    },
    filter() {
      this.load()
    },
    add() {
      this.$refs.dlg.open().then(() => {
        this.load()
      })
    },
    edit(item) {
      this.$refs.dlg.open(item).then(() => {
        this.load()
      })
    },
    hapus(item) {
      this.$confirm(
        `Apakah Anda yakin akan menghapus mata pelajaran ini ?<br>
        <div class="mt-2 title grow text-center">
          ${item.keterangan}<br>
        </div>`
      )
        .then(() =>
          this.$store.dispatch('mapel/drop', {
            sekolah_id: this.instansi_id,
            obj: item,
          })
        )
        .then(() => {
          this.$info('Mata Pelajaran ' + item.keterangan + ' berhasil dihapus')
        })
        .then(() => this.load())
        .catch((e) => e)
    },
  },
  watch: {},
}
</script>
