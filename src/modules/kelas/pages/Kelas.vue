<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12">
        <m-alert show :title="alert.kelasku.list.judul" :info="alert.kelasku.list.deskripsi" closable></m-alert>
      </v-col>
      <v-col cols="12">
        <m-card-list
          title="Daftar Kelas Anda"
          search
          id-key
          filter
          @refresh="load"
          :items="items"
          :variablePencarian="keywords"
          footerLabel="Kelas"
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
                <v-col cols="3" lg="1" md="1" sm="1">
                  <v-avatar width="25" :size="45" color="grey lighten-4">
                    <v-img :src="item.foto ? item.foto.url.thumbnail : 'img/avatar-default.jpg'" alt="avatar" />
                  </v-avatar>
                </v-col>
                <v-col cols="7" lg="10" md="10" sm="10">
                  <v-row>
                    <v-col class="py-0" cols="12" md="4" sm="4">
                      <p class="caption my-0 py-1 grey--text align-left">
                        Kelas Mata Pelajaran
                      </p>
                      <p class="subtitle-1 font-weight-bold primary--text my-0 py-0 mt-n2">
                        {{ pVal(item, 'nama') | toTitleCase }}
                      </p>
                    </v-col>
                    <v-col class="py-0" cols="12" md="4" sm="4">
                      <p class="caption my-1 py-0 grey--text">
                        Rombongan Belajar
                      </p>
                      <p class="subtitle-1 my-0 py-0 mt-n2">
                        <v-chip
                          outlined
                          small
                          color="primary"
                          class="ma-1"
                          v-for="item in item.rombel"
                          :key="item.id"
                          >{{ pVal(item, 'nama') }}</v-chip
                        >
                      </p>
                    </v-col>

                    <v-col class="py-0" cols="12" md="4" sm="4"
                      ><p class="caption my-1 py-0 grey--text">Tautan</p>
                      <m-button
                        :large="false"
                        color="success"
                        text="Kelas"
                        icon="mdi-link"
                        action="toLD"
                        @toLD="toLD(item.link_wp)"
                      ></m-button>
                    </v-col>
                  </v-row>
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
      more_menu: [],
    }
  },
  computed: {
    headers() {
      const a = [
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
        .dispatch('kelas/getKelasku', {
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
      this.peran = data.peran
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

    toLD(url) {
      window.open(PASSPORT + url, '_blank')
    },

    hapus(item) {
      this.$confirm(
        `Apakah Anda yakin akan menghapus kelas mata pelajaran ini ?<br>
        <div class="mt-2 title grow text-center">
          ${item.name}<br>
        </div>`,
        {
          cancelOnly: item.laporan_accepted_count > 0 ? true : false,
        }
      )
        .then(() => this.$store.dispatch('kelas/drop', item))
        .then(() => {
          this.$info('Kelas Mata Pelajaran ' + item.name + ' berhasil dihapus')
        })
        .then(() => this.load())
        .catch((e) => e)
    },
  },
  watch: {},
}
</script>
