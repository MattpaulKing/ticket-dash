<script lang="ts">
	import { camel2title, formatNumber } from '$lib/utilities/utils';
	import { Line } from 'svelte-chartjs';
	import { options } from '$lib/components/charts/utils/kpiLineChartOptions';
	import type { Tables } from '$lib/types/db.types';
	import type { Point } from 'chart.js';
	type KeysMatching<T, V> = { [K in keyof T]-?: T[K] extends V ? K : never }[keyof T];
	type TableKeys = KeysMatching<Tables<'sgEvents'>, number | undefined | null>;
	export let aggOptions: TableKeys[];
	export let totalValues: Partial<Tables<'sgEvents'>>;
	export let datasets: { data: Point[] }[][];
</script>

<div class="col-span-2 grid grid-rows-2 grid-cols-2 gap-6 h-full">
	{#each aggOptions as agg, i}
		<!-- Filter Options go as a key here -->
		<div class="card p-4">
			<div class="flex justify-between place-items-center">
				<h4 class="text-lg capitalize overflow-hidden whitespace-nowrap">
					{camel2title(agg)}
				</h4>
				<a href="/eventType/">
					<button
						class="btn btn-sm variant-ringed-surface hover:variant-soft-surface transition-colors"
						>Details</button
					>
				</a>
			</div>
			<div class="grid grid-cols-3">
				<div class="flex col-start-1 col-span-3 place-items-baseline">
					{#if totalValues[agg]}
						<p class="mr-2">{camel2title(agg)}:</p>
						<h3
							class="text-xl col-start-3 justify-self-end {totalValues[agg] > 0
								? 'text-success-500'
								: 'text-error-500'}"
						>
							{formatNumber(totalValues[agg])}
						</h3>
					{:else}
						<p class="mr-2">Unable to find agg</p>
					{/if}
				</div>
				<Line data={{ datasets: datasets[i] }} {options} />
			</div>
		</div>
	{/each}
</div>
