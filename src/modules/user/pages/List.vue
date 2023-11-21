<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12">
        <m-alert show :title="alert.pengguna.list.judul" :info="alert.pengguna.list.deskripsi" closable></m-alert>
      </v-col>
      <v-col cols="12" class="mb-5">
        <m-card-list
          class="mb-5"
          title="Daftar Pengguna"
          search
          id-key
          refresh
          more
          :add="isCan('pengguna')"
          addText="Pengguna"
          addHint="Tambah Pengguna"
          @upload="upload"
          :variablePencarian="keywords"
          textUpload="Unggah Pengguna"
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
          @add="add"
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
                        {{ pVal(item, 'name') }}
                      </p>
                      <p class="caption black--text my-0 py-0">
                        {{ pVal(item, 'email') }}
                      </p>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="2" md="2" lg="2">
                      <p class="caption my-0 py-0 grey--text align-left">
                        Tingkat
                      </p>
                      <p class="mr-2 my-0 py-0" v-for="tingkat in item.tingkat" :key="tingkat.id">
                        {{ pVal(tingkat, 'keterangan2') }}
                      </p>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="2" md="2" lg="2">
                      <p class="caption my-0 py-0 grey--text align-left">
                        Hak Akses
                      </p>
                      <p
                        text
                        v-for="peran in item.peran"
                        :key="peran.index"
                        outlined
                        pill
                        :class="$user.statusColor(peran.id) + '--text font-weight-bold my-1'"
                        >{{ pVal(peran, 'keterangan') }}</p
                      >
                    </v-col>
                    <v-col class="py-0" cols="12" sm="2" md="2" lg="2">
                      <p class="caption my-0 py-0 grey--text align-left">
                        Status
                      </p>
                      <v-chip class="px-5" outlined :color="item.is_aktif ? 'success' : 'error'">{{
                        item.is_aktif ? 'Aktif' : 'Belum Aktif'
                      }}</v-chip>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="2" md="2" lg="2">
                      <p class="caption my-0 py-0 grey--text align-left">
                        Aksi
                      </p>
                      <m-menu left style="float:left" :items="more_menu" :object="item" />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
            <v-divider class="my-3" />
          </template>
        </m-card-list>
      </v-col>
      <ChangeDlg ref="dlg" />
      <m-upload ref="dlgUpload" :perans="itemPerans"></m-upload>
    </v-row>
  </v-container>
</template>

<script>
import { isCan } from '@/tools'
import { ALERT_INFO } from '@/const'
import ChangeDlg from '../../user/components/Form.vue'
import FilterPengguna from '@/filter/FilterPengguna.vue'

export default {
  components: {
    ChangeDlg,
    FilterPengguna,
  },
  data() {
    return {
      alert: ALERT_INFO,
      items: [],
      itemMapels: [],
      itemPerans: [],
      peran: null,
      textSearch: null,
      keywords: [
        {
          label: 'Nama',
          value: 's',
        },
        {
          label: 'Akses',
          value: 'akses',
        },
      ],
      page: null,
      cp: 1,
      options: {
        title: 'Unggah Data Pengguna',
        module: 'user/importUser',
        category: false,
        id: 1,
      },
      more_menu: [
        // eslint-disable-next-line
        {
          title: 'Ubah',
          click: (i, o) => this.edit(o),
        },
        {
          title: 'Reset Kata Sandi',
          click: (i, o) => this.resetSandi(o),
          check: () => isCan('pengguna'),
        },
        {
          title: 'Cetak Token',
          click: (i, o) => this.cetak(o),
          check: (i, o) => isCan('pengguna') && !o.is_aktif,
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
    this.loadPeran()
  },
  methods: {
    load() {
      var params = {
        page: this.cp,
        peran_id: this.peran,
      }
      if (this.textSearch) {
        params[this.textSearch.param] = this.textSearch.s
      }
      return this.$store
        .dispatch('user/get', {
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
      this.peran = data.akses
      this.load()
    },
    ajukan(item) {
      this.$confirm(
        `Apakah Anda yakin akan mempublikasikan Anggota ini ?<br>
        <div class="mt-2 title grow text-center">
           ${item.judul} <br>
        </div>
      `
      )
        .then(() =>
          this.$store
            .dispatch('user/ajukan', { obj: item })
            .then(() => {
              this.$info('Data berhasil diajukan')
            })
            .then(() => this.load())
            .catch((e) => e)
        )
        .catch((e) => e)
    },
    cetak(item) {
      var sekolah_id = this.current_instansi.id
      this.$confirm(
        `Apakah Anda yakin akan mencetak Akun Pengguna ini ?<br>
        <div class="mt-2 title grow text-center">
           ${item.name} <br>
        </div>
        Dengan mencetak akun, kata sandi pengguna tersebut akan diacak kembali oleh sistem
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
    resetSandi(item) {
      var sekolah_id = this.current_instansi.id
      this.$confirm(
        `Apakah Anda yakin akan mencetak Akun Pengguna ini ?<br>
        <div class="mt-2 title grow text-center">
           ${item.name} <br>
        </div>
        <br>
        Dengan mencetak akun, kata sandi pengguna tersebut akan diacak kembali oleh sistem
      `
      )
        .then(() =>
          this.$store
            .dispatch('user/cetak', { sekolah_id: sekolah_id, obj: item })
            .then(() => this.load())
            .catch((e) => e)
        )
        .catch((e) => e)
    },

    // eslint-disable-next-line
    loadPeran() {
      return this.$store
        .dispatch('user/getPeran', this.instansi_id)
        .then((res) => {
          return (this.itemPerans = res)
        })
        .catch((e) => e)
    },

    setRole(item) {
      this.$confirm(
        `Apakah anda yakin akan mengubah Hak Akses pengguna sesuai data yang Anda pilih?<br>
        <div class='mt-2 title font-weight-bold text-center red--text text--darken-2'>
          ${item.name}
        </div>
        `,
        {
          role: [
            { id: 2, name: 'Kontributor' },
            { id: 3, name: 'Kurator' },
          ],
          mapel: this.itemMapels,
        },
        'Ubah Hak Akses',
        item
      )
        .then((res) => {
          var obj = {
            user_id: item.id,
            role_id: typeof res.role == 'object' ? res.role.id : res.role,
            mapel: res.mapel,
            // is_simpatika:
            //   typeof res.tenant === "object" ? res.tenant.id : res.tenant
          }
          this.$store
            .dispatch('user/setRole', obj)
            .then(() => {
              this.load()
              this.$info('Ubah Hak Akses pengguna berhasil')
            })
            .catch((e) => e)
        })
        .catch((e) => e)
    },
    detail(item) {
      this.$refs.detailDlg.open(item)
    },
    add() {
      this.$refs.dlg.open(null, false).then(() => {
        this.load()
      })
    },
    edit(item) {
      this.$refs.dlg.open(item, true).then(() => {
        this.load()
      })
    },
    link(item) {
      window.open(item.link, '_blank')
    },
    hapus(item) {
      this.$confirm(
        `Apakah Anda yakin akan menghapus user ini ?<br>
        <div class="mt-2 title grow text-center">
          ${item.name}<br>
        </div>`,
        {
          cancelOnly: item.laporan_accepted_count > 0 ? true : false,
        }
      )
        .then(() => this.$store.dispatch('user/drop', item))
        .then(() => {
          this.$info('User ' + item.name + ' berhasil dihapus')
        })
        .then(() => this.load())
        .catch((e) => e)
    },
    upload() {
      this.options.id = this.instansi_id
      this.$refs.dlgUpload
        .open(this.options)
        .then((res) => {
          this.load()
          this.$refs.dlg.resolve()
          this.$info('Data Anggota berhasil di import')
          return res
        })
        .catch((e) => e)
    },
    download() {
      window.open('https://cdn.siap.id/s3/siap_belajar/sim/Template_Unggah_Pengguna_SIAP_Belajar.xlsx', '_blank')
    },
  },
  watch: {},
}
</script>
