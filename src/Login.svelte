<script>
  import credentials from "./store/credentialsStore.js";
  import { onMount } from "svelte";
  import kimaiApi from "./kimaiApi";
  let APIinformationImage = "./loginInformation.png";
  let showInfoPage = true;

  let defaultKimaiApi = window.kimaiStaticData && window.kimaiStaticData.url;
  let login = "";
  let token = "";
  let urlAPI = defaultKimaiApi || "";

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

  function switchInfo() {
    showInfoPage = !showInfoPage;
  }
</script>

<style>
  h1 {
    margin-top: 0;
  }
  .container {
    background: linear-gradient(to bottom, #eeffff, #ffffff);
    color: color("base");
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }

  form {
    overflow: hidden;
    position: relative;
    z-index: 1;
    background: #ffffff;
    min-width: 360px;
    margin: 100px auto;
    padding: 45px;
    text-align: center;
    border-radius: 5px;
    box-shadow: 0 0 55px 0 rgba(0, 0, 0, 0.1);
    transition: all 200ms;
  }

  input {
    outline: 0;
    background: #f2f2f2;
    width: 300px;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }
  img {
    width: 500px;
    transform: scale(1.19);
    margin: 45px 0 55px 0;
  }
  button {
    text-transform: uppercase;
    outline: 0;
    background: #4caf50;
    width: 100%;
    max-width: 300px;
    border: 0;
    padding: 15px;
    margin: 0;
    color: #ffffff;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
  }

  button:hover,
  button:active,
  button:focus {
    background: #43a047;
  }

  .get-info {
    margin: 15px 0 0;
    color: #b3b3b3;
    font-size: 12px;
    color: #4caf50;
    text-decoration: none;
    cursor: pointer;
  }
  .how-get-api {
    text-align: left;
  }
</style>

{#if !waitOfCheckingCacheCredentials}

  <div class="container">
    <form on:submit={loginFromForm}>
      <h1>Kimai</h1>

      {#if !defaultKimaiApi}
        <label>
          <input
            name="url"
            placeholder="Kimai URL"
            bind:value={urlAPI}
            type="text"
            required />
        </label>
      {/if}

      <label>
        <input
          name="login"
          placeholder="login"
          bind:value={login}
          type="text"
          required />
      </label>

      <label>
        <input
          name="token"
          placeholder="API password"
          bind:value={token}
          type="password"
          required />
      </label>
      <button type="submit">Login</button>
      <p class="get-info" on:click={switchInfo}>
        How to generate API password?
      </p>

      {#if showInfoPage}
        <div class="how-get-api">
          <img src={APIinformationImage} alt="" />
          <p>
            Open
            <b>User menu</b>
            in root Kimai system
          </p>
          <p>
            Move to
            <b>Edit</b>
            page
          </p>
          <p>
            Switch to
            <b>API</b>
            tab
          </p>
          <p>
            Enter new
            <b>API password</b>
          </p>
        </div>
      {/if}
    </form>
  </div>
{/if}
