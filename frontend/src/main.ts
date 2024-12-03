import { VueQueryPlugin } from '@tanstack/vue-query';
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
		{ path: '/view', component: FlashcardsViewer, meta: { requiresAuth: true, title: 'Viewer' } },
		{ path: '/manage', component: FlashcardsManager, meta: { requiresAuth: true, title: 'Manager' } },

		{ path: '/:pathMatch(.*)*', component: PageMessage, props: { message: 'Page not found', code: 404 }, meta: { title: 'Not Found' } },
		{ path: '/unauthorized', name: 'NotAuthorized', component: PageMessage, props: { message: 'Not authorized', code: 403 }, meta: { title: 'Not Authorized' } },
	],
});

router.beforeEach(async (to, _from, next) => {
	const { title } = to.meta;
	const defaultTitle = 'Flashcardio';

	document.title = `${defaultTitle}${title ? ` - ${title}` : ''}`;

	let isAuthenticated = store.getters['auth/isAuthenticated'];
	if (!isAuthenticated) {
		await store.dispatch('auth/validateToken');
	}

	isAuthenticated = store.getters['auth/isAuthenticated'];
	if (to.meta.requiresAuth && !isAuthenticated) {
		next({ name: 'NotAuthorized' });
	} else {
		next();
	}
});

createApp(App).use(router).use(store).use(VueQueryPlugin).mount('#app');
