<script context="module" lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { IPortfolio } from '$models/portfolio';
</script>

<script lang="ts">
	import Divider from '$components/Divider.svelte';
	import SList from '$components/SList.svelte';
	import SListItem from '$components/SListItem.svelte';
	import PortfolioSectionCard from './_PortfolioSectionCard.svelte';
	import PortfolioSection from './_PortfolioSection.svelte';

	export let edit = false;
	export let about: IPortfolio['about'];
	export let experiences: IPortfolio['expriences'] = [];
	export let projects: IPortfolio['projects'] = [];
	function add_project() {
		projects.push({
			title: 'Your Project Name',
			subtitle: 'Your Project Company Name',
			description: 'Your Project Description',
			link: '/project/',
			logo: ''
		});
		projects = projects;
	}
	function del_project(index: number) {
		return function () {
			projects.splice(index, 1);
			projects = projects;
		};
	}
</script>

<PortfolioSection {edit} title="About Me" bind:description={about.description}>
	<SList slot="additional" col class="px-4 py-3 justify-between bg-base-200 rounded-md">
		{#each about.additional as item}
			{#if edit}
				<SListItem>
					<h3
						class="font-semibold edit"
						contenteditable
						bind:textContent={item.title}
						spellcheck="false"
					/>
					<p class="edit" contenteditable bind:textContent={item.description} spellcheck="false" />
				</SListItem>
			{:else}
				<SListItem>
					<h3 class="font-semibold">{item.title}</h3>
					<p>{item.description}</p>
				</SListItem>
			{/if}
		{/each}
	</SList>
</PortfolioSection>
<Divider />
<PortfolioSection title="Experience">
	<div>None</div>
</PortfolioSection>
<Divider />
<PortfolioSection title="Projects">
	<SList class="grid grid-cols-2 gap-4">
		{#if projects.length}
			{#each projects as item, index}
				<SListItem transition={fade} class="">
					<PortfolioSectionCard
						{edit}
						bind:title={item.title}
						bind:subtitle={item.subtitle}
						bind:image={item.logo}
						bind:description={item.description}
						bind:link={item.link}
						on:close={del_project(index)}
					/>
				</SListItem>
			{/each}
		{:else if !edit}
			<div>None</div>
		{/if}
		{#if edit}
			<SListItem transition={fade}>
				<PortfolioSectionCard class="grid place-content-center">
					<button class="btn btn-circle btn-primary" on:click={add_project}>
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
								d="M12 6v6m0 0v6m0-6h6m-6 0H6"
							/></svg
						>
					</button>
				</PortfolioSectionCard>
			</SListItem>
		{/if}
	</SList>
</PortfolioSection>

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
