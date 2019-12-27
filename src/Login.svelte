<script>
	import sendRequest from './login';
	import { credentials, reports } from './stores.js';

	async function click() {
		const data = await sendRequest();
		reports.set(data);
		credentials.setCredentials();
	}

	function setCredentials() {
		credentials.setCredentials();
	}
</script>

<button on:click={click}>Send request</button>
<button on:click={setCredentials}>setCredentials</button>
