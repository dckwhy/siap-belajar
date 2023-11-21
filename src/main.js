import "@babel/polyfill";
import Vue from "vue";
import "./interceptor";
import "./filter";
import "./mixin";
import "./global_components";
import "roboto-fontface/css/roboto/roboto-fontface.css";

import "./assets/sass/variables.scss";

// import plugin
import "./plugins";
import { DSN_SENTRY } from "@/const";
import { Datetime } from "vue-datetime";
// You need a specific loader for CSS files
import "vue-datetime/dist/vue-datetime.css";

Vue.use(Datetime);
import { Settings } from "luxon";
//set to display dates for English language
Settings.defaultLocale = "id";

// integrasi sentry
import * as Sentry from "@sentry/browser";
import * as Integrations from "@sentry/integrations";

Sentry.init({
  dsn: DSN_SENTRY,
  integrations: [
    new Integrations.Vue({
      Vue,
      attachProps: true,
      logErrors: true,
    }),
  ],
});

// Integrasi Google Maps
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GMAP_KEY,
    libraries: 'places,drawing,geometry',
    language: 'id',
  },
  installComponents: true,
})

import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./registerServiceWorker";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
