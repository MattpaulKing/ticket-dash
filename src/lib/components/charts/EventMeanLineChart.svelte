<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart } from 'chart.js/auto';
	import 'chartjs-adapter-date-fns';
	import { chartDataTransformer } from './utils/chartDataTransformer';
	export let events;
	export let axisKeys;

	let canvasRef: HTMLCanvasElement;
	const dataset = chartDataTransformer(events, axisKeys);
	console.log(events);
	//TODO
	//fix font color
	//add title

	const donutChart = onMount(
		() =>
			new Chart(canvasRef, {
				type: 'line',
				data: {
					// labels: range of Dates,
					datasets: [
						{
							data: dataset
						}
					]
				},
				options: {
					scales: {
						x: {
							display: true,
							type: 'time',
							time: {
								displayFormats: {
									month: 'yyyy-MMM'
								},
								tooltipFormat: 'yyyy-MMM-dd'
							}
						},
						y: {
							display: true
						}
					},
					responsive: true,
					aspectRatio: 2,
					maintainAspectRatio: false,
					plugins: {
						legend: {
							display: false,
							position: 'top',
							labels: {
								color: 'white',
								boxWidth: 10
								//filter: (item, data) => (item.index ? item.index < 3 : true),
								//sort: (a, b) => (a.index ? (b.index ? a.index - b.index : 1) : 1)
							}
						}
					}
				}
			})
	);
</script>

<div class="relative min-h-[400px]">
	<canvas bind:this={canvasRef} />
</div>
