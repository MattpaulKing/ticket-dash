import type { Tables } from "$lib/types/db.types"
import type { ChartData } from "chart.js";
export const totalAggregate = (records: Partial<Tables<"sgEventsUpcoming"> | ChartData<'line'>>[]) => {
  return records.reduce(
			(res, currRecord, idx, { length }) => {
				if (idx === length - 1) {
					return {
						averagePrice: (res.averagePrice + currRecord.averagePrice) / length,
						eventScore: (res.eventScore + currRecord.eventScore) / length,
						eventPopularity: (res.eventPopularity + currRecord.eventPopularity) / length,
						highestPrice: (res.highestPrice + currRecord.highestPrice) / length
					};
				} else {
					return {
						averagePrice: res.averagePrice + currRecord.averagePrice,
						eventScore: res.eventScore + currRecord.eventScore,
						eventPopularity: res.eventPopularity + currRecord.eventPopularity,
						highestPrice: res.highestPrice + currRecord.highestPrice
					};
				}
			},
			{ averagePrice: 0, eventScore: 0, eventPopularity: 0, highestPrice: 0 }
		);
	}
