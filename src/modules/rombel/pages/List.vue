<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12">
        <m-alert show :title="alert.rombel.list.judul" :info="alert.rombel.list.deskripsi" closable></m-alert>
      </v-col>
      <v-col cols="12" class="mb-12">
        <m-card-list
          title="Daftar Rombongan Belajar"
          search
          id-key
          :add="isCan('rombel')"
          addText="Rombel"
          addHint="Tambah Rombongan Belajar"
          filter
          refresh
          @refresh="load"
          :variablePencarian="keywords"
          :items="items"
          footerLabel="Rombongan Belajar"
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
          <template v-slot:items="{ item }">
            <v-container>
              <v-row class="pa-0 ma-0">
                <v-col cols="1" lg="1" md="1" sm="1" v-if="$vuetify.breakpoint.smAndUp">
                  <v-avatar size="40" color="secondary">
                    <v-icon color="white">mdi-account-group</v-icon>
                  </v-avatar>
                </v-col>
                <v-col cols="7" lg="10" md="10" sm="10">
                  <v-row class="py-0 my-0">
                    <v-col class="py-0" cols="12" sm="8" md="8" lg="8">
                      <p class="caption my-0 py-0 grey--text">Nama Rombongan Belajar</p>
                      <p class="subtitle-1 font-weight-bold primary--text mb-0 mt-1">
                        <router-link
                          class="ok"
                          :to="{ name: 'rombel.detail', params: { sekolah_id: item.sekolah_id, rombel_id: item.id } }"
                          >{{ pVal(item, 'nama') }}</router-link
                        >
                      </p>
                    </v-col>
                    <v-col cols="12" sm="2" md="2" lg="2" class="py-0">
                      <p class="caption my-1 py-0 grey--text">Tingkat</p>
                      {{ pVal(item.tingkat, 'keterangan2') }}
                    </v-col>
                    <v-col cols="12" sm="2" md="2" lg="2" class="py-0">
                      <p class="caption my-1 py-0 grey--text">Aksi</p>
                      <m-menu left style="float:right" :items="more_menu" :object="item" />
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
import { isCan } from '@/tools'
import { ALERT_INFO } from '@/const'
import ChangeDlg from '../../rombel/components/Form.vue'
import FilterRombel from '@/filter/FilterRombel.vue'

export default {
  components: {
    ChangeDlg,
    FilterRombel,
  },
  data() {
    return {
      alert: ALERT_INFO,
      items: [],
      itemMapels: [],
      filteredData: {
        tahun: null,
        semester: null,
        tingkat: null,
        status: null,
      },
      textSearch: null,
      keywords: [
        {
          label: 'Nama',
          value: 's',
        },
        {
          label: 'Tingkat',
          value: 'tingkat',
        },
      ],
      page: null,
      cp: 1,
      more_menu: [
        {
          title: 'Detail',
          click: (i, o) =>
            this.$router.push({
              name: 'rombel.detail',
              params: {
                rombel_id: o.id,
              },
            }),
        },
        {
          title: 'Ubah',
          click: (i, o) => this.edit(o),
          check: () => isCan('rombel'),
        },
        {
          title: 'Hapus',
          click: (i, o) => this.hapus(o),
          check: () => isCan('rombel'),
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
      return this.$store
        .dispatch('rombel/get', {
          sekolah_id: this.instansi_id,
          params: {
            page: this.cp,
            s: this.textSearch,
            tahun: this.filteredData.tahun,
            semester: this.filteredData.semester,
            tingkat: this.filteredData.tingkat,
            status: this.filteredData.status,
          },
        })
        .then((res) => {
          this.page = res
          this.items = res.data
        })
        .catch((e) => e)
    },
    filter(data) {
      this.filteredData = data
      this.load()
    },
    add() {
      this.$refs.dlg.open().then(res => {
        this.load()
        this.$router.push({ name: 'rombel.detail', params: { rombel_id: res.data.id } })
      })
    },
    edit(item) {
      this.$refs.dlg.open(item).then(res => {
        this.load()
        this.$router.push({ name: 'rombel.detail', params: { rombel_id: res.data.id } })
      })
    },
    hapus(item) {
      this.$confirm(
        `Apakah Anda yakin akan menghapus rombel ?<br>
        <div class="mt-2 title grow text-center">
          ${item.nama}<br>
        </div>`,
        {
          cancelOnly: item.laporan_accepted_count > 0 ? true : false,
        }
      )
        .then(() => this.$store.dispatch('rombel/drop', item))
        .then(() => {
          this.$info('User ' + item.nama + ' berhasil dihapus')
        })
        .then(() => this.load())
        .catch((e) => e)
    },
  },
  watch: {},
}
</script>
