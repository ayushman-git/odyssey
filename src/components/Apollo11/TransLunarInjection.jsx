'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function TransLunarInjection() {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const orbitRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    const spacecraft = svg?.querySelector('.spacecraft');
    const trajectoryPath = svg?.querySelector('.trajectory-path');

    // Earth orbit animation
    gsap.to('.earth-orbit', {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center'
    });

    // Spacecraft trajectory animation
    gsap.fromTo(trajectoryPath,
      { strokeDashoffset: 2000 },
      {
        strokeDashoffset: 0,
        duration: 4,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Spacecraft movement along trajectory
    gsap.to(spacecraft, {
      motionPath: {
        path: trajectoryPath,
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
      },
      duration: 6,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: section,
        start: 'top 50%',
        toggleActions: 'play none none reverse'
      }
    });

    // TLI burn effect
    const burnEffect = svg?.querySelector('.tli-burn');
    gsap.to(burnEffect, {
      opacity: 1,
      scale: 1.5,
      duration: 0.3,
      repeat: 3,
      yoyo: true,
      scrollTrigger: {
        trigger: section,
        start: 'top 40%',
        toggleActions: 'play none none reverse'
      }
    });

  }, []);

  return (
    <section ref={sectionRef} className="mission-section">
      <div className="section-content">
        <div className="section-text">
          <div className="mission-phase">
            <span>T+02:44:16 • TLI BURN</span>
          </div>
          <h2 className="section-title">
            TRANS-LUNAR
            <br />
            <span style={{ color: 'var(--accent-blue)' }}>INJECTION</span>
          </h2>
          <p className="section-subtitle">
            Breaking free from Earth's gravitational embrace
          </p>
          <p className="section-description">
            After one and a half Earth orbits, the S-IVB third stage reignites for Trans-Lunar Injection.
            The AGC calculates the precise burn duration and trajectory adjustments needed to reach
            the Moon's sphere of influence 240,000 miles away.
          </p>

          <div className="code-display" data-language="AGC Navigation">
            <div className="code-line">TLI          CAF     PRIO20      # HIGH PRIORITY</div>
            <div className="code-line">             TS      PHSPRDT1    # PHASE PRODUCT</div>
            <div className="code-line">             CAF     BIT15       # GUIDANCE ENABLE</div>
            <div className="code-line">             TS      GUIDBIT     # SET GUIDANCE</div>
            <div className="code-line">                                      </div>
            <div className="code-line">             TC      BANKCALL    # CALL NAVIGATION</div>
            <div className="code-line">             CADR    SERVICER    # SERVICE ROUTINE</div>
            <div className="code-line">                                      </div>
            <div className="code-line">TLIBURN      CAF     SIVBBURN    # S-IVB BURN TIME</div>
            <div className="code-line">             TS      SAVET       # SAVE TIME</div>
            <div className="code-line">             CAF     TLITARG     # TARGET VELOCITY</div>
            <div className="code-line">             TS      VT          # VELOCITY TARGET</div>
          </div>

          <div className="tech-grid">
            <div className="tech-item">
              <div className="tech-label">Burn Duration</div>
              <div className="tech-value">5m 48s</div>
            </div>
            <div className="tech-item">
              <div className="tech-label">ΔV Required</div>
              <div className="tech-value">3.15 km/s</div>
            </div>
            <div className="tech-item">
              <div className="tech-label">Final Velocity</div>
              <div className="tech-value">10.9 km/s</div>
            </div>
            <div className="tech-item">
              <div className="tech-label">Distance to Moon</div>
              <div className="tech-value">384,400 km</div>
            </div>
          </div>
        </div>

        <div className="section-visual">
          <svg ref={svgRef} className="mission-svg" viewBox="0 0 500 400">
            {/* Earth */}
            <circle cx="150" cy="200" r="60"
                    className="svg-outline"
                    fill="none" stroke="var(--accent-blue)" strokeWidth="2" />

            {/* Earth features */}
            <circle cx="135" cy="185" r="8"
                    className="svg-fill"
                    fill="rgba(78, 205, 196, 0.3)" />
            <circle cx="165" cy="210" r="12"
                    className="svg-fill"
                    fill="rgba(78, 205, 196, 0.3)" />

            {/* Earth parking orbit */}
            <circle cx="150" cy="200" r="80"
                    className="earth-orbit svg-outline"
                    fill="none" stroke="var(--text-secondary)" strokeWidth="1"
                    strokeDasharray="3,3" opacity="0.5" />

            {/* Moon */}
            <circle cx="420" cy="80" r="25"
                    className="svg-outline"
                    fill="none" stroke="var(--text-primary)" strokeWidth="2" />

            {/* Moon craters */}
            <circle cx="415" cy="75" r="3"
                    className="svg-fill"
                    fill="rgba(255, 255, 255, 0.2)" />
            <circle cx="425" cy="85" r="4"
                    className="svg-fill"
                    fill="rgba(255, 255, 255, 0.2)" />

            {/* Trans-lunar trajectory */}
            <path d="M 230 200 Q 320 140 420 80"
                  className="trajectory-path svg-outline"
                  fill="none" stroke="var(--accent-green)" strokeWidth="2"
                  strokeDasharray="1500" strokeDashoffset="1500" />

            {/* Spacecraft (CSM + LM) */}
            <g className="spacecraft" style={{ transformOrigin: 'center' }}>
              <rect x="225" y="195" width="15" height="10"
                    className="svg-outline"
                    fill="none" stroke="var(--accent-green)" strokeWidth="2"
                    rx="2" />
              <polygon points="240,200 250,195 250,205"
                       className="svg-outline"
                       fill="none" stroke="var(--accent-green)" strokeWidth="1" />
            </g>

            {/* TLI burn effect */}
            <circle cx="235" cy="200" r="8"
                    className="tli-burn"
                    fill="var(--accent-orange)" opacity="0" />

            {/* Velocity vectors */}
            <g className="velocity-vectors">
              <path d="M 230 180 L 270 160"
                    className="svg-outline"
                    stroke="var(--accent-orange)" strokeWidth="2"
                    markerEnd="url(#arrowhead)" />
              <path d="M 350 120 L 390 100"
                    className="svg-outline"
                    stroke="var(--accent-orange)" strokeWidth="2"
                    markerEnd="url(#arrowhead)" />
            </g>

            {/* Technical annotations */}
            <text x="150" y="300" textAnchor="middle"
                  className="svg-label" fontSize="12" fill="var(--accent-blue)">
              EARTH
            </text>
            <text x="420" y="120" textAnchor="middle"
                  className="svg-label" fontSize="12" fill="var(--text-primary)">
              MOON
            </text>
            <text x="320" y="180" textAnchor="middle"
                  className="svg-label" fontSize="10" fill="var(--accent-green)">
              FREE RETURN TRAJECTORY
            </text>

            {/* Arrow marker definition */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7"
                      refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7"
                         fill="var(--accent-orange)" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}