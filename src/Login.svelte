<script>
  import credentials from "./store/credentialsStore.js";
  import { onMount } from "svelte";
  import kimaiApi from "./kimaiApi";
  let login = "";
  let token = "";
  let urlAPI = "";

  async function loginFromForm(event) {
    event.preventDefault();
    const isCorrectLogin = await credentials.checkCredentials(
      login,
      token,
      urlAPI
    );
    if (!isCorrectLogin) {
      alert("Token or login is not correct");
    }
  }

  onMount(async () => {
    credentials.checkCachedCredentials();
  });
</script>

<h1>Kimai report system</h1>
<form on:submit={loginFromForm}>
  <label>
    Url of root Kimai servise (looks like
    <i>http://192.168.10.20:8001/api/</i>
    ):
    <br />
    <input name="url" bind:value={urlAPI} type="text" required />
  </label>

  <label>
    Login:
    <br />
    <input name="login" bind:value={login} type="text" required />
  </label>

  <label>
    TOKEN:
    <br />
    <input name="token" bind:value={token} type="password" required />
  </label>
  <input type="submit" value="Login" />

</form>

<hr />

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
