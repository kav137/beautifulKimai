<script>
	import Login from "./Login.svelte";
	import Reports from "./Reports.svelte";
	import credentials from "./store/credentialsStore.js";
</script>

<main>
	{#if $credentials === null}
		<Login />
	{:else}
		<Reports />
	{/if}
</main>
