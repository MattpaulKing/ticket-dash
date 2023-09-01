import type { ChartConfiguration, DefaultDataPoint } from 'chart.js';

export const options: ChartConfiguration<'line', DefaultDataPoint<'line'>, unknown>['options'] = {
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
