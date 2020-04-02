import {
	extend
} from 'vee-validate'

extend('cnpj', {
	validate(value) {
		return value.length === 18;
	},
	params: ['length'],
	message: 'CNPJ inválido'
});

extend('required', {
	validate(value) {
		return {
			required: true,
			valid: ['', false, null, undefined].indexOf(value) === -1
		};
	},
	computesRequired: true,
	message: 'Campo obrigatório.'
});

extend('email', {
	validate(value) {
		return {
			valid: value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
		};
	},
	message: 'E-mail inválido',
	computesRequired: true
});