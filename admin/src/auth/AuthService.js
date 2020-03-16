
const LOGIN_URL = 'auth/login'
const SIGNUP_URL = 'auth/signup'

const SESSION_INFO_URL = "user/sessionInformation"
const FORGOTPASSWORD_URL = 'auth/remember-password'
const RESETPASSWORD_URL = 'auth/reset-password'

import EventEmitter from 'EventEmitter'
import {router} from '../system/routers/'

export default class AuthService {

	authenticated = this.isAuthenticated();
	sessionInfo = this.getSessionInfo();
	authNotifier = new EventEmitter();

	constructor(){
		this.setSession = this.setSession.bind(this)
		this.login = this.login.bind(this)
		this.logout = this.logout.bind(this)
		this.isAuthenticated = this.isAuthenticated.bind(this)
		this.requiresAuth = this.requiresAuth.bind(this)
	}

	logout (context) {
		// Clear access token and ID token from local storage
		localStorage.removeItem('token')
		localStorage.removeItem('expires_at')
		this.sessionInfo = null
		this.authNotifier.emit('authChange', false)
		// navigate to the home route
		router.replace('/')
	}

	isAuthenticated () {
		// Check whether the current time is past the
		// access token's expiry time
		let expiresAt = localStorage.getItem('expires_at')
		return (expiresAt && new Date().getTime() < new Date(expiresAt).getTime());
	}

	setSession(sessionData){
		localStorage.setItem("token", sessionData.token)
		localStorage.setItem('expires_at', sessionData.expires_at)
		this.authNotifier.emit('authChange', { authenticated: true })
	}

	validateToken(context, token){
		return new Promise((resolve, reject) => {
			context.$http.post("user/validateAccess", {accessCode: token}, {ignoreheaders: true}).then((res) => {
				let data = res.data.data;
				if (data.access) {
					localStorage.setItem('access_key', data.security.accessKey)
					localStorage.setItem('security_key', data.security.securityKey)
					context.$cookie.set("valid_token", token, { expires: '3Y' })
				}
				resolve(data)
			}, (err) => {
				reject(err.data.errors)
			})
		})
	}

	login(context, token, redirect) {
		return new Promise((resolve, reject) => {
			context.$http.post(LOGIN_URL, {}, {headers: {'X-FID-Authorization': `Basic ${token}`}}).then((data) => {
				const loginData = data.data;
				resolve(loginData)
			}, (err) => {
				reject(err.data)
			})
		})
	}

	signup(context, creds, redirect) {
		return new Promise((resolve, reject) => {
			context.$http.post(SIGNUP_URL, creds).then((data) => {
				const loginData = data.data.details;
				router.push('/login')
				resolve(loginData)
			}, (err) => {
				reject(err.data)
			});
		})
	}

	forgotPassword(context, email) {
		return new Promise((resolve, reject) => {
			context.$http.post(FORGOTPASSWORD_URL, {"username": email}).then((data) => {
				resolve(data)
			}, (err) => {
				reject(err.data)
			});
		})
	}

	resetPassword(context, creds) {
		return new Promise((resolve, reject) => {
			context.$http.put(RESETPASSWORD_URL, creds).then((data) => {
				resolve(data)
			}, (err) => {
				reject(err.data)
			});
		})
	}

	requiresAuth(to, from, next){
		if (!this.isAuthenticated()) {
			this.logout()
			next({
				path: '/login'
			});
		} else {
			next();
		}
	}

	getSessionInfo(){
		return JSON.parse(localStorage.getItem('session_info'));
	}

}
