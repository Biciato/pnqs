<template>
	<div id="app">
		<AppHeader :auth="auth"></AppHeader>
		<div class="container">
			<transition name="fade" mode="out-in">
				<router-view :auth="auth" :authenticated="authenticated"></router-view>
			</transition>
		</div>

	</div>
</template>
<script>

import AppHeader from './Header/Index.vue';

import AuthService from '../auth/AuthService';



const auth = new AuthService()
const { login, logout, authenticated, sessionInfo, authNotifier } = auth

export default {
	name: 'App',
	components: {
		AppHeader
	},
	data(){
		authNotifier.on('authChange', authState => {
			this.authenticated = authState.authenticated
			this.sessionInfo = (authState.session_info) ? authState.session_info : null
		})
		return {
			auth,
			authenticated,
			sessionInfo
		}
	}
}
</script>
