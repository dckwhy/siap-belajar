<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12">
        <m-alert show :title="alert.pengguna.list.judul" :info="alert.pengguna.list.deskripsi" closable></m-alert>
      </v-col>
      <v-col cols="12" class="mb-12">
        <m-card-list
          title="Kandidat Siswa"
          search
          id-key
          filter
          @refresh="load"
          :items="items"
          footerLabel="Pengguna"
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
                <v-col cols="12" md="1" lg="1" v-if="$vuetify.breakpoint.smAndUp">
                  <v-icon x-large color="secondary">mdi-account-circle</v-icon>
                </v-col>
                <v-col cols="12" sm="12" md="11" lg="11">
                  <v-row>
                    <v-col class="py-0" cols="12" sm="4" md="4" lg="4">
                      <p class="caption my-0 py-0 grey--text align-left">
                        Nama
                      </p>
                      <p class="font-weight-bold primary--text my-0 py-0" style="font-size:13pt">
                        {{ pVal(item, 'nama') }}
                      </p>
                      <p class="caption black--text my-0 py-0">
                        {{ pVal(item, 'email') }}
                      </p>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="3" md="3" lg="3">
                      <p class="caption my-0 py-0 grey--text align-left">
                        Token
                      </p>
                      <p class="title black--text my-0 py-0">
                        {{ pVal(item, 'token') }}
                      </p>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="3" md="3" lg="3">
                      <p class="caption my-0 py-0 grey--text align-left">
                        Kode Aktivasi
                      </p>
                      <p class="title black--text my-0 py-0">
                        {{ pVal(item, 'kode_aktivasi') }}
                      </p>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="2" md="2" lg="2">
                      <p class="caption my-0 py-0 grey--text align-left">
                        Aksi
                      </p>
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
      peran: null,
      textSearch: null,
      page: null,
      cp: 1,
      more_menu: [
        // eslint-disable-next-line
        {
          title: 'Cetak Token',
          click: (i, o) => this.cetak(o),
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
      return this.$store
        .dispatch('kandidat/get', {
          sekolah_id: this.instansi_id,
          params: {
            page: this.cp,
            s: this.textSearch,
            peran: this.peran,
          },
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
    cetak(item) {
      var sekolah_id = this.current_instansi.id
      this.$confirm(
        `Apakah Anda yakin akan mempublikasikan Anggota ini ?<br>
        <div class="mt-2 title grow text-center">
           ${item.nama} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch('kandidat/cetak', { sekolah_id: sekolah_id, obj: item })
            .then(() => this.load())
            .catch((e) => e)
        )
        .catch((e) => e)
    },
  },
}
</script>
