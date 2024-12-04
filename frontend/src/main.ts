import { VueQueryPlugin } from '@tanstack/vue-query';
import { createApp } from 'vue';
import App from './App.vue';
import router from './modules/router';
import { store } from './modules/store';
import './styles.css';

createApp(App).use(router).use(store).use(VueQueryPlugin).mount('#app');
