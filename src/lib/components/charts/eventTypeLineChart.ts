import { htmlLegendPlugin } from "$lib/components/charts/utils/htmlLegend"

export const options = {
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
				max: new Date()
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
	};
	export const plugins = [htmlLegendPlugin];
