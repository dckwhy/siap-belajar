<template>
  <div class="text-center" fill-height fluid>
    <v-dialog ref="dlgPanduan" v-model="dialog" width="900">
      <v-card class="pa-5 text-center rounded-lg">
        <div class="center py-2" align="center" justify="center">
          <h2 class="py-1">Tahukah Anda</h2>
          <p>Ada beberapa langkah yang harus Anda lakukan di SIAP belajar</p>
          <v-img width="850" src="https://cdn.siap.id/s3/siap_belajar/sim/popup-tatacara.png"></v-img>
        </div>
        <v-chip label color="red lighten-5 pa-2"
          >Batas input data hingga tanggal&nbsp; <strong class="red--text">11 Mei 2021</strong></v-chip
        >
        <p class="pt-2"
          >Untuk informasi lebih lanjut silakan akses situs
          <a href="https://bantuan-belajar.siap.id/"
            ><span style="text-decoration: underline;">Bantuan SIAP Belajar</span></a
          ></p
        >
        <m-button class="pa-5" text="Saya Paham" icon="mdi-check" action="close" @close="dialog = false"></m-button>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    open() {
      this.dialog = true
    },
  },
}
</script>
