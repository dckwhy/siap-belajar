<template>
  <m-dialog ref="dlg" :btnsave="false" :title="siswappdb && siswappdb.id ? 'Detail Ajuan Siswa' : 'Tambah Ajuan Siswa'">
    <v-row row wrap justify="center" align="center" v-if="siswappdb">
      <v-col cols="12" sm="12" md="10" lg="8" xl="8">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="12" class="mt-0 pt-0 mb-3 pb-3">
                <div class="primary white--text title pa-2 mb-4">Biodata Diri</div>
                <v-row wrap no-gutters>
                  <v-col cols="12" sm="12" md="12" lg="12" align-end colbox>
                    <div class="blue lighten-5 pa-2" style="height:100%">
                      <span class="title ml-4 black--text">Biodata</span>
                      <v-divider class="my-2"></v-divider>
                      <v-row no-gutters>
                        <v-col cols="12" sm="12" md="6" lg="6">
                          <m-list-tile-info label="NISN" :value="pVal(siswappdb, 'nisn')" />
                          <m-list-tile-info label="Nama" :value="pVal(siswappdb, 'nama')" />
                          <m-list-tile-info label="Jenis Kelamin" :value="pVal(siswappdb, 'jenis_kelamin')" />

                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-subtitle>Tempat, Tgl Lahir</v-list-item-subtitle>
                              <v-list-item-title
                                >{{ pVal(siswappdb, 'tempat_lahir') }},&nbsp;{{
                                  pVal(siswappdb, 'tanggal_lahir') | toSD
                                }}</v-list-item-title
                              >
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                        <v-col cols="12" sm="12" md="6" lg="6">
                          <m-list-tile-info label="NIK" :value="pVal(siswappdb, 'nik')" />
                          <m-list-tile-info label="No KK" :value="pVal(siswappdb, 'nomer_kk')" />
                          <m-list-tile-info label="Asal Sekolah" :value="pVal(siswappdb, 'asal_sekolah')" />
                          <m-list-tile-info
                            label="Akreditasi Sekolah Asal"
                            :value="pVal(siswappdb, 'asal_sekolah_akreditasi')"
                          />
                        </v-col>
                      </v-row>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="mt-4 black--text">
                      <p
                        >Terdaftar dalam Data Terpadu Kesejahteraan Sosial (DTKS) dan/atau menyertakan bukti kepemilikan
                        Kartu Indonesia Pintar (KIP) yang diterbitkan Kemdikbud?
                        <span class="font-weight-bold">{{ siswappdb.siswa_dinsos ? 'Ya' : 'Tidak' }}</span>
                      </p>

                      <p
                        >Calon peserta didik yang berasal dari panti asuhan didasarkan atas data pada Dinas Sosial
                        Provinsi?
                        <v-chip class="orange--text text--darken-2" small label color="orange lighten-5"
                          ><v-icon small color="orange">mdi-timelapse</v-icon>&nbsp;Dalam Proses Integrasi</v-chip
                        >

                        <!-- <span class="font-weight-bold">{{ siswappdb.jawab_sosial_2 ? 'Ya' : 'Tidak' }}</span> -->
                      </p>
                      <p
                        >Calon peserta didik Merupakan anak guru?
                        <span class="font-weight-bold">{{ siswappdb.is_anak_guru ? 'Ya' : 'Tidak' }}</span>
                      </p>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <div class="primary white--text title pa-2 mb-4">Alamat</div>
                <v-row no-gutters>
                  <v-col cols="12" sm="12" md="12" lg="12" align-end colbox>
                    <div class="blue lighten-5 pa-2" style="height:100%">
                      <span class="title ml-4 black--text">Biodata</span>
                      <v-divider class="my-2"></v-divider>
                      <v-row no-gutters>
                        <v-col cols="12"
                          ><m-list-tile-info label="Alamat" :value="pVal(siswappdb, 'alamat_jalan')"
                        /></v-col>
                        <v-col cols="12" sm="12" md="6" lg="6">
                          <m-list-tile-info label="Propinsi" :value="pVal(siswappdb, 'propinsi')" />
                          <m-list-tile-info label="Kota/kabupaten" :value="pVal(siswappdb, 'kota')" />
                          <m-list-tile-info label="Kecamatan" :value="pVal(siswappdb, 'kecamatan')" />
                          <m-list-tile-info label="Kelurahan" :value="pVal(siswappdb, 'kelurahan')" />
                        </v-col>
                      </v-row>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="12">
                    <div class="blue lighten-5 pa-2" style="height:100%">
                      <p class="ml-3"
                        ><strong>Latitude, Longitude</strong> <br />{{ pVal(siswappdb, 'latitude') }}, &nbsp;{{
                          pVal(siswappdb, 'longitude')
                        }}</p
                      >
                      <Peta :latitude="siswappdb.latitude" :longitude="siswappdb.longitude" />
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <div class="primary white--text title pa-2 mb-4">Rapor</div>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          Matematika
                        </th>
                        <th class="text-left">
                          IPA
                        </th>
                        <th class="text-left">
                          B. Indonesia
                        </th>
                        <th class="text-left">
                          Pendidikan Agama dan Budi Pekerti
                        </th>
                        <th class="text-left">
                          IPS
                        </th>
                        <th class="text-left">
                          Pendidikan Jasmani Olahraga dan Kesehatan
                        </th>
                        <th class="text-left">
                          PPKN
                        </th>
                        <th class="text-left">
                          Seni Budaya dan Prakarya
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in siswappdb.json_rapor" :key="item.index">
                        <td>{{ item.matematika }}</td>
                        <td>{{ item.ilmu_pengetahuan_alam }}</td>
                        <td>{{ item.bahasa_indonesia }}</td>
                        <td>{{ item.pendidikan_agama_dan_budi_pekerti }}</td>
                        <td>{{ item.ilmu_pengetahuan_sosial }}</td>
                        <td>{{ item.pendidikan_jasmani_olah_raga_dan_kesehatan }}</td>
                        <td>{{ item.pendidikan_pancasila_dan_kewarganegaraan }}</td>
                        <td>{{ item.seni_budaya_dan_prakarya }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </m-dialog>
</template>

<script>
import Peta from '../../ajuan/components/Peta.vue'
import Survei from '../components/Survei.vue'
import Dukcapil from '../components/Dukcapil.vue'
export default {
  components: {
    Peta,
    Survei,
    Dukcapil,
  },
  $_veeValidate: {
    validator: 'new',
  },

  data() {
    return {
      setuju: false,
      stepData: 1,
      stepRapor: 1,
      answerList: [
        { key: 'Ya', value: 1 },
        { key: 'Tidak', value: 0 },
      ],
      siswappdb: {
        id: 1,
        user_id: null,
        sekolah_id: 4,
        nik: null,
        nama: null,
        tempat_lahir: null,
        tanggal_lahir: null,
        status_id: 0,
        nisn: null,
        asal_sekolah: null,
        asal_sekolah_akreditasi: null,
        nomer_kk: null,
        latitude: null,
        longitude: null,
        jawab_sosial_1: 0,
        jawab_sosial_2: 0,
        jawab_kesehatan_1: 0,
        jawab_pesantren_1: 0,
        json_rapor: [
          {
            nama: 'Semester 1',
            matematika: 0,
            bind: 0,
            bing: 0,
            ips: 0,
            ipa: 0,
          },
          {
            nama: 'Semester 2',
            matematika: 0,
            bind: 0,
            bing: 0,
            ips: 0,
            ipa: 0,
          },
          {
            nama: 'Semester 3',
            matematika: 0,
            bind: 0,
            bing: 0,
            ips: 0,
            ipa: 0,
          },
          {
            nama: 'Semester 4',
            matematika: 0,
            bind: 0,
            bing: 0,
            ips: 0,
            ipa: 0,
          },
          {
            nama: 'Semester 5',
            matematika: 0,
            bind: 0,
            bing: 0,
            ips: 0,
            ipa: 0,
          },
        ],
        jawab_prestasi_1: 0,
        jawab_prestasi_2: 0,
        json_prestasi_satu: [],
      },
      prestasi: {
        jenis_prestasi: null,
        jumah_peserta: null,
        nama: null,
        wilayah: null,
        peringkat: null,
        tanggal_pencapaian: null,
        keterangan: null,
      },
      siswaDukcapil: {
        nama: null,
        nik: null,
        tempat_lahir: null,
        tanggal_lahir: null,
        no_kk: null,
        update_at: null,
        alamat: null,
        rt: null,
        rw: null,
        kelurahan: null,
        kecamatan: null,
        kota: null,
        provinsi: null,
      },
      defsiswaDukcapil: {
        nama: null,
        nik: null,
        tempat_lahir: null,
        tanggal_lahir: null,
        no_kk: null,
        update_at: null,
        alamat: null,
        rt: null,
        rw: null,
        kelurahan: null,
        kecamatan: null,
        kota: null,
        provinsi: null,
      },
      itemJenisPrestasis: [
        {
          id: 1,
          keterangan: 'Prestasi Akademik Berjenjang',
        },
        {
          id: 2,
          keterangan: 'Prestasi Non Akademik Berjenjang',
        },
        {
          id: 3,
          keterangan: 'Prestasi Akademik Tidak Berjenjang',
        },
        {
          id: 4,
          keterangan: 'Prestasi Non Akademik Tidak Berjenjang',
        },
      ],
      itemJumlahPesertas: [
        {
          id: 1,
          keterangan: 'Individu',
        },
        {
          id: 2,
          keterangan: 'Beregu 2',
        },
        {
          id: 3,
          keterangan: 'Beregu 3',
        },
        {
          id: 4,
          keterangan: 'Beregu 4',
        },
        {
          id: 5,
          keterangan: 'Beregu 5',
        },
        {
          id: 6,
          keterangan: 'Beregu 6',
        },
        {
          id: 7,
          keterangan: 'Beregu 7',
        },
        {
          id: 8,
          keterangan: 'Beregu 8',
        },
        {
          id: 9,
          keterangan: 'Beregu 9',
        },
        {
          id: 10,
          keterangan: 'Beregu 10',
        },
        {
          id: 11,
          keterangan: 'Beregu 11',
        },
        {
          id: 12,
          keterangan: 'Beregu 12',
        },
        {
          id: 13,
          keterangan: 'Beregu lebih dari 12',
        },
      ],
      itemWilayas: [
        {
          id: 1,
          keterangan: 'Internasional',
        },
        {
          id: 2,
          keterangan: 'Nasional',
        },
        {
          id: 3,
          keterangan: 'Propinsi',
        },
        {
          id: 4,
          keterangan: 'Kota/Kabupaten',
        },
        {
          id: 5,
          keterangan: 'Kecamatan',
        },
      ],
      itemPeringkats: [
        {
          id: 1,
          keterangan: 'Juara I',
        },
        {
          id: 2,
          keterangan: 'Juara 2',
        },
        {
          id: 3,
          keterangan: 'Juara III',
        },
        {
          id: 4,
          keterangan: 'Juara Harapan I',
        },
        {
          id: 5,
          keterangan: 'Juara Harapan II',
        },
        {
          id: 6,
          keterangan: 'Juara Harapan III',
        },
      ],
    }
  },
  methods: {
    open(obj) {
      this.setuju = false
      this.stepData = 1
      this.stepRapor = 1
      this.siswaDukcapil = { ...this.defsiswaDukcapil }
      this.$validator.reset()
      this.load(obj)
      return this.$refs.dlg.open()
    },

    // eslint-disable-next-line
    load(obj) {
      return this.$store
        .dispatch('siswappdb/detail', { sekolah_id: this.instansi_id, siswa: obj })
        .then((res) => {
          this.siswappdb = res
          this.prestasi = res.json_prestasi_satu ? res.json_prestasi_satu[0] : this.prestasi
        })
        .catch((e) => e)
    },

    download(item) {
      window.open(item, '_blank')
    },

    simpan(induk, rapor, prestasi) {
      if (this.prestasi && this.prestasi.nama) {
        this.siswappdb.json_prestasi_satu.push(this.prestasi)
      }
      if (this.setuju) {
        this.siswappdb.status_id = 1
      }
      if (rapor) {
        this.$validator
          .validateAll('form')
          .then((res) => {
            if (!res) return Promise.reject()
            return res
          })
          .then(() => {
            return this.$store
              .dispatch('siswappdb/biodata', {
                sekolah_id: this.instansi_id,
                obj: this.siswappdb,
              })
              .then((res) => {
                if (rapor) {
                  this.stepRapor = rapor
                } else {
                  this.stepData = induk
                }

                return res
              })
              .catch((e) => e)
          })
      } else if (prestasi) {
        this.$validator
          .validateAll('form-prestasi')
          .then((res) => {
            if (!res) return Promise.reject()
            return res
          })
          .then(() => {
            return this.$store
              .dispatch('siswappdb/biodata', {
                sekolah_id: this.instansi_id,
                obj: this.siswappdb,
              })
              .then((res) => {
                this.stepData = induk
                return res
              })
              .catch((e) => e)
          })
      } else {
        return this.$store
          .dispatch('siswappdb/biodata', {
            sekolah_id: this.instansi_id,
            obj: this.siswappdb,
          })
          .then((res) => {
            if (rapor) {
              this.stepRapor = rapor
            } else {
              this.stepData = induk
            }

            return res
          })
          .catch((e) => e)
      }
    },
  },
}
</script>
