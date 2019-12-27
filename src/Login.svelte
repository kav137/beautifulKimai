<script>
	import sendRequest from './login';

	async function click() {
		await sendRequest();
	}
</script>

<button on:click={click}>Send request</button>
