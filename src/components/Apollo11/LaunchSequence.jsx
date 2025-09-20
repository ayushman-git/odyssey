'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function LaunchSequence() {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const codeRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    const codeLines = codeRef.current?.querySelectorAll('.code-line');

    // Section entrance animation
    gsap.fromTo(section,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1
        }
      }
    );

    // Rocket assembly animation
    const rocketParts = svg?.querySelectorAll('.rocket-part');
    gsap.fromTo(rocketParts,
      { strokeDashoffset: 500, opacity: 0 },
      {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 2,
        stagger: 0.3,
        scrollTrigger: {
          trigger: svg,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Exhaust flames animation
    const flames = svg?.querySelectorAll('.exhaust-flame');
    gsap.to(flames, {
      scale: 1.2,
      opacity: 0.8,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: svg,
        start: 'top 60%',
        toggleActions: 'play pause resume pause'
      }
    });

    // Code execution simulation
    if (codeLines) {
      gsap.fromTo(codeLines,
        { opacity: 0.3 },
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.2,
          scrollTrigger: {
            trigger: codeRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

  }, []);

  return (
    <section ref={sectionRef} className="mission-section">
      <div className="section-content">
        <div className="section-visual">
          <svg ref={svgRef} className="mission-svg" viewBox="0 0 400 600">
            {/* Launch pad */}
            <rect x="150" y="550" width="100" height="20"
                  className="svg-outline rocket-part"
                  fill="none" stroke="var(--text-primary)" strokeWidth="2" />

            {/* Saturn V First Stage */}
            <rect x="170" y="450" width="60" height="100"
                  className="svg-outline rocket-part"
                  fill="none" stroke="var(--text-primary)" strokeWidth="2"
                  rx="5" />

            {/* Saturn V Second Stage */}
            <rect x="175" y="380" width="50" height="70"
                  className="svg-outline rocket-part"
                  fill="none" stroke="var(--text-primary)" strokeWidth="2"
                  rx="3" />

            {/* Saturn V Third Stage */}
            <rect x="180" y="330" width="40" height="50"
                  className="svg-outline rocket-part"
                  fill="none" stroke="var(--text-primary)" strokeWidth="2"
                  rx="3" />

            {/* Command Service Module */}
            <rect x="185" y="290" width="30" height="40"
                  className="svg-outline rocket-part"
                  fill="none" stroke="var(--accent-green)" strokeWidth="2"
                  rx="2" />

            {/* Lunar Module */}
            <polygon points="195,290 205,290 210,280 190,280"
                     className="svg-outline rocket-part"
                     fill="none" stroke="var(--accent-blue)" strokeWidth="2" />

            {/* Escape Tower */}
            <polygon points="200,250 195,290 205,290"
                     className="svg-outline rocket-part"
                     fill="none" stroke="var(--text-primary)" strokeWidth="1" />

            {/* Exhaust flames */}
            <polygon points="170,550 200,580 230,550 220,555 210,570 200,555 190,570 180,555"
                     className="exhaust-flame svg-fill"
                     fill="var(--accent-orange)" opacity="0.6" />

            {/* Engine details */}
            <g className="engines">
              {[...Array(5)].map((_, i) => (
                <circle key={i}
                        cx={180 + i * 10}
                        cy="545"
                        r="3"
                        className="svg-outline rocket-part"
                        fill="none" stroke="var(--text-primary)" strokeWidth="1" />
              ))}
            </g>

            {/* Trajectory arc */}
            <path d="M 200 250 Q 300 200 350 100"
                  className="svg-outline rocket-part"
                  fill="none" stroke="var(--accent-green)" strokeWidth="1"
                  strokeDasharray="5,5" />

            {/* Technical annotations */}
            <text x="250" y="500" className="svg-label" fontSize="10" fill="var(--text-secondary)">
              S-IC STAGE
            </text>
            <text x="250" y="400" className="svg-label" fontSize="10" fill="var(--text-secondary)">
              S-II STAGE
            </text>
            <text x="250" y="350" className="svg-label" fontSize="10" fill="var(--text-secondary)">
              S-IVB STAGE
            </text>
            <text x="250" y="300" className="svg-label" fontSize="10" fill="var(--accent-green)">
              CSM + AGC
            </text>
          </svg>
        </div>

        <div className="section-text">
          <div className="mission-phase">
            <span>T-00:00:00 • LIFTOFF</span>
          </div>
          <h2 className="section-title">
            LAUNCH
            <br />
            <span style={{ color: 'var(--accent-orange)' }}>SEQUENCE</span>
          </h2>
          <p className="section-subtitle">
            Saturn V powered by 7.5 million pounds of thrust
          </p>
          <p className="section-description">
            At 9:32 AM EDT on July 16, 1969, the Saturn V rocket thundered to life.
            The Apollo Guidance Computer immediately began calculating trajectory,
            monitoring systems, and preparing for the journey ahead.
          </p>

          <div ref={codeRef} className="code-display" data-language="AGC Assembly">
            <div className="code-line">BURNBABY     CAF     PRIO17      # EXECUTIVE PRIORITY</div>
            <div className="code-line">             TS      PHSPRDT1    # PHASE INCREMENT</div>
            <div className="code-line">             CAF     TWO         # ENGINE ON</div>
            <div className="code-line">             TS      DAPBITS     # DAP ENABLE</div>
            <div className="code-line">                                      </div>
            <div className="code-line">             TC      WAITLIST    # SCHEDULE NEXT</div>
            <div className="code-line">             EBANK=  WHICH       # BANK SETTING</div>
            <div className="code-line">             2CADR   COMFAIL     # FAILURE ROUTINE</div>
            <div className="code-line">                                      </div>
            <div className="code-line">             TC      PHASCHNG    # PHASE CHANGE</div>
            <div className="code-line">             OCT     04024       # NEW PHASE</div>
          </div>

          <div className="tech-grid">
            <div className="tech-item">
              <div className="tech-label">Launch Mass</div>
              <div className="tech-value">3,038,500 kg</div>
            </div>
            <div className="tech-item">
              <div className="tech-label">First Stage Thrust</div>
              <div className="tech-value">34.02 MN</div>
            </div>
            <div className="tech-item">
              <div className="tech-label">Burn Duration</div>
              <div className="tech-value">2m 41s</div>
            </div>
            <div className="tech-item">
              <div className="tech-label">Max Acceleration</div>
              <div className="tech-value">4.0 g</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}