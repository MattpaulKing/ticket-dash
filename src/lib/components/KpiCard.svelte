<script lang="ts">
	import type { TMonthlyAggType, TTotalAggType } from '$lib/types/MonthlyEventAggs';
	import { filterStore } from './Filters/filterStore';
	import LineChart from './charts/LineChart.svelte';
	import { setContext } from 'svelte';
	export let chartData: TMonthlyAggType[];
	export let axisKeys: { x: keyof TMonthlyAggType; y: keyof TMonthlyAggType };
	export let aggData: TTotalAggType;
	export let titleAccessor: 'eventType';
	export let kpiAccessor: keyof TTotalAggType;

	setContext('chartContext', {
		data: chartData
	});
</script>

<div class="card p-4">
	<h4 class="text-lg capitalize overflow-hidden whitespace-nowrap">
		{aggData[titleAccessor].replaceAll('_', ' ')}
	</h4>
	<div class="grid grid-cols-3">
		<div class="flex col-start-1 col-span-3 place-items-baseline">
			<p class="mr-2">Listings:</p>
			<h3
				class="text-xl col-start-3 justify-self-end {aggData[kpiAccessor] > 0
					? 'text-success-500'
					: 'text-error-500'}"
			>
				{new Intl.NumberFormat().format(aggData[kpiAccessor])}
			</h3>
		</div>
		<LineChart groupedEvents={chartData} {axisKeys} />
	</div>
</div>
