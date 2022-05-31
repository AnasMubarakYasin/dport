<script context="module" lang="ts">
	export const router = true;
	export const hydrate = true;
	export const prerender = true;

	import { cubicOut } from 'svelte/easing';
</script>

<script lang="ts">
	let classname = '';
	export { classname as class };
	export let row = true;
	export let col = false;
	export let single = false;
	export let multi = false;
	export let transition = (node: HTMLElement, { delay = 0, duration = 400, easing = cubicOut }) => {
		return {
			delay,
			duration,
			easing
		};
	};
</script>

<ul transition:transition class="flex {classname}" class:col class:row class:single class:multi>
	<slot />
</ul>

<style lang="scss">
	.row {
		flex-direction: column;
	}
	.col {
		flex-direction: row;
	}
	.single {
		flex-wrap: nowrap;
	}
	.multi {
		flex-wrap: wrap;
	}
</style>
