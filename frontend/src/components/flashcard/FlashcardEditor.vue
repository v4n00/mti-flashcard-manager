<script setup lang="ts">
import { FlashcardType } from '@/config/interfaces';
import { toTypedSchema } from '@vee-validate/zod';
import { Loader2, Save, Trash } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import * as z from 'zod';
import { useStore } from '../../modules/store';
import Button from '../ui/button/Button.vue';
import Card from '../ui/card/Card.vue';
import { FormField } from '../ui/form';
import FormControl from '../ui/form/FormControl.vue';
import FormItem from '../ui/form/FormItem.vue';
import Input from '../ui/input/Input.vue';
import { errorToast } from '../ui/toast/custom-toast';

const props = defineProps({
	flashcard: {
		type: Object as () => FlashcardType,
	},
});

const form = useForm({
	validationSchema: toTypedSchema(
		z.object({
			id: z.number().optional(),
			frontSide: z.string(),
			backSide: z.string(),
		})
	),
	initialValues: {
		id: props.flashcard?.id || undefined,
		frontSide: props.flashcard?.frontSide || '',
		backSide: props.flashcard?.backSide || '',
	},
});

const store = useStore();
const flashcard = ref({ ...props.flashcard });
const loadingDelete = ref(false);
const loadingSave = ref(false);

const onSubmit = form.handleSubmit(async (values) => {
	loadingSave.value = true;
	if (values.id) {
		if (flashcard.value.backSide === values.backSide && flashcard.value.frontSide === values.frontSide) {
			errorToast('Error: No changes made');
		} else {
			await store.dispatch('flashcards/updateFlashcard', values);
		}
	} else {
		if (values.frontSide == '' || values.backSide == '') {
			errorToast('Error: Frontside and backside are required');
		} else {
			await store.dispatch('flashcards/addFlashcard', values);
			form.resetField('frontSide');
			form.resetField('backSide');
		}
	}
	loadingSave.value = false;
});

const onDelete = async () => {
	loadingDelete.value = true;
	const id = form.values.id;
	if (id) {
		await store.dispatch('flashcards/deleteFlashcard', id);
	} else {
		form.resetField('frontSide');
		form.resetField('backSide');
	}
	loadingDelete.value = false;
};
</script>

<template>
	<form @submit="onSubmit" class="w-full">
		<Card class="w-full h-24 flex flex-row justify-start items-center gap-2 mb-2">
			<FormField v-slot="{ componentField }" name="id">
				<FormItem>
					<FormControl>
						<Input class="w-16 h-20 ml-2 text-center text-xl grow" type="text" disabled placeholder="ID" v-bind="componentField" />
					</FormControl>
				</FormItem>
			</FormField>
			<div class="flex flex-col gap-2 justify-between h-20 grow">
				<FormField v-slot="{ componentField }" name="frontSide">
					<FormItem>
						<FormControl>
							<Input class="h-[35px]" placeholder="frontside" v-bind="componentField" />
						</FormControl>
					</FormItem>
				</FormField>
				<FormField v-slot="{ componentField }" name="backSide">
					<FormItem>
						<FormControl>
							<Input class="h-[35px]" placeholder="backside" v-bind="componentField" />
						</FormControl>
					</FormItem>
				</FormField>
			</div>
			<div class="flex flex-col gap-2 justify-between h-20 mr-2 max-w-16 grow">
				<Button variant="success" type="submit" :disabled="loadingSave">
					<Loader2 :size="25" v-if="loadingSave" class="animate-spin" />
					<Save :size="25" v-else />
				</Button>
				<Button variant="destructive" type="button" @click="onDelete" :disabled="loadingDelete">
					<Loader2 :size="25" v-if="loadingDelete" class="animate-spin" />
					<Trash :size="25" v-else />
				</Button>
			</div>
		</Card>
	</form>
</template>
