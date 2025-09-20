'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ProgrammingInsights() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;

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

    // Animate timeline events
    const events = timeline?.querySelectorAll('.timeline-event');
    if (events) {
      gsap.fromTo(events,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: timeline,
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
        <h2 className="section-title">PROGRAMMING INSIGHTS</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="data-viz">
            <div className="data-viz-title">MARGARET HAMILTON'S INNOVATIONS</div>
            <div className="p-6">
              <div className="innovation-item">
                <h4 className="font-bold mb-2">ERROR DETECTION & RECOVERY</h4>
                <p className="text-sm mb-4">
                  Implemented priority-based error handling that could recover from
                  computer overload during critical mission phases.
                </p>
              </div>

              <div className="innovation-item">
                <h4 className="font-bold mb-2">ASYNCHRONOUS PROCESSING</h4>
                <p className="text-sm mb-4">
                  Developed multi-tasking capabilities allowing concurrent execution
                  of navigation, guidance, and display routines.
                </p>
              </div>

              <div className="innovation-item">
                <h4 className="font-bold mb-2">SOFTWARE ENGINEERING</h4>
                <p className="text-sm mb-4">
                  Pioneered concepts that became fundamental principles of
                  modern software engineering and reliability.
                </p>
              </div>
            </div>
          </div>

          <div className="data-viz">
            <div className="data-viz-title">PROGRAMMING CONSTRAINTS</div>
            <div className="p-6">
              <div className="constraint-item">
                <div className="constraint-header">
                  <span className="constraint-name">MEMORY LIMIT</span>
                  <span className="constraint-value">4K WORDS</span>
                </div>
                <div className="constraint-bar">
                  <div className="constraint-fill" style={{width: '95%'}}></div>
                </div>
              </div>

              <div className="constraint-item">
                <div className="constraint-header">
                  <span className="constraint-name">PROCESSING POWER</span>
                  <span className="constraint-value">1 MHz</span>
                </div>
                <div className="constraint-bar">
                  <div className="constraint-fill" style={{width: '100%'}}></div>
                </div>
              </div>

              <div className="constraint-item">
                <div className="constraint-header">
                  <span className="constraint-name">RELIABILITY REQ.</span>
                  <span className="constraint-value">99.999%</span>
                </div>
                <div className="constraint-bar">
                  <div className="constraint-fill" style={{width: '100%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="code-block" data-title="ALARM HANDLING SYSTEM">
{`# Priority Interrupt System - Revolutionary for 1969
ALARM           INHINT                  # Disable interrupts
                CAF     ALARMBIT       # Set alarm indicator
                XCH     ARUPTLOC       # Store alarm location

                # Check if we can continue
                CCS     PRIO           # Check current priority
                TCF     RESUME         # If low priority, continue
                TCF     ABORT          # If critical, abort

RESUME          CAF     NEWPRIO        # Set new priority level
                TS      PRIO           # Update priority register
                RELINT                 # Re-enable interrupts
                RESUME                 # Continue execution

# This system saved Apollo 11 during lunar descent
# when computer overload alarms 1201 and 1202 occurred`}
        </div>

        <div className="data-viz" ref={timelineRef}>
          <div className="data-viz-title">DEVELOPMENT TIMELINE</div>

          <div className="timeline">
            <div className="timeline-event">
              <div className="timeline-date">1961</div>
              <div className="timeline-content">
                <h4>PROJECT APOLLO INITIATED</h4>
                <p>MIT Instrumentation Lab begins AGC development</p>
              </div>
            </div>

            <div className="timeline-event">
              <div className="timeline-date">1965</div>
              <div className="timeline-content">
                <h4>MARGARET HAMILTON JOINS</h4>
                <p>Leads software development team, coins "software engineering"</p>
              </div>
            </div>

            <div className="timeline-event">
              <div className="timeline-date">1969-04-01</div>
              <div className="timeline-content">
                <h4>COMANCHE055 FINALIZED</h4>
                <p>Command Module software completed and tested</p>
              </div>
            </div>

            <div className="timeline-event">
              <div className="timeline-date">1969-07-14</div>
              <div className="timeline-content">
                <h4>LUMINARY099 READY</h4>
                <p>Lunar Module software uploaded just days before launch</p>
              </div>
            </div>

            <div className="timeline-event">
              <div className="timeline-date">1969-07-20</div>
              <div className="timeline-content">
                <h4>LUNAR LANDING SUCCESS</h4>
                <p>AGC handles computer overload alarms during descent</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="module-card">
            <div className="module-card-header">
              <span className="module-name">CRITICAL DECISION</span>
            </div>
            <div className="module-description">
              During lunar descent, AGC triggered alarms 1201/1202 due to radar data overload.
              Hamilton's priority system allowed mission to continue safely.
            </div>
          </div>

          <div className="module-card">
            <div className="module-card-header">
              <span className="module-name">LEGACY IMPACT</span>
            </div>
            <div className="module-description">
              AGC innovations in error handling, real-time systems, and software reliability
              became foundations for modern spacecraft and embedded systems.
            </div>
          </div>

          <div className="module-card">
            <div className="module-card-header">
              <span className="module-name">OPEN SOURCE</span>
            </div>
            <div className="module-description">
              Original source code preserved and digitized, allowing modern developers
              to study pioneering software engineering techniques.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}