import React, { useRef, useEffect, useState } from "react";
import { select, Selection } from "d3-selection";
import {draw} from './draw';
import {useDispatch} from 'react-redux'
import {fetchAnnualrainData} from '../../../redux/slices/fetchSlice'
interface Props {}

// interface ParentCalcedSize {
//   w: number;
//   h: number;
// }

function D3({}: Props): React.ReactElement {
    const dispatch=useDispatch();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [svg, setSvg]=useState <null | Selection<SVGSVGElement | null, unknown, null, undefined>>(null)

  useEffect(() => {
    !svg && setSvg(select(svgRef.current))
    // svgRef && console.log(svgRef.current);
    svg && draw(svg,svgRef)
    dispatch(fetchAnnualrainData())
  }, [svg]);
  
  return (
    <div style={{width: '100%', height: '100%'}}>
      <svg style={{width: '100%', height: '100%'}} ref={svgRef} />
    </div>
  );
}

export default D3;
