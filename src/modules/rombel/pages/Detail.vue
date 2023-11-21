<template>
  <v-container grid-list-md class="ma-0 pa-0">
    <m-breadcrum :items="bread"></m-breadcrum>
    <v-row>
      <v-col cols="12">
        <m-card title="Detail Rombongan Belajar">
          <v-row wrap>
            <v-col cols="12" sm="3" md="3" lg="3" xl="3" class="pr-2 text-center">
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
            <v-col cols="12" sm="9" md="9" lg="9" xl="9">
              <v-list>
                <v-row>
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-subtitle>Nama</v-list-item-subtitle>
                        <v-list-item-title class="subtitle-1 font-weight-bold primary--text">{{
                          pVal(rombel, 'nama') | toTitleCase
                        }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-subtitle>Tingkat</v-list-item-subtitle>
                        <v-list-item-title>{{ pVal(rombel.tingkat, 'keterangan') }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-subtitle>Deskripsi</v-list-item-subtitle>
                        <div>{{ pVal(rombel, 'keterangan') }}</div>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-list>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <m-card flat title="Daftar Anggota Rombongan Kelas">
                <v-card-text>
                  <ListTable :items="rombel.peserta" @load="loadRombel" />
                </v-card-text>
              </m-card>
            </v-col>
          </v-row>
        </m-card>
      </v-col>
    </v-row>
    <ChangeDlg ref="dlg" />
  </v-container>
</template>
<script>
import ListTable from '../../rombel/components/ListTable.vue'
import ChangeDlg from '../../rombel/components/Form.vue'
export default {
  components: {
    ListTable,
    ChangeDlg,
  },
  data() {
    return {
      tabs: 1,
      rombel: {},
      tab: null,
      items: [{ tab: 'Daftar Anggota Rombongan Kelas', content: 'Daftar ' }],
    }
  },
  mounted() {
    this.loadRombel()
  },
  methods: {
    loadRombel() {
      return this.$store
        .dispatch('rombel/detail', {
          sekolah_id: this.$route.params.instansi_id,
          rombel_id: this.$route.params.rombel_id,
        })
        .then((res) => {
          this.rombel = res
        })
        .catch((e) => e)
    },
  },
  computed: {
    bread() {
      return [
        {
          icon: 'mdi-library-books',
          title: 'Kelola Rombongan Belajar',
          to: { name: 'rombel', params: { instansi_id: this.instansi_id } },
        },
        {
          icon: 'mdi-edit',
          title: this.rombel ? this.rombel.nama : '-',
        },
      ]
    },
  },
  watch: {
    rombel_id() {
      this.loadRombel()
    },
  },
}
</script>
