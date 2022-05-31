<script context="module" lang="ts">
	export const router = true;
	export const hydrate = true;
	export const prerender = true;

	import { onMount, onDestroy } from 'svelte';
</script>

<script lang="ts">
	export let drawer = true;

	onMount(async () => {});
	onDestroy(async () => {});
</script>

<div class="flex gap-4">
	<button
		on:click={() => (drawer = !drawer)}
		class="btn btn-square btn-ghost btn-sm w-9 h-9"
	>
		{#if drawer}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				class="inline-block w-7 h-7 fill-current"
				><path d="M0,0h24v24H0V0z" fill="none" /><path
					d="M4,18h11c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1v0C3,17.55,3.45,18,4,18z M4,13h8c0.55,0,1-0.45,1-1v0 c0-0.55-0.45-1-1-1H4c-0.55,0-1,0.45-1,1v0C3,12.55,3.45,13,4,13z M3,7L3,7c0,0.55,0.45,1,1,1h11c0.55,0,1-0.45,1-1v0 c0-0.55-0.45-1-1-1H4C3.45,6,3,6.45,3,7z M20.3,14.88L17.42,12l2.88-2.88c0.39-0.39,0.39-1.02,0-1.41l0,0 c-0.39-0.39-1.02-0.39-1.41,0l-3.59,3.59c-0.39,0.39-0.39,1.02,0,1.41l3.59,3.59c0.39,0.39,1.02,0.39,1.41,0l0,0 C20.68,15.91,20.69,15.27,20.3,14.88z"
				/><path d="M0,0h24v24H0V0z" fill="none" /></svg
			>
		{:else}
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
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		{/if}
	</button>

	<form class="form-control">
		<div class="relative w-full">
			<div class="absolute top-0 left-0 grid place-content-center h-full" style="aspect-ratio: 1;">
				<button
					type="button"
					class="btn btn-square btn-ghost btn-sm w-9 h-9 bg-transparent hover:bg-base-300"
				>
					<svg
						class="w-6 h-6 text-gray-900 dark:text-gray-50"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/></svg
					>
				</button>
			</div>
			<input
				aria-label="Search Box"
				id="search-box"
				type="search"
				placeholder="Search..."
				class="input input-bordered input-sm h-10 w-full pl-[50px]"
			/>
		</div>
	</form>
</div>
