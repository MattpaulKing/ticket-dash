<script lang="ts">
	import { formatNumber } from '$lib/utilities/utils';
	import { onDestroy } from 'svelte';
	import LineChart from './charts/LineChart.svelte';
	//TODO: fix types
	//TODO: redo in svelte-chartjs
	export let chartData;
	export let axisKeys;
	export let aggData;
	export let titleAccessor;
	export let kpiAccessor;
</script>

<div class="card p-4">
	<div class="flex justify-between place-items-center">
		<h4 class="text-lg capitalize overflow-hidden whitespace-nowrap">
			{aggData[titleAccessor].replaceAll('_', ' ')}
		</h4>
		<a href="/eventType/{aggData[titleAccessor]}">
			<button class="btn btn-sm variant-ringed-surface hover:variant-soft-surface transition-colors"
				>Details</button
			>
		</a>
	</div>
	<div class="grid grid-cols-3">
		<div class="flex col-start-1 col-span-3 place-items-baseline">
			<p class="mr-2">Listings:</p>
			<h3
				class="text-xl col-start-3 justify-self-end {aggData[kpiAccessor] > 0
					? 'text-success-500'
					: 'text-error-500'}"
			>
				{formatNumber(aggData[kpiAccessor])}
			</h3>
		</div>
		<LineChart groupedEvents={chartData} {axisKeys} />
	</div>
</div>
