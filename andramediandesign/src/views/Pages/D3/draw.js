import * as d3 from "d3";
import Radar from "react-d3-radar";
import style from "./style.css";

import AnnualRainAllYears from "./data/Annual-Rain-All-Years.csv";
import PThreeYears from "./data/PThreeYears.csv";
import MonthFiveYears from "./data/Month-FiveYears.csv";
import url from "./data/GeoJson/bangladesh.geojson";
import slumsTutal from "./data/bangladesh_slums_total (1).csv";

export const draw = (container, svgRef, annualrain) => {
  let containerElement = svgRef.current;
  let containerX = 0;
  let containerY = 0;
  if (containerElement) {
    containerX = containerElement.offsetWidth;
    containerY = containerElement.offsetHeight;
  }
  let stationName = [];
  let rain1990 = [];
  let rain1995 = [];
  let rain2000 = [];
  let rain2005 = [];
  let rain2010 = [];
  let rain2013 = [];
  let stationCord = [];
  let yearLableInc = 80;
  let mapXOffSet = -100;
  let w = containerX;
  let h = containerY;
  let yearSelected = "0";
  let slumes = [];
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
  let rainMonthTotal1990 = [];
  let rainMonthTotal1995 = [];
  let rainMonthTotal2000 = [];
  let rainMonthTotal2005 = [];
  let rainMonthTotal2010 = [];
  let rainMonthTotal2013 = [];
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
  let gradient = container
    .append("defs")
    .append("linearGradient")
    .attr("id", "Gradient")
    .attr("gradientTransform", "rotate(180)");
  gradient.append("stop").attr("class", "stop-left").attr("offset", "0");
  gradient.append("stop").attr("class", "stop-right").attr("offset", "1");

  let defsShadow = container.append("defs");

  // create filter with id #drop-shadow
  // height=130% so that the shadow is not clipped
  let filterShadow = defsShadow
    .append("filter")
    .attr("id", "drop-shadow")
    .attr("height", "330%")
    .attr("width", "330%");

  // SourceAlpha refers to opacity of graphic that this filter will be applied to
  // convolve that with a Gaussian with standard deviation 3 and store result
  // in blur
  filterShadow
    .append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 3);

  // translate output of Gaussian blur to the right and downwards with 2px
  // store result in offsetBlur
  filterShadow
    .append("feOffset")
    .attr("dx", 10)
    .attr("dy", 10)
    .attr("result", "offsetBlur");

  // Control opacity of shadow filter
  let feTransferShadow = filterShadow.append("feComponentTransfer");

  feTransferShadow.append("feFuncA").attr("type", "linear").attr("slope", 0.3);

  // overlay original SourceGraphic over translated blurred opacity by using
  // feMerge filter. Order of specifying inputs is important!
  let feMergeShadow = filterShadow.append("feMerge");

  feMergeShadow.append("feMergeNode");
  feMergeShadow.append("feMergeNode").attr("in", "SourceGraphic");

  /*--------------------------------------------------------------*/
  /*--------------------------------------------------------------*/
  ///////////////////////////Circles Drop Shadow///////////////////////////
  /*--------------------------------------------------------------*/
  /*--------------------------------------------------------------*/

  /*--------------------------------------------------------------*/
  /*--------------------------------------------------------------*/
  ///////////////////////////Graph Drop Shadow///////////////////////////
  /*--------------------------------------------------------------*/
  /*--------------------------------------------------------------*/

  let defsGraph = container.append("defs");

  // create filter with id #drop-shadow
  // height=130% so that the shadow is not clipped
  let filterGraph = defsGraph
    .append("filter")
    .attr("id", "graph-drop-shadow")
    .attr("height", "130%");

  // SourceAlpha refers to opacity of graphic that this filter will be applied to
  // convolve that with a Gaussian with standard deviation 3 and store result
  // in blur
  filterGraph
    .append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 6);

  // translate output of Gaussian blur to the right and downwards with 2px
  // store result in offsetBlur
  filterGraph
    .append("feOffset")
    .attr("dx", 0)
    .attr("dy", 0)
    .attr("result", "offsetBlur");

  // Control opacity of shadow filter
  let feTransferGraph = filterGraph.append("feComponentTransfer");

  feTransferGraph.append("feFuncA").attr("type", "linear").attr("slope", 1);

  // overlay original SourceGraphic over translated blurred opacity by using
  // feMerge filter. Order of specifying inputs is important!
  let feMergeGraph = filterGraph.append("feMerge");

  feMergeGraph.append("feMergeNode");
  feMergeGraph.append("feMergeNode").attr("in", "SourceGraphic");

  /*--------------------------------------------------------------*/
  /*--------------------------------------------------------------*/
  ///////////////////////////Graph Drop Shadow///////////////////////////
  /*--------------------------------------------------------------*/
  /*--------------------------------------------------------------*/

  /*--------------------------------------------------------------*/
  ///////////////////////////Legend Drop Shadow///////////////////////////
  /*--------------------------------------------------------------*/
  /*--------------------------------------------------------------*/

  let defsLegend = container.append("defs");

  // create filter with id #drop-shadow
  // height=130% so that the shadow is not clipped
  let filterLegend = defsLegend
    .append("filter")
    .attr("id", "legend-drop-shadow")
    .attr("height", "330%")
    .attr("width", "330%");

  // SourceAlpha refers to opacity of graphic that this filter will be applied to
  // convolve that with a Gaussian with standard deviation 3 and store result
  // in blur
  filterLegend
    .append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 1);

  // translate output of Gaussian blur to the right and downwards with 2px
  // store result in offsetBlur
  filterLegend
    .append("feOffset")
    .attr("dx", 10)
    .attr("dy", 5)
    .attr("result", "offsetBlur");

  // Control opacity of shadow filter
  let feTransferLegend = filterLegend.append("feComponentTransfer");

  feTransferLegend.append("feFuncA").attr("type", "linear").attr("slope", 0.2);

  // overlay original SourceGraphic over translated blurred opacity by using
  // feMerge filter. Order of specifying inputs is important!
  let feMergeLegend = filterLegend.append("feMerge");

  feMergeLegend.append("feMergeNode");
  feMergeLegend.append("feMergeNode").attr("in", "SourceGraphic");

  /*--------------------------------------------------------------*/
  /*--------------------------------------------------------------*/
  ///////////////////////////Legend Drop Shadow///////////////////////////
  /*--------------------------------------------------------------*/
  /*--------------------------------------------------------------*/

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

  d3.csv(slumsTutal, function (data) {
    for (var i = 0; i < data.length; i++) {
      slumes.push({
        year: data[i].year,
        pop: data[i].number,
      });
    }
  });


  d3.csv(AnnualRainAllYears).then((data) => {
    for (let i = 0; i < data.length; i++) {
      stationName[i] = data[i].Station;
      rain1990.push(parseInt(data[i].Sum1990));
      rain1995.push(parseInt(data[i].Sum1995));
      rain2000.push(parseInt(data[i].Sum2000));
      rain2005.push(parseInt(data[i].Sum2005));
      rain2010.push(parseInt(data[i].Sum2010));
      rain2013.push(parseInt(data[i].Sum2013));
      stationCord.push(projectionTest([+data[i].longitude, +data[i].latitude]));
    }
  });

  d3.csv(PThreeYears).then((data) => {
    for (let i = 2; i < data.length; i++) {
      popCityName.push(data[i].City);
      populationOne.push(+data[i].Population1991);
      populationTwo.push(+data[i].Population2001);
      populationThree.push(+data[i].Population2011);
      popMinOne = +data[0].Min1991;
      popMaxOne = +data[0].Max1991;
      popMinTwo = +data[0].Min2001;
      popMaxTwo = +data[0].Max2001;
      popMinThree = +data[0].Min2011;
      popMaxThree = +data[0].Max2011;
    }
  });

  let count = 0;
  d3.csv(MonthFiveYears).then((data) => {
    for (let i = 0; i < data.length; i++) {
      rainMonthTotal1990.push({
        month: rainMonthsName[count].name,
        name: data[i].Station,
        total: +data[i].MonthlyTotal1990,
      });
      rainMonthTotal1995.push({
        month: rainMonthsName[count].name,
        name: data[i].Station,
        total: +data[i].MonthlyTotal1995,
      });
      rainMonthTotal2000.push({
        month: rainMonthsName[count].name,
        name: data[i].Station,
        total: +data[i].MonthlyTotal2000,
      });
      rainMonthTotal2005.push({
        month: rainMonthsName[count].name,
        name: data[i].Station,
        total: +data[i].MonthlyTotal2005,
      });
      rainMonthTotal2010.push({
        month: rainMonthsName[count].name,
        name: data[i].Station,
        total: +data[i].MonthlyTotal2010,
      });
      rainMonthTotal2013.push({
        month: rainMonthsName[count].name,
        name: data[i].Station,
        total: +data[i].MonthlyTotal2013,
      });
      count++;
      if (count >= 12) {
        count = 0;
      }
    }
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
    const annualRainData=annualrain.data;
    console.log(annualRainData);
    const datatransfer=annualRainData.map(properties=> {
     return properties['Sum2013'] 
    });
    // let datatransfer = rain2013;
    let firstMin = d3.min(datatransfer);
    let firstMax = d3.max(datatransfer);
    console.log(datatransfer);
    let radScale = d3.scaleLinear().domain([firstMin, firstMax]).range([6, 24]);

    // function reDrawCan() {
    // containerElement = document.getElementById("Script-Container");
    // w = containerElement.offsetWidth;
    // h = containerElement.offsetHeight;
    container.attr("width", w).attr("height", h);

    let allGroups = container
      .selectAll("g")
      .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    mapContainer.attr("transform", "translate(" + mapXOffSet + ",0)");
    legendGraph.attr(
      "transform",
      "translate(" + (265 + mapXOffSet) + " ," + (h - 230) + ")"
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
        dataSet = populationOne;
        groups = groupOne;
      } else if (i == 1) {
        dataSet = populationTwo;
        groups = groupTwo;
      } else if (i == 2) {
        dataSet = populationThree;
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
    let sortedData = rain2013.sort(d3.descending);
    managedArray.push(sortedData[0]);
    managedArray.push(sortedData[sortedData.length / 2]);
    managedArray.push(sortedData[sortedData.length - 1]);

    legendGraph
      .selectAll("circle")
      .data(managedArray)
      .enter()
      .append("circle")
      .attr("class", "cities-circles")
      .attr("transform", function (d, i) {
        return "translate(0," + -radScale(d) + ")";
      })
      .attr("r", function (d) {
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
          "translate(" + (i * 50 + 12) + "," + (-radScale(d) * 2 - 3) + ")"
        );
      })
      .text(function (d) {
        return d + "mm";
      })
      .style("font-size", "6pt")
      .style("fill", "white");

    for (let i = 0; i < stationCord.length; i++) {
      let cord = stationCord[i];
      let circleStations = cityCircles
        .append("circle")
        .attr("id", function () {
          return stationName[i];
        })
        .attr("class", "cities-circles")
        .attr("cx", function () {
          return cord[0];
        })
        .attr("cy", function () {
          return cord[1];
        })
        .attr("r", function () {
          return radScale(rain2013[i]);
        })
        .on("mouseover", function (d) {
          d3.select(this).classed("active", true);
        })
        .on("mouseout", function (d) {
          d3.select(this).classed("active", false);
        })

        .on("click", function () {
          let coords = mouse(this);
          let group = container.append("g");
          let nameOfCity = this.id;
          let popOne, popTwo, popThree;

          cityLables.selectAll("text").remove();

          d3.selectAll("circle").classed("clicked", false);
          d3.select(this).classed("clicked", true);

          let circleTransition = d3
            .transition()
            .ease(d3.easePoly)
            .duration(1000);

          let cgraphTransition = d3
            .transition()
            .ease(d3.easePoly)
            .duration(1000);

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

          let outer = d3
            .scaleLinear()
            .domain([popMinThree, popMaxThree])
            .range([62, 70]);

          let inner = d3.scaleLinear().domain([0, 63]).range([70, 0]);

          let arcGenerator = d3
            .arc()
            .innerRadius(60)
            .outerRadius(function (d) {
              return outer(d.data);
            });

          let pieColorScale = d3
            .scaleSequential()
            .domain([popMinOne, popMaxOne])
            .interpolator(d3.interpolateBuPu);

          for (let i = 0; i < 3; i++) {
            let data;
            let groupContainer;
            let lable;
            if (i == 0) {
              data = populationOne;
              groupContainer = groupOne;
            } else if (i == 1) {
              data = populationTwo;
              groupContainer = groupTwo;
            } else if (i == 2) {
              data = populationThree;
              groupContainer = groupThree;
            }

            let popScale = d3.pie()(data);

            let cOne = groupContainer.selectAll("path").data(populationOne);
            cOne.exit().remove();

            let arc = cOne
              .select("path")
              .data(popScale)
              .enter()
              .append("path")
              .attr("d", arcGenerator)
              .style("fill", function (d, i) {
                if (nameOfCity == popCityName[i]) {
                  popOne = populationOne[i];
                  popTwo = populationTwo[i];
                  popThree = populationThree[i];
                  return "#9C3C41";
                } else {
                  return pieColorScale(data[i]);
                }
              })
              .style("stroke-width", "none")
              .transition()
              .ease(d3.easePoly)
              .duration(1000)
              .attrTween("d", arcTween);

            function arcTween(d) {
              let i = d3.interpolateNumber(70, 60);
              return function (t) {
                let r = i(t),
                  arc = d3
                    .arc()
                    .outerRadius(function (d) {
                      return outer(d.data);
                    })
                    .innerRadius(r);
                return arc(d);
              };
            }

            let groupTx =
              mapXOffSet + coords[0] + graphRad * Math.cos(angleScale(i));
            let groupTy = coords[1] + graphRad * Math.sin(angleScale(i));

            groupContainer.attr(
              "transform",
              "translate(" + groupTx + "," + groupTy + ")"
            );
          }

          let rainGroupTx =
            mapXOffSet + coords[0] + graphRad * Math.cos(angleScale(3)) - 125;
          let rainGroupTy =
            coords[1] + graphRad * Math.sin(angleScale(3)) - 125;

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
          let thisCityRain = [];
          thisCityRain.splice(0, thisCityRain.length);
          let rainMonthTotal;
          switch (yearSelected) {
            case "1990":
              rainMonthTotal = rainMonthTotal1990;
              break;
            case "1995":
              rainMonthTotal = rainMonthTotal1995;
              break;
            case "2000":
              rainMonthTotal = rainMonthTotal2000;
              break;
            case "2005":
              rainMonthTotal = rainMonthTotal2005;
              break;
            case "2010":
              rainMonthTotal = rainMonthTotal2010;
              break;
            case "2013":
              rainMonthTotal = rainMonthTotal2013;
              break;

            default:
              rainMonthTotal = rainMonthTotal2013;
          }
          for (let i = 0; i < rainMonthTotal.length; i++) {
            if (rainMonthTotal[i].name == nameOfCity) {
              data.push(rainMonthTotal[i]);
            }
          }
          thisCityRain.push({
            name: data[0].name,
            axes: [
              {
                axis: data[0].month,
                value: data[0].total,
              },
              {
                axis: data[1].month,
                value: data[1].total,
              },
              {
                axis: data[2].month,
                value: data[2].total,
              },
              {
                axis: data[3].month,
                value: data[3].total,
              },
              {
                axis: data[4].month,
                value: data[4].total,
              },
              {
                axis: data[5].month,
                value: data[5].total,
              },
              {
                axis: data[6].month,
                value: data[6].total,
              },
              {
                axis: data[7].month,
                value: data[7].total,
              },
              {
                axis: data[8].month,
                value: data[8].total,
              },
              {
                axis: data[9].month,
                value: data[9].total,
              },
              {
                axis: data[10].month,
                value: data[10].total,
              },
              {
                axis: data[11].month,
                value: data[11].total,
              },
            ],
            color: "#cd1d27",
          });

          let radarChartOptions = {
            w: 90,
            h: 150,
            margin: margin,
            levels: 2,
            roundStrokes: true,
            color: d3.scaleOrdinal().range(["#9C3C41", "#12393D", "#9C3C41"]),
            format: ".0f",
          };

          let svg_radar1 = Radar(".rainG", thisCityRain, radarChartOptions);

          let textContainer = lables.selectAll("text").data(rectsLength);

          textContainer.exit().remove();

          textContainer
            .select("text")
            .data(rectsLength)
            .enter()
            .append("text")
            .attr("x", function (d) {
              return d.x;
            })
            .attr("y", function (d) {
              return d.y + 5;
            })
            .text(function (d) {
              return d.text;
            })
            .attr("width", 20)
            .attr("fill", "#B0B2B8")
            .attr("font-size", 11)
            .style("opacity", 1);

          let groupTx =
            mapXOffSet + coords[0] + graphRad * Math.cos(angleScale(i));
          let groupTy = coords[1] + graphRad * Math.sin(angleScale(i));
          lables.attr(
            "transform",
            "translate(" + groupTx + "," + groupTy + ")"
          );
          let formatComma = d3.format(",");

          textContainer
            .select("text")
            .data(rectsLength)
            .enter()
            .append("text")
            .attr("x", function (d) {
              if (
                formatComma(popOne) == "NaN" ||
                formatComma(popTwo) == "NaN" ||
                formatComma(popThree) == "NaN"
              ) {
                return d.x + 25;
              } else {
                return d.x + 35;
              }
            })
            .attr("y", function (d) {
              return d.y + 25;
            })
            .text(function (d, i) {
              switch (i) {
                case 0:
                  if (formatComma(popOne) == "NaN") {
                    return "Data Missing";
                  }
                  return formatComma(popOne);
                  break;
                case 1:
                  if (formatComma(popTwo) == "NaN") {
                    return "Data Missing";
                  }
                  return formatComma(popTwo);
                  break;
                case 2:
                  if (formatComma(popThree) == "NaN") {
                    return "Data Missing";
                  }
                  return formatComma(popThree);
                  break;
              }
            })
            .attr("width", 20)
            .style("fill", "#E4E5E7")
            .style("font-size", 11);

          lables.attr(
            "transform",
            "translate(" + groupTx + "," + groupTy + ")"
          );
        });
    }

    let rectScale = d3.scaleLinear().domain([0, 20]).range([4, 24]);

    let legendCircleScale = d3.scaleLinear().domain([0, 20]).range([4, 12]);

    let colorScale = d3.scaleLinear().domain([0, 20]).range([255, 153]);

    let slumMin = 55.1;
    let slumMax = 87.3;
    let slumScale = d3
      .scaleLinear()
      .domain([slumMin, slumMax])
      .range([20, 100]);

    lableSluems.attr("transform", "translate(100,20)");
    yearsSluems.attr("transform", "translate(150,20)");
    yearsSluems
      .selectAll("rect")
      .data(slumes)
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
      .data(slumes)
      .enter()
      .append("text")
      .attr("transform", function (d, i) {
        return "translate(" + (i * yearLableInc + 30) + "," + 60 + ")";
      })
      .text(function (d) {
        return "%" + d.pop;
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

    let check;
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
            return slumScale(d.pop);
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
        removeFunction();
        onClickTextFunction(this);
        const yearListSelected=this.id;
        drawAll(yearListSelected);
      });

    function removeFunction() {
      cityLables.selectAll("text").remove();
      let ellipseG = ellipseContainer.selectAll("ellipse");
      ellipseG.transition().duration(500).attr("rx", "0").attr("ry", "0");

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

      let monthRain = container
        .select(".rainG")
        .transition()
        .duration(500)
        .style("opacity", 0);

      let labelsContainer = lables
        .selectAll("text")
        .transition()
        .duration(500)
        .style("opacity", 0);

      let cityCircleContainer = cityCircles
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
      legendGraph.selectAll("text").remove();
    }

    function removeEllipses() {
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

      let monthRain = container
        .select(".rainG")
        .transition()
        .duration(500)
        .style("opacity", 0);

      let labelsContainer = lables
        .selectAll("text")
        .transition()
        .duration(500)
        .style("opacity", 0);

      let cityCircleContainer = cityCircles
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
    }

    function onClickTextFunction(d) {
      yearsContainer
        .selectAll("text")
        .attr("font-size", 12)
        .style("fill", "white")
        .style("font-family", "imported-Azo");

      d3.select(d)
        .attr("font-size", 24)
        .style("fill", "#9C3C41")
        .style("font-family", "imported-Azo-Bold");
    }

    function drawAll(data) {
      const annualRainData=annualrain.data;
      const dataSet=annualRainData.map(properties=> {
       return properties[`Sum${data}`] 
      });
      console.log(dataSet);
      yearSelected = data;

      let circleTransition = d3.transition().ease(d3.easeExp).duration(1000);

      firstMin = d3.min(dataSet);
      firstMax = d3.max(dataSet);

      radScale = d3.scaleLinear().domain([firstMin, firstMax]).range([4, 24]);

      let selectContainerCircles = cityCircles
        .selectAll("circle")
        .data(dataSet);

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
        })
        .attr("cx", function (d, i) {
          return stationCord[i][0];
        })
        .attr("cy", function (d, i) {
          return stationCord[i][1];
        });

      let managedArray = [];
      let sortedData = dataSet.sort(d3.descending);
    // console.log(sortedData);
      let mid = Math.floor(sortedData.length / 2);
      // managedArray[0]=(sortedData[0]);
      // managedArray[1]=(sortedData[mid]);
      // managedArray[2]=(sortedData[sortedData.length - 1]);

    //   managedArray.push(sortedData[0]);
    //   managedArray.push(sortedData[mid]);
    //   managedArray.push(sortedData[sortedData.length - 1]);

      // legend.select("circle")
      //   .data(managedArray)
      //   .enter().selectAll("circle").transition().duration(500)
      //   .attr("transform", function(d, i) {
      //     return "translate(0," + (-radScale(d)) + ")";
      //   })
      //   .attr("r", function(d) {
      //     return radScale(d);
      //   });

      legendGraph.select("line")
        .data(managedArray)
        .enter()
        .selectAll("line")
        .transition()
        .duration(500)
        .attr("transform", function (d, i) {
          return "translate(0," + -radScale(d) * 2 + ")";
        });

        legendGraph
        .selectAll("text")
        .data(managedArray)
        .enter()
        .append("text")
        .attr("transform", function (d, i) {
          return (
            "translate(" + (i * 50 + 12) + "," + (-radScale(d) * 2 - 6) + ")"
          );
        })
        .text(function (d) {
          return d + "mm";
        })
        .style("font-size", "6pt")
        .style("fill", "white");
    }
    d3.selectAll("g").raise();

    window.addEventListener("click", function (event) {
      if (
        (event.srcElement.className == "content-page open" &&
          event.srcElement.id == "D3") ||
        event.srcElement.id == "control-canvas" ||
        event.srcElement.id == "map-canvas"
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
        event.srcElement.className != "content-page open" &&
        event.srcElement.id == "D3" &&
        thisCanvasContainer[i].id == "D3" &&
        thisCanvasContainer[i].classList.contains("open")
      ) {
        let thisContainer = document.getElementById("Script-Container");
        reDrawCan();
      }
    }
  });
  containerElement && reDrawCan();
};
