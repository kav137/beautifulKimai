<script>
  export let report;
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
    box-shadow: 1px 1px 3px #646464;
    border-radius: 3px;
    padding: 5px 15px;
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }
  article:hover {
    box-shadow: 1px 1px 10px #646464;
  }
  .description {
    flex-basis: 70%;
  }
  .project,
  .activity {
    flex-basis: 10%;
  }
  p {
    margin: 0;
  }
</style>

<article on:click={selectReport}>
  <p class="description">{report.description}</p>
  <p class="project">{report.project.name}</p>
  <p class="activity">{report.activity.name}</p>
  <h4 class="duration">{report.duration / 60 / 60}h</h4>
</article>
