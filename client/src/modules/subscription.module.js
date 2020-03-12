import { SubscriptionService } from '../services/subscription.service'
import router from '../router'
import AuthenticationError from '../models/AuthenticatorError'

const state =  {
    subscriptions: [],
    subscription: {},
    storeErrorCode: '',
    storeError: '',
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
            commit('showSuccess', subscription)

            // Redirect the user to the page he first tried to visit or to the home view
            router.push(`/visualizar-candidatura/${subscription.id}`);

            return true
        } catch (e) {
            if (e instanceof AuthenticationError) {
                commit('loginError', {errorCode: e.errorCode, errorMessage: e.message})
            }

            return false
        }
    },

    async store({ commit }, subscription) {
        try {
            await SubscriptionService.store(subscription);

            // Redirect the user to the page he first tried to visit or to the home view
            router.push('/candidaturas');

            return true
        } catch (e) {
            if (e instanceof AuthenticationError) {
                commit('loginError', {errorCode: e.errorCode, errorMessage: e.message})
            }

            return false
        }
    }
}

const mutations = {
    indexSuccess(state, subscriptions) {
        state.subscriptions = subscriptions
    },

    showSuccess(state, subscription) {
        state.subscription = subscription
    },
    setSubscription(state, subscription) {
        state.subscription = subscription
    },
    storeError(state, {errorCode, errorMessage}) {
        state.storeErrorCode = errorCode
        state.storeError = errorMessage
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