<script lang="ts">
	import Card from '$lib/components/Cards/Summary/Card.svelte';
	import { cardLineChartOptions } from '$lib/components/charts/cardLineChartOptions.js';
	import { Line } from 'svelte-chartjs';
	export let data;
	let options = cardLineChartOptions;
</script>

<div>
	<h1>Watchlist</h1>
	<div class="flex" />
	{#each data.watchlistRecords as eventRecords}
		<Card
			awaiting={false}
			latestRecord={eventRecords.latest}
			eventRecords={eventRecords.records}
			comparisonType={'self'}
		>
			<svelte:fragment slot="chart">
				<Line data={{ datasets: eventRecords.datasets }} {options} />
			</svelte:fragment>
		</Card>
	{/each}
</div>
