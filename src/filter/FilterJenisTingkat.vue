<template>
  <v-card tile flat>
    <v-card-text>
      <v-form autocomplete="off">
        <v-row>
          <v-col cols="12" sm="6" md="6" lg="6">
            <v-autocomplete
              clearable
              outlined
              dense
              autocomplete="off"
              autofocus
              name="Tingkat"
              :items="itemTingkats"
              placeholder="Semua Tingkat"
              label="Pilih Tingkat"
              @change="$emit('filter', filtered)"
              v-model="filtered.tingkat"
              data-vv-name="tingkat"
              data-vv-as="Tingkat"
              item-text="keterangan2"
              item-value="id"
              hide-details
            ></v-autocomplete>
          </v-col>
          <!-- <v-col cols="12" sm="6" md="6" lg="6">
            <v-autocomplete
              clearable
              outlined
              dense
              autocomplete="off"
              autofocus
              :items="itemJenises"
              name="Jenis Pengguna"
              placeholder="Semua Jenis Pengguna"
              label="Jenis Pengguna"
              @change="$emit('filter', filtered)"
              v-model="filtered.jenis"
              data-vv-name="jenis"
              data-vv-as="Jenis Pengguna"
              item-text="nama"
              item-value="id"
              hide-details
            ></v-autocomplete>
          </v-col> -->
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    masters: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialog: true,
      filtered: {
        jenis: null,
        tingkat: null
      },
      itemTingkats: [],
      itemJenises: ["Guru", "Siswa"]
    };
  },
  activated() {
    this.loadTingkat();
  },
  mounted() {
    this.loadTingkat();
  },
  methods: {
    // eslint-disable-next-line
    loadTingkat() {
      return this.$store
        .dispatch("tingkat/get", {
          sekolah_id: this.instansi_id,
          params: {
            tingkat_id: this.tingkat ? this.tingkat.id : null
          }
        })
        .then(res => {
          return (this.itemTingkats = res);
        })
        .catch(e => e);
    }
  }
};
</script>
