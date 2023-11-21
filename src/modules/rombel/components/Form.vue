<template>
  <m-dialog
    ref="dlg"
    :btnsave="false"
    :title="rombel && rombel.user_id ? 'Ubah Rombongan Belajar Baru' : 'Tambah Rombongan Belajar Baru'"
  >
    <v-row row wrap justify="center" align="center">
      <v-col cols="12" sm="12" md="10" lg="8" xl="8">
        <v-form @submit.prevent data-vv-scope="form" lazy-validation>
          <v-card flat color="white" class="mt-4  mb-5 pb-5">
            <v-row class="pa-5">
              <v-col cols="12">
                <m-alert show :title="alert.rombel.form.judul" :info="alert.rombel.form.deskripsi" closable></m-alert>
              </v-col>
            </v-row>
            <v-card-text class="pa-5 pt-0">
              <v-row wrap>
                <v-col cols="12">
                  <v-text-field
                    outlined
                    dense
                    autocomplete="false"
                    name="Nama"
                    placeholder="Nama Rombongan Belajar"
                    label="Nama"
                    v-model="rombel.nama"
                    persistent-hint
                    data-vv-name="nama"
                    data-vv-as="Nama"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.nama')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-2">
                  <v-textarea
                    outlined
                    autocomplete="false"
                    name="Deskripsi"
                    placeholder="Isikan Deskripsi"
                    label="Deskripsi"
                    v-model="rombel.keterangan"
                    persistent-hint
                    data-vv-name="deskripsi"
                    data-vv-as="Deskripsi"
                    v-validate="''"
                    :error-messages="errors.collect('form.deskripsi')"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" md="3" sm="3" lg="3" class="py-2">
                  <v-autocomplete
                    outlined
                    dense
                    autocomplete="false"
                    v-model="rombel.tingkat"
                    :items="itemTingkats"
                    no-data-text="Data Tidak Tersedia"
                    placeholder="Pilih Tingkat"
                    label="Tingkat"
                    name="Tingkat"
                    item-value="id"
                    item-text="keterangan2"
                    data-vv-name="tingkat"
                    data-vv-as="Tingkat"
                    return-object
                    v-validate="'required'"
                    :error-messages="errors.collect('form.tingkat')"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider class="mx-5"></v-divider>
            <v-row>
              <v-col cols="12" class="mb-5 pa-5">
                <m-button
                  class="mb-3"
                  right
                  absolute
                  text="Simpan"
                  icon="mdi-content-save"
                  action="save"
                  @save="save"
                ></m-button>
              </v-col>
            </v-row>
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
      step: 1,
      duplicate: false,
      rombel: {},
      defMapel: {
        nama: '',
        tingkat: '',
      },
      itemGurus: [],
      itemKandidats: [],
      itemTingkats: [],
      itemMapels: [],
      itemModuls: [],
      countMapelPilihan: 1,
      itemMapelPilihan: [{ rombel: null, tanggal: null }],
      filteredData: {
        tingkat: null,
        jenis: null,
      },
      pilihanId: [],
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
        { text: '', align: 'left', value: 'foto' },
        { text: 'Nama', align: 'left', value: 'nama' },
        { text: 'Tingkat', align: 'left', value: 'tingkat' },
      ],
    }
  },
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.loadTingkat()
      this.rombel = obj
        ? { ...obj }
        : {
            ...this.defMapel,
            ...(this.itemKandidats = []),
            ...(this.selectedItems = []),
          }
      // this.loadKandidatRombel();
      let x = this.$refs.dlg.open()
      this.$validator.reset()
      return x
    },

    detailRombel(id) {
      return this.$store
        .dispatch('rombel/detail', {
          sekolah_id: this.instansi_id,
          id: id,
        })
        .then((res) => {
          this.rombel = res
          this.selectedItems = [...res.siswa]
        })
        .catch((e) => e)
    },

    // eslint-disable-next-line
    loadKandidatRombel() {
      var selected = this.selectedItems
      return this.$store
        .dispatch('user/getKandidat', {
          sekolah_id: this.instansi_id,
          params: {
            page: this.cp,
            s: this.textSearch,
            tingkat: this.filteredData.tingkat,
            jenis: this.filteredData.jenis,
          },
        })
        .then((res) => {
          this.page = res
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
        this.loadKandidatRombel()
      }
    },

    // eslint-disable-next-line
    loadTingkat() {
      return this.$store
        .dispatch('tingkat/get', {
          sekolah_id: this.instansi_id,
          params: {},
        })
        .then((res) => {
          return (this.itemTingkats = res)
        })
        .catch((e) => e)
    },

    // eslint-disable-next-line
    loadMapel() {
      return this.$store
        .dispatch('rombel/getAll', {
          params: {
            tingkat_id: this.tingkat ? this.tingkat.id : null,
          },
        })
        .then((res) => {
          return (this.itemMapels = res.data)
        })
        .catch((e) => e)
    },
    // eslint-disable-next-line
    loadModul() {
      return this.$store
        .dispatch('rombel/getAll', {
          params: {},
        })
        .then((res) => {
          return (this.itemModuls = res)
        })
        .catch((e) => e)
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
    // eslint-disable-next-line
    remove(index) {
      this.countMapelPilihan -= 1
      this.itemMapelPilihan.splice(index, 1)
    },

    // eslint-disable-next-line
    filter(data) {
      this.filteredData = data
      this.loadKandidatRombel()
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
          this.rombel.siswa = this.selectedItems
          return this.$store.dispatch('rombel/form', {
            sekolah_id: this.instansi_id,
            obj: this.rombel,
          })
        })
        .then((res) => {
          this.$refs.dlg.resolve(res)
        })
        .catch((e) => e)
    },
    checkDuplicate() {
      this.duplicate = false
      for (var i = 0; i < this.itemMapelPilihan.length; i++) {
        for (var j = i + 1; j < this.itemMapelPilihan.length; j++) {
          if (this.itemMapelPilihan[i].rombel == this.itemMapelPilihan[j].rombel) {
            this.duplicate = true
          }
        }
      }
      if (this.duplicate) {
        this.$error('Anda memasukkan data Mata pelajaran yang sama')
      }
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
