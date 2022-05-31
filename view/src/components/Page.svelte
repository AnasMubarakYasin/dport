<script lang="ts">
	let classname = '';
	export { classname as class };
	export let thema = 'dark';
	$: toggle_thema(classname, thema);
	let body: HTMLBodyElement | null;
	function init(node: HTMLBodyElement) {
		body = node;
		toggle_classname();
		toggle_thema();
	}
	function toggle_classname(...tag: any[]) {
		if (body) {
			body.className = `${thema} ${classname}`;
		}
	}
	function toggle_thema(...tag: any[]) {
		if (body) {
			body.setAttribute('data-theme', thema);
			body.className = `${thema} ${classname}`;
		}
	}
</script>

<svelte:body use:init />

<slot />
