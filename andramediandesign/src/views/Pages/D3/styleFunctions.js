export const generateBlur = (container) => {
  container
    .append("defs")
    .append("filter")
    .attr("id", "blurFilter")
    .append("feGaussianBlur")
    .attr("stdDeviation", 20);
};

export const generatGradient = (container) => {
  var gradient = container
    .append("defs")
    .append("linearGradient")
    .attr("id", "Gradient")
    .attr("gradientTransform", "rotate(180)");
  gradient.append("stop").attr("class", "stop-left").attr("offset", "0");
  gradient.append("stop").attr("class", "stop-right").attr("offset", "1");
};

export const shadowGenerator = (
  container,
  id,
  width,
  height,
  stdDeviation,
  dx,
  dy,
  slope
) => {
  let defsShadow = container.append("defs");

  let filterShadow = defsShadow
    .append("filter")
    .attr("id", id)
    .attr("height", width)
    .attr("width", height);

  filterShadow
    .append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", stdDeviation);

  filterShadow
    .append("feOffset")
    .attr("dx", dx)
    .attr("dy", dy)
    .attr("result", "offsetBlur");

  let feTransferShadow = filterShadow.append("feComponentTransfer");

  feTransferShadow
    .append("feFuncA")
    .attr("type", "linear")
    .attr("slope", slope);

  let feMergeShadow = filterShadow.append("feMerge");

  feMergeShadow.append("feMergeNode");
  feMergeShadow.append("feMergeNode").attr("in", "SourceGraphic");
};
