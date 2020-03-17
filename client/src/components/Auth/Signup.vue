<template>
	<section class="section">
		<div class="container">
			<div class="columns is-centered">
				<div class="column is-two-fifths">
					<div class="card is-rounded">
						<div class="card-content">
							<h1 class="title">Cadastre-se</h1>
							<hr>
							<b-field label="Nome">
								<b-input type="text" v-model="user.name" :class="{'is-loading': isLoading}" :disabled="isLoading"></b-input>
							</b-field>
							<b-field label="E-mail">
								<b-input type="text" v-model="user.username" :class="{'is-loading': isLoading}" :disabled="isLoading"></b-input>
							</b-field>
							<b-field label="CNPJ">
								<b-input type="text" v-model="user.cnpj" :class="{'is-loading': isLoading}" :disabled="isLoading" 
									v-mask="'##.###.###/####-##'" maxlength="18"></b-input>
							</b-field>
							<b-field label="Senha">
								<b-input type="password" v-model="user.password" :class="{'is-loading': isLoading}" :disabled="isLoading"></b-input>
							</b-field>
							<div class="has-text-centered" v-if="errors.length > 0">
								<template v-for="error in errors">
									<span v-bind:key="error" class="has-text-danger is-size-7">{{error}}</span>
								</template>
							</div>
							<br><br>
							<div class="field is-grouped">
								<p class="control">
									<a class="button is-primary" :class="{'is-loading': isLoading}" @click="signup()">Cadastrar</a><br>
								</p>
								<p class="control">
									<a class="button" :class="{'is-loading': isLoading}" @click="back()">Cancelar</a><br>
								</p>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import UserService from '../../services/user.service'
export default {
	data() {
		return {
			user: {},
			isLoading: false,
			masks: {
				cnpj: {
					delimiters: ['.', '.', '/', '-'],
					blocks: [2,3,3,4,2],
					numericOnly: true
				},
			},
			errors: []
		}
	},
	methods: {
		signup(){
			this.errors = []
			if (Object.keys(this.user).some(key => this.user[key] === '')) {
				this.errors.push('Por favor, preencha todos os dados')
			} else if (this.user.cnpj.length < 18) { 
				this.errors.push('CNPJ inválido')
			} else if (!this.user.username.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
				this.errors.push('Formato de e-mail inválido')
			} else {
				this.isLoading = true
				UserService.signup(this.user).then(() => {
					this.isLoading = false
					this.$buefy.toast.open({
						message: 'Usuário cadastrado com sucesso!',
						type: 'is-success'
					})
					this.$router.push({path: "/login", params: {completed: true}})
				}).catch((errors) => {
					this.errors.push(errors.message)
					this.isLoading = false
				})
			}
		},
		back(){
			this.$router.push("/login")
		}
	}
}
</script>
