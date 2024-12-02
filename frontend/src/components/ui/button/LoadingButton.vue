<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';
import Button from './Button.vue';

const props = defineProps({
	loading: {
		type: Boolean,
		required: true,
	},
});
</script>

<template>
	<Button :disabled="loading" v-bind="props">
		<Loader2 :class="`mr-2 h-4 w-4 animate-spin ${!loading ? 'hidden' : ''}`" />
		<slot />
	</Button>
</template>
