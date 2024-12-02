<script setup lang="ts">
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CircleUser } from 'lucide-vue-next';
import { computed } from 'vue';
import { useStore } from 'vuex';
import AuthenticatedComponent from '../auth/AuthenticatedComponent.vue';
import NotAuthenticatedComponent from '../auth/NotAuthenticatedComponent.vue';
import Button from '../ui/button/Button.vue';

const store = useStore();
const username = computed(() => store.state.auth.username);
</script>

<template>
	<Dialog>
		<DialogTrigger asChild>
			<Button variant="outline" size="icon">
				<CircleUser />
			</Button>
		</DialogTrigger>
		<DialogContent class="w-[400px]">
			<DialogTitle class="text-3xl m-0">Account</DialogTitle>
			<AuthenticatedComponent v-if="username" />
			<NotAuthenticatedComponent v-else />
		</DialogContent>
	</Dialog>
</template>
