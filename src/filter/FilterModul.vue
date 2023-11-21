<template>
  <v-card tile flat>
    <v-card-text>
      <v-form autocomplete="off">
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3">
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
              @change="changeTingkat(filtered.tingkat)"
              v-model="filtered.tingkat"
              data-vv-name="tingkat"
              data-vv-as="Tingkat"
              item-text="keterangan2"
              item-value="id"
              hide-details
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3">
            <v-autocomplete
              clearable
              outlined
              dense
              :disabled="filtered.tingkat == null"
              autocomplete="off"
              autofocus
              :items="itemMapels"
              name="Mata Pelajaran"
              placeholder="Semua Mata Pelajaran"
              label="Mata Pelajaran"
              @change="$emit('filter', filtered)"
              v-model="filtered.mapel"
              data-vv-name="status"
              data-vv-as="Mata Pelajaran"
              item-text="keterangan"
              item-value="id"
              hide-details
            ></v-autocomplete>
          </v-col>
          <!-- <v-col cols="12" sm="6" md="4" lg="3">
          <v-autocomplete
            dark
            clearable
            outlined
            dense
            :items="itemStatus"
            name="Status"
            placeholder="Semua Status Berbagi"
            label="Status Berbagi"
            @change="$emit('filter',filtered)"
            v-model="filtered.status"
            data-vv-name="status"
            data-vv-as="Status"
            item-text="nama"
            item-value="id"
            hide-details
          ></v-autocomplete>
          </v-col>-->
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
        tingkat: null,
        mapel: null,
        status: null
      },
      itemTingkats: [],
      itemMapels: [],
      itemStatus: []
    };
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
          params: {}
        })
        .then(res => {
          return (this.itemTingkats = res);
        })
        .catch(e => e);
    },

    changeTingkat(n) {
      this.filtered.tingkat = n;
      this.$emit("filter", this.filtered);
      if (n) {
        this.loadMapel(n);
      } else {
        this.filtered.mapel = null;
      }
    },

    // eslint-disable-next-line
    loadMapel(tingkat_id) {
      return this.$store
        .dispatch("mapel/getAll", {
          sekolah_id: this.instansi_id,
          params: {
            tingkat_id: tingkat_id
          }
        })
        .then(res => {
          return (this.itemMapels = res);
        })
        .catch(e => e);
    }
  }
};
</script>
