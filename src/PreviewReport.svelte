<script>
  export let report;
  import converter from "./converters";
  export let isSelectedReport = false;
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function selectReport(event) {
    dispatch("select", {
      id: report.id
    });
  }
</script>

<style>
  article {
    border: 1px solid #aaa;
    border-radius: 2px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    padding: 5px 15px;
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }
  .article_selected,
  article:hover {
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  }
  .description {
    flex-basis: 50%;
  }
  .project,
  .date,
  .activity {
    flex-basis: 11%;
  }
  p {
    margin: 0;
  }
</style>

<article
  on:click={selectReport}
  class={isSelectedReport ? `article_selected` : ''}>
  <p class="description">{report.description}</p>
  <p class="project">{report.project.name}</p>
  <p class="activity">{report.activity.name}</p>
  <p class="date">
    <i>{converter.date.toView(report.end)}</i>
  </p>
  <h4 class="duration">{report.duration / 60 / 60}h</h4>
</article>
