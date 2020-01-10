import { writable } from "svelte/store";
import credentials from "./credentialsStore";
import kimaiApi from "../kimaiApi";

let staticData = null;
const initStaticData = async (url, headers) => {
  const staticRequests = {
    projects: kimaiApi.getProjects(url, headers),
    customers: kimaiApi.getCustomers(url, headers),
    activities: kimaiApi.getActivities(url, headers)
  };
  return {
    projects: await staticRequests.projects,
    customers: await staticRequests.customers,
    activities: await staticRequests.activities
  };
};

function createReportsStore() {
  const { subscribe, set, update } = writable([]);
  let urlAPI = "";
  let headers = {};

  credentials.subscribe(newCredentials => {
    if (!newCredentials) {
      return;
    }
    urlAPI = newCredentials.urlAPI;
    headers = newCredentials.headers;
  });

  return {
    subscribe,
    getStaticDate: async function() {
      staticData = staticData || (await initStaticData(urlAPI, headers));
      return staticData;
    },
    saveNewReport: async function(reportObject) {
      const result = await kimaiApi.createReport(urlAPI, headers, reportObject);
      console.log("result of saving", result);

      return this.getReportList();
    },

    getReportList: async function() {
      window.reports = await kimaiApi.getRequest(
        urlAPI,
        headers,
        "timesheets?full=true"
      );

      update(() => {
        return window.reports;
      });
    }
  };
}

const reports = createReportsStore();
export default reports;
