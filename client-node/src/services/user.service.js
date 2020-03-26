import ApiService from './api.service'
import { TokenService } from './storage.service'
import AuthenticationError from '../models/AuthenticatorError'

const UserService = {
    /**
     * Login the user and store the access token to TokenService. 
     * 
     * @returns access_token
     * @throws AuthenticationError 
    **/
    login: async function(email, password) {
        const requestData = {
            method: 'post',
            url: "/auth/login",
            data: {
                username: email,
                password
            }
        }

        try {
            const response = await ApiService.customRequest(requestData)
            
            TokenService.saveToken(response.data.token)
            TokenService.saveRefreshToken(response.data.refresh_token)
            ApiService.setHeader()
            
            // NOTE: We haven't covered this yet in our ApiService 
            //       but don't worry about this just yet - I'll come back to it later
            ApiService.mount401Interceptor();

            return response.data.token
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.error)
        }
    },

    /**
     * Refresh the access token.
    **/
    refreshToken: async function() {
        const refreshToken = TokenService.getRefreshToken()

        const requestData = {
            method: 'post',
            url: "/auth/login/",
            data: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            },
            auth: {
                username: process.env.VUE_APP_CLIENT_ID,
                password: process.env.VUE_APP_CLIENT_SECRET
            }
        }

        try {
            const response = await ApiService.customRequest(requestData)

            TokenService.saveToken(response.data.access_token)
            TokenService.saveRefreshToken(response.data.refresh_token)
            // Update the header in ApiService
            ApiService.setHeader()

            return response.data.access_token
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }

    },

    /**
     * Logout the current user by removing the token from storage. 
     * 
     * Will also remove `Authorization Bearer <token>` header from future requests.
    **/
    logout() {
        // Remove the token and remove Authorization header from Api Service as well 
        TokenService.removeToken()
        TokenService.removeRefreshToken()
        ApiService.removeHeader()
    },

    signup: async function(data) {
        const requestData = {
            method: 'post',
            url: "/auth/signup",
            data: { ...data }
        }

        try {
            const response = await ApiService.customRequest(requestData)

            return response.data
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.message)
        }
    },

    changePassword: async function(params) {
        const requestData = {
            method: 'post',
            url: "/auth/change-password",
            data: params
        }

        try {
            const response = await ApiService.customRequest(requestData)
            
            ApiService.mount401Interceptor();

            return response.data
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.message)
        }
    },
    update: async function(params) {
        const requestData = {
            method: 'post',
            url: '/auth/update',
            data: params
        }

        try {
            const response = await ApiService.customRequest(requestData)

            return response
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.message)
        }
    }
}

export default UserService

export { UserService }