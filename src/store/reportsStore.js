import { writable } from "svelte/store";
import credentials from "./credentialsStore";

const getAllListOfReports = async (baseUrl, headers) => {
  const fullPath = baseUrl + "timesheets/recent?size=10";
  const reuqestOptions = {
    method: "GET",
    headers: headers
  };
  const result = await fetch(fullPath, reuqestOptions);
  const resultJson = await result.json();
  return resultJson;
};

function createReportsStore() {
  const { subscribe, set, update } = writable([]);
  return {
    subscribe,
    updateReportList: async () => {
      const url = credentials.getAPIurl();
      const headers = credentials.getCurrentHeaders();
      const reports = await getAllListOfReports(url, headers);
      console.log("reports", reports);
      console.log("reports[0]", reports[0]);

      update(() => {
        return reports;
      });
    },
    reset: () => set(null)
  };
}

const reports = createReportsStore();
export default reports;
