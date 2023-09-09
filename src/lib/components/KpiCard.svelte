<script lang="ts">
	import { formatNumber } from '$lib/utilities/utils';
	import { Line } from 'svelte-chartjs';
	import { options } from '$lib/components/charts/utils/kpiLineChartOptions';
	//TODO: add targets
	export let title = '';
	export let subtitle = '';
	export let indicatorVal = 0;
	export let link = '';
	export let chartData;
</script>

<div class="card p-4">
	<div class="flex justify-between place-items-center">
		<h4 class="text-lg capitalize overflow-hidden whitespace-nowrap">
			{title}
		</h4>
		<a href="/{link}">
			<button class="btn btn-sm variant-ringed-surface hover:variant-soft-surface transition-colors"
				>Details</button
			>
		</a>
	</div>
	<div class="grid grid-cols-3">
		<div class="flex col-start-1 col-span-3 place-items-baseline">
			<p class="mr-2">{subtitle}</p>
			<h3
				class="text-xl col-start-3 justify-self-end {indicatorVal > 0
					? 'text-green-500'
					: 'text-red-500'}"
			>
				{formatNumber(indicatorVal, 1)}
			</h3>
		</div>
		<Line data={chartData} {options} />
	</div>
</div>
