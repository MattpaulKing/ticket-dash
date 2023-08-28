<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart } from 'chart.js/auto';
	import 'chartjs-adapter-date-fns';
	import { htmlLegendPlugin } from '../charts/utils/htmlLegend';
	import type { Tables } from '$lib/types/db.types';

	export let groupedEvents: Tables<'sgEvents'>[][];
	export let axisKeys: { x: keyof Tables<'sgEvents'>; y: keyof Tables<'sgEvents'> };

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

	onMount(
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
							min: new Date().toISOString()
						},
						y: {
							display: true
						}
					},
					responsive: true,
					aspectRatio: 2,
					maintainAspectRatio: false,
					plugins: {
						htmlLegend: {
							containerID: 'legend-container'
						},
						legend: {
							display: false
						}
					}
				},
				plugins: [htmlLegendPlugin]
			})
	);
</script>

<div class="relative min-h-[350px]">
	<canvas bind:this={canvasRef} />
</div>
