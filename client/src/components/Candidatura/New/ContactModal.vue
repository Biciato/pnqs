<template>
    <div class="modal-card" style="width: 660px;">
        <header class="modal-card-head">
            <p class="modal-card-title">Cadastrar Contato</p>
        </header>
        <section class="modal-card-body">
            <ValidationObserver v-slot="{ invalid }">
                <form @submit.prevent="saveContact">
                    <div class="columns">
                        <div class="column">
                            <b-field label="Categoria do Contato">
                                <ValidationProvider name="categoria" rules="required" v-slot="{ errors }">
                                    <b-select v-model="editContact.type" name="categoria">
                                        <option value="DIR">Principal dirigente</option>
                                        <option value="RES">Responsável Candidatura</option>
                                        <option value="APR">Apresentador do Case  no Seminário de benchmarking</option>
                                        <option value="REP">Representante no Seminário de benchmarking</option>
                                        <option value="FOR">Fornecedor indicado</option>
                                    </b-select>
                                    <span>{{ errors[0] }}</span>
                                </ValidationProvider>
                            </b-field>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <b-field label="Nome">
                                <ValidationProvider name="name" rules="required" v-slot="{ errors }">
                                    <b-input type="text" v-model="editContact.name" name="name"></b-input>
                                    <span>{{ errors[0] }}</span>
                                </ValidationProvider>
                            </b-field>
                        </div>
                        <div class="column">
                            <b-field label="Telefone">
                                <b-input type="text" v-model="editContact.phone" name="phone" v-mask="'(##) #####-####'" ></b-input>
                            </b-field>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <b-field label="E-mail">
                                <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                                    <b-input type="email" v-model="editContact.email" name="email"></b-input>
                                    <span>{{ errors[0] }}</span>
                                </ValidationProvider>
                            </b-field>
                        </div>
                    </div>
                    <button class="button is-primary" type="submit" :disabled="invalid">Salvar</button>
                </form>
            </ValidationObserver>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="$parent.close()">Cancelar</button>
        </footer>
    </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
	components: {
		ValidationProvider, ValidationObserver
	},
	props: ['subscription', 'contact'],
	data(){
		return {
			editContact: {
                type: "",
                phone: '',
                email: '',
                name: ''
			}
		}
	},
	created(){
		if (this.contact){
			this.editContact = this.contact
		}
	},
	methods: {
		saveContact(){
            this.$emit('added-contact', this.editContact)
            this.$parent.close()
		}
	}
}
</script>
