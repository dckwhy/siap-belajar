<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12">
        <m-alert show :title="alert.akses.list.judul" :info="alert.akses.list.deskripsi" closable></m-alert>
      </v-col>
      <v-col cols="12" class="mb-12">
        <m-card-list
          title="Hak Akses"
          :add="isCan('peran')"
          search
          id-key
          refresh
          @refresh="load"
          :items="items"
          :variablePencarian="keywords"
          footerLabel="Hak Akses"
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
              <v-row class="">
                <v-col cols="10" sm="10" md="10" lg="10">
                  <p class="caption my-0 py-1 grey--text align-left">
                    Akses
                  </p>
                  <p class="subtitle-1 font-weight-bold primary--text my-0 py-0 mt-n2">
                    {{ pVal(item, 'keterangan') }}
                  </p>
                </v-col>
                <v-col cols="2" sm="2" md="2" lg="2">
                  <p class="caption my-0 py-0 grey--text align-left">
                    Aksi
                  </p>
                  <m-menu right class="clearfix" style="float:right" :items="more_menu" :object="item" />
                  <!-- <v-icon v-else>mdi-block-helper</v-icon> -->
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
import ChangeDlg from '../../akses/components/Form.vue'
import FilterModul from '@/filter/FilterModul.vue'

export default {
  components: {
    ChangeDlg,
    FilterModul,
  },
  data() {
    return {
      alert: ALERT_INFO,
      items: [],
      itemMapels: [],
      filtered: {
        tingkat: null,
        mapel: null,
        status: null,
      },
      textSearch: null,
      keywords: [
        {
          label: 'Akses',
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
          check: () => isCan('peran'),
        },
        {
          title: 'Hapus',
          click: (i, o) => this.delete(o),
          check: () => isCan('peran'),
          // check: (i, o) => o.editable,
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
        .dispatch('akses/get', {
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
      this.filtered = data
      this.load()
    },
    course(val) {
      if (val.link_moodle) {
        window.open(val.link_moodle, '_blank')
      } else {
        return this.$store
          .dispatch('akses/sync', {
            sekolah_id: this.instansi_id,
            modul_id: val.id,
          })
          .then((res) => {
            window.open(res.link_moodle, '_blank')
          })
          .catch((e) => e)
      }
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
    delete(item) {
      this.$confirm(
        `Apakah Anda yakin akan menghapus akses ini ?<br>
        <div class="mt-2 title grow text-center">
          ${item.nama}<br>
        </div>`
      )
        .then(() =>
          this.$store.dispatch('akses/drop', {
            sekolah_id: this.instansi_id,
            obj: item,
          })
        )
        .then(() => {
          this.$info('Akses ' + item.nama + ' berhasil dihapus')
        })
        .then(() => this.load())
        .catch((e) => e)
    },
  },
  watch: {},
}
</script>
