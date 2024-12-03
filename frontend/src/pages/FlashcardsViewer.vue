<script setup lang="ts">
import FlashcardNavigator from '@/components/flashcard/FlashcardNavigator.vue';

const flashcards = [
	{
		id: 1,
		frontSide: 'Front side 1',
		backSide: 'Back side 1',
	},
	{
		id: 2,
		frontSide: 'Front side 2',
		backSide: 'Back side 2',
	},
	{
		id: 3,
		frontSide: 'Front side 3',
		backSide: 'Back side 3',
	},
];
</script>

<template>
	<FlashcardNavigator :flashcards="flashcards" />
</template>
