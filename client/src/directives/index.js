import Vue from 'vue'
import Cleave from 'cleave.js'


const CleaveD = {
	name: 'cleave',
	bind(el, binding) {
		const input = el.querySelector('input')
		input._vCleave = new Cleave(input, binding.value)
	},
	update(el, binding) {
		const input = el.querySelector('input')
		input._vCleave.destroy()
		input._vCleave = new Cleave(input, binding.value)
	},
	unbind(el) {
		const input = el.querySelector('input')
		input._vCleave.destroy()
	}
}

export default {
	CleaveD
}

Vue.directive("cleave", CleaveD)
