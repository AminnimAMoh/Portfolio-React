import React, { useRef, useEffect, useState } from "react";
import { select, Selection } from "d3-selection";

interface Props {}

// interface ParentCalcedSize {
//   w: number;
//   h: number;
// }

function D3({}: Props): React.ReactElement {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [svg, setSvg]=useState <null | Selection<SVGSVGElement | null, unknown, null, undefined>>(null)

  useEffect(() => {
    !svg && setSvg(select(svgRef.current))
    svgRef && console.log(svgRef.current);
    
  }, [svg]);
  
  return (
    <div>
      <svg ref={svgRef} />
    </div>
  );
}

export default D3;
