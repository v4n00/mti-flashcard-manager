<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { FlashcardType } from '@/config/interfaces';
import { ArrowLeftRight, Loader2, Shuffle } from 'lucide-vue-next';
import { defineProps, ref, watch } from 'vue';
import Button from '../ui/button/Button.vue';
import { Card } from '../ui/card';
import Flashcard from './Flashcard.vue';

const props = defineProps({
	flashcards: {
		type: Array<FlashcardType>,
		required: true,
	},
	loading: {
		type: Boolean,
		required: true,
	},
});

const flashcards = ref<Array<FlashcardType>>(props.flashcards);
const loading = ref<boolean>(props.loading);

watch(
	() => [props.flashcards, props.loading] as const,
	([newFlashcards, newLoading]) => {
		flashcards.value = newFlashcards;
		loading.value = newLoading;
	}
);

const shuffleOrder = () => {
	loading.value = true;
	setTimeout(() => {
		if (!flashcards.value) return;
		flashcards.value.sort(() => Math.random() - 0.5);
		loading.value = false;
	}, 400);
};
</script>

<template>
	<div class="flex flex-col gap-y-5 items-center w-full">
		<Carousel :opts="{ loop: true }">
			<CarouselContent class="max-w-[500px] w-screen h-[400px]">
				<template v-if="loading || flashcards.length == 0">
					<CarouselItem>
						<div class="p-4 w-full h-full">
							<Card class="p-4 w-full h-full rounded-xl flex items-center justify-center border-2">
								<template v-if="loading">
									<Loader2 class="animate-spin" />
								</template>
								<template v-else>
									<p>No flashcards found</p>
								</template>
							</Card>
						</div>
					</CarouselItem>
				</template>
				<template v-else>
					<CarouselItem v-for="flashcard in flashcards" :key="flashcard.id">
						<Flashcard :frontSide="flashcard.frontSide" :backSide="flashcard.backSide" />
					</CarouselItem>
				</template>
			</CarouselContent>
			<CarouselPrevious class="md:flex hidden" />
			<CarouselNext class="md:flex hidden" />
		</Carousel>
		<div class="flex flex-row gap-3">
			<Button @click="shuffleOrder" :disabled="loading">
				<Shuffle v-if="!loading" />
				<Loader2 v-else class="animate-spin" />
				Shuffle
			</Button>
			<Card class="flex md:hidden text-muted-foreground/80 p-2 bg-muted h-9 items-center">
				<ArrowLeftRight class="mr-2" />
				<p>Swipe to navigate</p>
			</Card>
		</div>
	</div>
</template>
