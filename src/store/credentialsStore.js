import { writable } from "svelte/store";

let currentHeaders = {};
let baseAPIurl = null;

function createCredentialsStore() {
  const { subscribe, set, update } = writable(null);
  return {
    subscribe,
    getCurrentHeaders() {
      return currentHeaders;
    },
    getAPIurl() {
      return baseAPIurl;
    },
    setCredentials: newCredentials =>
      update(() => {
        if (
          !newCredentials.login ||
          !newCredentials.token ||
          !newCredentials.url
        ) {
          return null;
        }
        baseAPIurl = newCredentials.url;
        currentHeaders = {
          "X-AUTH-USER": newCredentials.login,
          "X-AUTH-TOKEN": newCredentials.token
        };
        return newCredentials;
      }),
    reset: () => set(null)
  };
}

const credentials = createCredentialsStore();
export default credentials;
