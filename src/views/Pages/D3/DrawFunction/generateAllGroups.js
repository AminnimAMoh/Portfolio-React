export const generateAllGroups=(d3,container)=>{
    return {
     mapContainer : container.append("g").attr("id", "map-container-group"),
     yearsContainer : container.append("g").attr("class", "year-container"),
     yearsSlums : container.append("g").attr("class", "year-slumes"),
     lableSlums : container.append("g").attr("class", "lable-slumes"),
     cityCircles : container.append("g").attr("id", "city-indicators"),
     legendGraph : container.append("g").attr("id", "graph-legend-group"),
     ellipseContainer : container.append("g").attr("id", "ellipse-group"),
     cityLables : container.append("g").attr("id", "city-Lable"),
     groupOne : container.append("g").attr("id", "population-groupOne"),
     groupTwo : container.append("g").attr("id", "population-groupTwo"),
     groupThree : container.append("g").attr("id", "population-groupThree"),
     lables : container.append("g").attr("id", "graph-lables"),
     rainGroup : container.append("g").attr("class", "rainG"),
    }
}