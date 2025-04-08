"use client"

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const NetflixEncodingVersions = () => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [data, setData] = useState([]);
  
  // Constants for data generation
  const numVersions = 1200;
  const codecs = ['AV1', 'VP9', 'H264', 'HEVC'];
  const resolutions = ['240p', '360p', '480p', '720p', '1080p', '1440p', '4K', '8K'];
  const audioLanguages = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Mandarin'];
  const subtitleLanguages = ['None', 'English', 'Spanish', 'French', 'German', 'Japanese', 'Mandarin'];
  
  // New color palette
  const colorPalette = ['#e63946', '#457b9d', '#1d3557', '#000000', '#a8dadc', '#ee6c4d', '#293241', '#3d5a80'];

  // Keep track of previous data for animations
  const previousDataRef = useRef([]);

  // Function to generate random data
  const generateData = () => {
    const newData = [];
    for (let i = 0; i < numVersions; i++) {
      newData.push({
        codec: codecs[Math.floor(Math.random() * codecs.length)],
        resolution: resolutions[Math.floor(Math.random() * resolutions.length)],
        audio: audioLanguages[Math.floor(Math.random() * audioLanguages.length)],
        subtitles: subtitleLanguages[Math.floor(Math.random() * subtitleLanguages.length)],
        index: i,
      });
    }
    return newData;
  };

  // Initialize data
  useEffect(() => {
    setData(generateData());
  }, []);
  
  useEffect(() => {
    // Function to handle resize
    const handleResize = () => {
      if (containerRef.current) {
        const width = Math.min(800, containerRef.current.offsetWidth);
        setDimensions({
          width: width,
          height: width * 0.75, // Maintain aspect ratio
        });
      }
    };

    // Initial size
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to determine dot size
  const getDotSize = (resolution) => {
    switch (resolution) {
      case '240p': return 2;
      case '360p': return 3;
      case '480p': return 4;
      case '720p': return 5;
      case '1080p': return 6;
      case '1440p': return 7;
      case '4K': return 8;
      case '8K': return 9;
      default: return 4;
    }
  };

  // Create a circle for each data point
  const createCircle = (svg, data, x, y, codecColorScale) => {
    return svg.append("circle")
      .attr("class", "version-item")
      .attr("cx", x(data.index % 40))
      .attr("cy", y(Math.floor(data.index / 40)))
      .attr("r", getDotSize(data.resolution))
      .attr("fill", codecColorScale(data.codec))
      .attr("data-index", data.index)
      .attr("data-original-r", getDotSize(data.resolution)) // Store original radius for animation
      .style("cursor", "pointer")
      .attr("stroke", "#d1d5db")
      .attr("stroke-width", 0.5);
  };

  // Randomize data with animation
  const randomizeData = () => {
    // Store current data for animation
    previousDataRef.current = [...data];
    
    // Generate new data and update state
    setData(generateData());
  };

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    // Clear previous visualization
    d3.select(svgRef.current).selectAll("*").remove();

    const { width, height } = dimensions;
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Scales with increased padding for more gap between shapes
    const x = d3.scaleBand()
      .domain(Array.from({length: 40}, (_, i) => i))
      .range([0, innerWidth])
      .padding(0.25);
      
    const y = d3.scaleBand()
      .domain(Array.from({length: 30}, (_, i) => i))
      .range([0, innerHeight])
      .padding(0.25);

    // Use the new color palette
    const codecColorScale = d3.scaleOrdinal()
      .domain(codecs)
      .range(colorPalette);

    // Animation function
    const animateCircle = (circle, d, previousData) => {
      if (previousData.length === 0) return; // Skip animation if no previous data
      
      // Find matching circle from previous data by index
      const previousIndex = data.findIndex(item => item.index === d.index);
      
      if (previousIndex >= 0 && previousIndex < previousData.length) {
        const prevItem = previousData[previousIndex];
        
        // Set initial position from previous data
        circle
          .attr("cx", x(prevItem.index % 40))
          .attr("cy", y(Math.floor(prevItem.index / 40)))
          .attr("r", getDotSize(prevItem.resolution))
          .attr("fill", codecColorScale(prevItem.codec));
        
        // Animate to new position
        circle.transition()
          .duration(1000)
          .ease(d3.easeCubicInOut)
          .attr("cx", x(d.index % 40))
          .attr("cy", y(Math.floor(d.index / 40)))
          .attr("r", getDotSize(d.resolution))
          .attr("fill", codecColorScale(d.codec));
      }
    };

    // Create circles for each data point
    data.forEach((d, i) => {
      const circle = createCircle(svg, d, x, y, codecColorScale);
      
      // Apply animation if we have previous data
      if (previousDataRef.current.length > 0) {
        animateCircle(circle, d, previousDataRef.current);
      }
      
      circle.on("mouseover", function(event) {
        // Scale up the dot on hover with animation
        const originalRadius = +d3.select(this).attr("data-original-r");
        
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", originalRadius * 1.6) // Scale up by 60%
          .attr("stroke-width", 1.2);
        
        // Fix: Use the current event
        const [mouseX, mouseY] = d3.pointer(event);
        
        // Get the SVG position to calculate absolute position
        const svgRect = svgRef.current.getBoundingClientRect();
        const absoluteX = svgRect.left + mouseX + margin.left;
        const absoluteY = svgRect.top + mouseY + margin.top;
        
        setTooltipData({
          resolution: d.resolution,
          codec: d.codec,
          audio: d.audio,
          subtitles: d.subtitles
        });
        
        setTooltipPosition({ 
          x: absoluteX, 
          y: absoluteY 
        });
      })
      .on("mouseout", function() {
        // Return to original size on mouseout with animation
        const originalRadius = +d3.select(this).attr("data-original-r");
        
        d3.select(this)
          .transition()
          .duration(300)
          .attr("r", originalRadius)
          .attr("stroke-width", 0.5);
          
        setTooltipData(null);
      })
      .on("click", () => {
        randomizeData();
      });
    });

    // Add a more prominent randomize button
    svg.append("rect")
      .attr("x", innerWidth / 2 - 60)  // Center the button
      .attr("y", innerHeight - 40)     // Position it near the bottom
      .attr("width", 120)              // Make it wider
      .attr("height", 35)              // Make it taller
      .attr("rx", 8)                   // Rounded corners
      .attr("fill", "#000000")         // Indigo color for visibility
      .attr("stroke", "#1a1a1a")       // Darker border
      .attr("stroke-width", 1.5)
      .style("cursor", "pointer")
      .style("filter", "drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.2))")  // Add shadow
      .on("click", randomizeData)
      .on("mouseover", function() {
        d3.select(this).attr("fill", "#292929"); // Lighter on hover
      })
      .on("mouseout", function() {
        d3.select(this).attr("fill", "#000000"); // Back to original
      });

    svg.append("text")
      .attr("x", innerWidth / 2)       // Center the text
      .attr("y", innerHeight - 18)     // Position it vertically in the button
      .attr("text-anchor", "middle")
      .attr("fill", "white")           // White text for contrast
      .attr("font-weight", "bold")
      .style("font-size", "14px")      // Larger font size
      .style("pointer-events", "none") // Prevent text from interfering with clicks
      .text("Randomize")
      .on("click", randomizeData);

    // Legends have been removed - now we're only showing values on hover

  }, [dimensions, data]);

  return (
    <div ref={containerRef} style={{ width: '100%', position: 'relative' }}>
      <div style={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: '2rem',
        position: 'relative' // Add position relative for tooltip positioning
      }}>
        <svg 
          ref={svgRef} 
          style={{ 
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            backgroundColor: 'white'
          }}
        />
        
        {/* Fix: Move tooltip here and adjust positioning */}
        {tooltipData && (
          <div 
            style={{
              position: 'absolute',
              top: tooltipPosition.y - svgRef.current?.getBoundingClientRect().top - 70,
              left: tooltipPosition.x - svgRef.current?.getBoundingClientRect().left + 10,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e5e7eb',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
              pointerEvents: 'none',
              color: '#374151',
              zIndex: 1000,
              minWidth: '150px'
            }}
          >
            <div style={{ fontWeight: 600 }}>{tooltipData.resolution}, {tooltipData.codec}</div>
            <div>Audio: {tooltipData.audio}</div>
            <div>Subtitles: {tooltipData.subtitles}</div>
          </div>
        )}
      </div>
      
      {/* Remove duplicate tooltip that was here */}
      
      <div style={{ 
        marginTop: '1rem', 
        textAlign: 'center', 
        color: '#6b7280', 
        fontSize: '0.875rem'
      }}>
        Behind every Play button is a buffet of 1,200 hand-prepared variations — your device just picks the perfect bite.
      </div>
    </div>
  );
};

export default NetflixEncodingVersions;
