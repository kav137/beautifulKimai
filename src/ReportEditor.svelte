<script>
  import converter from "./converters";

  import reports from "./store/reportsStore.js";
  export let report;
  import { beforeUpdate, afterUpdate, onMount } from "svelte";
  let staticData = null;

  onMount(async () => {
    staticData = await reports.getStaticDate();
  });
  const covertReportToSend = viewObject => {
    const startDateStr = converter.date.toSrc(viewObject.date);
    const startDate = new Date(startDateStr);
    const duration = converter.duration.toSrc(viewObject.duration);
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
      viewReportData.duration = converter.duration.toView(report.duration);
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
      <span>Duration:</span>
      <input bind:value={viewReportData.duration} type="text" name="duration" />
    </label>

    {#if staticData !== null}
      <label>
        <span>Customer:</span>
        <select bind:value={viewReportData.customerId}>
          {#each staticData.customers as customer}
            <option value={customer.id}>{customer.name}</option>
          {/each}
        </select>
      </label>

      <label>
        <span>Project:</span>
        <select bind:value={viewReportData.projectId}>
          {#each staticData.projects as project}
            {#if project.customer === viewReportData.customerId}
              <option value={project.id}>{project.name}</option>
            {/if}
          {/each}
        </select>
      </label>

      <label>
        <span>Activities:</span>
        <select bind:value={viewReportData.activityId}>
          {#each staticData.activities as activity}
            {#if !activity.project || activity.project === viewReportData.projectId}
              <option value={activity.id}>{activity.name}</option>
            {/if}
          {/each}
        </select>
      </label>
    {/if}
  </form>
</div>
