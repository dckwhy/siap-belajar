<template>
  <m-dialog
    ref="dlg"
    :btnsave="false"
    :title="modul && modul.user_id ? 'Ubah Materi':'Tambah Materi'"
  >
    <v-row row wrap justify="center" align="center">
      <v-col cols="12" sm="12" md="10" lg="8" xl="8">
        
        <v-card flat  class="pb-5 py-5">
        <v-row class="mx-2" >
          <v-col cols="12" class="pa-5">
            <m-alert
              show
              :title="alert.modul.form.judul"
              :info="alert.modul.form.deskripsi"
              closable
            ></m-alert>
          </v-col>
        </v-row>
          <v-card-text class="mt-2 pa-5 pb-0">
            <v-form autocomplete="off" @submit.prevent data-vv-scope="form" lazy-validation>
              <v-row wrap>
                <v-col cols="12" class="py-0 px-5">
                  <v-text-field
                    outlined
                    dense
                    autocomplete="off"
                    name="Nama"
                    placeholder="Isikan Nama"
                    label="Nama"
                    v-model="modul.nama"
                    persistent-hint
                    data-vv-name="nama"
                    data-vv-as="Nama"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.nama')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0  px-5">
                  <v-textarea
                    outlined
                    autocomplete="off"
                    name="Deskripsi"
                    placeholder="Isikan Deskripsi"
                    label="Deskripsi"
                    v-model="modul.keterangan"
                    persistent-hint
                    data-vv-name="keterangan"
                    data-vv-as="Deskripsi"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.keterangan')"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6"  class="py-0  px-5">
                  <v-select
                    outlined
                    dense
                    autocomplete="off"
                    v-model="modul.tingkat"
                    :items="itemTingkats"
                    no-data-text="Data Tidak Tersedia"
                    placeholder="Pilih Tingkat"
                    label="Tingkat"
                    name="Tingkat"
                    item-value="id"
                    item-text="keterangan2"
                    return-object
                    @change="changeTingkat"
                    data-vv-name="tingkat"
                    data-vv-as="Tingkat"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.tingkat')"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6" class="py-0  px-5">
                  <v-autocomplete
                    outlined
                    dense
                    autocomplete="off"
                    v-model="modul.mapel"
                    :items="itemMapels"
                    no-data-text="Data Tidak Tersedia"
                    placeholder="Pilih Mata Pelajaran"
                    label="Rekomendasi Mata Pelajaran"
                    name="Mata Pelajaran"
                    item-value="id"
                    item-text="keterangan"
                    data-vv-name="mapel"
                    return-object
                    data-vv-as="Mata Pelajaran"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.mapel')"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" class=" px-5">
                  <v-autocomplete
                    outlined
                    dense
                    autocomplete="off"
                    v-model="modul.pengelola"
                    :items="itemUsers"
                    no-data-text="Data Tidak Tersedia"
                    placeholder="Pilih Pengelola"
                    label="Pengelola"
                    name="Pengelola"
                    multiple
                    item-value="id"
                    item-text="name"
                    return-object
                    data-vv-name="pengelola"
                    data-vv-as="Pengelola"
                    v-validate="'required'"
                    :error-messages="errors.collect('form.pengelola')"
                  >
                    <template v-slot:selection="data">
                      <v-chip v-bind="data.attrs" :input-value="data.selected" @click="data.select">
                        <v-avatar left>
                          <v-img
                            :src="data.item.avatar?data.item.avatar:'https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png'"
                          ></v-img>
                        </v-avatar>
                        {{ data.item.name }}
                      </v-chip>
                    </template>
                  </v-autocomplete>
                </v-col>
                
              </v-row>
            </v-form>
          </v-card-text>
          
              <v-divider class="mx-5"></v-divider>
              <v-col cols="12" class="pa-5 mb-5">
                  <m-button
                  right absolute
                    text="Simpan Materi Saya"
                    icon="mdi-content-save"
                    action="save"
                    @save="save"
                  ></m-button>
                </v-col>
        </v-card>
      </v-col>
    </v-row>
  </m-dialog>
</template>

<script>
import { ALERT_INFO } from "@/const";
export default {
  $_veeValidate: {
    validator: "new"
  },
  components: {},

  data() {
    return {
      modul: {},
      searchInput: "",
      defModul: {
        nama: ""
      },
      itemTingkats: [],
      itemMapels: [],
      itemUsers: [],
      alert: ALERT_INFO
    };
  },
  methods: {
    // eslint-disable-next-line
    open(obj) {
      this.loadUser();
      this.loadTingkat();
      this.modul = obj ? { ...obj } : { ...this.defModul };
      if (obj) {
        this.loadMapel(obj.tingkat_id);
      }
      let x = this.$refs.dlg.open();
      this.$validator.reset();
      return x;
    },

    // eslint-disable-next-line
    loadTingkat() {
      return this.$store
        .dispatch("tingkat/get", {
          sekolah_id: this.instansi_id,
          params: {}
        })
        .then(res => {
          return (this.itemTingkats = res);
        })
        .catch(e => e);
    },

    // eslint-disable-next-line
    loadUser() {
      return this.$store
        .dispatch("user/getAllUser", {
          sekolah_id: this.instansi_id,
          params: {
            s: this.searchInput
          }
        })
        .then(res => {
          return (this.itemUsers = res);
        })
        .catch(e => e);
    },

    // eslint-disable-next-line
    loadMapel() {
      return this.$store
        .dispatch("mapel/getAll", {
          sekolah_id: this.instansi_id,
          params: {
            tingkat_id: this.modul.tingkat.id
          }
        })
        .then(res => {
          return (this.itemMapels = res);
        })
        .catch(e => e);
    },

    changeTingkat() {
      this.modul.mapel = null;
      this.loadMapel();
    },

    // eslint-disable-next-line
    save() {
      this.$validator
        .validateAll("form")
        .then(res => {
          if (!res) return Promise.reject();
          return res;
        })
        .then(() => {
          return this.$store
            .dispatch("modul/form", {
              sekolah_id: this.instansi_id,
              obj: this.modul
            })
            .then(() => {
              this.$info("Simpan Data Berhasil");
              this.$refs.dlg.resolve();
            })
            .catch(e => e);
        })
        .catch(e => e);
    }
  }
};
</script>


