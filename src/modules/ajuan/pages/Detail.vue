<template>
  <v-container class="pa-2" fluid v-if="ajuan">
    <m-breadcrum :items="bread"></m-breadcrum>
    <v-row class="py-2 mb-5">
      <v-col cols="12"
        ><v-stepper v-model="e1" alt-labels>
          <v-stepper-header class="elevation-0 mt-5">
            <v-stepper-step :complete="e1 > 1" step="1">
              Biodata Diri
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">
              Rapor
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">
              Prestasi
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card>
                <v-card-text>
                  <v-row wrap>
                    <v-col class="text-center" cols="12" sm="12" md="3" lg="3" align-end colbox>
                      <v-img
                        class="mt-2"
                        max-height="400"
                        max-width="200"
                        :src="
                          ajuan.foto ? ajuan.foto : 'https://cdn.siap.id/s3/asset illustrasi/Illustrasi/bg-default.png'
                        "
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
                                  <span class="subtitle-1 font-weight-normal"
                                    >{{ pVal(ajuan, 'tempat_lahir') }}, {{ pVal(ajuan, 'tanggal_lahir') | toSD }}</span
                                  >
                                </slot>
                              </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <m-button
                                :icon="ajuan.kk ? 'mdi-eye' : 'mdi-file-alert'"
                                :color="ajuan.kk ? 'success' : 'error'"
                                :text="ajuan.kk ? 'Scan KK' : 'Scan KK Tidak Tersedia'"
                                :action="ajuan.kk ? 'downloadKK' : ''"
                                @downloadKK="downloadKK(ajuan)"
                              ></m-button>
                            </v-list-item>
                          </v-list>
                        </v-col>
                        <v-col class="mb-0 pb-0" cols="12" sm="12" md="12" lg="12">
                          <v-divider></v-divider>
                          <m-list-tile-info class="mt-3" label="Alamat" :value="pVal(ajuan, 'alamat')" />
                        </v-col>
                        <v-col cols="12" sm="12" md="4" lg="4">
                          <v-list>
                            <m-list-tile-info label="Provinsi" :value="pVal(ajuan, 'propinsi')" />
                            <m-list-tile-info label="Kecamatan" :value="pVal(ajuan, 'kecamatan')" />
                            <m-list-tile-info label="RT" :value="ajuan.rt" />
                          </v-list>
                        </v-col>
                        <v-col cols="12" sm="12" md="4" lg="4">
                          <v-list>
                            <m-list-tile-info label="Kota" :value="pVal(ajuan, 'kota')" />
                            <m-list-tile-info label="Kelurahan" :value="pVal(ajuan, 'kelurahan')" />

                            <m-list-tile-info label="RW" :value="pVal(ajuan, 'rw')" />
                          </v-list>
                        </v-col>
                      </v-row>
                      <Peta :latitude="ajuan.latitude" :longitude="ajuan.longitude" />
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-divider class="mb-3"></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="e1 = 2">
                    Lanjut
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card>
                <v-card-text>
                  <v-row v-for="rapor in ajuan.rapor" :key="rapor.index" class="mb-5">
                    <v-col cols="12" sm="12" md="12" lg="12" class="black--text body-1 grey lighten-4 font-weight-bold"
                      >Semester {{ pVal(rapor, 'semester') }}</v-col
                    >
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
                          <p class="my-0 py-0 black--text">{{ item.nilai }}</p>
                        </v-col>
                        <v-col cols="12" sm="12" md="2" lg="2">
                          <v-chip class="ml-auto" label color="success" @click="download(rapor)">
                            <v-icon class="mr-1">mdi-file-eye</v-icon>Dokumen
                          </v-chip>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <m-alert
                    v-if="ajuan.rapor.length == 0"
                    show
                    icon="mdi-alert"
                    color="warning"
                    info="Daftar Rapor tidak tersedia"
                  ></m-alert>
                </v-card-text>

                <v-divider class="mb-3"></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="e1 = 1">
                    Kembali
                  </v-btn>
                  <v-btn color="primary" @click="e1 = 3">
                    Lanjut
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card>
                <v-card-title>Daftar Prestasi</v-card-title>
                <v-card-text>
                  <v-row v-for="item in ajuan.prestasi" :key="item.index">
                    <v-col cols="12" sm="12" md="6" lg="6">
                      <v-list>
                        <m-list-tile-info label="Nama Prestasi" :value="pVal(item, 'nama')" />
                        <m-list-tile-info label="Jenis Prestasi" :value="pVal(item.jenis_prestasi, 'keterangan')" />
                        <m-list-tile-info
                          label="Jumlah Peserta"
                          :value="pVal(item.jumlah_peserta, 'keterangan') + ' Orang'"
                        />
                        <m-list-tile-info label="Keterangan" :value="pVal(item, 'keterangan')" />
                      </v-list>
                    </v-col>
                    <v-col cols="12" sm="12" md="6" lg="6">
                      <v-list>
                        <m-list-tile-info label="Wilayah" :value="pVal(item.lingkup, 'keterangan')" />
                        <m-list-tile-info label="Peringkat" :value="pVal(item.peringkat, 'keterangan')" />
                        <m-list-tile-info label="Tanggal Capaian" :value="pVal(item, 'tanggal_capaian') | toSD" />
                        <v-list-item>
                          <m-button
                            :icon="item.path ? 'mdi-eye' : 'mdi-file-alert'"
                            :color="item.path ? 'success' : 'error'"
                            :text="item.path ? 'Lihat Dokumen' : 'Tidak Tersedia'"
                            :action="item.path ? 'download' : ''"
                            @download="download(item)"
                          ></m-button>
                        </v-list-item>
                      </v-list>
                    </v-col>
                  </v-row>
                  <m-alert
                    v-if="ajuan.prestasi.length == 0"
                    show
                    icon="mdi-alert"
                    color="warning"
                    info="Daftar Prestasi tidak tersedia"
                  ></m-alert>
                </v-card-text>

                <v-divider class="mb-3"></v-divider>

                <v-card-actions>
                  <v-btn text @click="e1 = 1">
                    Kembali
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn v-if="ajuan.status_id == 2 && isCan('ajuan')" color="error" @click="tolak(ajuan)">
                    Tolak
                  </v-btn>
                  <v-btn v-if="ajuan.status_id == 2 && isCan('ajuan')" color="success" @click="setujui(ajuan)">
                    Verifikasi
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper></v-col
      >
    </v-row>
  </v-container>
</template>
<script>
import Peta from '../components/Peta.vue'
export default {
  components: {
    Peta,
  },
  computed: {
    bread() {
      return [
        {
          icon: 'mdi-library-books',
          title: 'Ajuan PPDB',
          to: { name: 'ajuan', params: { instansi_id: this.instansi_id } },
        },
        {
          icon: 'mdi-edit',
          title: this.ajuan.nama,
        },
      ]
    },
  },
  data() {
    return {
      e1: 1,
      ajuan: null,
    }
  },
  activated() {
    this.load()
    this.e1 = 1
  },
  methods: {
    load() {
      return this.$store
        .dispatch('ajuan/detail', {
          sekolah_id: this.$route.params.instansi_id,
          ajuan_id: this.$route.params.ajuan_id,
        })
        .then((res) => {
          this.ajuan = res
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
      if (item.kk) {
        window.open(item.kk, '_blank')
      } else {
        this.$error('Dokumen tidak tersedia')
      }
    },
    setujui(item) {
      this.$confirm(
        `Apakah Anda yakin akan menyetujui Ajuan ini?<br>
        <div class="mt-2 title grow text-center">
           NISN: ${this.$tools.pVal(item, 'nisn')}<br>
          Nama: ${this.$tools.pVal(item, 'nama')}<br>
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
              this.$error('Persetujuan Data Gagal')
            } else {
              this.$info('Persetujuan Data Berhasil')
              this.$router.push({ name: 'ajuan' })
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
          NISN: ${this.$tools.pVal(item, 'nisn')}<br>
          Nama: ${this.$tools.pVal(item, 'nama')}<br>
        </div>`,
        {
          keterangan: {
            label: 'Silakan Tulis Alasan penolakan di Sini',
          },
        },
        'Alasan menolak ajuan ini'
      )
        .then((res) => {
          item.keterangan = res.keterangan
        })
        .then(() =>
          this.$store
            .dispatch('ajuan/persetujuan', {
              sekolah_id: this.instansi_id,
              ajuan_id: this.ajuan_id,
              obj: {
                status_id: 4,
                keterangan: item.keterangan,
              },
            })
            .then((res) => {
              if (res.errors) {
                this.$error('Ajuan gagal ditolak')
              } else {
                this.$info('Ajuan berhasil ditolak')
                this.$router.push({ name: 'ajuan' })
              }
            })
            .then(() => this.load())
            .catch((e) => e)
        )
    },
  },
}
</script>
