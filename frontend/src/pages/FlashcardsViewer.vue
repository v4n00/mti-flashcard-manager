<script setup lang="ts">
import FlashcardNavigator from '@/components/flashcard/FlashcardNavigator.vue';
import { onMounted } from 'vue';
import { useStore } from '../modules/store';

const store = useStore();

onMounted(() => {
	store.dispatch('flashcards/fetchFlashcards');
});
</script>

<template>
	<h1>View flashcards</h1>
	<FlashcardNavigator :flashcards="store.state.flashcards.flashcards" :loading="store.state.flashcards.loading" />
</template>
