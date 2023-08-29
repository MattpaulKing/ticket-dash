<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, type ChartComponent } from 'chart.js/auto';
	import 'chartjs-adapter-date-fns';
	import { filterStore } from '../Filters/filterStore';
	import { onDestroy } from 'svelte';
	export let groupedEvents;
	export let axisKeys;
	let canvasRef: HTMLCanvasElement;

	let chartPoints = groupedEvents.map((agg) => ({
		x: agg[axisKeys.x] as string,
		y: agg[axisKeys.y],
		label: agg.eventType
	}));

	const id = chartPoints[0].label.concat(`-${Math.random()}`);

	$: {
		if ($filterStore.eventType?.value) {
			chartPoints = groupedEvents
				.filter((agg) => $filterStore.eventType?.value.includes(agg.eventType))
				.map((agg) => ({
					x: agg[axisKeys.x],
					y: agg[axisKeys.y],
					label: agg.eventType
				}));
		}
	}

	let chart;

	onMount(() => {
		chart = new Chart(canvasRef, {
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
						display: false
						/*
						position: 'left',
						labels: {
							boxWidth: 10,
							filter: (item) => (item.index ? item.index < 3 : true),
							sort: (a, b) => (a.index ? (b.index ? a.index - b.index : 1) : 1)
						}
             */
					},
					decimation: {
						enabled: true,
						algorithm: 'lttb'
					}
				}
			}
		}).update();
	});
</script>

<canvas id="line-chart-{id}" bind:this={canvasRef} />
