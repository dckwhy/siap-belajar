<template>
  <v-dialog ref="dlgInstansi" v-model="dialog" retain-focus width="500">
    <template v-slot:activator="{}"></template>
    <v-card>
      <v-card-title class="title">Pilih Instansi</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row row class="mt-2">
          <v-col cols="12">
            <v-text-field
              outlined
              dense
              autofocus
              v-model="textSearch"
              placeholder="Cari Pengguna"
              hint
              clearable
              append-icon="mdi-magnify"
              @click:append="pencarian()"
              @keyup.enter="pencarian()"
              @click:clear="pencarian()"
              persistent-hint
              :error-messages="errors.collect('form.instansi')"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="pa-0">
            <v-list-item two-line v-for="item in items" :key="item.id" @click="pilihInstansi(item)">
              <v-list-item-content>
                <v-list-item-title class="title mb-1">
                  <v-avatar size="30">
                    <img src="https://cdn.siap.id/s3/siap_belajar/sim/berhasil.png" alt />
                  </v-avatar>
                  {{ item.nama }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
        <v-row wrap class="pb-0" v-if="page && page.last_page > 1">
          <v-col cols="12" sm="12" md="12" lg="12" align="center">
            <v-pagination
              v-if="page.total"
              v-model="current_page"
              :length="page.last_page"
              :total-visible="6"
              @input="change"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions></v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import BlockCard from '@/components/BlockCard'
export default {
  components: {
    BlockCard,
  },
  data() {
    return {
      dialog: false,
      resolve: null,
      reject: null,
      instansi: {},
      textSearch: null,
      items: [],
      page: null,
      cp: 1,
    }
  },
  mounted() {
    this.current_page = 1
    this.load
  },
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.current_page = 1
      return this.load().then(() => {
        return new Promise((resolve, reject) => {
          this.resolve = resolve
          this.reject = reject
          this.dialog = true
        })
      })
    },
    pencarian() {
      this.cp = 1
      this.current_page = 1
      this.load(1)
    },
    // eslint-disable-next-line
    load(current_page) {
      return this.$store
        .dispatch('instansi/get', { page: current_page, s: this.textSearch })
        .then((res) => {
          this.page = res
          this.items = res.data

          if (res.data.length == 1 && !this.current_user.is_super_admin) {
            this.pilihInstansi(res.data[0])
          }
        })
        .catch((e) => e)
    },
    // eslint-disable-next-line
    save() {
      this.$validator
        .validateAll('form')
        .then((res) => {
          if (!res) return Promise.reject()
          return res
        })
        .then(() => {
          return this.$store.dispatch('instansi/create', this.instansi)
        })
        .then((res) => {
          this.instansi.nama = ''
          this.pilihInstansi(res.data)
          this.$refs.dlg.resolve()
          return res
        })
        .catch((e) => e)
    },
    change() {
      this.load(this.current_page)
    },
    pilihInstansi(item) {
      return this.$store
        .dispatch('instansi/switchInstansi', item.id)
        .then(() => {
          this.dialog = false
          return this.$router.push({
            name: 'instansi.detail',
            params: { instansi_id: item.id },
          })
        })
        .catch((e) => e)
    },
  },
  watch: {
    dialog(n) {
      if (!n && this.reject) {
        this.reject(null)
      }
    },
  },
  computed: {},
}
</script>
