
import Vue from 'vue'

import VeeValidate from 'vee-validate'
import {Validator} from 'vee-validate'
import messagesBR from '../locales/veeValidatePt-BR.js'

const cnpjRule = {
	getMessage(field, params, data) {
		return (data && data.message) || 'Entre um CNPJ válido';
	},
	validate(value, args) {
		const val = String(value)
		if(/(^(\d{2}.\d{3}.\d{3}\/\d{4}-\d{2})|(\d{14})$)/g.test(val)){
			return validarCNPJ(val)
		}
		return false;
	}
};

const minTwoWords = {
	getMessage(field, params, data) {
		return (data && data.message) || 'Digite no minimo 2 palavras.';
	},
	validate(value, args) {
		const val = String(value)
		let test = val.trim().split(" ")
		let result = false
		if (test.length >= 2) {
			result = true;
		}
		return result
	}
}

function validarCNPJ(cnpj) {

	cnpj = cnpj.replace(/[^\d]+/g,'');

	if(cnpj == '') return false;

	if (cnpj.length != 14)
	return false;

	// Elimina CNPJs invalidos conhecidos
	if (cnpj == "00000000000000" ||
	cnpj == "11111111111111" ||
	cnpj == "22222222222222" ||
	cnpj == "33333333333333" ||
	cnpj == "44444444444444" ||
	cnpj == "55555555555555" ||
	cnpj == "66666666666666" ||
	cnpj == "77777777777777" ||
	cnpj == "88888888888888" ||
	cnpj == "99999999999999")
	return false;

	// Valida DVs
	var tamanho = cnpj.length - 2
	var numeros = cnpj.substring(0,tamanho);
	var digitos = cnpj.substring(tamanho);
	var soma = 0;
	var pos = tamanho - 7;
	for (var i = tamanho; i >= 1; i--) {
		soma += numeros.charAt(tamanho - i) * pos--;
		if (pos < 2)
		pos = 9;
	}
	var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
	if (resultado != digitos.charAt(0))
	return false;

	tamanho = tamanho + 1;
	numeros = cnpj.substring(0,tamanho);
	soma = 0;
	pos = tamanho - 7;
	for (var i = tamanho; i >= 1; i--) {
		soma += numeros.charAt(tamanho - i) * pos--;
		if (pos < 2)
		pos = 9;
	}
	resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
	if (resultado != digitos.charAt(1))
	return false;

	return true;

}


const creditCardNumber = {
	getMessage(field, params, data) {
		return (data && data.message) || 'Número de Cartão de Crédito inválido.';
	},
	validate(value, args) {
		return Iugu.utils.validateCreditCardNumber(value)
	}
}

Validator.extend('cnpj', cnpjRule)
Validator.extend('minTwoWords', minTwoWords)
Validator.extend('creditCardNumber', creditCardNumber)

Vue.use(VeeValidate, {
	locale: 'pt_BR',
	dictionary: {
		pt_BR: {
			messages: messagesBR
		}
	}
})
