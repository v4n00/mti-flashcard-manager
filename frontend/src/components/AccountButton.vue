<script setup lang="ts">
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CircleUser } from 'lucide-vue-next';
import Button from './ui/button/Button.vue';
</script>

<template>
	<Dialog>
		<DialogTrigger asChild>
			<Button variant="outline" size="icon">
				<CircleUser className="md:mr-2 mr-0" />
			</Button>
		</DialogTrigger>
		<DialogContent className="w-[400px]">
			<DialogTitle className="text-3xl m-0">Account</DialogTitle>
			<!-- account logic here -->
		</DialogContent>
	</Dialog>
</template>
