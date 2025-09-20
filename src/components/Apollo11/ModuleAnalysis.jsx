'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ModuleAnalysis() {
  const sectionRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const chart = chartRef.current;

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

    // Animate chart bars
    const bars = chart?.querySelectorAll('.chart-bar');
    if (bars) {
      gsap.fromTo(bars,
        { scaleY: 0, transformOrigin: 'bottom' },
        {
          scaleY: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: chart,
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
        <h2 className="section-title">MODULE ANALYSIS</h2>

        <div className="data-viz">
          <div className="data-viz-title">CODE COMPLEXITY COMPARISON</div>

          <svg ref={chartRef} className="apollo11-svg" viewBox="0 0 600 300">
            {/* Chart axes */}
            <line x1="80" y1="50" x2="80" y2="250" stroke="#000" strokeWidth="2"/>
            <line x1="80" y1="250" x2="520" y2="250" stroke="#000" strokeWidth="2"/>

            {/* Y-axis labels */}
            <text x="70" y="55" textAnchor="end" className="chart-label">100K</text>
            <text x="70" y="105" textAnchor="end" className="chart-label">75K</text>
            <text x="70" y="155" textAnchor="end" className="chart-label">50K</text>
            <text x="70" y="205" textAnchor="end" className="chart-label">25K</text>
            <text x="70" y="255" textAnchor="end" className="chart-label">0</text>

            {/* Comanche055 bar */}
            <rect x="120" y="100" width="80" height="150"
                  fill="none" stroke="#000" strokeWidth="2" className="chart-bar"/>
            <text x="160" y="275" textAnchor="middle" className="chart-label">COMANCHE055</text>
            <text x="160" y="90" textAnchor="middle" className="chart-value">~75K LOC</text>

            {/* Luminary099 bar */}
            <rect x="240" y="80" width="80" height="170"
                  fill="none" stroke="#000" strokeWidth="2" className="chart-bar"/>
            <text x="280" y="275" textAnchor="middle" className="chart-label">LUMINARY099</text>
            <text x="280" y="70" textAnchor="middle" className="chart-value">~85K LOC</text>

            {/* Assembly routines */}
            <rect x="360" y="180" width="80" height="70"
                  fill="none" stroke="#000" strokeWidth="1" className="chart-bar"/>
            <text x="400" y="275" textAnchor="middle" className="chart-label">CORE ROUTINES</text>
            <text x="400" y="170" textAnchor="middle" className="chart-value">~35K LOC</text>
          </svg>
        </div>

        <div className="code-block" data-title="PROGRAM STRUCTURE EXAMPLE">
{`# LUNAR LANDING GUIDANCE - LUMINARY099
LUNAR_LANDING_GUIDANCE   ERASE
                        ERASE   +1

P63LM                   TC      PHASCHNG
                        OCT     04024

                        TC      BANKCALL        # CALL BURNBABY
                        CADR    BURNBABY

                        CAF     PRIO24
                        TC      PRIOCHNG
                        TC      POSTJUMP        # TO PREVENT RESTART
                        CADR    P63LM2

P63LM2                  CAF     CNTRDESIG       # DESIGNATE FOR CONTROL
                        TS      DAPBITS

                        TC      RATELOOP        # BEGIN DESCENT ENGINE
                        TC      RATELOOP        # COMMENCE BRAKING`}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="module-card">
            <div className="module-card-header">
              <span className="module-name">GUIDANCE ROUTINES</span>
            </div>
            <div className="module-description">
              Real-time navigation and trajectory calculation algorithms that computed
              spacecraft position and velocity using celestial navigation and IMU data.
            </div>
            <div className="tech-specs">
              <div>• Position accuracy: ±2 nautical miles</div>
              <div>• Update frequency: 10 Hz</div>
              <div>• Memory usage: ~15K words</div>
            </div>
          </div>

          <div className="module-card">
            <div className="module-card-header">
              <span className="module-name">EXECUTIVE SCHEDULER</span>
            </div>
            <div className="module-description">
              Priority-based task scheduler managing multiple concurrent processes
              including navigation, display updates, and control system operations.
            </div>
            <div className="tech-specs">
              <div>• 7 priority levels</div>
              <div>• Interrupt-driven execution</div>
              <div>• Memory protection</div>
            </div>
          </div>

          <div className="module-card">
            <div className="module-card-header">
              <span className="module-name">DISPLAY INTERFACE</span>
            </div>
            <div className="module-description">
              DSKY (Display & Keyboard) interface routines handling astronaut input
              and providing real-time mission status and navigation data.
            </div>
            <div className="tech-specs">
              <div>• 3-digit displays</div>
              <div>• 19-key keyboard</div>
              <div>• Error code system</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}