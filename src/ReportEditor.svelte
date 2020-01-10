<script>
  import converter from "./converters";

  import reports from "./store/reportsStore.js";
  import activities from "./store/activitiesStore.js";
  import projects from "./store/projectsStore.js";
  import customers from "./store/customersStore.js";

  export let report;
  import { beforeUpdate, afterUpdate, onMount } from "svelte";
  const covertReportToSend = viewObject => {
    const startDateStr = converter.date.toSrc(viewObject.date);
    const startDate = new Date(startDateStr);
    const duration = converter.duration.toSrc(
      viewObject.hours,
      viewObject.minutes
    );
    const endData = new Date(startDate.getTime() + duration * 1000);
    const endDateStr = converter.date.toSrc(endData.toString());
    return Object.assign(
      {},
      {
        begin: startDateStr,
        end: endDateStr,
        project: viewObject.projectId,
        activity: viewObject.activityId,
        description: viewObject.description,
        tags: ""
      }
    );
  };

  let saveAsToday = async e => {
    e.preventDefault();
    const todayDayObj = new Date();
    const todayString = todayDayObj.toISOString().split("T")[0];

    const todayObj = Object.assign({}, viewReportData, {
      date: converter.date.toSrc(todayString)
    });
    const reportForSend = covertReportToSend(todayObj);
    await reports.saveNewReport(reportForSend);
  };

  beforeUpdate(() => {
    if (report.id !== viewReportData.id) {
      viewReportData.id = report.id;

      viewReportData.description = report.description;
      viewReportData.date = converter.date.toView(report.begin);

      const viewTime = converter.duration.toView(report.duration);
      viewReportData.hours = viewTime.split(":")[0];
      viewReportData.minutes = viewTime.split(":")[1];

      viewReportData.projectId = report.project.id;
      viewReportData.activityId = report.activity.id;
      viewReportData.customerId = report.project.customer.id;
    }
  });
  const viewReportData = {};
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
      <textarea bind:value={viewReportData.description} name="description" />
    </label>

    <label>
      <span>Date:</span>
      <input bind:value={viewReportData.date} type="date" name="date" />
    </label>

    <label>
      <span>Time:</span>
      <input
        class="time"
        bind:value={viewReportData.hours}
        type="text"
        name="duration" />
      <i>h</i>
      <input
        class="time"
        bind:value={viewReportData.minutes}
        type="text"
        name="duration" />
      <i>m</i>
    </label>

    <label>
      <span>Customer:</span>
      <select bind:value={viewReportData.customerId}>
        {#each $customers as customer}
          <option value={customer.id}>{customer.name}</option>
        {/each}
      </select>
    </label>

    <label>
      <span>Project:</span>
      <select bind:value={viewReportData.projectId}>
        {#each $projects as project}
          {#if project.customer === viewReportData.customerId}
            <option value={project.id}>{project.name}</option>
          {/if}
        {/each}
      </select>
    </label>

    <label>
      <span>Activity:</span>
      <select bind:value={viewReportData.activityId}>
        {#each $activities as activity}
          {#if !activity.project || activity.project === viewReportData.projectId}
            <option value={activity.id}>{activity.name}</option>
          {/if}
        {/each}
      </select>
    </label>
  </form>
</div>
