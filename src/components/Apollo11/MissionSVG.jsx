'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MissionSVG() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Wait for DOM to be ready
    const initAnimation = () => {
      const trajectoryPath = svg.querySelector('.mission-trajectory');
      const spacecraft = svg.querySelector('.spacecraft-icon');
      const missionPhases = svg.querySelectorAll('.mission-phase');
      const trajectoryMarkers = svg.querySelectorAll('.trajectory-marker');

      if (!trajectoryPath) {
        console.error('Mission trajectory path not found');
        return;
      }

      try {
        // Get actual path length
        const pathLength = trajectoryPath.getTotalLength();

        // Initialize elements with proper stroke dasharray
        trajectoryPath.style.strokeDasharray = pathLength;
        trajectoryPath.style.strokeDashoffset = pathLength;

        // Create the main scroll trigger
        ScrollTrigger.create({
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;

            // Draw trajectory progressively
            const currentOffset = pathLength - (progress * pathLength);
            trajectoryPath.style.strokeDashoffset = currentOffset;

            // Move spacecraft along path
            if (progress > 0.01) {
              try {
                const distanceAlongPath = progress * pathLength;
                const point = trajectoryPath.getPointAtLength(distanceAlongPath);

                spacecraft.style.opacity = '1';
                spacecraft.style.transform = `translate(${point.x - 12}px, ${point.y - 8}px) rotate(${progress * 180}deg)`;
              } catch (e) {
                console.error('Error moving spacecraft:', e);
              }
            } else {
              spacecraft.style.opacity = '0';
            }

            // Show mission phases progressively
            const phases = [
              { start: 0.0, selector: '.phase-launch' },
              { start: 0.15, selector: '.phase-tli' },
              { start: 0.35, selector: '.phase-coast' },
              { start: 0.55, selector: '.phase-loi' },
              { start: 0.7, selector: '.phase-descent' },
              { start: 0.85, selector: '.phase-landing' },
              { start: 0.95, selector: '.phase-return' }
            ];

            phases.forEach((phase) => {
              const element = svg.querySelector(phase.selector);
              if (element) {
                const shouldShow = progress >= phase.start;
                element.style.opacity = shouldShow ? '1' : '0';
                element.style.transform = shouldShow ? 'scale(1)' : 'scale(0)';
              }
            });

            // Show trajectory markers
            trajectoryMarkers.forEach((marker, index) => {
              const markerProgress = (index + 1) / trajectoryMarkers.length;
              const shouldShow = progress >= markerProgress - 0.1;
              marker.style.opacity = shouldShow ? '1' : '0';
              marker.style.transform = shouldShow ? 'scale(1)' : 'scale(0)';
            });
          }
        });

        // Animation initialized successfully
      } catch (error) {
        console.error('Error initializing animation:', error);
      }
    };

    // Initialize after a short delay
    const timer = setTimeout(initAnimation, 500);

    // Cleanup
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="mission-svg"
      viewBox="0 0 1000 1400"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Grid lines for blueprint feel */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.3"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Earth at launch */}
      <g className="celestial-body earth">
        <circle cx="150" cy="1250" r="80" fill="none" stroke="black" strokeWidth="3"/>
        <text x="150" y="1350" textAnchor="middle" className="tech-annotation" fontSize="16">EARTH</text>
        <text x="150" y="1370" textAnchor="middle" className="tech-annotation" fontSize="14">KENNEDY SPACE CENTER</text>
      </g>

      {/* Moon at destination */}
      <g className="celestial-body moon">
        <circle cx="800" cy="120" r="60" fill="none" stroke="black" strokeWidth="3"/>
        <circle cx="785" cy="105" r="5" fill="black"/>
        <circle cx="805" cy="125" r="6" fill="black"/>
        <circle cx="820" cy="100" r="4" fill="black"/>
        <text x="800" y="210" textAnchor="middle" className="tech-annotation" fontSize="16">MOON</text>
        <text x="800" y="230" textAnchor="middle" className="tech-annotation" fontSize="14">SEA OF TRANQUILITY</text>
      </g>

      {/* Mission trajectory - single continuous path */}
      <path
        className="mission-trajectory"
        d="M 150 1170
           Q 250 1100 350 950
           Q 450 800 550 650
           Q 650 500 750 350
           Q 850 200 900 180
           L 800 160"
        fill="none"
        stroke="black"
        strokeWidth="4"
      />

      {/* Trajectory markers */}
      <circle className="trajectory-marker" cx="150" cy="1170" r="6" fill="white" stroke="black" strokeWidth="3"/>
      <circle className="trajectory-marker" cx="350" cy="950" r="6" fill="white" stroke="black" strokeWidth="3"/>
      <circle className="trajectory-marker" cx="550" cy="650" r="6" fill="white" stroke="black" strokeWidth="3"/>
      <circle className="trajectory-marker" cx="750" cy="350" r="6" fill="white" stroke="black" strokeWidth="3"/>
      <circle className="trajectory-marker" cx="900" cy="180" r="6" fill="white" stroke="black" strokeWidth="3"/>
      <circle className="trajectory-marker" cx="800" cy="160" r="6" fill="white" stroke="black" strokeWidth="3"/>

      {/* Spacecraft icon */}
      <g className="spacecraft-icon spacecraft">
        <rect x="0" y="0" width="16" height="10" fill="white" stroke="black" strokeWidth="3" rx="2"/>
        <polygon points="16,5 24,2 24,8" fill="white" stroke="black" strokeWidth="2"/>
        <circle cx="8" cy="5" r="2" fill="black"/>
      </g>

      {/* Mission phases */}
      <g className="phase-launch mission-phase">
        <rect x="30" y="1080" width="200" height="60" fill="white" stroke="black" strokeWidth="2"/>
        <text x="130" y="1105" textAnchor="middle" className="tech-annotation" fontSize="14" fontWeight="bold">LAUNCH</text>
        <text x="130" y="1122" textAnchor="middle" className="tech-annotation" fontSize="12">T+00:00:00</text>
        <text x="130" y="1135" textAnchor="middle" className="tech-annotation" fontSize="10">SATURN V LIFTOFF</text>
      </g>

      <g className="phase-tli mission-phase">
        <rect x="200" y="870" width="200" height="60" fill="white" stroke="black" strokeWidth="2"/>
        <text x="300" y="895" textAnchor="middle" className="tech-annotation" fontSize="14" fontWeight="bold">TLI BURN</text>
        <text x="300" y="912" textAnchor="middle" className="tech-annotation" fontSize="12">T+02:44:16</text>
        <text x="300" y="925" textAnchor="middle" className="tech-annotation" fontSize="10">TRANS-LUNAR INJECTION</text>
      </g>

      <g className="phase-coast mission-phase">
        <rect x="380" y="590" width="200" height="60" fill="white" stroke="black" strokeWidth="2"/>
        <text x="480" y="615" textAnchor="middle" className="tech-annotation" fontSize="14" fontWeight="bold">COAST PHASE</text>
        <text x="480" y="632" textAnchor="middle" className="tech-annotation" fontSize="12">3 DAYS</text>
        <text x="480" y="645" textAnchor="middle" className="tech-annotation" fontSize="10">FREE RETURN TRAJECTORY</text>
      </g>

      <g className="phase-loi mission-phase">
        <rect x="580" y="290" width="200" height="60" fill="white" stroke="black" strokeWidth="2"/>
        <text x="680" y="315" textAnchor="middle" className="tech-annotation" fontSize="14" fontWeight="bold">LOI BURN</text>
        <text x="680" y="332" textAnchor="middle" className="tech-annotation" fontSize="12">T+75:49:50</text>
        <text x="680" y="345" textAnchor="middle" className="tech-annotation" fontSize="10">LUNAR ORBIT INSERTION</text>
      </g>

      <g className="phase-descent mission-phase">
        <rect x="680" y="100" width="200" height="60" fill="white" stroke="black" strokeWidth="2"/>
        <text x="780" y="125" textAnchor="middle" className="tech-annotation" fontSize="14" fontWeight="bold">POWERED DESCENT</text>
        <text x="780" y="142" textAnchor="middle" className="tech-annotation" fontSize="12">T+102:45:40</text>
        <text x="780" y="155" textAnchor="middle" className="tech-annotation" fontSize="10">EAGLE DESCENDS</text>
      </g>

      <g className="phase-landing mission-phase">
        <rect x="600" y="50" width="200" height="60" fill="white" stroke="black" strokeWidth="2"/>
        <text x="700" y="75" textAnchor="middle" className="tech-annotation" fontSize="14" fontWeight="bold">LUNAR LANDING</text>
        <text x="700" y="92" textAnchor="middle" className="tech-annotation" fontSize="12">CONTACT LIGHT</text>
        <text x="700" y="105" textAnchor="middle" className="tech-annotation" fontSize="10">"THE EAGLE HAS LANDED"</text>
      </g>

      <g className="phase-return mission-phase">
        <rect x="520" y="20" width="200" height="60" fill="white" stroke="black" strokeWidth="2"/>
        <text x="620" y="45" textAnchor="middle" className="tech-annotation" fontSize="14" fontWeight="bold">MISSION SUCCESS</text>
        <text x="620" y="62" textAnchor="middle" className="tech-annotation" fontSize="12">T+195:18:35</text>
        <text x="620" y="75" textAnchor="middle" className="tech-annotation" fontSize="10">SPLASHDOWN PACIFIC</text>
      </g>

      {/* Technical annotations */}
      <g className="technical-data">
        <line x1="80" y1="1200" x2="80" y2="1300" stroke="black" strokeWidth="2"/>
        <text x="90" y="1250" className="tech-annotation" fontSize="14">
          ALTITUDE: 0 km
        </text>

        <line x1="500" y1="500" x2="500" y2="450" stroke="black" strokeWidth="2"/>
        <text x="510" y="475" className="tech-annotation" fontSize="14">
          DISTANCE: 384,400 km
        </text>

        <line x1="750" y1="250" x2="750" y2="300" stroke="black" strokeWidth="2"/>
        <text x="760" y="275" className="tech-annotation" fontSize="14">
          LUNAR SURFACE
        </text>
      </g>

      {/* Mission parameters */}
      <g className="mission-parameters">
        <rect x="30" y="30" width="300" height="200" fill="white" stroke="black" strokeWidth="3"/>
        <text x="45" y="55" className="tech-annotation" fontSize="16" fontWeight="bold">MISSION PARAMETERS</text>

        <text x="45" y="85" className="tech-annotation" fontSize="13">TOTAL DISTANCE: 1,500,000 km</text>
        <text x="45" y="105" className="tech-annotation" fontSize="13">MISSION DURATION: 8d 3h 18m</text>
        <text x="45" y="125" className="tech-annotation" fontSize="13">MAX VELOCITY: 11.08 km/s</text>
        <text x="45" y="145" className="tech-annotation" fontSize="13">CREW: N. ARMSTRONG, B. ALDRIN, M. COLLINS</text>
        <text x="45" y="165" className="tech-annotation" fontSize="13">AGC MEMORY: 4K WORDS</text>
        <text x="45" y="185" className="tech-annotation" fontSize="13">LINES OF CODE: ~145,000</text>
        <text x="45" y="205" className="tech-annotation" fontSize="13">APOLLO GUIDANCE COMPUTER</text>
        <text x="45" y="220" className="tech-annotation" fontSize="11">MARGARET HAMILTON, MIT LAB</text>
      </g>

      {/* Velocity vectors */}
      <g className="velocity-vectors">
        <path d="M 320 910 L 350 890" stroke="black" strokeWidth="3" markerEnd="url(#arrowhead)"/>
        <text x="360" y="900" className="tech-annotation" fontSize="12">ΔV = 3.15 km/s</text>

        <path d="M 690 320 L 720 300" stroke="black" strokeWidth="3" markerEnd="url(#arrowhead)"/>
        <text x="730" y="310" className="tech-annotation" fontSize="12">ΔV = 0.91 km/s</text>
      </g>

      {/* Arrow marker definition */}
      <defs>
        <marker id="arrowhead" markerWidth="15" markerHeight="10" refX="14" refY="5" orient="auto">
          <polygon points="0 0, 15 5, 0 10" fill="black"/>
        </marker>
      </defs>

      {/* Coordinate system */}
      <g className="coordinate-system">
        <line x1="900" y1="1300" x2="950" y2="1300" stroke="black" strokeWidth="3" markerEnd="url(#arrowhead)"/>
        <line x1="900" y1="1300" x2="900" y2="1250" stroke="black" strokeWidth="3" markerEnd="url(#arrowhead)"/>
        <text x="960" y="1308" className="tech-annotation" fontSize="14">X</text>
        <text x="885" y="1240" className="tech-annotation" fontSize="14">Y</text>
      </g>
    </svg>
  );
}