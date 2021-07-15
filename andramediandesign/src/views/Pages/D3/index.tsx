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
  const [svg, setSvg] = useState<null | Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);

  useEffect(() => {
    !annualrain.state && dispatch(fetchAnnualrainData());
    !slums.state && dispatch(fetchSlumsData());
    !population.state && dispatch(fetchPopulationData());
    !months.state && dispatch(fetchMonthData());
  }, []);

  useEffect(() => {
    !svg && setSvg(select(svgRef.current));
    // svgRef && console.log(svgRef.current);
    annualrain.data.length > 0 && svg && draw(svg, svgRef, annualrain, slums, population, months);
  }, [svg, annualrain]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <svg style={{ width: "100%", height: "100%" }} ref={svgRef} />
    </div>
  );
}

export default D3;
