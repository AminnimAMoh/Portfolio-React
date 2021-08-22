const removeEllipses = (
  d3,
  container,
  generatedGroups
) => {
  const ellipseContainer = generatedGroups.ellipseContainer;
  const groupOne = generatedGroups.groupOne;
  const groupTwo = generatedGroups.groupTwo;
  const groupThree = generatedGroups.groupThree;
  const lables = generatedGroups.lables;
  const cityCircles = generatedGroups.cityCircles;
  const cityLables = generatedGroups.cityLables;

  cityLables.selectAll("text").remove();
  let ellipseG = ellipseContainer.selectAll("ellipse");
  ellipseG.transition().duration(500).attr("rx", 0).attr("ry", 0);

  let pathOne = groupOne.selectAll("path");
  pathOne
    .transition()
    .ease(d3.easePoly)
    .duration(1000)
    .attrTween("d", arcTweenClose)
    .style("opacity", 0);

  pathOne = groupTwo.selectAll("path");
  pathOne
    .transition()
    .ease(d3.easePoly)
    .duration(1000)
    .attrTween("d", arcTweenClose)
    .style("opacity", 0);

  pathOne = groupThree.selectAll("path");
  pathOne
    .transition()
    .ease(d3.easePoly)
    .duration(1000)
    .attrTween("d", arcTweenClose)
    .style("opacity", 0);

  container
    .select(".rainG")
    .transition()
    .duration(500)
    .style("opacity", 0);

  lables
    .selectAll("text")
    .transition()
    .duration(500)
    .style("opacity", 0);

  cityCircles
    .selectAll("circle")
    .classed("clicked", false);

  function arcTweenClose(d) {
    let i = d3.interpolateNumber(70, 0);
    return function (t) {
      let r = i(t),
        arc = d3
          .arc()
          .outerRadius(r - 2)
          .innerRadius(r);
      return arc(d);
    };
  }
};

export default removeEllipses;
