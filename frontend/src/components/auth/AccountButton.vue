<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CircleUser } from 'lucide-vue-next';
import { computed } from 'vue';
import { useStore } from '../../modules/store';
import AuthenticatedComponent from '../auth/AuthenticatedComponent.vue';
import NotAuthenticatedComponent from '../auth/NotAuthenticatedComponent.vue';
import Button from '../ui/button/Button.vue';

const store = useStore();
const user = computed(() => store.state.auth.user);
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
			<DialogDescription>Shuffle and create your flashcards!</DialogDescription>
			<AuthenticatedComponent v-if="user" />
			<NotAuthenticatedComponent v-else />
		</DialogContent>
	</Dialog>
</template>
