<script lang="ts">
	import 'chartjs-adapter-date-fns';
	import { options, plugins } from '$lib/components/charts/eventTypeLineChart';
	import { filterStore } from '$lib/components/Filters/filterStore';
	import KpiCard from '$lib/components/KpiCard.svelte';
	import { Line } from 'svelte-chartjs';
	import { indexOfFirstUppercase } from '$lib/utilities/utils.js';
	import { transformDatasetData } from '$lib/components/charts/utils/transformations';
	import EventRecordsCard from '$lib/components/Cards/EventRecordsCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const yAxisKeys = ['averagePrice', 'highestPrice', 'listingCount', 'eventScore'];
	let yAxisSelected = 'averagePrice';
	const topTotalEventAggs = data.totalEventTypeAggs.slice(0, 4);

	$: kpiDatasets = topTotalEventAggs.map((totalAgg) => ({
		label: totalAgg.eventType,
		datasets: [
			{
				data: transformDatasetData(
					data.splitMonthlyEventAggs.find(
						(monthAgg) => monthAgg[0].eventType === totalAgg.eventType
					),
					{ x: 'created_at', y: 'listingCount' }
				)
			}
		]
	}));

	$: lineChartDatasets = {
		datasets: topTotalEventAggs.map((totalAgg) => ({
			label: totalAgg.eventType,
			data: transformDatasetData(
				data.splitMonthlyEventAggs.find((monthAgg) => monthAgg[0].eventType === totalAgg.eventType),
				{ x: 'created_at', y: yAxisSelected }
			)
		}))
	};

	//BUG: Broke the filterStore
	//fix  would be to add a plugin to charts that checks for filters

	//TODO:
	//Watchlist page should have a "view" when a card is clicked
	//Upcoming page needs a chart for event vs. related event types / events in area
</script>

<div>
	<h1 class="h1">Event Types</h1>
	<div
		class="container grid grid-cols-5 grid-rows-1 mt-8 gap-6 h-full w-full mx-auto justify-center items-center"
	>
		<div class="col-span-2 grid grid-rows-2 grid-cols-2 gap-6 h-full">
			{#each topTotalEventAggs as agg}
				{#key $filterStore.eventType}
					<KpiCard
						title={agg.eventType}
						subtitle={'Average Listings: '}
						indicatorVal={agg.listingCount}
						link={`eventType/${agg.eventType}`}
						chartData={kpiDatasets.filter((dataset) => dataset.label === agg.eventType)[0]}
					/>
				{/key}
			{/each}
		</div>
		<div class="col-span-3 card p-4 h-full">
			<div class="flex h-14">
				<h1 class=" font-3xl mt-4 ml-4">Average Price by Event Date</h1>
				<form class="z-10 ml-auto p-4">
					<select class="select w-40" bind:value={yAxisSelected}>
						{#each yAxisKeys as selector}
							<option value={selector}>
								<p>
									{selector[0].toUpperCase() +
										selector.slice(1, indexOfFirstUppercase(selector)) +
										' ' +
										selector.slice(indexOfFirstUppercase(selector))}
								</p></option
							>
						{/each}
					</select>
				</form>
			</div>
			<div id="legend-container" />
			{#key $filterStore.eventType}
				{#key yAxisSelected}
					<div class="h-96 w-auto">
						<Line data={lineChartDatasets} {options} {plugins} />
					</div>
				{/key}
			{/key}
		</div>
	</div>
</div>
<section class="flex flex-row flex-wrap gap-6 mt-6 justify-around">
	{#await data.streamed.justAnnouncedByTypeDetails}
		{#each { length: 10 } as _}
			<article class="card p-4 m-6 max-w-md">
				<div class="h-36 w-80 animate-pulse" />
			</article>
		{/each}
	{:then justAnnouncedEventRecords}
		{#each justAnnouncedEventRecords as eventRecords}
			<EventRecordsCard latestRecord={eventRecords} eventRecords={eventRecords.records}>
				<svelte:fragment slot="chart">
					<Line data={eventRecords.chartData} {options} />
				</svelte:fragment>
			</EventRecordsCard>
		{/each}
	{/await}
</section>
