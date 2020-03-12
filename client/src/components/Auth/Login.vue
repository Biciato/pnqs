<template>
	<section class="section">
		<div class="container">
			<div class="columns is-centered">
				<div class="column is-two-fifths">
					<div class="card is-rounded">
						<div class="card-content">
							<h1 class="title">Entrar</h1>
							<hr>
							<b-field label="Usuário - Seu e-mail cadastrado">
								<b-input type="text" v-model="email" :class="{'is-loading': isLoading}" :disabled="isLoading"></b-input>
							</b-field>
							<b-field label="Senha">
								<b-input type="password" v-model="password" :class="{'is-loading': isLoading}" :disabled="isLoading"></b-input>
							</b-field>
							<div class="has-text-centered" v-if="errors.length > 0">
								<template v-for="error in errors">
									<span v-bind:key="error" class="has-text-danger is-size-7">{{error}}</span>
								</template>
							</div>
							<br><br>
							<div class="level">
								<div class="level-right">
									<a class="is-size-7 has-text-grey" @click="isRememberPassModalActive = true">Esqueceu sua senha?</a>
								</div>
								<div class="level-left">
									<a class="button is-primary is-medium is-fullwidth" :class="{'is-loading': isLoading}" @click="doLogin()">Login</a><br>
								</div>
							</div>
						</div>
					</div><br><br>
					<p class="has-text-centered has-text-grey">Não é cadastrado? <router-link :to="'signup'">Cadastre-se</router-link></p>
				</div>
			</div>
		</div>
		<b-modal :active.sync="isRememberPassModalActive" :canCancel="true" has-modal-card>
			<lost-password></lost-password>
		</b-modal>
	</section>
</template>

<script>

import LostPassword from './LostPassword.vue'
import store from '../../store'

export default {
	name: "Login",
	components: {
		LostPassword
	},
	data() {
		return {
			isLoading: false,
			email: "",
			password: "",
			isRememberPassModalActive: false,
			errors: []
		}
	},
	created() {
	},
	methods: {
		doLogin() {
			this.isLoading = true
            this.errors = []
			store.dispatch('auth/login', [this.email, this.password]).then((resp) => {
				if (resp) {
					this.errors.push(resp.message)
					this.isLoading = false
				}
			})
		}
	}
}
</script>
