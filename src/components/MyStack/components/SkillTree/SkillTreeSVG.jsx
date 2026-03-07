import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { getDescendants, getPathToRoot, createGlowFilters } from './utils';

const SkillTreeSVG = ({ data, onNodeHover, onNodeLeave }) => {
  const svgRef = useRef(null);
  const onNodeHoverRef = useRef(onNodeHover);
  const onNodeLeaveRef = useRef(onNodeLeave);

  useEffect(() => {
    onNodeHoverRef.current = onNodeHover;
    onNodeLeaveRef.current = onNodeLeave;
  }, [onNodeHover, onNodeLeave]);

  useEffect(() => {
    if (!data || !svgRef.current) return;
    
    // Clear any existing SVG content and animations
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    // Set up dimensions with extra padding to prevent cropping
    const container = svgRef.current.parentElement;
    if (!container) return; // Additional safety check for parent container
    
    const width = container.clientWidth;
    const height = width;
    
    // Center point with adjustments to prevent cropping
    const cx = width * 0.5;
    const cy = height * 0.52; // Adjusted to move center point slightly up
    
    // Reduce radius to leave more space for labels
    const radius = Math.min(width, height) / 2.2;

    // Create a radial tree layout
    const tree = d3.tree()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent == b.parent ? 1.2 : 2.2) / a.depth);

    // Process the data with d3 hierarchy
    const root = tree(d3.hierarchy(data)
      .sort((a, b) => d3.ascending(a.data.name, b.data.name)));

    // Create the SVG container with a larger viewBox to prevent cropping
    svg.attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-cx - 40, -cy - 40, width + 80, height + 80]) // Added extra padding
      .attr("style", "width: 100%; height: auto; font: 10px sans-serif;");
    
    // Add glow filters
    createGlowFilters(svg);

    // Create shared mouseover handler for both nodes and labels
    const handleMouseOver = function(event, d) {
      const element = d3.select(this);
      
      // Highlight the associated node
      d3.selectAll(".skill-node")
        .filter(n => n.data.name === d.data.name)
        .transition()
        .duration(200)
        .attr("r", d.data.size || (d.children ? 6 : 4.5))
        .attr("filter", "url(#hover-glow)");
      
      // Get all descendants
      const descendants = getDescendants(d);
      const descendantNodes = descendants.map(n => n.data.name);
      
      // Get path to root
      const pathToRoot = getPathToRoot(d);
      const ancestorNodes = pathToRoot.map(n => n.data.name);
      
      // Highlight related nodes
      d3.selectAll(".skill-node")
        .filter(n => descendantNodes.includes(n.data.name) || ancestorNodes.includes(n.data.name))
        .transition()
        .duration(200)
        .attr("r", n => n.data.size || (n.children ? 5 : 4))
        .attr("filter", "url(#hover-glow)");
      
      // Highlight links that connect to or from this node
      d3.selectAll("path")
        .filter(function() {
          const link = d3.select(this);
          const source = link.attr("data-source");
          const target = link.attr("data-target");
          
          // Check if the link is connected to this node or its descendants
          return source === d.data.name || 
                target === d.data.name || 
                descendantNodes.includes(source) || 
                descendantNodes.includes(target) ||
                ancestorNodes.includes(source) ||
                ancestorNodes.includes(target);
        })
        .transition()
        .duration(200)
        .attr("stroke", d.data.color || "#3B82F6")
        .attr("stroke-width", 1.5)
        .attr("stroke-opacity", 0.9);
      
      // Highlight the label
      d3.selectAll(".skill-label")
        .filter(n => n.data.name === d.data.name)
        .transition()
        .duration(200)
        .style("font-weight", "bold")
        .attr("stroke-width", 4);
      
      // Call parent component's hover handler
      const tooltipX = event.pageX - container.getBoundingClientRect().left - window.scrollX;
      const tooltipY = event.pageY - container.getBoundingClientRect().top - window.scrollY;
      
      onNodeHoverRef.current?.({
        name: d.data.name,
        description: d.data.description || null,
        x: tooltipX,
        y: tooltipY
      });
    };
    
    // Create shared mouseout handler for both nodes and labels
    const handleMouseOut = function(event, d) {
      // Reset this node
      d3.selectAll(".skill-node")
        .transition()
        .duration(300)
        .attr("r", n => n.data.size || (n.children ? 4 : 3))
        .attr("filter", "url(#glow)");
      
      // Reset all links
      d3.selectAll("path")
        .transition()
        .duration(300)
        .attr("stroke", "#4B5563")
        .attr("stroke-width", 1)
        .attr("stroke-opacity", 0.6);
      
      // Reset all labels
      d3.selectAll(".skill-label")
        .transition()
        .duration(300)
        .style("font-weight", "normal")
        .attr("stroke-width", 3);
      
      // Call parent component's leave handler
      onNodeLeaveRef.current?.();
    };

    // Append links in final state (no draw animation to avoid partial renders)
    svg.append("g")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1)
      .selectAll()
      .data(root.links())
      .join("path")
      .attr("stroke", "#4B5563") // Gray-600
      .attr("d", d3.linkRadial()
        .angle(d => d.x)
        .radius(d => d.y))
      .attr("data-source", d => d.source.data.name)
      .attr("data-target", d => d.target.data.name);

    // Append nodes in final state
    svg.append("g")
      .selectAll()
      .data(root.descendants())
      .join("circle")
      .attr("class", "skill-node")
      .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
      .attr("fill", d => d.data.color || (d.children ? "#3B82F6" : "#60A5FA")) // Blue shades
      .attr("r", d => d.data.size || (d.children ? 4 : 3))
      .attr("filter", "url(#glow)")
      .attr("data-node", d => d.data.name)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .on("click", function(event, d) {
        // Pulse animation on click
        d3.select(this)
          .transition()
          .duration(100)
          .attr("r", d.data.size ? d.data.size * 1.5 : (d.children ? 8 : 6))
          .transition()
          .duration(300)
          .attr("r", d.data.size || (d.children ? 4 : 3));
      });

    // Append labels in final state
    svg.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .selectAll()
      .data(root.descendants())
      .join("text")
      .attr("class", "skill-label")
      .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y + (d.children ? 0 : 5)},0) rotate(${d.x >= Math.PI ? 180 : 0})`)
      .attr("dy", "0.31em")
      .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
      .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
      .attr("paint-order", "stroke")
      .attr("stroke", "#111827") // Dark background
      .attr("fill", d => d.data.labelColor || "white")
      .attr("opacity", 1)
      .style("font-size", d => d.depth === 0 ? "20px" : d.depth === 1 ? "18px" : "16px")
      .text(d => d.data.name)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .style("cursor", "pointer");

    // Add responsive behavior
    const resizeObserver = new ResizeObserver(entries => {
      if (!entries.length) return;
      
      const newWidth = entries[0].contentRect.width;
      const newHeight = newWidth; // Maintain square aspect
      
      d3.select(svgRef.current)
        .attr("width", newWidth)
        .attr("height", newHeight)
        .attr("viewBox", [
          -(newWidth * 0.5) - 40, 
          -(newHeight * 0.52) - 40, 
          newWidth + 80, 
          newHeight + 80
        ]);
    });

    resizeObserver.observe(container);

    return () => {
      // Clear all transitions to prevent memory leaks
      svg.selectAll("*").interrupt();
      resizeObserver.disconnect();
    };
  }, [data]);

  return <svg ref={svgRef} className="skill-tree-svg"></svg>;
};

export default SkillTreeSVG;
