'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function LunarLanding() {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const alarmRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    const lm = svg?.querySelector('.landing-lm');
    const descentPath = svg?.querySelector('.descent-path');
    const thrusterFlame = svg?.querySelector('.thruster-flame');

    // Descent trajectory animation
    gsap.fromTo(descentPath,
      { strokeDashoffset: 1000 },
      {
        strokeDashoffset: 0,
        duration: 4,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // LM descent animation
    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        toggleActions: 'play none none reverse'
      }
    })
    .fromTo(lm,
      { x: -100, y: -50, rotation: -10 },
      { x: 0, y: 0, rotation: 0, duration: 3, ease: 'power2.out' }
    )
    .to(lm, {
      y: 5,
      duration: 1,
      ease: 'bounce.out'
    });

    // Thruster flame animation
    gsap.to(thrusterFlame, {
      scaleY: 1.5,
      opacity: 0.8,
      duration: 0.2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        toggleActions: 'play pause resume pause'
      }
    });

    // Alarm animation
    const alarmText = alarmRef.current;
    if (alarmText) {
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 40%',
          toggleActions: 'play none none reverse'
        }
      })
      .to(alarmText, {
        opacity: 1,
        color: 'var(--accent-orange)',
        duration: 0.3,
        repeat: 5,
        yoyo: true
      })
      .to(alarmText, {
        opacity: 0.7,
        color: 'var(--accent-green)',
        duration: 0.5
      });
    }

  }, []);

  return (
    <section ref={sectionRef} className="mission-section">
      <div className="section-content">
        <div className="section-text">
          <div className="mission-phase">
            <span>T+102:45:40 • POWERED DESCENT</span>
          </div>
          <h2 className="section-title">
            LUNAR
            <br />
            <span style={{ color: 'var(--accent-orange)' }}>LANDING</span>
          </h2>
          <p className="section-subtitle">
            "The Eagle has landed"
          </p>
          <p className="section-description">
            The most critical 12 minutes of the mission. The Lunar Module's Descent Engine fires
            as the AGC navigates through program alarms 1201 and 1202. Margaret Hamilton's
            priority scheduling saves the mission, allowing Armstrong to land with just 17 seconds of fuel remaining.
          </p>

          <div className="code-display" data-language="Landing Guidance">
            <div className="code-line">P63          CAF     PRIO24      # LANDING PRIORITY</div>
            <div className="code-line">             TS      PHSPRDT1    # PHASE PRODUCT</div>
            <div className="code-line">             TC      PHASCHNG    # CHANGE PHASE</div>
            <div className="code-line">             OCT     04024       # PHASE 04024</div>
            <div className="code-line">                                      </div>
            <div className="code-line" ref={alarmRef} style={{ opacity: 0.3 }}>ALARM        TC      ALARM       # COMPUTER OVERLOAD</div>
            <div className="code-line">             OCT     01201       # EXECUTIVE OVERFLOW</div>
            <div className="code-line">             TC      RESUME      # CONTINUE DESCENT</div>
            <div className="code-line">                                      </div>
            <div className="code-line">FLAMEOUT     CAF     LOWFUEL     # FUEL WARNING</div>
            <div className="code-line">             TS      FUELWARN    # SET WARNING</div>
            <div className="code-line">             TC      CONTACT     # LUNAR CONTACT</div>
            <div className="code-line">             TCF     SHUTDOWN    # ENGINE SHUTDOWN</div>
          </div>

          <div className="tech-grid">
            <div className="tech-item">
              <div className="tech-label">Descent Duration</div>
              <div className="tech-value">12m 36s</div>
            </div>
            <div className="tech-item">
              <div className="tech-label">Fuel Remaining</div>
              <div className="tech-value">17 seconds</div>
            </div>
            <div className="tech-item">
              <div className="tech-label">Landing Site</div>
              <div className="tech-value">Sea of Tranquility</div>
            </div>
            <div className="tech-item">
              <div className="tech-label">Touchdown Velocity</div>
              <div className="tech-value">1.7 m/s</div>
            </div>
          </div>
        </div>

        <div className="section-visual">
          <svg ref={svgRef} className="mission-svg" viewBox="0 0 500 500">
            {/* Lunar surface */}
            <path d="M 0 400 Q 100 380 200 390 Q 300 400 400 385 Q 450 380 500 390 L 500 500 L 0 500 Z"
                  className="svg-outline"
                  fill="rgba(255, 255, 255, 0.1)" stroke="var(--text-primary)" strokeWidth="2" />

            {/* Surface features */}
            <circle cx="150" cy="395" r="8"
                    className="svg-fill"
                    fill="rgba(255, 255, 255, 0.1)" />
            <circle cx="300" cy="400" r="12"
                    className="svg-fill"
                    fill="rgba(255, 255, 255, 0.1)" />
            <circle cx="400" cy="390" r="6"
                    className="svg-fill"
                    fill="rgba(255, 255, 255, 0.1)" />

            {/* Descent trajectory */}
            <path d="M 50 50 Q 150 200 250 350"
                  className="descent-path svg-outline"
                  fill="none" stroke="var(--accent-green)" strokeWidth="2"
                  strokeDasharray="1000" strokeDashoffset="1000" />

            {/* Lunar Module during landing */}
            <g className="landing-lm" style={{ transformOrigin: 'center' }}>
              {/* Descent stage */}
              <polygon points="240,340 280,340 285,365 235,365"
                       className="svg-outline"
                       fill="none" stroke="var(--accent-orange)" strokeWidth="2" />

              {/* Ascent stage */}
              <rect x="245" y="325" width="20" height="15"
                    className="svg-outline"
                    fill="none" stroke="var(--accent-orange)" strokeWidth="2"
                    rx="2" />

              {/* Landing legs */}
              <path d="M 240 365 L 220 385 L 225 390"
                    className="svg-outline"
                    stroke="var(--accent-orange)" strokeWidth="2" />
              <path d="M 280 365 L 300 385 L 295 390"
                    className="svg-outline"
                    stroke="var(--accent-orange)" strokeWidth="2" />
              <path d="M 250 365 L 240 385 L 245 390"
                    className="svg-outline"
                    stroke="var(--accent-orange)" strokeWidth="2" />
              <path d="M 270 365 L 280 385 L 275 390"
                    className="svg-outline"
                    stroke="var(--accent-orange)" strokeWidth="2" />

              {/* Engine nozzle */}
              <rect x="255" y="365" width="10" height="8"
                    className="svg-outline"
                    fill="none" stroke="var(--accent-orange)" strokeWidth="1" />
            </g>

            {/* Descent engine flame */}
            <polygon points="260,373 262,390 258,390"
                     className="thruster-flame svg-fill"
                     fill="var(--accent-orange)" opacity="0.6" />

            {/* Radar signals */}
            <g className="landing-radar">
              <path d="M 260 340 L 220 380"
                    className="svg-outline"
                    stroke="var(--accent-green)" strokeWidth="1"
                    strokeDasharray="2,2" />
              <path d="M 260 340 L 260 385"
                    className="svg-outline"
                    stroke="var(--accent-green)" strokeWidth="1"
                    strokeDasharray="2,2" />
              <path d="M 260 340 L 300 380"
                    className="svg-outline"
                    stroke="var(--accent-green)" strokeWidth="1"
                    strokeDasharray="2,2" />
            </g>

            {/* Altitude markers */}
            <g className="altitude-readings">
              <text x="320" y="150" className="svg-label" fontSize="10" fill="var(--accent-green)">
                500 ft
              </text>
              <text x="320" y="250" className="svg-label" fontSize="10" fill="var(--accent-green)">
                100 ft
              </text>
              <text x="320" y="320" className="svg-label" fontSize="10" fill="var(--accent-orange)">
                30 ft
              </text>
            </g>

            {/* Armstrong's manual control indication */}
            <g className="manual-control">
              <circle cx="260" cy="300" r="15"
                      className="svg-outline"
                      fill="none" stroke="var(--accent-blue)" strokeWidth="1"
                      strokeDasharray="3,3" />
              <text x="290" y="305" className="svg-label" fontSize="9" fill="var(--accent-blue)">
                MANUAL
              </text>
            </g>

            {/* Landing site label */}
            <text x="250" y="450" textAnchor="middle"
                  className="svg-label" fontSize="14" fill="var(--text-primary)">
              TRANQUILITY BASE
            </text>

            {/* Computer alarm indicator */}
            <rect x="350" y="50" width="120" height="60"
                  className="svg-outline"
                  fill="rgba(255, 107, 53, 0.1)" stroke="var(--accent-orange)" strokeWidth="1" />
            <text x="410" y="70" textAnchor="middle"
                  className="svg-label" fontSize="10" fill="var(--accent-orange)">
              PROGRAM ALARM
            </text>
            <text x="410" y="85" textAnchor="middle"
                  className="svg-label" fontSize="12" fill="var(--accent-orange)" fontWeight="bold">
              1201
            </text>
            <text x="410" y="100" textAnchor="middle"
                  className="svg-label" fontSize="8" fill="var(--text-secondary)">
              EXECUTIVE OVERFLOW
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}