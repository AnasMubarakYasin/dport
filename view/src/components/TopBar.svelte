<script lang="ts">
	let classname = '';
	export { classname as class };
	export let fixed = false;
	export let sticky = true;
	export let brand:
		| {
				name: string;
				image: string;
		  }
		| undefined = undefined;
	export let title = '';
	export let back_nav = false;

	let width = 0;
	let height = 0;
	let px = 'px-10';

	// $: resizing(width);

	function resizing(...tag: any) {
		if (width <= 320) {
			px = 'px-4';
		} else if (width <= 480) {
			px = 'px-5';
		} else if (width <= 720) {
			px = 'px-6';
		} else if (width <= 1080) {
			px = 'px-7';
		} else if (width <= 1200) {
			px = 'px-8';
		} else if (width <= 1400) {
			px = 'px-12';
		} else {
			px = 'px-16';
		}
	}
</script>

<section
	id="topbar"
	class="flex items-center {px} py-3 {classname}"
	class:fixed
	class:sticky
>
	<slot>
		{#if brand}
			<a class="flex items-center" href="/">
				<img class="w-10 h-10" src={brand.image} alt="Logo" width="40" height="40" />
				<div class="text-[18px] font-[600] px-4">{brand.name}</div>
			</a>
			<div class="w-[16px] h-full" />
		{/if}
		{#if back_nav}
			<button class="btn btn-square btn-ghost btn-sm w-9 h-9">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block w-6 h-6 stroke-current"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
					/>
				</svg>
			</button>
			<div class="w-[16px] h-full" />
		{/if}
		{#if title}
			<h1 class="text-xl font-bold">{title}</h1>
			<div class="w-[16px] h-full" />
		{/if}
		<slot name="left" />
		<div class="h-full flex-grow" />
		<slot name="right" />
	</slot>
</section>

<style lang="scss">
	#topbar {
		min-height: 64px;
	}
	.fixed {
		position: fixed;
	}
	.sticky {
		position: sticky;
	}
</style>
