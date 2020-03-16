/**
* Local Storage iterator.
* by Cezar Alexandre <cezaralexandredasilva@gmail.com>
**/

var LocalStorage = {}

LocalStorage.install = (Vue, options) => {
	var $localStorage = {
		set(collection, obj) {
			window.localStorage.setItem(collection, JSON.stringify(obj))
		},
		get(collection) {
			return JSON.parse(window.localStorage.getItem(collection)) || {}
		},
		remove(collection) {
			window.localStorage.removeItem(collection)
		}
	}

	Vue.prototype.$localStorage = $localStorage

	Vue.localStorage = $localStorage
}

export default LocalStorage
