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

	export { classname as class, target as for };
	export let transition = scale;
	export let show = false;
	export let auto_click = false;
	export let right = true;
	export let bottom = true;
	export let offset = 16;
	export let once = false;

	function init(node: HTMLElement) {
		if (target) {
			const elms = document.querySelectorAll('#' + target);
			parentElement = elms[elms.length - 1] as HTMLElement;
		} else {
			parentElement = node.parentElement as HTMLElement;
		}
		if (auto_click) {
			parentElement.addEventListener('click', click_handler);
		}
	}
	function click_handler(event: MouseEvent) {
		if (parentElement?.contains(event.target as any)) {
			show = !show;
		}
	}
	function child(node: HTMLElement) {
		// const { height, pageTop, width, pageLeft } = visualViewport;
		const { offsetHeight: offsetHeightNode, offsetWidth: offsetWidthNode } = node;
		const { offsetHeight, offsetTop, offsetWidth, offsetLeft } = parentElement as HTMLElement;
		let style_top = offsetTop - offset;
		let style_left = offsetLeft + offsetWidth - offsetWidthNode;
		// console.log({ offsetHeight, offsetTop, offsetWidth, offsetLeft });
		if (right) {
			style_left = offsetLeft;
			// const pageWidth = width + pageLeft;
			// const elementWidth = style_left + offsetWidthNode;
			// if (elementWidth > pageWidth) {
			// 	style_left = (offsetLeft + offsetWidth) - offsetWidthNode;
			// }
		}
		if (bottom) {
			style_top = offsetTop + offsetHeight + offset;

			// const pageHeight = height + pageTop;
			// const elementHeight = style_top + offsetHeightNode;
			// if (elementHeight > pageHeight) {
			// 	style_top += offsetTop + offsetHeight;
			// }
		}
		node.style.top = style_top + 'px';
		node.style.left = style_left + 'px';
		element = node;
		addListener();
	}
	function addListener() {
		document.addEventListener('click', listener, { capture: true });
	}
	function removeListener() {
		element = undefined;
		document.removeEventListener('click', listener, { capture: true });
	}
	function listener(event: MouseEvent) {
		const { target } = event as MouseEvent & { target: HTMLElement };
		if (element?.contains(target)) {
			if (once) {
				setTimeout(() => {
					removeListener();
					show = false;
				}, 250);
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
		id="popup"
		class="absolute flex flex-col rounded-md {classname}"
	>
		<slot />
	</div>
{/if}

<style lang="scss">
	#popup {
		z-index: 1;
	}
</style>
