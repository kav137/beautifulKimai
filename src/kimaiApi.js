const kimaiApi = {
  getRequest: async function(urlAPI, headers, path) {
    const fullPath = urlAPI + path;
    const reuqestOptions = {
      method: "GET",
      headers: headers
    };
    const result = await fetch(fullPath, reuqestOptions);
    const resultJson = await result.json();
    return resultJson;
  },
  getProjects: function(urlAPI, headers) {
    return this.getRequest(urlAPI, headers, "projects");
  },
  getCustomers: function(urlAPI, headers) {
    return this.getRequest(urlAPI, headers, "customers");
  },
  getActivities: function(urlAPI, headers) {
    return this.getRequest(urlAPI, headers, "activities");
  },
  createReport: async function(urlAPI, headers, reportObject) {
    const fullPath = urlAPI + "timesheets";
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
    return resultJson;
  },
  checkLogin: async function(login = "", token = "", urlAPI = "") {
    const fullPath = urlAPI + "ping";
    const reuqestOptions = {
      headers: {
        "X-AUTH-USER": login,
        "X-AUTH-TOKEN": token
      }
    };
    const result = await fetch(fullPath, reuqestOptions);
    return result.status === 200;
  }
};

export default kimaiApi;
