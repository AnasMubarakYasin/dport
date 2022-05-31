<script context="module" lang="ts">
	import { cubicOut } from 'svelte/easing';
</script>

<script lang="ts">
	let classname = '';
	export { classname as class };
	export let transition = (node: HTMLElement, { delay = 0, duration = 400, easing = cubicOut }) => {
		return {
			delay,
			duration,
			easing
		};
	};
</script>

<main transition:transition class="flex flex-col {classname}">
	<slot />
</main>

<style lang="scss">
</style>
