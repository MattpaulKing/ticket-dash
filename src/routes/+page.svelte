<script lang="ts">
	import MeanLineChart from '$lib/components/Charts/MeanLineChart.svelte';
	import EventTable from '$lib/components/EventTable.svelte';
	import KpiCard from '$lib/components/KpiCard.svelte';
	import type { TMonthlyAggType } from '$lib/types/MonthlyEventAggs.js';
	export let data;
	const totalEventAggs = data.totalEventTypeAggs;
	const topTotalEventAggs = totalEventAggs.slice(0, 4);
	let splitMonthlyEventAggs: TMonthlyAggType[][] = [];
	const monthlyEventAggs = data.monthlyEventTypeAggs;

	for (let i = 0; i < topTotalEventAggs.length; ++i) {
		splitMonthlyEventAggs.push(
			monthlyEventAggs.filter((agg) => agg.eventType === topTotalEventAggs[i].eventType)
		);
	}
	//TODO make the grid cards responsive
</script>

<div>
	<h1 class="h1">Event Types</h1>
	<div
		class="container grid grid-cols-5 grid-rows-1 mt-8 gap-6 h-full w-full mx-auto justify-center items-center"
	>
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
