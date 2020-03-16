<template>
	<nav class="navbar is-link" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<!-- navbar items, navbar burger... -->
			<a class="navbar-item">
				<img src="static/images/voteweb-logo.png" alt="">
				<h1>&nbsp;&nbsp;PNQS Admin</h1>
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
			<div class="navbar-end">
				<router-link :to="`/pedidos-elegibilidade`" class="navbar-item">Pedidos de Elegibilidade</router-link>
				<div class="navbar-item has-dropdown is-hoverable">
					<a href="#" class="navbar-link">
						<b-icon	icon="account-circle"></b-icon>
					</a>
					<div class="navbar-dropdown">
						<a href="#" @click="auth.logout()" class="navbar-item">Sair</a>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	name: "Header",
	props: ["auth"]
}
</script>
