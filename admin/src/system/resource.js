
import Vue from 'vue'
import VueResource from 'vue-resource'
import {router} from "./routers"
import auth from '../auth/AuthService'

Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:8000/public/'
if(process.env.NODE_ENV === 'production'){
	Vue.http.options.root = 'http://abes-app.org.br/pnqs/api/public/'
}

Vue.http.interceptors.push((request, next) => {
	if (!request.ignoreheaders) {
		const token = localStorage.getItem("token")
		if (token) {
			Vue.http.headers.common["X-Token"] = token
		}
	}else{
		delete Vue.http.headers.common["X-Token"]
	}

	next((response) => {
		let $route = router.match(router.currentRoute.path)
		if (response.status === 500) {
			//router.push("/server-error")
		}else if(response.status === 401){
			var authService = new auth()
			const {logout} = authService
			logout()
			router.push({
				path: "/"
			})
		}
	})
})
