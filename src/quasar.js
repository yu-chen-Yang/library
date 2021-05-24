import Vue from 'vue'

import './styles/quasar.sass'
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar, Cookies} from 'quasar'

Vue.use(Quasar, {
  config: {},
  plugins: {
      Cookies
  }
 })