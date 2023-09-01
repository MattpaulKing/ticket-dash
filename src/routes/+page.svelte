<script lang="ts">
	import 'chartjs-adapter-date-fns';
	import { options, plugins } from '$lib/components/charts/eventTypeLineChart';
	import { filterStore } from '$lib/components/Filters/filterStore';
	import KpiCard from '$lib/components/KpiCard.svelte';
	import { Line } from 'svelte-chartjs';
	import { indexOfFirstUppercase } from '$lib/utilities/utils.js';
	import { transformDatasetData } from '$lib/components/charts/utils/transformations';
	import LongTitleHide from '$lib/components/LongTitleHide.svelte';

	export let data;
	const yAxisKeys = ['averagePrice', 'highestPrice', 'listingCount'];
	let yAxisSelected = 'averagePrice';

	const topTotalEventAggs = data.totalEventTypeAggs.slice(0, 4);
	let kpiDatasets = topTotalEventAggs.map((totalAgg) => ({
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

	//TODO:
	//Watchlist page needs improvement - add a "dashboard"
	//Watchlist actions - put back into watchlist, shouldn't reload in build
	//Upcoming pages needs improvement - - add a "dashboard"
	//TODO:
	//Replace the table on the home page with a bar chart of scores and coloured by their types
	//The listings charts don't really show anything, because they're done by event date - recreate with created_at instead
	//Data warehousing
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
							<option class="capitalize" value={selector}>
								{selector.slice(0, indexOfFirstUppercase(selector))}
							</option>
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
<div class="grid grid-cols-4">
	{#await data.streamed.justAnnouncedByType}
		<div class="card h-36 w-36 animate-pulse" />
	{:then justAnnouncedByType}
		<section class="mt-6">
			{#each justAnnouncedByType.data as newEvent}
				<article class="card p-4">
					<!-- TODO: better to just use a tooltip -->
					<LongTitleHide title={newEvent.title} dbId={newEvent.id} eventId={newEvent.eventId} />
					<p class="capitalize m-2">{newEvent.eventType}</p>
				</article>
			{/each}
		</section>
	{:catch err}
		<p>{err}</p>
	{/await}
</div>
