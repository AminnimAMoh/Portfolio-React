import * as d3 from "d3";

export const findMinMax = (data) => {
  const firstMin = d3.min(data);
  const firstMax = d3.max(data);
  return [firstMin, firstMax];
};

export const onClickTextFunction = (d, yearsContainer) => {
  yearsContainer
    .selectAll("text")
    .attr("font-size", 12)
    .style("fill", "white")
    .style("font-family", "imported-Azo");

  d3.select(d)
    .attr("font-size", 24)
    .style("fill", "#9C3C41")
    .style("font-family", "imported-Azo-Bold");
};

export const slumScale = (data,slums) => {
  const scale=d3.scaleLinear()
    .domain([slums.data[0].min, slums.data[0].max])
    .range([20, 100]);
  return scale(data)
};
