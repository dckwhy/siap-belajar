<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12">
        <m-card-list
          title
          search
          id-key
          :items="items"
          @search="(search)=>{textSearch=search;load()}"
          :page="page"
          :headers="headers"
          @change:page="(pg)=>{cp=pg;load()}"
          footer
        >
          <template v-slot:items="{props,item}">
            <tr>
              <td width="15">
                <v-avatar :size="45" color="grey lighten-4">
                  <v-img
                    :src="item.foto?item.foto.url.thumbnail:'https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png'"
                    alt="avatar"
                  />
                </v-avatar>
              </td>
              <td>
                <p class="subtitle-1 my-0 py-0">{{pVal(item,'nama') | toTitleCase}}</p>
              </td>
              <td>
                <p class="subtitle-1 my-0 py-0">{{pVal(item.pengajar,'name')}}</p>
              </td>
              <!-- <td>
                <v-chip
                  outlined
                  :color="$mapel.statusColor(item.status.id)"
                >{{pVal(item.status,'keterangan')}}</v-chip>
              </td>-->
            </tr>
          </template>
        </m-card-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      textSearch: null,
      page: null,
      cp: 1,
      more_menu: [
        {
          title: "Ubah",
          click: (i, o) => this.edit(o)
        },
        {
          title: "Hapus",
          click: (i, o) => this.hapus(o)
        }
      ]
    };
  },
  computed: {
    headers() {
      const a = [
        { text: "", align: "left", value: "", sortable: false },
        {
          text: "Kelas Mata Pelajaran",
          align: "left",
          value: "",
          sortable: false
        },
        { text: "Guru Pengampu", align: "left", value: "", sortable: false },
        // {
        //   text: "Status",
        //   align: "left",
        //   value: "",
        //   sortable: false
        // },
        { text: "", sortable: false }
      ];
      return a;
    }
  },
  activated() {
    this.load();
  },
  methods: {
    load() {
      return this.$store
        .dispatch("rombel/get", {
          params: {
            page: this.cp,
            s: this.textSearch,
            tahun: this.filteredData.tahun,
            semester: this.filteredData.semester,
            tingkat: this.filteredData.tingkat,
            status: this.filteredData.status
          }
        })
        .then(res => {
          this.page = res;
          this.items = res.data;
        })
        .catch(e => e);
    },
    filter(data) {
      this.filteredData = data;
      this.load();
    },
    add() {
      this.$refs.dlg.open().then(() => {
        this.load();
      });
    }
  },
  watch: {}
};
</script>
