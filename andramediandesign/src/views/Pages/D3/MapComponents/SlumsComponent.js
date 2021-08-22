
const slumsComponent = (slums, generatedGroups, yearLableInc) => {
  const yearsSlums = generatedGroups.yearsSlums;
  const lableSlums = generatedGroups.lableSlums;

  const slumsData = slums.data.map((data) => {
    return { year: data.year, value: data.number };
  });
  lableSlums.attr("transform", "translate(100,20)");
  yearsSlums.attr("transform", "translate(150,20)");
  yearsSlums
    .selectAll("rect")
    .data(slumsData)
    .enter()
    .append("rect")
    .attr("transform", function (d, i) {
      return "translate(" + i * yearLableInc + "," + 10 + ")";
    })
    .attr("width", 2)
    .attr("height", 0)
    .style("fill", "#7a9193");

  yearsSlums
    .selectAll("text")
    .data(slumsData)
    .enter()
    .append("text")
    .attr("transform", function (d, i) {
      return "translate(" + (i * yearLableInc + 30) + "," + 60 + ")";
    })
    .text(function (d) {
      return "% " + d.value;
    })
    .style("text-anchor", "middle")
    .style("opacity", 0)
    .style("fill", "#9C3C41")
    .style("font-size", "8pt");

  lableSlums
    .append("text")
    .attr("transform", "translate(-100,60)")
    .text("Slums Population")
    .style("fill", "#9C3C41")
    .style("font-size", "8pt");
};

export default slumsComponent;
