import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { cleave } from './directives/index'
import * as filters from './filters/index'
import * as validators from './validators/index'
import ApiService from './services/api.service'
import { TokenService } from './services/storage.service'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueTheMask from 'vue-the-mask'
import VueRamda from 'vue-ramda'

library.add(faUserCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)
 
Vue.config.productionTip = false

// Set the base URL of the API
const baseUrl = process.env.NODE_ENV === "production"
                  ? 'http://abes-app.org.br/teste/api/public/'
                  : 
                  //'http://0.0.0.0:9000/'
                  'http://localhost:8000/public/'
ApiService.init(baseUrl)

// If token exists set header
if (TokenService.getToken()) {
  ApiService.setHeader()
}

Vue.use(Buefy)
Vue.use(validators)
Vue.use(VueTheMask)
Vue.use(filters)
Vue.use(VueRamda)
Vue.config.productionTip = false

Vue.directive('cleave', cleave)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
