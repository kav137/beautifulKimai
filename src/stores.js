import { writable } from "svelte/store";

function createCredentialsStore() {
  const { subscribe, set, update } = writable(null);

  return {
    subscribe,
    setCredentials: () => update(n => true),
    reset: () => set(null)
  };
}
const reports = writable([]);
const credentials = createCredentialsStore();

export {reports, credentials};
