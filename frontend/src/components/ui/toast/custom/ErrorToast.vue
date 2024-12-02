<template>
	<div class="w-full flex">
		<AlertTriangle class="mr-2" />
		{{ message }}
	</div>
</template>

<script setup>
import { AlertTriangle } from 'lucide-vue-next';

const props = defineProps({
	message: {
		type: String,
		required: true,
	},
});
</script>
