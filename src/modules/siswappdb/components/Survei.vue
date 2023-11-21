<template>
  <v-row row class="pa-0 ma-0" align-center>
    <v-col cols="12">
      <span>{{ question }}</span>
      <v-radio-group ref="radio" :disabled="disabled" v-model="answered" row>
        <v-radio v-for="option in answerList" :key="option.key" :label="option.key" :value="option.value"></v-radio>
      </v-radio-group>
    </v-col>
    <slot></slot>
  </v-row>
</template>

<script>
export default {
  props: {
    question: {
      type: String,
    },
    answerList: {
      type: Array,
      default: () => [
        { key: 'Ya', value: 1 },
        { key: 'Tidak', value: 0 },
      ],
    },
    value: {
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      row: null,
      answered: this.value,
    }
  },
  created() {
    this.answered = this.value
  },
  mounted() {
    this.answered = this.value
  },
  computed: {},
  watch: {
    answered(n) {
      this.$emit('input', n)
    },
  },
}
</script>

<style></style>
