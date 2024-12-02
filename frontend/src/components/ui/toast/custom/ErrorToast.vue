<template>
	<div class="w-full flex items-center">
		<AlertTriangle class="mr-2" />
		{{ message }}
	</div>
</template>

<script setup lang="ts">
import { AlertTriangle } from 'lucide-vue-next';

const props = defineProps({
	message: {
		type: String,
		required: true,
	},
});
</script>
