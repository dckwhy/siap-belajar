<template>
  <v-row id="lokasi" v-show="$consts.GMAP_KEY">
    <v-col
      cols="12"
      md="12"
      :class="{ 'pl-3': $vuetify.breakpoint.mdAndUp }"
      :style="$vuetify.breakpoint.smAndDown ? 'min-height:300px' : ''"
    >
      <v-card class="pa-2" height="350" outlined tile>
        <template>
          <GmapMap
            :center="center"
            map-type-id="terrain"
            :zoom="17"
            :options="{
              scaleControl: true,
              fullscreenControl: true,
              controlSize: 25,
            }"
            style="width: 100%; height: 300px"
          >
            <gmap-info-window
              :options="infoOptions"
              :position="infoWindowPos"
              :opened="infoWinOpen"
              @closeclick="infoWinOpen = false"
            ></gmap-info-window>
            <GmapMarker v-for="(item, index) in markers" :key="index" :clickable="true" :position="getPosition(item)" />
          </GmapMap>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      cropperOutputMime: null,
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        content: '',
        //optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
    }
  },
  props: {
    latitude: {
      type: Number,
      default: 0,
    },
    longitude: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    markers() {
      const a = {
        position: {
          lat: parseFloat(this.latitude),
          lng: parseFloat(this.longitude),
          radius: parseFloat(10),
        },
        lat: parseFloat(this.latitude),
        lng: parseFloat(this.longitude),
        radius: parseFloat(10),
      }
      return a
    },
    center() {
      if (this.latitude & this.longitude) {
        return { lat: this.latitude, lng: this.longitude }
      } else {
        return { lat: -6.175147, lng: 106.827207 }
      }
    },
  },
  methods: {
    getPosition: function(marker) {
      return {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng),
      }
    },
  },
}
</script>
