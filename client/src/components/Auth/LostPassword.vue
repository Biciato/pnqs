<template>
			<div class="modal-card">
				<header class="modal-card-head">
					<h3 class="title">Recuperar senha</h3>
				</header>
				<section class="modal-card-body">
					<div class="columns">
						<div class="column">
							<div class="has-text-centered" v-if="serverErrors.length > 0">
								<template v-for="error in serverErrors">
									<span v-bind:key="error" class="has-text-danger is-size-7">{{error}}</span>
								</template>
							</div>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<b-field label="Digite seu e-mail">
								<b-input type="text" name="username" v-model="remember.email" :disabled="isLoading"></b-input>
							</b-field>
							<span style="color: red" v-if="[undefined, ''].includes(remember.email) && validated">E-mail é necessário</span>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<b-field label="Digite seu CNPJ">
								<b-input :disabled="isLoading" name="cnpj" v-model="remember.cnpj" v-mask="'##.###.###/####-##'" maxlength="18"></b-input>
							</b-field>
							<span style="color: red" v-if="[undefined, ''].includes(remember.cnpj) && validated">CNPJ é necessário</span>
							<span style="color: red" v-if="remember.cnpj && remember.cnpj.length < 18 && validated">CNPJ inválido</span>
						</div>						
					</div>
					<div class="columns">
						<div class="column">
							<b-field label="Nova senha">
								<b-input type="password" name="password" v-model="remember.password" :disabled="isLoading"></b-input>
								
							</b-field>
							<span style="color: red" v-if="[undefined, ''].includes(remember.password) && validated">Senha é necessário</span>
						</div>						
					</div>
				</section>
				<footer class="modal-card-foot">
					<button type="button" class="button is-primary" :class="{'is-loading': isLoading}" @click="getPassword()">Salvar</button>
					<button type="button" class="button" :disabled="isLoading" @click="$parent.close()">Cancelar</button>
				</footer>
			</div>
	
</template>

<script>
import UserService from '../../services/user.service'

export default {
	name: "RememberPassword",
	data(){
		return {
			isLoading: false,
			remember: {},
			serverErrors: [],
			masks: {
				cnpj: {
					delimiters: ['.', '.', '/', '-'],
					blocks: [2,3,3,4,2],
					numericOnly: true
				}
			},
			validated: false
		}
	},
	methods: {
		getPassword(){
			this.validated = false
			if (this.validate()) {
				this.validated = true
			} else {
				this.serverErrors = []
				this.isLoading = true
				UserService.changePassword(this.remember).then(() => {
					this.$buefy.dialog.alert({
						title: 'Sucesso',
						message: 'Senha alterada com sucesso !!!',
						confirmText: 'Ok!'
					})
					this.$parent.close()
				}).catch((errors) => {
					this.serverErrors.push(errors.message)
					this.isLoading = false
				})
			}
		},
		validate() {
			return ['cnpj', 'password', 'email'].some(item => !this.remember[item] || (this.remember[item] === ''))
		}

	}
}
</script>
