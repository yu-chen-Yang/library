import Vue from 'vue'
import App from './App.vue'
import router from "./index";
import './quasar'
Vue.config.productionTip = false
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
new Vue({
  router,
  axios,
  render: h => h(App),
}).$mount('#app')
