import { UserService } from '../services/user.service'
import { TokenService } from '../services/storage.service'
import router from '../router'
import AuthenticationError from '../models/AuthenticatorError'

const state =  {
    authenticating: false,
    accessToken: TokenService.getToken(),
    authenticationErrorCode: 0,
    authenticationError: '',
    refreshTokenPromise: null
}

const getters = {
    loggedIn: (state) => {
        return state.accessToken ? true : false
    },

    accessToken: (state) => {
        return state.accessToken 
    },

    authenticationErrorCode: (state) => {
        return state.authenticationErrorCode
    },

    authenticationError: (state) => {
        return state.authenticationError
    },

    authenticating: (state) => {
        return state.authenticating
    }
}

const actions = {
    async login({ commit }, credentials) {
        commit('loginRequest');

        try {
            const token = await UserService.login(...credentials);
            commit('loginSuccess', token)


            return true
        } catch (e) {
            if (e instanceof AuthenticationError) {
                commit('loginError', {errorCode: e.errorCode, errorMessage: e.message})
            }

            return false
        }
    },

    logout({ commit }) {
        UserService.logout()
        commit('logoutSuccess')
        router.push('/login')
    },

    refreshToken({ commit, state }) {
        // If this is the first time the refreshToken has been called, make a request
        // otherwise return the same promise to the caller
        if(!state.refreshTokenPromise) {
            const p = UserService.refreshToken()
            commit('refreshTokenPromise', p)

            // Wait for the UserService.refreshToken() to resolve. On success set the token and clear promise
            // Clear the promise on error as well.
            p.then(
                response => {
                    commit('refreshTokenPromise', null)
                    commit('loginSuccess', response)
                },
                () => {
                    commit('refreshTokenPromise', null)
                }
            )
        }

        return state.refreshTokenPromise
    }
}

const mutations = {
    loginRequest(state) {
        state.authenticating = true;
        state.authenticationError = ''
        state.authenticationErrorCode = 0
    },

    loginSuccess(state, accessToken) {
        state.accessToken = accessToken
        state.authenticating = false;
    },

    loginError(state, {errorCode, errorMessage}) {
        state.authenticating = false
        state.authenticationErrorCode = errorCode
        state.authenticationError = errorMessage
    },

    logoutSuccess(state) {
        state.accessToken = ''
    },

    refreshTokenPromise(state, promise) {
        state.refreshTokenPromise = promise
    }
}

export const auth = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}