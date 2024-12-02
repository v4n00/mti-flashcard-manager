<script setup lang="ts">
import { CreditCard } from 'lucide-vue-next';
import AccountButton from './auth/AccountButton.vue';
import GitHubButton from './GitHubButton.vue';
import ThemeButton from './ThemeButton.vue';
import Button from './ui/button/Button.vue';
</script>

<template>
	<header class="bg-background sticky z-20 h-20 px-6 border-b-2 top-0 flex items-center justify-between">
		<div>
			<RouterLink to="/">
				<Button variant="outline">
					<CreditCard />
					Flashcardio
				</Button>
			</RouterLink>
		</div>
		<div class="flex flex-row gap-2">
			<AccountButton />
			<GitHubButton />
			<ThemeButton />
		</div>
	</header>
</template>
