<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { FlashcardType } from '@/config/interfaces';
import { Loader2, Shuffle } from 'lucide-vue-next';
import { defineProps, ref, watch } from 'vue';
import Button from '../ui/button/Button.vue';
import { Card } from '../ui/card';
import Flashcard from './Flashcard.vue';

const props = defineProps({
	flashcards: {
		type: [Array<FlashcardType>, null],
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
</script>

<template>
	<div class="flex flex-col gap-y-5 items-center w-full">
		<Carousel :opts="{ loop: true }">
			<CarouselContent class="max-w-[500px] w-screen h-[400px]">
				<template v-if="flashcardsArray !== null">
					<template v-if="flashcardsArray.length > 0">
						<CarouselItem v-for="flashcard in flashcardsArray" :key="flashcard.id">
							<Flashcard :frontSide="flashcard.frontSide" :backSide="flashcard.backSide" />
						</CarouselItem>
					</template>
					<template v-else>
						<CarouselItem>
							<div class="p-4 w-full h-full">
								<Card class="p-4 w-full h-full rounded-xl flex items-center justify-center border-2">
									<p>No flashcards found</p>
								</Card>
							</div>
						</CarouselItem>
					</template>
				</template>
				<template v-else>
					<CarouselItem>
						<div class="p-4 w-full h-full">
							<Card class="p-4 w-full h-full rounded-xl flex items-center justify-center border-2">
								<Loader2 class="animate-spin" />
							</Card>
						</div>
					</CarouselItem>
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
