<template>
  <v-dialog
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="tgl"
    transition="scale-transition"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field outlined dense v-bind="$attrs" v-on="on" :value="value | toSD" :label="label" readonly>
        <template v-slot:append>
          <v-icon>calendar-month</v-icon>
        </template>
      </v-text-field>
    </template>
    <!-- <v-date-picker v-model="sel_tgl" :min="min" :max="max"> -->

    <v-date-picker v-model="sel_tgl" @input="save" @click:date="$emit('changeDate')" :min="min" :max="max">
      <!-- <v-btn text color="primary" @click="menu = false">Cancel</v-btn> -->
      <v-spacer></v-spacer>
      <v-btn text color="orange" @click="hapus">Hapus</v-btn>
      <!-- <v-btn text color="primary" @click="save">OK</v-btn> -->
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  inheritAttrs: false,
  inject: {
    $validator: '$validator',
  },
  props: {
    value: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: 'Date',
    },
    min: {
      type: String,
      default: null,
    },
    max: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      menu: false,
      tgl: null,
      sel_tgl: null,
    }
  },
  beforeUpdate() {
    if (this.value) {
      this.tgl = this.value.substr(0, 10)
      this.sel_tgl = this.tgl
    } else {
      this.sel_tgl = null
    }
  },
  methods: {
    changeDate() {
      this.$emit('changeDate', this.tgl)
    },
    hapus() {
      this.tgl = null
      this.menu = false
      this.$emit('input', this.tgl)
    },
    save() {
      this.tgl = this.sel_tgl
      this.menu = false
      this.$emit('input', this.tgl)
    },
  },
  // watch:{
  //     tgl(n){
  //         this.$emit('input', n)
  //     }
  // }
}
</script>

<style></style>
