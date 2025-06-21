"use client";

import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import * as d3 from "d3";

const DataEvolutionTimeline = () => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 900, height: 500 });
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Get current theme state
  const isDarkTheme = resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const isMobile = containerWidth < 768;
        const width = Math.min(1200, containerWidth - (isMobile ? 20 : 40));
        setDimensions({
          width: width,
          height: Math.max(isMobile ? 400 : 500, width * (isMobile ? 0.6 : 0.5)),
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define the data points organized by era for better visualization
  const evolutionEra = [
    { year: -300000, label: "Language", value: 0.000001, milestone: true },
    { year: -100000, label: "Complex Language", value: 0.000001 },
    { year: -40000, label: "Cave Art", value: 0.000001 },
    { year: -5000, label: "Writing", value: 0.000001, milestone: true },
    { year: 1440, label: "Printing Press", value: 0.00001, milestone: true },
  ];

  const digitalEra = [
    { year: 1844, label: "Telegraph", value: 0.0001 },
    { year: 1876, label: "Telephone", value: 0.0001 },
    { year: 1927, label: "Television", value: 0.001 },
    { year: 1969, label: "Internet", value: 0.01, milestone: true },
    { year: 1991, label: "World Wide Web", value: 0.1, milestone: true },
    { year: 2004, label: "Social Media", value: 0.5 },
    { year: 2007, label: "iPhone", value: 1 },
  ];

  const dataEra = [
    { year: 2010, label: "2 ZB Created", value: 2, milestone: true, type: 'data' },
    { year: 2015, label: "15.5 ZB", value: 15.5, milestone: true, type: 'data' },
    { year: 2020, label: "64.2 ZB", value: 64.2, milestone: true, type: 'data' },
    { year: 2023, label: "120 ZB", value: 120, milestone: true, type: 'data' },
    { year: 2025, label: "181 ZB", value: 181, milestone: true, type: 'data' },
  ];

  // Combine all data points
  const dataPoints = [...evolutionEra, ...digitalEra, ...dataEra];

  useEffect(() => {
    if (!svgRef.current || !mounted) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const { width, height } = dimensions;
    const isMobile = width < 768;
    const margin = { 
      top: 80, 
      right: isMobile ? 40 : 80, 
      bottom: isMobile ? 80 : 100, 
      left: isMobile ? 40 : 60 
    };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Theme-specific colors - matching FeaturedArticle monotone theme
    const colors = {
      text: isDarkTheme ? '#ffffff' : '#000000',
      textSecondary: isDarkTheme ? '#9ca3af' : '#6b7280',
      textTertiary: isDarkTheme ? '#6b7280' : '#9ca3af',
      background: isDarkTheme ? '#000000' : '#ffffff',
      line: isDarkTheme ? '#ffffff' : '#000000',
      gridLines: isDarkTheme ? '#374151' : '#e5e7eb',
      axisLines: isDarkTheme ? '#6b7280' : '#d1d5db',
      border: isDarkTheme ? '#374151' : '#e5e7eb',
    };

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background", colors.background);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Group data points into three distinct eras with proper spacing
    const evolutionData = dataPoints.filter(d => d.year <= 1969);
    const digitalData = dataPoints.filter(d => d.year > 1969 && d.year < 2010);
    const dataExplosionData = dataPoints.filter(d => d.year >= 2010);

    // Create three sections with better spacing - give more room to data explosion
    const evolutionWidth = innerWidth * 0.28;  // 28% for evolution
    const digitalWidth = innerWidth * 0.32;    // 32% for digital era
    const dataWidth = innerWidth * 0.40;       // 40% for data explosion
    
    const sectionPadding = 20;
    
    // Position calculations
    const evolutionStart = 0;
    const digitalStart = evolutionWidth + sectionPadding;
    const dataStart = digitalStart + digitalWidth + sectionPadding;

    // Create scales for each section with more breathing room for data era
    const evolutionScale = d3.scaleLinear()
      .domain([-300000, 1969])
      .range([evolutionStart + 20, evolutionStart + evolutionWidth - 20]);

    const digitalScale = d3.scaleLinear()
      .domain([1969, 2010])
      .range([digitalStart + 20, digitalStart + digitalWidth - 20]);

    const dataScale = d3.scaleLinear()
      .domain([2010, 2025])
      .range([dataStart + 20, dataStart + dataWidth - 20]);

    // Y scale for data values (logarithmic for the dramatic change)
    const yScale = d3.scaleLog()
      .domain([0.000001, 181])
      .range([innerHeight - 40, 40]);

    // Helper function to get x position based on era
    const getX = (d) => {
      if (d.year <= 1969) return evolutionScale(d.year);
      if (d.year < 2010) return digitalScale(d.year);
      return dataScale(d.year);
    };

    // Draw section dividers
    g.append("line")
      .attr("x1", digitalStart - 10)
      .attr("x2", digitalStart - 10)
      .attr("y1", 0)
      .attr("y2", innerHeight)
      .attr("stroke", colors.gridLines)
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "3,3")
      .attr("opacity", 0.5);

    g.append("line")
      .attr("x1", dataStart - 10)
      .attr("x2", dataStart - 10)
      .attr("y1", 0)
      .attr("y2", innerHeight)
      .attr("stroke", colors.gridLines)
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "3,3")
      .attr("opacity", 0.5);

    // Add section headers
    g.append("text")
      .attr("x", evolutionStart + evolutionWidth / 2)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .attr("fill", colors.text)
      .attr("font-size", isMobile ? "12px" : "14px")
      .attr("font-weight", "600")
      .attr("letter-spacing", "0.5px")
      .attr("font-family", "ui-monospace, SFMono-Regular, 'SF Mono', monospace")
      .text(isMobile ? "300K YRS" : "300,000 YEARS");

    g.append("text")
      .attr("x", digitalStart + digitalWidth / 2)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .attr("fill", colors.text)
      .attr("font-size", isMobile ? "12px" : "14px")
      .attr("font-weight", "600")
      .attr("letter-spacing", "0.5px")
      .attr("font-family", "ui-monospace, SFMono-Regular, 'SF Mono', monospace")
      .text(isMobile ? "DIGITAL" : "DIGITAL FOUNDATION");

    g.append("text")
      .attr("x", dataStart + dataWidth / 2)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .attr("fill", colors.text)
      .attr("font-size", isMobile ? "12px" : "14px")
      .attr("font-weight", "600")
      .attr("letter-spacing", "0.5px")
      .attr("font-family", "ui-monospace, SFMono-Regular, 'SF Mono', monospace")
      .text("15 YEARS");

    g.append("text")
      .attr("x", evolutionStart + evolutionWidth / 2)
      .attr("y", -5)
      .attr("text-anchor", "middle")
      .attr("fill", colors.textSecondary)
      .attr("font-size", isMobile ? "8px" : "10px")
      .attr("font-family", "ui-monospace, SFMono-Regular, 'SF Mono', monospace")
      .text("Evolution");

    g.append("text")
      .attr("x", digitalStart + digitalWidth / 2)
      .attr("y", -5)
      .attr("text-anchor", "middle")
      .attr("fill", colors.textSecondary)
      .attr("font-size", isMobile ? "8px" : "10px")
      .attr("font-family", "ui-monospace, SFMono-Regular, 'SF Mono', monospace")
      .text("1969 - 2010");

    g.append("text")
      .attr("x", dataStart + dataWidth / 2)
      .attr("y", -5)
      .attr("text-anchor", "middle")
      .attr("fill", colors.textSecondary)
      .attr("font-size", isMobile ? "8px" : "10px")
      .attr("font-family", "ui-monospace, SFMono-Regular, 'SF Mono', monospace")
      .text("2010 - 2025");

    // Draw timeline base
    g.append("line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", innerHeight - 20)
      .attr("y2", innerHeight - 20)
      .attr("stroke", colors.axisLines)
      .attr("stroke-width", 2);

    // Create lines for each section
    [evolutionData, digitalData, dataExplosionData].forEach((sectionData) => {
      if (sectionData.length > 1) {
        const line = d3.line()
          .x(d => getX(d))
          .y(d => yScale(d.value))
          .curve(d3.curveMonotoneX);

        g.append("path")
          .datum(sectionData)
          .attr("fill", "none")
          .attr("stroke", colors.text)
          .attr("stroke-width", 2)
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("d", line);
      }
    });

    // Add data points
    const circles = g.selectAll(".data-point")
      .data(dataPoints)
      .enter()
      .append("circle")
      .attr("class", "data-point")
      .attr("cx", d => getX(d))
      .attr("cy", d => yScale(d.value))
      .attr("r", d => d.milestone ? (isMobile ? 4 : 5) : (isMobile ? 2 : 3))
      .attr("fill", colors.text)
      .attr("stroke", colors.background)
      .attr("stroke-width", isMobile ? 1 : 2)
      .style("cursor", "pointer");

    // Define key milestones to show labels for (to avoid overlap) - reduced further
    const keyMilestones = isMobile ? ['Language', 'Internet'] : ['Language', 'Writing', 'Internet'];
    
    // Add timeline markers for key points
    dataPoints.filter(d => d.milestone).forEach((d, index) => {
      const x = getX(d);
      
      // Vertical line to timeline
      g.append("line")
        .attr("x1", x)
        .attr("x2", x)
        .attr("y1", yScale(d.value) + (d.milestone ? (isMobile ? 4 : 5) : (isMobile ? 2 : 3)) + 2)
        .attr("y2", innerHeight - 20)
        .attr("stroke", colors.textTertiary)
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "2,2")
        .attr("opacity", 0.6);

      // Timeline dot
      g.append("circle")
        .attr("cx", x)
        .attr("cy", innerHeight - 20)
        .attr("r", isMobile ? 2 : 3)
        .attr("fill", colors.text)
        .attr("stroke", colors.background)
        .attr("stroke-width", 1);

      // Special handling for data explosion era - add floating labels above points
      if (d.type === 'data') {
        const labelY = yScale(d.value) - 15 - (index % 2 === 0 ? (isMobile ? 5 : 10) : 0); // Stagger heights
        
        // Add background for label - shorter labels
        let labelText;
        if (isMobile) {
          labelText = d.label.replace(' Created', '').replace(' ZB', '').replace('ZB', '');
          if (labelText.includes('.')) labelText = labelText.split('.')[0] + '+';
        } else {
          labelText = d.label.replace(' Created', '');
        }
        const textWidth = labelText.length * (isMobile ? 2.5 : 4); // Approximate width
        
        g.append("rect")
          .attr("x", x - textWidth / 2)
          .attr("y", labelY - (isMobile ? 8 : 10))
          .attr("width", textWidth)
          .attr("height", isMobile ? 10 : 12)
          .attr("fill", colors.background)
          .attr("stroke", colors.border)
          .attr("stroke-width", 0.5)
          .attr("rx", 2);
        
        g.append("text")
          .attr("x", x)
          .attr("y", labelY - (isMobile ? 1 : 2))
          .attr("text-anchor", "middle")
          .attr("fill", colors.text)
          .attr("font-size", isMobile ? "5px" : "8px")
          .attr("font-weight", "600")
          .attr("font-family", "ui-monospace, SFMono-Regular, 'SF Mono', monospace")
          .text(labelText);
      }

      // Label below timeline for major milestones only - avoid overlap
      if (d.type === 'data') {
        // Only show every other year for data points to reduce overlap
        if (index % 2 === 0 || d.year === 2025) {
          g.append("text")
            .attr("x", x)
            .attr("y", innerHeight + (isMobile ? 12 : 15))
            .attr("text-anchor", "middle")
            .attr("fill", colors.textSecondary)
            .attr("font-size", isMobile ? "5px" : "7px")
            .attr("font-family", "ui-monospace, SFMono-Regular, 'SF Mono', monospace")
            .text(d.year);
        }
      } else if (keyMilestones.includes(d.label)) {
        // Only show labels for key milestones to avoid overlap
        const labelText = isMobile ? d.label.substring(0, 3) : d.label.split(' ')[0].substring(0, 6);
        g.append("text")
          .attr("x", x)
          .attr("y", innerHeight + (isMobile ? 12 : 15))
          .attr("text-anchor", "middle")
          .attr("fill", colors.textSecondary)
          .attr("font-size", isMobile ? "6px" : "9px")
          .attr("font-family", "ui-monospace, SFMono-Regular, 'SF Mono', monospace")
          .text(labelText);
      }
    });

    // Add Y-axis for data values (only on the right side of data section)
    const dataYValues = [0.000001, 0.01, 1, 10, 50, 100, 181];
    
    dataYValues.forEach(value => {
      const y = yScale(value);
      
      // Horizontal grid line only in data section
      g.append("line")
        .attr("x1", dataStart - 10)
        .attr("x2", dataStart + dataWidth)
        .attr("y1", y)
        .attr("y2", y)
        .attr("stroke", colors.gridLines)
        .attr("stroke-width", 0.5)
        .attr("opacity", 0.3);

      // Y-axis label
      if (value >= 1) {
        g.append("text")
          .attr("x", dataStart + dataWidth + (isMobile ? 5 : 10))
          .attr("y", y + 3)
          .attr("fill", colors.textSecondary)
          .attr("font-size", isMobile ? "8px" : "10px")
          .attr("font-family", "ui-monospace, SFMono-Regular, 'SF Mono', monospace")
          .text(isMobile && value >= 100 ? `${value}` : value >= 100 ? `${value} ZB` : `${value} ZB`);
      }
    });

    // Add Y-axis title
    g.append("text")
      .attr("transform", `rotate(-90, ${dataStart + dataWidth + (isMobile ? 25 : 35)}, ${innerHeight / 2})`)
      .attr("x", dataStart + dataWidth + (isMobile ? 25 : 35))
      .attr("y", innerHeight / 2)
      .attr("text-anchor", "middle")
      .attr("fill", colors.text)
      .attr("font-size", isMobile ? "10px" : "12px")
      .attr("font-weight", "500")
      .text(isMobile ? "ZB" : "Data (ZB)");

    // Add hover tooltips
    const tooltip = d3.select("body").append("div")
      .attr("class", "chart-tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", colors.background)
      .style("border", `1px solid ${colors.border}`)
      .style("border-radius", "4px")
      .style("padding", "8px 12px")
      .style("font-size", "12px")
      .style("color", colors.text)
      .style("box-shadow", isDarkTheme ? "0 4px 6px -1px rgba(0, 0, 0, 0.3)" : "0 4px 6px -1px rgba(0, 0, 0, 0.1)")
      .style("z-index", "1000")
      .style("font-family", "ui-monospace, SFMono-Regular, 'SF Mono', monospace");

    circles
      .on("mouseover", function(event, d) {
        d3.select(this)
          .attr("r", d => d.milestone ? (isMobile ? 6 : 7) : (isMobile ? 4 : 5))
          .attr("stroke-width", isMobile ? 2 : 3);
        
        let tooltipContent = `<div style="font-weight: 600; margin-bottom: 2px; font-family: ui-sans-serif, system-ui, sans-serif; font-size: ${isMobile ? '11px' : '12px'};">${d.label}</div>`;
        tooltipContent += `<div style="color: ${colors.textSecondary}; font-size: ${isMobile ? '9px' : '11px'};">${d.year < 0 ? Math.abs(d.year) + ' BCE' : d.year + ' CE'}</div>`;
        if (d.type === 'data') {
          tooltipContent += `<div style="font-weight: 500; margin-top: 2px; font-size: ${isMobile ? '9px' : '11px'};">${d.value} Zettabytes</div>`;
        }
        
        tooltip
          .style("visibility", "visible")
          .html(tooltipContent);
      })
      .on("mousemove", function(event) {
        tooltip
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", function(event, d) {
        d3.select(this)
          .attr("r", d => d.milestone ? (isMobile ? 4 : 5) : (isMobile ? 2 : 3))
          .attr("stroke-width", isMobile ? 1 : 2);
        
        tooltip.style("visibility", "hidden");
      });

    // Text wrapping function
    function wrap(text, width) {
      text.each(function() {
        const text = d3.select(this);
        const words = text.text().split(/\s+/).reverse();
        let word;
        let line = [];
        let lineNumber = 0;
        const lineHeight = 1.1; // ems
        const y = text.attr("y");
        const dy = parseFloat(text.attr("dy")) || 0;
        let tspan = text.text(null).append("tspan").attr("x", text.attr("x")).attr("y", y).attr("dy", dy + "em");
        
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", text.attr("x")).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
        }
      });
    }

    return () => {
      tooltip.remove();
    };

  }, [dimensions, resolvedTheme, mounted]);

  // Don't render anything until component is mounted to avoid hydration issues
  if (!mounted) {
    return <div className="w-full h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"></div>;
  }

  return (
    <div ref={containerRef} className="w-full my-8 md:my-16 px-4 md:px-0">
      {/* Header section matching FeaturedArticle style */}
      <div className="text-center mb-8 md:mb-12">
        <div className="inline-flex items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500 dark:text-gray-400 font-mono mb-4">
          <div className="h-px w-4 md:w-8 bg-current" />
          <span>DATA VISUALIZATION</span>
          <div className="h-px w-4 md:w-8 bg-current" />
        </div>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-black dark:text-white mb-4 md:mb-6">
          THE GREAT ACCELERATION
        </h3>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
          From the first spoken word to 181 zettabytes of digital data—visualizing humanity's exponential leap into the information age
        </p>
      </div>
      
      <div className="flex justify-center items-center mb-6 md:mb-8">
        <svg 
          ref={svgRef} 
          className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-black w-full max-w-full"
        />
      </div>

      <div className="text-center text-gray-500 dark:text-gray-400 space-y-2 px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-xs md:text-sm font-mono">
          <span><strong className="text-black dark:text-white">300,000 years</strong> of evolution</span>
          <div className="w-8 h-px bg-current hidden md:block" />
          <span><strong className="text-black dark:text-white">15 years</strong> of data explosion</span>
        </div>
        <p className="text-xs mt-4">
          Hover over data points to explore each milestone • Logarithmic scale to show dramatic acceleration
        </p>
      </div>
    </div>
  );
};

export default DataEvolutionTimeline;
