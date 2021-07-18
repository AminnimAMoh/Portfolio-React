import * as d3 from 'd3'

export const findMinMax = (data) => {
    const firstMin = d3.min(data);
    const firstMax = d3.max(data);
    return [firstMin, firstMax];
}