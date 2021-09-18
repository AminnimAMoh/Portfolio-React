import * as d3 from "d3";
import style from "./style.css";

import { generateAllGroups } from "./DrawFunction/generateAllGroups";

import { staticState } from "./data/staticVariables";

import {
  generatGradient,
  shadowGenerator,
  generateBlur,
} from "./styleFunctions";
import {
  onClickTextFunction,
  slumScale,
  citiesProjection,
  geoLocations,
} from "./utilities";

const Draw = (
  container,
  svgRef,
  annualrain,
  slums,
  population,
  months,
  mapData
) => {
  let containerElement = svgRef.current;
  let containerX = 0;
  let containerY = 0;
  if (containerElement) {
    containerX = containerElement.clientWidth;
    containerY = containerElement.clientHeight;
  }
  let yearLableInc = 80;
  let mapXOffSet = -100;
  let w = containerX;
  let h = containerY;
  let yearSelected = "2013";
  let generatedGroups = generateAllGroups(d3, container);
  while (!generatedGroups) {
    generatedGroups = generateAllGroups(d3, container);
  }
  /*--------------------------------------------------------------*/
  /*--------------------------------------------------------------*/
  ///////////////////////////Circles Drop Shadow////////////////////
  /*--------------------------------------------------------------*/
  /*--------------------------------------------------------------*/

  generatGradient(container);
  generateBlur(container);
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

  let names = [];
  if (mapData) {
    console.log(mapData);
    for (let i = 0; i < mapData.features.length; i++) {
      names.push(mapData.features[i].properties.NAME_4);
    }
    generatedGroups.mapContainer
      .selectAll("path")
      .data(mapData.features)
      .enter()
      .append("path")
      .attr("d", (d) => geoLocations(d));
  }

  function reDrawCan() {
    const annualRainData = annualrain.data;

    const datatransfer = annualRainData.map((properties) => {
      return properties["Sum2013"];
    });

    let firstMin = d3.min(datatransfer);
    let firstMax = d3.max(datatransfer);

    let radScale = d3.scaleLinear().domain([firstMin, firstMax]).range([6, 24]);

    container.attr("width", w).attr("height", h);

    // container
    //   .selectAll("g")
    //   .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    generatedGroups.mapContainer.attr(
      "transform",
      "translate(" + mapXOffSet + ",0)"
    );
    generatedGroups.legendGraph.attr(
      "transform",
      "translate(" + (265 + mapXOffSet) + " ," + h + ")"
    );

    generatedGroups.ellipseContainer
      .selectAll("ellipse")
      .data(staticState.ellipsesLength)
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

    generatedGroups.cityCircles.attr(
      "transform",
      "translate(" + mapXOffSet + ",0)"
    );
    generatedGroups.cityLables.attr(
      "transform",
      "translate(" + mapXOffSet + ",0)"
    );
    generatedGroups.ellipseContainer.attr(
      "transform",
      "translate(" + mapXOffSet + ",0)"
    );

    let managedArray = [];
    const legendData = annualrain.data.map((data) => {
      return data.Sum2013;
    });
    const sortedData = legendData.sort(d3.descending);
    managedArray.push(sortedData[0]);
    managedArray.push(sortedData[sortedData.length / 2]);
    managedArray.push(sortedData[sortedData.length - 1]);

    generatedGroups.legendGraph
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

    generatedGroups.legendGraph
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

    generatedGroups.legendGraph
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

    generatedGroups.cityCircles
      .selectAll("circle")
      .data(annualrain.data)
      .enter()
      .append("circle")
      .attr("id", (d) => {
        return d.Station;
      })
      .attr("class", "cities-circles")
      .attr("transform", (d) => {
        const pos = citiesProjection([+d.longitude, +d.latitude]);
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
        import(
          /* webpackChunkName: 'D3-stationsClick' */ "./MapMouseControles/StationsClick"
        ).then(({ default: stationsClick }) => {
          stationsClick(
            population,
            months,
            yearSelected,
            generatedGroups,
            d3,
            mapXOffSet,
            this
          );
        });
      });

    import(
      /* webpackChunkName: 'D3-slumsComponent' */ "./MapComponents/SlumsComponent"
    ).then(({ default: slumsComponent }) => {
      slumsComponent(slums, generatedGroups, yearLableInc);
    });

    generatedGroups.yearsContainer.attr("transform", "translate(150,20)");
    generatedGroups.yearsContainer
      .selectAll("text")
      .data(staticState.yearSelector)
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

        generatedGroups.yearsSlums
          .selectAll("rect")
          .transition()
          .duration(500)
          .attr("height", function (d, i) {
            return slumScale(+d.value, slums);
          });
        generatedGroups.yearsSlums
          .selectAll("text")
          .transition()
          .delay(500)
          .duration(100)
          .style("opacity", function (d) {
            if (d.year === year) {
              return 1;
            } else {
              return 0;
            }
          });
      })
      .on("mouseout", function (d) {
        d3.select(this).classed("active", false);
        generatedGroups.yearsSlums
          .selectAll("rect")
          .transition()
          .duration(500)
          .attr("height", 0);
        generatedGroups.yearsSlums
          .selectAll("text")
          .transition()
          .delay(500)
          .duration(100)
          .style("opacity", 0);
      })
      .on("click", function (d) {
        import(
          /* webpackChunkName: 'D3-removeFunction' */ "./MapComponents/RemoveFunction"
        ).then(({ default: removeFunction }) => {
          removeFunction(d3, container, generatedGroups);
        });
        onClickTextFunction(this, generatedGroups.yearsContainer);
        const yearListSelected = this.id;
        import(
          /* webpackChunkName: 'D3-DrawAll' */ "./MapComponents/DrawAllComponents"
        ).then(({ default: DrawAll }) => {
          DrawAll(
            d3,
            annualrain,
            yearListSelected,
            yearSelected,
            firstMin,
            firstMax,
            generatedGroups
          );
        });
      });

    import(
      /* webpackChunkName: 'D3-removeEllipses' */ "./MapComponents/RemoveEllipses"
    ).then(({ default: removeEllipses }) => {
      removeEllipses(d3, container, generatedGroups);
    });

    import(
      /* webpackChunkName: 'D3-DrawAll' */ "./MapComponents/DrawAllComponents"
    ).then(({ default: DrawAll }) => {
      DrawAll(
        d3,
        annualrain,
        2013,
        yearSelected,
        firstMin,
        firstMax,
        generatedGroups
      );
    });

    d3.selectAll("g").raise();

    // window.addEventListener("click", function (event) {
    //   if (
    //     (event.srcElement.className === "content-page open" &&
    //       event.srcElement.id === "D3") ||
    //     event.srcElement.id === "control-canvas" ||
    //     event.srcElement.id === "map-canvas"
    //   ) {
    //     generatedGroups.yearsContainer
    //       .selectAll("text")
    //       .attr("font-size", 12)
    //       .style("fill", "white")
    //       .style("font-family", "imported-Azo");

    //     removeEllipses();
    //   }
    // });
  }

  // window.addEventListener("click", function (event) {
  //   let thisCanvasContainer = document.getElementsByClassName("content-page");

  //   for (let i = 0; i < thisCanvasContainer.length; i++) {
  //     if (
  //       event.srcElement.className !== "content-page open" &&
  //       event.srcElement.id === "D3" &&
  //       thisCanvasContainer[i].id === "D3" &&
  //       thisCanvasContainer[i].classList.contains("open")
  //     ) {
  //       let thisContainer = document.getElementById("Script-Container");
  //       reDrawCan();
  //     }
  //   }
  // });
  containerElement && reDrawCan();
};

export default Draw;
