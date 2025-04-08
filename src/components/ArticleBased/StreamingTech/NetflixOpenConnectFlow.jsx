"use client";

import React, { useEffect, useState } from "react";
import { ReactFlow, Background, Controls, MarkerType } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const NetflixOpenConnectFlow = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener("resize", checkMobile);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  // Node styles
  const nodeStyle = {
    padding: "10px",
    borderRadius: "5px",
    width: isMobile ? 150 : 180,
    textAlign: "center",
    fontSize: isMobile ? "12px" : "14px",
  };

  // Updated styles with new color palette
  const awsStyle = { ...nodeStyle, backgroundColor: "#09122C", color: "white" };
  const ocaStyle = { ...nodeStyle, backgroundColor: "#872341", color: "white" };
  const ispStyle = { ...nodeStyle, backgroundColor: "#BE3144", color: "white" };
  const userStyle = { ...nodeStyle, backgroundColor: "#E17564", color: "white" };
  const ixpStyle = { ...nodeStyle, backgroundColor: "#872341", color: "white", opacity: 0.7 };

  // Position nodes based on screen size
  const getMobilePositions = () => {
    return {
      awsBackend: { x: 150, y: 50 },
      steeringService: { x: 150, y: 130 },
      ocaLocal: { x: 50, y: 230 },
      ocaRegional: { x: 150, y: 230 },
      ocaIxp: { x: 250, y: 230 },
      ispNetwork: { x: 50, y: 330 },
      user: { x: 50, y: 410 },
    };
  };

  const getDesktopPositions = () => {
    return {
      awsBackend: { x: 400, y: 50 },
      steeringService: { x: 400, y: 150 },
      ocaLocal: { x: 200, y: 300 },
      ocaRegional: { x: 400, y: 300 },
      ocaIxp: { x: 600, y: 300 },
      ispNetwork: { x: 200, y: 400 },
      user: { x: 200, y: 500 },
    };
  };

  const positions = isMobile ? getMobilePositions() : getDesktopPositions();

  // Initial nodes representing the Netflix content delivery architecture
  const initialNodes = [
    // Cloud Tier
    {
      id: "aws-backend",
      position: positions.awsBackend,
      data: { label: "Netflix AWS Backend\n(Play API, Auth, Billing)" },
      style: awsStyle,
      animated: true,
    },
    {
      id: "steering-service",
      position: positions.steeringService,
      data: { label: "Steering Service\n(CODA)" },
      style: awsStyle,
      animated: true,
    },

    // OCA Tier
    {
      id: "oca-local",
      position: positions.ocaLocal,
      data: { label: "Local ISP Open Connect\nAppliance (OCA)" },
      style: ocaStyle,
      animated: true,
    },
    {
      id: "oca-regional",
      position: positions.ocaRegional,
      data: { label: "Regional Hub OCA" },
      style: ocaStyle,
    },
    {
      id: "oca-ixp",
      position: positions.ocaIxp,
      data: { label: "Internet Exchange\nPoint OCA" },
      style: ixpStyle,
    },

    // ISP Network
    {
      id: "isp-network",
      position: positions.ispNetwork,
      data: { label: "ISP Network" },
      style: ispStyle,
      animated: true,
    },

    // End User Tier
    {
      id: "user",
      position: positions.user,
      data: { label: "Viewer Watching\nGrave of the Fireflies" },
      style: userStyle,
      animated: true,
    },
  ];

  // Connections between the nodes with updated color palette
  const initialEdges = [
    // AWS to steering service
    {
      id: "e-aws-steering",
      source: "aws-backend",
      target: "steering-service",
      animated: true,
      style: { stroke: "#09122C" },
      markerEnd: { type: MarkerType.Arrow, color: "#000" },
    },

    // Steering to OCA options
    {
      id: "e-steering-local",
      source: "steering-service",
      target: "oca-local",
      label: "Primary path",
      labelStyle: { fill: "#111", fontWeight: "bold", fontSize: isMobile ? "10px" : "12px" },
      style: { stroke: "#872341", strokeWidth: 3 },
      markerEnd: { type: MarkerType.Arrow, color: "#000" },
    },
    {
      id: "e-steering-regional",
      source: "steering-service",
      target: "oca-regional",
      label: "Fallback #1",
      labelStyle: { fill: "#111", fontSize: isMobile ? "10px" : "12px" },
      style: { stroke: "#BE3144", strokeWidth: 2, strokeDasharray: "5,5" },
      markerEnd: { type: MarkerType.Arrow, color: "#000" },
    },
    {
      id: "e-steering-ixp",
      source: "steering-service",
      target: "oca-ixp",
      label: "Fallback #2",
      labelStyle: { fill: "#111", fontSize: isMobile ? "10px" : "12px" },
      style: { stroke: "#E17564", strokeWidth: 1, strokeDasharray: "5,5" },
      markerEnd: { type: MarkerType.Arrow, color: "#000" },
    },

    // OCA to ISP
    {
      id: "e-oca-isp",
      source: "oca-local",
      target: "isp-network",
      animated: true,
      style: { stroke: "#872341", strokeWidth: 3 },
      markerEnd: { type: MarkerType.Arrow, color: "#000" },
    },

    // ISP to User
    {
      id: "e-isp-user",
      source: "isp-network",
      target: "user",
      animated: true,
      style: { stroke: "#BE3144", strokeWidth: 3 },
      markerEnd: { type: MarkerType.Arrow, color: "#000" },
    },
  ];

  return (
    <div style={{ 
      width: "100%", 
      height: isMobile ? "450px" : "600px", 
      border: "1px solid #ddd" 
    }}>
      <ReactFlow 
        nodes={initialNodes} 
        edges={initialEdges} 
        fitView
        fitViewOptions={{ padding: isMobile ? 0.2 : 0.5 }}
        minZoom={0.5}
        maxZoom={1.5}
        defaultZoom={1}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Background variant="dots" gap={12} size={0.8} />
      </ReactFlow>
      <div
        style={{
          padding: "10px",
          fontSize: isMobile ? "12px" : "14px",
          color: "#09122C",
          textAlign: "center",
        }}
      >
        Netflix's Open Connect architecture routes your stream via the closest
        cached copy, dramatically reducing latency and network congestion.
      </div>
    </div>
  );
};

export default NetflixOpenConnectFlow;
