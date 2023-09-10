<script lang="ts">
	import { Line } from 'svelte-chartjs';
	import { options, plugins } from '$lib/components/charts/eventTypeLineChart';
	import { typeAggStore } from '$lib/stores/typeAggStore.js';
	import { transformDatasetData } from '$lib/components/charts/utils/transformations.js';
	import { distinctTypes } from '$lib/stores/distinctTypes.js';
	import EventTable from '$lib/components/EventTable.svelte';
	import EventListShort from '$lib/components/EventListShort.svelte';
	export let data;

	$: chartDataset = {
		datasets: $distinctTypes.map((distinctType) => ({
			label: distinctType,
			data: transformDatasetData(
				$typeAggStore.filter((agg) => agg.eventType == distinctType),
				{ x: 'created_at', y: 'averagePrice' }
			)
		}))
	};
</script>

<div class="flex gap-6">
	<div class="flex w-1/4">
		<EventListShort events={data.lastWeekEvents} />
	</div>
	<div class="w-3/4 h-[75vh] card p-8">
		<div id="legend-container" />
		<Line data={chartDataset} {options} {plugins} />
	</div>
</div>

<div class="mt-6">
	{#await data.streamed.announcedLastThreeDays then announcedLastThreeDays}
		<EventTable events={announcedLastThreeDays.data} />
	{/await}
</div>
