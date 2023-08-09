<script lang="ts">
	import { tidy, groupBy, summarize, mean, max, sliceMax, sum } from '@tidyjs/tidy';
	import LineChart from '$lib/components/charts/LineChart.svelte';
	import MeanLineChart from '$lib/components/Charts/MeanLineChart.svelte';
	import type { GroupedEvent } from '$lib/types/GroupedEvent.js';

	export let data;
	const monthlyEventAggs = data.monthlyEventTypeAggs;
	const totalEventAggs = data.totalEventTypeAggs;
	const topTotalEventAggs = totalEventAggs.slice(0, 4);
	let splitMonthlyEventAggs: [GroupedEvent[]] = [];
	for (let i = 0; i < topTotalEventAggs.length; ++i) {
		splitMonthlyEventAggs.push(
			monthlyEventAggs.filter((agg) => agg.eventType === topTotalEventAggs[i].eventType)
		);
	}
</script>

<div>
	<h1 class="h1">Event Types</h1>
	<div
		class="container grid grid-cols-5 mt-8 gap-6 h-full w-full mx-auto justify-center items-center"
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
		<div class="col-span-3 border border-red-500 h-full w-full">
			<MeanLineChart
				groupedEvents={splitMonthlyEventAggs}
				axisKeys={{ x: 'calendarMonth', y: 'meanPrice' }}
			/>
		</div>
	</div>
</div>
