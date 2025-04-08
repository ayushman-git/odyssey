"use client"

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { useTheme } from 'next-themes';
import './PerTitleEncodingDemo.css';

function PerTitleEncodingDemo() {
  const chartRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Get current theme state
  const isDarkTheme = resolvedTheme === 'dark';
  
  useEffect(() => {
    setMounted(true);
    // Check if mobile on initial render
    checkIfMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    }
  }, []);
  
  useEffect(() => {
    if (chartRef.current && mounted) {
      // Clear any existing chart
      d3.select(chartRef.current).selectAll("*").remove();
      
      // Create visualization
      createVisualization(chartRef.current);
    }
  }, [isMobile, resolvedTheme, mounted]);
  
  const checkIfMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  // Data for content types
  const contentTypes = {
    action: {
      title: "Action Movie",
      description: "Fast motion, complex scenes, rapid transitions",
      color: isDarkTheme ? "#f44336" : "#d32f2f", // Red
      highlights: [
        "Many scene changes",
        "Rapid camera movements",
        "Complex textures (explosions, debris)",
        "High contrast lighting"
      ],
      contentComplexity: 0.85,
      temporalComplexity: 0.9,
      spatialComplexity: 0.75,
      steps: [
        { resolution: "240p", bitrate: 500, size: "225 MB/hour" },
        { resolution: "480p", bitrate: 1800, size: "810 MB/hour" },
        { resolution: "720p", bitrate: 3500, size: "1.6 GB/hour" },
        { resolution: "1080p", bitrate: 6000, size: "2.7 GB/hour" },
        { resolution: "4K", bitrate: 15000, size: "6.8 GB/hour" }
      ]
    },
    animation: {
      title: "Animated Film",
      description: "Grave of the Fireflies: watercolors, simpler motion",
      color: isDarkTheme ? "#4caf50" : "#2e7d32", // Green
      highlights: [
        "Consistent color palettes",
        "Slower scene transitions",
        "Flat color regions",
        "Simple motion trajectories"
      ],
      contentComplexity: 0.5,
      temporalComplexity: 0.45,
      spatialComplexity: 0.6,
      steps: [
        { resolution: "240p", bitrate: 400, size: "180 MB/hour" },
        { resolution: "480p", bitrate: 1200, size: "540 MB/hour" },
        { resolution: "720p", bitrate: 2200, size: "990 MB/hour" },
        { resolution: "1080p", bitrate: 3800, size: "1.7 GB/hour" },
        { resolution: "4K", bitrate: 8000, size: "3.6 GB/hour" }
      ]
    },
    documentary: {
      title: "Documentary",
      description: "Static shots, talking heads, simple backgrounds",
      color: isDarkTheme ? "#2196f3" : "#1565c0", // Blue
      highlights: [
        "Static interview shots",
        "Minimal camera movement",
        "Simple backgrounds",
        "Fewer scene changes"
      ],
      contentComplexity: 0.3,
      temporalComplexity: 0.25,
      spatialComplexity: 0.4,
      steps: [
        { resolution: "240p", bitrate: 350, size: "158 MB/hour" },
        { resolution: "480p", bitrate: 1000, size: "450 MB/hour" },
        { resolution: "720p", bitrate: 1800, size: "810 MB/hour" },
        { resolution: "1080p", bitrate: 3000, size: "1.4 GB/hour" },
        { resolution: "4K", bitrate: 7000, size: "3.2 GB/hour" }
      ]
    }
  };

  const createVisualization = (container) => {
    // Theme-specific colors
    const colors = {
      text: isDarkTheme ? '#e0e0e0' : '#455a64',
      axes: isDarkTheme ? '#b0bec5' : '#607d8b',
      gridLines: isDarkTheme ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
      background: isDarkTheme ? '#2d2d2d' : '#f5f5f5',
      tooltip: isDarkTheme ? '#1a1a1a' : '#ffffff',
      tooltipBorder: isDarkTheme ? '#555555' : '#cccccc',
    };
    
    // Create an array from the content types
    const data = Object.values(contentTypes);
    
    // Chart dimensions - Increased height to allow more spacing
    const width = Math.min(900, window.innerWidth - 40);
    const height = isMobile ? 550 : 480; // Increased height
    const margin = { 
      top: 50, 
      right: isMobile ? 30 : 120, 
      bottom: 70, 
      left: isMobile ? 30 : 80 // Reduced left margin for mobile from 60 to 30
    };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // Create SVG container
    const svg = d3.select(container).append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "width: 100%; height: auto; font: 12px sans-serif;");
    
    // Add background rectangle
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", colors.background)
      .attr("rx", 10)
      .attr("ry", 10);
    
    // Create a group for the chart content
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // X scale (bitrate)
    const x = d3.scaleLinear()
      .domain([0, 16000])
      .range([0, innerWidth]);
    
    // Y scale (content types) - Increased padding between bands
    const y = d3.scaleBand()
      .domain(data.map(d => d.title))
      .range([0, innerHeight])
      .padding(0.8); // Increased padding from 0.4 to 0.5
    
    // Draw axes
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .attr("color", colors.axes)
      .call(d3.axisBottom(x).tickFormat(d => `${d/1000}Mbps`))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", colors.gridLines))
      .call(g => g.selectAll(".tick text").attr("fill", colors.text).attr("font-size", "12px"));
    
    // X-axis label
    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 40)
      .attr("fill", colors.text)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .text("Video Bitrate");
    
    // Left Y-axis (content types) - REMOVE LABELS, KEEP AXIS FOR STRUCTURE
    g.append("g")
      .attr("color", colors.axes)
      .call(d3.axisLeft(y).tickSize(0).tickFormat("")) // Remove tick labels
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").remove());
    
    // Draw vertical grid lines
    g.append("g")
      .selectAll("line")
      .data(x.ticks())
      .join("line")
      .attr("x1", d => x(d))
      .attr("x2", d => x(d))
      .attr("y1", 0)
      .attr("y2", innerHeight)
      .attr("stroke", colors.gridLines)
      .attr("stroke-width", 0.5);
    
    // Create tooltip div
    const tooltip = d3.select(container)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", colors.tooltip)
      .style("border", `1px solid ${colors.tooltipBorder}`)
      .style("border-radius", "8px")
      .style("padding", "10px")
      .style("box-shadow", "0 3px 14px rgba(0,0,0,0.2)")
      .style("pointer-events", "none")
      .style("font-size", "12px")
      .style("z-index", 100);

    // Tooltip functions - improved for more accurate positioning
    const showTooltip = (event, d) => {
      // Get the position of the bar relative to the container
      const barElement = event.currentTarget;
      const barRect = barElement.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      tooltip.transition()
        .duration(100)
        .style("opacity", 0.95);
      
      const contentType = Object.values(contentTypes).find(c => c.title === d.title);
      
      // Create responsive tooltip content
      const tooltipContent = isMobile ?
        `
        <div style="padding: 3px; font-weight: bold; color: ${contentType.color};">${contentType.title}</div>
        <div style="padding: 2px 3px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
            <span>Complexity:</span>
            <span style="font-weight: bold;">${Math.round(contentType.contentComplexity * 100)}%</span>
          </div>
        </div>
        ` :
        `
        <div style="padding: 5px; font-weight: bold; color: ${contentType.color};">${contentType.title}</div>
        <div style="padding: 3px 5px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <span>Temporal Complexity:</span>
            <span style="font-weight: bold;">${Math.round(contentType.temporalComplexity * 100)}%</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <span>Spatial Complexity:</span>
            <span style="font-weight: bold;">${Math.round(contentType.spatialComplexity * 100)}%</span>
          </div>
          <div style="display: flex; justify-content: space-between; border-top: 1px solid ${colors.tooltipBorder}; padding-top: 5px; margin-top: 5px;">
            <span>Overall Complexity:</span>
            <span style="font-weight: bold;">${Math.round(contentType.contentComplexity * 100)}%</span>
          </div>
        </div>
      `;
      
      tooltip.html(tooltipContent);

      // Calculate position relative to the bar
      const tooltipWidth = isMobile ? 160 : 240;
      const tooltipHeight = isMobile ? 60 : 120;
      
      // Position tooltip based on device type
      let xOffset, yOffset;
      
      if (isMobile) {
        // For mobile, position tooltip above the bar
        const barWidth = x(contentType.steps[contentType.steps.length - 1].bitrate);
        xOffset = barRect.left - containerRect.left + (barWidth / 2) - (tooltipWidth / 2);
        yOffset = barRect.top - containerRect.top - tooltipHeight - 10; // 10px gap above bar
        
        // If tooltip would go above the container, position it below the bar
        if (yOffset < 10) {
          yOffset = barRect.bottom - containerRect.top + 10;
        }
      } else {
        // For desktop, position to the right of the bar
        const barWidth = x(contentType.steps[contentType.steps.length - 1].bitrate);
        xOffset = barRect.left - containerRect.left + barWidth + 15; // 15px gap from bar
        yOffset = barRect.top - containerRect.top + (barRect.height / 2) - (tooltipHeight / 2);
      }
      
      // Keep tooltip within container bounds
      const rightEdge = containerRect.width;
      let finalXOffset = Math.max(10, xOffset);
      
      // If tooltip would go beyond the right edge, adjust position
      if (finalXOffset + tooltipWidth > rightEdge - 10) {
        if (isMobile) {
          // Center tooltip for mobile if it would go off-screen
          finalXOffset = Math.max(10, (containerRect.width / 2) - (tooltipWidth / 2));
        } else {
          // Place tooltip to the left of the bar for desktop
          finalXOffset = Math.max(10, barRect.left - containerRect.left - tooltipWidth - 15);
        }
      }
      
      tooltip
        .style("left", `${finalXOffset}px`)
        .style("top", `${yOffset}px`)
        .style("width", `${tooltipWidth}px`);
    };
    
    const hideTooltip = () => {
      tooltip.transition()
        .duration(300)
        .style("opacity", 0);
    };
    
    // Create a group for each content type
    const contentGroups = g.selectAll(".content-group")
      .data(data)
      .join("g")
      .attr("class", "content-group")
      .attr("transform", d => `translate(0,${y(d.title)})`)
      .on("mouseenter", showTooltip)  // Changed from mouseover to mouseenter
      .on("mouseleave", hideTooltip)  // Changed from mouseout to mouseleave
      .style("cursor", "pointer");
    
    // Draw bitrate ladder bars for each resolution with gradient fill
    contentGroups.each(function(contentType) {
      const group = d3.select(this);
      const barHeight = y.bandwidth();
      
      // Create gradient definitions
      const gradient = svg.append("defs")
        .append("linearGradient")
        .attr("id", `gradient-${contentType.title.replace(/\s+/g, '-').toLowerCase()}`)
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "0%");
      
      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", contentType.color)
        .attr("stop-opacity", 0.7);
      
      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", contentType.color)
        .attr("stop-opacity", 0.3);
      
      // Draw main bar representing total bitrate range
      group.append("rect")
        .attr("class", "bitrate-range")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", x(contentType.steps[contentType.steps.length - 1].bitrate))
        .attr("height", barHeight)
        .attr("fill", `url(#gradient-${contentType.title.replace(/\s+/g, '-').toLowerCase()})`)
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("opacity", 0.8);
      
      // Add resolution markers - Make markers smaller on mobile
      group.selectAll(".resolution-marker")
        .data(contentType.steps)
        .join("circle")
        .attr("class", "resolution-marker")
        .attr("cx", d => x(d.bitrate))
        .attr("cy", barHeight / 2)
        .attr("r", isMobile ? 4 : 6) // Smaller circles on mobile
        .attr("fill", "white")
        .attr("stroke", contentType.color)
        .attr("stroke-width", isMobile ? 1.5 : 2); // Thinner stroke on mobile
      
      // Add resolution labels with mobile optimizations
      group.selectAll(".resolution-label")
        .data(contentType.steps)
        .join("text")
        .attr("class", "resolution-label")
        .attr("x", d => x(d.bitrate))
        .attr("y", barHeight + 25)
        .attr("text-anchor", "middle")
        .attr("fill", colors.text)
        .attr("font-size", isMobile ? "9px" : "11px") // Smaller font on mobile
        .attr("font-weight", "bold")
        .style("opacity", function(d, i) {
          if (isMobile) {
            // On mobile, only show 240p, 720p, and 4K to reduce crowding
            return (i === 0 || i === 2 || i === contentType.steps.length - 1) ? 1 : 0;
          }
          return 1;
        })
        .text(d => d.resolution);
      
      // Add title indicator above the bar - adjust position slightly for mobile
      group.append("text")
        .attr("x", isMobile ? 2 : 5)
        .attr("y", -15)
        .attr("fill", contentType.color)
        .attr("font-size", isMobile ? "12px" : "14px") // Slightly smaller on mobile
        .attr("font-weight", "bold")
        .text(contentType.title);
      
      // Add overall compression efficiency text - adjust position for mobile
      const lastStep = contentType.steps[contentType.steps.length - 1];
      group.append("text")
        .attr("x", x(lastStep.bitrate) + (isMobile ? 5 : 10))
        .attr("y", barHeight / 2 + 5)
        .attr("fill", colors.text)
        .attr("font-size", isMobile ? "10px" : "12px")
        .attr("font-style", "italic")
        .text(`${isMobile ? "" : "4K = "}${lastStep.size}`);
    });
    
    // Title with adjusted position for mobile
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .attr("font-size", isMobile ? "16px" : "18px") // Slightly smaller for mobile
      .attr("font-weight", "bold")
      .attr("fill", colors.text)
      .attr("dy", isMobile ? "0.3em" : "0") // Add a little vertical adjustment on mobile
      .text(isMobile ? "Netflix's Per-Title Encoding" : "Netflix's Per-Title Encoding Optimization") // Shorter title on mobile
      .append("tspan") // Add a second line for mobile
      .attr("x", width / 2)
      .attr("dy", isMobile ? "1.2em" : 0) // Line height for the second line
      .attr("text-anchor", "middle")
      .attr("font-size", isMobile ? "16px" : "0") // Only show on mobile
      .attr("font-weight", "bold")
      .text(isMobile ? "Optimization" : ""); // Second part of title only on mobile
    
    // Add information text
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 15)
      .attr("text-anchor", "middle")
      .attr("font-size", "13px")
      .attr("fill", colors.text)
      .attr("font-style", "italic")
      .text("Hover over content types to see complexity metrics");
  };
  
  // Don't render anything until component is mounted to avoid hydration issues
  if (!mounted) return null;
  
  return (
    <div className="per-title-encoding-demo">
      <div className="chart-container" ref={chartRef}></div>
      <div className="explanation">
        <p>Netflix analyzes each title individually to create custom encoding profiles that optimize both quality and file size:</p>
        <ul>
          <li><strong>Action movies</strong> need higher bitrates because fast motion and complex scenes are harder to compress efficiently.</li>
          <li><strong>Animated films</strong> like "Grave of the Fireflies" can achieve excellent quality at lower bitrates due to simpler motion patterns and consistent visual elements.</li>
          <li><strong>Documentaries</strong> with static shots and minimal movement compress most efficiently, requiring the lowest bitrates.</li>
        </ul>
        <p>This per-title approach means Netflix can deliver consistent quality while using 20-40% less bandwidth compared to fixed bitrate ladders.</p>
      </div>
    </div>
  );
}

export default PerTitleEncodingDemo;
