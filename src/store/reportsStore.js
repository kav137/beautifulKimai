import { writable } from "svelte/store";
import credentials from "./credentialsStore";

const setRequest = async (baseUrl, headers, path) => {
  const fullPath = baseUrl + path;
  const reuqestOptions = {
    method: "GET",
    headers: headers
  };
  const result = await fetch(fullPath, reuqestOptions);
  const resultJson = await result.json();
  return resultJson;
};

let staticVariables = null;
const createStaticVariables = async (url, headers) => {
  const staticRequests = {
    projects: setRequest(url, headers, "projects"),
    customers: setRequest(url, headers, "customers"),
    activities: setRequest(url, headers, "activities")
  };
  return {
    projects: await staticRequests.projects,
    customers: await staticRequests.customers,
    activities: await staticRequests.activities
  };
};

function createReportsStore() {
  const { subscribe, set, update } = writable([]);
  return {
    subscribe,
    getStaticDate: () => staticVariables,
    saveNewReport: async reportObject => {
      const url = credentials.getAPIurl();
      const headers = credentials.getCurrentHeaders();
      const fullPath = url + "timesheets";
      const reuqestOptions = {
        method: "POST",
        headers: {
          ...headers,
          "content-type": "application/json"
        },
        body: JSON.stringify(reportObject)
      };
      const result = await fetch(fullPath, reuqestOptions);
      const resultJson = await result.json();
      console.log("result of saving", resultJson);

      return resultJson;
    },
    updateReportList: async () => {
      const url = credentials.getAPIurl();
      const headers = credentials.getCurrentHeaders();

      const reportReq = setRequest(url, headers, "timesheets?full=true"); ////recent?size=10
      staticVariables =
        staticVariables || (await createStaticVariables(url, headers));

      top.staticVariables = staticVariables;

      const reports = await reportReq;
      top.reports = reports;

      update(() => {
        return reports;
      });
    },
    reset: () => set(null)
  };
}

const reports = createReportsStore();
export default reports;
