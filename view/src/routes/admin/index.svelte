<script context="module" lang="ts">
	export const router = true;
	export const hydrate = true;
	// export const prerender = true;

	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';

	const title = 'Dashboard';
	const desc = 'Dashboard';
</script>

<script lang="ts">
	import '../../app.css';
	import Page from '$components/Page.svelte';
	import Header from '$components/Header.svelte';
	import TopBar from '$components/TopBar.svelte';
	import Aside from '$components/Aside.svelte';
	import Main from '$components/Main.svelte';
	import Progress from '$components/Progress.svelte';
	import Snackbar from '$components/Snackbar.svelte';
	import Footer from '$components/Footer.svelte';

	import TopBarNav from './_topnav.svelte';
	import TopBarMenu from './_topmenu.svelte';
	import AsideDrawer from './_drawer.svelte';

	let thema = 'dark';
	let drawer = true;
	let name = 'Dport';
	let image = '/proto-512.v2.png';
	let progress: Progress;

	onMount(async () => {
		try {
		} catch (error: any) {
		} finally {
			progress.hiding();
		}
	});
	onDestroy(async () => {});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={desc} />
</svelte:head>

<Page {thema} class="bg-neutral text-neutral-content">
	<div transition:fade class="flex">
		<Progress bind:this={progress} absolute />
		<Aside bind:drawer class="bg-base-100">
			<AsideDrawer />
		</Aside>
		<section class="flex flex-col flex-grow">
			<Header>
				<TopBar class="bg-base-100">
					<TopBarNav bind:drawer slot="left" />
					<TopBarMenu slot="right" bind:thema />
				</TopBar>
			</Header>
			<Main class="p-6 gap-4">
				<section>
					<h1 class="text-2xl font-bold">{title}</h1>
				</section>
				<section class="grid grid-cols-4 gap-4">
					<h2 class="text-xl font-bold">Portfolio</h2>
				</section>
				<section class="grid grid-cols-4 gap-4">
					<h2 class="text-xl font-bold">Monitoring</h2>
				</section>
			</Main>
			<div class="flex-grow" />
			<Footer class="bg-base-100">
				<div class="w-full h-full flex place-content-center place-items-center">
					<p>Copyright &copy; 2022 Dport, All Right Reserved.</p>
				</div>
			</Footer>
		</section>
	</div>
</Page>

<Snackbar show center bottom timeout={3000}>
	<div class="alert alert-warning shadow-lg">
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
			<button class="btn btn-sm btn-square btn-ghost">
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
</Snackbar>
