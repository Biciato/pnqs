import ApiService from './api.service'
import store from '../store/index'

class AuthenticationError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const SubscriptionService = {
    /**
     * Login the user and store the access token to TokenService. 
     * 
     * @returns access_token
     * @throws AuthenticationError 
    **/
    index: async function() {
        const requestData = {
            method: 'get',
            // url: "/subscriptions/",
            url: "/subscription/",
            headers: { 'X-Token': store.getters['auth/accessToken'] }
            // headers: { 'Authorization': `Bearer ${store.getters['auth/accessToken']}` }
        }

        try {
            const response = await ApiService.customRequest(requestData)
            
            ApiService.mount401Interceptor();

            return response.data.result
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },
    show: async function(id) {
        const requestData = {
            method: 'get',
            url: `/subscription/${id}`,
            // headers: { 'Authorization': `Bearer ${store.getters['auth/accessToken']}` }
            headers: { 'X-Token': store.getters['auth/accessToken'] }
        }

        try {
            const response = await ApiService.customRequest(requestData)
            ApiService.mount401Interceptor();
            return response.data.result
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },
    store: async function(subscription) {
        const requestData = {
            method: 'post',
            url: `/subscription/`,
            // headers: { 'Authorization': `Bearer ${store.getters['auth/accessToken']}` },
            headers: { 'X-Token': store.getters['auth/accessToken'] },
            data: {
                ...subscription
            }
        }

        try {
            const response = await ApiService.customRequest(requestData)
            
            return response.data
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },
    update: async function(subscription) {
        const requestData = {
            method: 'put',
            url: '/subscription/',
            // headers: { 'Authorization': `Bearer ${store.getters['auth/accessToken']}` },
            headers: { 'X-Token': store.getters['auth/accessToken'] },
            data: {
                ...subscription
            }
        }

        try {
            const response = await ApiService.customRequest(requestData)
            
            return response.data
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },
    delete: async function(id) {
        const requestData = {
            method: 'delete',
            url: `/subscription/${id}`,
            // headers: { 'Authorization': `Bearer ${store.getters['auth/accessToken']}` }
            headers: { 'X-Token': store.getters['auth/accessToken'] }
        }

        try {
            const response = await ApiService.customRequest(requestData)
            
            return response.data
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    }
}

export default SubscriptionService

export { SubscriptionService, AuthenticationError }