import { VueQueryPlugin } from '@tanstack/vue-query';
import { createApp } from 'vue';
import App from './App.vue';
import router from './modules/router';
import { key, store } from './modules/store';
import './styles.css';

createApp(App).use(router).use(store, key).use(VueQueryPlugin).mount('#app');
