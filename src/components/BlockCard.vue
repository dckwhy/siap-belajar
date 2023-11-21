<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        class="ra-0 rounded-lg"
        style="margin-top:30px"
        height="120px"
        v-bind="$attrs"
        v-on="$listeners"
        :color="color"
        flat
        @click="is_overlay ? '' : $emit('pilih')"
      >
        <!-- Card Tipe Pilihan Organisasi -->
        <v-card-text class="pa-0 row ma-0" fill-height>
          <v-container fill-height align="center" justify="center">
            <div class="logo" style="position:absolute; top:-40px;left:30%;right:30%; z-index:2">
              <v-avatar size="80">
                <img src="https://cdn.siap.id/s3/siap_belajar/sim/berhasil.png" alt />
              </v-avatar>
            </div>

            <div class="white--text py-0 px-4" style="margin-top:35px; width:100%; font-size:10pt; line-height:25px">
              <div class="text-center"
                >{{ title }}
                <p v-if="item.kota" class="caption"> {{ item.kota }}</p>
              </div>
            </div>
          </v-container>

          <v-fade-transition>
            <v-overlay v-if="hover & is_overlay" absolute color="black" style="z-index:0">
              <v-btn color="secondary" class="black--text" @click="$emit('aktivasi')">Aktivasi Sekolah</v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-card-text>
        <template v-if="false">
          <v-divider class="mt-3 mx-3"></v-divider>
          <v-card-actions class="px-3" v-if="desc">
            <v-icon v-if="iconDesc" small class="mr-2 theme--light">
              {{ iconDesc }}
            </v-icon>
            <span class="grey--text caption font-weight-light">{{ desc }}</span>
          </v-card-actions>
        </template>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    item: {
      type: Object,
      default: null,
    },
    title: {
      type: String,
      default: 'Title',
    },
    subtitle: {
      type: String,
      default: null,
    },
    value: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      default: 'User',
    },
    cover: {
      type: String,
      default: null,
    },
    logo: {
      type: String,
      default: 'mdi-school',
    },
    height: {
      type: Number,
      default: 80,
    },
    count: {
      type: Number,
      default: 0,
    },
    desc: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'primary',
    },
    icon: {
      type: String,
      default: null,
    },
    iconDesc: {
      type: String,
      default: '',
    },
    progressBar: {
      type: String,
      default: 'on',
    },
    progressValue: {
      type: Number,
      default: 10,
    },
    showRole: {
      type: Boolean,
      default: false,
    },
    detail: {
      type: Boolean,
      default: false,
    },
    action: {
      type: Boolean,
      default: true,
    },
    tipe: {
      type: String,
      default: 'pilihInstansi',
    },
    is_sync: {
      type: Boolean,
      default: false,
    },
    is_overlay: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      more_menu: [
        {
          title: 'Cetak Akun',
          click: (i, o) => this.$emit('cetak', o),
        },
      ],
      overlay: false,
    }
  },
  methods: {
    sinkronInstansi(id) {
      return this.$store
        .dispatch('instansi/sync', { instansi_id: id })
        .then((res) => {
          if (res) {
            this.$info('Sinkronisasi data Instansi berhasil')
            this.$emit('reload')
          }
        })
        .catch(() => {
          this.$error('Sinkronisasi data Instansi gagal')
        })
    },
  },
}
</script>

<style></style>
