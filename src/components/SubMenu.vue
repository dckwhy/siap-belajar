<template>
  <v-menu
    :close-on-content-click="false"
    :offset-x="true"
    :open-on-hover="isOpenOnHover"
    :transition="transition"
    :value="openMenu"
    class="mt-4"
  >
    <template v-slot:activator="{ on }">
      <v-list-item v-if="isSubMenu" class="d-flex justify-space-between mt-n3" v-on="on">
        <v-icon v-if="icon" class="mr-2 mt-n1">{{ icon }}</v-icon
        >{{ name }}<div class="flex-grow-1"></div><v-icon>mdi-chevron-right</v-icon>
      </v-list-item>
      <v-list-item class="mr-0 py-2 white" v-else v-on="on" :to="to">
        <v-list-item-icon class="mr-2">
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="text--primary">{{ name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-list v-if="menuItems.length > 0">
      <template v-for="(item, index) in menuItems">
        <v-divider v-if="item.isDivider" :key="index" />
        <sub-menu
          v-else-if="item.menu"
          :key="index"
          :icon="item.icon"
          :name="item.name"
          :menu-items="item.menu"
          @sub-menu-click="emitClickEvent"
          :is-open-on-hover="false"
          :is-offset-x="true"
          :is-offset-y="false"
          :is-sub-menu="true"
        />
        <v-list-item v-else :key="index" @click="emitClickEvent(item)" >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>

</template>

<script>
import MListGroup from './MListGroup'
import MListTile from './MListTile'
import PilihInstansi from '../modules/instansi/components/PilihInstansiDialog'
export default {
  components: {
    MListGroup,
    MListTile,
    PilihInstansi,
  },
  data() {
    return {
      openMenu: false,
    }
  },
  props: {
    to: { type: Object },
    name: String,
    icon: String,
    menuItems: Array,
    color: { type: String, default: 'secondary' },
    isOffsetX: { type: Boolean, default: false },
    isOffsetY: { type: Boolean, default: true },
    isOpenOnHover: { type: Boolean, default: false },
    isSubMenu: { type: Boolean, default: false },
    transition: { type: String, default: 'slide-x-transition' },
  },
  methods: {
    emitClickEvent(item) {
      if (item.to) {
        this.$router.push({
          name: item.to.name,
          params: item.to.params,
        })
      }
      this.$emit('sub-menu-click', item)
      this.openMenu = false
    },
  },
}
</script>
<style>
.v-list .v-list-item--active{
  color:  #5B1BA5 !important;
}
.v-menu__content .v-menu__content--fixed .menuable__content__active {
  position: absolute !important;
  top: 70px !important;
}
.v-menu__content{
  position: absolute !important;
}
</style>
