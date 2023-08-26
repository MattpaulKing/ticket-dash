<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart } from 'chart.js/auto';
	import 'chartjs-adapter-date-fns';
	import type { TMonthlyAggType } from '$lib/types/MonthlyEventAggs';
	export let groupedEvents: TMonthlyAggType[];
	export let axisKeys: { x: keyof TMonthlyAggType; y: keyof TMonthlyAggType };
	let canvasRef: HTMLCanvasElement;

	const chartPoints = groupedEvents.map((agg) => ({
		x: agg[axisKeys.x] as string,
		y: agg[axisKeys.y],
		label: agg.eventType
	}));

	const donutChart = onMount(
		() =>
			new Chart(canvasRef, {
				type: 'line',
				data: {
					// labels: range of Dates,
					datasets: [
						{
							// need to split out each genre into its own dataset
							data: chartPoints
						}
					]
				},
				options: {
					scales: {
						x: {
							display: false,
							type: 'time',
							time: {
								unit: 'month'
							},
							min: new Date().toISOString()
						},
						y: {
							display: false
						}
					},
					maintainAspectRatio: true,
					aspectRatio: 2,
					plugins: {
						legend: {
							display: false,
							position: 'left',
							labels: {
								boxWidth: 10,
								filter: (item, data) => (item.index ? item.index < 3 : true),
								sort: (a, b) => (a.index ? (b.index ? a.index - b.index : 1) : 1)
							}
						}
					}
				}
			})
	);
</script>

<canvas bind:this={canvasRef} />
