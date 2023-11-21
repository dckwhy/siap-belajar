import Vue from 'vue'
import { Datetime } from 'vue-datetime'
import ProgressC from './components/ProgressC'
import ProgressCard from './components/ProgressCard'
import ProgressL from './components/ProgressL'
import MAlert from './components/MAlert'
import MButton from './components/MButton'
import MLabelVal from './components/MLabelVal'
import MDatePicker from './components/MDatePicker'
import MDateTimePicker from './components/MDateTimePicker'
import MFABPlus from './components/MFABPlus.vue'
import MListing from './components/MListing.vue'
import MCard from './components/MCard.vue'
import MCardList from './components/MCardList.vue'
import MDialog from './components/MDialog.vue'
import MListTileInfo from './components/MListTileInfo'
import MLabelIcon from './components/MLabelIcon'
import MLabelInfo from './components/MLabelInfo'
import MMenu from './components/MMenu'
import MBreadcrum from './components/MBreadcrum'
import MElapsed from './components/MElapsed'
import MUploadFileDialog from './components/MUploadFileDialog'
import MUpload from './components/MUpload'
import MImage from './components/MImage'
import ProfilCard from './components/ProfilCard'
import SubMenu from './components/SubMenu'

Vue.component('sub-menu', SubMenu)
Vue.component('progress-c', ProgressC)
Vue.component('progress-card', ProgressCard)
Vue.component('progress-l', ProgressL)
Vue.component('m-labelval', MLabelVal)
Vue.component('m-button', MButton)
Vue.component('m-datepicker', MDatePicker)
Vue.component('m-datetimepicker', MDateTimePicker)
Vue.component('m-fab-plus', MFABPlus)
Vue.component('m-listing', MListing)
Vue.component('m-card', MCard)
Vue.component('m-card-list', MCardList)
Vue.component('m-dialog', MDialog)
Vue.component('m-list-tile-info', MListTileInfo)
Vue.component('m-labelicon', MLabelIcon)
Vue.component('m-labelinfo', MLabelInfo)
Vue.component('m-menu', MMenu)
Vue.component('m-breadcrum', MBreadcrum)
Vue.component('m-elapsed', MElapsed)
Vue.component('m-upload', MUploadFileDialog)
Vue.component('m-upload-single', MUpload)
Vue.component('m-image', MImage)
Vue.component('m-profil-card', ProfilCard)
Vue.component('m-alert', MAlert)

Vue.component('datetime', Datetime)
