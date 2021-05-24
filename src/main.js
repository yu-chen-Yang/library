import Vue from 'vue'
import App from './App.vue'
import router from "./index";
import './quasar'
Vue.config.productionTip = false
import axios from 'axios'
Vue.prototype.$axios=axios
import store from './store'



new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
