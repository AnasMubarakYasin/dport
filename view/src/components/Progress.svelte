<script context="module">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { navigating } from '$app/stores';
</script>

<script lang="ts">
	import Sequence from '$lib/sequence-loading';

	let classname = 'z-10';

	export { classname as class };

	const sequence = new Sequence({ timeout: 15000, completion: 1000, alwaysReset: true });
	const value = tweened(0, {
		duration: 16,
		easing: cubicOut
	});

	export let show = true;
	export let sticky = true;
	export let absolute = false;
	export let fixed = false;
	export let progress = $value;

	sequence.onStart = () => {
		show = true;
	};
	sequence.onProgress = (data) => {
		progress = data;
	};
	sequence.onFinish = () => {
		show = false;
	};
	sequence.start();

	// $: {
	// 	const navigation = $navigating;
	// 	if (navigation?.from.pathname != navigation?.to.pathname) {
	// 		showing();
	// 	}
	// }

	export function showing() {
		sequence.start();
	}
	export function hiding() {
		sequence.finish();
	}
</script>

<progress
	value={progress}
	max="100"
	class:show
	class:hide={!show}
	class:sticky
	class:absolute
	class:fixed
	class="progress progress-secondary bg-base-200 w-full z-[1] {classname}"
/>

<style lang="scss">
	.sticky {
		position: sticky;
		top: 0;
		left: 0;
	}
	.absolute {
		position: absolute;
		top: 0;
		left: 0;
	}
	.fixed {
		position: fixed;
		top: 0;
		left: 0;
	}
	.show {
		height: 4px;
	}
	.hide {
		height: 0;
	}
</style>
