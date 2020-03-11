<template>
	<ValidationObserver v-slot="{ invalid }">
		<form class="">
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
									<b-input type="text" name="email" v-model="remember.email" :disabled="isLoading"></b-input>
									<span style="color: red">{{ failedRules.required ? 'E-mail é necessário' : errors[0] }}</span>
									</ValidationProvider>
							</b-field>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<b-field label="Digite seu CNPJ">
								<b-input type="text" name="cnpj" v-model="remember.cnpj" :disabled="isLoading" v-mask="'##.###.###/####-##'"></b-input>
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
					<button type="button" class="button is-primary" :class="{'is-loading': isLoading}" @click="getPassword()" :disabled="invalid">Salvar</button>
					<button type="button" class="button" :disabled="isLoading" @click="$parent.close()">Cancelar</button>
				</footer>
			</div>
		</form>
	</ValidationObserver>
</template>

<script>
import UserService from '../../services/user.service'
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
	name: "RememberPassword",
	components: {
		ValidationProvider,
		ValidationObserver
	},
	data(){
		return {
			isLoading: false,
			remember: {},
			serverErrors: [],
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
