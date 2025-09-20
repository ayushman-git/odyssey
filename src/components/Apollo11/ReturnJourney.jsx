'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ReturnJourney() {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;

    // Ascent stage separation
    const ascentStage = svg?.querySelector('.ascent-stage');
    const descentStage = svg?.querySelector('.descent-stage');

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    })
    .to(ascentStage, {
      y: -100,
      rotation: 5,
      duration: 2,
      ease: 'power2.out'
    })
    .to(descentStage, {
      opacity: 0.3,
      duration: 1,
      ease: 'power2.out'
    }, '<');

    // Trans-Earth injection trajectory
    const teiPath = svg?.querySelector('.tei-trajectory');
    gsap.fromTo(teiPath,
      { strokeDashoffset: 1200 },
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

    // Earth approach animation
    const earth = svg?.querySelector('.earth-return');
    gsap.fromTo(earth,
      { scale: 0.3, opacity: 0.5 },
      {
        scale: 1,
        opacity: 1,
        duration: 3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Splashdown sequence
    const commandModule = svg?.querySelector('.command-module');
    const parachutes = svg?.querySelectorAll('.parachute');

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 30%',
        toggleActions: 'play none none reverse'
      }
    })
    .fromTo(parachutes,
      { opacity: 0, scaleY: 0.1 },
      { opacity: 1, scaleY: 1, duration: 1, stagger: 0.2 }
    )
    .to(commandModule, {
      y: 20,
      duration: 2,
      ease: 'bounce.out'
    }, '<0.5');

  }, []);

  return (
    <section ref={sectionRef} className="mission-section">
      <div className="section-content">
        <div className="section-visual">
          <svg ref={svgRef} className="mission-svg" viewBox="0 0 600 500">
            {/* Moon surface with LM descent stage */}
            <ellipse cx="100" cy="450" rx="80" ry="30"
                     className="svg-outline"
                     fill="none" stroke="var(--text-primary)" strokeWidth="2" />

            {/* LM descent stage (left behind) */}
            <g className="descent-stage">
              <polygon points="85,440 115,440 120,450 80,450"
                       className="svg-outline"
                       fill="none" stroke="var(--accent-orange)" strokeWidth="1" />
              <rect x="95" y="435" width="10" height="5"
                    className="svg-outline"
                    fill="none" stroke="var(--accent-orange)" strokeWidth="1" />
            </g>

            {/* LM ascent stage */}
            <g className="ascent-stage" style={{ transformOrigin: 'center' }}>
              <rect x="95" y="400" width="10" height="8"
                    className="svg-outline"
                    fill="none" stroke="var(--accent-orange)" strokeWidth="2"
                    rx="1" />
              <polygon points="100,400 105,395 95,395"
                       className="svg-outline"
                       fill="none" stroke="var(--accent-orange)" strokeWidth="1" />
            </g>

            {/* CSM in lunar orbit */}
            <ellipse cx="300" cy="200" rx="150" ry="75"
                     className="svg-outline"
                     fill="none" stroke="var(--accent-blue)" strokeWidth="1"
                     strokeDasharray="5,5" opacity="0.5" />

            <rect x="290" y="195" width="20" height="10"
                  className="svg-outline"
                  fill="none" stroke="var(--accent-blue)" strokeWidth="2"
                  rx="2" />

            {/* Trans-Earth injection trajectory */}
            <path d="M 300 200 Q 400 150 500 100"
                  className="tei-trajectory svg-outline"
                  fill="none" stroke="var(--accent-green)" strokeWidth="2"
                  strokeDasharray="1200" strokeDashoffset="1200" />

            {/* Earth */}
            <circle cx="500" cy="100" r="40"
                    className="earth-return svg-outline"
                    fill="none" stroke="var(--accent-blue)" strokeWidth="2" />

            {/* Earth features */}
            <circle cx="485" cy="85" r="6"
                    className="svg-fill"
                    fill="rgba(78, 205, 196, 0.3)" />
            <circle cx="510" cy="110" r="8"
                    className="svg-fill"
                    fill="rgba(78, 205, 196, 0.3)" />

            {/* Atmospheric entry */}
            <path d="M 460 140 Q 480 160 500 180"
                  className="svg-outline"
                  stroke="var(--accent-orange)" strokeWidth="2" />

            {/* Command module during reentry */}
            <g className="command-module" style={{ transformOrigin: 'center' }}>
              <polygon points="480,170 490,170 495,180 475,180"
                       className="svg-outline"
                       fill="none" stroke="var(--accent-blue)" strokeWidth="2" />

              {/* Heat shield glow */}
              <polygon points="475,180 495,180 490,185 480,185"
                       className="svg-fill"
                       fill="var(--accent-orange)" opacity="0.6" />
            </g>

            {/* Parachutes */}
            <g className="parachutes">
              <ellipse cx="475" cy="150" rx="8" ry="12"
                       className="parachute svg-outline"
                       fill="none" stroke="var(--text-primary)" strokeWidth="1" />
              <ellipse cx="490" cy="150" rx="8" ry="12"
                       className="parachute svg-outline"
                       fill="none" stroke="var(--text-primary)" strokeWidth="1" />
              <ellipse cx="505" cy="150" rx="8" ry="12"
                       className="parachute svg-outline"
                       fill="none" stroke="var(--text-primary)" strokeWidth="1" />

              {/* Parachute lines */}
              <line x1="475" y1="162" x2="480" y2="170"
                    className="svg-outline"
                    stroke="var(--text-primary)" strokeWidth="1" />
              <line x1="490" y1="162" x2="485" y2="170"
                    className="svg-outline"
                    stroke="var(--text-primary)" strokeWidth="1" />
              <line x1="505" y1="162" x2="490" y2="170"
                    className="svg-outline"
                    stroke="var(--text-primary)" strokeWidth="1" />
            </g>

            {/* Ocean surface */}
            <path d="M 400 380 Q 450 370 500 375 Q 550 380 600 375 L 600 500 L 400 500 Z"
                  className="svg-outline"
                  fill="rgba(78, 205, 196, 0.2)" stroke="var(--accent-blue)" strokeWidth="1" />

            {/* Recovery ships */}
            <rect x="520" y="370" width="15" height="5"
                  className="svg-outline"
                  fill="none" stroke="var(--text-primary)" strokeWidth="1" />
            <rect x="545" y="372" width="10" height="3"
                  className="svg-outline"
                  fill="none" stroke="var(--text-primary)" strokeWidth="1" />

            {/* Mission phases labels */}
            <text x="100" y="480" textAnchor="middle"
                  className="svg-label" fontSize="10" fill="var(--accent-orange)">
              LUNAR ASCENT
            </text>
            <text x="300" y="280" textAnchor="middle"
                  className="svg-label" fontSize="10" fill="var(--accent-blue)">
              LUNAR ORBIT RENDEZVOUS
            </text>
            <text x="400" y="120" textAnchor="middle"
                  className="svg-label" fontSize="10" fill="var(--accent-green)">
              TRANS-EARTH INJECTION
            </text>
            <text x="485" y="210" textAnchor="middle"
                  className="svg-label" fontSize="10" fill="var(--text-primary)">
              SPLASHDOWN
            </text>
          </svg>
        </div>

        <div className="section-text">
          <div className="mission-phase">
            <span>T+124:22:00 • RETURN HOME</span>
          </div>
          <h2 className="section-title">
            SAFE
            <br />
            <span style={{ color: 'var(--accent-blue)' }}>RETURN</span>
          </h2>
          <p className="section-subtitle">
            Mission accomplished - humanity's first lunar landing
          </p>
          <p className="section-description">
            After 21 hours on the lunar surface, the ascent stage lifts off to rendezvous with
            Michael Collins in the Command Module. The AGC calculates the precise orbital mechanics
            for Trans-Earth Injection, guiding the crew safely home through atmospheric reentry
            and splashdown in the Pacific Ocean.
          </p>

          <div className="code-display" data-language="Return Sequence">
            <div className="code-line">TEI          CAF     PRIO17      # TRANS-EARTH INJECT</div>
            <div className="code-line">             TS      PHSPRDT1    # PHASE PRODUCT</div>
            <div className="code-line">             TC      PHASCHNG    # CHANGE PHASE</div>
            <div className="code-line">             OCT     05024       # PHASE 05024</div>
            <div className="code-line">                                      </div>
            <div className="code-line">REENTRY      CAF     ENTRYBIT    # ENTRY ENABLE</div>
            <div className="code-line">             TS      FLAGWRD1    # SET FLAG</div>
            <div className="code-line">             TC      SERVICER    # SERVICE ENTRY</div>
            <div className="code-line">                                      </div>
            <div className="code-line">SPLASHDN     CAF     SPLASHBIT   # SPLASHDOWN</div>
            <div className="code-line">             TS      MODREG      # MODE REGISTER</div>
            <div className="code-line">             TC      TASKOVER    # MISSION COMPLETE</div>
          </div>

          <div className="tech-grid">
            <div className="tech-item">
              <div className="tech-label">Surface Time</div>
              <div className="tech-value">21h 36m</div>
            </div>
            <div className="tech-item">
              <div className="tech-label">Return Journey</div>
              <div className="tech-value">2d 12h</div>
            </div>
            <div className="tech-item">
              <div className="tech-label">Reentry Speed</div>
              <div className="tech-value">11 km/s</div>
            </div>
            <div className="tech-item">
              <div className="tech-label">Total Distance</div>
              <div className="tech-value">1.5M km</div>
            </div>
          </div>

          <div className="mission-timeline">
            <div className="timeline-track"></div>
            <div className="timeline-progress" style={{ height: '100%' }}></div>

            <div className="timeline-event active">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Lunar Surface Operations</h4>
                <p>Armstrong and Aldrin explore Tranquility Base, collect samples, and conduct experiments</p>
              </div>
            </div>

            <div className="timeline-event active">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Lunar Orbital Rendezvous</h4>
                <p>Ascent stage reunites with Command Module in precise orbital ballet</p>
              </div>
            </div>

            <div className="timeline-event active">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Trans-Earth Injection</h4>
                <p>Final burn sends crew on trajectory back to Earth</p>
              </div>
            </div>

            <div className="timeline-event active">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Atmospheric Reentry</h4>
                <p>Command Module survives 3000°C temperatures during reentry</p>
              </div>
            </div>

            <div className="timeline-event active">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Pacific Splashdown</h4>
                <p>Successful recovery by USS Hornet - mission accomplished</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}