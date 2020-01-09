<script>
  import reports from "./store/reportsStore.js";
  import PreviewReport from "./PreviewReport.svelte";
  import ReportEditor from "./ReportEditor.svelte";

  import { onMount } from "svelte";

  $: selectedReport = null;

  function selectReport(event) {
    const selectedId = event.detail.id;
    selectedReport = $reports.find(report => report.id == selectedId);
  }

  onMount(async () => {
    await reports.updateReportList();
    setTimeout(() => {
      selectedReport = $reports.find(report => report.id);
    }, 200);
  });
</script>

<style>
  .list {
    width: 50%;
    padding: 10px;
    box-sizing: border-box;
  }

  .report-editor {
    box-sizing: border-box;
    padding: 10px;
    width: 50%;
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
  }
</style>

<div class="list">
  <h1>Reports</h1>
  {#each $reports as report, i}
    <PreviewReport
      {report}
      isSelectedReport={selectedReport && selectedReport.id === report.id}
      on:select={selectReport} />
  {/each}
</div>

<div class="report-editor">
  <h1>Report editor</h1>

  {#if selectedReport !== null}
    <ReportEditor report={selectedReport} />
  {:else}
    <p>Need select report</p>
  {/if}
</div>
