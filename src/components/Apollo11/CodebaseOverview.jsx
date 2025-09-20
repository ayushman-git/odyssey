'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CodebaseOverview() {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;

    // Animate section on scroll
    gsap.fromTo(section,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate SVG paths
    const paths = svg?.querySelectorAll('.svg-path');
    if (paths) {
      gsap.fromTo(paths,
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 2,
          stagger: 0.3,
          scrollTrigger: {
            trigger: svg,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="apollo11-section">
      <div className="section-content">
        <h2 className="section-title">CODEBASE ARCHITECTURE</h2>

        <div className="data-viz">
          <div className="data-viz-title">SYSTEM OVERVIEW</div>

          <svg ref={svgRef} className="apollo11-svg" viewBox="0 0 600 400">
            {/* Command Module */}
            <g className="module-group">
              <rect x="50" y="50" width="200" height="100"
                    fill="none" stroke="#000" strokeWidth="2" className="svg-path"/>
              <text x="150" y="85" textAnchor="middle" className="module-label">
                COMMAND MODULE
              </text>
              <text x="150" y="105" textAnchor="middle" className="module-subtitle">
                COMANCHE055
              </text>
              <text x="150" y="125" textAnchor="middle" className="module-date">
                APR 1, 1969
              </text>
            </g>

            {/* Lunar Module */}
            <g className="module-group">
              <rect x="350" y="50" width="200" height="100"
                    fill="none" stroke="#000" strokeWidth="2" className="svg-path"/>
              <text x="450" y="85" textAnchor="middle" className="module-label">
                LUNAR MODULE
              </text>
              <text x="450" y="105" textAnchor="middle" className="module-subtitle">
                LUMINARY099
              </text>
              <text x="450" y="125" textAnchor="middle" className="module-date">
                JUL 14, 1969
              </text>
            </g>

            {/* AGC Core */}
            <g className="agc-core">
              <rect x="200" y="200" width="200" height="80"
                    fill="none" stroke="#000" strokeWidth="3" className="svg-path"/>
              <text x="300" y="230" textAnchor="middle" className="core-label">
                APOLLO GUIDANCE
              </text>
              <text x="300" y="250" textAnchor="middle" className="core-label">
                COMPUTER (AGC)
              </text>
            </g>

            {/* Connection lines */}
            <line x1="150" y1="150" x2="250" y2="200"
                  stroke="#000" strokeWidth="2" className="svg-path"/>
            <line x1="450" y1="150" x2="350" y2="200"
                  stroke="#000" strokeWidth="2" className="svg-path"/>

            {/* yaYUL Assembler */}
            <g className="assembler-group">
              <rect x="250" y="320" width="100" height="50"
                    fill="none" stroke="#000" strokeWidth="1" className="svg-path"/>
              <text x="300" y="340" textAnchor="middle" className="assembler-label">
                yaYUL
              </text>
              <text x="300" y="355" textAnchor="middle" className="assembler-subtitle">
                ASSEMBLER
              </text>
            </g>

            <line x1="300" y1="280" x2="300" y2="320"
                  stroke="#000" strokeWidth="1" className="svg-path"/>
          </svg>
        </div>

        <div className="code-block" data-title="REPOSITORY STRUCTURE">
{`Apollo-11/
├── Comanche055/          # Command Module Guidance Computer
│   ├── MAIN.agc         # Main program entry point
│   ├── EXEC.agc         # Executive scheduler
│   └── ORBITAL_MANEUVERS.agc
├── Luminary099/          # Lunar Module Guidance Computer
│   ├── MAIN.agc         # Main program entry point
│   ├── LUNAR_LANDING_GUIDANCE.agc
│   └── DESCENT_GUIDANCE.agc
└── yaYUL/               # AGC Assembler
    └── assembly_tools/`}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="module-card">
            <div className="module-card-header">
              <span className="module-name">COMANCHE055</span>
              <span className="module-date">1969-04-01</span>
            </div>
            <div className="module-description">
              Command Module guidance software responsible for Earth orbit operations,
              trans-lunar injection, and command module navigation during lunar operations.
            </div>
          </div>

          <div className="module-card">
            <div className="module-card-header">
              <span className="module-name">LUMINARY099</span>
              <span className="module-date">1969-07-14</span>
            </div>
            <div className="module-description">
              Lunar Module guidance software handling lunar descent, landing operations,
              surface activities, and lunar ascent back to orbit.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}