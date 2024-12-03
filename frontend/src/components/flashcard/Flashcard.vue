<script setup lang="ts">
import { ref } from 'vue';
import { Card, CardHeader } from '../ui/card';
import ScrollArea from '../ui/scroll-area/ScrollArea.vue';

defineProps({
	frontSide: {
		type: String,
		required: true,
	},
	backSide: {
		type: String,
		required: true,
	},
});

const flipped = ref(false);

const toggleFlip = () => {
	flipped.value = !flipped.value;
};

const setFlipped = (value: boolean) => {
	flipped.value = value;
};

const handleLength = (style: string, text: string) => {
	let size = '';
	if (text.length > 100) size = 'text-2xl';
	if (text.length > 200) size = 'text-xl';
	return `${style} ${size}`;
};
</script>

<template>
	<div class="p-4 [perspective:1000px] w-full h-full">
		<Card :class="['w-full h-full relative transition-all duration-500 cursor-pointer [transform-style:preserve-3d]', flipped ? '[transform:rotateX(180deg)]' : '']" @click="toggleFlip" @blur="setFlipped(false)" tabindex="0">
			<ScrollArea v-if="frontSide.length > 400" :class="handleLength('w-full h-full top-1/2 left-1/2 absolute text-center select-none [transform:translate(-50%,-50%)] [backface-visibility:hidden]', frontSide)">
				{{ frontSide }}
			</ScrollArea>
			<CardHeader v-else :class="handleLength('w-full h-full top-1/2 left-1/2 absolute flex items-center justify-center text-center select-none [transform:translate(-50%,-50%)] [backface-visibility:hidden]', frontSide)">
				{{ frontSide }}
			</CardHeader>

			<ScrollArea v-if="backSide.length > 400" :class="handleLength('w-full h-full top-1/2 left-1/2 rotate-x-180 absolute flex items-center justify-center text-center select-none [backface-visibility:hidden]', backSide)">
				{{ backSide }}
			</ScrollArea>
			<CardHeader v-else :class="handleLength('w-full h-full top-1/2 left-1/2 rotate-x-180 absolute flex items-center justify-center text-center select-none [backface-visibility:hidden]', backSide)">
				{{ backSide }}
			</CardHeader>
		</Card>
	</div>
</template>
