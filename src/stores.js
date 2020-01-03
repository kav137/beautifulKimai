import { writable } from "svelte/store";

function createCredentialsStore() {
  const { subscribe, set, update } = writable(null);

  return {
    subscribe,
    setCredentials: (newCredentials) => update(() => {
      if (!newCredentials.login || !newCredentials.token || !newCredentials.url) {
        return null;
      }
      return newCredentials;
    }),
    reset: () => set(null)
  };
}
const reports = writable([]);
const credentials = createCredentialsStore();

export {reports, credentials};
