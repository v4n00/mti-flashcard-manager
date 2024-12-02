<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';

const props = defineProps({
	code: {
		type: Number,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
});
</script>

<template>
	<div class="flex flex-col items-center justify-center space-y-6">
		<h1>{{ number }}</h1>
		<p>{{ message }}</p>
		<div class="space-x-3">
			<Button variant="outline" @click="$router.back()"> Go Back </Button>
			<Button variant="outline" @click="$router.replace('/')"> Go Home </Button>
		</div>
	</div>
</template>
