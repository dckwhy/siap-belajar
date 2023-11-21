<template>
  <v-alert
    :dismissible="closable"
    v-if="show"
    :color="color"
    border="left"
    colored-border
    :icon="icon"
    class="mt-1 mb-0"
    close-icon="mdi-close"
    style=" webkit-box-shadow: 3px 5px 10px 2px #cacbdf;"
  >
    <p v-html="info" :class="'mb-0 body-2 ' + color + '--text'"></p>
    <v-btn v-if="isAction" :small="$vuetify.breakpoint.xs" label @click="$emit('action')">{{ actionTitle }}</v-btn>
    <slot name="default"></slot>
  </v-alert>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    icon: {
      type: String,
      default: 'mdi-information',
    },
    title: {
      type: String,
      default: 'Info',
    },
    info: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'info',
    },
    show: {
      type: Boolean,
      default: false,
    },
    isAction: {
      type: Boolean,
      default: false,
    },
    actionTitle: {
      type: String,
      default: '',
    },
    closable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
}
</script>

<style></style>
