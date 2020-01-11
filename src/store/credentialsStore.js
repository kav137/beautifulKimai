import { writable } from "svelte/store";
import kimaiApi from "../kimaiApi";
const LOCAL_STORAGE_ITEM_NAME = "credentialsData";

function createCredentialsStore() {
  const { subscribe, set, update } = writable(null);
  return {
    subscribe,
    checkCredentials: async (login, token, urlAPI) => {
      const isCorrectLogin = await kimaiApi.checkLogin(login, token, urlAPI);

      if (isCorrectLogin) {
        update(() => {
          return {
            urlAPI,
            headers: {
              "X-AUTH-USER": login,
              "X-AUTH-TOKEN": token
            }
          };
        });
        localStorage.setItem(
          LOCAL_STORAGE_ITEM_NAME,
          JSON.stringify({ login, token, urlAPI })
        );
      } else {
        set(null);
      }
      return isCorrectLogin;
    },
    checkCachedCredentials: async function() {
      const { login, token, urlAPI } = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_ITEM_NAME) || "{}"
      );
      return this.checkCredentials(login, token, urlAPI);
    },
    logout: function() {
      localStorage.clear();
      location.reload();
    }
  };
}

const credentials = createCredentialsStore();
export default credentials;
