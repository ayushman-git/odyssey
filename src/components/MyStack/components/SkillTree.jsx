"use client";

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SkillTree = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;
    
    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Set up dimensions with extra padding to prevent cropping
    const container = svgRef.current.parentElement;
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
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-cx - 40, -cy - 40, width + 80, height + 80]) // Added extra padding
      .attr("style", "width: 100%; height: auto; font: 10px sans-serif;");
    
    // Add a subtle glow filter for enhanced visual
    const defs = svg.append("defs");
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

    // Append links with subtle animation
    svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#4B5563") // Gray-600
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1)
      .selectAll()
      .data(root.links())
      .join("path")
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
      .transition()
      .duration(1500)
      .delay((d, i) => i * 50)
      .attr("stroke-dashoffset", 0);

    // Append nodes with animations
    svg.append("g")
      .selectAll()
      .data(root.descendants())
      .join("circle")
      .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
      .attr("fill", d => d.data.color || (d.children ? "#3B82F6" : "#60A5FA")) // Blue shades
      .attr("r", 0)
      .attr("filter", "url(#glow)")
      .transition()
      .duration(800)
      .delay((d, i) => 500 + i * 50)
      .attr("r", d => d.data.size || (d.children ? 4 : 3));

    // Append labels with fade-in
    svg.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .selectAll()
      .data(root.descendants())
      .join("text")
      .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y + (d.children ? 0 : 5)},0) rotate(${d.x >= Math.PI ? 180 : 0})`)
      .attr("dy", "0.31em")
      .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
      .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
      .attr("paint-order", "stroke")
      .attr("stroke", "#111827") // Dark background
      .attr("fill", d => d.data.labelColor || "white")
      .attr("opacity", 0)
      .attr("class", "skill-label")
      .style("font-size", d => d.depth === 0 ? "14px" : d.depth === 1 ? "12px" : "10px")
      .text(d => d.data.name)
      .transition()
      .duration(300)
      .delay((d, i) => 800 + i * 60)
      .attr("opacity", 1);

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
      resizeObserver.unobserve(container);
    };
  }, [data]);

  return (
    <div className="w-full h-full flex justify-center items-center p-6">
      <svg ref={svgRef} className="skill-tree-svg"></svg>
    </div>
  );
};

export default SkillTree;
