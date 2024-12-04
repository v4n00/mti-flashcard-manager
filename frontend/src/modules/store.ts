import { InjectionKey } from 'vue';
import { useStore as baseUseStore, createStore, Store } from 'vuex';
import { authModule, AuthState } from './stores/authStore';
import { flashcardsModule, FlashcardsState } from './stores/flashcardsStore';

interface RootState {
	auth: AuthState;
	flashcards: FlashcardsState;
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
	modules: {
		auth: authModule,
		flashcards: flashcardsModule,
	},
});

export const useStore = () => {
	return baseUseStore(key);
};
