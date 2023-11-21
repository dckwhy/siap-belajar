<template>
  <v-container grid-list-xl class="pa-0">
    <v-row wrap>
      <v-col cols="12">
        <m-alert show :title="alert.tingkat.judul" :info="alert.tingkat.deskripsi" closable></m-alert>
      </v-col>
      <v-col cols="12">
        <m-card-list
          title="Modul"
          search
          id-key
          refresh
          add
          addText="Modul"
          addHint="Tambah Modul"
          filter
          @refresh="load"
          :items="items"
          footerLabel="Modul"
          @search="(search)=>{textSearch=search;load()}"
          :page="page"
          @change:page="(pg)=>{cp=pg;load()}"
          @add="add"
          footer
        >
          <template v-slot:action>
            <div>portl</div>
          </template>
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
                <p class="caption my-0 py-0 grey--text">Nama Modul</p>
                <p class="subtitle-1 my-0 py-0">{{pVal(item,'nama') | toTitleCase}}</p>
              </td>
              <td>
                <p class="caption my-0 py-0 grey--text">Topik</p>
                <p class="subtitle-1 my-0 py-0">{{pVal(item,'topik')}}</p>
                <p class="caption my-0 py-0 grey--text">Tingkat - Mata Pelajaran</p>
                <p class="subtitle-1 my-0 py-0">{{pVal(item,'tingkat') }} - {{pVal(item,'tingkat')}}</p>
              </td>
              <td>
                <p class="caption my-0 py-0 grey--text">Rating</p>
                <p class="subtitle-1 my-0 py-0">{{pVal(item,'topik')}}</p>
                <p class="caption my-0 py-0 grey--text">Status</p>
                <p class="subtitle-1 my-0 py-0">
                  <v-chip color="success">{{item.status.keterangan}}</v-chip>
                </p>
              </td>
              <td>
                <m-menu left style="float:right" :items="more_menu" :object="item" />
              </td>
            </tr>
          </template>
        </m-card-list>
      </v-col>
      <ChangeDlg ref="dlg" />
    </v-row>
  </v-container>
</template>

<script>
import { ALERT_INFO } from "@/const";
import ChangeDlg from "../../tingkat/components/Form.vue";

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
        // {
        //   title: "Ubah Peran",
        //   click: (i, o) => this.setRole(o)
        // }
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
        .dispatch("tingkat/get", {
          sekolah_id: this.instansi_id,
          params: {
            page: this.cp,
            s: this.textSearch,
            peran: this.peran
          }
        })
        .then(res => {
          this.page = res;
          this.items = res.data;
        })
        .catch(e => e);
    },
    filter(data) {
      this.peran = data.peran;
      this.load();
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
            .dispatch("tingkat/ajukan", { obj: item })
            .then(() => {
              this.$info("Data berhasil diajukan");
            })
            .then(() => this.load())
            .catch(e => e)
        )
        .catch(e => e);
    },
    setRole(item) {
      this.$confirm(
        `Apakah anda yakin akan mengubah peran tingkat sesuai data yang Anda pilih?<br>
        <div class='mt-2 title font-weight-bold text-center red--text text--darken-2'>
          ${item.name}
        </div>
        `,
        {
          role: [
            { id: 2, name: "Kontributor" },
            { id: 3, name: "Kurator" }
          ],
          tingkat: this.itemMapels
        },
        "Ubah Peran",
        item
      )
        .then(res => {
          var obj = {
            user_id: item.id,
            role_id: typeof res.role == "object" ? res.role.id : res.role,
            tingkat: res.tingkat
            // is_simpatika:
            //   typeof res.tenant === "object" ? res.tenant.id : res.tenant
          };
          this.$store
            .dispatch("tingkat/setRole", obj)
            .then(() => {
              this.load();
              this.$info("Ubah peran tingkat berhasil");
            })
            .catch(e => e);
        })
        .catch(e => e);
    },
    detail(item) {
      this.$refs.detailDlg.open(item);
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
    link(item) {
      window.open(item.link, "_blank");
    },
    hapus(item) {
      this.$confirm(
        `Apakah Anda yakin akan menghapus tingkat ini ?<br>
        <div class="mt-2 title grow text-center">
          ${item.name}<br>
        </div>`,
        {
          cancelOnly: item.laporan_accepted_count > 0 ? true : false
        }
      )
        .then(() => this.$store.dispatch("tingkat/drop", item))
        .then(() => {
          this.$info("User " + item.name + " berhasil dihapus");
        })
        .then(() => this.load())
        .catch(e => e);
    }
  },
  watch: {}
};
</script>
