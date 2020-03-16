import Vue from 'vue'

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

const get_all = (filters) => {
	return new Promise((resolve, reject) => {
		Vue.http.post('subscriptions', filters).then((result) => {
			resolve(result)
		}).catch((error) => {
			reject(error)
		})
	})
}

export default{
	save,
	update,
	get,
	get_all
}
