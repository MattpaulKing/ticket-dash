export const chartDataTransformer = (events: [], axisKeys: {x: string, y: string}) => {
    const dataset: {x: Date | string; y: number}[] = events.map( (event) => ({
        x: event[axisKeys.x],
        y: event[axisKeys.y]
    }))
    return dataset
}
