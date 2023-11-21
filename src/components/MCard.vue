<template>
  <v-card class="mt-5 elevation-0" flat tile>
    <v-toolbar flat>
      <v-toolbar-title v-if="title" class="title font-weight-normal my-5">
        <v-icon>{{ icon }}</v-icon>
        {{ title }}
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-progress-circular v-if="loading || iLoading" indeterminate color="primary lighten-2"></v-progress-circular>
      <template v-else>
        <slot name="action">
          <!-- <v-text-field
            outlined
            v-show="search && $vuetify.breakpoint.mdAndUp"
            dense
            class="mx-2"
            v-model="textSearch"
            clearable
            placeholder="  Tulis pencarian"
            append-icon="mdi-magnify"
            append-icon-color="primary"
            @click:append="searchData"
            @click:clear="clearSearchData"
            label
            single-line
            hide-details
            @keyup.enter="searchData"
          >
            <template v-slot:prepend-inner>
              <v-select
                class="mt-n2 ml-n3"
                background-color="grey lighten-4"
                style="maxWidth: 120px;border:0px;border-top-right-radius:0px;border-bottom-right-radius:0px;border-right: none;"
                dense
                outlined
                height="15"
                single-line
                hide-details
                filled
                autocomplete="false"
                v-model="paramSearch"
                :items="variablePencarian"
                no-data-text="Data Tidak Tersedia"
                data-vv-name="paramSearch"
                data-vv-as="Pencarian"
                v-validate="'required'"
                :error-messages="errors.collect('form.paramSearch')"
              >
              </v-select>
            </template>
          </v-text-field> -->

          <!-- <v-btn class="mx-1" color="secondary" depressed v-if="$vuetify.breakpoint.smAndDown" @click="toggleSearch = !toggleSearch">
            <v-icon>mdi-magnify</v-icon>
          </v-btn> -->
          <v-tooltip top v-if="add">
            <template v-slot:activator="{ on }">
              <v-btn class="mx-1 elevation-7 rounded-lg" color="primary" v-on="on" depressed @click="$emit('add')">
                <v-icon>mdi-plus</v-icon>
                {{ $vuetify.breakpoint.xs ? '' : addText }}
              </v-btn>
            </template>
            <span>{{ addHint }}</span>
          </v-tooltip>
          <v-menu open-on-hover offset-y v-if="enroll">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                <v-icon>mdi-account-group</v-icon> &nbsp;Enrol &nbsp; <v-icon>mdi-chevron-down</v-icon></v-btn
              >
            </template>
            <v-list>
              <v-list-item @click="$emit('enrollPeserta')">
                <v-list-item-title>Peserta</v-list-item-title>
              </v-list-item>
              <v-list-item @click="$emit('enrollPengelola')">
                <v-list-item-title>Pengelola</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-tooltip top v-if="edit">
            <template v-slot:activator="{ on }">
              <v-btn
                small
                class="elevation-7 rounded-circle"
                color="primary"
                v-on="on"
                style="height:50px;"
                @click="$emit('edit')"
              >
                <v-icon size="17">mdi-pencil-outline</v-icon>
              </v-btn>
            </template>
            <span>{{ $vuetify.breakpoint.xs ? '' : 'Ubah Data' }}</span>
          </v-tooltip>
          <v-tooltip top v-if="cetakAkun">
            <template v-slot:activator="{ on }">
              <v-btn
                small
                class="elevation-7 rounded-circle ml-2"
                color="primary"
                v-on="on"
                style="height:50px;"
                @click="$emit('cetak')"
              >
                <v-icon size="17">mdi-printer</v-icon>
              </v-btn>
            </template>
            <span>{{ $vuetify.breakpoint.xs ? '' : 'Cetak Akun Instansi' }}</span>
          </v-tooltip>

          <v-btn small class="mr-0 pr-0" v-if="close" icon @click="$emit('close')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-menu v-if="more" left>
            <template v-slot:activator="{ on }">
              <v-btn medium class="elevation-7 rounded-circle mx-2 primary white--text" icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-card width="300">
              <slot name="more_menu">
                <v-list-item @click="$emit('upload')">
                  <v-list-item-content class="pa-0">
                    <v-list-item-subtitle>
                      <v-icon class="mr-4">mdi-upload</v-icon>
                      {{ textUpload }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </slot>
            </v-card>
          </v-menu>
        </slot>
        <slot name="action_ext"></slot>
      </template>
    </v-toolbar>
    <v-divider class="mx-5 mb-3"></v-divider>

    <slot name="under_toolbar">
      <v-row justify="end">
        <v-col cols="12" sm="12" md="3" lg="3" :class="$vuetify.breakpoint.xs ? 'mx-0' : 'pr-0'" v-if="filterPeran">
          <v-select
            :class="$vuetify.breakpoint.xs ? 'mx-2' : 'mx-0'"
            clearable
            outlined
            dense
            autocomplete="off"
            autofocus
            :items="itemPerans"
            name="Peran"
            @change="$emit('filter', filtered)"
            placeholder="Semua Peran"
            v-model="filtered.peran"
            data-vv-name="peran"
            data-vv-as="Peran"
            item-text="keterangan"
            item-value="id"
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="12" sm="12" md="6" xl="6" v-if="search">
          <v-text-field
            :class="$vuetify.breakpoint.xs ? 'mx-2' : 'mx-0'"
            outlined
            dense
            v-model="textSearch"
            clearable
            append-icon="mdi-magnify"
            @click:append="searchData"
            @click:clear="clearSearchData"
            label="Tulis Pencarian"
            single-line
            hide-details
            @keyup.enter="searchData"
          >
            <template v-slot:prepend-inner>
              <v-select
                class="mt-n2 ml-n3"
                background-color="grey lighten-4"
                style="maxWidth: 120px;border:0px;border-top-right-radius:0px;border-bottom-right-radius:0px;border-right: none;"
                dense
                outlined
                height="15"
                single-line
                hide-details
                filled
                autocomplete="false"
                v-model="paramSearch"
                :items="variablePencarian"
                item-text="label"
                item-value="value"
                return-object
                no-data-text="Data Tidak Tersedia"
                data-vv-name="paramSearch"
                data-vv-as="Pencarian"
                v-validate="'required'"
                :error-messages="errors.collect('form.paramSearch')"
              >
              </v-select>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="2" sm="1" md="1" xl="1" v-if="$vuetify.breakpoint.smAndUp && refresh" class="mx-0 px-0">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn color="primary" v-on="on" icon @click="doRefresh">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>Muat Ulang Tayangan</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </slot>
    <v-card-text :class="{ 'pa-0': noPadding }">
      <slot></slot>
    </v-card-text>
    <v-card-actions v-if="footer">
      <slot name="footer" :loading="loading"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'm-card',
  components: {},
  props: {
    icon: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    dateRange: {
      type: Boolean,
      default: false,
    },
    add: {
      type: Boolean,
      default: false,
    },
    cetakAkun: {
      type: Boolean,
      default: false,
    },
    enroll: {
      type: Boolean,
      default: false,
    },
    addText: {
      type: String,
      default: 'Tambah',
    },
    addHint: {
      type: String,
      default: 'Tambah',
    },
    edit: {
      type: Boolean,
      default: false,
    },
    upload: {
      type: Boolean,
      default: false,
    },
    download: {
      type: Boolean,
      default: false,
    },
    textDownload: {
      type: String,
      default: 'Unduh Data',
    },
    textUpload: {
      type: String,
      default: 'Unggah Data',
    },
    print: {
      type: Boolean,
      default: false,
    },
    customFilter: {
      type: Boolean,
      default: false,
    },
    footer: {
      type: Boolean,
      default: false,
    },
    refresh: {
      type: Boolean,
      default: false,
    },
    filterPeran: {
      type: Boolean,
      default: false,
    },
    close: {
      type: Boolean,
      default: false,
    },
    more: {
      type: Boolean,
      default: false,
    },
    search: {
      type: Boolean,
      default: false,
    },
    variablePencarian: {
      type: Array,
      default: () => [],
    },
    filter: {
      type: Boolean,
      default: false,
    },
    filterTanggal: {
      type: Boolean,
      default: false,
    },
    noPadding: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    onRefresh: {
      type: Function,
      default: null,
    },
    itemStatuses: {
      type: Array,
      default: () => [],
    },
  },
  data: (vm) => ({
    iLoading: false,
    dialog: true,
    status: null,
    textSearch: null,
    paramSearch: null,
    toggleSearch: false,
    toggleFilter: false,
    itemPerans: [],
    filtered: {
      peran: '',
    },
    from: new Date(),
    to: new Date().toISOString().substr(0, 10),
    maxFrom: new Date().toISOString().substr(0, 10),
    minTo: null,
    maxTo: new Date().toISOString().substr(0, 10),
    dateFromFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    dateToFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
  }),

  activated() {},
  computed: {},
  mounted() {
    let d = new Date()
    let sevenDaysAgo = d.setDate(d.getDate() - 29)
    this.from = new Date(sevenDaysAgo).toISOString().substr(0, 10)
    this.minTo = new Date(sevenDaysAgo).toISOString().substr(0, 10)
    this.process()
    if (this.variablePencarian.length > 0) {
      this.paramSearch = this.variablePencarian[0]
    }
  },
  methods: {
    searchData() {
      this.$emit('search', { param: this.paramSearch.value, s: this.textSearch })
    },
    clearSearchData() {
      this.$emit('search', { param: this.paramSearch, s: null })
    },
    doRefresh() {
      if (this.onRefresh) {
        this.iLoading = true
        this.onRefresh()
          .then(() => (this.iLoading = false))
          .catch(() => (this.iLoading = false))
      } else this.$emit('refresh')
    },
    process() {
      let range = {
        from: this.from,
        to: this.to,
      }
      this.menu1 = false
      this.menu2 = false

      this.$emit('process', range)
    },
    applyFilter(data) {
      this.toggleFilter = !this.toggleFilter
      this.$emit('filter', data)
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}-${month}-${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`
    },
  },
  watch: {
    dialog(n) {
      if (n == false) this.toggleFilter = false
    },
    toggleFilter(n) {
      if (n == true) {
        this.dialog = true
      }
    },
    // textSearch(textSearch) {
    //   if (!textSearch) {
    //     this.$emit("search", null);
    //   }
    // },
    r() {
      this.u = null
    },
    from() {
      this.dateFromFormatted = this.formatDate(this.from)
      this.minTo = new Date(this.from).toISOString().substr(0, 10)
    },
    to() {
      this.dateToFormatted = this.formatDate(this.to)
      this.maxFrom = new Date(this.to).toISOString().substr(0, 10)
    },
    labelInfo() {
      this.valueInfo = null
    },
  },
}
</script>
