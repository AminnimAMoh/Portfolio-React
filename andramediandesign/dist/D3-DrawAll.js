"use strict";exports.id=426,exports.ids=[426],exports.modules={3754:(t,e,r)=>{r.r(e),r.d(e,{default:()=>l});const l=(t,e,r,l,n,a,s)=>{const c=s.cityCircles,i=s.legendGraph,o=e.data.map((t=>+t[`Sum${r}`]));n=t.min(o),a=t.max(o);const d=t.scaleLinear().domain([n,a]).range([4,24]);let u=c.selectAll("circle").data(o);u.exit().remove(),u.enter().append("circle").attr("r",0),u.select("circle").data(o).enter().selectAll("circle").attr("class","cities-circles").transition().duration(500).attr("r",(function(t){return d(t)}));let m=[],x=o.sort(t.descending);m.push(x[0]),m.push(x[x.length/2]),m.push(x[x.length-1]);const f=i.selectAll("line").data(m);f.exit().remove();const p=i.selectAll("circle").data(m);p.exit().remove();const A=i.selectAll("text").data(m);A.exit().remove(),p.select("circle").data(m).enter().selectAll("circle").transition().duration(500).attr("transform",(function(t,e){return"translate(0,"+-d(t)+")"})).attr("r",(function(t){return d(t)})),f.select("line").data(m).enter().selectAll("line").transition().duration(500).attr("transform",(function(t,e){return"translate(0,"+2*-d(t)+")"})),A.select("text").data(m).enter().selectAll("text").attr("transform",(function(t,e){return"translate("+(50*e+52)+","+(2*-d(t)-3)+")"})).text((t=>t+"mm")).style("font-size","6pt").style("fill","white")}}};