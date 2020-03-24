import { SubscriptionService } from '../services/subscription.service'
import AuthenticationError from '../models/AuthenticatorError'

const state =  {
    subscriptions: [],
    subscription: {},
    showErrorCode: '',
    showError: '',
    indexError: '',
    indexErrorCode: ''
}

const getters = {
    index: (state) => {
        return state.subscriptions 
    },

    get: (state) => {
        return state.subscription
    },

    errors: (state) => {
        return {
            storeError: state.storeError,
            indexError: state.indexError,
        }
    }
}

const actions = {
    async index({ commit }) {
        try {
            const subscriptions = await SubscriptionService.index();
            commit('indexSuccess', subscriptions)

            return true
        } catch (e) {
            if (e instanceof AuthenticationError) {
                commit('indexError', {errorCode: e.errorCode, errorMessage: e.message})
            }
            return e
        }
    },

    async show({ commit }, id) {
        try {
            const subscription = await SubscriptionService.show(id);
            commit('setSubscription', subscription)

            return true
        } catch (e) {
            if (e instanceof AuthenticationError) {
                commit('showError', {errorCode: e.errorCode, errorMessage: e.message})
            }

            return false
        }
    }
}

const mutations = {
    indexSuccess(state, subscriptions) {
        state.subscriptions = subscriptions
    },
    setSubscription(state, subscription) {
        state.subscription = subscription
    },
    showError(state, {errorCode, errorMessage}) {
        state.showErrorCode = errorCode
        state.showError = errorMessage
    },
    indexError(state, {errorCode, errorMessage}) {
        state.indexErrorCode = errorCode
        state.indexError = errorMessage
    }
}

export const subscription = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}