import { staticState } from "../data/staticVariables";
import { angleScale } from "../utilities";
import PopulationCircles from "../MapComponents/PopulationCircles";
import RadarChartEngin from '../ExternalResource/RadarChart'

const stationsClick = (
  population,
  months,
  yearSelected,
  generatedGroups,
  d3,
  mapXOffSet,
  selected
) => {
  const cityLables = generatedGroups.cityLables;
  const ellipseContainer = generatedGroups.ellipseContainer;
  const groupOne = generatedGroups.groupOne;
  const groupTwo = generatedGroups.groupTwo;
  const groupThree = generatedGroups.groupThree;
  const lables = generatedGroups.lables;
  const rainGroup = generatedGroups.rainGroup;

  const graphRad = 120;
  const coords = [
    selected.transform.animVal[0].matrix.e,
    selected.transform.animVal[0].matrix.f,
  ];
  let nameOfCity = selected.id;

  cityLables.selectAll("text").remove();

  d3.selectAll("circle").classed("clicked", false);
  d3.select(selected).classed("clicked", true);

  let circleTransition = d3.transition().ease(d3.easePoly).duration(1000);

  d3.transition().ease(d3.easePoly).duration(1000);

  let ellipses = ellipseContainer
    .selectAll("ellipse")
    .data(staticState.ellipsesLength);
  ellipses.exit().remove();

  ellipses
    .select("ellipse")
    .data(staticState.ellipsesLength)
    .enter()
    .append("ellipse")
    .attr("class", "ellipseCan")
    .attr("cx", function (d, i) {
      return coords[0] + graphRad * Math.cos(angleScale(i));
    })
    .attr("cy", function (d, i) {
      return coords[1] + graphRad * Math.sin(angleScale(i));
    })
    .transition(circleTransition)
    .attr("rx", function (d) {
      return d.size;
    })
    .attr("ry", function (d) {
      return d.size;
    })
    .attr("fill", "#061621")
    .style("stroke", function (d) {
      if (d.f === "none") {
        return d.s;
      } else {
        return "url(#Gradient)";
      }
    })
    .style("stroke-width", "1.5px")
    .style("filter", "url(#graph-drop-shadow)");

  cityLables
    .selectAll("text")
    .data(staticState.ellipsesLength)
    .enter()
    .append("text")
    .attr("x", function (d, i) {
      return coords[0] + graphRad * Math.cos(angleScale(i));
    })
    .attr("y", function (d, i) {
      return coords[1] + graphRad * Math.sin(angleScale(i)) - 20;
    })
    .text(function (d, i) {
      if (i <= 2) {
        return nameOfCity;
      }
    })
    .attr("text-anchor", "middle")
    .style("fill", "#9c3c41")
    .style("font-size", "8pt");

  d3.scaleLinear().domain([0, 63]).range([70, 0]);

  PopulationCircles(
    population,
    groupOne,
    groupTwo,
    groupThree,
    mapXOffSet,
    coords,
    graphRad,
    lables,
    d3,
    nameOfCity,
    angleScale,
    staticState.rectsLength
  );

  let rainGroupTx =
    mapXOffSet + coords[0] + graphRad * Math.cos(angleScale(3)) - 125;
  let rainGroupTy = coords[1] + graphRad * Math.sin(angleScale(3)) - 125;

  rainGroup
    .attr("transform", "translate(" + rainGroupTx + "," + rainGroupTy + ")")
    .style("opacity", 1);

  let margin = {
      top: 50,
      right: 80,
      bottom: 50,
      left: 80,
    };
    // width = Math.min(700, window.innerWidth / 4) - margin.left - margin.right;
    // height = Math.min(width, window.innerHeight - margin.top - margin.bottom);

  let thisCityRain = {
    color: "#cd1d27",
    name: nameOfCity,
    axes: [{}],
  };
  months.data.map((d, i) => {
    d.Station === nameOfCity &&
      thisCityRain.axes.push({
        value: +d[`MonthlyTotal${yearSelected}`],
        axis: staticState.rainMonthsName[i % 12].name,
      });
      return null;
  });
  thisCityRain.axes.splice(0, 1);
  const radarChartOptions = {
    w: 90,
    h: 150,
    margin: margin,
    levels: 2,
    roundStrokes: false,
    color: d3.scaleOrdinal().range(["#9C3C41", "#12393D", "#9C3C41"]),
    format: '.1f'
  };
  RadarChartEngin(".rainG", thisCityRain, radarChartOptions);
};

export default stationsClick;
