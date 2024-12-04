import { APIURL } from '@/config/const';
import { UserType } from '@/config/interfaces';
import axios from 'axios';
import { Module } from 'vuex/types/index.js';

export interface AuthState {
	user: UserType | null;
	loading: boolean;
}

export const authModule: Module<AuthState, any> = {
	namespaced: true,
	state: (): AuthState => ({
		user: null,
		loading: false,
	}),
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
				const { data } = await axios.post(`${APIURL}/user/login`, { username, password });
				localStorage.setItem('token', data.token);
				commit('setUser', data);
			} finally {
				commit('setLoading', false);
			}
		},
		async signUp({ commit }, { username, password, confirmPassword }) {
			commit('setLoading', true);
			try {
				await axios.post(`${APIURL}/user/register`, { username, password, confirmPassword });
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
					const { data } = await axios.get(`${APIURL}/user/validate`, { headers: { Authorization: `Bearer ${token}` } });
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
};
