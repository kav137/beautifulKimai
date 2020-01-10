<script>
  import reports from "./store/reportsStore.js";
  import PreviewReport from "./PreviewReport.svelte";
  import ReportEditor from "./ReportEditor.svelte";
  import converter from "./converters";

  import { onMount } from "svelte";
  let daysBlock = [];

  $: selectedReport = null;

  function selectReport(event) {
    const selectedId = event.detail.id;
    selectedReport = $reports.find(report => report.id == selectedId);
  }

  function getDuration(reports) {
    const globalDuration = reports.reduce((duration, report) => {
      return duration + report.duration;
    }, 0);
    return converter.duration.toView(globalDuration);
  }

  onMount(async () => {
    reports.subscribe(reports => {
      if (!reports) {
        return;
      }
      const listOfDays = [
        ...new Set(
          reports.map(report => {
            return converter.date.toView(report.end);
          })
        )
      ];
      daysBlock = listOfDays.map(day => {
        const listOfReports = reports.filter(report => {
          const reportDay = converter.date.toView(report.end);
          return reportDay === day;
        });

        return {
          title: day,
          reports: listOfReports
        };
      });
    });
    await reports.getReportList();
    selectedReport = $reports.find(report => report.id);
  });
</script>

<style>
  .list {
    width: 50%;
    padding: 10px 0 10px 10px;
    box-sizing: border-box;
  }

  .report-editor {
    box-sizing: border-box;
    padding: 10px;
    padding-left: 30px;
    width: 50%;
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }
  .day-block {
    border: 1px solid #aaa;
    border-radius: 10px 0 0 10px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    border-right: none;
    margin: 10px 0;
    box-sizing: border-box;
    padding: 20px;
  }
  .day-title {
    margin: 0;
  }
</style>

<div class="list">
  <h2>Reports</h2>
  {#each daysBlock as dayBlock, i}
    <div class="day-block">
      <h3 class="day-title">
        Day: {dayBlock.title} | Time: {getDuration(dayBlock.reports)}
      </h3>
      {#each dayBlock.reports as report, i}
        <PreviewReport
          {report}
          isSelectedReport={selectedReport && selectedReport.id === report.id}
          on:select={selectReport} />
      {/each}
    </div>
  {/each}
</div>

<div class="report-editor">
  <h2>Report editor</h2>

  {#if selectedReport !== null}
    <ReportEditor report={selectedReport} />
  {:else}
    <p>Need select report</p>
  {/if}
</div>
