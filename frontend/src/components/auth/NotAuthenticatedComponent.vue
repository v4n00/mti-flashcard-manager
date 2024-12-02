<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LogInComponent from './LogInComponent.vue';
import SignUpComponent from './SignUpComponent.vue';
</script>

<template>
	<Tabs defaultValue="logIn">
		<TabsList class="grid w-full grid-cols-2">
			<TabsTrigger value="logIn">Log in</TabsTrigger>
			<TabsTrigger value="signUp">Sign up</TabsTrigger>
		</TabsList>
		<TabsContent value="logIn">
			<LogInComponent />
		</TabsContent>
		<TabsContent value="signUp">
			<SignUpComponent />
		</TabsContent>
	</Tabs>
</template>
