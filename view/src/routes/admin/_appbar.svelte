<script context="module" lang="ts">
	export const router = true;
	export const hydrate = true;
	export const prerender = true;

	import { onMount, onDestroy } from 'svelte';

	const navigation = [
		{ name: 'Home', link: '/home' },
		{ name: 'Dashboard', link: '/home/dashboard' },
		{ name: 'Projects', link: '/home/projects' },
		{ name: 'Task', link: '/home/task' },
		{ name: 'Reporting', link: '/home/reporting' }
	];
</script>

<script lang="ts">
	import { page } from '$app/stores';

	let pathname = $page.url.pathname;
	export let thema = 'dark';
	export let image = '';

	function change_thema() {
		thema = thema == 'dark' ? 'light' : 'dark';
	}
	function activated(link: string) {
		return pathname == link ? 'opacity-100' : 'opacity-70 hover:opacity-90';
	}

	onMount(async () => {});
	onDestroy(async () => {});
</script>

<div class="w-full flex items-center">
	<a class="flex items-center" href="/">
		<img class="w-10 h-10" src="/proto-512.v2.png" alt="Logo" width="40" height="40" />
		<div class="text-[18px] font-[600] px-4">Dport</div>
	</a>
	<div class="w-[16px] h-full" />
	<nav>
		<ul class="flex gap-6 items-center">
			{#each navigation as item}
				<li>
					<a class="link link-hover text-[16px] font-[500] {activated(item.link)}" href={item.link}>
						{item.name}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
	<div class="h-full flex-grow" />
	<div class="flex gap-4 items-center">
		<button on:click={change_thema} class="btn btn-square btn-ghost btn-sm w-9 h-9">
			{#if thema == 'dark'}
				<svg
					class="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
					/></svg
				>
			{:else if thema == 'light'}
				<svg
					class="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
					/></svg
				>
			{/if}
		</button>
		<div class="indicator">
			<div class="indicator-item badge badge-secondary badge-xs" />
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
		</div>
		{#if image}
			<div class="w-10 h-10 m-1">
				<img
					src={image}
					alt="Profile"
					width="40"
					height="40"
					on:error={() => {
						image = '';
					}}
					class="w-full h-full object-cover object-center rounded-full"
				/>
			</div>
		{:else}
			<div class="w-10 h-10 m-1 rounded-full grid place-items-center bg-base-200">
				<svg
					class="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
					/></svg
				>
			</div>
		{/if}
	</div>
</div>
