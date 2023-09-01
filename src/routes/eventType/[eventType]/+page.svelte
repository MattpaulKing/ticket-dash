<script lang="ts">
	import { formatNumber, camel2title } from '$lib/utilities/utils.js';
	import { page } from '$app/stores';
	import { Line } from 'svelte-chartjs';
	import 'chartjs-adapter-date-fns';
	import {
		Chart as ChartJS,
		Title,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale,
		TimeScale,
		type ChartConfiguration,
		type DefaultDataPoint
	} from 'chart.js';
	import type { AnyObject } from 'chart.js/dist/types/basic.js';
	export let data;

	ChartJS.register(Title, Legend, LineElement, LinearScale, PointElement, CategoryScale, TimeScale);

	type AxisAccessors = {
		x: string;
		y: string;
	};

	function transformDatasetData(data: any[], axisKeys: AxisAccessors) {
		return data.map((record) => ({
			x: record[axisKeys.x],
			y: record[axisKeys.y]
		}));
	}

	const aggOptions = ['averagePrice', 'highestPrice', 'eventScore', 'eventPopularity'];
	const datasetData = [];
	for (let i = 0; i < aggOptions.length; ++i) {
		datasetData.push({
			//label: camel2title(aggOptions[i]),
			data: transformDatasetData(data.eventTypeAggs, { x: 'created_at', y: aggOptions[i] })
		});
	}

	const options: ChartConfiguration<'line', DefaultDataPoint<'line'>, unknown>['options'] = {
		scales: {
			x: {
				display: false,
				type: 'time',
				time: {
					unit: 'month',
					displayFormats: {
						month: 'yyyy-MMM'
					},
					tooltipFormat: 'yyyy-MMM'
				}
			},
			y: {
				display: false
			}
		},
		plugins: {
			legend: {
				display: false
			}
		}
	};
</script>

<div>
	<h1 class="h1">{$page.params.eventType}</h1>
	<div
		class="container grid grid-cols-5 grid-rows-1 mt-8 gap-6 h-full w-full mx-auto justify-center items-center"
	>
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
							<p class="mr-2">Listings:</p>
							<h3
								class="text-xl col-start-3 justify-self-end {data.eventTypeTotalAggs[0][agg] > 0
									? 'text-success-500'
									: 'text-error-500'}"
							>
								{formatNumber(data.eventTypeTotalAggs[0][agg])}
							</h3>
						</div>
						<Line data={{ datasets: [datasetData[i]] }} {options} />
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
