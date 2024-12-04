<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue';
import { FlashcardType } from '@/config/interfaces';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const flashcards = ref<FlashcardType[]>([]);
const searchInput = ref('');
</script>

<template>
	<div className="h-full flex flex-col items-center w-full">
		<h1>Manage flashcards</h1>
		<div className="flex flex-col justify-between items-center gap-5 h-full px-2">
			<!-- flashcard editor -->
			<Input v-model="searchInput" placeholder="Search..." />
			<div v-for="flashcard in flashcards" :key="flashcard.id">
				<p>{{ flashcard.frontSide }}</p>
				<p>{{ flashcard.backSide }}</p>
			</div>
			<ScrollArea className="mb-5 h-0 grow border rounded-lg px-5 py-2 gap-y-5 w-full">
				<!-- flashcard editor -->
			</ScrollArea>
		</div>
	</div>
</template>
