import React, { useRef, useEffect, useState } from "react";
import { select, Selection } from "d3-selection";
import { draw } from "./draw";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAnnualrainData,
  fetchSlumsData,
  fetchPopulationData,
  fetchMonthData,
} from "../../../redux/slices/fetchSlice";
import { RootState } from "src/store";

interface Props {}

function D3({}: Props): React.ReactElement {
  const {
    dataStore: { annualrain, slums, population, months, referesh },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [svgSetupTrigger, setSVGSetupTrigger] = useState<boolean>(false);

  const [svg, setSvg] = useState<null | Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);

  //This useEffect calls for the asyncThunk functions to call the relevant API.
  //To fetch needed data required for the Bangladesh Map section.
  //In this visualization we have used Bangladesh Annual Rain Total for all stations,
  //Total Slums population in three years.
  //Total population of each station (city).
  //Total rain for each month for each station for the selected year. 
  useEffect(() => {
    console.log(months.state );
    
    if(annualrain.state === "empty" || annualrain.state === "rejected")  dispatch(fetchAnnualrainData());
    if(slums.state === "empty" || slums.state === "rejected")  dispatch(fetchSlumsData());
    if(population.state === "empty" || population.state === "rejected")  dispatch(fetchPopulationData());
    if(months.state === "empty" || months.state === "rejected")  dispatch(fetchMonthData());
    
    //No Dependencies
    //Only runs once
  }, [referesh]);

  //This useEffect Hook listens to changes on the states of all four relevant APIs.
  //These states are set using asyncThunk functions. (visit fetchSlice.tsx)->
  //Any change in the state of each API call relevant to the Bangladesh data will trigger this hook.
  //Mainly prevents the application to exceed empty datasets.
  useEffect(() => {
    //If all APIs relevant to map responded with 200 code
    //and state has set to 'fulfilled' by the fetch slice (visit fetchSlice.tsx)->
    //We go-ahead to set up the map SVG.
    //This condition prevents the duplications of our map SVG.
    annualrain.state === "fulfilled" &&
      slums.state === "fulfilled" &&
      population.state === "fulfilled" &&
      months.state === "fulfilled" &&
      setSVGSetupTrigger(true);

      //Dependencies
      //Conditions to retriggre this hook.
  }, [annualrain.state, slums.state, population.state, months.state]);


  //This useEffect hook creates the SVG container for the map
  //when the conditions are right.
  //The conditions involved in this process are:
  //If the SVG variable reserving the SVG component is empty.
  //If all data set are successfully filled from our APIs.
  useEffect(() => {
    //Using useRef hook helps to directly access the HTML element
    //to inject the SVG canvas in to. 
    !svg && svgSetupTrigger && setSvg(select(svgRef.current));
    annualrain.data.length > 0 &&
      svg &&
      draw(svg, svgRef, annualrain, slums, population, months);

      //Dependencies
      //Conditions to retriggre this hook.
  }, [svg, svgSetupTrigger]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <svg style={{ width: "100%", height: "100%" }} ref={svgRef} />
    </div>
  );
}

export default D3;
