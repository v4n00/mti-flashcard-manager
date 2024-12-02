<script setup lang="ts">
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CircleUser } from 'lucide-vue-next';
import Button from './ui/button/Button.vue';

import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const username = computed(() => store.state.auth.username);
const loading = computed(() => store.state.auth.loading);

const handleLogin = async () => {
	await store.dispatch('auth/login', { username: 'test', password: 'test1234' });
};
</script>

<template>
	<Dialog>
		<DialogTrigger asChild>
			<Button variant="outline" size="icon">
				<CircleUser className="md:mr-2 mr-0" />
			</Button>
		</DialogTrigger>
		<DialogContent className="w-[400px]">
			<DialogTitle className="text-3xl m-0">Account</DialogTitle>
			<div>
				<p v-if="loading">Loading...</p>
				<p v-else-if="username">Welcome, {{ username }}</p>
				<button @click="handleLogin">Login</button>
			</div>
		</DialogContent>
	</Dialog>
</template>
