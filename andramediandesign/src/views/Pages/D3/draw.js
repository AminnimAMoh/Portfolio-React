import * as d3 from 'd3'


export const draw = (svg) => {
    // let containerElement = document.getElementById("Script-Container");
    // let containerX = containerElement.offsetWidth;
    // let containerY = containerElement.offsetHeight;
    let stationName = [];
    let rain1990 = [];
    let rain1995 = [];
    let rain2000 = [];
    let rain2005 = [];
    let rain2010 = [];
    let rain2013 = [];
    let stationCord = [];

    let w = containerX;
    let h = containerY;
    let yearSelected = "0";
    let ellipsesLength = [{
        size: 70,
        f: "#E4E5E7",
        s: "none"
    }, {
        size: 70,
        f: "#E4E5E7",
        s: "none"
    }, {
        size: 70,
        f: "#E4E5E7",
        s: "none"
    }, {
        size: 82,
        f: "#E4E5E7",
        s: "none"
    }, {
        size: 60,
        f: "none",
        s: "black"
    }, {
        size: 60,
        f: "none",
        s: "black"
    }, {
        size: 60,
        f: "none",
        s: "black"
    }, {
        size: 80,
        f: "none",
        s: "none"
    }];
    let populationOne = [];
    let populationTwo = [];
    let populationThree = [];
    let popCityName = [];
    let graphRad = 120;
    let popMinOne, popMinTwo, popMinThree;
    let popMaxOne, popMaxTwo, popMaxThree;
    let rectsLength = [{
        x: 183,
        y: 0,
        text: "Cities Population 1991"
    }, {
        x: 63,
        y: 120,
        text: "Cities Population 2001"
    },
    {
        x: -57,
        y: 0,
        text: "Cities Population 2011"
    }
    ];

    let rainStationName = [];
    let rainMonthTotal1990 = [];
    let rainMonthTotal1995 = [];
    let rainMonthTotal2000 = [];
    let rainMonthTotal2005 = [];
    let rainMonthTotal2010 = [];
    let rainMonthTotal2013 = [];
    let rainMonthsName = [{
        name: "Jan"
    }, {
        name: "Feb"
    }, {
        name: "Mar"
    }, {
        name: "Apr"
    }, {
        name: "May"
    }, {
        name: "Jun"
    }, {
        name: "Ju"
    }, {
        name: "Aug"
    }, {
        name: "Sep"
    }, {
        name: "Oct"
    }, {
        name: "Nov"
    }, {
        name: "Dec"
    }];
    let yearSelector = [{
        name: 1990
    }, {
        name: 1995
    }, {
        name: 2000
    }, {
        name: 2005
    }, {
        name: 2010
    }, {
        name: 2013
    }];


    let container = d3.select("#Script-Container").append("svg");

    let mapContainer = container.append("g").attr("id", "map-container-group");
    let cityCircles = container.append("g").attr("id", "city-indicators");
    let ellipseContainer = container.append("g").attr("id", "ellipse-group");
    let groupOne = container.append("g").attr("id", "population-groupOne");
    let groupTwo = container.append("g").attr("id", "population-groupTwo");
    let groupThree = container.append("g").attr("id", "population-groupThree");
    let lables = container.append("g").attr("id", "graph-lables");
    let rainGroup = container.append("g").attr("class", "rainG");
    let yearsContainer = container.append("g").attr("class", "year-container");
    let legend = container.append("g");


    /*--------------------------------------------------------------*/
    /*--------------------------------------------------------------*/
    ///////////////////////////Circles Drop Shadow///////////////////////////
    /*--------------------------------------------------------------*/
    /*--------------------------------------------------------------*/

    let defsShadow = container.append("defs");

    // create filter with id #drop-shadow
    // height=130% so that the shadow is not clipped
    let filterShadow = defsShadow.append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "330%")
        .attr("width", "330%");

    // SourceAlpha refers to opacity of graphic that this filter will be applied to
    // convolve that with a Gaussian with standard deviation 3 and store result
    // in blur
    filterShadow.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 3)

    // translate output of Gaussian blur to the right and downwards with 2px
    // store result in offsetBlur
    filterShadow.append("feOffset")
        .attr("dx", 10)
        .attr("dy", 10)
        .attr("result", "offsetBlur");

    // Control opacity of shadow filter
    let feTransferShadow = filterShadow.append("feComponentTransfer");

    feTransferShadow.append("feFuncA")
        .attr("type", "linear")
        .attr("slope", .3)

    // overlay original SourceGraphic over translated blurred opacity by using
    // feMerge filter. Order of specifying inputs is important!
    let feMergeShadow = filterShadow.append("feMerge");

    feMergeShadow.append("feMergeNode")
    feMergeShadow.append("feMergeNode")
        .attr("in", "SourceGraphic");

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
    let filterGraph = defsGraph.append("filter")
        .attr("id", "graph-drop-shadow")
        .attr("height", "130%");

    // SourceAlpha refers to opacity of graphic that this filter will be applied to
    // convolve that with a Gaussian with standard deviation 3 and store result
    // in blur
    filterGraph.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 6)

    // translate output of Gaussian blur to the right and downwards with 2px
    // store result in offsetBlur
    filterGraph.append("feOffset")
        .attr("dx", 0)
        .attr("dy", 0)
        .attr("result", "offsetBlur");

    // Control opacity of shadow filter
    let feTransferGraph = filterGraph.append("feComponentTransfer");

    feTransferGraph.append("feFuncA")
        .attr("type", "linear")
        .attr("slope", 1)

    // overlay original SourceGraphic over translated blurred opacity by using
    // feMerge filter. Order of specifying inputs is important!
    let feMergeGraph = filterGraph.append("feMerge");

    feMergeGraph.append("feMergeNode")
    feMergeGraph.append("feMergeNode")
        .attr("in", "SourceGraphic");

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
    let filterLegend = defsLegend.append("filter")
        .attr("id", "legend-drop-shadow")
        .attr("height", "330%")
        .attr("width", "330%");

    // SourceAlpha refers to opacity of graphic that this filter will be applied to
    // convolve that with a Gaussian with standard deviation 3 and store result
    // in blur
    filterLegend.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 1)

    // translate output of Gaussian blur to the right and downwards with 2px
    // store result in offsetBlur
    filterLegend.append("feOffset")
        .attr("dx", 10)
        .attr("dy", 5)
        .attr("result", "offsetBlur");

    // Control opacity of shadow filter
    let feTransferLegend = filterLegend.append("feComponentTransfer");

    feTransferLegend.append("feFuncA")
        .attr("type", "linear")
        .attr("slope", .2)

    // overlay original SourceGraphic over translated blurred opacity by using
    // feMerge filter. Order of specifying inputs is important!
    let feMergeLegend = filterLegend.append("feMerge");

    feMergeLegend.append("feMergeNode")
    feMergeLegend.append("feMergeNode")
        .attr("in", "SourceGraphic");

    /*--------------------------------------------------------------*/
    /*--------------------------------------------------------------*/
    ///////////////////////////Legend Drop Shadow///////////////////////////
    /*--------------------------------------------------------------*/
    /*--------------------------------------------------------------*/

    let projection = d3.geoMercator()
        .scale(5200)
        .translate([-7720, 2600]);

    let projectionTest = d3.geoEquirectangular()
        .scale(5100)
        .translate([-7565, 2478]);

    let geoGenerator = d3.geoPath()
        .projection(projection);

    let blueScale = d3.scaleLinear()
        .domain([1100, 4300])
        .range([0, 255]);

    let redScale = d3.scaleLinear()
        .domain([1100, 4300])
        .range([255, 0]);

    let angleScale = d3.scaleLinear()
        .domain([0, 4])
        .range([0, Math.PI * 2]);

    let radScale = d3.scaleLinear()
        .domain([1100, 4300])
        .range([4, 24]);

    d3.csv("data/Annual-Rain-All-Years.csv", function (data) {
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

    d3.csv("data/PThreeYears.csv", function (data) {
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
    })

    let count = 0;
    d3.csv("data/Month-FiveYears.csv", function (data) {
        for (let i = 0; i < data.length; i++) {
            rainMonthTotal1990.push({
                month: rainMonthsName[count].name,
                name: data[i].Station,
                total: +data[i].MonthlyTotal1990
            });
            rainMonthTotal1995.push({
                month: rainMonthsName[count].name,
                name: data[i].Station,
                total: +data[i].MonthlyTotal1995
            });
            rainMonthTotal2000.push({
                month: rainMonthsName[count].name,
                name: data[i].Station,
                total: +data[i].MonthlyTotal2000
            });
            rainMonthTotal2005.push({
                month: rainMonthsName[count].name,
                name: data[i].Station,
                total: +data[i].MonthlyTotal2005
            });
            rainMonthTotal2010.push({
                month: rainMonthsName[count].name,
                name: data[i].Station,
                total: +data[i].MonthlyTotal2010
            });
            rainMonthTotal2013.push({
                month: rainMonthsName[count].name,
                name: data[i].Station,
                total: +data[i].MonthlyTotal2013
            });
            count++;
            if (count >= 12) {
                count = 0;
            }
        }
    })

    let url = "data/GeoJson/bangladesh.geojson";
    d3.json(url, function (error, countries) {
        if (error) console.log(error);
        let names = [];

        for (let i = 0; i < countries.features.length; i++) {
            names.push(countries.features[i].properties.NAME_4);
        }
        mapContainer.selectAll("path")
            .data(countries.features)
            .enter().append("path")
            .attr("d", geoGenerator)
    });

    function reDrawCan() {


        containerElement = document.getElementById("Script-Container");
        w = containerElement.offsetWidth;
        h = containerElement.offsetHeight;
        container
            .attr("width", w)
            .attr("height", h);


        let allGroups = container.selectAll("g")
            .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

        mapContainer.attr("transform", "translate(0,0)");

        ellipseContainer.selectAll("ellipse")
            .data(ellipsesLength)
            .enter().append("ellipse")
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

            let arcG = d3.arc()
                .innerRadius(0)
                .outerRadius(0);

            let popScale = d3.pie()(dataSet);

            let gr = groups.selectAll("path")
                .data(popScale)
                .enter().append("path")
                .attr("d", arcG)
        }


        cityCircles.attr("transform", "translate(0,0)");
        ellipseContainer.attr("transform", "translate(0,0)");

        for (let i = 0; i < stationCord.length; i++) {
            let cord = stationCord[i];
            let circleStations = cityCircles.append("circle")
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
                    d3.select(this)
                        .classed("active", true);
                })
                .on("mouseout", function (d) {
                    d3.select(this)
                        .classed("active", false);
                })

                .on("click", function () {
                    let coords = d3.mouse(this);
                    let group = container.append("g");
                    let nameOfCity = this.id;
                    let popOne, popTwo, popThree;
                    d3.selectAll("circle").classed("clicked", false)
                    d3.select(this)
                        .classed("clicked", true);

                    let circleTransition = d3.transition()
                        .ease(d3.easePoly)
                        .duration(1000);

                    let cgraphTransition = d3.transition()
                        .ease(d3.easePoly)
                        .duration(1000);

                    let ellipses = ellipseContainer.selectAll("ellipse")
                        .data(ellipsesLength)
                    ellipses.exit().remove();

                    ellipses.select("ellipse")
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

                    let outer = d3.scaleLinear()
                        .domain([popMinThree, popMaxThree])
                        .range([62, 70])

                    let inner = d3.scaleLinear()
                        .domain([0, 63])
                        .range([70, 0])

                    let arcGenerator = d3.arc()
                        .innerRadius(60)
                        .outerRadius(function (d) {
                            return outer(d.data);
                        });

                    let pieColorScale = d3.scaleSequential().domain([popMinOne, popMaxOne])
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

                        let cOne = groupContainer.selectAll("path")
                            .data(populationOne);
                        cOne.exit().remove();

                        let arc = cOne.select("path")
                            .data(popScale)
                            .enter().append("path")
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
                                    arc = d3.arc()
                                        .outerRadius(function (d) {
                                            return (outer(d.data));
                                        })
                                        .innerRadius(r)
                                return arc(d);
                            };
                        }

                        let groupTx = coords[0] + graphRad * Math.cos(angleScale(i));
                        let groupTy = coords[1] + graphRad * Math.sin(angleScale(i));

                        groupContainer.attr("transform", "translate(" + groupTx + "," + groupTy + ")");
                    }

                    let rainGroupTx = (coords[0] + graphRad * Math.cos(angleScale(3))) - 125;
                    let rainGroupTy = (coords[1] + graphRad * Math.sin(angleScale(3))) - 125;

                    rainGroup.attr("transform", "translate(" + rainGroupTx + "," + rainGroupTy + ")")
                        .style("opacity", 1);

                    let r = 58;
                    let margin = {
                        top: 50,
                        right: 80,
                        bottom: 50,
                        left: 80
                    },
                        width = Math.min(700, window.innerWidth / 4) - margin.left - margin.right,
                        height = Math.min(width, window.innerHeight - margin.top - margin.bottom);


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
                        axes: [{
                            axis: data[0].month,
                            value: data[0].total
                        }, {
                            axis: data[1].month,
                            value: data[1].total
                        }, {
                            axis: data[2].month,
                            value: data[2].total
                        }, {
                            axis: data[3].month,
                            value: data[3].total
                        }, {
                            axis: data[4].month,
                            value: data[4].total
                        }, {
                            axis: data[5].month,
                            value: data[5].total
                        }, {
                            axis: data[6].month,
                            value: data[6].total
                        }, {
                            axis: data[7].month,
                            value: data[7].total
                        }, {
                            axis: data[8].month,
                            value: data[8].total
                        }, {
                            axis: data[9].month,
                            value: data[9].total
                        }, {
                            axis: data[10].month,
                            value: data[10].total
                        }, {
                            axis: data[11].month,
                            value: data[11].total
                        },],
                        color: "#cd1d27"
                    });

                    let radarChartOptions = {
                        w: 90,
                        h: 150,
                        margin: margin,
                        levels: 2,
                        roundStrokes: true,
                        color: d3.scaleOrdinal().range(["#9C3C41", "#12393D", "#9C3C41"]),
                        format: '.0f'
                    };

                    let svg_radar1 = RadarChart(".rainG", thisCityRain, radarChartOptions);

                    let textContainer = lables.selectAll("text")
                        .data(rectsLength);

                    textContainer.exit().remove();

                    textContainer.select("text")
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


                    lables.attr("transform", "translate(" + groupTx + "," + groupTy + ")");
                    let formatComma = d3.format(",");

                    textContainer.select("text")
                        .data(rectsLength)
                        .enter()
                        .append("text")
                        .attr("x", function (d) {
                            return d.x + 35;
                        })
                        .attr("y", function (d) {
                            return d.y + 25;
                        })
                        .text(function (d, i) {
                            switch (i) {
                                case 0:
                                    return formatComma(popOne);
                                    break;
                                case 1:
                                    return formatComma(popTwo);
                                    break;
                                case 2:
                                    return formatComma(popThree);
                                    break;
                            }

                        })
                        .attr("width", 20)
                        .attr("fill", "#E4E5E7")
                        .attr("font-size", 11);

                    lables.attr("transform", "translate(" + groupTx + "," + groupTy + ")");

                })
        }

        let rectScale = d3.scaleLinear()
            .domain([0, 20])
            .range([4, 24]);

        let legendCircleScale = d3.scaleLinear()
            .domain([0, 20])
            .range([4, 12]);

        let colorScale = d3.scaleLinear()
            .domain([0, 20])
            .range([255, 153]);

        for (let i = 20; i > 0; i--) {
            legend.append("circle")
                .attr("cx", 0)
                .attr("cy", function () {
                    return i * 28;
                })
                .attr("r", function () {
                    return legendCircleScale(i)
                })
                .attr("class", "legend-circles");
            legend.attr("transform", "translate(110,100)")
        }
        for (let i = 0; i < 2; i++) {
            container.append("text")
                .attr("x", 60)
                .attr("y", function () {
                    return 90 + i * 220;
                })
                .text(function () {
                    if (i == 0) {
                        return "Min (0 millimeters)";
                    } else {
                        return "Max (4200 millimeters)";
                    }
                })
                .attr("fill", "#E4E5E7")
                .attr("font-size", 12);
        }
        let check;
        yearsContainer.attr("transform", "translate(100,20)");
        yearsContainer.selectAll("text")
            .data(yearSelector)
            .enter().append("text")
            .attr("x", function (d, i) {
                return i * 100;
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
                d3.select(this)
                    .classed("active", true);
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .classed("active", false);
            })
            .on("click", function (d) {
                removeFunction();
                onClickTextFunction(this);
                drawAll(this);
            });

        function removeFunction() {

            let ellipseG = ellipseContainer.selectAll("ellipse");
            ellipseG.transition().duration(500).attr("rx", 0).attr("ry", 0);

            let pathOne = groupOne.selectAll("path");
            pathOne.transition()
                .ease(d3.easePoly)
                .duration(1000)
                .attrTween("d", arcTweenClose)
                .style("opacity", 0);

            let pathTwo = groupTwo.selectAll("path");
            pathOne.transition()
                .ease(d3.easePoly)
                .duration(1000)
                .attrTween("d", arcTweenClose)
                .style("opacity", 0);

            let pathThree = groupThree.selectAll("path");
            pathOne.transition()
                .ease(d3.easePoly)
                .duration(1000)
                .attrTween("d", arcTweenClose)
                .style("opacity", 0);

            let monthRain = container.select(".rainG")
                .transition().duration(500).style("opacity", 0);

            let labelsContainer = lables.selectAll("text")
                .transition().duration(500).style("opacity", 0);

            let cityCircleContainer = cityCircles.selectAll("circle")
                .classed("clicked", false);

            function arcTweenClose(d) {
                let i = d3.interpolateNumber(70, 0);
                return function (t) {
                    let r = i(t),
                        arc = d3.arc()
                            .outerRadius(r - 2)
                            .innerRadius(r)
                    return arc(d);
                };
            }
        }

        function onClickTextFunction(d) {
            yearsContainer.selectAll("text")
                .attr("font-size", 12)
                .style("fill", "white")
                .style("font-family", "imported-Azo")

            d3.select(d)
                .attr("font-size", 24)
                .style("fill", "#9C3C41")
                .style("font-family", "imported-Azo-Bold");
        }

        function drawAll(data) {
            let dataSet;
            yearSelected = data.id;
            switch (data.id) {
                case "1990":
                    dataSet = rain1990;
                    break;
                case "1995":
                    dataSet = rain1995;
                    break;
                case "2000":
                    dataSet = rain2000;
                    break;
                case "2005":
                    dataSet = rain2005;
                    break;
                case "2010":
                    dataSet = rain2010;
                    break;
                case "2013":
                    dataSet = rain2013;
                    break;
            }
            let circleTransition = d3.transition()
                .ease(d3.easeExp)
                .duration(1000);

            let dmin = d3.min(dataSet);
            let dmax = d3.max(dataSet);
            let radScale = d3.scaleLinear()
                .domain([dmin, dmax])
                .range([0, 24]);

            let selectContainerCircles = cityCircles.selectAll("circle")
                .data(dataSet);

            selectContainerCircles.exit().remove();

            selectContainerCircles.enter().append("circle")
                .attr("r", 0);

            selectContainerCircles.transition().duration(500)
                .attr("r", function (d) {
                    return radScale(d);
                })
                .attr("cx", function (d, i) {
                    return stationCord[i][0];
                })
                .attr("cy", function (d, i) {
                    return stationCord[i][1];
                })
        }
        d3.selectAll("g").raise();

        let powerButton = document.getElementById('main-button');
        powerButton.addEventListener("click", removeFunction());
    }

    reDrawCan();


    window.addEventListener("click", function (event) {
        let thisCanvasContainer = document.getElementsByClassName("content-page");

        for (let i = 0; i < thisCanvasContainer.length; i++) {
            if (event.srcElement.id == "D3" && thisCanvasContainer[i].id == "D3" && thisCanvasContainer[i].classList.contains("open")) {
                let thisContainer = document.getElementById("Script-Container");
                reDrawCan();
            }
        }
    })
}