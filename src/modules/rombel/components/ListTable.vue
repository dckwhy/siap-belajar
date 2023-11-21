<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <m-button
        v-if="addData && isCan('rombel')"
        fab
        class="mb-3"
        right
        text
        icon="mdi-plus"
        action="add"
        @add="add"
        style="position:absolute; right:5px; top:0px"
      ></m-button>
      <m-button
        v-if="selectedItems.length > 0 && isCan('rombel')"
        class="mb-3"
        right
        text
        fab
        action="delete"
        @delete="unenrolled"
        icon="mdi-delete"
        color="error"
        @add="add"
        style="position:absolute; right:5px; top:0px"
      ></m-button>
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
                    {{ pVal(item, 'name') }}
                  </p>
                </td>
                <td>
                  <p class="subtitle-1 my-0 py-0">{{ pVal(item, 'email') }}</p>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <ChangeDlg ref="dlg" />
  </v-container>
</template>

<script>
import ChangeDlg from '../../rombel/components/FormPeserta.vue'
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
        { text: 'Nama Lengkap', align: 'left', value: '', sortable: false },
        { text: 'Surel', align: 'left', value: '', sortable: false },
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
        `Apakah Anda yakin akan mengeluarkan pengguna terpilih dari Rombel ?<br>
        <div class="mt-2 title grow text-center">

        </div>`
      )
        .then(() =>
          this.$store
            .dispatch('rombel/unenrolled', {
              instansi_id: this.instansi_id,
              rombel_id: this.$route.params.rombel_id,
              obj: daftarPengguna,
            })
            .then((res) => {
              if (res && res.status == 201) {
                this.$info('Pengguna berhasil dikeluarkan dari rombel')
              }
            })
        )
        .then(() => {
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
