export const cardLineChartOptions = {
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
				max: new Date().toISOString()
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
        containerId: 'legend-container'
      },
			legend: {
				display: false
			}
		}
};
