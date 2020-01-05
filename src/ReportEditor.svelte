<script>
  export let report;
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
    <label>
      <span>Description:</span>
      <br />
      <textarea bind:value={report.description} name="description" />
    </label>

    <label>
      <span>Date:</span>
      <input bind:value={report.begin} type="text" name="date" />
    </label>

    <label>
      <span>Duration:</span>
      <input bind:value={report.duration} type="text" name="duration" />
    </label>

    <label>
      <span>Project:</span>
      <input bind:value={report.project.name} type="text" name="project" />
    </label>

    <label>
      <span>Activity:</span>
      <input bind:value={report.activity.name} type="text" name="activity" />
    </label>

    <input type="submit" value="Save" />
  </form>
</div>
