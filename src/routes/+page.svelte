<script lang="ts">
	import LineChart from '$lib/components/charts/LineChart.svelte';
	import MeanLineChart from '$lib/components/Charts/MeanLineChart.svelte';
	import type { GroupedEvent } from '$lib/types/GroupedEvent.js';
	import EventTable from '$lib/components/EventTable.svelte';
	export let data;
	const monthlyEventAggs = data.monthlyEventTypeAggs;
	const totalEventAggs = data.totalEventTypeAggs;
	const topTotalEventAggs = totalEventAggs.slice(0, 4);
	let splitMonthlyEventAggs: GroupedEvent[][] = [];
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
		<div class="col-span-2 grid grid-rows-2 grid-cols-2 gap-6">
			<!-- Price diff from yesterday -->
			{#each topTotalEventAggs as agg}
				<div class="card p-4">
					<h4 class="text-lg capitalize">{agg.eventType.replaceAll('_', ' ')}</h4>
					<div class="grid grid-cols-3">
						<LineChart
							groupedEvents={monthlyEventAggs.filter(
								(monthAgg) => monthAgg.eventType === agg.eventType
							)}
							axisKeys={{ x: 'calendarMonth', y: 'listingCountSum' }}
						/>
						<h3
							class="text-2xl col-start-3 justify-self-end {agg.totalListingCount > 0
								? 'text-success-500'
								: 'text-error-500'}"
						>
							{new Intl.NumberFormat().format(agg.totalListingCount)}
						</h3>
					</div>
				</div>
			{/each}
		</div>
		<div class="col-span-3 card p-4 h-full">
            <h3>Average Price by Event Date</h3>
			<MeanLineChart
				groupedEvents={splitMonthlyEventAggs}
				axisKeys={{ x: 'calendarMonth', y: 'meanPrice' }}
			/>
		</div>
	</div>
	<div class="col-span-5">
		{#await data.streamed.events}
			<div class="bg-red-400 h-40 w-40" />
		{:then events}
			<div class="mt-4">
				<EventTable events={events.data} />
			</div>
		{/await}
	</div>
</div>
