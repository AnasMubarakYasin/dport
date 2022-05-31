<script context="module" lang="ts">
</script>

<script lang="ts">
	let classname = '';
	export { classname as class };
	export let fixed = false;
	export let sticky = false;
</script>

<footer class="flex flex-col {classname}" class:fixed class:sticky>
	<slot />
</footer>

<style lang="scss">
  footer {
    min-height: 64px;
  }
	.fixed {
		position: fixed;
	}
	.sticky {
		position: sticky;
	}
</style>
