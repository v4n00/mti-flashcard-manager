<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useColorMode } from '@vueuse/core';
import { Moon, Sun } from 'lucide-vue-next';

const mode = useColorMode();
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="outline" size="icon">
				<Sun class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
				<Moon class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
			<DropdownMenuItem @click="mode = 'light'"> Light </DropdownMenuItem>
			<DropdownMenuItem @click="mode = 'dark'"> Dark </DropdownMenuItem>
			<DropdownMenuItem @click="mode = 'auto'"> System </DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
