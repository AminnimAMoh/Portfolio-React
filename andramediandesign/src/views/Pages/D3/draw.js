import * as d3 from "d3";
import Radar from "react-d3-radar";
import style from "./style.css";

import PopulationCircles from "./MapComponents/PopulationCircles";
import removeEllipses from "./MapComponents/RemoveEllipses";
import slumsComponent from './MapComponents/SlumsComponent';
import DrawAll from './MapComponents/DrawAllComponents';
import removeFunction from './MapComponents/RemoveFunction'

import PThreeYears from "./data/PThreeYears.csv";
import MonthFiveYears from "./data/Month-FiveYears.csv";
import url from "./data/GeoJson/bangladesh.geojson";
import slumsTutal from "./data/bangladesh_slums_total (1).csv";
import { selectAll } from "d3-selection";

import { generateGradient, shadowGenerator } from "./styleFunctions";
import { onClickTextFunction, slumScale } from "./utilities";

export const draw = (
  container,
  svgRef,
  annualrain,
  slums,
  population,
  months
) => {
  let containerElement = svgRef.current;
  let containerX = 0;
  let containerY = 0;
  if (containerElement) {
    containerX = containerElement.clientWidth;
    containerY = containerElement.clientHeight;
  }
  let stationName = [];
  let rain2013 = [];
  let stationCord = [];
  let yearLableInc = 80;
  let mapXOffSet = -100;
  let w = containerX;
  let h = containerY;
  let yearSelected = "2013";
  let ellipsesLength = [
    {
      size: 70,
      f: "#E4E5E7",
      s: "none",
    },
    {
      size: 70,
      f: "#E4E5E7",
      s: "none",
    },
    {
      size: 70,
      f: "#E4E5E7",
      s: "none",
    },
    {
      size: 82,
      f: "#E4E5E7",
      s: "none",
    },
    {
      size: 60,
      f: "none",
      s: "black",
    },
    {
      size: 60,
      f: "none",
      s: "black",
    },
    {
      size: 60,
      f: "none",
      s: "black",
    },
    {
      size: 80,
      f: "none",
      s: "none",
    },
  ];
  let populationOne = [];
  let populationTwo = [];
  let populationThree = [];
  let popCityName = [];
  let graphRad = 120;
  let popMinOne, popMinTwo, popMinThree;
  let popMaxOne, popMaxTwo, popMaxThree;
  let rectsLength = [
    {
      x: 183,
      y: 0,
      text: "Cities Population 1991",
    },
    {
      x: 63,
      y: 120,
      text: "Cities Population 2001",
    },
    {
      x: -57,
      y: 0,
      text: "Cities Population 2011",
    },
  ];

  let rainStationName = [];
  let rainMonthsName = [
    {
      name: "Jan",
    },
    {
      name: "Feb",
    },
    {
      name: "Mar",
    },
    {
      name: "Apr",
    },
    {
      name: "May",
    },
    {
      name: "Jun",
    },
    {
      name: "Ju",
    },
    {
      name: "Aug",
    },
    {
      name: "Sep",
    },
    {
      name: "Oct",
    },
    {
      name: "Nov",
    },
    {
      name: "Dec",
    },
  ];
  let yearSelector = [
    {
      name: 1990,
    },
    {
      name: 1995,
    },
    {
      name: 2000,
    },
    {
      name: 2005,
    },
    {
      name: 2010,
    },
    {
      name: 2013,
    },
  ];

  let mouse = function (node) {
    console.log(node.target, node);
  };

  // let container = d3.select("#Script-Container").append("svg");

  let mapContainer = container.append("g").attr("id", "map-container-group");
  let yearsContainer = container.append("g").attr("class", "year-container");
  let yearsSluems = container.append("g").attr("class", "year-slumes");
  let lableSluems = container.append("g").attr("class", "lable-slumes");
  let cityCircles = container.append("g").attr("id", "city-indicators");
  let legendGraph = container.append("g").attr("id", "graph-legend-group");
  let ellipseContainer = container.append("g").attr("id", "ellipse-group");
  let cityLables = container.append("g").attr("id", "city-Lable");
  let groupOne = container.append("g").attr("id", "population-groupOne");
  let groupTwo = container.append("g").attr("id", "population-groupTwo");
  let groupThree = container.append("g").attr("id", "population-groupThree");
  let lables = container.append("g").attr("id", "graph-lables");
  let rainGroup = container.append("g").attr("class", "rainG");

  /*--------------------------------------------------------------*/
  /*--------------------------------------------------------------*/
  ///////////////////////////Circles Drop Shadow///////////////////////////
  /*--------------------------------------------------------------*/
  /*--------------------------------------------------------------*/

  generateGradient(container);
  shadowGenerator(container, "drop-shadow", "330%", "330%", 3, 10, 10, 0.3);
  shadowGenerator(container, "graph-drop-shadow", "130%", "130%", 6, 0, 0, 1);
  shadowGenerator(
    container,
    "legend-drop-shadow",
    "330%",
    "330%",
    1,
    10,
    5,
    0.2
  );

  let projection = d3.geoMercator().scale(5200).translate([-7720, 2600]);

  let projectionTest = d3
    .geoEquirectangular()
    .scale(5100)
    .translate([-7565, 2478]);

  let geoGenerator = d3.geoPath().projection(projection);

  let blueScale = d3.scaleLinear().domain([1100, 4300]).range([0, 255]);

  let redScale = d3.scaleLinear().domain([1100, 4300]).range([255, 0]);

  let angleScale = d3
    .scaleLinear()
    .domain([0, 4])
    .range([0, Math.PI * 2]);

  let radScale = d3.scaleLinear().domain([1100, 4300]).range([4, 24]);

  annualrain.data.forEach((station) => {
    stationCord.push(
      projectionTest([+station["longitude"], +station["latitude"]])
    );
  });

  d3.json(url).then((countries) => {
    let names = [];
    if (countries) {
      for (let i = 0; i < countries.features.length; i++) {
        names.push(countries.features[i].properties.NAME_4);
      }
      mapContainer
        .selectAll("path")
        .data(countries.features)
        .enter()
        .append("path")
        .attr("d", geoGenerator);
    }
  });

  function reDrawCan() {
    const annualRainData = annualrain.data;

    const datatransfer = annualRainData.map((properties) => {
      return properties["Sum2013"];
    });

    let firstMin = d3.min(datatransfer);
    let firstMax = d3.max(datatransfer);

    let radScale = d3.scaleLinear().domain([firstMin, firstMax]).range([6, 24]);

    container.attr("width", w).attr("height", h);

    let allGroups = container
      .selectAll("g")
      .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    mapContainer.attr("transform", "translate(" + mapXOffSet + ",0)");
    legendGraph.attr(
      "transform",
      "translate(" + (265 + mapXOffSet) + " ," + h + ")"
    );

    ellipseContainer
      .selectAll("ellipse")
      .data(ellipsesLength)
      .enter()
      .append("ellipse")
      .attr("cx", function (d) {
        return d.x;
      })
      .attr("cy", function (d) {
        return d.y;
      })
      .attr("rx", 0)
      .attr("ry", 0);

    for (let i = 0; i < 3; i++) {
      let groups;
      let dataSet;
      if (i == 0) {
        dataSet = population.data.map((d) => {
          return d.Population1991;
        });
        groups = groupOne;
      } else if (i == 1) {
        dataSet = population.data.map((d) => {
          return d.Population2001;
        });
        groups = groupTwo;
      } else if (i == 2) {
        dataSet = population.data.map((d) => {
          return d.Population2011;
        });
        groups = groupThree;
      }
      groups.style("opacity", 1);

      let arcG = d3.arc().innerRadius(0).outerRadius(0);

      let popScale = d3.pie()(dataSet);

      let gr = groups
        .selectAll("path")
        .data(popScale)
        .enter()
        .append("path")
        .attr("d", arcG);
    }

    cityCircles.attr("transform", "translate(" + mapXOffSet + ",0)");
    cityLables.attr("transform", "translate(" + mapXOffSet + ",0)");
    ellipseContainer.attr("transform", "translate(" + mapXOffSet + ",0)");

    let managedArray = [];
    const legendData = annualrain.data.map((data) => {
      return data.Sum2013;
    });
    const sortedData = legendData.sort(d3.descending);
    managedArray.push(sortedData[0]);
    managedArray.push(sortedData[sortedData.length / 2]);
    managedArray.push(sortedData[sortedData.length - 1]);

    legendGraph
      .selectAll("circle")
      .data(managedArray)
      .enter()
      .append("circle")
      .attr("class", "cities-circles")
      .attr("transform", (d, i) => {
        return "translate(0," + -radScale(d) + ")";
      })
      .attr("r", (d) => {
        return radScale(d);
      });

    legendGraph
      .selectAll("line")
      .data(managedArray)
      .enter()
      .append("line")
      .attr("transform", function (d, i) {
        return "translate(0," + -radScale(d) * 2 + ")";
      })
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x1", function (d, i) {
        return i * 50 + 50;
      })
      .attr("y1", 1)
      .style("stroke", "white");

    legendGraph
      .selectAll("text")
      .data(managedArray)
      .enter()
      .append("text")
      .attr("transform", function (d, i) {
        return (
          "translate(" + (i * 50 + 52) + "," + (-radScale(d) * 2 - 3) + ")"
        );
      })
      .text(function (d) {
        return d + "mm";
      })
      .style("font-size", "6pt")
      .style("fill", "white");

    const circleStations = cityCircles
      .selectAll("circle")
      .data(annualrain.data)
      .enter()
      .append("circle")
      .attr("id", (d) => {
        return d.Station;
      })
      .attr("class", "cities-circles")
      .attr("transform", (d) => {
        const pos = projectionTest([+d.longitude, +d.latitude]);
        return `translate(${pos[0]},${pos[1]})`;
      })
      .attr("r", (d) => {
        return radScale(d.Sum2013);
      })
      .on("mouseover", function (d) {
        d3.select(this).classed("active", true);
      })
      .on("mouseout", function (d) {
        d3.select(this).classed("active", false);
      })

      .on("click", function () {
        const coords = [
          this.transform.animVal[0].matrix.e,
          this.transform.animVal[0].matrix.f,
        ];
        let group = container.append("g");
        let nameOfCity = this.id;
        let popOne, popTwo, popThree;

        cityLables.selectAll("text").remove();

        d3.selectAll("circle").classed("clicked", false);
        d3.select(this).classed("clicked", true);

        let circleTransition = d3.transition().ease(d3.easePoly).duration(1000);

        let cgraphTransition = d3.transition().ease(d3.easePoly).duration(1000);

        let ellipses = ellipseContainer
          .selectAll("ellipse")
          .data(ellipsesLength);
        ellipses.exit().remove();

        ellipses
          .select("ellipse")
          .data(ellipsesLength)
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
            if (d.f == "none") {
              return d.s;
            } else {
              return "url(#Gradient)";
            }
          })
          .style("stroke-width", "1.5px")
          .style("filter", "url(#graph-drop-shadow)");

        let myLable = cityLables
          .selectAll("text")
          .data(ellipsesLength)
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

        let inner = d3.scaleLinear().domain([0, 63]).range([70, 0]);

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
          rectsLength
        );

        let rainGroupTx =
          mapXOffSet + coords[0] + graphRad * Math.cos(angleScale(3)) - 125;
        let rainGroupTy = coords[1] + graphRad * Math.sin(angleScale(3)) - 125;

        rainGroup
          .attr(
            "transform",
            "translate(" + rainGroupTx + "," + rainGroupTy + ")"
          )
          .style("opacity", 1);

        let r = 58;
        let margin = {
            top: 50,
            right: 80,
            bottom: 50,
            left: 80,
          },
          width =
            Math.min(700, window.innerWidth / 4) - margin.left - margin.right,
          height = Math.min(
            width,
            window.innerHeight - margin.top - margin.bottom
          );

        let data = [];
        let thisCityRain = {
          color: "#cd1d27",
          name: nameOfCity,
          axis: [{}],
        };
        months.data.map((d, i) => {
          d.Station === nameOfCity &&
            thisCityRain.axis.push({
              value: d[`MonthlyTotal${yearSelected}`],
              axis: rainMonthsName[i % 12].name,
            });
        });
        thisCityRain.axis.splice(0, 1);
        const radarChartOptions = {
          w: 90,
          h: 150,
          margin: margin,
          levels: 2,
          roundStrokes: true,
          color: d3.scaleOrdinal().range(["#9C3C41", "#12393D", "#9C3C41"]),
          format: ".0f",
        };

        // const svg_radar1 = Radar(".rainG", thisCityRain, radarChartOptions);
      });

    let rectScale = d3.scaleLinear().domain([0, 20]).range([4, 24]);

    let legendCircleScale = d3.scaleLinear().domain([0, 20]).range([4, 12]);

    let colorScale = d3.scaleLinear().domain([0, 20]).range([255, 153]);

    let check;

    slumsComponent(slums,yearsSluems,lableSluems,yearLableInc)

    yearsContainer.attr("transform", "translate(150,20)");
    yearsContainer
      .selectAll("text")
      .data(yearSelector)
      .enter()
      .append("text")
      .attr("x", function (d, i) {
        return i * yearLableInc;
      })
      .attr("y", 0)
      .text(function (d) {
        return d.name;
      })
      .attr("id", function (d) {
        return d.name;
      })
      .attr("text-anchor", "middle")
      .attr("font-size", 12)

      .on("mouseover", function (d) {
        let year = this.id;
        d3.select(this).classed("active", true);

        yearsSluems
          .selectAll("rect")
          .transition()
          .duration(500)
          .attr("height", function (d, i) {
            return slumScale(+d.value,slums);
          });
        yearsSluems
          .selectAll("text")
          .transition()
          .delay(500)
          .duration(100)
          .style("opacity", function (d) {
            if (d.year == year) {
              return 1;
            } else {
              return 0;
            }
          });
      })
      .on("mouseout", function (d) {
        d3.select(this).classed("active", false);
        yearsSluems
          .selectAll("rect")
          .transition()
          .duration(500)
          .attr("height", 0);
        yearsSluems
          .selectAll("text")
          .transition()
          .delay(500)
          .duration(100)
          .style("opacity", 0);
      })
      .on("click", function (d) {
        removeFunction(cityLables,ellipseContainer,groupOne, groupTwo, groupThree, container,lables,cityCircles);
        onClickTextFunction(this,yearsContainer);
        const yearListSelected = this.id;
        DrawAll(annualrain,yearListSelected, yearSelected, firstMin, firstMax, radScale, cityCircles, legendGraph);
      });

    removeEllipses(
      d3,
      ellipseContainer,
      groupOne,
      groupTwo,
      groupThree,
      container,
      lables,
      cityCircles,
      cityLables
    );

    DrawAll(annualrain,2013, yearSelected, firstMin, firstMax, radScale, cityCircles, legendGraph)

    d3.selectAll("g").raise();

    window.addEventListener("click", function (event) {
      if (
        (event.srcElement.className === "content-page open" &&
          event.srcElement.id === "D3") ||
        event.srcElement.id === "control-canvas" ||
        event.srcElement.id === "map-canvas"
      ) {
        yearsContainer
          .selectAll("text")
          .attr("font-size", 12)
          .style("fill", "white")
          .style("font-family", "imported-Azo");

        removeEllipses();
      }
    });
  }

  window.addEventListener("click", function (event) {
    let thisCanvasContainer = document.getElementsByClassName("content-page");

    for (let i = 0; i < thisCanvasContainer.length; i++) {
      if (
        event.srcElement.className !== "content-page open" &&
        event.srcElement.id === "D3" &&
        thisCanvasContainer[i].id === "D3" &&
        thisCanvasContainer[i].classList.contains("open")
      ) {
        let thisContainer = document.getElementById("Script-Container");
        reDrawCan();
      }
    }
  });
  containerElement && reDrawCan();
};
