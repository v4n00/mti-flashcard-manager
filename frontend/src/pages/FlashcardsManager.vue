<script setup lang="ts">
import FlashcardEditor from '@/components/flashcard/FlashcardEditor.vue';
import Input from '@/components/ui/input/Input.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import { FlashcardType } from '@/config/interfaces';
import { onMounted, ref, watch } from 'vue';
import { useStore } from '../modules/store';

const store = useStore();

const flashcards = ref<Array<FlashcardType>>(store.state.flashcards.flashcards);
const loading = ref<boolean>(store.state.flashcards.loading);

watch(
	() => [store.state.flashcards.flashcards, store.state.flashcards.loading] as const,
	([newFlashcards, newLoading]) => {
		flashcards.value = newFlashcards;
		loading.value = newLoading;
	}
);

const searchInput = ref('');

watch([searchInput], ([newSearchInput]) => {
	if (flashcards.value) {
		flashcards.value = store.state.flashcards.flashcards.filter((flashcard: FlashcardType) => {
			return flashcard.frontSide.toLowerCase().includes(newSearchInput.toLowerCase()) || flashcard.backSide.toLowerCase().includes(newSearchInput.toLowerCase());
		});
	}
});

onMounted(() => {
	store.dispatch('flashcards/fetchFlashcards');
});
</script>

<template>
	<div class="h-full flex flex-col items-center w-full">
		<h1>Manage flashcards</h1>
		<div class="flex flex-col justify-between items-center gap-5 h-full px-2">
			<FlashcardEditor />
			<Input v-model="searchInput" placeholder="Search..." />
			<ScrollArea class="mb-5 h-full grow border rounded-lg px-5 py-2 gap-y-5 w-full">
				<FlashcardEditor v-for="flashcard in flashcards" :key="flashcard.id" :flashcard="flashcard" />
			</ScrollArea>
		</div>
	</div>
</template>
