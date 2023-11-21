<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12" class="ma-0">
        <m-alert show :title="alert.modul.list.judul" :info="alert.modul.list.deskripsi" closable></m-alert>
      </v-col>
      <v-col cols="12">
        <m-card-list
          title="Daftar Materi Anda"
          search
          id-key
          @refresh="load"
          :items="items"
          footerLabel="Materi"
          @search="(search)=>{textSearch=search;load()}"
          :page="page"
          @change:page="(pg)=>{cp=pg;load()}"
          @add="add"
          footer
        >
          <template v-slot:filter>
            <FilterModul @filter="filter" />
          </template>
          <template v-slot:items="{props,item}">
            <v-container>
              <v-row>
                <v-col cols="3" lg="1" md="1" sm="1">
                  <v-avatar width="25" :size="45" color="grey lighten-4">
                    <v-img
                      :src="item.foto?item.foto.url.thumbnail:'https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png'"
                      alt="avatar"
                    />
                  </v-avatar>
                </v-col>
                <v-col cols="7" lg="10" md="10" sm="10">
                  <v-row>
                    <v-col class="py-0" cols="12" md="5" sm="5">
                      <p class="caption my-0 py-0 grey--text">Nama Materi</p>
                      <p class="subtitle-1 my-0 py-0 mt-n2">{{pVal(item,'nama') | toTitleCase}}</p>
                    </v-col>
                    <v-col class="py-0" cols="12" md="4" sm="4">
                      <p class="caption my-0 py-0 grey--text">Tingkat - Mata Pelajaran</p>
                      <p
                        class="subtitle-1 my-0 py-0 mt-n2"
                      >{{pVal(item.tingkat,'keterangan2') }} - {{pVal(item.mapel,'keterangan')}}</p>
                    </v-col>
                    <!-- <v-col class="py-0" cols="12" md="3" sm="3">
                      <p class="caption my-0 py-0 grey--text">Rating</p>
                      <p class="subtitle-1 my-0 py-0 mt-n2">
                        <v-rating
                          background-color="greyprimary"
                          color="orange"
                          v-model="item.rating"
                          readonly
                        ></v-rating>
                      </p>
                    </v-col>-->
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
import ChangeDlg from "../../modul/components/Form.vue";
import FilterModul from "@/filter/FilterModul.vue";

export default {
  components: {
    ChangeDlg,
    FilterModul
  },
  data() {
    return {
      alert: ALERT_INFO,
      items: [],
      itemMapels: [],
      filtered: {
        tingkat: null,
        mapel: null,
        status: null
      },
      textSearch: null,
      page: null,
      cp: 1,
      more_menu: [
        // eslint-disable-next-line
        {
          title: "Tautan Materi",
          click: (i, o) => this.course(o)
        },
        {
          title: "Ubah",
          click: (i, o) => this.edit(o)
        },
        {
          title: "Hapus",
          click: (i, o) => this.delete(o)
        }
      ]
    };
  },
  computed: {
    headers() {
      const a = [
        { text: "", align: "left", value: "" },
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
        .dispatch("modul/get", {
          sekolah_id: this.instansi_id,
          params: {
            page: this.cp,
            s: this.textSearch,
            tingkat_id: this.filtered.tingkat,
            mapel_id: this.filtered.mapel,
            status: this.filtered.status
          }
        })
        .then(res => {
          this.page = res;
          this.items = res.data;
        })
        .catch(e => e);
    },
    filter(data) {
      this.filtered = data;
      this.load();
    },
    course(val) {
      if (val.link_moodle) {
        window.open(val.link_moodle, "_blank");
      } else {
        return this.$store
          .dispatch("modul/sync", {
            sekolah_id: this.instansi_id,
            modul_id: val.id
          })
          .then(res => {
            window.open(res.link_moodle, "_blank");
          })
          .catch(e => e);
      }
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
    delete(item) {
      this.$confirm(
        `Apakah Anda yakin akan menghapus modul ini ?<br>
        <div class="mt-2 title grow text-center">
          ${item.nama}<br>
        </div>`
      )
        .then(() =>
          this.$store.dispatch("modul/drop", {
            sekolah_id: this.instansi_id,
            obj: item
          })
        )
        .then(() => {
          this.$info("Materi " + item.nama + " berhasil dihapus");
        })
        .then(() => this.load())
        .catch(e => e);
    }
  },
  watch: {}
};
</script>
