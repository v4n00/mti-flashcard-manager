<script setup lang="ts">
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DialogFooter, DialogHeader } from '@/components/ui/dialog';
import router from '@/modules/router';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Button } from '../ui/button';
import { successToast } from '../ui/toast/custom-toast';

const store = useStore();
const username = computed(() => store.state.auth.user.username);

const handleLogOut = async () => {
	await store.dispatch('auth/logOut');
	successToast('Logged out successfully');
	router.replace('/');
};
</script>

<template>
	<DialogHeader>
		<div class="flex items-center gap-3">
			<Avatar class="h-12 w-12">
				<AvatarFallback>{{ username.charAt(0).toUpperCase() }}</AvatarFallback>
			</Avatar>
			<div class="flex flex-col items-start gap-0.5 text-xs">
				<div class="text-base">You are logged in as:</div>
				<div class="text-sm text-gray-500">{{ username }}</div>
			</div>
		</div>
	</DialogHeader>
	<DialogFooter>
		<Button class="w-full" type="submit" @click="handleLogOut"> Log Out </Button>
	</DialogFooter>
</template>
