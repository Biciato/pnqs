import Cleave from 'cleave.js'

export const cleave = {
	name: 'cleave',
	bind(el, binding) {
		const input = el.querySelector('input')
		input._vCleave = new Cleave(input, binding.value)
	},
	unbind(el) {
		const input = el.querySelector('input')
		input._vCleave.destroy()
	}
}
