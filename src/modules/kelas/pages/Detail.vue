<template>
  <v-container grid-list-md class="ma-0 pa-0" v-if="kelas">
    <m-breadcrum :items="bread"></m-breadcrum>
    <v-row>
      <v-col cols="12">
        <m-card title="Detail Kelas">
          <v-row wrap>
            <v-col cols="12" sm="12" md="3" lg="3" xl="3" class="pr-2 text-center">
              <v-card text color="#fff" flat>
                <v-container fill-height container--fluid>
                  <v-row fill-height>
                    <v-col class="text-center" cols="12" align-end colbox>
                      <img
                        height="200"
                        src="https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png"
                        alt="avatar"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="9" lg="9" xl="9">
              <v-list>
                <v-row>
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-subtitle>Nama</v-list-item-subtitle>
                        <v-list-item-title class="subtitle-1 font-weight-bold primary--text">{{
                          pVal(kelas, 'nama') | toTitleCase
                        }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-subtitle>Tingkat</v-list-item-subtitle>
                        <v-list-item-title class="subtitle-1 font-weight-bold primary--text">{{
                          pVal(kelas.tingkat, 'keterangan2')
                        }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-subtitle>Deskripsi</v-list-item-subtitle>
                        <div>{{ pVal(kelas, 'keterangan') }}</div>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-list>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="pa-5">
              <v-card flat class="pa-5 background">
                <m-alert
                  :color="kelas && kelas.guru && kelas.guru.length > 0 ? 'info' : 'error'"
                  show
                  :icon="kelas && kelas.guru && kelas.guru.length > 0 ? 'mdi-information' : 'mdi-alert'"
                  :info="
                    kelas && kelas.guru && kelas.guru.length > 0
                      ? 'Anda bisa menambahkan pengguna yang akan ditugaskan sebagai pengajar pada kelas <strong>' +
                        kelas.nama +
                        '</strong>'
                      : 'Anda belum menambahkan pengguna yang ditugaskan sebagai pengajar pada kelas <strong>' +
                        kelas.nama +
                        '</strong>'
                  "
                ></m-alert>
                <v-card-text>
                  <ListEnrollGuru title="Daftar Pengajar" :items="kelas.guru" @load="load" />
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" class="pa-5">
              <v-card flat class="pa-5 background">
                <m-alert
                  :color="kelas && kelas.rombel && kelas.rombel.length > 0 ? 'info' : 'error'"
                  show
                  :icon="kelas && kelas.rombel && kelas.rombel.length > 0 ? 'mdi-information' : 'mdi-alert'"
                  :info="
                    kelas && kelas.rombel && kelas.rombel.length > 0
                      ? 'Anda bisa menambahkan Rombongan Belajar pada kelas <strong>' +
                        kelas.nama +
                        '</strong> sesuai dengan rombel yang telah Anda buat pada menu Rombongan Belajar'
                      : 'Anda belum menambahkan Rombongan Belajar pada kelas <strong>' + kelas.nama + '</strong>'
                  "
                ></m-alert>

                <v-card-text>
                  <ListTable title="Daftar Rombongan Kelas" :items="kelas.rombel" @load="load" />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </m-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ListTable from '../../kelas/components/ListTable.vue'
import ListEnrollGuru from '../../kelas/components/ListEnrollGuru.vue'
export default {
  components: {
    ListTable,
    ListEnrollGuru,
  },
  data() {
    return {
      tabs: 1,
      tab: null,
      items: [{ tab: 'Daftar Rombongan Kelas', content: 'Daftar ' }],
      kelas: {}
    }
  },

  activated(){
    this.load()
  },

  methods:{
    load() {
      return this.$store
        .dispatch('kelas/detail', {
          sekolah_id: this.instansi_id,
          kelas_id: this.kelas_id,
        })
        .then((res) => {
          this.kelas = res
        })
        .catch((e) => e)
    },
  },

  computed: {
    bread() {
      return [
        {
          icon: 'mdi-library-books',
          title: 'Kelas',
          to: { name: 'kelas', params: { instansi_id: this.instansi_id } },
        },
        {
          icon: 'mdi-edit',
          title: this.kelas ? this.kelas.nama : '-',
        },
      ]
    },
  },
  watch: {
    kelas_id(n) {
      if (n) this.load()
    },
  },
}
</script>
