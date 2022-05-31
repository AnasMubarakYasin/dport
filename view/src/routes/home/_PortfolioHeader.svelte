<script context="module" lang="ts">
	import { session } from '$app/stores';
	import { blobToDataUri } from '$lib/helper';
	import type { IPortfolio } from '$models/portfolio';
</script>

<script lang="ts">
	export let edit = false;
	export let profile: IPortfolio['profile'] | null = null;
	// let id = $session.id_portfolio;
	async function like() {
		if (profile) {
			// await fetch('/home/like', {
			// 	method: 'post',
			// 	body: JSON.stringify({ id, likes: profile.likes + 1 })
			// });
			profile.likes += 1;
			profile = profile;
		}
	}
	function trigger_input(event: MouseEvent) {
		document.getElementById('image-input-header')?.click();
	}
	async function handle_input(event: Event) {
		if (profile) {
			const { target } = event as Event & { target: HTMLInputElement };
			const [image] = target.files as FileList & [File];
			profile.image = await blobToDataUri(image);
			profile = profile;
		}
	}
</script>

<div class="flex gap-10 h-40 bg-base-100">
	<div class="w-40 h-40">
		{#if profile}
			{#if edit}
				<div
					class="w-full h-full object-cover object-center rounded-full border-4 border-base-200 bg-base-200 relative bottom-16 overflow-hidden"
					class:edit
				>
					<input
						type="file"
						name="image"
						id="image-input-header"
						class="absolute invisible w-full h-full"
						on:input={handle_input}
					/>
					<button
						class="btn btn-ghost w-full h-full grid place-content-center absolute z-20 opacity-0 hover:opacity-100 hover:backdrop-brightness-50 transition-all"
						on:click={trigger_input}
					>
						<svg
							class="w-10 h-10"
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
					<img
						class="w-full h-full object-cover object-center z-10"
						src={profile.image}
						alt="profile"
					/>
				</div>
			{:else if profile.image}
				<img
					class="w-full h-full object-cover object-center rounded-full border-4 border-base-200 bg-base-200 relative bottom-16"
					src={profile.image}
					alt="profile"
					width="80"
					height="80"
				/>
			{:else}
				<div
					class="grid place-content-center w-full h-full rounded-full border-4 border-base-200 bg-base-200 relative bottom-16"
				>
					<svg
						class="w-10 h-10"
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
				</div>
			{/if}
		{:else}
			<div
				class="w-full h-full object-cover object-center rounded-full bg-base-200 relative bottom-16 animate-pulse"
			>
				&ThinSpace;
			</div>
		{/if}
	</div>
	<div class="flex flex-col gap-2">
		{#if profile}
			{#if edit}
				<div
					class="text-3xl font-semibold rounded-sm edit"
					contenteditable
					bind:textContent={profile.name}
					spellcheck="false"
				/>
				<p class="rounded-sm edit" contenteditable bind:textContent={profile.description} />
			{:else}
				<div class="text-3xl font-semibold">{profile.name}</div>
				<p>{profile.description}</p>
			{/if}
		{:else}
			<div class="h-9 w-80 bg-base-200 rounded-sm animate-pulse">&ThinSpace;</div>
			<div class="h-5 w-96 bg-base-200 rounded-sm animate-pulse">&ThinSpace;</div>
		{/if}
	</div>
	<div class="flex-grow" />
	<div class="flex gap-4">
		<a class="btn btn-sm btn-outline hover:btn-primary text-xs" href="/home/cv">view cv</a>
		<button class="btn btn-sm btn-outline hover:btn-primary flex gap-1 text-xs" on:click={like}>
			<svg
				class="w-6 h-6 fill-red-500 stroke-red-500"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
				/></svg
			>
			<div class="flex gap-1 items-center">
				<div>Like</div>
				<div>( {profile?.likes ?? 0} )</div>
			</div>
		</button>
	</div>
</div>

<style lang="postcss">
	.edit {
		outline: none;
	}
	.edit:hover,
	.edit:focus {
		@apply outline-offset-4 outline-2 outline-secondary outline;
	}
</style>
