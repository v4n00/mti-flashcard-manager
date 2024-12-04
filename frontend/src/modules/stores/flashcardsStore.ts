import { errorToast, successToast } from '@/components/ui/toast/custom-toast';
import { APIURL } from '@/config/const';
import { FlashcardType } from '@/config/interfaces';
import { getHeaders } from '@/lib/utils';
import axios, { AxiosError } from 'axios';
import { Module } from 'vuex';

export interface FlashcardsState {
	flashcards: FlashcardType[];
	loading: boolean;
}

export const flashcardsModule: Module<FlashcardsState, any> = {
	namespaced: true,
	state: (): FlashcardsState => ({
		flashcards: [],
		loading: false,
	}),
	mutations: {
		setFlashcards(state, flashcards) {
			state.flashcards = flashcards;
		},
		addFlashcard(state, flashcard) {
			if (state.flashcards) state.flashcards.push(flashcard);
		},
		updateFlashcard(state, updatedFlashcard: FlashcardType) {
			if (state.flashcards) {
				const index = state.flashcards.findIndex((f) => f.id === updatedFlashcard.id);
				if (index !== -1) {
					state.flashcards.splice(index, 1, updatedFlashcard);
				}
			}
		},
		deleteFlashcard(state, id) {
			if (state.flashcards) state.flashcards = state.flashcards.filter((f) => f.id !== id);
		},
		setLoading(state, isLoading) {
			state.loading = isLoading;
		},
	},
	actions: {
		async fetchFlashcards({ commit, rootState }) {
			commit('setLoading', true);
			try {
				const headers = getHeaders(rootState.auth.user?.token);
				const response = await axios.get(`${APIURL}/flashcards/`, headers);
				commit('setFlashcards', response.data);
			} catch (e) {
				if ((e as AxiosError).response?.status === 404) {
					commit('setFlashcards', []);
				} else {
					errorToast(`Error: ${(e as AxiosError).response?.data}`);
				}
			} finally {
				commit('setLoading', false);
			}
		},
		async addFlashcard({ commit, rootState }, flashcard) {
			try {
				const headers = getHeaders(rootState.auth.user?.token);
				const response = await axios.post(`${APIURL}/flashcards`, flashcard, headers);
				commit('addFlashcard', response.data);
				successToast('Flashcard added');
			} catch (e) {
				errorToast(`Error: ${(e as AxiosError).response?.data}`);
			}
		},
		async updateFlashcard({ commit, rootState }, flashcard) {
			try {
				const headers = getHeaders(rootState.auth.user?.token);
				const response = await axios.patch(`${APIURL}/flashcards/${flashcard.id}`, flashcard, headers);
				commit('updateFlashcard', response.data);
				successToast('Flashcard updated');
			} catch (e) {
				errorToast(`Error: ${(e as AxiosError).response?.data}`);
			}
		},
		async deleteFlashcard({ commit, rootState }, id) {
			try {
				const headers = getHeaders(rootState.auth.user?.token);
				await axios.delete(`${APIURL}/flashcards/${id}`, headers);
				commit('deleteFlashcard', id);
				successToast('Flashcard deleted');
			} catch (e) {
				errorToast(`Error: ${(e as AxiosError).response?.data}`);
			}
		},
	},
};
