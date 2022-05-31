<script context="module" lang="ts">
	export const router = true;
	export const hydrate = true;
	export const prerender = true;

	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
</script>

<script lang="ts">
	import '../../app.css';
	import Page from '$components/Page.svelte';
	import TopBar from '$components/TopBar.svelte';
	import TopBarNav from './_topnav.svelte';
	import TopBarMenu from './_topmenu.svelte';
	import Main from '$components/Main.svelte';
	import Progress from '$components/Progress.svelte';
	import Footer from '$components/Footer.svelte';
	import FooterContent from './_footer.svelte';

	let thema = 'dark';
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

<Page {thema} class="bg-neutral text-neutral-content">
	<div transition:fade>
		<Progress bind:this={progress} absolute />
		<TopBar class="bg-base-100" brand={{ name, image }}>
			<TopBarNav slot="left" />
			<TopBarMenu slot="right" bind:thema />
		</TopBar>
		<Main class="p-10">
			<figure class="flex flex-col place-items-center gap-10">
				<img class="w-1/4" src="/undraw_void_-3-ggu.svg" alt="not found" />
				<figcaption class="text-center">
					<h1 class="text-2xl font-bold">Page Not Found</h1>
					<div>We Reached a Void</div>
				</figcaption>
			</figure>
			<div class="flex-grow" />
		</Main>
		<Footer class="grid bg-base-100">
			<FooterContent />
		</Footer>
	</div>
</Page>
