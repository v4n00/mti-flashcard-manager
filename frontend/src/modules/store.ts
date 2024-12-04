import { createStore } from 'vuex';
import { authModule, AuthState } from './stores/authStore';
import { flashcardsModule, FlashcardsState } from './stores/flashcardsStore';

interface RootState {
	auth: AuthState;
	flashcards: FlashcardsState;
}

export const store = createStore<RootState>({
	modules: {
		auth: authModule,
		flashcards: flashcardsModule,
	},
});
