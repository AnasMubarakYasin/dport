<script context="module" lang="ts">
	export const router = true;
	export const hydrate = true;
	export const prerender = true;

	import { onMount, onDestroy } from 'svelte';

	const navigation = [
		{ name: 'Home', link: '/home' },
		{ name: 'Projects', link: '/home/projects' },
		{ name: 'Monitoring', link: '/home/monitoring' },
		{ name: 'Blog', link: '/home/blog' }
	];
</script>

<script lang="ts">
	import { page } from '$app/stores';

	let pathname = $page.url.pathname;

	onMount(async () => {});
	onDestroy(async () => {});

	function activated(link: string) {
		return pathname == link ? 'opacity-100' : 'opacity-70 hover:opacity-90';
	}
</script>

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
