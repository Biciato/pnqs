<template>
	<section class="section">
		<div class="container">
			<div class="columns is-centered">
				<div class="column is-two-fifths">
					<div class="card is-rounded">
						<div class="card-content">
							<h1 class="title">Entrar</h1>
							<hr>
							<b-field label="Usuário">
								<b-input type="text" v-model="username" :class="{'is-loading': isLoading}" :disabled="isLoading"></b-input>
							</b-field>
							<b-field label="Senha">
								<b-input type="password" v-model="password" :class="{'is-loading': isLoading}" :disabled="isLoading"></b-input>
							</b-field>
							<div class="has-text-centered" v-if="errors.length > 0">
								<template v-for="error in errors">
									<span class="has-text-danger is-size-7">{{error}}</span>
								</template>
							</div>
							<br><br>
							<div class="level">
								<div class="level-right">
									<a class="is-size-7 has-text-grey">Esqueceu sua senha?</a>
								</div>
								<div class="level-left">
									<a class="button is-primary is-medium is-fullwidth" :class="{'is-loading': isLoading}" @click="doLogin()">Login</a><br>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: "Login",
	props: ['auth', 'authenticated'],
	data(){
		return {
			isLoading: false,
			username: "",
			password: "",
			errors: []
		}
	},
	methods: {
		doLogin(){
			this.isLoading = true
			this.errors = []
			const authToken = this.getHash()
			this.auth.login(this, authToken).then((res) => {
				this.isLoading = false
				if (!res.is_admin) {
					alert("Acesso exclusivo para administradores.");
					this.$router.push('login')
				}else{
					this.auth.setSession(res)
					this.$router.replace('pedidos-elegibilidade')
				}
			}).catch((errors) => {
				this.errors.push(errors.message)
				this.isLoading = false
			})
		},
		getHash(){
			const token = `${this.username}:${this.password}`
			return window.btoa(token)
		}
	}
}
</script>
