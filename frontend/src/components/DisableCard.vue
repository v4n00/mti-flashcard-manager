<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue';
import { warningToast } from '@/components/ui/toast/custom-toast';
import { Lock } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';

defineProps({
	disabled: {
		type: Boolean,
		required: true,
	},
	to: {
		type: String,
		default: '',
	},
});
</script>

<template>
	<RouterLink :to="disabled ? '' : to">
		<Card :class="`${disabled ? 'bg-muted cursor-not-allowed relative' : ''}`">
			<div>
				<Lock :class="`size-auto absolute bg-muted p-1 -top-[15px] -right-[15px] cursor-help rounded-md ${disabled ? '' : 'hidden'}`" @click="warningToast('Log in to use this feature')" />
			</div>
			<slot />
		</Card>
	</RouterLink>
</template>
