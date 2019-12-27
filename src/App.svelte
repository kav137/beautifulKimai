<script>
	import Login from "./Login.svelte";
	import Reports from "./Reports.svelte";
	import { credentials } from "./stores.js";
</script>

<main>
	<h1>The credentials is {$credentials}</h1>
	{#if $credentials === null}
		<Login />
	{:else}
		<Reports />
	{/if}
</main>
