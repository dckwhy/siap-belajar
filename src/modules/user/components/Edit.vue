<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    scrollable
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click.native="dialog = false">
          <v-icon>fa-times</v-icon>
        </v-btn>
        <v-toolbar-title>Edit Profil Diri</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click.native="dialog = false">
            Simpan
            <v-icon right>fa-save</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-container grid-list-sm class="pa-0">
          <v-layout wrap>
            <v-flex xs12 sm5 md4>
              <v-subheader class="title green--text">Foto Profil</v-subheader>
              <v-divider></v-divider>
              <v-card text>
                <v-img class="grey lighten-2 white--text">
                  <v-container fill-height container--fluid>
                    <v-layout fill-height>
                      <v-flex class="text-center" xs12 align-end flexbox>
                        <v-avatar :size="200" color="grey lighten-4">
                          <!-- <img src="img/logo.png" alt="avatar"> -->
                        </v-avatar>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
              </v-card>
            </v-flex>
            <v-flex xs12 sm7 md8>
              <v-form>
                <v-subheader class="title green--text">Identitas</v-subheader>
                <v-divider></v-divider>
                <v-layout wrap ma-1>
                  <v-flex md9 xs12>
                    <v-text-field label="Nama Lengkap" value="Azhar Mashuri"></v-text-field>
                  </v-flex>
                  <v-flex md3 xs12>
                    <v-select :items="items" label="Kelamin" v-model="items_selected"></v-select>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field label="Tempat Lahir" value="Malang"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <m-datepicker label="Tanggal Lahir" hint="MM/DD/YYYY format" persistent-hint></m-datepicker>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field label="NIK" value="3053021234560005"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field label="Nomor KK" value="3053020005"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-subheader class="title green--text">Pekerjaan</v-subheader>
                <v-divider></v-divider>
                <v-layout wrap ma-1>
                  <v-flex xs6>
                    <v-select :items="jobs" label="Jenis Pekerjaan" v-model="jobs_selected"></v-select>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field label="Jabatan" value="Cepek Men"></v-text-field>
                  </v-flex>
                  <v-flex md9 xs12>
                    <v-text-field label="Nama instansi" value="PT Ekspres Gembol"></v-text-field>
                  </v-flex>
                  <v-flex md3 xs12>
                    <v-text-field label="Telpon instansi" value="(650) 5551234"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea
                      label="Alamat instansi"
                      value="Jl. Maju Mundur gg. Buntu no.276, kel. Ipsum, kec. Lorem, Kota Dolor Sit"
                      auto-grow
                      rows="2"
                    ></v-textarea>
                  </v-flex>
                </v-layout>
                <v-subheader class="title green--text">Kontak</v-subheader>
                <v-divider></v-divider>
                <v-layout wrap ma-1>
                  <v-flex xs6>
                    <v-text-field label="Handphone" value="+6581234567910"></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field label="alamat email" value="azhar@kemensos.go.id"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea
                      label="Alamat Rumah"
                      value="Jl. Lorem Ipsum XXI no.69, RT.01 RW.02, kel. Dolor Sit, kec. Amet, Kota Iperium"
                      auto-grow
                      rows="2"
                    ></v-textarea>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,

      menu1: false,
      items: ["Laki-laki", "Perempuan"],
      items_selected: "Laki-laki",
      jobs: ["Pegawai Negeri", "Wiraswasta", "Tidak bekerja"],
      jobs_selected: "Wiraswasta",

      resolve: null,
      reject: null
    };
  },
  methods: {
    open() {
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;

        this.dialog = true;
      });
    }
  },
  watch: {
    dialog(n) {
      if (!n) this.reject();
    }
  }
};
</script>
