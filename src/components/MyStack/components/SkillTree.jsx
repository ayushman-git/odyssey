"use client";

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const SkillTree = ({ data }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [tooltipData, setTooltipData] = useState(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;
    
    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Set up dimensions with reduced height for a more compact view
    const container = svgRef.current.parentElement;
    containerRef.current = container;
    const width = container.clientWidth;
    // Make height slightly smaller for a more compact look
    const height = width * 0.85;
    
    // Adjust center point for the more compact view
    const cx = width * 0.5;
    const cy = height * 0.5;
    
    // Reduce radius for a more compact tree
    const radius = Math.min(width, height) / 2.5;

    // Create a more compact radial tree layout with tighter separation
    const tree = d3.tree()
      .size([2 * Math.PI, radius])
      // Reduce separation between nodes for compactness
      .separation((a, b) => (a.parent == b.parent ? 1 : 1.8) / a.depth);

    // Process the data with d3 hierarchy
    const root = tree(d3.hierarchy(data)
      .sort((a, b) => d3.ascending(a.data.name, b.data.name)));

    // Create the SVG container with reduced padding
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-cx - 30, -cy - 30, width + 60, height + 60]) // Reduced padding
      .attr("style", "width: 100%; height: auto; font: 10px sans-serif;");
    
    // Add a subtle glow filter for enhanced visual
    const defs = svg.append("defs");
    
    // Standard glow filter
    const filter = defs.append("filter")
      .attr("id", "glow")
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%");
    
    filter.append("feGaussianBlur")
      .attr("stdDeviation", "2")  // Reduced blur for cleaner look
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
      .attr("stdDeviation", "3") // Reduced hover glow
      .attr("result", "coloredBlur");
    
    const hoverMerge = hoverFilter.append("feMerge");
    hoverMerge.append("feMergeNode").attr("in", "coloredBlur");
    hoverMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Function to get parent nodes instead of descendants
    const getParentNodes = (node) => {
      const parentNodes = [];
      let current = node;
      
      // If this node has a parent, start traversing up
      while (current.parent) {
        parentNodes.push(current.parent);
        current = current.parent;
      }
      
      return parentNodes;
    };

    // Create shared mouseover handler for both nodes and labels
    const handleMouseOver = function(event, d) {
      const element = d3.select(this);
      
      // Highlight the associated node
      d3.selectAll(".skill-node")
        .filter(n => n.data.name === d.data.name)
        .transition()
        .duration(200)
        .attr("r", d.data.size || (d.children ? 5 : 3.5))
        .attr("filter", "url(#hover-glow)");
      
      // Get parent nodes for highlighting
      const parentNodes = getParentNodes(d);
      const parentNodeNames = parentNodes.map(n => n.data.name);
      
      // Highlight parent nodes
      d3.selectAll(".skill-node")
        .filter(n => parentNodeNames.includes(n.data.name))
        .transition()
        .duration(200)
        .attr("r", n => n.data.size || (n.children ? 4 : 3))
        .attr("filter", "url(#hover-glow)");
      
      // Highlight links that connect to parent nodes
      d3.selectAll("path")
        .filter(function() {
          const link = d3.select(this);
          const source = link.attr("data-source");
          const target = link.attr("data-target");
          
          // Check if the link connects the current node to its parent
          // or connects among the parent nodes
          return (source === d.data.name && parentNodeNames.includes(target)) || 
                 (target === d.data.name && parentNodeNames.includes(source)) ||
                 (parentNodeNames.includes(source) && parentNodeNames.includes(target));
        })
        .transition()
        .duration(200)
        .attr("stroke", d.data.color || "#3B82F6")
        .attr("stroke-width", 1.2)
        .attr("stroke-opacity", 0.9);
      
      // Highlight the parent labels - removed font-weight styling
      d3.selectAll(".skill-label")
        .filter(n => n.data.name === d.data.name || parentNodeNames.includes(n.data.name))
        .transition()
        .duration(200)
        .attr("stroke-width", 3);
      
      // Position and show tooltip using React state only
      // Get accurate mouse position relative to viewport
      const rect = containerRef.current.getBoundingClientRect();
      const tooltipX = event.clientX - rect.left;
      const tooltipY = event.clientY - rect.top;
      
      console.log('Setting tooltip data:', {
        name: d.data.name,
        description: d.data.description,
        x: tooltipX,
        y: tooltipY
      });
      
      // Update React tooltip state
      setTooltipData({
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
        .attr("r", n => n.data.size || (n.children ? 3 : 2.5)) // Smaller nodes but keep text readable
        .attr("filter", "url(#glow)");
      
      // Reset all links
      d3.selectAll("path")
        .transition()
        .duration(300)
        .attr("stroke", "#4B5563")
        .attr("stroke-width", 0.8) // Thinner links
        .attr("stroke-opacity", 0.5);
      
      // Reset all labels - removed font-weight styling
      d3.selectAll(".skill-label")
        .transition()
        .duration(300)
        .attr("stroke-width", 2);
      
      // Hide tooltip by clearing React state
      setTooltipData(null);
    };

    // Append links
    const links = svg.append("g")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.5) // More transparent links
      .attr("stroke-width", 0.8) // Thinner links
      .selectAll()
      .data(root.links())
      .join("path")
      .attr("stroke", "#4B5563") // Gray-600
      .attr("d", d3.linkRadial()
        .angle(d => d.x)
        .radius(d => d.y))
      .attr("stroke-dasharray", function() {
        const length = this.getTotalLength();
        return `${length} ${length}`;
      })
      .attr("stroke-dashoffset", function() {
        return this.getTotalLength();
      })
      .attr("data-source", d => d.source.data.name)
      .attr("data-target", d => d.target.data.name)
      .transition()
      .duration(1500)
      .delay((d, i) => i * 40) // Faster animation
      .attr("stroke-dashoffset", 0);

    // Append nodes
    const nodes = svg.append("g")
      .selectAll()
      .data(root.descendants())
      .join("circle")
      .attr("class", "skill-node")
      .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
      .attr("fill", d => d.data.color || (d.children ? "#3B82F6" : "#60A5FA")) // Blue shades
      .attr("r", 0)
      .attr("filter", "url(#glow)")
      .attr("data-node", d => d.data.name)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .on("click", function(event, d) {
        // Pulse animation on click
        d3.select(this)
          .transition()
          .duration(100)
          .attr("r", d.data.size ? d.data.size * 1.4 : (d.children ? 6 : 4))
          .transition()
          .duration(300)
          .attr("r", d.data.size || (d.children ? 3 : 2.5));
      })
      .transition()
      .duration(800)
      .delay((d, i) => 400 + i * 40) // Faster animation
      .attr("r", d => d.data.size || (d.children ? 3 : 2.5));

    // Append labels with original font sizes but more compact positioning
    svg.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 2) // Thinner stroke for cleaner look
      .selectAll()
      .data(root.descendants())
      .join("text")
      .attr("class", "skill-label")
      // Position closer to nodes
      .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y + (d.children ? 0 : 6)},0) rotate(${d.x >= Math.PI ? 180 : 0})`)
      .attr("dy", "0.31em")
      .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6) // Keep readable offsets
      .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
      .attr("paint-order", "stroke")
      .attr("stroke", "#111827") // Dark background
      .attr("fill", d => d.data.labelColor || "white")
      .attr("opacity", 0)
      .style("font-size", d => {
        // Keep original readable font sizes
        if (d.depth === 0) return "16px";
        if (d.depth === 1) return "16px";
        return "14px"; // Still readable but slightly smaller for deeper levels
      })
      .text(d => d.data.name)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .style("cursor", "pointer")
      .transition()
      .duration(300)
      .delay((d, i) => 600 + i * 40) // Faster animation
      .attr("opacity", 1);

    // Add responsive behavior
    const resizeObserver = new ResizeObserver(entries => {
      if (!entries.length) return;
      
      const newWidth = entries[0].contentRect.width;
      const newHeight = newWidth * 0.85; // Maintain compact aspect ratio
      
      d3.select(svgRef.current)
        .attr("width", newWidth)
        .attr("height", newHeight)
        .attr("viewBox", [
          -(newWidth * 0.5) - 30, 
          -(newHeight * 0.5) - 30, 
          newWidth + 60, 
          newHeight + 60
        ]);
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.unobserve(container);
      setTooltipData(null); // Clear tooltip data on unmount
    };
  }, [data]);

  console.log('Tooltip data state:', tooltipData);

  return (
    <div className="w-full flex justify-center items-center p-4 relative">
      <svg ref={svgRef} className="skill-tree-svg"></svg>
      
      {/* React-controlled tooltip */}
      {tooltipData && (
        <div 
          className="absolute pointer-events-none bg-gray-900/90 text-white px-3 py-1 rounded-lg border border-gray-700 shadow-lg backdrop-blur-sm z-50"
          style={{
            left: `${tooltipData.x}px`,
            top: `${tooltipData.y}px`,
            transform: 'translate(-50%, -100%)',
            marginTop: '-8px',
            opacity: 1 // Ensure opacity is set to visible
          }}
        >
          <div className="flex flex-col space-y-1">
            <span className="font-medium">{tooltipData.name}</span>
            {tooltipData.description && (
              <span className="text-gray-300">{tooltipData.description}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillTree;
