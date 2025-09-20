'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function MissionHero() {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    const text = textRef.current;

    // Initial hero animation
    gsap.timeline()
      .fromTo(text.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power2.out' }
      )
      .fromTo(svg,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' },
        '-=0.5'
      );

    // AGC outline animation
    const agcPaths = svg?.querySelectorAll('.agc-outline');
    gsap.fromTo(agcPaths,
      { strokeDashoffset: 1000 },
      {
        strokeDashoffset: 0,
        duration: 3,
        stagger: 0.2,
        ease: 'power2.inOut',
        delay: 1
      }
    );

    // Parallax effect
    gsap.to(svg, {
      y: -100,
      rotation: 5,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

  }, []);

  return (
    <section ref={sectionRef} className="mission-section" style={{ minHeight: '100vh' }}>
      <div className="section-content">
        <div ref={textRef} className="section-text">
          <div className="mission-phase">
            <span>MISSION OVERVIEW</span>
          </div>
          <h1 className="section-title">
            APOLLO 11
            <br />
            <span style={{ color: 'var(--accent-green)' }}>GUIDANCE COMPUTER</span>
          </h1>
          <p className="section-subtitle">
            The software that guided humanity to the moon
          </p>
          <p className="section-description">
            In July 1969, 36,000 words of carefully crafted assembly code powered the Apollo Guidance Computer,
            navigating the command and lunar modules through the most ambitious journey in human history.
            Led by Margaret Hamilton and the MIT Instrumentation Laboratory, this software represented
            the birth of modern software engineering.
          </p>

          <div className="tech-grid">
            <div className="tech-item">
              <div className="tech-label">Memory</div>
              <div className="tech-value">4K Words</div>
            </div>
            <div className="tech-item">
              <div className="tech-label">Processing</div>
              <div className="tech-value">1.024 MHz</div>
            </div>
            <div className="tech-item">
              <div className="tech-label">Mission Duration</div>
              <div className="tech-value">8d 3h 18m</div>
            </div>
            <div className="tech-item">
              <div className="tech-label">Lines of Code</div>
              <div className="tech-value">~145K LOC</div>
            </div>
          </div>
        </div>

        <div className="section-visual">
          <svg ref={svgRef} className="mission-svg" viewBox="0 0 400 400">
            {/* AGC Computer outline */}
            <g className="agc-computer">
              {/* Main computer housing */}
              <rect x="120" y="120" width="160" height="120"
                    className="agc-outline svg-outline"
                    rx="8" />

              {/* Display interface */}
              <rect x="135" y="135" width="130" height="60"
                    className="agc-outline svg-outline"
                    rx="4" />

              {/* DSKY segments */}
              <rect x="145" y="145" width="35" height="15"
                    className="agc-outline svg-outline"
                    rx="2" />
              <rect x="185" y="145" width="35" height="15"
                    className="agc-outline svg-outline"
                    rx="2" />
              <rect x="225" y="145" width="35" height="15"
                    className="agc-outline svg-outline"
                    rx="2" />

              {/* Warning lights */}
              <circle cx="150" cy="175" r="3"
                      className="agc-outline svg-outline" />
              <circle cx="165" cy="175" r="3"
                      className="agc-outline svg-outline" />
              <circle cx="180" cy="175" r="3"
                      className="agc-outline svg-outline" />

              {/* Keyboard */}
              <g className="keyboard-grid">
                {[...Array(5)].map((_, row) =>
                  [...Array(4)].map((_, col) => (
                    <rect key={`key-${row}-${col}`}
                          x={145 + col * 25}
                          y={200 + row * 15}
                          width="20" height="10"
                          className="agc-outline svg-outline"
                          rx="1" />
                  ))
                )}
              </g>

              {/* Connection ports */}
              <rect x="100" y="160" width="15" height="8"
                    className="agc-outline svg-outline"
                    rx="1" />
              <rect x="285" y="160" width="15" height="8"
                    className="agc-outline svg-outline"
                    rx="1" />
            </g>

            {/* Data flow lines */}
            <g className="data-flow">
              <path d="M 80 180 Q 60 140 100 100"
                    className="agc-outline svg-outline"
                    fill="none"
                    strokeDasharray="5,5" />
              <path d="M 320 180 Q 340 140 300 100"
                    className="agc-outline svg-outline"
                    fill="none"
                    strokeDasharray="5,5" />
              <path d="M 200 280 Q 200 320 160 340"
                    className="agc-outline svg-outline"
                    fill="none"
                    strokeDasharray="5,5" />
              <path d="M 200 280 Q 200 320 240 340"
                    className="agc-outline svg-outline"
                    fill="none"
                    strokeDasharray="5,5" />
            </g>

            {/* Technical labels */}
            <text x="200" y="80" textAnchor="middle"
                  className="svg-label"
                  fontSize="12"
                  fill="var(--accent-green)">
              APOLLO GUIDANCE COMPUTER
            </text>
            <text x="200" y="380" textAnchor="middle"
                  className="svg-label"
                  fontSize="10"
                  fill="var(--text-secondary)">
              MIT INSTRUMENTATION LABORATORY
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}