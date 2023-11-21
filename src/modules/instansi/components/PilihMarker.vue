<template>
  <div>
    <v-text-field
      v-if="useSearch"
      placeholder="Cari Lokasi atau tuliskan koordinat latitude longitude lokasi"
      id="search-map"
      class="mt-3 ml-5"
      append-icon="mdi-magnify"
    />
    <GmapMap
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false,
        scrollwheel: false,
        gestureHandling: 'cooperative',
      }"
      ref="mapRef"
      :center="location"
      :zoom="13"
      style="width: 100%; height: 400px;"
      @click="onMark"
    >
      <GmapMarker
        v-if="Object.keys(marker).length"
        :position="marker"
        :clickable="true"
        :draggable="true"
        @dragend="onMark"
      />
    </GmapMap>
  </div>
</template>
<script>
import { gmapApi } from 'vue2-google-maps'
export default {
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    alamat: {
      type: String,
      default: '',
    },
    useSearch: {
      type: Boolean,
      default: true,
    },
    searchKey: {
      type: String,
      default: '',
    },
  },
  computed: {
    google: gmapApi,
  },
  data() {
    return {
      location: {},
      form: this.value || {},
      initialize: false,
      marker: {},
      geocoder: {},
    }
  },
  mounted() {
    this.resetKoordinat()
    this.initalizeMap()
  },
  methods: {
    initalizeMap() {
      this.$refs.mapRef.$mapPromise.then((map) => {
        this.map = map
        this.geocoder = new this.google.maps.Geocoder()

        const input = document.getElementById('search-map')
        this.searchBox = new this.google.maps.places.SearchBox(input)
        map.addListener('bounds_changed', () => {
          this.searchBox.setBounds(map.getBounds())
        })

        this.searchBox.addListener('places_changed', () => {
          var places = this.searchBox.getPlaces()
          if (places.length === 0) {
            return
          } else {
            this.marker = { lat: places[0].geometry.location.lat(), lng: places[0].geometry.location.lng() }
            // get address
            this.geocoder.geocode({ latLng: this.marker }, (response) => {
              // set form
              const address = (response && response[0].formatted_address) || ''
              this.$emit('mark', { marker: this.marker, address: address })
            })
          }

          // For each place, get the icon, name and location.
          const bounds = new this.google.maps.LatLngBounds()
          places.forEach(function(place) {
            if (!place.geometry) {
              return
            }
            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          })
          map.fitBounds(bounds)
        })

        this.initialize = true
      })
    },

    onMark(map) {
      // set position
      this.marker = { lat: map.latLng.lat(), lng: map.latLng.lng() }

      // get address
      this.geocoder.geocode({ latLng: this.marker }, (response) => {
        // set form
        const address = (response && response[0].formatted_address) || ''
        this.$emit('mark', { marker: this.marker, address: address })
      })
    },

    reset() {
      this.resetKoordinat()
      this.marker = {}
    },

    resetKoordinat() {
      this.location = {
        lat: -6.2551128,
        lng: 106.7255364,
      }
    },

    findLocation(value) {
      if (value.latitude && value.longitude) {
        this.marker = { lat: value.latitude, lng: value.longitude }
        this.location = this.marker
      }
    },
  },
  watch: {
    value: 'findLocation',
    google: 'initalizeMap',
  },
}
</script>
