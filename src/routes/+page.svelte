<script lang="ts">
	import MeanLineChart from '$lib/components/Charts/MeanLineChart.svelte';
	import EventTable from '$lib/components/EventTable.svelte';
	import { filterStore } from '$lib/components/Filters/filterStore';
	import KpiCard from '$lib/components/KpiCard.svelte';
	import { indexOfFirstUppercase } from '$lib/utilities/utils.js';
	export let data;

	const totalEventAggs = data.totalEventTypeAggs;
	const topTotalEventAggs = totalEventAggs.slice(0, 4);

	const yAxisKeys = ['meanPrice', 'maxPrice', 'listingCountSum'];
	let yAxisSelected = 'meanPrice';

	$: console.log($filterStore);
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
						chartData={data.monthlyEventAggs.filter(
							(monthAgg) => monthAgg.eventType === agg.eventType
						)}
						axisKeys={{ x: 'calendarMonth', y: 'listingCountSum' }}
						aggData={agg}
						titleAccessor={'eventType'}
						kpiAccessor={'totalListingCount'}
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
			{#key yAxisSelected}
				<MeanLineChart
					groupedEvents={data.splitMonthlyEventAggs}
					axisKeys={{ x: 'calendarMonth', y: yAxisSelected }}
				/>
			{/key}
		</div>
	</div>
	<div class="col-span-5 mt-6">
		{#await data.streamed.events}
			loading...
		{:then events}
			<div class="mt-4">
				<EventTable events={events.data} />
			</div>
		{/await}
	</div>
</div>
