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
								<ValidationProvider name="email" rules="required|email" v-slot="{ failedRules, errors }">
									<b-input type="text" name="username" v-model="remember.email" :disabled="isLoading"></b-input>
									<span style="color: red">{{ failedRules.required ? 'E-mail é necessário' : errors[0] }}</span>
									</ValidationProvider>
							</b-field>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<b-field label="Digite seu CNPJ">
								<ValidationProvider name="cnpj" rules="required|cnpj" v-slot="{ failedRules, errors }">
									<b-input :disabled="isLoading" name="cnpj" v-model="remember.cnpj" v-cleave="masks.cnpj" maxlength="18"></b-input>
									<span style="color: red">{{ failedRules.required ? 'CNPJ é necessário' : errors[0] }}</span>
								</ValidationProvider>
							</b-field>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<b-field label="Nova senha">
								<ValidationProvider name="password" rules="required:'Senha é necessária'" v-slot="{ errors }">
									<b-input type="password" name="password" v-model="remember.password" :disabled="isLoading"></b-input>
									<span style="color: red">{{ errors[0] && 'Senha é necessário' }}</span>
								</ValidationProvider>
							</b-field>
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
import { ValidationProvider } from 'vee-validate';

export default {
	name: "RememberPassword",
	components: {
		ValidationProvider,
	},
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
			}
		}
	},
	methods: {
		getPassword(){
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
	}
}
</script>
