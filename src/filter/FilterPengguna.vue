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
              name="Akses"
              :items="itemAkses"
              placeholder="Semua Akses"
              label="Pilih Akses"
              @change="changeAkses(filtered.akses)"
              v-model="filtered.akses"
              data-vv-name="akses"
              data-vv-as="Akses"
              item-text="keterangan"
              item-value="id"
              hide-details
            ></v-autocomplete>
          </v-col>
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
      default: () => {},
    },
  },
  data() {
    return {
      dialog: true,
      filtered: {
        akses: null,
      },
      itemAkses: [],
    }
  },
  mounted() {
    this.loadAkses()
  },
  methods: {
    // eslint-disable-next-line
    loadAkses() {
      return this.$store
        .dispatch('akses/get', {
          sekolah_id: this.instansi_id,
          params: {},
        })
        .then((res) => {
          this.itemAkses = res.data
        })
        .catch((e) => e)
    },

    changeAkses(n) {
      this.filtered.akses = n
      this.$emit('filter', this.filtered)
      if (n) {
        this.loadAkses(n)
      } else {
        this.filtered.akses = null
      }
    },
  },
}
</script>
