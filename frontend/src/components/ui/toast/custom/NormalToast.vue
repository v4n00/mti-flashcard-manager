<template>
	<div class="w-full flex">
		<Info class="mr-2" />
		{{ message }}
	</div>
</template>

<script setup>
import { Info } from 'lucide-vue-next';
import { defineProps } from 'vue';

const props = defineProps({
	message: {
		type: String,
		required: true,
	},
});
</script>
