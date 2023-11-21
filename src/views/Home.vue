<template>
  <v-app id="logined" class="pa-5 background mx-3 rounded-xl">
    <div class="white ma-0 pa-0" style="position:fixed; top:0px;right:0px; z-index: 1; height:60px; width:100%"></div>
    <div
      class="white ma-0 pa-0"
      style="position:fixed; bottom:0px;right:0px; z-index: 1; height:40px; width:100%"
    ></div>
    <div
      class="background mb-2 ma-0 mx-3 pa-0 rounded-b-xl"
      style="position:fixed; bottom:10px; right:0; left:250px; z-index: 1; height:30px;"
    ></div>
    <div
      class="background mb-2 ma-0 mx-3 pa-0 rounded-b-xl"
      v-if="$vuetify.breakpoint.smAndDown"
      style="position:fixed; bottom:10px; right:0; left:0; width:100%; z-index: 1; height:30px;"
    ></div>

    <MToolbar>
      <router-view name="toolbar" v-slot:menu></router-view>
      <router-view name="minitoolbar" v-slot:minimenu></router-view>
    </MToolbar>
    <v-fade-transition mode="out-in">
      <MRightBar />
    </v-fade-transition>

    <v-fade-transition mode="out-in">
      <MSideBar />
    </v-fade-transition>
    <v-container grid-list-xs class="pa-0 background">
      <v-slide-y-transition mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </v-slide-y-transition>
    </v-container>
  </v-app>
</template>

<script>
import MToolbar from '@/components/Toolbar'
import MSideBar from '@/components/SideBar'
import MRightBar from '@/components/RightBar'
import MFooter from '@/components/Footer'

export default {
  components: {
    MToolbar,
    MSideBar,
    MRightBar,
    MFooter,
  },
  computed: {},
  methods: {},
}
</script>
