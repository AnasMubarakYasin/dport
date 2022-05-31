<script lang="ts">
	let classname = '';
	export { classname as class };
	export let image:
		| {
				width: number;
				height: number;
				src: string;
				alt: string;
		  }
		| undefined = undefined;
</script>

<section class="flex items-center {classname}">
	<slot>
		{#if image}
			<div>
				<img src={image.src} alt={image.alt} width={image.width} height={image.height} />
				<slot name="over" />
			</div>
		{/if}
	</slot>
	<slot name="etc" />
</section>

<style lang="scss">
	.fixed {
		position: fixed;
	}
	.sticky {
		position: sticky;
	}
</style>
