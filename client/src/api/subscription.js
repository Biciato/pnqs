import Vue from 'vue'

const getAddress = (cep) => {
	return Vue.http.get(`https://viacep.com.br/ws/${cep}/json/`, {ignoreheaders: true});
}

const rememberPassword = (email) => {
	return new Promise((resolve, reject) => {
		Vue.http.post(`auth/remember-password`, {"email": email}).then((result) => {
			resolve(result)
		}).catch((error) => {
			reject(error)
		})
	})
}

const changePassword = (data) => {
	return new Promise((resolve, reject) => {
		Vue.http.post(`auth/change-password`, data).then((result) => {
			resolve(result)
		}).catch((error) => {
			reject(error)
		})
	})
}

const save = (data) => {
	return new Promise((resolve, reject) => {
		Vue.http.post(`subscription/`, data).then((result) => {
			resolve(result)
		}).catch((error) => {
			reject(error)
		})
	})
}

const update = (data) => {
	return new Promise((resolve, reject) => {
		Vue.http.put(`subscription/`, data).then((result) => {
			resolve(result)
		}).catch((error) => {
			reject(error)
		})
	})
}

const remove = (id) => {
	return new Promise((resolve, reject) => {
		Vue.http.delete(`subscription/${id}`).then((result) => {
			resolve(result)
		}).catch((error) => {
			reject(error)
		})
	})
}

const get = (id) => {
	const _url = (id) ? `subscription/${id}` : `subscription/`;
	return new Promise((resolve, reject) => {
		Vue.http.get(_url).then((result) => {
			resolve(result)
		}).catch((error) => {
			reject(error)
		})
	})
}

export default{
	save,
	get,
	update,
	getAddress,
	remove,
	rememberPassword,
	changePassword
}
