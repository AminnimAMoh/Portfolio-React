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

  d3.select(d)
    .attr("font-size", 24)
    .style("fill", "#9C3C41")
};

export const slumScale = (data,slums) => {
  const scale=d3.scaleLinear()
    .domain([slums.data[0].min, slums.data[0].max])
    .range([20, 100]);
  return scale(data)
};

export const geoLocations=(data)=>{
  const projection = d3.geoMercator().scale(5200).translate([-7720, 2600]);

  const geoGenerator = d3.geoPath().projection(projection);

  return geoGenerator(data)
}

export const citiesProjection=(data)=>{
  const projectionTest = d3
    .geoEquirectangular()
    .scale(5100)
    .translate([-7565, 2478]);
    return projectionTest(data)
}

export const angleScale=(data)=>{
  const angleScale = d3
  .scaleLinear()
  .domain([0, 4])
  .range([0, Math.PI * 2]);
  return angleScale(data)
}