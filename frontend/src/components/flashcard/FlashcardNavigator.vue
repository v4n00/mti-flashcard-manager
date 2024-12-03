<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { FlashcardType } from '@/interfaces/interfaces';
import { Loader2, Shuffle } from 'lucide-vue-next';
import { defineProps, ref, watch } from 'vue';
import Button from '../ui/button/Button.vue';
import Flashcard from './Flashcard.vue';

const props = defineProps({
	flashcards: {
		type: Array<FlashcardType>,
		required: true,
	},
});

watch(
	() => props.flashcards,
	(newFlashcards) => {
		flashcardsArray.value = newFlashcards;
	}
);

const flashcardsArray = ref(props.flashcards);
const loading = ref(false);

const shuffleOrder = () => {
	loading.value = true;
	setTimeout(() => {
		if (!flashcardsArray.value) return;
		flashcardsArray.value.sort(() => Math.random() - 0.5);
		loading.value = false;
	}, 400);
};
console.log(flashcardsArray);
</script>

<template>
	<div class="flex flex-col gap-y-5 items-center w-full">
		<Carousel :opts="{ loop: true }">
			<CarouselContent class="max-w-[500px] w-screen h-[400px]">
				<template v-if="flashcardsArray !== undefined">
					<template v-if="flashcardsArray.length > 0">
						<CarouselItem v-for="flashcard in flashcardsArray" :key="flashcard.id">
							<Flashcard :frontSide="flashcard.frontSide" :backSide="flashcard.backSide" />
						</CarouselItem>
					</template>
					<template v-else>
						<div>No flashcards available</div>
					</template>
				</template>
				<template v-else>
					<Loader2 class="animate-spin" />
				</template>
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
		<Button @click="shuffleOrder" :disabled="loading">
			<Shuffle v-if="!loading" />
			<Loader2 v-else class="animate-spin" />
			Shuffle
		</Button>
	</div>
</template>
