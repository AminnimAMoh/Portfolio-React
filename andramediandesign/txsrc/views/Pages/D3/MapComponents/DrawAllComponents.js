const DrawAll = (
  d3,
  annualrain,
  year,
  yearSelected,
  firstMin,
  firstMax,
  generatedGroups
) => {
  const cityCircles = generatedGroups.cityCircles;
  const legendGraph = generatedGroups.legendGraph;

  const annualRainData = annualrain.data;

  const dataSet = annualRainData.map((properties) => {
    return +properties[`Sum${year}`];
  });

  yearSelected=year;

  // let circleTransition = d3.transition().ease(d3.easeExp).duration(1000);

  firstMin = d3.min(dataSet);
  firstMax = d3.max(dataSet);

  const radScale = d3.scaleLinear().domain([firstMin, firstMax]).range([4, 24]);

  let selectContainerCircles = cityCircles.selectAll("circle").data(dataSet);

  selectContainerCircles.exit().remove();

  selectContainerCircles.enter().append("circle").attr("r", 0);

  selectContainerCircles
    .select("circle")
    .data(dataSet)
    .enter()
    .selectAll("circle")
    .attr("class", "cities-circles")
    .transition()
    .duration(500)
    .attr("r", function (d) {
      return radScale(d);
    });

  let managedArray = [];
  let sortedData = dataSet.sort(d3.descending);
  managedArray.push(sortedData[0]);
  managedArray.push(sortedData[sortedData.length / 2]);
  managedArray.push(sortedData[sortedData.length - 1]);

  const legendGraphLines = legendGraph.selectAll("line").data(managedArray);
  legendGraphLines.exit().remove();

  const legendGraphCircle = legendGraph.selectAll("circle").data(managedArray);
  legendGraphCircle.exit().remove();

  const legendGraphText = legendGraph.selectAll("text").data(managedArray);
  legendGraphText.exit().remove();

  legendGraphCircle
    .select("circle")
    .data(managedArray)
    .enter()
    .selectAll("circle")
    .transition()
    .duration(500)
    .attr("transform", function (d, i) {
      return "translate(0," + -radScale(d) + ")";
    })
    .attr("r", function (d) {
      return radScale(d);
    });

  legendGraphLines
    .select("line")
    .data(managedArray)
    .enter()
    .selectAll("line")
    .transition()
    .duration(500)
    .attr("transform", function (d, i) {
      return "translate(0," + -radScale(d) * 2 + ")";
    });

  legendGraphText
    .select("text")
    .data(managedArray)
    .enter()
    .selectAll("text")
    .attr("transform", function (d, i) {
      return "translate(" + (i * 50 + 52) + "," + (-radScale(d) * 2 - 3) + ")";
    })
    .text((d) => {
      return d + "mm";
    })
    .style("font-size", "6pt")
    .style("fill", "white");
};

export default DrawAll;
