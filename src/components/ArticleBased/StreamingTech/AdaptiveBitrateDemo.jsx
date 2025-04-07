"use client"

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { useTheme } from 'next-themes';
import './AdaptiveBitrateDemo.css';

function AdaptiveBitrateDemo() {
  const chartRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const { theme, resolvedTheme } = useTheme();
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
      
      // Create adaptive bitrate streaming visualization
      if (isMobile) {
        createMobileABRVisualization(chartRef.current);
      } else {
        createABRVisualization(chartRef.current);
      }
    }
  }, [isMobile, resolvedTheme, mounted]);
  
  const checkIfMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };
  
  // Mobile-friendly visualization
  const createMobileABRVisualization = (container) => {
    // Sample data
    const data = generateABRData();
    
    // Theme-specific colors
    const colors = {
      text: isDarkTheme ? '#e0e0e0' : '#455a64',
      axes: isDarkTheme ? '#b0bec5' : '#607d8b',
      gridLines: isDarkTheme ? 'var(--grid-lines-dark)' : 'var(--grid-lines-light)',
      bandwidthFill: isDarkTheme ? 'var(--bandwidth-area-dark)' : 'var(--bandwidth-area-light)',
      qualityLine: isDarkTheme ? 'var(--quality-line-dark)' : 'var(--quality-line-light)',
      qualityLabels: isDarkTheme ? '#81d4fa' : '#0277bd',
    };
    
    // Simplified dimensions for mobile
    const width = window.innerWidth;
    const height = 300;
    const margin = { top: 20, right: 40, bottom: 40, left: 40 };
    
    // Create SVG
    const svg = d3.select(container).append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "width: 100%; height: auto; font: 12px sans-serif;")
      .attr("class", isDarkTheme ? "dark-theme" : "light-theme");
      
    // X scale (time segments)
    const x = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([margin.left, width - margin.right]);
    
    // Y scale (bitrate)
    const y = d3.scaleLinear()
      .domain([0, 5000])
      .range([height - margin.bottom, margin.top]);
    
    // Draw axes
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .attr("color", colors.axes)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d => `${d*5}s`));
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .attr("color", colors.axes)
      .call(d3.axisLeft(y).tickValues([800, 1800, 3000, 4500]).tickFormat(d => `${d/1000}Mbps`));
    
    // Quality threshold lines
    const qualityLevels = [
      { rate: 800, label: "240p" },
      { rate: 1800, label: "480p" },
      { rate: 3000, label: "720p" },
      { rate: 4500, label: "1080p" }
    ];
    
    svg.append("g")
      .selectAll("line")
      .data(qualityLevels)
      .join("line")
      .attr("x1", margin.left)
      .attr("x2", width - margin.right)
      .attr("y1", d => y(d.rate))
      .attr("y2", d => y(d.rate))
      .attr("stroke", colors.gridLines)
      .attr("stroke-dasharray", "3,3");
    
    // Quality labels
    svg.append("g")
      .selectAll("text")
      .data(qualityLevels)
      .join("text")
      .attr("x", width - margin.right + 5)
      .attr("y", d => y(d.rate) + 4)
      .attr("font-size", "10px")
      .attr("text-anchor", "start")
      .attr("fill", colors.text)
      .text(d => d.label);
    
    // Create bandwidth area
    const bandwidthArea = d3.area()
      .x((d, i) => x(i))
      .y0(d => y(d.minBandwidth))
      .y1(d => y(d.maxBandwidth))
      .curve(d3.curveMonotoneX);
    
    svg.append("path")
      .datum(data)
      .attr("fill", colors.bandwidthFill)
      .attr("class", "bandwidth-area")
      .attr("d", bandwidthArea);
    
    // Create selected quality line
    const qualityLine = d3.line()
      .x((d, i) => x(i))
      .y(d => y(d.selectedQuality))
      .curve(d3.curveMonotoneX);
    
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", colors.qualityLine)
      .attr("stroke-width", 3)
      .attr("class", "quality-line")
      .attr("d", qualityLine);
    
    // Title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .attr("fill", colors.text)
      .text("Adaptive Bitrate Streaming");
  };
  
  const createABRVisualization = (container) => {
    // Chart dimensions
    const width = Math.min(800, window.innerWidth - 40);
    const height = width;
    const margin = 20;
    const innerRadius = width / 5;
    const outerRadius = width / 2 - margin;
    
    // Theme-specific colors
    const colors = {
      text: isDarkTheme ? '#e0e0e0' : '#455a64',
      circleBorder: isDarkTheme ? 'rgba(255, 255, 255, 0.3)' : 'rgba(38, 50, 56, 0.2)',
      centerCircle: isDarkTheme ? 'rgba(30, 30, 30, 0.85)' : 'rgba(255, 255, 255, 0.85)',
      centerBorder: isDarkTheme ? '#546e7a' : '#cfd8dc',
      segmentLines: isDarkTheme ? 'var(--grid-lines-dark)' : 'var(--grid-lines-light)',
      bandwidthFill: isDarkTheme ? 'var(--bandwidth-area-dark)' : 'var(--bandwidth-area-light)',
      qualityLine: isDarkTheme ? 'var(--quality-line-dark)' : 'var(--quality-line-light)',
      qualityLabels: isDarkTheme ? '#81d4fa' : '#0277bd',
    };
    
    // Create sample data
    const data = generateABRData();
    
    // Set up scales
    const x = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 2 * Math.PI]);
    
    const y = d3.scaleRadial()
      .domain([0, 4500]) // Kbps range
      .range([innerRadius, outerRadius]);
    
    // Create SVG container
    const svg = d3.select(container).append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "width: 100%; height: auto; font: 12px sans-serif;")
      .attr("class", isDarkTheme ? "dark-theme" : "light-theme")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round");
    
    // Add background circles for bitrate levels
    const bitrateLabels = [
      { rate: 800, label: "240p (800 Kbps)" },
      { rate: 1800, label: "480p (1800 Kbps)" },
      { rate: 3000, label: "720p (3000 Kbps)" },
      { rate: 4500, label: "1080p (4500 Kbps)" }
    ];
    
    // Add circles for each quality tier
    svg.append("g")
      .attr("class", "bitrate-circles")
      .selectAll("circle")
      .data(bitrateLabels)
      .join("circle")
      .attr("fill", "none")
      .attr("stroke", colors.circleBorder)
      .attr("r", d => y(d.rate))
      .attr("stroke-dasharray", "5,5");
    
    // Add labels for quality tiers
    svg.append("g")
      .attr("class", "bitrate-labels")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(bitrateLabels)
      .join("text")
      .attr("y", d => -y(d.rate) - 10)
      .attr("fill", colors.qualityLabels)
      .attr("font-weight", "bold")
      .text(d => d.label);
    
    // Create area for available bandwidth
    const bandwidthArea = d3.areaRadial()
      .curve(d3.curveCardinalClosed)
      .angle((d, i) => x(i))
      .innerRadius(d => y(d.minBandwidth))
      .outerRadius(d => y(d.maxBandwidth));
    
    // Create line for selected bitrate
    const selectedQualityLine = d3.lineRadial()
      .curve(d3.curveCardinalClosed)
      .angle((d, i) => x(i))
      .radius(d => y(d.selectedQuality));
    
    // Draw available bandwidth area
    svg.append("path")
      .attr("class", "bandwidth-area")
      .attr("fill", colors.bandwidthFill)
      .attr("d", bandwidthArea(data));
    
    // Draw selected quality line
    svg.append("path")
      .attr("class", "quality-line")
      .attr("fill", "none")
      .attr("stroke", colors.qualityLine)
      .attr("stroke-width", 3)
      .attr("d", selectedQualityLine(data));
    
    // Add time segments
    svg.append("g")
      .attr("class", "time-segments")
      .selectAll("line")
      .data(data)
      .join("line")
      .attr("stroke", colors.segmentLines)
      .attr("x1", (d, i) => Math.cos(x(i)) * innerRadius)
      .attr("y1", (d, i) => Math.sin(x(i)) * innerRadius)
      .attr("x2", (d, i) => Math.cos(x(i)) * outerRadius)
      .attr("y2", (d, i) => Math.sin(x(i)) * outerRadius);
    
    // Add center circle with explanation
    svg.append("circle")
      .attr("fill", colors.centerCircle)
      .attr("stroke", colors.centerBorder)
      .attr("r", innerRadius - 10);
    
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", -30)
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .attr("fill", colors.text)
      .text("Adaptive Bitrate");
    
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 0)
      .attr("font-size", "14px")
      .attr("fill", colors.text)
      .text("Video quality adapts");
    
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 20)
      .attr("font-size", "14px")
      .attr("fill", colors.text)
      .text("to available bandwidth");
    
    // Add legend
    const legend = svg.append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${-width/2 + 50}, ${-height/2 + 50})`);
    
    legend.append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", colors.bandwidthFill);
    
    legend.append("text")
      .attr("x", 25)
      .attr("y", 12)
      .attr("fill", colors.text)
      .text("Available Bandwidth");
    
    legend.append("line")
      .attr("x1", 0)
      .attr("y1", 35)
      .attr("x2", 15)
      .attr("y2", 35)
      .attr("stroke", colors.qualityLine)
      .attr("stroke-width", 3);
    
    legend.append("text")
      .attr("x", 25)
      .attr("y", 40)
      .attr("fill", colors.text)
      .text("Selected Quality");
  };
  
  // Generate sample data for ABR visualization
  const generateABRData = () => {
    const segments = 24;
    const data = [];
    
    // Network pattern - starts good, drops, recovers slowly, then improves
    for (let i = 0; i < segments; i++) {
      let baseValue = 0;
      
      // Create pattern of network conditions
      if (i < 6) {
        // Good connection at start
        baseValue = 3500;
      } else if (i < 10) {
        // Degradation 
        baseValue = 1500 - (i - 6) * 200;
      } else if (i < 16) {
        // Slow recovery
        baseValue = 700 + (i - 10) * 300;
      } else {
        // Return to good connection
        baseValue = 3500;
      }
      
      // Add variability
      const variability = 500;
      const minBandwidth = Math.max(500, baseValue - Math.random() * variability);
      const maxBandwidth = baseValue + Math.random() * variability;
      
      // Calculate selected quality based on conservative approach
      // (typically picks quality below max bandwidth)
      const potentialQuality = minBandwidth * 0.8;
      
      // Map to closest standard bitrate
      let selectedQuality;
      if (potentialQuality < 800) {
        selectedQuality = 800; // 240p
      } else if (potentialQuality < 1800) {
        selectedQuality = 1800; // 480p
      } else if (potentialQuality < 3000) {
        selectedQuality = 3000; // 720p
      } else {
        selectedQuality = 4500; // 1080p
      }
      
      data.push({
        minBandwidth,
        maxBandwidth,
        selectedQuality
      });
    }
    
    return data;
  };
  
  // Don't render anything until component is mounted to avoid hydration issues
  if (!mounted) return null;
  
  return (
    <div className="adaptive-bitrate-demo">
      <h2>Adaptive Bitrate Streaming Visualization</h2>
      <div className="chart-container" ref={chartRef}></div>
      <div className="explanation">
        <p>{isMobile ? "This chart shows how video quality adapts to changing network conditions:" : "This visualization shows how adaptive bitrate streaming works:"}</p>
        <ul>
          <li><strong>Blue area:</strong> Available bandwidth</li>
          <li><strong>Blue line:</strong> Selected video quality</li>
          <li><strong>{isMobile ? "Horizontal lines" : "Circles"}:</strong> Quality levels (240p-1080p)</li>
        </ul>
        {!isMobile && (
          <p>As network conditions change, the player selects the optimal quality to prevent buffering while maximizing quality.</p>
        )}
      </div>
    </div>
  );
}

export default AdaptiveBitrateDemo;
