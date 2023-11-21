<template>
  <m-dialog
    ref="dlgAjuan"
    :btnsave="false"
    :title="siswappdb && siswappdb.id ? 'Ubah Ajuan Siswa' : 'Tambah Ajuan Siswa'"
  >
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
            <v-divider></v-divider>
            <v-stepper-step step="4">
              Konfirmasi
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card class="pb-5">
                <v-card-title class="primary--text">Biodata Siswa</v-card-title>
                <v-card-text>
                  <v-form autocomplete="false" @submit.prevent data-vv-scope="form-biodata" lazy-validation>
                    <v-row>
                      <v-col cols="12" sm="12" md="6" lg="6" class="my-0 py-0">
                        <v-text-field
                          v-model="siswappdb.nisn"
                          outlined
                          dense
                          autocomplete="false"
                          name="NISN"
                          placeholder="Tulis NISN disini"
                          label="NISN"
                          persistent-hint
                          data-vv-name="nisn"
                          data-vv-as="NISN"
                          v-validate="'required|min:10|numeric'"
                          :error-messages="errors.collect('form-biodata.nisn')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="6" lg="6" class="my-0 py-0">
                        <v-text-field
                          v-model="siswappdb.nama"
                          outlined
                          dense
                          autocomplete="false"
                          name="Nama"
                          placeholder="Tulis Nama disini"
                          label="Nama"
                          persistent-hint
                          data-vv-name="nama"
                          data-vv-as="Nama"
                          v-validate="'required'"
                          :error-messages="errors.collect('form-biodata.nama')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="6" lg="6" class="my-0 py-0">
                        <v-text-field
                          v-model="siswappdb.tempat_lahir"
                          outlined
                          dense
                          autocomplete="false"
                          name="Tempat Lahir"
                          placeholder="Tulis Tempat Lahir disini"
                          label="Tempat Lahir"
                          persistent-hint
                          data-vv-name="tempat_lahir"
                          data-vv-as="Tempat Lahir"
                          v-validate="'required'"
                          :error-messages="errors.collect('form-biodata.tempat_lahir')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="6" lg="6" class="my-0 py-0">
                        <m-datepicker
                          label="Tanggal Lahir"
                          persistent-hint
                          v-model="siswappdb.tanggal_lahir"
                          hint="MM/DD/YYYY format"
                          data-vv-name="tanggal_lahir"
                          data-vv-as="Tanggal Lahir"
                          v-validate="'required'"
                          :error-messages="errors.collect('form-biodata.tanggal_lahir')"
                        ></m-datepicker>
                      </v-col>
                      <v-col cols="12" sm="12" md="6" lg="6" class="my-0 py-0">
                        <v-text-field
                          v-model="siswappdb.nik"
                          outlined
                          dense
                          autocomplete="false"
                          name="NIK"
                          placeholder="Tulis NIK disini"
                          label="NIK"
                          persistent-hint
                          data-vv-name="nik"
                          data-vv-as="NIK"
                          v-validate="'required|min:16|numeric'"
                          :error-messages="errors.collect('form-biodata.nik')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="6" lg="6" class="my-0 py-0">
                        <v-select
                          v-model="siswappdb.jenis_kelamin"
                          outlined
                          dense
                          :items="['L', 'P']"
                          autocomplete="false"
                          name="Jenis Kelamin"
                          placeholder="Tulis Jenis Kelamin disini"
                          label="Jenis Kelamin"
                          persistent-hint
                          data-vv-name="jenis_kelamin"
                          data-vv-as="Jenis Kelamin"
                          v-validate="'required'"
                          :error-messages="errors.collect('form-biodata.jenis_kelamin')"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="12" md="6" lg="6" class="my-0 py-0">
                        <v-text-field
                          v-model="siswappdb.nomer_kk"
                          outlined
                          dense
                          autocomplete="false"
                          name="Nomor KK"
                          placeholder="Tulis Nomor KK disini"
                          label="Nomor Kartu Keluarga"
                          persistent-hint
                          data-vv-name="no_kk"
                          data-vv-as="Nomor KK"
                          v-validate="'required'"
                          :error-messages="errors.collect('form-biodata.no_kk')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="6" lg="6" class="my-0 py-0">
                        <v-text-field
                          v-model="siswappdb.asal_sekolah"
                          outlined
                          dense
                          autocomplete="false"
                          name="Asal Sekolah"
                          placeholder="Tulis Asal Sekolah disini"
                          label="Asal Sekolah"
                          persistent-hint
                          data-vv-name="asal_sekolah"
                          data-vv-as="Asal Sekolah"
                          v-validate="''"
                          :error-messages="errors.collect('form-biodata.asal_sekolah')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="6" lg="6" class="py-0">
                        <v-autocomplete
                          dense
                          outlined
                          placeholder="Isikan Akreditasi Sekolah Asal"
                          :items="itemAkreditasi"
                          v-model="siswappdb.asal_sekolah_akreditasi"
                          label="Akreditasi Sekolah Asal"
                          data-vv-name="akreditasi"
                          data-vv-as="Akreditasi Sekolah Asal"
                          v-validate="''"
                          :error-messages="errors.collect('form-biodata.akreditasi')"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
              <br />
              <v-card flat>
                <v-card-title class="primary--text my-0 pb-0 ml-3">Data Dinas Sosial</v-card-title>
                <v-card-text class="my-0 py-0">
                  <v-row wrap no-gutters>
                    <v-col cols="12" sm="12" md="12" lg="12">
                      <survei
                        :key="Math.random()"
                        question="Terdaftar dalam Data Terpadu Kesejahteraan Sosial (DTKS) dan/atau menyertakan bukti kepemilikan Kartu Indonesia Pintar (KIP) yang diterbitkan Kemdikbud"
                        :answer="siswappdb.is_siswa_miskin"
                        v-model="siswappdb.is_siswa_miskin"
                      />
                    </v-col>
                    <v-col cols="12" sm="12" md="12" lg="12">
                      <survei
                        :key="Math.random()"
                        question="Calon peserta didik Merupakan anak guru"
                        :answer="siswappdb.is_anak_guru"
                        v-model="siswappdb.is_anak_guru"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
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
                <v-card-title>Alamat</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" class="py-0">
                      <v-text-field
                        v-model="siswappdb.alamat_jalan"
                        outlined
                        dense
                        autocomplete="false"
                        name="Alamat Jalan"
                        placeholder="Alamat Jalan"
                        label="Alamat Jalan"
                        persistent-hint
                        data-vv-name="alamat"
                        data-vv-as="Alamat"
                        v-validate="'required'"
                        :error-messages="errors.collect('form.alamat')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="py-0">
                      <v-text-field
                        v-model="siswappdb.rt"
                        outlined
                        dense
                        autocomplete="false"
                        name="RT"
                        placeholder="RT"
                        label="RT"
                        persistent-hint
                        data-vv-name="rt"
                        data-vv-as="RT"
                        v-validate="'required'"
                        :error-messages="errors.collect('form.rt')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="py-0">
                      <v-text-field
                        v-model="siswappdb.rw"
                        outlined
                        dense
                        autocomplete="false"
                        name="RW"
                        placeholder="RW"
                        label="RW"
                        persistent-hint
                        data-vv-name="rw"
                        data-vv-as="RW"
                        v-validate="'required'"
                        :error-messages="errors.collect('form.rw')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" lg="6" class="py-0">
                      <v-autocomplete
                        dense
                        outlined
                        placeholder="Isikan Propinsi"
                        :items="itemProvinsis"
                        v-model="siswappdb.propinsi_id"
                        item-value="id"
                        item-text="keterangan"
                        @change="getKota(siswappdb.propinsi_id)"
                        label="Propinsi"
                        data-vv-name="provinsi"
                        data-vv-as="Propinsi"
                        v-validate="'required'"
                        :error-messages="errors.collect('form.provinsi')"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" lg="6" class="py-0">
                      <v-autocomplete
                        dense
                        outlined
                        placeholder="Isikan Kota/Kabupaten"
                        :items="itemKotas"
                        v-model="siswappdb.kota_id"
                        @change="getKecamatan(siswappdb.kota_id)"
                        item-value="id"
                        item-text="keterangan"
                        label="Kota/Kabupaten"
                        data-vv-name="kota"
                        data-vv-as="Kota/Kabupaten"
                        v-validate="'required'"
                        :error-messages="errors.collect('form.kota')"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" lg="6" class="py-0">
                      <v-autocomplete
                        dense
                        outlined
                        placeholder="Isikan Kecamatan"
                        :items="itemKecamatans"
                        v-model="siswappdb.kecamatan_id"
                        item-value="id"
                        item-text="keterangan"
                        @change="getKelurahan(siswappdb.kecamatan_id)"
                        label="Kecamatan"
                        data-vv-name="kecamatan"
                        data-vv-as="Kecamatan"
                        v-validate="'required'"
                        :error-messages="errors.collect('form.kecamatan')"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" lg="6" class="py-0">
                      <v-autocomplete
                        dense
                        outlined
                        placeholder="Isikan Kelurahan"
                        :items="itemKelurahans"
                        v-model="siswappdb.kelurahan_id"
                        item-value="id"
                        item-text="keterangan"
                        label="Kelurahan"
                        data-vv-name="keurahan"
                        data-vv-as="Kelurahan"
                        v-validate="'required'"
                        :error-messages="errors.collect('form.keurahan')"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <ChangeCoordinate
                    ref="map"
                    v-model="lokasi"
                    use-search
                    searchKey="alamat"
                    @mark="onMark"
                    @changeLocation="onMark"
                  />
                  <p class="mt-2 black--text"
                    >Koordinat Alamat:
                    <strong>{{ pVal(siswappdb, 'latitude') }}, {{ pVal(siswappdb, 'longitude') }}</strong></p
                  >
                </v-card-text>
                <v-card-actions class="mr-4">
                  <v-spacer></v-spacer>
                  <v-btn text @click="stepData = 1">
                    Sebelumnya
                  </v-btn>
                  <v-btn color="primary" @click="simpan(3)">
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
                      info="<span class='black--text'>Perhatikan! Silakan inputkan data <b>Rapor Siswa</b> secara benar dan faktual, dengan satuan <b>nilai rapor 10-100 dan 2 digit di belakang koma.<span>"
                    ></m-alert>
                    <br />

                    <v-card flat>
                      <v-card-text class="my-0 py-0">
                        <v-row no-gutters>
                          <v-col cols="12" sm="12" md="6" lg="6">
                            <v-text-field
                              v-model="siswappdb.json_rapor[0].matematika"
                              class="mx-2 mt-2 mb-0"
                              outlined
                              dense
                              autocomplete="false"
                              name="Matematika"
                              placeholder="Contoh: 80.00"
                              label="Matematika"
                              persistent-hint
                              data-vv-name="matematika0"
                              data-vv-as="Nilai Matematika"
                              v-validate="'required|max_value:100|min_value:10|decimal:2'"
                              :error-messages="errors.collect('form.matematika0')"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="6" lg="6">
                            <v-text-field
                              v-model="siswappdb.json_rapor[0].ilmu_pengetahuan_alam"
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
                              v-validate="'required|max_value:100|min_value:10|decimal:2'"
                              :error-messages="errors.collect('form.ipa0')"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="6" lg="6">
                            <v-text-field
                              v-model="siswappdb.json_rapor[0].bahasa_indonesia"
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
                              v-validate="'required|max_value:100|min_value:10|decimal:2'"
                              :error-messages="errors.collect('form.bind0')"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="6" lg="6">
                            <v-text-field
                              v-model="siswappdb.json_rapor[0].pendidikan_agama_dan_budi_pekerti"
                              class="mx-2 mt-2 mb-0"
                              outlined
                              dense
                              autocomplete="false"
                              name="Pendidikan Agama dan Budi Pekerti"
                              placeholder="Pendidikan Agama dan Budi Pekerti"
                              label="Pendidikan Agama dan Budi Pekerti"
                              persistent-hint
                              data-vv-name="agama0"
                              data-vv-as="Nilai Pendidikan Agama dan Budi Pekerti"
                              v-validate="'required|max_value:100|min_value:10|decimal:2'"
                              :error-messages="errors.collect('form.agama0')"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="6" lg="6">
                            <v-text-field
                              v-model="siswappdb.json_rapor[0].ilmu_pengetahuan_sosial"
                              class="mx-2 mt-2 mb-0"
                              outlined
                              dense
                              autocomplete="false"
                              name="IPS"
                              placeholder="IPS"
                              label="IPS"
                              persistent-hint
                              data-vv-name="ips0"
                              data-vv-as="Nilai IPS"
                              v-validate="'required|max_value:100|min_value:10|decimal:2'"
                              :error-messages="errors.collect('form.ips0')"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="6" lg="6">
                            <v-text-field
                              v-model="siswappdb.json_rapor[0].pendidikan_jasmani_olah_raga_dan_kesehatan"
                              class="mx-2 mt-2 mb-0"
                              outlined
                              dense
                              autocomplete="false"
                              name="PendidikanJasmani"
                              placeholder="PendidikanJasmani"
                              label="PendidikanJasmani"
                              persistent-hint
                              data-vv-name="jasmani0"
                              data-vv-as="Nilai PendidikanJasmani"
                              v-validate="'required|max_value:100|min_value:10|decimal:2'"
                              :error-messages="errors.collect('form.jasmani0')"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="6" lg="6">
                            <v-text-field
                              v-model="siswappdb.json_rapor[0].pendidikan_pancasila_dan_kewarganegaraan"
                              class="mx-2 mt-2 mb-0"
                              outlined
                              dense
                              autocomplete="false"
                              name="PPKN"
                              placeholder="PPKN"
                              label="PPKN"
                              persistent-hint
                              data-vv-name="ppkn0"
                              data-vv-as="Nilai PPKN"
                              v-validate="'required|max_value:100|min_value:10|decimal:2'"
                              :error-messages="errors.collect('form.ppkn0')"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="6" lg="6">
                            <v-text-field
                              v-model="siswappdb.json_rapor[0].seni_budaya_dan_prakarya"
                              class="mx-2 mt-2 mb-0"
                              outlined
                              dense
                              autocomplete="false"
                              name="Seni Budaya"
                              placeholder="Seni Budaya"
                              label="Seni Budaya"
                              persistent-hint
                              data-vv-name="seni0"
                              data-vv-as="Nilai Seni Budaya"
                              v-validate="'required|max_value:100|min_value:10|decimal:2'"
                              :error-messages="errors.collect('form.seni0')"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-form>
                </v-card-text>

                <v-divider class="mb-3"></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="stepData = 2">
                    Kembali
                  </v-btn>
                  <v-btn color="primary" @click="simpan(4)">
                    Lanjut
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="4">
              <v-card>
                <v-card-text>
                  <p class="title primary--text">Konfirmasi Data</p>
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
                              >Terdaftar dalam Data Terpadu Kesejahteraan Sosial (DTKS) dan/atau menyertakan bukti
                              kepemilikan Kartu Indonesia Pintar (KIP) yang diterbitkan Kemdikbud?
                              <span class="font-weight-bold">{{ siswappdb.is_siswa_miskin ? 'Ya' : 'Tidak' }}</span>
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
                      <div class="primary white--text title pa-2 mb-4">Koordinat Alamat</div>
                      <v-row no-gutters>
                        <v-col cols="12" sm="12" md="12" lg="12">
                          <div class="blue lighten-5 pa-2" style="height:100%">
                            <p
                              >Latitude, Longitude ({{ pVal(siswappdb, 'latitude') }},{{
                                pVal(siswappdb, 'longitude')
                              }})</p
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
import Peta from '../../ajuan/components/Peta.vue'
import ChangeCoordinate from '../../instansi/components/PilihMarker'
import Survei from '../components/Survei.vue'
export default {
  components: {
    Peta,
    Survei,
    ChangeCoordinate,
  },
  $_veeValidate: {
    validator: 'new',
  },

  data() {
    return {
      setuju: false,
      stepData: 1,
      stepRapor: 1,
      siswappdb: null,
      defSiswappdb: {
        user_id: null,
        sekolah_id: 4,
        nik: null,
        nama: null,
        sekolah: {
          akreditasi: null,
        },
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
            bahasa_indonesia: null,
            ilmu_pengetahuan_alam: null,
            ilmu_pengetahuan_sosial: null,
            matematika: null,
            pendidikan_agama_dan_budi_pekerti: null,
            pendidikan_jasmani_olah_raga_dan_kesehatan: null,
            pendidikan_pancasila_dan_kewarganegaraan: null,
            seni_budaya_dan_prakarya: null,
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
      itemProvinsis: [],
      itemKotas: [],
      itemKecamatans: [],
      itemKelurahans: [],
      itemJenisPrestasis: [],
      itemAkreditasi: ['A', 'B', 'C', 'Belum Terakreditasi'],
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
      lokasi: {},
    }
  },
  methods: {
    open(item) {
      this.siswappdb = this.defSiswappdb
      this.setuju = false
      this.stepData = 1
      this.stepRapor = 1
      this.$validator.reset()
      if (item) {
        this.load(item)
      }
      this.getProvinsi()

      this.loadPrestasi()
      let x = this.$refs.dlgAjuan.open().catch(() => {
        this.$emit('load')
      })
      this.$validator.reset()
      return x
    },

    onMark(value) {
      const { lat, lng } = (value && value.marker) || {}
      this.$set(this.siswappdb, 'latitude', lat)
      this.$set(this.siswappdb, 'longitude', lng)
    },

    // eslint-disable-next-line
    load(obj) {
      return this.$store
        .dispatch('siswappdb/detail', { sekolah_id: this.instansi_id, siswa: obj })
        .then((res) => {
          this.siswappdb = res
          if (res.json_prestasi_satu.length > 0) {
            this.prestasi = res.json_prestasi_satu[0]
          } else {
            this.prestasi = {
              jenis_prestasi: null,
              jumah_peserta: null,
              nama: null,
              wilayah: null,
              peringkat: null,
              tanggal_pencapaian: null,
              keterangan: null,
            }
          }
        })
        .catch((e) => e)
    },

    loadPrestasi() {
      return this.$store
        .dispatch('siswappdb/getPrestasi', { master: 'nama_prestasi' })
        .then((res) => {
          this.itemJenisPrestasis = res
        })
        .catch((e) => e)
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
          this.itemKecamatans = []
          this.itemKelurahan = []
          this.itemKecamatans = []
        })
        .catch((e) => e)
    },
    getKecamatan(id) {
      // this.siswappdb.kelurahan_id = null;
      return this.$store
        .dispatch('siswappdb/getKecamatan', {
          id: id,
          params: {},
        })
        .then((res) => {
          this.itemKecamatans = res
          this.itemKelurahan = []
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

    simpan(induk, rapor) {
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
                this.siswappdb = res.data
                if (rapor) {
                  this.stepRapor = rapor
                } else {
                  this.stepData = induk
                }

                return res
              })
              .catch((e) => e)
          })
      } else {
        this.$validator
          .validateAll('form-biodata')
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
                this.siswappdb = res.data
                if (this.setuju) {
                  this.$refs.dlgAjuan.resolve()
                } else if (rapor) {
                  this.stepRapor = rapor
                } else {
                  this.stepData = induk
                }

                return res
              })
              .catch((e) => e)
          })
      }
    },
  },
}
</script>
