<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="6" align="left">
        <h3 class="primary--text">{{ title }}</h3>
      </v-col>
      <v-col cols="6" align="right">
        <m-button
          v-if="addData && isCan('kelas')"
          fab
          class="mb-3"
          right
          text
          icon="mdi-plus"
          action="add"
          @add="add"
        ></m-button>
        <m-button
          v-if="selectedItems.length > 0 && isCan('kelas')"
          class="mb-3"
          right
          text
          fab
          action="delete"
          @delete="unenrolled"
          icon="mdi-delete"
          color="error"
          @add="add"
        ></m-button>
      </v-col>
      <v-col cols="12">
        <v-data-table
          v-model="selectedItems"
          :headers="headers"
          :items="items"
          :items-per-page="15"
          item-key="id"
          :show-select="addData"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td v-show="addData">
                  <v-checkbox v-model="selectedItems" :value="item" style="margin:0px;padding:0px" hide-details />
                </td>
                <td>
                  <p class="my-0 py-0">
                    {{ pVal(item, 'nama') }}
                  </p>
                </td>
                <td>
                  <p class="my-0 py-0">
                    {{ pVal(item.tingkat, 'keterangan') }}
                  </p>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-col>
      <v-divider></v-divider>
    </v-row>
    <ChangeDlg ref="dlg" />
  </v-container>
</template>

<script>
import ChangeDlg from '../../kelas/components/FormRombel.vue'
export default {
  components: {
    ChangeDlg,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    addData: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      textSearch: null,
      page: null,
      selectedItems: [],
      cp: 1,
      more_menu: [
        {
          title: 'Ubah',
          click: (i, o) => this.edit(o),
        },
        {
          title: 'Hapus',
          click: (i, o) => this.hapus(o),
        },
      ],
    }
  },
  computed: {
    headers() {
      const a = [
        { text: 'Nama Rombel', align: 'left', value: '', sortable: false },
        { text: 'Tingkat', align: 'left', value: '', sortable: false },
      ]
      return a
    },
  },
  methods: {
    add() {
      this.$refs.dlg.open().then(() => {
        this.$emit('load')
      })
    },
    unenrolled() {
      var daftarPengguna = []
      this.selectedItems.forEach((item) => {
        var obj = {
          id: item.id,
          grup_id: this.tipe,
        }
        daftarPengguna.push(obj)
      })

      this.$confirm(
        `Apakah Anda yakin akan mengeluarkan Rombel terpilih dari kelas ?<br>
        <div class="mt-2 title grow text-center">

        </div>`
      )
        .then(() =>
          this.$store.dispatch('kelas/unenrolled', {
            sekolah_id: this.instansi_id,
            kelas_id: this.$route.params.kelas_id,
            obj: daftarPengguna,
          })
        )
        .then((res) => {
          if (res && res.status == 201) {
            this.$info('Rombel berhasil dikeluarkan dari kelas')
          }
          this.selectedItems = []
        })
        .then(() => this.$emit('load'))
        .catch((e) => e)
    },
  },
  watch: {
    items() {
      var selected = this.selectedItems
      this.selectedItems = []

      setTimeout(function() {
        return (this.selectedItems = selected)
      }, 5)

      this.current_page = this.page ? this.page.current_page : 0
    },
  },
}
</script>
