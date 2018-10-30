import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import VueLogger from 'vuejs-logger'
import LoggerConfig from './config/logger'
import 'vuetify/dist/vuetify.min.css'
import '@/assets/scss/whitney.scss'

Vue.use(Vuetify, {
  theme: {

    blue1: '#24B9EF',
    blue2: '#0891C2',
    blue3: '#0073A4',

    green1: '#24B9EF',
    green2: '#84B231',
    green3: '#66960E',

    red1: '#FF9374',
    red2: '#EE572C',
    red3: '#CC370D',

    primary: '#24B9EF',
    secondary: '#FFCDD2',
    accent: '#9ECE49'
  }
})

Vue.use(VueLogger, LoggerConfig)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
