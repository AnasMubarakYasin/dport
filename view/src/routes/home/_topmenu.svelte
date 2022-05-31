<script context="module" lang="ts">
	export const router = true;
	export const hydrate = true;
	export const prerender = true;

	import { onMount, onDestroy } from 'svelte';

	const navigation = [
		{ name: 'Account', link: '/home/account' },
		{ name: 'Admin', link: '/admin' },
		{ name: 'Setting', link: '/home/setting' }
	];
	const notification = [
		{ name: 'projects finished' },
		{ name: 'projects pending' },
		{ name: 'projects started' }
	];
</script>

<script lang="ts">
	import Popup from '$components/Popup.svelte';
	import SList from '$components/SList.svelte';
	import SListItem from '$components/SListItem.svelte';
	import Divider from '$components/Divider.svelte';

	export let thema = 'dark';
	let image = '/profile.jpg';
	let show = false;
	onMount(async () => {});
	onDestroy(async () => {});

	function change_thema() {
		thema = thema == 'dark' ? 'light' : 'dark';
	}
</script>

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
	<button id="notification" class="btn btn-square btn-ghost btn-sm w-9 h-9">
		<div class="indicator">
			<div class="indicator-item badge badge-secondary badge-xs" />
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
		</div>
	</button>
	{#if image}
		<button id="account" class="btn btn-circle btn-sm w-10 h-10">
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
		</button>
	{:else}
		<div class="w-10 h-10 rounded-full grid place-items-center bg-base-200">
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

<Popup for="notification" auto_click right={false} class="w-80 bg-base-100">
	<SList class="p-2 gap-2">
		{#each notification as item}
			<SListItem class="w-full">
				<button class="w-full px-3 py-2 hover:bg-base-200 active:bg-primary rounded-md text-left">{item.name}</button>
			</SListItem>
		{/each}
	</SList>
</Popup>

<Popup for="account" auto_click right={false} class="w-80 bg-base-100">
	<section class="px-4 py-3">
		<div class="font-semibold">Anas</div>
		<div class="text-xs">Customer</div>
	</section>
	<Divider />
	<SList class="p-2 gap-2">
		{#each navigation as item}
			<SListItem class="w-full">
				<a class="block link link-hover px-3 py-2 hover:bg-base-200 active:bg-primary rounded-md" href={item.link}>
					{item.name}
				</a>
			</SListItem>
		{/each}
	</SList>
</Popup>
