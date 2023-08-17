<script lang="ts">
	import type { TMonthlyAggType, TTotalAggType } from '$lib/types/MonthlyEventAggs';
	import LineChart from './charts/LineChart.svelte';
	export let chartData: TMonthlyAggType[];
	export let axisKeys: { x: keyof TMonthlyAggType; y: keyof TMonthlyAggType };
	export let aggData: TTotalAggType;
	export let titleAccessor: keyof TTotalAggType;
	export let kpiAccessor: keyof TTotalAggType;
</script>

<div class="card p-4">
	<h4 class="text-lg capitalize">{titleAccessor}</h4>
	<div class="grid grid-cols-3">
		<LineChart groupedEvents={chartData} {axisKeys} />
		<h3
			class="text-2xl col-start-3 justify-self-end {aggData.totalListingCount > 0
				? 'text-success-500'
				: 'text-error-500'}"
		>
			{new Intl.NumberFormat().format(aggData[kpiAccessor])}
		</h3>
	</div>
</div>
