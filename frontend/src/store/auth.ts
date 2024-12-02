import { login, signUp, validate } from '@/api/authApi';
import { createStore } from 'vuex';

export const store = createStore({
	modules: {
		auth: {
			namespaced: true,
			state: {
				username: null,
				loading: false,
			},
			mutations: {
				setUsername(state, username) {
					state.username = username;
				},
				setLoading(state, isLoading) {
					state.loading = isLoading;
				},
			},
			actions: {
				async login({ commit }, { username, password }) {
					commit('setLoading', true);
					try {
						const { data } = await login({ username, password });
						localStorage.setItem('token', data.token);
						commit('setUsername', data.username);
					} finally {
						commit('setLoading', false);
					}
				},
				async signUp({ commit }, { username, password, confirmPassword }) {
					commit('setLoading', true);
					try {
						await signUp({ username, password, confirmPassword });
					} finally {
						commit('setLoading', false);
					}
				},
				logOut({ commit }) {
					localStorage.removeItem('token');
					commit('setUsername', null);
				},
				async validateToken({ commit }) {
					const token = localStorage.getItem('token');
					if (token) {
						try {
							const { data } = await validate({ token });
							commit('setUsername', data.username);
						} catch {
							localStorage.removeItem('token');
							commit('setUsername', null);
						}
					}
				},
			},
			getters: {
				isAuthenticated(state) {
					return !!state.username;
				},
				username(state) {
					return state.username;
				},
				loading(state) {
					return state.loading;
				},
			},
		},
	},
});
