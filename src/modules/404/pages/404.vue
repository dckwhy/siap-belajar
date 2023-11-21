<template>
  <v-container class="pa-0 mt-5">
    <v-row class="ma-5">
      <v-col cols="12" md="6" sm="12" align-self="center">
        <p class="display-3 font-weight-bold">Error 404!</p>
        <p class="display-1">Halaman tidak ditemukan</p>
        <br />
        <p class="body-1 grey--text text--darken-1">
          Kami informasikan bahwa halaman yang Anda tuju tidak ditemukan. <br />Terima kasih
        </p>
        <div class="my-2">
          <v-btn :to="{ name: 'instansi.pilih' }" color="orange white--text" dark>
            <v-icon left>mdi-chevron-left</v-icon>Kembali
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <v-img height="auto" src="https://cdn.siap.id/s3/simpkb/asset img/guru-praktik-baik/404.png"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {}
</script>
<style scoped lang="css">
.v-application {
  font-family: "Inter", sans-serif !important;
}

.container {
  max-width: 1280px !important;
}
</style>
