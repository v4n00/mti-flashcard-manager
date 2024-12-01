<script setup lang="ts">
import DisableCard from '@/components/DisableCard.vue';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
</script>

<template>
	<h1>Flashcards</h1>
	<div class="flex justify-center flex-col items-center gap-6">
		<DisableCard :disabled="false" to="/view">
			<template #default>
				<CardHeader>
					<CardTitle class="text-center">Flashcards</CardTitle>
					<CardDescription> Shuffle through your flashcards </CardDescription>
				</CardHeader>
			</template>
		</DisableCard>
		<DisableCard :disabled="true" to="/manage">
			<template #default>
				<CardHeader>
					<CardTitle class="text-center">Manage</CardTitle>
					<CardDescription> Create, update or delete flashcards </CardDescription>
				</CardHeader>
			</template>
		</DisableCard>
	</div>
</template>
