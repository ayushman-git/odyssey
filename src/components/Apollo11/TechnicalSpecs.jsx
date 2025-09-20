'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function TechnicalSpecs() {
  const sectionRef = useRef(null);
  const diagramRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const diagram = diagramRef.current;

    // Animate section
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

    // Animate memory diagram
    const memoryBlocks = diagram?.querySelectorAll('.memory-block');
    if (memoryBlocks) {
      gsap.fromTo(memoryBlocks,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: diagram,
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
        <h2 className="section-title">TECHNICAL SPECIFICATIONS</h2>

        <table className="tech-table">
          <thead>
            <tr>
              <th>COMPONENT</th>
              <th>SPECIFICATION</th>
              <th>CONSTRAINTS</th>
              <th>IMPACT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PROCESSOR</td>
              <td>15-bit word, 1.024 MHz</td>
              <td>2.048K ROM, 1K RAM</td>
              <td>Extreme optimization required</td>
            </tr>
            <tr>
              <td>MEMORY</td>
              <td>Core rope (ROM) + Core (RAM)</td>
              <td>Hand-woven magnetic cores</td>
              <td>Programming had to be final</td>
            </tr>
            <tr>
              <td>INSTRUCTION SET</td>
              <td>11 basic instructions</td>
              <td>Minimal addressing modes</td>
              <td>Creative programming techniques</td>
            </tr>
            <tr>
              <td>REAL-TIME</td>
              <td>Hard real-time constraints</td>
              <td>Mission-critical timing</td>
              <td>No room for errors</td>
            </tr>
            <tr>
              <td>RELIABILITY</td>
              <td>Triple modular redundancy</td>
              <td>Radiation hardened</td>
              <td>100% uptime requirement</td>
            </tr>
          </tbody>
        </table>

        <div className="data-viz">
          <div className="data-viz-title">MEMORY ARCHITECTURE</div>

          <svg ref={diagramRef} className="apollo11-svg" viewBox="0 0 600 300">
            {/* Fixed Memory (ROM) */}
            <g className="memory-section">
              <rect x="50" y="50" width="150" height="200"
                    fill="none" stroke="#000" strokeWidth="2" className="memory-block"/>
              <text x="125" y="40" textAnchor="middle" className="memory-title">FIXED MEMORY</text>
              <text x="125" y="75" textAnchor="middle" className="memory-detail">36K WORDS</text>
              <text x="125" y="95" textAnchor="middle" className="memory-detail">CORE ROPE</text>

              {/* Program segments */}
              <rect x="60" y="110" width="130" height="20" fill="rgba(0,0,0,0.1)" className="memory-block"/>
              <text x="125" y="125" textAnchor="middle" className="segment-label">EXECUTIVE</text>

              <rect x="60" y="135" width="130" height="30" fill="rgba(0,0,0,0.1)" className="memory-block"/>
              <text x="125" y="155" textAnchor="middle" className="segment-label">GUIDANCE</text>

              <rect x="60" y="170" width="130" height="25" fill="rgba(0,0,0,0.1)" className="memory-block"/>
              <text x="125" y="187" textAnchor="middle" className="segment-label">NAVIGATION</text>

              <rect x="60" y="200" width="130" height="40" fill="rgba(0,0,0,0.1)" className="memory-block"/>
              <text x="125" y="225" textAnchor="middle" className="segment-label">DISPLAY/KEYBOARD</text>
            </g>

            {/* Erasable Memory (RAM) */}
            <g className="memory-section">
              <rect x="250" y="50" width="150" height="200"
                    fill="none" stroke="#000" strokeWidth="2" className="memory-block"/>
              <text x="325" y="40" textAnchor="middle" className="memory-title">ERASABLE MEMORY</text>
              <text x="325" y="75" textAnchor="middle" className="memory-detail">2K WORDS</text>
              <text x="325" y="95" textAnchor="middle" className="memory-detail">CORE MEMORY</text>

              {/* Variable sections */}
              <rect x="260" y="110" width="130" height="30" fill="rgba(0,0,0,0.2)" className="memory-block"/>
              <text x="325" y="130" textAnchor="middle" className="segment-label">VARIABLES</text>

              <rect x="260" y="145" width="130" height="35" fill="rgba(0,0,0,0.2)" className="memory-block"/>
              <text x="325" y="167" textAnchor="middle" className="segment-label">STACK</text>

              <rect x="260" y="185" width="130" height="55" fill="rgba(0,0,0,0.2)" className="memory-block"/>
              <text x="325" y="217" textAnchor="middle" className="segment-label">BUFFERS</text>
            </g>

            {/* Instruction Format */}
            <g className="instruction-format">
              <rect x="450" y="50" width="100" height="40"
                    fill="none" stroke="#000" strokeWidth="2" className="memory-block"/>
              <text x="500" y="40" textAnchor="middle" className="memory-title">15-BIT WORD</text>

              {/* Bit layout */}
              <line x1="460" y1="70" x2="540" y2="70" stroke="#000" strokeWidth="1"/>
              <text x="465" y="85" className="bit-label">14</text>
              <text x="490" y="85" className="bit-label">11</text>
              <text x="515" y="85" className="bit-label">10</text>
              <text x="535" y="85" className="bit-label">0</text>

              <text x="475" y="105" textAnchor="middle" className="field-label">OP</text>
              <text x="525" y="105" textAnchor="middle" className="field-label">ADDRESS</text>
            </g>

            {/* Data flow arrows */}
            <path d="M 205 150 Q 225 130 245 150" fill="none" stroke="#000" strokeWidth="1" markerEnd="url(#arrowhead)" className="memory-block"/>
            <path d="M 245 170 Q 225 190 205 170" fill="none" stroke="#000" strokeWidth="1" markerEnd="url(#arrowhead)" className="memory-block"/>

            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#000"/>
              </marker>
            </defs>
          </svg>
        </div>

        <div className="code-block" data-title="AGC INSTRUCTION SET">
{`# Basic AGC Instructions (11 total)
TC    # Transfer Control (Jump)
CCS   # Count, Compare, Skip
INDEX # Index next instruction
XCH   # Exchange
CS    # Clear and Subtract
TS    # Transfer to Storage
AD    # Add
MASK  # Logical AND
READ  # Read from I/O
WRITE # Write to I/O
RAND  # Read AND with mask

# Example: Simple addition routine
        CA      OPERAND1    # Load first operand
        AD      OPERAND2    # Add second operand
        TS      RESULT      # Store result`}
        </div>
      </div>
    </section>
  );
}