import Vue from 'vue'
import Buefy from 'buefy'

import {router} from './routers'
import {filters} from './filters'
//import Validators from './validators'
import HttpConfigs from './resource'

//Import my owns plugins
import LocalStorage from './plugins/localStorage'


import load from './load'

import App from '../components/App.vue'

Vue.use(LocalStorage)

Vue.use(Buefy)

// Start the app on the #app div
new Vue({
	router,
	el: '#app',
	render: h => h(App),
	components: { App }
})
