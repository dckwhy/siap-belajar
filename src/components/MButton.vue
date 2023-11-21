<template>
  <v-btn
    :small="$vuetify.breakpoint.smAndDown"
    :disabled="disabled"
    :depresed="depresed"
    :fab="fab"
    :outlined="outlined"
    @click="$emit(action)"
    :block="isBlock"
    :class="outlined ? '' : color + ' mr-2'"
    v-bind="$attrs"
  >
    <slot>
      <v-icon :class="fab ? '' : 'mr-2'">{{ icon }}</v-icon>
      <span class="my-2">{{ fab ? '' : text }}</span>
    </slot>
  </v-btn>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    icon: {
      type: String,
      default: 'mdi-file',
    },
    text: {
      type: String,
      default: 'Simpan',
    },
    color: {
      type: String,
      default: 'primary',
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    depresed: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    fab: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    action: {
      type: String,
      default: 'save',
    },
    large: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style>
.v-btn__content {
  width: 100%;
  white-space: normal;
}
</style>
