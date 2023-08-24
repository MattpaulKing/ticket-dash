<script lang="ts">
	import MeanLineChart from '$lib/components/Charts/MeanLineChart.svelte';
	import EventTable from '$lib/components/EventTable.svelte';
	import KpiCard from '$lib/components/KpiCard.svelte';
	import type { TMonthlyAggType } from '$lib/types/MonthlyEventAggs.js';

	export let data;

	const totalEventAggs = data.totalEventTypeAggs;
	const topTotalEventAggs = totalEventAggs.slice(0, 4);
	let splitMonthlyEventAggs: TMonthlyAggType[][] = [];

	const monthlyEventTypeAggs = getMonthlyEventTypeAggs();

	//TODO
	// put this function on the server
	async function getMonthlyEventTypeAggs() {
		const { data: monthlyEventAggs, error } = await data.streamed.monthlyEventTypeAggs;
		for (let i = 0; i < topTotalEventAggs.length; ++i) {
			splitMonthlyEventAggs.push(
				monthlyEventAggs.filter((agg) => agg.eventType === topTotalEventAggs[i].eventType)
			);
		}
		if (error) {
			error(500, 'Error fetching monthly events');
		}
		return monthlyEventAggs;
	}

	//TODO
	//make the grid cards responsive
	//add skeleton loading state
</script>

<div>
	<h1 class="h1">Event Types</h1>
	<div
		class="container grid grid-cols-5 grid-rows-1 mt-8 gap-6 h-full w-full mx-auto justify-center items-center"
	>
		{#await monthlyEventTypeAggs}
			<div class="col-span-2 grid grid-rows-2 grid-cols-2 gap-6 h-full">
				{#each { length: 4 } as card}
					<div class="card placeholder rounded-container-token animate-pulse h-52 w-72" />
				{/each}
			</div>
			<div class="placeholder card rounded-container-token col-span-3 card p-4 h-[457px] w-[912px]">
				<h3 class="ml-3 text-xl">Average Price by Event Date</h3>
			</div>
		{:then monthlyEventAggs}
			<div class="col-span-2 grid grid-rows-2 grid-cols-2 gap-6 h-full">
				{#each topTotalEventAggs as agg}
					<KpiCard
						chartData={monthlyEventAggs.filter((monthAgg) => monthAgg.eventType === agg.eventType)}
						axisKeys={{ x: 'calendarMonth', y: 'listingCountSum' }}
						aggData={agg}
						titleAccessor={'eventType'}
						kpiAccessor={'totalListingCount'}
					/>
				{/each}
			</div>
			<div class="col-span-3 card p-4 h-full">
				<h3 class="ml-3 text-xl">Average Price by Event Date</h3>
				<div id="legend-container" />
				<MeanLineChart
					groupedEvents={splitMonthlyEventAggs}
					axisKeys={{ x: 'calendarMonth', y: 'meanPrice' }}
				/>
			</div>
		{:catch error}
			{error}
		{/await}
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
