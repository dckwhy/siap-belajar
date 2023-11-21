<template>
  <m-dialog
    ref="dlgIntegrasi"
    :btnsave="false"
    :title="siswappdb && siswappdb.id ? 'Detail Pengguna' : 'Tambah Pengguna'"
  >
    <v-row row wrap justify="center" align="center" v-if="siswappdb">
      <v-col cols="12" sm="12" md="10" lg="8" xl="8">
        <v-card>
          <v-card-text>
            <p class="title primary--text">Konfirmasi Data</p>
            <v-row>
              <v-col cols="12" class="mt-0 pt-0 mb-3 pb-3">
                <div class="primary white--text title pa-2 mb-4">Biodata Diri</div>
                <v-row wrap no-gutters>
                  <v-col cols="12" sm="12" md="6" lg="6" align-end colbox>
                    <div class="blue lighten-5 mx-1 pa-2" style="height:100%">
                      <span class="title ml-4 black--text">Biodata sesuai Dapodik/Emis</span>
                      <v-divider class="my-2"></v-divider>
                      <m-alert
                        flat
                        class="py-2 mx-3"
                        show
                        icon="mdi-alert"
                        color="grey"
                        info="<span class='black--text'>Jika terdapat data yang tidak sesuai, silakan perbaruhi data di <b>Admin Dapodik/Emis</b><span>"
                      ></m-alert>
                      <br />
                      <m-list-tile-info label="Nama" :value="pVal(siswappdb, 'nama')"/>
                      <m-list-tile-info label="NIK" :value="pVal(siswappdb, 'nik')"/>
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
                      <m-list-tile-info label="NISN" :value="pVal(siswappdb, 'nisn')"/>
                      <m-list-tile-info label="Asal Sekolah" :value="pVal(siswappdb, 'asal_sekolah')"/>
                      <div v-if="siswappdb.sekolah">
                        <m-list-tile-info
                          label="Akreditasi Sekolah"
                          :value="pVal(siswappdb.sekolah.akreditasi, 'nama')"
                        /> </div
                    ></div>
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="6" align-end colbox>
                    <div class="deep-purple lighten-5 mx-1 pa-2" style="height:100%">
                      <span class="title ml-4 black--text">Biodata sesuai Dukcapil</span>
                      <v-divider class="my-2"></v-divider>
                      <m-alert
                        flat
                        class="py-2 mx-3"
                        show
                        icon="mdi-alert"
                        color="grey"
                        info="<span class='black--text'>Jika terdapat data yang tidak sesuai, silakan perbaruhi data di <b>Admin Dukcapil</b></span>"
                      ></m-alert>
                      <br />
                      <Dukcapil :nik="siswappdb.nik" />
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
                        >Terdaftar dalam hasil pendataan putera/puteri tenaga kesehatan dan tenaga pendukungnya yang
                        menangani langsung pasien Covid-19, dan yang melakukan pengamatan dan/atau penelusuran kasus
                        Covid-19 dengan kontak langsung pasien dan/atau orang dengan kasus Covid 19 yang diterbitkan
                        oleh Dinas Kesehatan Provinsi Jawa Tengah?
                      </p>
                      <div class="deep-purple lighten-5 ma-2 pa-2 black--text font-weight-bold">{{
                        siswappdb.siswa_nakes
                          ? 'Terdata pada data Dinas Kesehatan'
                          : 'Tidak masuk pada data dinas kesehatan'
                      }}</div>

                      <div
                        v-if="siswappdb.siswa_nakes"
                        class="deep-purple lighten-5 ma-2 pa-2 black--text"
                        style="height:100%"
                      >
                        <p class="title blue--text mb-0">Data Orang Tua</p>
                        <v-row no-gutters>
                          <v-col md="4" class="font-weight-bold">No KK</v-col>
                          <v-col cols="12" sm="12" md="8" lg="8">: {{ siswappdb.siswa_nakes.no_kk }}</v-col>
                          <v-col cols="12" sm="12" md="4" lg="4" class="font-weight-bold">Nama Orang Tua</v-col>
                          <v-col cols="12" sm="12" md="8" lg="8">: {{ siswappdb.siswa_nakes.nama_ortu }}</v-col>
                          <v-col cols="12" sm="12" md="4" lg="4" class="font-weight-bold">Tempat Kerja</v-col>
                          <v-col cols="12" sm="12" md="8" lg="8">: {{ siswappdb.siswa_nakes.tempat_kerja }}</v-col>
                          <v-col cols="12" sm="12" md="4" lg="4" class="font-weight-bold">Jabatan</v-col>
                          <v-col cols="12" sm="12" md="8" lg="8">: {{ siswappdb.siswa_nakes.jabatan }}</v-col>
                          <v-col cols="12" sm="12" md="4" lg="4" class="font-weight-bold">Alamat, Kabupaten/Kota</v-col>
                          <v-col cols="12" sm="12" md="8" lg="8"
                            >: {{ siswappdb.siswa_nakes.alamat }}, {{ siswappdb.siswa_nakes.kota }}</v-col
                          >
                        </v-row>
                        <p class="title blue--text mt-3 mb-0">Data Calon Peserta Didik</p>
                        <v-row no-gutters>
                          <v-col cols="12" sm="12" md="4" lg="4" class="font-weight-bold">Nama</v-col>
                          <v-col cols="12" sm="12" md="8" lg="8">: {{ siswappdb.siswa_nakes.nama_siswa }}</v-col>
                          <v-col cols="12" sm="12" md="4" lg="4" class="font-weight-bold">NISN</v-col>
                          <v-col cols="12" sm="12" md="8" lg="8">: {{ siswappdb.siswa_nakes.nisn }}</v-col>
                          <v-col cols="12" sm="12" md="4" lg="4" class="font-weight-bold">Asal Sekolah</v-col>
                          <v-col cols="12" sm="12" md="8" lg="8">: {{ siswappdb.siswa_nakes.sekolah_asal }}</v-col>
                        </v-row>
                      </div>
                      <!-- <p>
                        Calon peserta didik yang berasal dari Pondok Pesantren?
                        <v-chip class="orange--text text--darken-2" small label color="orange lighten-5"
                          ><v-icon small color="orange">mdi-timelapse</v-icon>&nbsp;Dalam Proses Integrasi</v-chip
                        >
                        <span class="font-weight-bold">{{ siswappdb.jawab_pesantren_1 ? 'Ya' : 'Tidak' }}</span>
                      </p> -->
                    </div>
                  </v-col>
                  <!-- <v-col cols="12" v-if="siswappdb.jawab_pesantren_1">
                    <div class="primary white--text title pa-2 mb-4">Alamat Pondok Pesantren</div>
                    <p>{{ pVal(siswappdb, 'ponpes_alamat') }}</p>
                    <Peta :latitude="siswappdb.ponpes_latitude" :longitude="siswappdb.ponpes_longitude" />
                  </v-col> -->
                </v-row>
              </v-col>
              <v-col cols="12">
                <div class="primary white--text title pa-2 mb-4">Alamat</div>
                <v-row no-gutters>
                  <v-col cols="12" sm="12" md="6" lg="6">
                    <div class="blue lighten-5 mx-2 pa-2" style="height:100%">
                      <m-alert
                        flat
                        class="py-2 mx-3"
                        show
                        icon="mdi-alert"
                        color="grey"
                        info="<span class='black--text'>Jika terdapat data yang tidak sesuai, silakan perbaruhi data di <b>Admin Dapodik/Emis</b><span>"
                      ></m-alert>
                      <br />
                      <p>Latitude, Longitude ({{ pVal(siswappdb, 'latitude') }},{{ pVal(siswappdb, 'longitude') }})</p>
                      <Peta :latitude="siswappdb.latitude" :longitude="siswappdb.longitude" />
                    </div>
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="6">
                    <div class="deep-purple lighten-5 mx-2 pa-2" style="height:100%">
                      <m-alert
                        flat
                        class="py-2 mx-3"
                        show
                        icon="mdi-alert"
                        color="grey"
                        info="<span class='black--text'>Jika terdapat data yang tidak sesuai, silakan perbaruhi data di <b>Admin Dukcapil</b><span>"
                      ></m-alert>

                      <br />
                      <v-row no-gutters>
                        <v-col cols="12"
                          ><m-list-tile-info label="Alamat" :value="pVal(siswaDukcapil, 'ALAMAT')"
                        /></v-col>
                        <v-col cols="12" sm="12" md="6" lg="6">
                          <m-list-tile-info label="RT" :value="pVal(siswaDukcapil, 'NO_RT')" />
                        </v-col>
                        <v-col cols="12" sm="12" md="6" lg="6">
                          <m-list-tile-info label="RW" :value="pVal(siswaDukcapil, 'NO_RW')" />
                        </v-col>
                        <v-col cols="12" sm="12" md="6" lg="6">
                          <m-list-tile-info label="Kelurahan" :value="pVal(siswaDukcapil, 'KEL_NAME')" />
                        </v-col>
                        <v-col cols="12" sm="12" md="6" lg="6">
                          <m-list-tile-info label="Kecamatan" :value="pVal(siswaDukcapil, 'KEC_NAME')" />
                        </v-col>
                        <v-col cols="12" sm="12" md="6" lg="6">
                          <m-list-tile-info label="Kota" :value="pVal(siswaDukcapil, 'KAB_NAME')" />
                        </v-col>
                        <v-col cols="12" sm="12" md="6" lg="6">
                          <m-list-tile-info label="Provinsi" :value="pVal(siswaDukcapil, 'PROP_NAME')" />
                        </v-col>
                        <v-col cols="12" class="pt-4">
                          <p class="mt-0 pt-0"
                            ><v-chip
                              :class="
                                siswaDukcapil.NIK
                                  ? 'ml-4 green--text text--darken-2'
                                  : 'ml-4 orange--text text--darken-2'
                              "
                              small
                              label
                              :color="siswaDukcapil.NIK ? 'green lighten-5' : 'orange lighten-5'"
                              ><v-icon small :color="siswaDukcapil.NIK ? 'green' : 'orange'">{{
                                siswaDukcapil.NIK ? 'mdi-check' : 'mdi-timelapse'
                              }}</v-icon
                              >&nbsp;{{ siswaDukcapil.NIK ? 'Integrasi Berhasil' : 'Dalam Proses Integrasi' }}</v-chip
                            ></p
                          >
                        </v-col>
                      </v-row>
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
                          Semester
                        </th>
                        <th class="text-left">
                          B. Indonesia
                        </th>
                        <th class="text-left">
                          Matematika
                        </th>
                        <th class="text-left">
                          IPA
                        </th>

                        <th class="text-left">
                          B. Inggris
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in siswappdb.json_rapor" :key="item.index">
                        <td>{{ item.nama }}</td>
                        <td>{{ item.bind }}</td>
                        <td>{{ item.matematika }}</td>
                        <td>{{ item.ipa }}</td>
                        <td>{{ item.bing }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
              <v-col cols="12">
                <div class="primary white--text title pa-2 mb-4">Prestasi</div>
                <p class="black--text">
                  Apakah Siswa berikut memiliki Prestasi?
                  <b>{{ siswappdb.jawab_prestasi_1 ? 'Ya' : 'Tidak' }}</b>
                </p>
                <v-row no-gutters v-if="siswappdb.jawab_prestasi_1 && siswappdb.json_prestasi_satu.length > 0">
                  <v-col cols="12" sm="12" md="12" lg="12"
                    ><m-list-tile-info
                      v-if="siswappdb.json_prestasi_satu[0].jenis_prestasi"
                      label="Jenis Prestasi"
                      :value="pVal(siswappdb.json_prestasi_satu[0].jenis_prestasi, 'keterangan')"
                  /></v-col>
                  <v-col cols="12" sm="12" md="12" lg="12"
                    ><m-list-tile-info
                      v-if="siswappdb.json_prestasi_satu[0].jenis_prestasi.lingkup_id == 99"
                      label="Nama Prestasi Lain"
                      :value="pVal(siswappdb.json_prestasi_satu[0], 'jenis_prestasi_lain')"
                  /></v-col>
                  <v-col cols="12" sm="12" md="6" lg="6">
                    <m-list-tile-info
                      label="Nomor Piagam"
                      :value="pVal(siswappdb.json_prestasi_satu[0], 'nomor_piagam')"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="6">
                    <m-list-tile-info
                      v-if="siswappdb.json_prestasi_satu[0].jumah_peserta"
                      label="Jumlah Peserta"
                      :value="pVal(siswappdb.json_prestasi_satu[0].jumah_peserta, 'keterangan')"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="6">
                    <m-list-tile-info
                      v-if="siswappdb.json_prestasi_satu[0].wilayah"
                      label="Wilayah"
                      :value="pVal(siswappdb.json_prestasi_satu[0].wilayah, 'keterangan')"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="6">
                    <m-list-tile-info
                      v-if="siswappdb.json_prestasi_satu[0].peringkat"
                      label="Peringkat"
                      :value="pVal(siswappdb.json_prestasi_satu[0].peringkat, 'keterangan')"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="6">
                    <m-list-tile-info
                      label="Tanggal Sertifikat"
                      :value="pVal(siswappdb.json_prestasi_satu[0], 'tanggal_pencapaian') | toSD"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="6">
                    <p class="caption my-0 py-0 ml-4">File Piagam</p>
                    <m-button
                      class="ml-4"
                      v-if="siswappdb.file_piagam"
                      text="Lihat"
                      icon="mdi-eye"
                      action="toPiagam"
                      @toPiagam="download(siswappdb.file_piagam)"
                    ></m-button>
                    <span class="ml-4 red--text" v-else>File Piagam tidak tersedia</span>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="12">
                    <m-list-tile-info label="Keterangan" :value="pVal(siswappdb.json_prestasi_satu[0], 'keterangan')" />
                  </v-col>
                </v-row>
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
      this.$validator.reset()
      this.load(obj)
      this.loadDukcapil(obj)
      return this.$refs.dlgIntegrasi.open()
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

    loadDukcapil(obj) {
      return this.$store
        .dispatch('siswappdb/getDukcapil', obj.nik)
        .then((res) => {
          if (res.status == 0) {
            this.$error(res.message)
          } else {
            this.siswaDukcapil = res.data
          }
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
