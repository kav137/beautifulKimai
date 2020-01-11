import { writable } from "svelte/store";
import credentials from "./credentialsStore";
import kimaiApi from "../kimaiApi";

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
    saveNewReport: async function(reportObject) {
      const result = await kimaiApi.createReport(urlAPI, headers, reportObject);
      console.log("result of saving", result);
      return this.getReportList();
    },

    deleteReport: async function(id) {
      if (!id) {
        return;
      }
      const result = await kimaiApi.deleteReport(urlAPI, headers, id);
      console.log("result of delete" + id, result);
      return this.getReportList();
    },

    getReportList: async function() {
      window.reports = await kimaiApi.getAllReports(urlAPI, headers);

      update(() => {
        return window.reports;
      });
    }
  };
}

const reports = createReportsStore();
export default reports;
