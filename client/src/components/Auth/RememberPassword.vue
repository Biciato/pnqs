<template>
	<section class="section">
		<div class="container">
			<div class="columns is-centered">
				<div class="column is-two-fifths">
					<div class="card is-rounded">
						<div class="card-content">
							<h1 class="title">Lembrar sua senha</h1>
							<hr>
							<div class="columns">
								<div class="column">
									<b-field label="Seu e-mail cadastrado">
										<b-input type="text" v-model="username" :class="{'is-loading': isLoading}" :disabled="isLoading"></b-input>
									</b-field>
								</div>
							</div>
							<div class="columns">
								<div class="column">
									<b-field label="Nova senha">
										<b-input type="password" v-model="password" :class="{'is-loading': isLoading}" :disabled="isLoading"></b-input>
									</b-field>
								</div>
								<div class="column">
									<b-field label="Repita a senha">
										<b-input type="password" v-model="retypePassword" :class="{'is-loading': isLoading}" :disabled="isLoading"></b-input>
									</b-field>
								</div>
							</div>
							<div class="columns">
								<div class="column">
									<div class="has-text-centered" v-if="errors.length > 0">
										<template v-for="error in errors">
											<span v-bind:key="error" class="has-text-danger is-size-7">{{error}}</span>
										</template>
									</div>
								</div>
							</div>
							<div class="level">
								<div class="level-left">
									<a class="button is-primary is-medium is-fullwidth" :class="{'is-loading': isLoading}" @click="changePassword()">Alterar senha</a><br>
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

import subscriptionApi from '../../api/subscription'

export default {
	name: "RememberPassword2",
	data(){
		return {
			isLoading: false,
			username: "",
			password: "",
			retypePassword: "",
			hash: "",
			errors: []
		}
	},
	created(){
		this.hash = this.$route.params.hash
		this.username = this.decodeHash(this.hash)
	},
	methods: {
		changePassword(){
			const data = {email: this.username, password: this.password, hash: this.hash}
			subscriptionApi.changePassword(data).then(() => {
				this.$toast.open({
					message: 'Senha alterada com sucesso!',
					type: 'is-success'
				})
				this.$router.push(`/`)
			})
		},
		decodeHash(hash){
			return window.atob(hash)
		}
	}
}
</script>
