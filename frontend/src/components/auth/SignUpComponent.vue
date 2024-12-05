<script setup lang="ts">
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toTypedSchema } from '@vee-validate/zod';
import { AxiosError } from 'axios';
import { computed } from 'vue';
import * as z from 'zod';
import { useStore } from '../../modules/store';
import LoadingButton from '../ui/button/LoadingButton.vue';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { errorToast, successToast } from '../ui/toast/custom-toast';

const formSchema = toTypedSchema(
	z
		.object({
			username: z.string().min(2, 'Username must contain at least 2 characters').max(32, 'Username must contain at most 32 characters'),
			password: z.string().min(8, 'Password must contain at least 8 characters').max(32, 'Password must contain at most 32 characters'),
			confirmPassword: z.string().min(8, 'Password must contain at least 8 characters').max(32, 'Password must contain at most 32 characters'),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "Passwords don't match",
			path: ['confirmPassword'],
		})
);

const onSubmit = async (values: any) => {
	try {
		await store.dispatch('auth/signUp', { username: values.username, password: values.password, confirmPassword: values.confirmPassword });
		successToast('Signed up successfully');
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			errorToast(error.response.data);
		}
	}
};

const store = useStore();
const loading = computed(() => store.state.auth.loading);
</script>

<template>
	<Card>
		<CardContent>
			<Form :validation-schema="formSchema" @submit="onSubmit" class="space-y-3 pt-6">
				<FormField v-slot="{ componentField }" name="username">
					<FormItem>
						<FormLabel>Username</FormLabel>
						<FormControl>
							<Input type="text" v-bind="componentField" />
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
				<FormField v-slot="{ componentField }" name="password">
					<FormItem>
						<FormLabel>Password</FormLabel>
						<FormControl>
							<Input type="password" v-bind="componentField" />
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
				<FormField v-slot="{ componentField }" name="confirmPassword">
					<FormItem>
						<FormLabel>Confirm Password</FormLabel>
						<FormControl>
							<Input type="password" v-bind="componentField" />
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
				<LoadingButton :loading="loading" type="submit" class="w-full"> Sign up </LoadingButton>
			</Form>
		</CardContent>
	</Card>
</template>
