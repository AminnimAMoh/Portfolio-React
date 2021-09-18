import * as d3 from 'd3'
import Radar from "react-d3-radar";
import style from "./style.css";

const reDrawCan=(annualrain, months)=>{
    const annualRainData = annualrain.data;
    const datatransfer = annualRainData.map((properties) => {
      return properties["Sum2013"];
    });
    const MinMax=findMinMax(datatransfer);
    let radScale = d3.scaleLinear().domain([MinMax[0], MinMax[1]]).range([6, 24]);

    container.attr("width", w).attr("height", h);

    let allGroups = container
      .selectAll("g")
      .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    mapContainer.attr("transform", "translate(" + mapXOffSet + ",0)");
    legendGraph.attr(
      "transform",
      "translate(" + (265 + mapXOffSet) + " ," + (h - 100) + ")"
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

    const rain2013 = annualrain.data.map((state) => +state["Sum2013"]);

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
      .attr("id", 'Hello')
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

    // for (let i = 0; i < stationCord.length; i++) {
    //   let cord = stationCord[i];
      let circleStations = cityCircles.selectAll('circle')
      .data(annualrain)
      .enter()
        .append("circle")
        .attr("id", function (d) {
          return d['Station'];
        })
        .attr("class", "cities-circles")
        .attr("cx", (d)=> {
          return d['latitude'];
        })
        .attr("cy", (d)=> {
          return (d['longitude']);
        })
        .attr("r", (d)=> {
          return radScale(d['Sum2013']);
        })
        .on("mouseover", function () {
          d3.select(this).classed("active", true);
        })
        .on("mouseout", function () {
          d3.select(this).classed("active", false);
        })

        .on("click", function () {
          let coords = [this.cx.animVal.value, this.cy.animVal.value];
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

          // let data = [];
          let thisCityRain = [];
          thisCityRain.splice(0, thisCityRain.length);
          const rainMonthTotal=months.map(data=>{
              
          });
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
          // for (let i = 0; i < rainMonthTotal.length; i++) {
          //   if (rainMonthTotal[i].name == nameOfCity) {
          //     data.push(rainMonthTotal[i]);
          //   }
          // }
          const data = months.data.forEach(month => {
            const dataStation=month['Station']
            dataStation==nameOfCity && console.log(month['Station'])
          })
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
            mapXOffSet + coords[0] + graphRad * Math.cos(angleScale(0));
          let groupTy = coords[1] + graphRad * Math.sin(angleScale(0));
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

    export default reDrawCan