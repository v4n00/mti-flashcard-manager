<script setup lans="ts">
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next';
import { computed, defineProps, ref } from 'vue';
import Button from '../button/Button.vue';
import Input from './Input.vue';

const props = defineProps({
	modelValue: String,
	disabled: Boolean,
});

const showPassword = ref(false);
const inputValue = ref(props.modelValue);

const toggleShowPassword = () => {
	showPassword.value = !showPassword.value;
};

const disabled = computed(() => {
	return inputValue.value === '' || inputValue.value === undefined || props.disabled;
});
</script>

<template>
	<div class="relative">
		<Input :type="showPassword ? 'text' : 'password'" class="hide-password-toggle pr-10" v-bind="props" v-model="inputValue" />
		<Button type="button" variant="ghost" size="sm" class="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" @click="toggleShowPassword" :disabled="disabled">
			<component :is="showPassword && !disabled ? EyeIcon : EyeOffIcon" class="h-4 w-4" aria-hidden="true" />
			<span class="sr-only">{{ showPassword ? 'Hide password' : 'Show password' }}</span>
		</Button>
	</div>
</template>

<style>
.hide-password-toggle::-ms-reveal,
.hide-password-toggle::-ms-clear {
	visibility: hidden;
	pointer-events: none;
	display: none;
}
</style>
