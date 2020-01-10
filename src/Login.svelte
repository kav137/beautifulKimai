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
  let waitOfCheckingCacheCredentials = true;
  onMount(async () => {
    await credentials.checkCachedCredentials();
    waitOfCheckingCacheCredentials = false;
  });
</script>

{#if !waitOfCheckingCacheCredentials}
  <h1>Kimai report system</h1>
  <form on:submit={loginFromForm}>
    <label>
      Url of Kimai API servise (looks like
      <b>http://192.168.10.20:8001/api/</b>
      )
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

  <h3>How to get TOKEN:</h3>
  <p>In Kimai system:</p>
  <ul>
    <li>Click to User menu</li>
    <li>Click `Edit` item</li>
    <li>Move to `API` tab</li>
    <li>Enter `API password` and `Repeat API password`</li>
    <li>Click `Save` button</li>
  </ul>
  <p>Entered `API password` will be TOKEN in this system</p>
{/if}
