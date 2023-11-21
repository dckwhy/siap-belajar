<template>
  <div :key="Math.random()">
    <m-list-tile-info label="Nama" :value="pVal(siswaDukcapil, 'NAMA_LGKP')" />
    <m-list-tile-info label="NIK" :value="pVal(siswaDukcapil, 'NIK')" />
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>Tempat, Tgl Lahir</v-list-item-subtitle>
        <v-list-item-title
          >{{ pVal(siswaDukcapil, 'TMPT_LHR') }},&nbsp;{{ pVal(siswaDukcapil, 'TGL_LHR') | toSD }}</v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>
    <m-list-tile-info label="Nomor KK" :value="pVal(siswaDukcapil, 'NO_KK')" />
    <p class="ml-4 mt-4 mb-0"> </p>
    <p class="mt-0 pt-0"
      ><v-chip
        :class="siswaDukcapil.NIK ? 'ml-4 green--text text--darken-2' : 'ml-4 orange--text text--darken-2'"
        small
        label
        :color="siswaDukcapil.NIK ? 'green lighten-5' : 'orange lighten-5'"
        ><v-icon small :color="siswaDukcapil.NIK ? 'green' : 'orange'">{{
          siswaDukcapil.NIK ? 'mdi-check' : 'mdi-timelapse'
        }}</v-icon
        >&nbsp;{{ siswaDukcapil.NIK ? 'Integrasi Berhasil' : 'Dalam Proses Integrasi' }}</v-chip
      ></p
    >
  </div>
</template>

<script>
export default {
  props: {
    nik: {},
  },
  data() {
    return {
      siswaDukcapil: {},
      defSiswaDukcapil: {
        DUSUN: null,
        NAMA_LGKP: null,
        TMPT_LHR: null,
        NO_KK: null,
        NIK: null,
        KAB_NAME: null,
        KEC_NAME: null,
        NO_RW: null,
        NO_RT: null,
        ALAMAT: null,
        KODE_POS: null,
        PROP_NAME: null,
        TGL_LHR: null,
        KEL_NAME: null,
      },
    }
  },
  methods: {
    loadDukcapil() {
      return this.$store
        .dispatch('siswappdb/getDukcapil', this.nik)
        .then((res) => {
          if (res.status == 0) {
            this.$error(res.message)
          } else {
            this.siswaDukcapil = res.data
          }
        })
        .catch((e) => e)
    },
  },
  watch: {
    nik(n) {
      if (n) {
        this.siswaDukcapil = this.defSiswaDukcapil
        this.loadDukcapil()
      }else{
        this.siswaDukcapil = this.defSiswaDukcapil

      }
    },
  },
}
</script>

<style></style>
