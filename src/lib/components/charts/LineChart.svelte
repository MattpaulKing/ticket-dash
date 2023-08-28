<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart } from 'chart.js/auto';
	import 'chartjs-adapter-date-fns';
	import { filterStore } from '../Filters/filterStore';
	export let groupedEvents;
	export let axisKeys;
	let canvasRef: HTMLCanvasElement;

	let chartPoints = groupedEvents.map((agg) => ({
		x: agg[axisKeys.x] as string,
		y: agg[axisKeys.y],
		label: agg.eventType
	}));

	$: {
		if ($filterStore.eventType?.value) {
			chartPoints = groupedEvents
				.filter((agg) => $filterStore.eventType?.value.includes(agg.eventType))
				.map((agg) => ({
					x: agg[axisKeys.x] as string,
					y: agg[axisKeys.y],
					label: agg.eventType
				}));
		}
	}

	onMount(
		() =>
			new Chart(canvasRef, {
				type: 'line',
				data: {
					datasets: [
						{
							data: chartPoints
						}
					]
				},
				options: {
					scales: {
						x: {
							display: true,
							type: 'time',
							time: {
								unit: 'month'
							},
							min: new Date().toISOString()
						},
						y: {
							display: true
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
								filter: (item) => (item.index ? item.index < 3 : true),
								sort: (a, b) => (a.index ? (b.index ? a.index - b.index : 1) : 1)
							}
						}
					}
				}
			})
	);
</script>

<canvas bind:this={canvasRef} />
