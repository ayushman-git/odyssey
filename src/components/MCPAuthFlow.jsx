"use client";

import React, { useEffect, useState } from "react";
import { ReactFlow, Background, Controls, MarkerType } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const MCPAuthFlow = () => {
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

  // Base node styles following your design system
  const nodeStyle = {
    padding: isMobile ? "8px 12px" : "10px 14px",
    borderRadius: "6px",
    width: isMobile ? 120 : 160,
    textAlign: "center",
    fontSize: isMobile ? "10px" : "12px",
    fontWeight: "500",
    border: "1px solid hsl(var(--border))",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  };

  // Color styles matching your design system
  const clientStyle = {
    ...nodeStyle,
    backgroundColor: "hsl(var(--primary))",
    color: "hsl(var(--primary-foreground))"
  };

  const serverStyle = {
    ...nodeStyle,
    backgroundColor: "hsl(var(--secondary))",
    color: "hsl(var(--secondary-foreground))"
  };

  const authServerStyle = {
    ...nodeStyle,
    backgroundColor: "hsl(var(--accent))",
    color: "hsl(var(--accent-foreground))",
    border: "2px solid hsl(var(--ring))"
  };

  const discoveryStyle = {
    ...nodeStyle,
    backgroundColor: "hsl(var(--muted))",
    color: "hsl(var(--muted-foreground))",
    border: "1px dashed hsl(var(--border))"
  };

  const processStyle = {
    ...nodeStyle,
    backgroundColor: "hsl(var(--card))",
    color: "hsl(var(--card-foreground))"
  };

  const securityStyle = {
    ...nodeStyle,
    backgroundColor: "hsl(var(--chart-1))",
    color: "white"
  };

  const errorStyle = {
    ...nodeStyle,
    backgroundColor: "hsl(var(--destructive))",
    color: "hsl(var(--destructive-foreground))"
  };

  // Responsive positions for comprehensive flow
  const getPositions = () => {
    const scale = isMobile ? 0.6 : 1;
    const spacingX = 200 * scale;
    const spacingY = 100 * scale;

    return {
      // Discovery Phase
      client: { x: 50 * scale, y: 50 * scale },
      wellKnown: { x: 300 * scale, y: 50 * scale },
      authServerMeta: { x: 550 * scale, y: 50 * scale },

      // Registration Phase
      clientReg: { x: 50 * scale, y: 150 * scale },
      dynamicReg: { x: 300 * scale, y: 150 * scale },
      fallbackReg: { x: 550 * scale, y: 150 * scale },

      // Authorization Phase
      authRequest: { x: 50 * scale, y: 250 * scale },
      pkceGen: { x: 300 * scale, y: 250 * scale },
      authEndpoint: { x: 550 * scale, y: 250 * scale },
      userAuth: { x: 800 * scale, y: 250 * scale },

      // Token Exchange Phase
      authCode: { x: 50 * scale, y: 350 * scale },
      tokenEndpoint: { x: 300 * scale, y: 350 * scale },
      tokenValidation: { x: 550 * scale, y: 350 * scale },
      resourceCheck: { x: 800 * scale, y: 350 * scale },

      // MCP Connection Phase
      mcpRequest: { x: 50 * scale, y: 450 * scale },
      resourceServer: { x: 300 * scale, y: 450 * scale },
      audienceValidation: { x: 550 * scale, y: 450 * scale },
      mcpSession: { x: 800 * scale, y: 450 * scale },

      // Error Handling
      securityError: { x: 1050 * scale, y: 200 * scale },
      tokenExpired: { x: 1050 * scale, y: 300 * scale },
      audienceError: { x: 1050 * scale, y: 400 * scale },
      refreshToken: { x: 800 * scale, y: 550 * scale },
    };
  };

  const positions = getPositions();

  const initialNodes = [
    // Discovery Phase
    {
      id: "client",
      position: positions.client,
      data: { label: "MCP Client\n(OAuth 2.1)" },
      style: clientStyle,
      animated: true,
    },
    {
      id: "well-known",
      position: positions.wellKnown,
      data: { label: ".well-known\nDiscovery" },
      style: discoveryStyle,
    },
    {
      id: "auth-server-meta",
      position: positions.authServerMeta,
      data: { label: "Authorization\nServer Metadata" },
      style: discoveryStyle,
    },

    // Registration Phase
    {
      id: "client-reg",
      position: positions.clientReg,
      data: { label: "Client\nRegistration" },
      style: processStyle,
    },
    {
      id: "dynamic-reg",
      position: positions.dynamicReg,
      data: { label: "Dynamic Client\nRegistration" },
      style: processStyle,
    },
    {
      id: "fallback-reg",
      position: positions.fallbackReg,
      data: { label: "Fallback:\nHardcoded/Manual" },
      style: processStyle,
    },

    // Authorization Phase
    {
      id: "auth-request",
      position: positions.authRequest,
      data: { label: "Authorization\nRequest" },
      style: clientStyle,
    },
    {
      id: "pkce-gen",
      position: positions.pkceGen,
      data: { label: "PKCE Challenge\n(S256 Method)" },
      style: securityStyle,
    },
    {
      id: "auth-endpoint",
      position: positions.authEndpoint,
      data: { label: "/authorize\n+ resource param" },
      style: authServerStyle,
      animated: true,
    },
    {
      id: "user-auth",
      position: positions.userAuth,
      data: { label: "User\nAuthentication" },
      style: authServerStyle,
    },

    // Token Exchange Phase
    {
      id: "auth-code",
      position: positions.authCode,
      data: { label: "Authorization\nCode Return" },
      style: processStyle,
    },
    {
      id: "token-endpoint",
      position: positions.tokenEndpoint,
      data: { label: "/token\nEndpoint" },
      style: authServerStyle,
      animated: true,
    },
    {
      id: "token-validation",
      position: positions.tokenValidation,
      data: { label: "Token Validation\n(JWKS)" },
      style: securityStyle,
    },
    {
      id: "resource-check",
      position: positions.resourceCheck,
      data: { label: "Resource URI\nValidation" },
      style: securityStyle,
    },

    // MCP Connection Phase
    {
      id: "mcp-request",
      position: positions.mcpRequest,
      data: { label: "MCP Request\n+ Bearer Token" },
      style: clientStyle,
      animated: true,
    },
    {
      id: "resource-server",
      position: positions.resourceServer,
      data: { label: "MCP Server\n(Resource Server)" },
      style: serverStyle,
      animated: true,
    },
    {
      id: "audience-validation",
      position: positions.audienceValidation,
      data: { label: "Audience\nValidation" },
      style: securityStyle,
    },
    {
      id: "mcp-session",
      position: positions.mcpSession,
      data: { label: "Active MCP\nSession" },
      style: clientStyle,
      animated: true,
    },

    // Error Handling & Security
    {
      id: "security-error",
      position: positions.securityError,
      data: { label: "Security\nViolation" },
      style: errorStyle,
    },
    {
      id: "token-expired",
      position: positions.tokenExpired,
      data: { label: "Token\nExpired" },
      style: errorStyle,
    },
    {
      id: "audience-error",
      position: positions.audienceError,
      data: { label: "Audience\nMismatch" },
      style: errorStyle,
    },
    {
      id: "refresh-token",
      position: positions.refreshToken,
      data: { label: "Refresh Token\nFlow" },
      style: processStyle,
    },
  ];

  const initialEdges = [
    // Discovery Flow
    {
      id: "e-client-discovery",
      source: "client",
      target: "well-known",
      label: "1. Discovery",
      labelStyle: {
        fill: "hsl(var(--foreground))",
        fontSize: isMobile ? "9px" : "10px",
        fontWeight: "500"
      },
      style: {
        stroke: "hsl(var(--primary))",
        strokeWidth: 2
      },
      markerEnd: { type: MarkerType.Arrow, color: "hsl(var(--primary))" },
    },
    {
      id: "e-well-known-meta",
      source: "well-known",
      target: "auth-server-meta",
      label: "Metadata",
      labelStyle: {
        fill: "hsl(var(--foreground))",
        fontSize: isMobile ? "9px" : "10px"
      },
      style: {
        stroke: "hsl(var(--muted-foreground))",
        strokeWidth: 1,
        strokeDasharray: "3,3"
      },
      markerEnd: { type: MarkerType.Arrow, color: "hsl(var(--muted-foreground))" },
    },

    // Registration Flow
    {
      id: "e-client-registration",
      source: "client",
      target: "client-reg",
      label: "2. Register",
      labelStyle: {
        fill: "hsl(var(--foreground))",
        fontSize: isMobile ? "9px" : "10px",
        fontWeight: "500"
      },
      style: {
        stroke: "hsl(var(--primary))",
        strokeWidth: 2
      },
      markerEnd: { type: MarkerType.Arrow, color: "hsl(var(--primary))" },
    },
    {
      id: "e-reg-dynamic",
      source: "client-reg",
      target: "dynamic-reg",
      label: "Preferred",
      labelStyle: {
        fill: "hsl(var(--foreground))",
        fontSize: isMobile ? "9px" : "10px"
      },
      style: {
        stroke: "hsl(var(--card-foreground))",
        strokeWidth: 2
      },
      markerEnd: { type: MarkerType.Arrow, color: "hsl(var(--card-foreground))" },
    },
    {
      id: "e-reg-fallback",
      source: "client-reg",
      target: "fallback-reg",
      label: "Fallback",
      labelStyle: {
        fill: "hsl(var(--foreground))",
        fontSize: isMobile ? "9px" : "10px"
      },
      style: {
        stroke: "hsl(var(--card-foreground))",
        strokeWidth: 1,
        strokeDasharray: "5,5"
      },
      markerEnd: { type: MarkerType.Arrow, color: "hsl(var(--card-foreground))" },
    },

    // Authorization Flow
    {
      id: "e-client-auth-request",
      source: "client",
      target: "auth-request",
      label: "3. Authorize",
      labelStyle: {
        fill: "hsl(var(--foreground))",
        fontSize: isMobile ? "9px" : "10px",
        fontWeight: "500"
      },
      style: {
        stroke: "hsl(var(--primary))",
        strokeWidth: 2
      },
      markerEnd: { type: MarkerType.Arrow, color: "hsl(var(--primary))" },
    },
    {
      id: "e-auth-pkce",
      source: "auth-request",
      target: "pkce-gen",
      label: "PKCE",
      labelStyle: {
        fill: "hsl(var(--foreground))",
        fontSize: isMobile ? "9px" : "10px"
      },
      style: {
        stroke: "hsl(var(--chart-1))",
        strokeWidth: 2
      },
      markerEnd: { type: MarkerType.Arrow, color: "hsl(var(--chart-1))" },
    },
    {
      id: "e-pkce-endpoint",
      source: "pkce-gen",
      target: "auth-endpoint",
      label: "Challenge",
      labelStyle: {
        fill: "hsl(var(--foreground))",
        fontSize: isMobile ? "9px" : "10px"
      },
      style: {
        stroke: "hsl(var(--chart-1))",
        strokeWidth: 2
      },
      markerEnd: { type: MarkerType.Arrow, color: "hsl(var(--chart-1))" },
    },
    {
      id: "e-endpoint-user",
      source: "auth-endpoint",
      target: "user-auth",
      animated: true,
      label: "User Login",
      labelStyle: {
        fill: "hsl(var(--foreground))",
        fontSize: isMobile ? "9px" : "10px"
      },
      style: {
        stroke: "hsl(var(--accent))",
        strokeWidth: 3
      },
      markerEnd: { type: MarkerType.Arrow, color: "hsl(var(--accent))" },
    },

    // Token Exchange Flow
    {
      id: "e-user-code",
      source: "user-auth",
      target: "auth-code",
      label: "Auth Code",
      labelStyle: {
        fill: "hsl(var(--foreground))",
        fontSize: isMobile ? "9px" : "10px"
      },
      style: {
        stroke: "hsl(var(--accent))",
        strokeWidth: 2
      },
      markerEnd: { type: MarkerType.Arrow, color: "hsl(var(--accent))" },
    },
    {
      id: "e-code-token",
      source: "auth-code",
      target: "token-endpoint",
      animated: true,
      label: "4. Token Exchange",
      labelStyle: {
        fill: "hsl(var(--foreground))",
        fontSize: isMobile ? "9px" : "10px",
        fontWeight: "500"
      },
      style: {
        stroke: "hsl(var(--accent))",
        strokeWidth: 3
      },
      markerEnd: { type: MarkerType.Arrow, color: "hsl(var(--accent))" },
    },
    {
      id: "e-token-validation",
      source: "token-endpoint",
      target: "token-validation",
      label: "Validate",
      labelStyle: {
        fill: "hsl(var(--foreground))",
        fontSize: isMobile ? "9px" : "10px"
      },
      style: {
        stroke: "hsl(var(--chart-1))",
        strokeWidth: 2
      },
      markerEnd: { type: MarkerType.Arrow, color: "hsl(var(--chart-1))" },
    },
    {
      id: "e-validation-resource",
      source: "token-validation",
      target: "resource-check",
      label: "RFC 8707",
      labelStyle: {
        fill: "hsl(var(--foreground))",
        fontSize: isMobile ? "9px" : "10px"
      },
      style: {
        stroke: "hsl(var(--chart-1))",
        strokeWidth: 2
      },
      markerEnd: { type: MarkerType.Arrow, color: "hsl(var(--chart-1))" },
    },

    // MCP Connection Flow
    {
      id: "e-client-mcp",
      source: "client",
      target: "mcp-request",
      label: "5. MCP Connect",
      labelStyle: {
        fill: "hsl(var(--foreground))",
        fontSize: isMobile ? "9px" : "10px",
        fontWeight: "500"
      },
      style: {
        stroke: "hsl(var(--primary))",
        strokeWidth: 2
      },
      markerEnd: { type: MarkerType.Arrow, color: "hsl(var(--primary))" },
    },
    {
      id: "e-mcp-server",
      source: "mcp-request",
      target: "resource-server",
      animated: true,
      label: "Bearer Token",
      labelStyle: {
        fill: "hsl(var(--foreground))",
        fontSize: isMobile ? "9px" : "10px"
      },
      style: {
        stroke: "hsl(var(--secondary))",
        strokeWidth: 3
      },
      markerEnd: { type: MarkerType.Arrow, color: "hsl(var(--secondary))" },
    },
    {
      id: "e-server-audience",
      source: "resource-server",
      target: "audience-validation",
      label: "Check Audience",
      labelStyle: {
        fill: "hsl(var(--foreground))",
        fontSize: isMobile ? "9px" : "10px"
      },
      style: {
        stroke: "hsl(var(--chart-1))",
        strokeWidth: 2
      },
      markerEnd: { type: MarkerType.Arrow, color: "hsl(var(--chart-1))" },
    },
    {
      id: "e-audience-session",
      source: "audience-validation",
      target: "mcp-session",
      animated: true,
      label: "Success",
      labelStyle: {
        fill: "hsl(var(--foreground))",
        fontSize: isMobile ? "9px" : "10px",
        fontWeight: "500"
      },
      style: {
        stroke: "hsl(var(--primary))",
        strokeWidth: 3
      },
      markerEnd: { type: MarkerType.Arrow, color: "hsl(var(--primary))" },
    },

    // Error Flows
    {
      id: "e-auth-error",
      source: "auth-endpoint",
      target: "security-error",
      label: "Auth Fail",
      labelStyle: {
        fill: "hsl(var(--destructive))",
        fontSize: isMobile ? "9px" : "10px"
      },
      style: {
        stroke: "hsl(var(--destructive))",
        strokeWidth: 2,
        strokeDasharray: "5,5"
      },
      markerEnd: { type: MarkerType.Arrow, color: "hsl(var(--destructive))" },
    },
    {
      id: "e-token-expired",
      source: "token-validation",
      target: "token-expired",
      label: "Expired",
      labelStyle: {
        fill: "hsl(var(--destructive))",
        fontSize: isMobile ? "9px" : "10px"
      },
      style: {
        stroke: "hsl(var(--destructive))",
        strokeWidth: 2,
        strokeDasharray: "5,5"
      },
      markerEnd: { type: MarkerType.Arrow, color: "hsl(var(--destructive))" },
    },
    {
      id: "e-audience-error",
      source: "audience-validation",
      target: "audience-error",
      label: "Invalid",
      labelStyle: {
        fill: "hsl(var(--destructive))",
        fontSize: isMobile ? "9px" : "10px"
      },
      style: {
        stroke: "hsl(var(--destructive))",
        strokeWidth: 2,
        strokeDasharray: "5,5"
      },
      markerEnd: { type: MarkerType.Arrow, color: "hsl(var(--destructive))" },
    },

    // Refresh Token Flow
    {
      id: "e-expired-refresh",
      source: "token-expired",
      target: "refresh-token",
      label: "Refresh",
      labelStyle: {
        fill: "hsl(var(--foreground))",
        fontSize: isMobile ? "9px" : "10px"
      },
      style: {
        stroke: "hsl(var(--card-foreground))",
        strokeWidth: 1
      },
      markerEnd: { type: MarkerType.Arrow, color: "hsl(var(--card-foreground))" },
    },
    {
      id: "e-refresh-token-endpoint",
      source: "refresh-token",
      target: "token-endpoint",
      label: "New Token",
      labelStyle: {
        fill: "hsl(var(--foreground))",
        fontSize: isMobile ? "9px" : "10px"
      },
      style: {
        stroke: "hsl(var(--card-foreground))",
        strokeWidth: 1,
        strokeDasharray: "3,3"
      },
      markerEnd: { type: MarkerType.Arrow, color: "hsl(var(--card-foreground))" },
    },
  ];

  return (
    <div
      className="w-full border border-border rounded-lg overflow-hidden"
      style={{
        height: isMobile ? "600px" : "700px",
      }}
    >
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        defaultViewport={{
          zoom: isMobile ? 0.5 : 0.7,
        }}
        fitView
        fitViewOptions={{
          padding: 0.05,
        }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Background
          variant="dots"
          gap={15}
          size={1}
          color="hsl(var(--muted-foreground))"
          style={{ opacity: 0.2 }}
        />
        <Controls
          showZoom={true}
          showFitView={true}
          className="bg-background border-border"
        />
      </ReactFlow>
    </div>
  );
};

export default MCPAuthFlow;