<template>
  <v-card flat class="pa-5 rounded-b-xl background" >
     <!-- <v-system-bar lights-out></v-system-bar> -->
    <!-- <v-carousel cycle hide-delimiter-background show-arrows-on-hover style="max-height:50vh">
      <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src">
        <v-container fill-height>
          <v-row>
            <v-col>
              <div class="text-center ma-auto">
                <p class="title white--text font-weight-medium">{{item.description}}</p>
                <p
                  v-show="item.title"
                  class="display-1 subheading white--text font-weight-medium"
                >{{item.title}}</p>
                <v-chip
                  v-if="item.action"
                  @click="toAction(item.action)"
                  label
                  large
                  outlined
                  color="white"
                >
                  {{item.actionTitle}}
                  <v-icon>mdi-arrow-right</v-icon>
                </v-chip>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-carousel-item>
    </v-carousel> -->
    <!-- <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" xl="3">
        <BlockCard
          tipe="dashboard"
          title="Kelasku"
          cover="https://cdn.siap.id/s3/siap_belajar/sim/beranda-kelasku.png"
          desc="Menuju Kelas yang Anda miliki"
        />
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3" xl="3">
        <BlockCard
          tipe="dashboard"
          title="Nilai"
          cover="https://cdn.siap.id/s3/siap_belajar/sim/beranda-nilai.png"
          desc="Menuju menu nilai"
        />
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3" xl="3">
        <BlockCard
          tipe="dashboard"
          title="Bantuan"
          cover="https://cdn.siap.id/s3/siap_belajar/sim/beranda-bantuan.png"
          desc="Menuju menu bantuan"
          icon="mdi-help"
          color="#FBC02D"
        />
      </v-col>
    </v-row> -->
  </v-card>
</template>




<script>
import BlockCard from "@/components/BlockCard";
export default {
  components: {
    BlockCard
  },
  data() {
    return {
      items: [
        {
          title: "Selamat Datang di SIAP Belajar",
          description: "",
          action: "",
          actionTitle: "",
          src: "img/bg-beranda-siap-belajar1.png"
        },
        {
          title: "",
          description:
            "Kelas terbaru telah tersedia. Silakan cek pada menu Kelasku",
          action: "kelasku",
          actionTitle: "Kelasku",
          src: "img/bg-beranda-siap-belajar2.png"
        }
      ]
    };
  },
  mounted() {
    this.items[0].description = "Hai, " + this.current_user.nama;
  },
  methods: {
    toAction(action) {
      this.$router.push({
        name: action
      });
    }
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  computed: {}
};
</script>
