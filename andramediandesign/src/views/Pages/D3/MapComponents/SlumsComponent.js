import * as d3 from "d3";

const slumsComponent = (slums,yearsSluems,lableSluems,yearLableInc) => {
  let slumMin = 55.1;
  let slumMax = 87.3;

  const slumsData = slums.data.map((data) => {
    return { year: data.year, value: data.number };
  });
  lableSluems.attr("transform", "translate(100,20)");
  yearsSluems.attr("transform", "translate(150,20)");
  yearsSluems
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

  yearsSluems
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

  lableSluems
    .append("text")
    .attr("transform", "translate(-100,60)")
    .text("Slums Population")
    .style("fill", "#9C3C41")
    .style("font-size", "8pt");
};

export default slumsComponent;
