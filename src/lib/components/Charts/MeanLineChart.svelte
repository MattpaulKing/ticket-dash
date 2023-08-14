<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart } from 'chart.js/auto';
	import 'chartjs-adapter-date-fns';
	import addMonths from 'date-fns/addMonths';
	import type { GroupedEvent } from '$lib/types/GroupedEvent';
	export let groupedEvents: GroupedEvent[][];
	export let axisKeys: { x: keyof GroupedEvent; y: keyof GroupedEvent };

	let canvasRef: HTMLCanvasElement;
	const datasets: { label: string; data: { x: string; y: number }[] }[] = [];
	const labels: string[] = [];
	for (let i = 0; i < groupedEvents.length; ++i) {
		let dataset: { x: string; y: number }[] = [];
		for (let j = 0; j < groupedEvents[i].length; ++j) {
			dataset.push({
				x: groupedEvents[i][j][axisKeys.x] as string,
				y: groupedEvents[i][j][axisKeys.y] as number
			});
		}
		datasets.push({
			label: groupedEvents[i][0].eventType.replaceAll('_', ' '),
			data: dataset
		});
		labels.push(groupedEvents[i][0].eventType.replaceAll('_', ' '));
	}
	const xAxisMax = addMonths(new Date(), 3).toISOString();

	//TODO
	//fix font color
	//add title

	const donutChart = onMount(
		() =>
			new Chart(canvasRef, {
				type: 'line',
				data: {
					// labels: range of Dates,
					datasets: datasets,
					labels: labels
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
								tooltipFormat: 'yyyy-MMM'
							},
							min: new Date().toISOString(),
							max: xAxisMax
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
							display: true,
							position: 'top',
							labels: {
								color: 'white',
								boxWidth: 10
								//filter: (item, data) => (item.index ? item.index < 3 : true),
								//sort: (a, b) => (a.index ? (b.index ? a.index - b.index : 1) : 1)
							}
						}
					}
				},
			})
	);
</script>

<div class="relative min-h-[400px]">
	<canvas bind:this={canvasRef} />
</div>
