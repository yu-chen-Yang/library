import Vue from 'vue'
import App from './App.vue'
import router from "./index";
import './quasar'
Vue.config.productionTip = false
import axios from 'axios'
Vue.prototype.$axios=axios



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
