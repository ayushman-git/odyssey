
/**
 * Get all descendants of a node
 */
export const getDescendants = (node) => {
  if (!node.children) return [];
  return node.descendants().slice(1); // Get all descendants except the node itself
};

/**
 * Get path from node to root
 */
export const getPathToRoot = (node) => {
  const path = [];
  let current = node;
  while (current.parent) {
    path.push(current.parent);
    current = current.parent;
  }
  return path;
};

/**
 * Create SVG filters for glow effects
 */
export const createGlowFilters = (svg) => {
  const defs = svg.append("defs");
  
  // Standard glow filter
  const filter = defs.append("filter")
    .attr("id", "glow")
    .attr("x", "-50%")
    .attr("y", "-50%")
    .attr("width", "200%")
    .attr("height", "200%");
  
  filter.append("feGaussianBlur")
    .attr("stdDeviation", "2.5")
    .attr("result", "coloredBlur");
  
  const feMerge = filter.append("feMerge");
  feMerge.append("feMergeNode").attr("in", "coloredBlur");
  feMerge.append("feMergeNode").attr("in", "SourceGraphic");
  
  // Strong glow filter for hover state
  const hoverFilter = defs.append("filter")
    .attr("id", "hover-glow")
    .attr("x", "-50%")
    .attr("y", "-50%")
    .attr("width", "200%")
    .attr("height", "200%");
  
  hoverFilter.append("feGaussianBlur")
    .attr("stdDeviation", "4")
    .attr("result", "coloredBlur");
  
  const hoverMerge = hoverFilter.append("feMerge");
  hoverMerge.append("feMergeNode").attr("in", "coloredBlur");
  hoverMerge.append("feMergeNode").attr("in", "SourceGraphic");
};
