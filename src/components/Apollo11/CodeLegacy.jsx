'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CodeLegacy() {
  const sectionRef = useRef(null);
  const networkRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const networkNodes = networkRef.current?.querySelectorAll('.network-node');
    const connections = networkRef.current?.querySelectorAll('.network-connection');

    // Network visualization animation
    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    })
    .fromTo(networkNodes,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1 }
    )
    .fromTo(connections,
      { strokeDashoffset: 100 },
      { strokeDashoffset: 0, duration: 1, stagger: 0.05 },
      '<0.3'
    );

    // Pulsing animation for key innovations
    gsap.to('.innovation-pulse', {
      scale: 1.1,
      opacity: 0.7,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });

    // Code repository animation
    const repoStats = section?.querySelectorAll('.repo-stat');
    gsap.fromTo(repoStats,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      }
    );

  }, []);

  return (
    <section ref={sectionRef} className="mission-section">
      <div className="section-content">
        <div className="section-text">
          <div className="mission-phase">
            <span>T+∞ • LEGACY</span>
          </div>
          <h2 className="section-title">
            CODE
            <br />
            <span style={{ color: 'var(--accent-green)' }}>LEGACY</span>
          </h2>
          <p className="section-subtitle">
            The foundation of modern software engineering
          </p>
          <p className="section-description">
            The Apollo Guidance Computer source code represents humanity's first venture into
            mission-critical software engineering. Margaret Hamilton and her team pioneered
            concepts that became the foundation of modern computing: error recovery, priority
            scheduling, and reliable real-time systems.
          </p>

          <div className="code-display" data-language="Modern Influence">
{`# Apollo AGC concepts in modern systems:

// Priority-based task scheduling
scheduler.addTask(task, PRIORITY_HIGH);

// Error detection and recovery
try {
  executeNavigationUpdate();
} catch (OverflowError) {
  handleGracefulRecovery();
}

// Real-time constraint validation
assert(responseTime < MAX_ALLOWED_LATENCY);`}
          </div>

          <div className="tech-grid">
            <div className="tech-item innovation-pulse">
              <div className="tech-label">Error Recovery</div>
              <div className="tech-value">Priority Interrupts</div>
            </div>
            <div className="tech-item innovation-pulse">
              <div className="tech-label">Real-Time OS</div>
              <div className="tech-value">Multitasking</div>
            </div>
            <div className="tech-item innovation-pulse">
              <div className="tech-label">Software Engineering</div>
              <div className="tech-value">Rigorous Testing</div>
            </div>
            <div className="tech-item innovation-pulse">
              <div className="tech-label">Memory Management</div>
              <div className="tech-value">Constraint Optimization</div>
            </div>
          </div>

          <div className="repo-stats">
            <h3 style={{ color: 'var(--accent-green)', marginBottom: '1rem', fontSize: '1.2rem' }}>
              OPEN SOURCE PRESERVATION
            </h3>
            <div className="tech-grid">
              <div className="tech-item repo-stat">
                <div className="tech-label">Repository</div>
                <div className="tech-value">chrislgarry/Apollo-11</div>
              </div>
              <div className="tech-item repo-stat">
                <div className="tech-label">GitHub Stars</div>
                <div className="tech-value">57.3k+</div>
              </div>
              <div className="tech-item repo-stat">
                <div className="tech-label">Lines Preserved</div>
                <div className="tech-value">145,000+</div>
              </div>
              <div className="tech-item repo-stat">
                <div className="tech-label">Contributors</div>
                <div className="tech-value">100+</div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-visual">
          <svg ref={networkRef} className="mission-svg" viewBox="0 0 500 400">
            {/* Central AGC node */}
            <circle cx="250" cy="200" r="25"
                    className="network-node svg-outline innovation-pulse"
                    fill="rgba(0, 255, 65, 0.2)" stroke="var(--accent-green)" strokeWidth="3" />
            <text x="250" y="205" textAnchor="middle"
                  className="svg-label" fontSize="10" fill="var(--accent-green)" fontWeight="bold">
              AGC
            </text>

            {/* Modern technology nodes */}
            <g className="modern-tech">
              {/* Operating Systems */}
              <circle cx="150" cy="100" r="15"
                      className="network-node svg-outline"
                      fill="rgba(78, 205, 196, 0.2)" stroke="var(--accent-blue)" strokeWidth="2" />
              <text x="150" y="85" textAnchor="middle"
                    className="svg-label" fontSize="8" fill="var(--accent-blue)">
                RTOS
              </text>

              {/* Embedded Systems */}
              <circle cx="350" cy="100" r="15"
                      className="network-node svg-outline"
                      fill="rgba(255, 107, 53, 0.2)" stroke="var(--accent-orange)" strokeWidth="2" />
              <text x="350" y="85" textAnchor="middle"
                    className="svg-label" fontSize="8" fill="var(--accent-orange)">
                EMBEDDED
              </text>

              {/* Spacecraft */}
              <circle cx="100" cy="200" r="15"
                      className="network-node svg-outline"
                      fill="rgba(78, 205, 196, 0.2)" stroke="var(--accent-blue)" strokeWidth="2" />
              <text x="100" y="220" textAnchor="middle"
                    className="svg-label" fontSize="8" fill="var(--accent-blue)">
                SPACECRAFT
              </text>

              {/* Autonomous Vehicles */}
              <circle cx="400" cy="200" r="15"
                      className="network-node svg-outline"
                      fill="rgba(255, 107, 53, 0.2)" stroke="var(--accent-orange)" strokeWidth="2" />
              <text x="400" y="220" textAnchor="middle"
                    className="svg-label" fontSize="8" fill="var(--accent-orange)">
                AUTONOMOUS
              </text>

              {/* IoT */}
              <circle cx="150" cy="300" r="15"
                      className="network-node svg-outline"
                      fill="rgba(78, 205, 196, 0.2)" stroke="var(--accent-blue)" strokeWidth="2" />
              <text x="150" y="320" textAnchor="middle"
                    className="svg-label" fontSize="8" fill="var(--accent-blue)">
                IoT
              </text>

              {/* Medical Devices */}
              <circle cx="350" cy="300" r="15"
                      className="network-node svg-outline"
                      fill="rgba(255, 107, 53, 0.2)" stroke="var(--accent-orange)" strokeWidth="2" />
              <text x="350" y="320" textAnchor="middle"
                    className="svg-label" fontSize="8" fill="var(--accent-orange)">
                MEDICAL
              </text>
            </g>

            {/* Connection lines */}
            <g className="connections">
              <line x1="250" y1="175" x2="150" y2="115"
                    className="network-connection svg-outline"
                    stroke="var(--accent-green)" strokeWidth="1"
                    strokeDasharray="50" strokeDashoffset="50" />
              <line x1="250" y1="175" x2="350" y2="115"
                    className="network-connection svg-outline"
                    stroke="var(--accent-green)" strokeWidth="1"
                    strokeDasharray="50" strokeDashoffset="50" />
              <line x1="225" y1="200" x2="115" y2="200"
                    className="network-connection svg-outline"
                    stroke="var(--accent-green)" strokeWidth="1"
                    strokeDasharray="50" strokeDashoffset="50" />
              <line x1="275" y1="200" x2="385" y2="200"
                    className="network-connection svg-outline"
                    stroke="var(--accent-green)" strokeWidth="1"
                    strokeDasharray="50" strokeDashoffset="50" />
              <line x1="250" y1="225" x2="150" y2="285"
                    className="network-connection svg-outline"
                    stroke="var(--accent-green)" strokeWidth="1"
                    strokeDasharray="50" strokeDashoffset="50" />
              <line x1="250" y1="225" x2="350" y2="285"
                    className="network-connection svg-outline"
                    stroke="var(--accent-green)" strokeWidth="1"
                    strokeDasharray="50" strokeDashoffset="50" />
            </g>

            {/* Innovation labels */}
            <g className="innovation-labels">
              <text x="50" y="150" className="svg-label" fontSize="7" fill="var(--text-secondary)">
                Priority Scheduling
              </text>
              <text x="420" y="150" className="svg-label" fontSize="7" fill="var(--text-secondary)">
                Error Recovery
              </text>
              <text x="50" y="250" className="svg-label" fontSize="7" fill="var(--text-secondary)">
                Real-Time Constraints
              </text>
              <text x="380" y="250" className="svg-label" fontSize="7" fill="var(--text-secondary)">
                Fault Tolerance
              </text>
            </g>

            {/* Central title */}
            <text x="250" y="50" textAnchor="middle"
                  className="svg-label" fontSize="14" fill="var(--accent-green)" fontWeight="bold">
              APOLLO'S INFLUENCE ON MODERN COMPUTING
            </text>

            {/* Margaret Hamilton tribute */}
            <text x="250" y="380" textAnchor="middle"
                  className="svg-label" fontSize="10" fill="var(--text-primary)">
              "Software Engineering" - Margaret H. Hamilton, 1969
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}