"use client"

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './AdaptiveBitrateForceGraph.css';

function AdaptiveBitrateForceGraph() {
  const graphRef = useRef(null);

  useEffect(() => {
    if (graphRef.current) {
      // Clear any existing chart
      d3.select(graphRef.current).selectAll("*").remove();
      
      // Create the force-directed graph
      createForceGraph(graphRef.current);
    }
  }, []);

  const createForceGraph = (container) => {
    // Graph dimensions
    const width = 928;
    const height = 600;

    // Create hierarchical data representing components of ABR streaming
    const data = {
      name: "Video Streaming",
      children: [
        {
          name: "Origin Server",
          children: [
            { 
              name: "240p", 
              size: 800,
              type: "video",
              description: "Low quality: 240p (800 Kbps)" 
            },
            { 
              name: "480p", 
              size: 1800,
              type: "video",
              description: "Medium quality: 480p (1800 Kbps)" 
            },
            { 
              name: "720p", 
              size: 3000,
              type: "video",
              description: "High quality: 720p (3000 Kbps)" 
            },
            { 
              name: "1080p", 
              size: 4500,
              type: "video",
              description: "Full HD: 1080p (4500 Kbps)" 
            },
            { 
              name: "Manifest File", 
              type: "manifest",
              description: "Lists all available qualities and segments" 
            }
          ]
        },
        {
          name: "Streaming Process",
          children: [
            { 
              name: "Segment 1", 
              type: "segment",
              description: "2-10 second video chunk",
              quality: "720p"
            },
            { 
              name: "Segment 2", 
              type: "segment",
              description: "2-10 second video chunk",
              quality: "480p"
            },
            { 
              name: "Segment 3", 
              type: "segment",
              description: "2-10 second video chunk",
              quality: "480p"
            },
            { 
              name: "Segment 4", 
              type: "segment",
              description: "2-10 second video chunk",
              quality: "720p"
            },
            { 
              name: "Buffer", 
              type: "buffer",
              description: "Stores downloaded segments for smooth playback" 
            }
          ]
        },
        {
          name: "ABR Algorithm",
          type: "algorithm",
          description: "Decides which quality to request next",
          children: [
            { 
              name: "Bandwidth Monitor", 
              type: "monitor",
              description: "Measures available network throughput" 
            },
            { 
              name: "Buffer Status", 
              type: "buffer-status",
              description: "Checks how many seconds of video are buffered" 
            },
            { 
              name: "Quality Selector", 
              type: "selector",
              description: "Determines optimal quality based on conditions" 
            }
          ]
        },
        {
          name: "Client Device",
          type: "device",
          description: "Plays back the video",
          children: [
            { 
              name: "Video Player", 
              type: "player",
              description: "Displays video and controls" 
            },
            { 
              name: "Network Interface", 
              type: "network",
              description: "Connects to internet (varying bandwidth)" 
            }
          ]
        }
      ]
    };

    // Compute the graph and start the force simulation
    const root = d3.hierarchy(data);
    const links = root.links();
    const nodes = root.descendants();

    // Create the SVG container
    const svg = d3.select(container).append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Create a group for the graph elements
    const graph = svg.append("g");

    // Add zoom and pan behavior
    svg.call(d3.zoom()
      .extent([[0, 0], [width, height]])
      .scaleExtent([0.5, 3])
      .on("zoom", event => {
        graph.attr("transform", event.transform);
      }));

    // Define node colors based on type
    const nodeColor = d => {
      if (!d.data.type) return "#6baed6"; // Parent nodes
      switch (d.data.type) {
        case 'video': return "#4292c6";
        case 'manifest': return "#2171b5";
        case 'segment': 
          if (d.data.quality === "720p") return "#238b45";
          if (d.data.quality === "480p") return "#74c476";
          if (d.data.quality === "240p") return "#bae4b3";
          return "#41ab5d";
        case 'buffer': return "#fd8d3c";
        case 'buffer-status': return "#e6550d";
        case 'algorithm': return "#9e9ac8";
        case 'monitor': return "#756bb1";
        case 'selector': return "#8c6bb1";
        case 'device': return "#de2d26";
        case 'player': return "#fc9272";
        case 'network': return "#fb6a4a";
        default: return "#969696";
      }
    };

    // Define node size based on hierarchy level and data
    const nodeSize = d => {
      if (d.data.size) {
        return Math.sqrt(d.data.size) / 10 + 8;
      }
      // Size by depth in the hierarchy
      return d.depth === 0 ? 25 : 
             d.depth === 1 ? 15 : 
             d.children ? 10 : 8;
    };

    // Create the simulation with forces
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(d => {
        // Adjust link distance based on hierarchy
        return d.source.depth === 0 ? 120 : 60;
      }).strength(0.8))
      .force("charge", d3.forceManyBody().strength(d => d.depth === 0 ? -500 : -150))
      .force("x", d3.forceX().strength(0.1))
      .force("y", d3.forceY().strength(0.1))
      .force("collision", d3.forceCollide().radius(d => nodeSize(d) + 5));

    // Define a gradient for bandwidth connections
    const defs = svg.append("defs");
    
    const gradient = defs.append("linearGradient")
      .attr("id", "bandwidth-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");
    
    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#fd8d3c");
    
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#e6550d");

    // Append links
    const link = graph.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", d => {
        // Special coloring for connections to/from network
        if ((d.source.data.type === 'network' || d.target.data.type === 'network') &&
            (d.source.data.name === "Network Interface" || d.target.data.name === "Network Interface")) {
          return "url(#bandwidth-gradient)";
        }
        return "#999";
      })
      .attr("stroke-width", d => d.source.depth === 0 ? 3 : 
                              d.source.depth === 1 ? 2 : 1.5)
      .attr("stroke-opacity", 0.6)
      .attr("stroke-dasharray", d => {
        // Make segment connections dashed
        if (d.source.data.name === "Streaming Process" || 
            d.target.data.type === "segment" ||
            d.source.data.type === "segment") {
          return "5,5";
        }
        return null;
      });

    // Create a drag behavior
    const drag = simulation => {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      
      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }
      
      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
      
      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    };

    // Append nodes
    const node = graph.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(drag(simulation))
      .on("mouseover", function(event, d) {
        // Highlight connected links and nodes
        link
          .attr("stroke-opacity", l => (l.source === d || l.target === d) ? 1 : 0.2);
          
        node
          .attr("opacity", n => n === d || n.parent === d || d.parent === n ? 1 : 0.4);
          
        // Show description tooltip
        d3.select("#tooltip")
          .style("display", "block")
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY + 10) + "px")
          .html(`<strong>${d.data.name}</strong>${d.data.description ? '<br>' + d.data.description : ''}`);
      })
      .on("mouseout", function() {
        // Reset highlighting
        link.attr("stroke-opacity", 0.6);
        node.attr("opacity", 1);
        
        // Hide tooltip
        d3.select("#tooltip").style("display", "none");
      });

    // Add circles to the node groups
    node.append("circle")
      .attr("r", nodeSize)
      .attr("fill", nodeColor)
      .attr("stroke", d => d.depth === 0 ? "#000" : d.children ? "#555" : "#fff")
      .attr("stroke-width", d => d.depth === 0 ? 2 : 1.5);

    // Add labels to the nodes
    node.append("text")
      .attr("dy", d => d.children ? -nodeSize(d) - 5 : 4)
      .attr("text-anchor", "middle")
      .attr("font-size", d => d.depth === 0 ? 14 : d.depth === 1 ? 12 : 10)
      .attr("font-weight", d => d.depth < 2 ? "bold" : "normal")
      .attr("fill", d => d.depth > 1 ? "#333" : "#000")
      .text(d => d.data.name);

    // Create a tooltip div if it doesn't exist
    if (!d3.select("#tooltip").size()) {
      d3.select("body").append("div")
        .attr("id", "tooltip")
        .attr("class", "tooltip")
        .style("display", "none");
    }

    // Add a legend
    const legendData = [
      { label: "Origin Server", color: "#6baed6" },
      { label: "Video Quality", color: "#4292c6" },
      { label: "Video Segments", color: "#41ab5d" },
      { label: "Buffer", color: "#fd8d3c" },
      { label: "ABR Algorithm", color: "#9e9ac8" },
      { label: "Client Device", color: "#de2d26" }
    ];

    const legend = svg.append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${-width/2 + 30}, ${-height/2 + 30})`);

    legendData.forEach((item, i) => {
      const legendRow = legend.append("g")
        .attr("transform", `translate(0, ${i * 25})`);
        
      legendRow.append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", item.color);
        
      legendRow.append("text")
        .attr("x", 25)
        .attr("y", 12.5)
        .attr("text-anchor", "start")
        .text(item.label);
    });

    // Add a note about interaction
    svg.append("text")
      .attr("x", -width/2 + 30)
      .attr("y", height/2 - 30)
      .attr("font-style", "italic")
      .text("Tip: Hover over nodes to see details and drag to rearrange");

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // Stop simulation after 300 ticks for performance
    setTimeout(() => simulation.stop(), 3000);
  };

  return (
    <div className="abr-force-graph">
      <h2>Adaptive Bitrate Streaming - Component Interaction</h2>
      <div className="graph-container" ref={graphRef}></div>
      <div className="explanation">
        <p>This force-directed graph visualizes the components of adaptive bitrate streaming:</p>
        <ul>
          <li><strong>Origin Server:</strong> Hosts video files in multiple qualities</li>
          <li><strong>Video Segments:</strong> Chunks of video delivered one at a time</li>
          <li><strong>ABR Algorithm:</strong> Monitors network and selects appropriate quality</li>
          <li><strong>Client Device:</strong> Requests and plays the video segments</li>
        </ul>
        <p>Hover over nodes to see details and connections. Drag nodes to rearrange the visualization.</p>
      </div>
    </div>
  );
}

export default AdaptiveBitrateForceGraph;
