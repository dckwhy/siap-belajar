<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12">
        <m-alert show :title="alert.ruang.list.judul" :info="alert.ruang.list.deskripsi" closable></m-alert>
      </v-col>
      <v-col cols="12">
        <m-card-list
          title="Daftar Ruang"
          search
          id-key
          add
          addText="Ruang"
          addHint="Tambah Ruang"
          filter
          @refresh="load"
          :items="items"
          footerLabel="Ruang"
          @search="(search)=>{textSearch=search;load()}"
          :page="page"
          @change:page="(pg)=>{cp=pg;load()}"
          @add="add"
          footer
        >
          <template v-slot:items="{props,item}">
            <v-container>
              <v-row>
                <v-col cols="7" lg="10" md="10" sm="10">
                  <v-row>
                    <v-col class="py-0" cols="12" md="5" sm="5">
                      <p class="subtitle-1 my-0 py-0 mt-n2">{{pVal(item,'keterangan')}}</p>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col lg="1" md="1" sm="1" cols="1">
                  <m-menu
                    right
                    class="clearfix"
                    style="float:right"
                    :items="more_menu"
                    :object="item"
                  />
                </v-col>
              </v-row>
            </v-container>
            <v-divider />
          </template>
        </m-card-list>
      </v-col>
      <ChangeDlg ref="dlg" />
    </v-row>
  </v-container>
</template>

<script>
import { ALERT_INFO } from "@/const";
import ChangeDlg from "../../ruang/components/Form.vue";

export default {
  components: {
    ChangeDlg
    // DetailDlg
  },
  data() {
    return {
      alert: ALERT_INFO,
      items: [],
      itemMapels: [],
      peran: null,
      textSearch: null,
      page: null,
      cp: 1,
      more_menu: [
        // eslint-disable-next-line
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
        { text: "", align: "left", value: "" },
        { text: "", align: "left", value: "" },
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
        .dispatch("ruang/get", {
          sekolah_id: this.instansi_id,
          params: {
            page: this.cp,
            s: this.textSearch
          }
        })
        .then(res => {
          this.page = res;
          this.items = res.data;
        })
        .catch(e => e);
    },
    filter() {
      this.load();
    },
    add() {
      this.$refs.dlg.open().then(() => {
        this.load();
      });
    },
    edit(item) {
      this.$refs.dlg.open(item).then(() => {
        this.load();
      });
    },
    hapus(item) {
      this.$confirm(
        `Apakah Anda yakin akan menghapus mata pelajaran ini ?<br>
        <div class="mt-2 title grow text-center">
          ${item.keterangan}<br>
        </div>`
      )
        .then(() =>
          this.$store.dispatch("ruang/drop", {
            sekolah_id: this.instansi_id,
            obj: item
          })
        )
        .then(() => {
          this.$info("Ruang " + item.keterangan + " berhasil dihapus");
        })
        .then(() => this.load())
        .catch(e => e);
    }
  },
  watch: {}
};
</script>
