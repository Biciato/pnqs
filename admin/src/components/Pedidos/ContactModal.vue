<template>
    <div class="modal-card" style="width: 660px;">
        <header class="modal-card-head">
            <p class="modal-card-title">Cadastrar Contato</p>
        </header>
        <section class="modal-card-body">
            <template v-if="uniques().length < 1">
                <p class="is-danger">Você já cadastrou todos os seus contatos. É possível cadastrar novos desde que exclua o anterior.</p>
            </template>
			<form @submit.prevent="saveContact">
				<div class="columns">
					<div class="column">
						<b-field label="Tipo de Contato">
							<b-select v-model="selected" name="categoria">
								<option v-for="category in uniques()"
										:value="category.key"
										:key="category.key">
										{{ category.val }}
								</option>
							</b-select>
						</b-field>
					</div>
				</div>
				<div class="columns">
					<div class="column">
						<b-field label="Nome">
							<b-input type="text" v-model="editContact.name" name="name"></b-input>
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
							<b-input type="email" v-model="editContact.email" name="email"></b-input>
						</b-field>
					</div>
				</div>
				<button class="button is-primary" type="submit" :disabled="invalid">Salvar</button>
			</form>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="$parent.close()">Cancelar</button>
        </footer>
    </div>
</template>

<script>

export default {
	props: ['subscription', 'contact'],
	data(){
		return {
            selected: '',
			editContact: {
                type: "",
                phone: '',
                email: '',
                name: ''
			},
            categories: [
                { key: "DIR", val: 'Principal dirigente', sub_cat: [1,2,3,4] },
                { key: "RES", val: 'Responsável Candidatura', sub_cat: [1,2,3,4] },
                { key: "APR", val: 'Apresentador do Case  no Seminário de benchmarking', sub_cat: [1,2] },
                { key: "REP", val: 'Representante no Seminário de benchmarking', sub_cat: [3,4] },
                { key: "FOR", val: 'Fornecedor indicado', sub_cat: [3] }
            ]
		}
	},
	created(){
		if (Object.keys(this.contact).length > 0){
            this.selected = this.categories.find(cat => cat.key === this.contact.type).key
            this.editContact = this.contact
		}
	},
	methods: {
		saveContact(){
            if (this.subscription.contacts.some(contact => contact.type === this.contact.type)) {
                this.subscription.contacts = this.subscription.contacts.map(contact => {
                    if (contact.type === this.contact.type) {
                        return {
                            ... this.editContact,
                            type: this.selected
                        }
                    }
                    return contact
                })
            } else {
                this.subscription.contacts.push({
                            ... this.editContact,
                            type: this.selected
                        })
            }
            this.$parent.close()
        },
        uniques() {
            return this.categories.filter(cat => {
                if (cat.sub_cat.includes(parseInt(this.subscription.subscription_category_id))) {
                    if (Object.keys(this.contact).length > 0) {
                        if (this.editContact.type === cat.key) {
                            return true
                        } else if (!this.subscription.contacts.some(contact => contact.type === cat.key)) {
                            return true
                        } else {
                            return false
                        }
                    } else if (!this.subscription.contacts.some(contact => contact.type === cat.key)) {
                        return true
                    }
                }
            })
        }
	}
}
</script>
