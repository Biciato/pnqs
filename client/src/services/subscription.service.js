import ApiService from './api.service'
import { TokenService } from './storage.service'
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
            url: "/subscriptions",
            headers: { 'Authorization': `Bearer ${store.getters['auth/accessToken']}` }
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
            headers: { 'X-Token': TokenService.getToken() }
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
            headers: { 'X-Token': TokenService.getToken() },
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
            headers: { 'X-Token': TokenService.getToken() }
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