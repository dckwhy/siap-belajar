<template>
  <m-dialog ref="dlg" :btnsave="false" :title="siswappdb && siswappdb.id ? 'Ubah Ajuan Siswa' : 'Tambah Ajuan Siswa'">
    <v-row row wrap justify="center" align="center" v-if="siswappdb">
      <v-col cols="12" sm="12" md="10" lg="8" xl="8">
        <v-stepper v-model="stepData" class="elevation-0" style="background-color:transparent">
          <v-stepper-header class="elevation-0 mt-5">
            <v-stepper-step :complete="stepData > 1" step="1">
              Biodata
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="stepData > 2" step="2">
              Alamat
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="stepData > 3" step="3">
              Rapor
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="stepData > 4" step="4">
              Prestasi
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="5">
              Konfirmasi
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card class="pb-5">
                <v-card-text>
                  <v-row wrap no-gutters>
                    <v-col cols="12" sm="12" md="6" lg="6" align-end colbox>
                      <div class="blue lighten-5 ma-2 pa-2" style="height:100%">
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
                        <m-list-tile-info label="Nama" :value="pVal(siswappdb, 'nama')" />
                        <m-list-tile-info label="NIK" :value="pVal(siswappdb, 'nik')" />
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
                        <m-list-tile-info label="NISN" :value="pVal(siswappdb, 'nisn')" />
                        <m-list-tile-info label="Asal Sekolah" :value="pVal(siswappdb, 'asal_sekolah')" />
                        <div v-if="siswappdb.sekolah">
                          <m-list-tile-info
                            label="Akreditasi Sekolah"
                            :value="pVal(siswappdb.sekolah.akreditasi, 'nama')"
                          />
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="12" md="6" lg="6" align-end colbox>
                      <div class="deep-purple lighten-5 ma-2 pa-2" style="height:100%">
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
                  </v-row>
                </v-card-text>
              </v-card>
              <br />
              <v-card flat>
                <v-card-title class="primary--text my-0 pb-0 ml-3" style="word-break: break-word;"
                  >Data Dinas Sosial
                </v-card-title>
                <v-card-text class="my-0 py-0">
                  <v-row wrap no-gutters>
                    <v-col cols="12" sm="12" md="12" lg="12">
                      <div class="ml-3"
                        >Terdaftar dalam Data Terpadu Kesejahteraan Sosial (DTKS) dan/atau menyertakan bukti kepemilikan
                        Kartu Indonesia Pintar (KIP) yang diterbitkan Kemdikbud?
                        <span class="font-weight-bold">{{ siswappdb.siswa_dinsos ? 'Ya' : 'Tidak' }}</span>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" lg="12">
                      <div class="ml-3 mt-2"
                        >Calon peserta didik yang berasal dari panti asuhan didasarkan atas data pada Dinas Sosial
                        Provinsi</div
                      ><div class="ml-3">
                        <v-chip class="orange--text text--darken-2" small label color="orange lighten-5"
                          ><v-icon small color="orange">mdi-timelapse</v-icon>&nbsp;Dalam Proses Integrasi</v-chip
                        >
                      </div>

                      <!-- <survei
                        :disabled="true"
                        :key="Math.random()"
                        question="Calon peserta didik yang berasal dari panti asuhan didasarkan atas data pada Dinas Sosial Provinsi"
                        :answer="siswappdb.jawab_sosial_2"
                        v-model="siswappdb.jawab_sosial_2"
                      /> -->
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <v-card flat>
                <v-card-title class="primary--text my-0 pb-0 ml-3">Data Dinas Kesehatan</v-card-title>
                <v-card-text class="my-0 py-0">
                  <v-row wrap no-gutters>
                    <v-col cols="12" sm="12" md="12" lg="12">
                      <div class="ml-3"
                        >Terdaftar dalam hasil pendataan putera/puteri tenaga kesehatan dan tenaga pendukungnya yang
                        menangani langsung pasien Covid-19, dan yang melakukan pengamatan dan/atau penelusuran kasus
                        Covid-19 dengan kontak langsung pasien dan/atau orang dengan kasus Covid 19 yang diterbitkan
                        oleh Dinas Kesehatan Provinsi Jawa Tengah.</div
                      >
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
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <v-card flat>
                <!-- <v-card-title class="primary--text my-0 pb-0 ml-3" style="word-break: break-word;"
                  >Data Pondok Pesantren</v-card-title
                >
                <v-card-text class="my-0 py-0">
                  <div class="ml-3">
                    <v-chip class="orange--text text--darken-2" small label color="orange lighten-5"
                      ><v-icon small color="orange">mdi-timelapse</v-icon>&nbsp;Dalam Proses Integrasi</v-chip
                    >
                  </div>
                  <m-alert
                    flat
                    class="py-2 mx-3"
                    show
                    icon="mdi-alert"
                    color="info"
                    info="Bagi calon peserta didik <b>dari pondok pesantren</b> diharuskan menggunakan <b>surat keterangan</b> bahwa pondok pesantren terdaftar pada Educational Management Islamic System (EMIS) yang diterbitkan oleh Kantor Wilayah Kementrian Agama Provinsi Jawa Tengah."
                  ></m-alert>
                  <v-row wrap no-gutters>
                    <v-col cols="12" sm="12" md="12" lg="12">
                      <div class="ml-3">
                        Calon peserta didik yang berasal dari Pondok Pesantren
                      </div>
                      <survei
                        :key="Math.random()"
                        :disabled="true"
                        question="Calon peserta didik yang berasal dari Pondok Pesantren"
                        :answer="siswappdb.jawab_pesantren_1"
                        v-model="siswappdb.jawab_pesantren_1"
                      />
                    </v-col>
                    <v-col cols="12" sm="12" md="12" lg="12" v-if="siswappdb.jawab_pesantren_1">
                      <v-form autocomplete="false" @submit.prevent data-vv-scope="form" lazy-validation>
                        <v-row>
                          <v-col cols="12" sm="12" md="12" lg="12" class="py-0">
                            <v-text-field
                              :disabled="true"
                              v-model="siswappdb.ponpes_alamat"
                              class="mt-2 mb-0"
                              outlined
                              dense
                              autocomplete="false"
                              name="Alamat Pondok pesantren"
                              placeholder="Tuliskan alamat lengkap pondok pesantren"
                              label="Alamat Pondok pesantren"
                              persistent-hint
                              data-vv-name="alamat_ponpes"
                              data-vv-as="Alamat Pondok pesantren"
                              v-validate="'required'"
                              :error-messages="errors.collect('form.alamat_ponpes')"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="6" lg="6" class="py-0">
                            <v-autocomplete
                              :disabled="true"
                              dense
                              outlined
                              placeholder="Isikan Propinsi"
                              :items="itemProvinsis"
                              v-model="siswappdb.ponpes_propinsi_id"
                              item-value="id"
                              item-text="keterangan"
                              @change="getKota(siswappdb.ponpes_propinsi_id)"
                              label="Propinsi"
                              data-vv-name="provinsi"
                              data-vv-as="Propinsi"
                              v-validate="'required'"
                              :error-messages="errors.collect('form.provinsi')"
                            ></v-autocomplete>
                          </v-col>
                          <v-col cols="12" sm="12" md="6" lg="6" class="py-0">
                            <v-autocomplete
                              :disabled="true"
                              dense
                              outlined
                              placeholder="Isikan Kota/Kabupaten"
                              :items="itemKotas"
                              v-model="siswappdb.ponpes_kota_id"
                              @change="getKecamatan(siswappdb.ponpes_kota_id)"
                              item-value="id"
                              item-text="keterangan"
                              label="Kota/Kabupaten"
                              data-vv-name="kota"
                              data-vv-as="Kota/Kabupaten"
                              v-validate="'required'"
                              :error-messages="errors.collect('form.kota')"
                            ></v-autocomplete>
                          </v-col>
                          <v-col cols="12" sm="12" md="6" lg="6" class="py-0">
                            <v-autocomplete
                              :disabled="true"
                              dense
                              outlined
                              placeholder="Isikan Kecamatan"
                              :items="itemKecamatans"
                              v-model="siswappdb.ponpes_kecamatan_id"
                              item-value="id"
                              item-text="keterangan"
                              @change="getKelurahan(siswappdb.ponpes_kecamatan_id)"
                              label="Kecamatan"
                              data-vv-name="kecamatan"
                              data-vv-as="Kecamatan"
                              v-validate="'required'"
                              :error-messages="errors.collect('form.kecamatan')"
                            ></v-autocomplete>
                          </v-col>
                          <v-col cols="12" sm="12" md="6" lg="6" class="py-0">
                            <v-autocomplete
                              :disabled="true"
                              dense
                              outlined
                              placeholder="Isikan Kelurahan"
                              :items="itemKelurahans"
                              v-model="siswappdb.ponpes_kelurahan_id"
                              item-value="id"
                              item-text="keterangan"
                              label="Kelurahan"
                              data-vv-name="kelurahan"
                              data-vv-as="Kelurahan"
                              v-validate="'required'"
                              :error-messages="errors.collect('form.kelurahan')"
                            ></v-autocomplete>
                          </v-col>
                        </v-row>
                      </v-form>

                      <ChangeCoordinate
                        class="mx-2"
                        ref="map"
                        v-model="lokasi"
                        use-search
                        searchKey="alamat"
                        @mark="onMark"
                      />
                      <Peta :latitude="siswappdb.ponpes_latitude" :longitude="siswappdb.ponpes_longitude" />
                      <div class="ml-3 mt-2 black--text"
                        >Titik Koordinat Pondok Pesantren:
                        <strong
                          >{{ pVal(siswappdb, 'ponpes_latitude') }},{{ pVal(siswappdb, 'ponpes_longitude') }}</strong
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text> -->
                <v-divider class="mb-3"></v-divider>

                <v-card-actions class="mr-4">
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="simpan(2)">
                    Lanjut
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card class="pb-5">
                <v-card-title>Alamat sesuai data Dukcapil</v-card-title>
                <v-card-text>
                  <div class="deep-purple lighten-5 ma-2 pa-2" style="height:100%">
                    <m-alert
                      flat
                      class="py-2 mx-3"
                      show
                      icon="mdi-alert"
                      color="grey"
                      info="<span class='black--text'>Jika terdapat data yang tidak sesuai, silakan perbaruhi data di <b>Admin Dukcapil</b><span>"
                    ></m-alert>

                    <v-row no-gutters>
                      <v-col cols="12"><m-list-tile-info label="Alamat" :value="pVal(siswaDukcapil, 'ALAMAT')"/></v-col>
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
                      <v-col cols="12">
                        <p class="ml-4 mt-4 mb-0"> </p>
                        <p class="mt-0 pt-0"
                          ><v-chip
                            :class="
                              siswaDukcapil.NIK ? 'ml-4 green--text text--darken-2' : 'ml-4 orange--text text--darken-2'
                            "
                            small
                            label
                            :color="siswaDukcapil.NIK ? 'green lighten-5' : 'orange lighten-5'"
                            ><v-icon small :color="siswaDukcapil.NIK ? 'green' : 'orange'">mdi-timelapse</v-icon
                            >&nbsp;{{ siswaDukcapil.NIK ? 'Integrasi Berhasil' : 'Dalam Proses Integrasi' }}</v-chip
                          ></p
                        >
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>
              </v-card>
              <br />
              <v-card flat>
                <v-card-title class="primary--text my-0 pb-0 ml-3">Alamat sesuai data Dapodik/Emis</v-card-title>
                <v-card-text class="my-0 py-0">
                  <div class="blue lighten-5 ma-2 pa-2" style="height:100%">
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
                </v-card-text>
                <v-card-actions class="mr-4">
                  <v-spacer></v-spacer>
                  <v-btn text @click="stepData = 1">
                    Kembali
                  </v-btn>
                  <v-btn color="primary" @click="stepData = 3">
                    Lanjut
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card>
                <v-card-text>
                  <v-form autocomplete="false" @submit.prevent data-vv-scope="form" lazy-validation>
                    <m-alert
                      flat
                      class="py-2 mx-3"
                      show
                      icon="mdi-alert"
                      color="grey"
                      info="<span class='black--text'>Perhatikan! Silakan inputkan data <b>Rapor Siswa</b> secara benar dan faktual, dengan satuan <b>nilai rapor 0-10 dan 2 digit di belakang koma</b>. Pemeringkatan berdasar nilai 4 (empat) mata pelajaran: <b>IPA, Matematika, Bahasa Inggris, dan Bahasa Indonesia</b>.<br/><br/> Jika menggunakan Kurikulum 2006 yang diinputkan adalah Nilai Pengetahuan. Dan apabila menggunakan kurikulum K13 yang diinputkan adalah nilai rata-rata dari aspek Kompetensi Pengetahuan dan Ketrampilan.<span>"
                    ></m-alert>
                    <br />
                    <v-stepper v-model="stepRapor" vertical>
                      <v-stepper-step :complete="stepRapor > 1" step="1">
                        Kelas 7 Semester 1
                      </v-stepper-step>
                      <v-stepper-content step="1">
                        <v-card flat>
                          <v-card-text class="my-0 py-0">
                            <v-row no-gutters>
                              <v-col cols="12" sm="12" md="6" lg="6">
                                <v-text-field
                                  v-model="siswappdb.json_rapor[0].bind"
                                  @input="debounceInput('bind', 0, siswappdb.json_rapor[0].bind)"
                                  class="mx-2 mt-2 mb-0"
                                  outlined
                                  dense
                                  autocomplete="false"
                                  name="Bahasa Indonesia"
                                  placeholder="Bahasa Indonesia"
                                  label="Bahasa Indonesia"
                                  persistent-hint
                                  data-vv-name="bind0"
                                  data-vv-as="Nilai Bahasa Indonesia"
                                  v-validate="'required|max_value:10|min_value:0|decimal:2'"
                                  :error-messages="errors.collect('form.bind0')"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="6" lg="6">
                                <v-text-field
                                  v-model="siswappdb.json_rapor[0].matematika"
                                  class="mx-2 mt-2 mb-0"
                                  outlined
                                  dense
                                  autocomplete="false"
                                  name="Matematika"
                                  placeholder="Contoh: 8.00"
                                  label="Matematika"
                                  @input="debounceInput('matematika', 0, siswappdb.json_rapor[0].matematika)"
                                  persistent-hint
                                  data-vv-name="matematika0"
                                  data-vv-as="Nilai Matematika"
                                  v-validate="'required|max_value:10|min_value:0|decimal:2'"
                                  :error-messages="errors.collect('form.matematika0')"
                                >
                                </v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="6" lg="6">
                                <v-text-field
                                  v-model="siswappdb.json_rapor[0].ipa"
                                  @input="debounceInput('ipa', 0, siswappdb.json_rapor[0].ipa)"
                                  class="mx-2 mt-2 mb-0"
                                  outlined
                                  dense
                                  autocomplete="false"
                                  name="IPA"
                                  placeholder="IPA"
                                  label="IPA"
                                  persistent-hint
                                  data-vv-name="ipa0"
                                  data-vv-as="Nilai IPA"
                                  v-validate="'required|max_value:10|min_value:0|decimal:2'"
                                  :error-messages="errors.collect('form.ipa0')"
                                ></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="12" md="6" lg="6">
                                <v-text-field
                                  v-model="siswappdb.json_rapor[0].bing"
                                  @input="debounceInput('bing', 0, siswappdb.json_rapor[0].bing)"
                                  class="mx-2 mt-2 mb-0"
                                  outlined
                                  dense
                                  autocomplete="false"
                                  name="Bahasa Inggris"
                                  placeholder="Bahasa Inggris"
                                  label="Bahasa Inggris"
                                  persistent-hint
                                  data-vv-name="bing0"
                                  data-vv-as="Nilai Bahasa Inggris"
                                  v-validate="'required|max_value:10|min_value:0|decimal:2'"
                                  :error-messages="errors.collect('form.bing0')"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="simpan(3, 2)">
                              Lanjut
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-stepper-content>

                      <v-stepper-step :complete="stepRapor > 2" step="2">
                        Kelas 7 Semester 2
                      </v-stepper-step>
                      <v-stepper-content step="2">
                        <v-card flat>
                          <v-card-text class="my-0 py-0">
                            <v-row no-gutters>
                              <v-col cols="12" sm="12" md="6" lg="6">
                                <v-text-field
                                  v-model="siswappdb.json_rapor[1].bind"
                                  @input="debounceInput('bind', 1, siswappdb.json_rapor[1].bind)"
                                  class="mx-2 mt-2 mb-0"
                                  outlined
                                  dense
                                  autocomplete="false"
                                  name="Bahasa Indonesia"
                                  placeholder="Bahasa Indonesia"
                                  label="Bahasa Indonesia"
                                  persistent-hint
                                  data-vv-name="bind1"
                                  data-vv-as="Nilai Bahasa Indonesia"
                                  v-validate="'required|max_value:10|min_value:0|decimal:2'"
                                  :error-messages="errors.collect('form.bind1')"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="6" lg="6">
                                <v-text-field
                                  v-model="siswappdb.json_rapor[1].matematika"
                                  @input="debounceInput('matematika', 1, siswappdb.json_rapor[1].matematika)"
                                  class="mx-2 mt-2 mb-0"
                                  outlined
                                  dense
                                  autocomplete="false"
                                  name="Matematika"
                                  placeholder="Matematika"
                                  label="Matematika"
                                  persistent-hint
                                  data-vv-name="matematika1"
                                  data-vv-as="Nilai Matematika"
                                  v-validate="'required|max_value:10|min_value:0|decimal:2'"
                                  :error-messages="errors.collect('form.matematika1')"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="6" lg="6">
                                <v-text-field
                                  v-model="siswappdb.json_rapor[1].ipa"
                                  class="mx-2 mt-2 mb-0"
                                  outlined
                                  dense
                                  autocomplete="false"
                                  name="IPA"
                                  placeholder="IPA"
                                  label="IPA"
                                  persistent-hint
                                  data-vv-name="ipa1"
                                  data-vv-as="Nilai IPA"
                                  v-validate="'required|max_value:10|min_value:0|decimal:2'"
                                  :error-messages="errors.collect('form.ipa1')"
                                ></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="12" md="6" lg="6">
                                <v-text-field
                                  v-model="siswappdb.json_rapor[1].bing"
                                  @input="debounceInput('bing', 1, siswappdb.json_rapor[1].bing)"
                                  class="mx-2 mt-2 mb-0"
                                  outlined
                                  dense
                                  autocomplete="false"
                                  name="Bahasa Inggris"
                                  placeholder="Bahasa Inggris"
                                  label="Bahasa Inggris"
                                  persistent-hint
                                  data-vv-name="bing1"
                                  data-vv-as="Nilai Bahasa Inggris"
                                  v-validate="'required|max_value:10|min_value:0|decimal:2'"
                                  :error-messages="errors.collect('form.bing1')"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn text @click="stepRapor = 1">
                              Sebelumnya
                            </v-btn>
                            <v-btn color="primary" @click="simpan(3, 3)">
                              Lanjut
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-stepper-content>

                      <v-stepper-step :complete="stepRapor > 3" step="3">
                        Kelas 8 Semester 1
                      </v-stepper-step>
                      <v-stepper-content step="3">
                        <v-card flat>
                          <v-card-text class="my-0 py-0">
                            <v-row no-gutters>
                              <v-col cols="12" sm="12" md="6" lg="6">
                                <v-text-field
                                  v-model="siswappdb.json_rapor[2].bind"
                                  @input="debounceInput('bind', 2, siswappdb.json_rapor[2].bind)"
                                  class="mx-2 mt-2 mb-0"
                                  outlined
                                  dense
                                  autocomplete="false"
                                  name="Bahasa Indonesia"
                                  placeholder="Bahasa Indonesia"
                                  label="Bahasa Indonesia"
                                  persistent-hint
                                  data-vv-name="bind2"
                                  data-vv-as="Nilai Bahasa Indonesia"
                                  v-validate="'required|max_value:10|min_value:0|decimal:2'"
                                  :error-messages="errors.collect('form.bind2')"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="6" lg="6">
                                <v-text-field
                                  v-model="siswappdb.json_rapor[2].matematika"
                                  @input="debounceInput('matematika', 2, siswappdb.json_rapor[2].matematika)"
                                  class="mx-2 mt-2 mb-0"
                                  outlined
                                  dense
                                  autocomplete="false"
                                  name="Matematika"
                                  placeholder="Matematika"
                                  label="Matematika"
                                  persistent-hint
                                  data-vv-name="matematika2"
                                  data-vv-as="Nilai Matematika"
                                  v-validate="'required|max_value:10|min_value:0|decimal:2'"
                                  :error-messages="errors.collect('form.matematika2')"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="6" lg="6">
                                <v-text-field
                                  v-model="siswappdb.json_rapor[2].ipa"
                                  @input="debounceInput('ipa', 2, siswappdb.json_rapor[2].ipa)"
                                  class="mx-2 mt-2 mb-0"
                                  outlined
                                  dense
                                  autocomplete="false"
                                  name="IPA"
                                  placeholder="IPA"
                                  label="IPA"
                                  persistent-hint
                                  data-vv-name="ipa2"
                                  data-vv-as="Nilai IPA"
                                  v-validate="'required|max_value:10|min_value:0|decimal:2'"
                                  :error-messages="errors.collect('form.ipa2')"
                                ></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="12" md="6" lg="6">
                                <v-text-field
                                  v-model="siswappdb.json_rapor[2].bing"
                                  @input="debounceInput('bing', 2, siswappdb.json_rapor[2].bing)"
                                  class="mx-2 mt-2 mb-0"
                                  outlined
                                  dense
                                  autocomplete="false"
                                  name="Bahasa Inggris"
                                  placeholder="Bahasa Inggris"
                                  label="Bahasa Inggris"
                                  persistent-hint
                                  data-vv-name="bing2"
                                  data-vv-as="Nilai Bahasa Inggris"
                                  v-validate="'required|max_value:10|min_value:0|decimal:2'"
                                  :error-messages="errors.collect('form.bing2')"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn text @click="stepRapor = 2">
                              Sebelumnya
                            </v-btn>
                            <v-btn color="primary" @click="simpan(3, 4)">
                              Lanjut
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-stepper-content>

                      <v-stepper-step :complete="stepRapor > 4" step="4">
                        Kelas 8 Semester 2
                      </v-stepper-step>
                      <v-stepper-content step="4">
                        <v-card flat>
                          <v-card-text class="my-0 py-0">
                            <v-row no-gutters>
                              <v-col cols="12" sm="12" md="6" lg="6">
                                <v-text-field
                                  v-model="siswappdb.json_rapor[3].bind"
                                  @input="debounceInput('bind', 3, siswappdb.json_rapor[3].bind)"
                                  class="mx-2 mt-2 mb-0"
                                  outlined
                                  dense
                                  autocomplete="false"
                                  name="Bahasa Indonesia"
                                  placeholder="Bahasa Indonesia"
                                  label="Bahasa Indonesia"
                                  persistent-hint
                                  data-vv-name="bind3"
                                  data-vv-as="Nilai Bahasa Indonesia"
                                  v-validate="'required|max_value:10|min_value:0|decimal:2'"
                                  :error-messages="errors.collect('form.bind3')"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="6" lg="6">
                                <v-text-field
                                  v-model="siswappdb.json_rapor[3].matematika"
                                  @input="debounceInput('matematika', 3, siswappdb.json_rapor[3].matematika)"
                                  class="mx-2 mt-2 mb-0"
                                  outlined
                                  dense
                                  autocomplete="false"
                                  name="Matematika"
                                  placeholder="Matematika"
                                  label="Matematika"
                                  persistent-hint
                                  data-vv-name="matematika3"
                                  data-vv-as="Nilai Matematika"
                                  v-validate="'required|max_value:10|min_value:0|decimal:2'"
                                  :error-messages="errors.collect('form.matematika3')"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="6" lg="6">
                                <v-text-field
                                  v-model="siswappdb.json_rapor[3].ipa"
                                  @input="debounceInput('ipa', 3, siswappdb.json_rapor[3].ipa)"
                                  class="mx-2 mt-2 mb-0"
                                  outlined
                                  dense
                                  autocomplete="false"
                                  name="IPA"
                                  placeholder="IPA"
                                  label="IPA"
                                  persistent-hint
                                  data-vv-name="ipa3"
                                  data-vv-as="Nilai IPA"
                                  v-validate="'required|max_value:10|min_value:0|decimal:2'"
                                  :error-messages="errors.collect('form.ipa3')"
                                ></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="12" md="6" lg="6">
                                <v-text-field
                                  v-model="siswappdb.json_rapor[3].bing"
                                  @input="debounceInput('bing', 3, siswappdb.json_rapor[3].bing)"
                                  class="mx-2 mt-2 mb-0"
                                  outlined
                                  dense
                                  autocomplete="false"
                                  name="Bahasa Inggris"
                                  placeholder="Bahasa Inggris"
                                  label="Bahasa Inggris"
                                  persistent-hint
                                  data-vv-name="bing3"
                                  data-vv-as="Nilai Bahasa Inggris"
                                  v-validate="'required|max_value:10|min_value:0|decimal:2'"
                                  :error-messages="errors.collect('form.bing3')"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn text @click="stepRapor = 3">
                              Sebelumnya
                            </v-btn>
                            <v-btn color="primary" @click="simpan(3, 5)">
                              Lanjut
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-stepper-content>

                      <v-stepper-step :complete="stepRapor > 5" step="5">
                        Kelas 9 Semester 1
                      </v-stepper-step>
                      <v-stepper-content step="5">
                        <v-card flat>
                          <v-card-text class="my-0 py-0">
                            <v-row no-gutters>
                              <v-col cols="12" sm="12" md="6" lg="6">
                                <v-text-field
                                  v-model="siswappdb.json_rapor[4].bind"
                                  @input="debounceInput('bind', 4, siswappdb.json_rapor[4].bind)"
                                  class="mx-2 mt-2 mb-0"
                                  outlined
                                  dense
                                  autocomplete="false"
                                  name="Bahasa Indonesia"
                                  placeholder="Bahasa Indonesia"
                                  label="Bahasa Indonesia"
                                  persistent-hint
                                  data-vv-name="bind4"
                                  data-vv-as="Nilai Bahasa Indonesia"
                                  v-validate="'required|max_value:10|min_value:0|decimal:2'"
                                  :error-messages="errors.collect('form.bind4')"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="6" lg="6">
                                <v-text-field
                                  v-model="siswappdb.json_rapor[4].matematika"
                                  @input="debounceInput('matematika', 4, siswappdb.json_rapor[4].matematika)"
                                  class="mx-2 mt-2 mb-0"
                                  outlined
                                  dense
                                  autocomplete="false"
                                  name="Matematika"
                                  placeholder="Matematika"
                                  label="Matematika"
                                  persistent-hint
                                  data-vv-name="matematika4"
                                  data-vv-as="Nilai Matematika"
                                  v-validate="'required|max_value:10|min_value:0|decimal:2'"
                                  :error-messages="errors.collect('form.matematika4')"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="6" lg="6">
                                <v-text-field
                                  v-model="siswappdb.json_rapor[4].ipa"
                                  @input="debounceInput('ipa', 4, siswappdb.json_rapor[4].ipa)"
                                  class="mx-2 mt-2 mb-0"
                                  outlined
                                  dense
                                  autocomplete="false"
                                  name="IPA"
                                  placeholder="IPA"
                                  label="IPA"
                                  persistent-hint
                                  data-vv-name="ipa4"
                                  data-vv-as="Nilai IPA"
                                  v-validate="'required|max_value:10|min_value:0|decimal:2'"
                                  :error-messages="errors.collect('form.ipa4')"
                                ></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="12" md="6" lg="6">
                                <v-text-field
                                  class="mx-2 mt-2 mb-0"
                                  v-model="siswappdb.json_rapor[4].bing"
                                  @input="debounceInput('bing', 4, siswappdb.json_rapor[4].bing)"
                                  outlined
                                  dense
                                  autocomplete="false"
                                  name="Bahasa Inggris"
                                  placeholder="Bahasa Inggris"
                                  label="Bahasa Inggris"
                                  persistent-hint
                                  data-vv-name="bing4"
                                  data-vv-as="Nilai Bahasa Inggris"
                                  v-validate="'required|max_value:10|min_value:0|decimal:2'"
                                  :error-messages="errors.collect('form.bing4')"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text @click="stepRapor = 4">
                              Sebelumnya
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-stepper-content>
                    </v-stepper>
                  </v-form>
                </v-card-text>

                <v-divider class="mb-3"></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="stepData = 2">
                    Kembali
                  </v-btn>
                  <v-btn color="primary" :disabled="stepRapor != 5" @click="simpan(4)">
                    Lanjut
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="4">
              <v-card>
                <v-card-title>Prestasi Siswa</v-card-title>
                <v-card-text>
                  <m-alert
                    flat
                    class="py-2 mx-3"
                    show
                    icon="mdi-alert"
                    color="grey"
                    info="Perhatian! Jika Siswa memiliki data prestasi, silakan inputkan data <b>Prestasi Siswa</b> secara benar dan faktual. Data Prestasi yang di inputkan adalah <b>Data Prestasi Tertinggi</b>.<br/><br/> Jika kejuaraan siswa masuk dalam kategori tidak berjenjang, silakan pilih opsi paling bawah pada jenis prestasi (opsi : Kejuaraan tidak berjenjang), lalu lanjutkan input secara manual data prestasi yang dimiliki."
                  ></m-alert>
                  <survei
                    :key="Math.random()"
                    question="Apakah Siswa berikut memiliki Prestasi?"
                    v-model="siswappdb.jawab_prestasi_1"
                  />
                  <template v-if="siswappdb.jawab_prestasi_1 == 1">
                    <v-form autocomplete="false" @submit.prevent data-vv-scope="form-prestasi" lazy-validation>
                      <v-row no-gutters>
                        <v-col cols="12" sm="12" md="12" lg="12">
                          <v-select
                            attach
                            outlined
                            dense
                            autocomplete="false"
                            v-model="prestasi.jenis_prestasi"
                            :items="itemJenisPrestasis"
                            item-text="keterangan"
                            item-value="id"
                            return-object
                            no-data-text="Data Tidak Tersedia"
                            placeholder="Pilih Jenis Prestasi"
                            label="Jenis Prestasi"
                            name="Jenis Prestasi"
                            data-vv-name="jenis_prestasi"
                            data-vv-as="Jenis Prestasi"
                            v-validate="'required'"
                            :error-messages="errors.collect('form-prestasi.jenis_prestasi')"
                          >
                            <template slot="item" slot-scope="data">
                              <span :class="data.item.lingkup_id == 99 ? 'font-weight-bold' : ''"
                                >{{ data.item.keterangan }} </span
                              ><span v-if="data.item.lingkup_id != 99">({{ data.item.lingkup.keterangan }})</span>
                            </template>
                          </v-select>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="12"
                          md="12"
                          lg="12"
                          v-if="prestasi.jenis_prestasi && prestasi.jenis_prestasi.lingkup_id == 99"
                        >
                          <v-text-field
                            v-model="prestasi.jenis_prestasi_lain"
                            outlined
                            dense
                            autocomplete="false"
                            name="Nama Prestasi"
                            placeholder="Tulis Nama Prestasi disini"
                            label="Nama Prestasi"
                            persistent-hint
                            data-vv-name="jenis_prestasi_lain"
                            data-vv-as="Nama Prestasi"
                            v-validate="''"
                            :error-messages="errors.collect('form.jenis_prestasi_lain')"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12" lg="12">
                          <v-text-field
                            v-model="prestasi.nomor_piagam"
                            outlined
                            dense
                            autocomplete="false"
                            name="Nomor Piagam"
                            placeholder="Tulis Nomor Prestasi disini"
                            label="Nomor Piagam"
                            persistent-hint
                            data-vv-name="no_piagam"
                            data-vv-as="Nomor Piagam"
                            v-validate="''"
                            :error-messages="errors.collect('form.no_piagam')"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="6" lg="6">
                          <v-select
                            class="mr-1"
                            attach
                            outlined
                            dense
                            autocomplete="false"
                            v-model="prestasi.jumah_peserta"
                            :items="itemJumlahPesertas"
                            item-text="keterangan"
                            item-value="id"
                            return-object
                            no-data-text="Data Tidak Tersedia"
                            placeholder="Pilih Jumlah Peserta"
                            label="Jumlah Peserta"
                            name="Jumlah Peserta"
                            data-vv-name="jumlah_peserta"
                            data-vv-as="Jumlah Peserta"
                            v-validate="'required'"
                            :error-messages="errors.collect('form-prestasi.jumlah_peserta')"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="12" md="6" lg="6">
                          <v-select
                            attach
                            outlined
                            dense
                            autocomplete="false"
                            v-model="prestasi.wilayah"
                            :items="itemWilayas"
                            item-text="keterangan"
                            item-value="id"
                            return-object
                            no-data-text="Data Tidak Tersedia"
                            placeholder="Pilih Wilayah"
                            label="Wilayah"
                            name="Wilayah"
                            data-vv-name="wilayah"
                            data-vv-as="Wilayah"
                            v-validate="'required'"
                            :error-messages="errors.collect('form-prestasi.wilayah')"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="12" md="6" lg="6">
                          <v-select
                            class="mr-1"
                            attach
                            outlined
                            dense
                            autocomplete="false"
                            v-model="prestasi.peringkat"
                            :items="itemPeringkats"
                            item-text="keterangan"
                            item-value="id"
                            return-object
                            no-data-text="Data Tidak Tersedia"
                            placeholder="Pilih Peringkat"
                            label="Peringkat"
                            name="Peringkat"
                            data-vv-name="peringkat"
                            data-vv-as="Peringkat"
                            v-validate="'required'"
                            :error-messages="errors.collect('form-prestasi.peringkat')"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="12" md="6" lg="6">
                          <m-datepicker
                            label="Tanggal Sertifikat"
                            persistent-hint
                            min="2018-06-25"
                            max="2020-12-25"
                            v-model="prestasi.tanggal_pencapaian"
                            hint="MM/DD/YYYY format"
                            data-vv-name="tanggal"
                            data-vv-as="Tanggal pencapaian"
                            v-validate="'required'"
                            :error-messages="errors.collect('form-prestasi.tanggal')"
                          ></m-datepicker>
                        </v-col>
                        <v-col cols="12">
                          <span class="font-weight-bold black--text">File Piagam</span>
                          <span class="error--text">&nbsp;*</span>
                          <p v-if="siswappdb.file_piagam">
                            <a :href="siswappdb.file_piagam" target="_blank">
                              Tautan Piagam
                            </a>
                          </p>
                          <div class="container">
                            <v-file-input
                              ref="file"
                              v-model="file"
                              :hint="
                                'File yang dapat diunggah berformat pdf/jpg/png dengan ukuran maksimal' +
                                  maxSize +
                                  ' MB'
                              "
                              persistent-hint
                              id="file"
                              @change="handleFileUpload"
                              :placeholder="siswappdb.file_piagam ? 'Ubah File Piagam' : 'Pilih File Piagam'"
                              :accept="accepts"
                              name="File"
                              data-vv-name="file"
                              data-vv-as="File Piagam"
                              v-validate="uploadRequired ? 'required' : ''"
                              :error-messages="errors.collect('form-prestasi.file')"
                              outlined
                              dense
                            ></v-file-input>
                            <p class="error--text" v-if="errorType">
                              Tipe File Piagam Anda tidak memenuhi syarat.
                            </p>
                            <p class="error--text" v-if="this.file && this.size > this.maxSize">
                              Ukuran File Piagam Anda melebihi ketentuan : {{ this.size }} MB
                            </p>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="12" md="12" lg="12">
                          <v-textarea
                            outlined
                            autocomplete="false"
                            name="Keterangan"
                            placeholder="Isikan Keterangan"
                            label="Keterangan"
                            v-model="prestasi.keterangan"
                            persistent-hint
                            data-vv-name="keterangan"
                            data-vv-as="Keterangan"
                            v-validate="'required'"
                            :error-messages="errors.collect('form-prestasi.keterangan')"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-form>
                  </template>
                </v-card-text>

                <v-divider class="mb-3"></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="stepData = 3">
                    Kembali
                  </v-btn>
                  <v-btn color="primary" @click="simpan(5, null, 1)">
                    Lanjut
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="5">
              <v-card>
                <v-card-text>
                  <p class="title primary--text">Konfirmasi Data</p>
                  <v-row>
                    <v-col cols="12" class="mt-0 pt-0 mb-3 pb-3">
                      <div class="primary white--text title pa-2 mb-4">Biodata Diri</div>
                      <v-row wrap no-gutters>
                        <v-col cols="12" sm="12" md="6" lg="6" align-end colbox>
                          <div class="blue lighten-5 pa-2" style="height:100%">
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
                            <m-list-tile-info label="Nama" :value="pVal(siswappdb, 'nama')" />
                            <m-list-tile-info label="NIK" :value="pVal(siswappdb, 'nik')" />
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
                            <m-list-tile-info label="NISN" :value="pVal(siswappdb, 'nisn')" />
                            <m-list-tile-info label="Asal Sekolah" :value="pVal(siswappdb, 'asal_sekolah')" />
                            <div v-if="siswappdb.sekolah">
                              <m-list-tile-info
                                label="Akreditasi Sekolah"
                                :value="pVal(siswappdb.sekolah.akreditasi, 'nama')"
                              />
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="12" md="6" lg="6" align-end colbox>
                          <div class="deep-purple lighten-5 pa-2" style="height:100%">
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
                              >Terdaftar dalam Data Terpadu Kesejahteraan Sosial (DTKS) dan/atau menyertakan bukti
                              kepemilikan Kartu Indonesia Pintar (KIP) yang diterbitkan Kemdikbud?

                              <span class="font-weight-bold">{{ siswappdb.siswa_dinsos ? 'Ya' : 'Tidak' }}</span>
                            </p>

                            <p
                              >Calon peserta didik yang berasal dari panti asuhan didasarkan atas data pada Dinas Sosial
                              <v-chip class="orange--text text--darken-2" small label color="orange lighten-5"
                                ><v-icon small color="orange">mdi-timelapse</v-icon>&nbsp;Dalam Proses Integrasi</v-chip
                              >
                              Provinsi?
                              <!-- <span class="font-weight-bold">{{ siswappdb.jawab_sosial_2 ? 'Ya' : 'Tidak' }}</span> -->
                            </p>
                            <p
                              >Terdaftar dalam hasil pendataan putera/puteri tenaga kesehatan dan tenaga pendukungnya
                              yang menangani langsung pasien Covid-19, dan yang melakukan pengamatan dan/atau
                              penelusuran kasus Covid-19 dengan kontak langsung pasien dan/atau orang dengan kasus Covid
                              19 yang diterbitkan oleh Dinas Kesehatan Provinsi Jawa Tengah?
                              <v-chip class="orange--text text--darken-2" small label color="orange lighten-5"
                                ><v-icon small color="orange">mdi-timelapse</v-icon>&nbsp;Dalam Proses Integrasi</v-chip
                              >
                              <!-- <span class="font-weight-bold">{{ siswappdb.jawab_kesehatan_1 ? 'Ya' : 'Tidak' }}</span> -->
                            </p>
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
                          <div class="blue lighten-5 pa-2" style="height:100%">
                            <m-alert
                              flat
                              class="py-2 mx-3"
                              show
                              icon="mdi-alert"
                              color="grey"
                              info="<span class='black--text'>Jika terdapat data yang tidak sesuai, silakan perbaruhi data di <b>Admin Dapodik/Emis</b><span>"
                            ></m-alert>
                            <br />
                            <p
                              >Latitude, Longitude ({{ pVal(siswappdb, 'latitude') }},{{
                                pVal(siswappdb, 'longitude')
                              }})</p
                            >
                            <Peta :latitude="siswappdb.latitude" :longitude="siswappdb.longitude" />
                          </div>
                        </v-col>
                        <v-col cols="12" sm="12" md="6" lg="6">
                          <div class="deep-purple lighten-5 pa-2" style="height:100%">
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
                              <v-col cols="12" class="mb-2"
                                ><v-chip
                                  :class="
                                    siswaDukcapil.NIK
                                      ? 'ml-4 green--text text--darken-2'
                                      : 'ml-4 orange--text text--darken-2'
                                  "
                                  small
                                  label
                                  :color="siswaDukcapil.NIK ? 'green lighten-5' : 'orange lighten-5'"
                                  ><v-icon small :color="siswaDukcapil.NIK ? 'green' : 'orange'">mdi-timelapse</v-icon
                                  >&nbsp;{{
                                    siswaDukcapil.NIK ? 'Integrasi Berhasil' : 'Dalam Proses Integrasi'
                                  }}</v-chip
                                ></v-col
                              >
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
                        <v-col cols="12" sm="12" md="12" lg="12">
                          <m-list-tile-info
                            v-if="
                              siswappdb.json_prestasi_satu[0].jenis_prestasi &&
                                siswappdb.json_prestasi_satu[0].jenis_prestasi.lingkup_id == 99
                            "
                            label="Nama Prestasi Lain"
                            :value="pVal(siswappdb.json_prestasi_satu[0], 'jenis_prestasi_lain')"
                          />
                        </v-col>
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
                          <m-list-tile-info
                            label="Keterangan"
                            :value="pVal(siswappdb.json_prestasi_satu[0], 'keterangan')"
                          />
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-checkbox v-model="setuju" class="mx-2" dense color="teal" name="setuju">
                        <template v-slot:label>
                          <div class="body-2 teal--text">
                            Saya sudah membaca, paham dan menyetujui persyaratan di atas.
                          </div>
                        </template>
                      </v-checkbox>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="stepData = 4">
                    Kembali
                  </v-btn>
                  <v-btn class="mr-4" color="primary" @click="simpan(6)" :disabled="!setuju">
                    Simpan
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </m-dialog>
</template>

<script>
import { debounce } from 'debounce'
import { MAX_UPLOAD_SIZE } from '@/const'
import Peta from '../../ajuan/components/Peta.vue'
import Survei from '../components/Survei.vue'
import Dukcapil from '../components/Dukcapil.vue'
import ChangeCoordinate from '../../instansi/components/PilihMarker.vue'
export default {
  components: {
    Peta,
    Survei,
    ChangeCoordinate,
    Dukcapil,
  },
  $_veeValidate: {
    validator: 'new',
  },

  data() {
    return {
      edit: false,
      uploadRequired: false,
      setuju: false,
      file: null,
      type: '',
      size: 0,
      maxSize: MAX_UPLOAD_SIZE,
      errorType: false,
      accepts: ['application/pdf', 'image/jpg', 'image/jpeg', 'image/png'],
      stepData: 1,
      stepRapor: 1,
      siswappdb: null,
      lokasi: {},
      defSiswappdb: {
        id: 0,
        user_id: null,
        sekolah_id: 0,
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
        alamat_ponpes: null,
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
        tanggal_pencapaian: '2020-12-25',
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
      defSiswaDukcapil: {
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
      itemJenisPrestasis: [],
      itemJumlahPesertas: [
        {
          id: 1,
          keterangan: 'Individu',
        },
        {
          id: 2,
          keterangan: 'Beregu <5',
        },
        {
          id: 3,
          keterangan: 'Beregu <10',
        },
        {
          id: 4,
          keterangan: 'Beregu >10',
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
      ],
      itemProvinsis: [],
      itemKotas: [],
      itemKecamatans: [],
      itemKelurahans: [],
    }
  },
  methods: {
    open(obj) {
      this.siswappdb = this.defSiswappdb
      this.siswaDukcapil = { ...this.defSiswaDukcapil }
      this.setuju = false
      this.file = null
      this.stepData = 1
      this.stepRapor = 1
      this.$validator.reset()
      this.load(obj)
      this.loadPrestasi()
      this.loadDukcapil(obj)
      this.getProvinsi()
      return this.$refs.dlg.open()
    },

    loadDukcapil(obj) {
      if (!this.siswaDukcapil.nik) {
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
      }
    },

    onMark(value) {
      const { lat, lng } = (value && value.marker) || {}
      this.$set(this.siswappdb, 'ponpes_latitude', lat)
      this.$set(this.siswappdb, 'ponpes_longitude', lng)
    },

    download(item) {
      window.open(item, '_blank')
    },

    getProvinsi() {
      return this.$store
        .dispatch('siswappdb/getProvinsi', {
          params: {},
        })
        .then((res) => {
          this.itemProvinsis = res
        })
        .catch((e) => e)
    },
    getKota(id) {
      return this.$store
        .dispatch('siswappdb/getKota', {
          id: id,
          params: {},
        })
        .then((res) => {
          this.itemKotas = res
        })
        .catch((e) => e)
    },
    getKecamatan(id) {
      // this.warga.kelurahan_id = null;
      return this.$store
        .dispatch('siswappdb/getKecamatan', {
          id: id,
          params: {},
        })
        .then((res) => {
          this.itemKecamatans = res
        })
        .catch((e) => e)
    },
    getKelurahan(id) {
      return this.$store
        .dispatch('siswappdb/getKelurahan', {
          id: id,
          params: {},
        })
        .then((res) => {
          this.itemKelurahans = res
        })
        .catch((e) => e)
    },

    debounceInput: debounce(function(obj, index, value) {
      if (value) {
        this.$validator.reset()
        var req = value.replace(',', '.')
        this.$set(this.siswappdb.json_rapor[index], obj, parseFloat(req).toFixed(2))
        this.$validator.validateAll()
      } else {
        this.$set(this.siswappdb.json_rapor[index], obj, 0)
      }
    }, 1200),

    // eslint-disable-next-line
    load(obj) {
      return this.$store
        .dispatch('siswappdb/detail', { sekolah_id: this.instansi_id, siswa: obj })
        .then((res) => {
          this.siswappdb = { ...res }
          this.uploadRequired = res.json_prestasi_satu.length > 0 ? false : true
          if (res.json_prestasi_satu.length > 0) {
            this.prestasi = res.json_prestasi_satu[0]
          } else {
            this.prestasi = {
              jenis_prestasi: null,
              jumah_peserta: null,
              nama: null,
              wilayah: null,
              peringkat: null,
              tanggal_pencapaian: '2020-12-25',
              keterangan: null,
            }
          }
        })
        .catch((e) => {
          this.$refs.dlg.resolve(e)
        })
    },

    loadPrestasi() {
      return this.$store
        .dispatch('siswappdb/getPrestasi', { master: 'nama_prestasi' })
        .then((res) => {
          this.itemJenisPrestasis = res
        })
        .catch((e) => e)
    },

    handleFileUpload() {
      this.errorType = false
      if (this.file) {
        if (this.accepts.includes(this.file.type.toString())) {
          this.errorType = false
          this.unggah(this.file)
        } else {
          this.errorType = true
        }
        this.size = (this.file.size / 1000000).toFixed(2)
      }
    },

    unggah(file) {
      return this.$store
        .dispatch('siswappdb/unggah', {
          sekolah_id: this.instansi_id,
          siswa_id: this.siswappdb.id,
          obj: file,
        })
        .then((res) => {
          if (res) {
            this.$info('File Piagam berhasil diunggah')
          } else {
            this.$error('File piagam gagal diunggah')
          }
          return res
        })
        .catch((e) => e)
    },

    simpan(induk, rapor, prestasi) {
      if (this.prestasi && this.siswappdb.jawab_prestasi_1 == 1) {
        this.siswappdb.json_prestasi_satu = []
        this.siswappdb.json_prestasi_satu.push(this.prestasi)
      } else {
        this.siswappdb.json_prestasi_satu = []
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
                this.load(res.data)
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
                this.load(res.data)
                this.stepData = induk
                return res
              })
              .catch((e) => e)
          })
      } else {
        this.$validator
          .validateAll('form')
          .then((res) => {
            if (!res) return Promise.reject()
            return res
          })
          .then(() => {
            if (this.siswappdb.jawab_pesantren_1 && !this.siswappdb.ponpes_latitude) {
              this.$error('Mohon tentukan titik lokasi Pondok Pesantren sesuai alamat')
            } else {
              return this.$store
                .dispatch('siswappdb/biodata', {
                  sekolah_id: this.instansi_id,
                  obj: this.siswappdb,
                })
                .then((res) => {
                  this.load(res.data)
                  if (this.setuju) {
                    this.$refs.dlg.resolve()
                  } else if (rapor) {
                    this.stepRapor = rapor
                  } else {
                    this.stepData = induk
                  }

                  return res
                })
                .catch((e) => e)
            }
          })
      }
    },
  },
}
</script>
