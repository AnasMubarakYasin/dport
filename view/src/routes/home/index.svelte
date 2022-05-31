<script context="module" lang="ts">
	export const router = true;
	export const hydrate = true;
	// export const prerender = true;

	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { session } from '$app/stores';
	import type { IPortfolio } from '$models/portfolio';
</script>

<script lang="ts">
	import PortfolioContent from './_PortfolioContent.svelte';

	import '$css';
	import Page from '$components/Page.svelte';
	import Header from '$components/Header.svelte';
	import TopBar from '$components/TopBar.svelte';
	import TopBarNav from './_topnav.svelte';
	import TopBarMenu from './_topmenu.svelte';
	import Main from '$components/Main.svelte';
	import Progress from '$components/Progress.svelte';
	import Hero from '$components/hero.svelte';
	import Divider from '$components/Divider.svelte';
	import Space from '$components/Space.svelte';
	import SList from '$components/SList.svelte';
	import SListItem from '$components/SListItem.svelte';
	import Snackbar from '$components/Snackbar.svelte';
	import Footer from '$components/Footer.svelte';
	import PortfolioSectionCard from './_PortfolioSectionCard.svelte';
	import PortfolioSection from './_PortfolioSection.svelte';
	import PortfolioHeader from './_PortfolioHeader.svelte';
	import FooterContent from './_footer.svelte';

	// export let id_portfolio: string;
	export let portfolio: IPortfolio;

	let thema = 'dark';
	let name = 'Dport';
	let image = '/proto-512.v2.png';
	let progress: Progress;
	let edit = false;
	let edit_snack = {
		show: false,
		state: '',
		emsg: ''
	};

	onMount(async () => {
		try {
			// $session.id_portfolio = id_portfolio;
		} catch (error: any) {
		} finally {
			progress.hiding();
		}
	});
	onDestroy(async () => {});

	async function edit_content() {
		try {
			if (edit) {
				progress.showing();
				await fetch('/home', {
					method: 'post',
					body: JSON.stringify(portfolio)
				});
				edit_snack.state = 'success';
			} else {
				edit_snack.state = 'info';
			}
			edit_snack.show = true;
			edit = !edit;
		} catch (error: any) {
			edit_snack.state = 'fail';
			edit_snack.emsg = error.message;
		} finally {
			edit_snack = edit_snack;
			progress.hiding();
		}
	}
</script>

<Page {thema} class="bg-neutral text-neutral-content">
	<div transition:fade>
		<Header>
			<Progress bind:this={progress} absolute />
			<TopBar class="bg-base-100" brand={{ name, image }}>
				<TopBarNav slot="left" />
				<TopBarMenu slot="right" bind:thema />
			</TopBar>
		</Header>
		<Hero class="w-full h-60">
			<div
				class="w-full h-full"
				style="background: linear-gradient(150deg, rgba(108,104,163,1) 0%, rgba(35,128,185,1) 31%, rgba(0,212,255,1) 100%);"
			/>
		</Hero>
		<Main class="px-10 py-6 gap-6 bg-base-100">
			<PortfolioHeader {edit} profile={portfolio.profile} />
			<Divider />
			<PortfolioContent
				{edit}
				about={portfolio.about}
				experiences={portfolio.expriences}
				projects={portfolio.projects}
			/>
		</Main>
		<Space />
		<Footer class="grid bg-base-100">
			<FooterContent />
		</Footer>
	</div>
</Page>

<Snackbar show bottom right force>
	<button class="btn btn-circle btn-primary" on:click={edit_content}>
		{#if edit}
			<svg
				class="w-6 h-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
			</svg>
		{:else}
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
					d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
				/>
			</svg>
		{/if}
	</button>
</Snackbar>
<Snackbar bind:show={edit_snack.show} bottom center timeout={3000}>
	{#if edit_snack.state == 'info'}
		<div class="alert alert-info alert-sm shadow-lg">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="stroke-current flex-shrink-0 w-6 h-6"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>Content Editable Enabled</span>
			</div>
		</div>
	{:else if edit_snack.state == 'fail'}
		<div class="alert alert-error alert-sm shadow-lg">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current flex-shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>Content Failed Saved.</span>
			</div>
		</div>
	{:else if edit_snack.state == 'success'}
		<div class="alert alert-success alert-sm shadow-lg">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current flex-shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>Content Successfully Saved</span>
			</div>
		</div>
	{/if}
</Snackbar>
<Snackbar show bottom center timeout={5000}>
	<div class="alert alert-warning alert-sm shadow-lg">
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current flex-shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
				/></svg
			>
			<span>Warning: The Page in Under Development!</span>
			<!-- <button id="snackbar-status" class="btn btn-sm btn-square btn-ghost">
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
			</button> -->
		</div>
	</div>
</Snackbar>
