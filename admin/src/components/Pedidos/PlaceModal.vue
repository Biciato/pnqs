<template>
	<form action="">
		<div class="modal-card" style="width: 660px;">
			<header class="modal-card-head">
				<p class="modal-card-title">Incluir local com força de trabalho</p>
			</header>
			<section class="modal-card-body">
				<form @submit.prevent="savePlace">
					<div class="columns">
						<div class="column is-half">
							<b-field label="CEP">
								<b-input type="text" name="zipcode" v-model="editedPlace.zipcode" autocomplete="post-code" :disabled="isLoading"></b-input>
							</b-field>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<b-field label="Nome">
								<b-input type="text" name="name" v-model="editedPlace.name"></b-input>
							</b-field>
						</div>
						<div class="column">
							<b-field label="Quantidade de Pessoas na força de trabalho (aprox.)">
								<b-input type="text" name="numberFT" v-model="editedPlace.persons_qtd"></b-input>
							</b-field>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<b-field label="Logradouro">
								<b-input type="text" name="street" v-model="editedPlace.street" :disabled="isLoading" autocomplete="address-line1"></b-input>
							</b-field>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<b-field label="Número">
								<b-input type="number" name="number" min="1" step="1" v-model="editedPlace.number" :disabled="isLoading"></b-input>
							</b-field>
						</div>
						<div class="column">
							<b-field label="Complemento">
								<b-input type="text" :disabled="isLoading" v-model="editedPlace.complement"></b-input>
							</b-field>
						</div>
					</div>
					<div class="columns">
						<div class="column">
							<b-field label="Cidade">
								<b-input type="text" name="city" v-model="editedPlace.city" :disabled="isLoading"></b-input>
							</b-field>
						</div>
						<div class="column">
							<b-field label="Bairro">
								<b-input type="text" name="neighborhood" v-model="editedPlace.neighborhood" :disabled="isLoading"></b-input>
							</b-field>
						</div>
						<div class="column">
							<b-field label="Estado">
								<b-select id="estado" name="state" v-model="editedPlace.state" :disabled="isLoading">
									<option value="AC">Acre</option>
									<option value="AL">Alagoas</option>
									<option value="AM">Amazonas</option>
									<option value="AP">Amapá</option>
									<option value="BA">Bahia</option>
									<option value="CE">Ceará</option>
									<option value="DF">Distrito Federal</option>
									<option value="ES">Espírito Santo</option>
									<option value="GO">Goiás</option>
									<option value="MA">Maranhão</option>
									<option value="MT">Mato Grosso</option>
									<option value="MS">Mato Grosso do Sul</option>
									<option value="MG">Minas Gerais</option>
									<option value="PA">Pará</option>
									<option value="PB">Paraíba</option>
									<option value="PR">Paraná</option>
									<option value="PE">Pernambuco</option>
									<option value="PI">Piauí</option>
									<option value="RJ">Rio de Janeiro</option>
									<option value="RN">Rio Grande do Norte</option>
									<option value="RO">Rondônia</option>
									<option value="RS">Rio Grande do Sul</option>
									<option value="RR">Roraima</option>
									<option value="SC">Santa Catarina</option>
									<option value="SE">Sergipe</option>
									<option value="SP">São Paulo</option>
									<option value="TO">Tocantins</option>
								</b-select>
							</b-field>
						</div>
					</div>
					<button type="submit" class="button is-primary" :disabled="invalid">Salvar</button>
				</form>
			</section>
			<footer class="modal-card-foot">
				<button class="button" type="button" @click="$parent.close()">Cancelar</button>
			</footer>
		</div>
	</form>
</template>

<script>

import axios from 'axios'

export default {
	props: ['subscription', 'place'],
	data(){
		return {
			isLoading: false,
			masks: {
				cep: {
					delimiters: ['-'],
					blocks: [5,3],
					//numericOnly: true
				}
			},
            editedPlace: null
		}
	},
	watch: {
		"editedPlace.zipcode"(newValue){
			var cep = newValue.split("-").join("")
			if (cep.length >= 8) {
                axios.defaults.headers.common = {}
				axios.get(`https://viacep.com.br/ws/${cep}/json/`, {ignoreheaders: true}).then((res) => {
					let address = res.data
					this.editedPlace.neighborhood = address.bairro
					this.editedPlace.city = address.localidade
					this.editedPlace.street = address.logradouro
					this.editedPlace.state = address.uf
					this.editedPlace.country = "Brazil"
					this.isLoading = false
				})
			}
		}
	},
	created(){
		if (!this.place){
			this.editedPlace = {
				zipcode: "",
				street: "",
				state: "",
				neighborhood: "",
				city: "",
				country: ""
			}
		} else {
            this.editedPlace = this.place
        }
	},
	methods: {
		savePlace(){
			this.$emit('added-place', this.editedPlace)
			this.$parent.close()
		}
	}
}
</script>
