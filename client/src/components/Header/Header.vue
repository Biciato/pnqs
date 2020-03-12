<template>
	<nav class="navbar is-info" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<!-- navbar items, navbar burger... -->
			<a class="navbar-item">
				<img :src="image" alt="">
				<h1>&nbsp;&nbsp;PNQS</h1>
			</a>
			<div class="navbar-burger">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
		<div class="navbar-menu">
			<div class="navbar-start">

			</div>
			<div class="navbar-end" v-if="loggedIn">
				<router-link :to="`/candidaturas`" class="navbar-item">Minhas candidaturas</router-link>
					<div class="navbar-item has-dropdown is-hoverable">
					<a href="#" class="navbar-link">
						<font-awesome-icon icon="user-circle" />
					</a>
					<div class="navbar-dropdown">
						<div style="display: flex; justify-content: center;">
							<a href="javascript:void(0);" @click="logout()">Sair</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>
<style>
.navbar.is-info {
	background-color: #209cee !important;
}
.svg-inline--fa {
	font-size: 20px !important;
}
</style>
<script>
import store from '../../store'

import image from '../../assets/logo-pnqs.png'

export default {
	name: "Header",
	data() {
		return {
			image
		}
	},
	computed: {
		loggedIn() { return store.getters['auth/loggedIn'] }
	},
	methods: {
		logout(){
			store.dispatch('auth/logout')
		}
	}
}
</script>
