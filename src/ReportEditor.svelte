<script>
  import converter from "./converters";

  import reports from "./store/reportsStore.js";
  import activities from "./store/activitiesStore.js";
  import projects from "./store/projectsStore.js";
  import customers from "./store/customersStore.js";

  export let report;
  import { beforeUpdate, afterUpdate, onMount } from "svelte";
  const convertReportToSendFormat = reportObject => {
    const startDateStr = converter.date.toSrc(reportObject.date);
    const startDate = new Date(startDateStr);
    const duration = converter.duration.toSrc(
      reportObject.hours,
      reportObject.minutes
    );
    const endData = new Date(startDate.getTime() + duration * 1000);
    const endDateStr = converter.date.toSrc(endData.toString());
    return Object.assign(
      {},
      {
        begin: startDateStr,
        end: endDateStr,
        project: reportObject.projectId,
        activity: reportObject.activityId,
        description: reportObject.description,
        tags: ""
      }
    );
  };

  let saveAsToday = async e => {
    e.preventDefault();
    const todayDayObj = new Date();
    const todayString = todayDayObj.toISOString().split("T")[0];

    const todayObj = Object.assign({}, reportInEditMode, {
      date: converter.date.toSrc(todayString)
    });
    const reportForSend = convertReportToSendFormat(todayObj);
    await reports.saveNewReport(reportForSend);
  };

  beforeUpdate(() => {
    if (report.id !== reportInEditMode.id) {
      reportInEditMode.id = report.id;

      reportInEditMode.description = report.description;
      reportInEditMode.date = converter.date.toView(report.begin);

      const viewTime = converter.duration.toView(report.duration);
      reportInEditMode.hours = viewTime.split(":")[0];
      reportInEditMode.minutes = viewTime.split(":")[1];

      reportInEditMode.projectId = report.project.id;
      reportInEditMode.activityId = report.activity.id;
      reportInEditMode.customerId = report.project.customer.id;
    }
  });
  const reportInEditMode = {};
</script>

<style>
  textarea {
    width: 100%;
    height: 150px;
  }
  span {
    min-width: 100px;
    display: inline-block;
  }
  .time {
    width: 40px;
  }

  .time + i {
    padding-right: 10px;
  }
</style>

<div>
  <form>
    <button>Save</button>
    <button on:click={saveAsToday}>Save for today</button>

    <label>
      <span>Description:</span>
      <br />
      <textarea bind:value={reportInEditMode.description} name="description" />
    </label>

    <label>
      <span>Date:</span>
      <input bind:value={reportInEditMode.date} type="date" name="date" />
    </label>

    <label>
      <span>Time:</span>
      <input
        class="time"
        bind:value={reportInEditMode.hours}
        type="text"
        name="duration" />
      <i>h</i>
      <input
        class="time"
        bind:value={reportInEditMode.minutes}
        type="text"
        name="duration" />
      <i>m</i>
    </label>

    <label>
      <span>Customer:</span>
      <select bind:value={reportInEditMode.customerId}>
        {#each $customers as customer}
          <option value={customer.id}>{customer.name}</option>
        {/each}
      </select>
    </label>

    <label>
      <span>Project:</span>
      <select bind:value={reportInEditMode.projectId}>
        {#each $projects as project}
          {#if project.customer === reportInEditMode.customerId}
            <option value={project.id}>{project.name}</option>
          {/if}
        {/each}
      </select>
    </label>

    <label>
      <span>Activity:</span>
      <select bind:value={reportInEditMode.activityId}>
        {#each $activities as activity}
          {#if !activity.project || activity.project === reportInEditMode.projectId}
            <option value={activity.id}>{activity.name}</option>
          {/if}
        {/each}
      </select>
    </label>
  </form>
</div>
