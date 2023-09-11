import 'chartjs-adapter-date-fns';

export const eventTypeLineChartOptions = {
		scales: {
			x: {
				display: true,
				type: 'timeseries',
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
        containerID: 'legend-container'
      },
			legend: {
				display: false
			}
		}
};

