<script>
	import sendRequest from './login';
	import { credentials } from './stores.js';

	async function click() {
		await sendRequest();
	}

	function setCredentials() {
		credentials.setCredentials();
	}
</script>

<button on:click={click}>Send request</button>
<button on:click={setCredentials}>setCredentials</button>
