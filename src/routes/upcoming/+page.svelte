<script lang="ts">
	import { Line } from 'svelte-chartjs';
	import { eventTypeLineChartOptions } from '$lib/components/charts/eventTypeLineChartOptions';
	import { typeAggStore } from '$lib/stores/typeAggStore.js';
	import { transformDatasetData } from '$lib/components/charts/utils/transformations.js';
	import { distinctTypes } from '$lib/stores/distinctTypes.js';
	import EventTable from '$lib/components/EventTable.svelte';
	import { htmlLegendPlugin } from '$lib/components/charts/utils/htmlLegend';
	import EventRecordsCard from '$lib/components/Cards/Summary/Card.svelte';
	import { cardLineChartOptions } from '$lib/components/charts/cardLineChartOptions';
	export let data;

	const baseChartData = {
		datasets: $distinctTypes.map((distinctType) => ({
			label: distinctType,
			data: transformDatasetData(
				$typeAggStore.filter((agg) => agg.eventType == distinctType),
				{ x: 'created_at', y: 'averagePrice' }
			)
		}))
	};

	$: mainChartData = {
		datasets: [...baseChartData.datasets].filter((agg) => $distinctTypes.includes(agg.label))
	};
</script>

<div class="flex gap-6">
	<div
		class="rounded-container-token bg-surface-100-800-token p-4 flex flex-col w-1/4 overflow-y-auto h-[60vh]"
	>
		{#each data.lastWeekEvents as event}
			<EventRecordsCard
				latestRecord={event}
				eventRecords={null}
				comparisonType={'eventType'}
				awaiting={false}
			>
				<svelte:fragment slot="chart">
					<Line
						data={{
							datasets: baseChartData.datasets.filter(
								(dataset) => dataset.label === event.eventType
							)
						}}
						options={cardLineChartOptions}
					/>
				</svelte:fragment>
			</EventRecordsCard>
		{/each}
	</div>
	<div class="w-3/4 h-[60vh] card p-8">
		<div id="legend-container" />
		<Line data={mainChartData} options={eventTypeLineChartOptions} plugins={[htmlLegendPlugin]} />
	</div>
</div>

<div class="mt-6">
	{#await data.streamed.announcedLastThreeDays then announcedLastThreeDays}
		<EventTable events={announcedLastThreeDays.data} />
	{/await}
</div>
