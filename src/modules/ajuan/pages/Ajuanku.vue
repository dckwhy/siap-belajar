<template>
  <v-container class="pa-2" fluid v-if="ajuan">
    <m-alert class="my-0" show :color="$ajuan.statusColor(ajuan.status.id)">
      <template>
        <p :class="$ajuan.statusColor(ajuan.status.id) + '--text font-weight-bold my-0 py-0'">
          Status Ajuan {{ pVal(ajuan.status, 'keterangan') | toTitleCase }}
        </p>
        <p v-if="ajuan.status_id == 4">{{ pVal(ajuan, 'keterangan') }}</p>
      </template>
    </m-alert>
    <v-row class="pt-4">
      <v-col cols="12">
        <v-expansion-panels v-model="panels">
          <v-expansion-panel class="my-2 rounded-lg">
            <v-expansion-panel-header class="title">
              Biodata
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-divider></v-divider>
              <v-row wrap class="mt-1">
                <v-col class="text-center" cols="12" sm="12" md="3" lg="3" align-end colbox>
                  <v-img
                    class="mt-2"
                    max-height="400"
                    max-width="200"
                    :src="'https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png'"
                    alt="avatar"
                  ></v-img>
                </v-col>
                <v-col cols="12" sm="12" md="9" lg="9">
                  <v-row>
                    <v-col cols="12" sm="12" md="4" lg="4">
                      <v-list>
                        <m-list-tile-info label="NIK" :value="pVal(ajuan, 'nik')" />
                        <m-list-tile-info label="Nama" :value="pVal(ajuan, 'nama')" />
                        <m-list-tile-info label="NISN" :value="pVal(ajuan, 'nisn')" />
                        <m-list-tile-info label="No Induk" :value="pVal(ajuan, 'no_induk')" />
                      </v-list>
                    </v-col>
                    <v-col cols="12" sm="12" md="8" lg="8">
                      <v-list>
                        <m-list-tile-info label="Tahun Masuk" :value="pVal(ajuan, 'tahun_masuk')" />
                        <m-list-tile-info label="Jenis Kelamin" :value="pVal(ajuan, 'kelamin')" />
                        <v-list-item>
                          <v-list-item-content class="my-1 py-0">
                            <v-list-item-subtitle class="caption">TTL</v-list-item-subtitle>
                            <slot name="value">
                              <span class="subtitle-1 font-weight-normal">
                                {{ pVal(ajuan, 'tempat_lahir') }}, {{ pVal(ajuan, 'tanggal_lahir') | toSD }}
                              </span>
                            </slot>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-content class="my-1 py-0">
                            <v-list-item-subtitle class="caption">Scan KK</v-list-item-subtitle>
                            <div>
                              <v-chip label color="success" @click="downloadKK(ajuan)">
                              <v-icon class="mr-1">mdi-file-check</v-icon>Scan KK
                              </v-chip>
                            </div>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel class="my-2 rounded-lg">
            <v-expansion-panel-header class="title">
              Alamat
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-divider></v-divider>
              <v-row>
                <v-col class="mb-0 pb-0" cols="12" sm="12" md="12" lg="12">
                  <v-divider></v-divider>
                  <m-list-tile-info class="mt-3" label="Alamat" :value="pVal(ajuan, 'alamat')" />
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <v-list>
                    <m-list-tile-info label="Provinsi" :value="pVal(ajuan, 'propinsi')" />
                    <m-list-tile-info label="Kecamatan" :value="pVal(ajuan, 'kecamatan')" />
                    <m-list-tile-info label="RT" :value="ajuan.rt" />
                  </v-list>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <v-list>
                    <m-list-tile-info label="Kota" :value="pVal(ajuan, 'kota')" />
                    <m-list-tile-info label="Kelurahan" :value="pVal(ajuan, 'kelurahan')" />

                    <m-list-tile-info label="RW" :value="pVal(ajuan, 'rw')" />
                  </v-list>
                </v-col>
              </v-row>
              <Peta :latitude="ajuan.latitude" :longitude="ajuan.longitude" />
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel class="my-2 rounded-lg">
            <v-expansion-panel-header class="title">
              Rapor
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-divider></v-divider>
              <v-row class="mt-1 mb-5" v-for="rapor in ajuan.rapor" :key="rapor.index">
                <v-col cols="12" sm="12" md="12" lg="12" class="body-1 black--text font-weight-bold grey lighten-4">Semester {{ pVal(rapor, 'semester') }}</v-col>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-row>
                    <v-col
                      class="pb-1"
                      cols="2"
                      sm="2"
                      md="2"
                      lg="2"
                      v-for="item in rapor.daftar_nilai"
                      :key="item.index"
                    >
                      <span class="caption grey--text">{{ item.mapel.keterangan }}</span>
                      <p class=" my-0 py-0 black--text">{{ item.nilai }}</p>
                    </v-col>

                <v-col cols="12" sm="12" md="2" lg="2">
                  <v-chip class="ml-auto" label color="success" @click="download(rapor)">
                    <v-icon class="mr-1">mdi-file-eye</v-icon>Dokumen
                  </v-chip></v-col
                >
                  </v-row>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel class="my-2 rounded-lg">
            <v-expansion-panel-header class="title">
              Prestasi
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-divider></v-divider>
              <v-row v-for="item in ajuan.prestasi" :key="item.index">
                <v-col cols="12" sm="12" md="6" lg="6">
                  <v-list>
                    <m-list-tile-info label="Nama Prestasi" :value="pVal(item, 'nama')" />
                    <m-list-tile-info label="Jenis Prestasi" :value="pVal(item.jenis_prestasi, 'keterangan')" />
                    <m-list-tile-info label="Jumlah Peserta" :value="pVal(item, 'jumlah_peserta')" />
                    <m-list-tile-info label="Keterangan" :value="pVal(item, 'keterangan')" />
                  </v-list>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6">
                  <v-list>
                    <m-list-tile-info label="Wilayah" :value="pVal(item.lingkup, 'keterangan')" />
                    <m-list-tile-info label="Peringkat" :value="pVal(item, 'peringkat')" />
                    <m-list-tile-info label="Tanggal Capaian" :value="pVal(item, 'tanggal_capaian') | toSD" />
                    <v-list-item>
                      <v-chip label color="success" @click="download(item)">
                        <v-icon class="mr-1">mdi-file-check</v-icon>Lihat Dokumen
                      </v-chip>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
  <div v-else>
    <m-alert type="info" show info="Data Ajuan Anda tidak ditemukan"> </m-alert>
  </div>
</template>
<script>
import Peta from '../components/Peta.vue'
export default {
  components: {
    Peta,
  },
  data() {
    return {
      e1: 1,
      ajuan: null,
      panels: 0,
    }
  },
  mounted() {
    this.load()
  },

  methods: {
    load() {
      return this.$store
        .dispatch('ajuan/ajuanku', {
          sekolah_id: this.$route.params.instansi_id,
          ajuan_id: this.$route.params.ajuan_id,
        })
        .then((res) => {
          this.ajuan = res && res.id ? res : null
        })
        .catch((e) => e)
    },
    download(item) {
      if (item.file) {
        window.open(item.file, '_blank')
      } else {
        this.$error('Dokumen tidak tersedia')
      }
    },
    downloadKK(item) {
      if (item.file_kk) {
        window.open(item.file_kk, '_blank')
      } else {
        this.$error('Dokumen tidak tersedia')
      }
    },
    setujui(item) {
      this.$confirm(
        `Apakah Anda yakin akan menyetujui Ajuan ini?<br>
        <div class="mt-2 title grow text-center">
          ${item.nisn}<br>
          ${item.nama}<br>
        </div>`
      ).then(() =>
        this.$store
          .dispatch('ajuan/persetujuan', {
            sekolah_id: this.instansi_id,
            ajuan_id: this.ajuan_id,
            obj: {
              status_id: 2,
            },
          })
          .then((res) => {
            if (res.errors) {
              this.$error('Persetujuan Data Gagal')
            } else {
              this.$info('Persetujuan Data Berhasil')
            }
          })
          .then(() => this.load())
          .catch((e) => e)
      )
    },
    tolak(item) {
      this.$confirm(
        `Apakah Anda yakin akan menolak Ajuan ini?<br>
        <div class="mt-2 title grow text-center">
          NISN: ${item.nisn}<br>
          Nama: ${item.nama}<br>
        </div>`
      ).then(() =>
        this.$store
          .dispatch('ajuan/persetujuan', {
            sekolah_id: this.instansi_id,
            ajuan_id: this.ajuan_id,
            obj: {
              status_id: 3,
            },
          })
          .then((res) => {
            if (res.errors) {
              this.$error('Ajuan gagal ditolak')
            } else {
              this.$info('Ajuan berhasil ditolak')
            }
          })
          .then(() => this.load())
          .catch((e) => e)
      )
    },
  },
}
</script>
<style>
.v-expansion-panel{
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
}
.v-expansion-panel-header .title{
  border-top: none !important;
}
.v-expansion-panel:not(:first-child)::after{
  border-top: none !important;
}
.v-expansion-panel::before{
  box-shadow: none !important;
}
</style>
