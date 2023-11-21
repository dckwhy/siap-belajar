<template>
  <m-dialog ref="dlg" :btnsave="false" title="Enrollment Rombongan Kelas">
    <v-row row wrap justify="center" align="center">
      <v-col cols="12" sm="12" md="10" lg="8" xl="8">
        <v-form @submit.prevent data-vv-scope="form" lazy-validation>
          <v-card flat class="mt-4 mb-5 pb-5">
            <v-card-text class="pa-5 pt-0">
              <v-row wrap>
                <v-col cols="12" class="mt-5">
                  <v-row wrap>
                    <v-col cols="12" sm="12" md="12" lg="12">
                      <v-text-field
                        outlined
                        dense
                        autofocus
                        v-model="textSearch"
                        placeholder="Cari berdasarkan nama Rombel"
                        hint
                        clearable
                        append-icon="mdi-magnify"
                        @click:append="search()"
                        @keyup.enter="search()"
                        @click:clear="search()"
                        persistent-hint
                        :error-messages="errors.collect('form.rombel')"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="12" md="12" lg="12">
                      <v-chip
                        class="ma-1"
                        v-for="item in selectedItems"
                        :key="item.id"
                        close
                        @click:close="removeSelected(item)"
                      >
                        <v-avatar left>
                          <v-icon>mdi-account-circle</v-icon>
                        </v-avatar>
                        {{ item.nama }}
                      </v-chip>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" lg="12">
                      <v-data-table
                        v-model="selectedItems"
                        :headers="headers"
                        :items="itemKandidats"
                        :items-per-page="15"
                        item-key="id"
                        show-select
                        hide-default-footer
                      >
                        <template v-slot:body="{ items }">
                          <tbody>
                            <tr v-if="items.length == 0">
                              <td colspan="3" align="center">Data Tidak Tersedia</td>
                            </tr>
                            <tr v-for="item in items" :key="item.id">
                              <td>
                                <v-checkbox
                                  v-model="selectedItems"
                                  :value="item"
                                  style="margin:0px;padding:0px"
                                  hide-details
                                />
                              </td>
                              <td>{{ pVal(item, 'nama') }}</td>
                              <td>{{ pVal(item.tingkat, 'keterangan') }}</td>
                              <td>{{ pVal(item, 'peserta_count') }}</td>
                            </tr>
                          </tbody>
                        </template>
                        <template v-slot:footer>
                          <v-row wrap class="pb-3" v-if="page && page.last_page > 1">
                            <v-col
                              :cols="$vuetify.breakpoint.smAndUp ? 2 : 3"
                              class="text-left"
                              align="center"
                              justify="center"
                            >
                              <p class="caption font-weight-bold">{{ page.total }} &nbsp; Data ditemukan</p>
                            </v-col>
                            <v-col cols="8" v-if="$vuetify.breakpoint.smAndUp" class="text-center">
                              <v-pagination
                                v-if="page.total"
                                :key="page_key"
                                v-model="current_page"
                                :length="page.last_page"
                                :total-visible="7"
                                @input="change"
                              ></v-pagination>
                            </v-col>
                            <v-col :cols="$vuetify.breakpoint.smAndUp ? 2 : 9" v-if="page.from" class="text-right">
                              <p class="caption font-weight-bold"
                                >{{ page.from }} - {{ page.to }} dari {{ page.total }}</p
                              >
                            </v-col>
                          </v-row>
                        </template>
                      </v-data-table>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <m-button right absolute text="Pilih" icon="mdi-content-save" action="save" @save="save"></m-button>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </m-dialog>
</template>

<script>
import { ALERT_INFO } from '@/const'
import FilterJenisTingkat from '@/filter/FilterJenisTingkat.vue'
export default {
  $_veeValidate: {
    validator: 'new',
  },
  components: {
    FilterJenisTingkat,
  },

  data() {
    return {
      role_id: null,
      duplicate: false,
      enroll: {},
      tipe: '',
      modul_id: null,
      textSearch: '',
      itemKandidats: [],
      countMapelPilihan: 1,
      alert: ALERT_INFO,
      selectedItems: [],
      page: null,
      cp: 1,
      current_page: 0,
      jump_page: 0,
      selection: [],
      pagging: {},
      page_key: 0,
      totalPagination: [],
      headers: [
        { text: 'Nama Rombel', align: 'left', value: 'nama' },
        { text: 'Tingkat', align: 'left', value: 'tingkat' },
        { text: 'Jumlah Anggota', align: 'left', value: 'peserta_count' },
      ],
    }
  },
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.role_id = null
      this.enroll = obj
        ? { ...this.detailRombel(obj.id) }
        : {
            ...(this.itemKandidats = []),
            ...(this.selectedItems = []),
          }
      this.loadKandidat()
      let x = this.$refs.dlg.open()
      this.$validator.reset()
      return x
    },
    removeSelected(item) {
      const tempSelected = this.selectedItems
      const shallowCopyArray = Array.from(tempSelected)
      const index = shallowCopyArray.indexOf(item)
      if (index > -1) {
        shallowCopyArray.splice(index, 1)
      }
      this.selectedItems = shallowCopyArray
    },

    detailRombel(id) {
      return this.$store
        .dispatch('enroll/detail', {
          instansi_id: this.instansi_id,
          id: id,
        })
        .then((res) => {
          this.enroll = res
          this.selectedItems = [...res.siswa]
        })
        .catch((e) => e)
    },

    search() {
      this.current_page = 1
      this.cp = 1
      this.loadKandidat()
    },

    // eslint-disable-next-line
    loadKandidat() {
      var selected = this.selectedItems
      return this.$store
        .dispatch('rombel/getKandidatRombel', {
          instansi_id: this.$route.params.instansi_id,
          kelas_id: this.$route.params.kelas_id,
          params: {
            page: this.cp,
            s: this.textSearch,
          },
        })
        .then((res) => {
          this.itemKandidats = res.data
          return (this.selectedItems = [])
        })
        .then(() => {
          return (this.selectedItems = selected)
        })
        .catch((e) => e)
    },

    change() {
      if (this.current_page !== this.page.current_page) {
        this.cp = this.current_page
        this.loadKandidat()
      }
    },
    // eslint-disable-next-line
    save() {
      this.enroll = []

      this.selectedItems.forEach((item) => {
        var obj = {
          id: item.id,
        }
        this.enroll.push(obj)
      })

      return this.$store
        .dispatch('kelas/formRombel', {
          sekolah_id: this.instansi_id,
          kelas_id: this.kelas_id,
          obj: this.enroll,
        })
        .then(() => {
          this.$refs.dlg.resolve()
        })
        .catch((e) => e)
    },
  },
  watch: {
    page(n) {
      if (n) {
        this.current_page = n.current_page
        this.jump_page = n.current_page
        this.page_key = Math.random()
        for (let i = 1; i <= n.last_page; i++) {
          this.totalPagination.push(i)
        }
      }
    },
    items() {
      this.current_page = this.page ? this.page.current_page : 0
    },
  },
}
</script>
<style>
.date-time {
  color: rgba(0, 0, 0, 0.87);
  padding: 8px 8px 8px;
  max-width: 100%;
  width: 100%;
  border: 1px solid grey;
  outline: 1px;
  background: transparent;
  border-radius: 4px;
}
</style>
