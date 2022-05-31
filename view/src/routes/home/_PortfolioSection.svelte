<script context="module" lang="ts">
</script>

<script lang="ts">
	export let edit = false;
	export let title = '';
	export let description = '';
</script>

<section class="flex gap-10">
	<div class="flex-[25%]">
		<h2 class="text-xl font-semibold">{title}</h2>
	</div>
	<div class="flex-[75%] flex flex-col gap-4">
		<slot>
			{#if edit}
				<p class="edit" contenteditable bind:textContent={description} />
			{:else}
				<p>{description}</p>
			{/if}
			<slot name="additional" />
		</slot>
	</div>
</section>

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
