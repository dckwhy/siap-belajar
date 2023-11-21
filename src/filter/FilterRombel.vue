<template>
  <v-card tile flat>
    <v-card-text>
      <v-form autocomplete="off">
        <v-row>
          <!-- <v-col cols="12" sm="6" md="4" lg="3">
            <v-autocomplete
              clearable
              outlined
              dense
              autocomplete="off"
              autofocus
              name="Tahun Pelajaran"
              :items="itemTahuns"
              placeholder="Semua Tahun Pelajaran"
              label="Pilih Tahun Pelajaran"
              @change="$emit('filter',filtered)"
              v-model="filtered.tahun"
              data-vv-name="tahun"
              data-vv-as="Tahun Pelajaran"
              item-text="nama"
              item-value="id"
              hide-details
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3">
            <v-autocomplete
              clearable
              outlined
              dense
              autocomplete="off"
              autofocus
              name="Semester"
              :items="itemSemester"
              placeholder="Semua Semester"
              label="Pilih Semester"
              @change="$emit('filter',filtered)"
              v-model="filtered.semester"
              data-vv-name="semester"
              data-vv-as="Semester"
              item-text="nama"
              item-value="id"
              hide-details
            ></v-autocomplete>
          </v-col>-->
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
              @change="$emit('filter',filtered)"
              v-model="filtered.tingkat"
              data-vv-name="tingkat"
              data-vv-as="Tingkat"
              item-text="keterangan2"
              item-value="id"
              hide-details
            ></v-autocomplete>
          </v-col>
          <!-- <v-col cols="12" sm="6" md="4" lg="3">
            <v-autocomplete
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
      itemTahuns: ["2019/2020", "2020/2021"],
      itemSemester: ["Ganjil", "Genap"],
      itemTingkats: [],
      itemStatus: ["Public", "Private"]
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
