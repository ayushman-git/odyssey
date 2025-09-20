'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function LunarApproach() {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;

    // Lunar orbit insertion animation
    const orbitPath = svg?.querySelector('.lunar-orbit');
    gsap.fromTo(orbitPath,
      { strokeDashoffset: 800 },
      {
        strokeDashoffset: 0,
        duration: 3,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // CSM and LM separation animation
    const csm = svg?.querySelector('.csm');
    const lm = svg?.querySelector('.lm');

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 50%',
        toggleActions: 'play none none reverse'
      }
    })
    .to(csm, { x: -20, duration: 1.5, ease: 'power2.out' })
    .to(lm, { x: 20, y: 10, duration: 1.5, ease: 'power2.out' }, '<')
    .to([csm, lm], {
      rotation: 5,
      duration: 2,
      ease: 'power1.inOut',
      transformOrigin: 'center'
    }, '<0.5');

    // Navigation computer activity
    const computerLines = svg?.querySelectorAll('.computer-activity');
    gsap.to(computerLines, {
      opacity: 1,
      duration: 0.3,
      stagger: 0.1,
      repeat: -1,
      yoyo: true,
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        toggleActions: 'play pause resume pause'
      }
    });

  }, []);

  return (
    <section ref={sectionRef} className="mission-section">
      <div className="section-content">
        <div className="section-visual">
          <svg ref={svgRef} className="mission-svg" viewBox="0 0 500 400">
            {/* Moon surface */}
            <ellipse cx="250" cy="350" rx="200" ry="50"
                     className="svg-outline"
                     fill="none" stroke="var(--text-primary)" strokeWidth="2" />

            {/* Moon craters */}
            <circle cx="180" cy="330" r="8"
                    className="svg-fill"
                    fill="rgba(255, 255, 255, 0.1)" />
            <circle cx="300" cy="340" r="12"
                    className="svg-fill"
                    fill="rgba(255, 255, 255, 0.1)" />
            <circle cx="220" cy="355" r="6"
                    className="svg-fill"
                    fill="rgba(255, 255, 255, 0.1)" />

            {/* Lunar orbit */}
            <ellipse cx="250" cy="200" rx="180" ry="90"
                     className="lunar-orbit svg-outline"
                     fill="none" stroke="var(--accent-green)" strokeWidth="2"
                     strokeDasharray="800" strokeDashoffset="800" />

            {/* Command Service Module */}
            <g className="csm" style={{ transformOrigin: 'center' }}>
              <rect x="200" y="150" width="25" height="15"
                    className="svg-outline"
                    fill="none" stroke="var(--accent-blue)" strokeWidth="2"
                    rx="3" />
              <polygon points="225,157.5 235,152 235,163"
                       className="svg-outline"
                       fill="none" stroke="var(--accent-blue)" strokeWidth="1" />

              {/* Service module engine */}
              <rect x="195" y="155" width="5" height="5"
                    className="svg-outline"
                    fill="none" stroke="var(--accent-blue)" strokeWidth="1" />
            </g>

            {/* Lunar Module */}
            <g className="lm" style={{ transformOrigin: 'center' }}>
              {/* Descent stage */}
              <polygon points="250,170 270,170 275,185 245,185"
                       className="svg-outline"
                       fill="none" stroke="var(--accent-orange)" strokeWidth="2" />

              {/* Ascent stage */}
              <rect x="252" y="160" width="16" height="10"
                    className="svg-outline"
                    fill="none" stroke="var(--accent-orange)" strokeWidth="2"
                    rx="2" />

              {/* Landing legs */}
              <path d="M 250 185 L 240 195"
                    className="svg-outline"
                    stroke="var(--accent-orange)" strokeWidth="1" />
              <path d="M 270 185 L 280 195"
                    className="svg-outline"
                    stroke="var(--accent-orange)" strokeWidth="1" />
              <path d="M 255 185 L 250 195"
                    className="svg-outline"
                    stroke="var(--accent-orange)" strokeWidth="1" />
              <path d="M 265 185 L 270 195"
                    className="svg-outline"
                    stroke="var(--accent-orange)" strokeWidth="1" />
            </g>

            {/* Navigation signals */}
            <g className="nav-signals">
              <circle cx="150" cy="100" r="3"
                      className="computer-activity"
                      fill="var(--accent-green)" opacity="0" />
              <circle cx="170" cy="90" r="2"
                      className="computer-activity"
                      fill="var(--accent-green)" opacity="0" />
              <circle cx="190" cy="110" r="2"
                      className="computer-activity"
                      fill="var(--accent-green)" opacity="0" />

              {/* Signal lines */}
              <path d="M 150 100 Q 200 120 212 157"
                    className="computer-activity svg-outline"
                    fill="none" stroke="var(--accent-green)" strokeWidth="1"
                    strokeDasharray="2,2" opacity="0" />
            </g>

            {/* Altitude indicators */}
            <g className="altitude-markers">
              <line x1="350" y1="120" x2="380" y2="120"
                    className="svg-outline"
                    stroke="var(--text-secondary)" strokeWidth="1" />
              <text x="390" y="125" className="svg-label" fontSize="9" fill="var(--text-secondary)">
                100 km
              </text>

              <line x1="350" y1="160" x2="380" y2="160"
                    className="svg-outline"
                    stroke="var(--text-secondary)" strokeWidth="1" />
              <text x="390" y="165" className="svg-label" fontSize="9" fill="var(--text-secondary)">
                15 km
              </text>
            </g>

            {/* Technical annotations */}
            <text x="120" y="380" className="svg-label" fontSize="12" fill="var(--text-primary)">
              LUNAR SURFACE
            </text>
            <text x="80" y="50" className="svg-label" fontSize="10" fill="var(--accent-green)">
              AGC NAVIGATION
            </text>
            <text x="430" y="200" className="svg-label" fontSize="10" fill="var(--accent-green)">
              LUNAR ORBIT
            </text>
          </svg>
        </div>

        <div className="section-text">
          <div className="mission-phase">
            <span>T+75:49:50 • LOI BURN</span>
          </div>
          <h2 className="section-title">
            LUNAR ORBIT
            <br />
            <span style={{ color: 'var(--accent-blue)' }}>INSERTION</span>
          </h2>
          <p className="section-subtitle">
            Captured by the Moon's gravitational field
          </p>
          <p className="section-description">
            After a 3-day coast to the Moon, the Service Propulsion System fires to insert
            Apollo 11 into lunar orbit. The AGC calculates precise orbital mechanics
            as the Command and Lunar Modules prepare for their historic separation.
          </p>

          <div className="code-display" data-language="Orbital Mechanics">
            <div className="code-line">LOI          TC      PHASCHNG    # LUNAR ORBIT INSERT</div>
            <div className="code-line">             OCT     05024       # PHASE CHANGE</div>
            <div className="code-line">             TC      BANKCALL    # CALCULATE BURN</div>
            <div className="code-line">             CADR    BURNBABY    # BURN ROUTINE</div>
            <div className="code-line">                                      </div>
            <div className="code-line">ORBCHK       CAF     RCSFLBIT    # RCS CONTROL</div>
            <div className="code-line">             MASK    DAPBITS     # DAP STATUS</div>
            <div className="code-line">             CCS     A           # CHECK STATUS</div>
            <div className="code-line">             TCF     ORBSTAB     # STABLE ORBIT</div>
            <div className="code-line">                                      </div>
            <div className="code-line">SEPCHK       CAF     SEPTIME     # SEPARATION TIME</div>
            <div className="code-line">             TS      TBASE4      # TIME BASE</div>
          </div>

          <div className="tech-grid">
            <div className="tech-item">
              <div className="tech-label">Orbital Period</div>
              <div className="tech-value">2h 11m</div>
            </div>
            <div className="tech-item">
              <div className="tech-label">Perilune</div>
              <div className="tech-value">100.9 km</div>
            </div>
            <div className="tech-item">
              <div className="tech-label">Apolune</div>
              <div className="tech-value">122.4 km</div>
            </div>
            <div className="tech-item">
              <div className="tech-label">Orbital Velocity</div>
              <div className="tech-value">1.6 km/s</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}