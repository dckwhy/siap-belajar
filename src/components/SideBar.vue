<template>
  <v-navigation-drawer
    v-if="lDrawer"
    :mini-variant="false"
    v-model="drawer"
    floating
    :permanent="$vuetify.breakpoint.mdAndUp"
    app
    dense
    class="white pl-3 pr-1"
    width="250px"
  >
    <!-- :src="current_user ? current_user.file_foto_tenant : $consts.LOGO" -->
    <v-container class="pa-0">
      <div class="pa-0 my-5 mx-5">
        <v-img
          class="mr-auto ml-auto my-5 rounded-lg"
          height="50px"
          src="https://cdn.siap.id/s3/siap_belajar/portal/img/logo.png"
          lazy-src="https://cdn.siap.id/s3/siap_belajar/portal/img/logo.png"
          contain
        >
        </v-img>
      </div>

      <v-row column>
        <v-col cols="12">
          <v-list dense class="fix-icon px-2">
            <div v-for="item in items" :key="item.id ? item.id : item.title">
              <template v-if="item.subheader">
                <v-divider v-if="!item.hidden" class="my-2 mx-4"></v-divider>
                <v-subheader
                  v-if="!item.hidden"
                  class="center primary--text caption font-weight-bold mx-2"
                  style="white-space:normal"
                  >{{ item.title }}</v-subheader
                >
              </template>
              <template v-else-if="item.items">
                <v-list-group v-if="!item.hidden" v-model="item.active" :prepend-icon="item.icon" no-action>
                  <template v-slot:activator>
                    <v-list-item-content v-if="item.items" :key="item.id ? item.id : item.title" exact>
                      <v-list-item-title style="white-space:normal">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <template v-for="subItem in item.items">
                    <v-list-item
                      v-if="!subItem.hidden"
                      :key="subItem.id ? subItem.id : subItem.title"
                      :to="subItem.to"
                      :href="subItem.href"
                      exact
                    >
                      <v-list-item-title v-if="subItem.demo">
                        <v-badge color="error" content="demo">
                          {{ subItem.title }}
                        </v-badge>
                      </v-list-item-title>
                      <v-list-item-title v-else style="white-space:normal">
                        {{ subItem.title }}
                      </v-list-item-title>
                      <v-list-item-action v-if="subItem.icon">
                        <v-icon>{{ subItem.icon }}</v-icon>
                      </v-list-item-action>
                    </v-list-item>
                  </template>
                </v-list-group>
              </template>
              <template v-else>
                <v-list-item
                  v-if="!item.hidden"
                  :key="item.id ? item.id : item.title"
                  :to="item.to"
                  :href="item.href"
                  active-class="my-active-link"
                  exact
                  class="my-1"
                >
                  <v-list-item-action class="my-act-icon">
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title v-if="item.demo">
                      <v-badge color="error" content="demo">
                        {{ item.title }}
                      </v-badge>
                    </v-list-item-title>
                    <v-list-item-title v-else>
                      {{ item.title }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </div>
          </v-list>
          <!-- </v-row> -->
        </v-col>
      </v-row>
    </v-container>
    <PilihInstansi ref="dlg" />
  </v-navigation-drawer>
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
      drawer: this.lDrawer,
    }
  },
  computed: {
    lDrawer() {
      if (this.current_instansi && this.$vuetify.breakpoint.mdAndUp) {
        return true
      } else if (this.current_instansi && this.$vuetify.breakpoint.smAndDown) {
        return this.$store.getters['main/lDrawer']
      } else {
        return false
      }
      // return this.$vuetify.breakpoint.smAndDown
      //   ? true
      //   : this.$store.getters["main/lDrawer"];
      // return this.$store.getters["main/lDrawer"];
    },
    items() {
      return this.$store.getters['menu/menus']
    },
  },
  methods: {
    pilihInstansi() {
      // this.$refs.dlg
      //   .open()
      //   .then(res => res)
      //   .catch(e => e);
      this.drawer = false
      this.$router.push({
        name: 'instansi.pilih',
      })
    },
  },
  watch: {
    lDrawer(n) {
      this.drawer = n
    },
    drawer(n) {
      this.$store.commit('main/setLDrawer', n)
    },
  },
}
</script>

<style>
.fix-icon .v-icon.fas {
  font-size: 1rem !important;
}
.fix-icon .my-act-icon .v-icon,
.fix-icon .v-list__group__header__prepend-icon .v-icon {
  font-size: 20px !important;
}
.fix-icon .my-act-icon,
.fix-icon .v-list__group__header .v-list__group__header__prepend-icon {
  padding-right: 0;
  min-width: 25px;
}
.fix-icon .v-list__group__items .v-list__tile {
  padding-left: 56px !important;
}
.fix-icon .my-active-link {
  color: #fff !important;
  background-color: #581a9f;
  box-shadow: 0px 0px 7px 7px rgba(53, 3, 114, 0.137);
  border-radius: 50px;
}
.fix-icon .link {
  color: #fff !important;
}
</style>
