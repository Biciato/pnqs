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
			valid: value.match(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/)
		};
	},
	message: 'E-mail inválido',
	computesRequired: true
});