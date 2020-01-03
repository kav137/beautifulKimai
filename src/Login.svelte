<script>
	import { credentials, reports } from './stores.js';
	import { onMount } from 'svelte';

	const checkLogin = async (login, token, baseUrl) => {
		if (!login || !token) {
			return false;
		}

		const fullPath = baseUrl + 'timesheets';
		const reuqestOptions = {
			method: 'GET',
			headers: {
				'X-AUTH-USER': login,
				'X-AUTH-TOKEN': token
			}
		}
		const result = await fetch(fullPath, reuqestOptions);
		if (result.status !== 200) {
			const resultJson = await result.json();
			console.log('Result of login', resultJson);
			return false;
		}
		return true;
	}

	async function checkLoginFromLocalStorage() {
		const login = localStorage.getItem('login');
		const token = localStorage.getItem('token');
		const url = localStorage.getItem('url');

		const isCorrectLogin = await checkLogin(login, token, url);
		if (isCorrectLogin) {
			credentials.setCredentials({
				login,
				token,
				url
			});
		} else {
			credentials.reset();
		}

		return isCorrectLogin;
	}

	async function loginFromForm(event) {
		event.preventDefault();

		const data = new FormData(event.target);
		const login = data.get('login');
		const token = data.get('token');
		const url = data.get('url');

		localStorage.setItem('login', login);
		localStorage.setItem('token', token);
		localStorage.setItem('url', url);

		const isCorrect = await checkLoginFromLocalStorage();
		if (!isCorrect) {
			alert('Token or login is not correct');
		}
	}

	onMount(async () => {
		checkLoginFromLocalStorage();
	});
</script>

<h1>Kimai report system</h1>
<form on:submit={loginFromForm}>
	<label>
		Url of root Kimai servise (looks like <i>http://192.168.10.20:8001/api/</i>): <br>
		<input name="url" type="text" required>
	</label>

	<label>
		Login: <br>
		<input name="login" type="text" required>
	</label>

	<label>
		TOKEN:<br>
		<input name="token" type="password" required>
	</label>
	<input type="submit" value="Login"/>

</form>

<hr>

<details>
	<summary>How to get TOKEN:</summary>
	In Kimai system:
	<ul>
		<li>Click to User menu</li>
		<li>Click `Edit` item</li>
		<li>Move to `API` tab</li>
		<li>Enter `API password` and `Repeat API password`</li>
		<li>Click `Save` button</li>
	</ul>
	<h4>Entered `API password` will be TOKEN in this system</h4>
</details>
