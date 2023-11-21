<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12">
        <m-alert show :info="alert.ajuan.list.deskripsi" closable></m-alert>
      </v-col>
      <v-col cols="12" class="mb-12">
        <m-card-list
          title="Daftar Ajuan"
          search
          id-key
          addText="Ajuan"
          addHint="Tambah Ajuan"
          filter
          refresh
          @refresh="load"
          :items="items"
          :variablePencarian="keywords"
          footerLabel="Ajuan"
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
                <v-col cols="1" lg="1" md="1" sm="1" align="right" v-if="$vuetify.breakpoint.smAndUp">
                  <v-avatar size="60" color="secondary">
                    <v-img :src="item.foto"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="10" lg="10" md="10" sm="10">
                  <v-row>
                    <v-col class="py-0" cols="12" sm="4" md="4" lg="4">
                      <p class="caption mb-0 grey--text">Nama</p>
                      <p class="subtitle-1 font-weight-bold primary--text my-0 py-0">
                        {{ pVal(item, 'nama') | toTitleCase }}
                      </p>

                      <p class="caption my-0 py-0 align-left">NISN. {{ pVal(item, 'nisn') }}</p>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="4" md="4" lg="4">
                      <p class="caption mb-0 grey--text ">Tanggal Ajuan</p>
                      <p class="subtitle-1 my-0 py-0">{{ pVal(item, 'created_at') | toSD }}</p>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="4" md="4" lg="4">
                      <p class="caption mb-0 grey--text align-left">Status</p>
                      <v-chip outlined :color="$ajuan.statusColor(item.status.id)">
                        {{ pVal(item.status, 'keterangan') | toTitleCase }}
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col class="py-0" cols="2" sm="1" md="1" lg="1">
                  <p class="caption mb-0 grey--text align-left">
                    Aksi
                  </p>
                  <m-menu right class="clearfix" style="float:right" :items="more_menu" :object="item" />
                </v-col>
              </v-row>
            </v-container>
            <v-divider class="my-3" />
          </template>
        </m-card-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ALERT_INFO } from '@/const'

export default {
  components: {},
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
        {
          label: 'Nomor Induk',
          value: 'nomor_induk',
        },
      ],
      page: null,
      cp: 1,
      more_menu: [
        // eslint-disable-next-line
        {
          title: 'Detail Ajuan',
          click: (i, o) =>
            this.$router.push({
              name: 'ajuan.detail',
              params: {
                sekolah_id: o.sekolah_id,
                ajuan_id: o.id,
              },
            }),
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
        .dispatch('ajuan/get', {
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
  },
}
</script>
