import { callLogin, callSignUp, callValidate } from '@/api/authApi';
import { createStore } from 'vuex';

export const store = createStore({
	modules: {
		auth: {
			namespaced: true,
			state: {
				user: null,
				loading: false,
			},
			mutations: {
				setUser(state, user) {
					state.user = user;
				},
				setLoading(state, isLoading) {
					state.loading = isLoading;
				},
			},
			actions: {
				async login({ commit }, { username, password }) {
					commit('setLoading', true);
					try {
						const { data } = await callLogin({ username, password });
						localStorage.setItem('token', data.token);
						commit('setUser', data);
					} finally {
						commit('setLoading', false);
					}
				},
				async signUp({ commit }, { username, password, confirmPassword }) {
					commit('setLoading', true);
					try {
						await callSignUp({ username, password, confirmPassword });
					} finally {
						commit('setLoading', false);
					}
				},
				logOut({ commit }) {
					localStorage.removeItem('token');
					commit('setUser', null);
				},
				async validateToken({ commit }) {
					const token = localStorage.getItem('token');
					if (token) {
						try {
							const { data } = await callValidate({ token });
							commit('setUser', data);
						} catch {
							localStorage.removeItem('token');
							commit('setUser', null);
						}
					}
				},
			},
			getters: {
				isAuthenticated(state) {
					return !!state.user;
				},
				user(state) {
					return state.user;
				},
				loading(state) {
					return state.loading;
				},
			},
		},
	},
});

export const login = async ({ username, password }: { username: string; password: string }) => {
	await store.dispatch('auth/login', { username, password });
};

export const signUp = async ({ username, password, confirmPassword }: { username: string; password: string; confirmPassword: string }) => {
	await store.dispatch('auth/signUp', { username, password, confirmPassword });
};

export const logOut = async () => {
	await store.dispatch('auth/logOut');
};

export const validateToken = async () => {
	await store.dispatch('auth/validateToken');
};
