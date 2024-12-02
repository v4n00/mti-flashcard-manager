<template>
	<div class="w-full flex">
		<CheckCircle class="mr-2" />
		{{ message }}
	</div>
</template>

<script setup>
import { CheckCircle } from 'lucide-vue-next';

const props = defineProps({
	message: {
		type: String,
		required: true,
	},
});
</script>
