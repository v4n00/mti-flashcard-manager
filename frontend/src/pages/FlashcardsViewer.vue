<script setup lang="ts">
import FlashcardNavigator from '@/components/flashcard/FlashcardNavigator.vue';
import { errorToast } from '@/components/ui/toast/custom-toast';
import { APIURL } from '@/config/const';
import { FlashcardType } from '@/config/interfaces';
import { useQuery } from '@tanstack/vue-query';
import axios, { AxiosError } from 'axios';
import { computed, toRaw } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const token = computed(() => store.state.auth.user.token);

const queryFn = () =>
	axios
		.get(`${APIURL}/flashcards`, { headers: { Authorization: `Bearer ${token.value}` } })
		.then((res) => res.data)
		.catch((e) => {
			if ((e as AxiosError).response?.status === 404) return [] as FlashcardType[];
			else errorToast(`Error: ${(e as AxiosError).response?.data}`);
		});

const { data } = useQuery({
	queryKey: ['flashcards'],
	queryFn: queryFn,
	initialData: null,
});
</script>

<template>
	<h1>View flashcards</h1>
	<FlashcardNavigator :flashcards="toRaw(data)" />
</template>
