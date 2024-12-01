import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import FlashcardsDashboard from './pages/FlashcardsDashboard.vue';
import FlashcardsManager from './pages/FlashcardsManager.vue';
import FlashcardsViewer from './pages/FlashcardsViewer.vue';
import './styles.css';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: FlashcardsDashboard },
		{ path: '/viewer', component: FlashcardsViewer },
		{ path: '/manager', component: FlashcardsManager },
	],
});

createApp(App).use(router).mount('#app');
