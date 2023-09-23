import type { DbAxisKeys, Tables } from "$lib/types/db.types";

export const chartDataTransformer = (
  events: Tables<"sgEventsUpcoming">[],
  axisKeys: DbAxisKeys
) => {
    const data = events.map( (event: Tables<"sgEventsUpcoming">) => ({
        x: event[axisKeys.x],
        y: event[axisKeys.y]
    }))
    return data
}
