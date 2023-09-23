<script lang="ts">
</script>

<svelte:fragment slot="chart">
	<Line
		data={{
			datasets: [
				lineChartDatasets.datasets.find((dataset) => dataset.label === eventRecords[0].title)
			]
		}}
		options={cardLineChartOptions}
	/>
</svelte:fragment>
