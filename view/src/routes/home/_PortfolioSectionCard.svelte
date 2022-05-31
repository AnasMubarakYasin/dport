<script context="module" lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { blobToDataUri } from '$lib/helper';
</script>

<script lang="ts">
	import Divider from '$components/Divider.svelte';
	let classname = '';
	let dispatcher = createEventDispatcher<{ close: {} }>();
	export { classname as class };
	export let title = '';
	export let subtitle = '';
	export let image = '';
	export let description = '';
	export let link = '';
	export let edit = false;
	let node_input: HTMLInputElement;
	function trigger_input(event: MouseEvent) {
		node_input.click();
	}
	async function handle_input() {
		const [file] = node_input.files as FileList & [File];
		image = await blobToDataUri(file);
	}
</script>

<div class="flex flex-col gap-4 p-4 bg-base-200 rounded-md {classname}">
	<slot>
		{#if edit}
			<div class="flex gap-2">
				<div class="relative w-11 h-11 edit">
					<input
						type="file"
						name="image"
						class="absolute invisible w-full h-full"
						bind:this={node_input}
						on:input={handle_input}
					/>
					<button
						class="btn btn-sm btn-ghost absolute w-full h-full rounded-sm z-20 opacity-0 hover:opacity-100 hover:backdrop-brightness-50 transition-all"
						on:click={trigger_input}
					>
						<svg
							class="w-full h-full"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
							/><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
							/></svg
						>
					</button>
					{#if image}
						<img
							class="w-full h-full object-cover object-center z-10"
							src={image}
							alt="{subtitle} logo"
							width="44"
							height="44"
						/>
					{:else}
						<div class="w-full h-full bg-base-300 z-10" />
					{/if}
				</div>
				<div class="flex flex-col flex-grow gap relative">
					<h3 class="font-semibold edit" contenteditable bind:textContent={title} />
					<div class="text-sm edit" contenteditable bind:textContent={subtitle} />
					<button
						class="btn btn-square btn-error btn-sm absolute right-0"
						on:click={() => {
							dispatcher('close');
						}}
					>
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
								d="M6 18L18 6M6 6l12 12"
							/></svg
						>
					</button>
				</div>
			</div>
			<p class="edit" contenteditable bind:textContent={description} />
			<!-- <div class="flex w-full">
				<div class="text-sm font-medium edit" contenteditable bind:textContent={link} />
			</div> -->
		{:else}
			<div class="flex gap-2">
				<img
					class="w-11 h-11 object-cover object-center bg-base-300 rounded-sm"
					src={image}
					alt="{subtitle} logo"
					width="44"
					height="44"
				/>
				<div class="flex flex-col gap">
					<h3 class="font-semibold">{title}</h3>
					<div class="text-sm">{subtitle}</div>
				</div>
			</div>
			<p>{description}</p>
		{/if}
		<Divider />
		<div class="flex w-full justify-end">
			<a class="text-sm font-medium px-2 py-1 bg-secondary rounded-md" href={link + title}>View</a>
		</div>
	</slot>
</div>

<style lang="postcss">
	.edit {
		outline: none;
		@apply rounded-sm;
	}
	.edit:hover,
	.edit:focus {
		@apply outline-offset-4 outline-2 outline-secondary outline;
	}
</style>
