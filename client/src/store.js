import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null
    },
    plugins: [
        createPersistedState({
            paths: [
                'token'
            ]
        })
    ],
    mutations: {
        setToken(state, token) {
            state.token = token;
        }
    },
    actions: {
        setToken({ commit }, data) {
            commit('setToken', data);
        }
    }
});