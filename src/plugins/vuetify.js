import Vue from "vue";
import VGrid from "vuetify/lib/components/VGrid/";
import transitions from "vuetify/lib/components/transitions/";
import { Ripple } from "vuetify/lib/directives";

import "@mdi/font/css/materialdesignicons.css";
import { THEME_ELEARNING, THEME_ELEARNING_DARK } from "@/const";

import Vuetify, {
  VApp,
  VToolbar,
  VList,
  VCard,
  VNavigationDrawer,
  VFooter,
  VContent,
  VBtn,
  VIcon,
  VCalendar,
  VBottomNavigation,
  VCombobox,
  VDialog,
  VTextField,
  VSelect,
  VAutocomplete,
  VSpeedDial,
  VTooltip,
  VTabs,
  VAvatar,
  VDivider,
  VChip,
  VDataTable,
  VProgressLinear,
  VBadge,
  VTextarea,
  VAlert,
  VSnackbar,
  VCheckbox,
  VDatePicker,
  VParallax,
  VMenu,
  VStepper,
  VProgressCircular,
  VImg,
  VHover,
  VSheet,
  VSubheader,
  VPagination,
  VForm,
  VSlider,
  VCarousel,
  VExpansionPanel,
  VRadioGroup,
  VTimePicker,
  VTimeline,
  VFileInput
} from "vuetify/lib";

Vue.use(Vuetify, {
  components: {
    VGrid,
    VApp,
    VToolbar,
    VNavigationDrawer,
    VFooter,
    VContent,
    VList,
    VBtn,
    VIcon,
    VCard,
    VCalendar,
    VBottomNavigation,
    VCombobox,
    VDialog,
    VTextField,
    VSelect,
    VAutocomplete,
    VSpeedDial,
    VTooltip,
    VTabs,
    VAvatar,
    VDivider,
    VChip,
    VDataTable,
    VProgressLinear,
    VBadge,
    VTextarea,
    VAlert,
    VSnackbar,
    VCheckbox,
    VDatePicker,
    VParallax,
    VMenu,
    VStepper,
    VProgressCircular,
    VImg,
    VHover,
    VSheet,
    VSubheader,
    VPagination,
    VForm,
    VSlider,
    VCarousel,
    VExpansionPanel,
    VRadioGroup,
    VTimePicker,
    VTimeline,
    transitions,
    VFileInput
  },
  directives: {
    Ripple
  }
});
const lc = window.localStorage;

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    dark: lc.getItem("DARKMODE") == "true" ? true : false,
    themes: {
      light: THEME_ELEARNING,
      dark: THEME_ELEARNING_DARK
    }
  }
});
