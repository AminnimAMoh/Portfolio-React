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

// interface ParentCalcedSize {
//   w: number;
//   h: number;
// }

function D3({}: Props): React.ReactElement {
  const {
    dataStore: { annualrain, slums, population, months },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dataStates, setDataStates] = useState<Array<String>>([]);
  const [svgSetupTrigger, setSVGSetupTrigger] = useState<boolean>(false);

  const [svg, setSvg] = useState<null | Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);

  useEffect(() => {
    annualrain.state === "empty" && dispatch(fetchAnnualrainData());
    slums.state === "empty" && dispatch(fetchSlumsData());
    population.state === "empty" && dispatch(fetchPopulationData());
    months.state === "empty" && dispatch(fetchMonthData());
  }, []);

  useEffect(() => {
    setDataStates([
      annualrain.state,
      slums.state,
      population.state,
      months.state,
    ]);
    (dataStates[0] === "fulfilled" &&
      dataStates[1] === "fulfilled" &&
      dataStates[2] === "fulfilled" &&
      dataStates[3] === "fulfilled") &&
      setSVGSetupTrigger(true);
  }, [annualrain.state, slums.state, population.state, months.state]);

  useEffect(() => {
    !svg && svgSetupTrigger && setSvg(select(svgRef.current));
    annualrain.data.length > 0 &&
      svg &&
      draw(svg, svgRef, annualrain, slums, population, months);
  }, [svg, svgSetupTrigger]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <svg style={{ width: "100%", height: "100%" }} ref={svgRef} />
    </div>
  );
}

export default D3;
