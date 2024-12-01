import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import PageMessage from './components/PageMessage.vue';
import FlashcardsDashboard from './pages/FlashcardsDashboard.vue';
import FlashcardsManager from './pages/FlashcardsManager.vue';
import FlashcardsViewer from './pages/FlashcardsViewer.vue';
import './styles.css';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: FlashcardsDashboard },
		{ path: '/view', component: FlashcardsViewer },
		{ path: '/manage', component: FlashcardsManager },
		{ path: '/:pathMatch(.*)*', component: PageMessage, props: { message: 'Page not found', number: 404 } },
	],
});

createApp(App).use(router).mount('#app');
