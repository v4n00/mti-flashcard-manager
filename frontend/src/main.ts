import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import PageMessage from './components/PageMessage.vue';
import FlashcardsDashboard from './pages/FlashcardsDashboard.vue';
import FlashcardsManager from './pages/FlashcardsManager.vue';
import FlashcardsViewer from './pages/FlashcardsViewer.vue';
import { store } from './store/auth';
import './styles.css';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: FlashcardsDashboard },
		{ path: '/view', component: FlashcardsViewer, meta: { requiresAuth: true } },
		{ path: '/manage', component: FlashcardsManager, meta: { requiresAuth: true } },

		{ path: '/:pathMatch(.*)*', component: PageMessage, props: { message: 'Page not found', number: 404 } },
		{ path: '/unauthorized', name: 'NotAuthorized', component: PageMessage, props: { message: 'Not authorized', number: 403 } },
	],
});

router.beforeEach(async (to, _from, next) => {
	const isAuthenticated = store.getters['auth/isAuthenticated'];
	if (!isAuthenticated) {
		await store.dispatch('auth/validateToken');
	}

	if (to.meta.requiresAuth && !isAuthenticated) {
		next({ name: 'NotAuthorized' });
	} else {
		next();
	}
});

createApp(App).use(router).use(store).mount('#app');
