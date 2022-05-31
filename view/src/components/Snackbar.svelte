<script context="module" lang="ts">
	import { getContext, setContext, tick } from 'svelte';
	import { writable, derived } from 'svelte/store';
	import { cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
</script>

<script lang="ts">
	let classname = '';
	let target = '';
	let element: HTMLElement | undefined;
	let parentElement: HTMLElement | undefined;
	let timeoutId = 0;

	export { classname as class, target as for };
	export let transition = scale;
	export let show = false;
	export let auto_click = false;
	export let left = false;
	export let right = false;
	export let top = false;
	export let bottom = false;
	export let center = false;
	export let offset = 32;
	export let timeout = 0;
	export let once = false;
	export let force = false;

	function init(node?: HTMLElement) {
		if (target) {
			parentElement = document.getElementById(target) as HTMLElement;
		}
		if (auto_click) {
			parentElement?.addEventListener('click', (event) => {
				if ((parentElement as HTMLElement).contains(event.target as any)) {
					show = !show;
				}
			});
		}
	}
	function child(node: HTMLElement) {
		const { width, height } = visualViewport;
		const { offsetHeight: offsetHeightNode, offsetWidth: offsetWidthNode } = node;
		let style_top = 0;
		let style_left = 0;
		if (left) {
			style_left = offset;
		}
		if (center) {
			style_left = width / 2 - offsetWidthNode / 2;
		}
		if (right) {
			style_left = width - offsetWidthNode - offset;
		}
		if (top) {
			style_top = offset;
		}
		if (bottom) {
			style_top = height - offsetHeightNode - offset;
		}
		node.style.top = style_top + 'px';
		node.style.left = style_left + 'px';
		element = node;
		if (!force && timeout > 999) {
			addTimeout();
		}
	}
	function addListener() {
		document.addEventListener('click', listener, { capture: true });
	}
	function removeListener() {
		document.removeEventListener('click', listener, { capture: true });
		element = undefined;
		// if (timeoutId) {
		// 	removeTimeout();
		// }
	}
	function addTimeout() {
		timeoutId = setTimeout(() => {
			show = false;
			// removeListener();
		}, timeout) as unknown as number;
	}
	function removeTimeout() {
		clearTimeout(timeoutId);
		timeoutId = 0;
	}
	function listener(event: MouseEvent) {
		const { target } = event as MouseEvent & { target: HTMLElement };
		if (element?.contains(target)) {
			if (once) {
				removeListener();
				show = false;
			}
		} else if (parentElement?.isSameNode(target) || parentElement?.contains(target)) {
			removeListener();
		} else {
			removeListener();
			show = false;
		}
	}
</script>

<div use:init class="hidden" />

{#if show}
	<div
		transition:transition
		use:child
		id="snackbar"
		class="fixed flex flex-col rounded-md {classname}"
	>
		<slot />
	</div>
{/if}

<style lang="scss">
	#snackbar {
		z-index: 1;
	}
</style>
