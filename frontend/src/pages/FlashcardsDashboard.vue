<script setup lang="ts">
import DisableCard from '@/components/DisableCard.vue';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const user = computed(() => store.state.auth.user);

const cards = [
	{
		title: 'Flashcards',
		description: 'Shuffle through your flashcards',
		to: '/view',
	},
	{
		title: 'Manage',
		description: 'Create, update or delete flashcards',
		to: '/manage',
	},
];
</script>

<template>
	<h1>Flashcards</h1>
	<div class="flex justify-center flex-col items-center gap-6">
		<DisableCard v-for="card in cards" :key="card.to" :disabled="!user" :to="card.to" class="w-full px-10 sm:w-3/4 md:w-4/6 lg:w-1/2 xl:w-1/3">
			<template #default>
				<CardHeader class="text-center">
					<CardTitle>{{ card.title }}</CardTitle>
					<CardDescription>{{ card.description }}</CardDescription>
				</CardHeader>
			</template>
		</DisableCard>
	</div>
</template>
