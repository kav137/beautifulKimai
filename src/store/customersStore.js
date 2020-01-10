import { writable } from "svelte/store";
import credentials from "./credentialsStore";
import kimaiApi from "../kimaiApi";

function createStore() {
  const { subscribe, set, update } = writable([]);
  credentials.subscribe(async newCredentials => {
    if (!newCredentials) {
      return;
    }
    const data = await kimaiApi.getCustomers(
      newCredentials.urlAPI,
      newCredentials.headers
    );
    update(() => {
      return data;
    });
  });

  return {
    subscribe
  };
}

const store = createStore();
export default store;
