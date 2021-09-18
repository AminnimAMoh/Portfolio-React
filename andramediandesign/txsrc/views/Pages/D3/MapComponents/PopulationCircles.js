const PopulationCircles = (
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
) => {
  const arcGenerator = d3
    .arc()
    .innerRadius(60)
    .outerRadius(function (d) {
      return outer(d.data);
    });

  const outer = d3
    .scaleLinear()
    .domain([+population.data[0].Min2011, +population.data[0].Max2011])
    .range([62, 70]);

  const pieColorScale = d3
    .scaleSequential()
    .domain([+population.data[0].Min1991, +population.data[0].Max1991])
    .interpolator(d3.interpolateBuPu);

  const popCityName = population.data.map((data) => {
    return data.City;
  });

  let populations = {
    popOne: 0,
    popTwo: 0,
    popThree: 0,
  };
  for (let i = 0; i < 3; i++) {
    let data;
    let groupContainer;

    if (i === 0) {
      data = population.data.map((data) => {
        return +data.Population1991;
      });
      groupContainer = groupOne;
    } else if (i === 1) {
      data = population.data.map((data) => {
        return +data.Population2001;
      });
      groupContainer = groupTwo;
    } else if (i === 2) {
      data = population.data.map((data) => {
        return +data.Population2011;
      });
      groupContainer = groupThree;
    }
    data.splice(0, 2);
    const popScale = d3.pie()(data);
    const populationOne = population.data.map((data) => {
      return +data.Population1991;
    });
    const cOne = groupContainer.selectAll("path").data(populationOne);
    cOne.exit().remove();

    cOne
      .select("path")
      .data(popScale)
      .enter()
      .append("path")
      .attr("d", arcGenerator)
      .style("fill", function (d, i) {
        if (nameOfCity === popCityName[i]) {
          populations.popOne = population.data[i].Population1991;
          populations.popTwo = population.data[i].Population2001;
          populations.popThree = population.data[i].Population2011;
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

    const groupTx = mapXOffSet + coords[0] + graphRad * Math.cos(angleScale(i));
    const groupTy = coords[1] + graphRad * Math.sin(angleScale(i));

    groupContainer.attr(
      "transform",
      "translate(" + groupTx + "," + groupTy + ")"
    );
    function arcTween(d) {
      const i = d3.interpolateNumber(70, 60);
      return function (t) {
        const r = i(t),
          arc = d3
            .arc()
            .outerRadius(function (d) {
              return outer(d.data);
            })
            .innerRadius(r);
        return arc(d);
      };
    }

    lables.attr(
      "transform",
      "translate(" + (groupTx + 110) + "," + groupTy + ")"
    );

    let textContainer = lables.selectAll("text").data(rectsLength);
    let formatComma = d3.format(",");
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

    textContainer
      .select("text")
      .data(rectsLength)
      .enter()
      .append("text")
      .attr("x", function (d) {
        if (
          formatComma(populations.popOne) === "NaN" ||
          formatComma(populations.popTwo) === "NaN" ||
          formatComma(populations.popThree) === "NaN"
        ) {
          return d.x - 20;
        } else {
          return d.x - 28;
        }
      })
      .attr("y", function (d) {
        return d.y + 25;
      })
      .text(function (d, i) {
        switch (i) {
          case 0:
            if (formatComma(populations.popOne) === "NaN") {
              return "Data Missing";
            }
            return formatComma(populations.popOne);
          case 1:
            if (formatComma(populations.popTwo) === "NaN") {
              return "Data Missing";
            }
            return formatComma(populations.popTwo);
          case 2:
            if (formatComma(populations.popThree) === "NaN") {
              return "Data Missing";
            }
            return formatComma(populations.popThree);
          default:
            return formatComma(0);
        }
      })
      .attr("width", 20)
      .style("fill", "#E4E5E7")
      .style("font-size", 11);
  }
};
export default PopulationCircles;
