<script setup lang="ts">
import Card from '../components/ui/card/Card.vue';
</script>

<template>
	<div className="flex flex-col items-center">
		<div className="flex flex-col items-center">
			<h1 className="text-4xl font-bold mt-8">Flashcards</h1>
			<div className="flex flex-col items-center mt-4">
				<RouterLink to="/viewer" className="bg-primary text-white px-4 py-2 rounded-md mt-2">View Flashcards</RouterLink>
				<RouterLink to="/manager" className="bg-primary text-white px-4 py-2 rounded-md">Manage Flashcard</RouterLink>
			</div>
			<Card>test</Card>
		</div>
	</div>
</template>
