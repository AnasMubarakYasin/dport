<script context="module" lang="ts">
	export const router = true;
	export const hydrate = true;
	export const prerender = true;

	import { onMount, onDestroy, getContext, setContext } from 'svelte';
</script>

<script lang="ts">
	import '../app.css';

	onMount(async () => {});
	onDestroy(async () => {});
</script>

<slot />
