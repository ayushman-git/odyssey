'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import MissionSVG from './MissionSVG';
import './apollo11-blueprint.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Apollo11Blueprint() {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const progress = progressRef.current;

    // Mission progress indicator
    gsap.to(progress, {
      scaleX: 1,
      transformOrigin: 'left',
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5
      }
    });

    // Timeline progress
    const timelineProgress = timelineRef.current?.querySelector('.timeline-progress');
    if (timelineProgress) {
      gsap.to(timelineProgress, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 0.3
        }
      });
    }

    // Animate sections on scroll
    const sections = container?.querySelectorAll('.animate-in');
    sections?.forEach((section) => {
      gsap.to(section, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Timeline events animation
    const timelineEvents = timelineRef.current?.querySelectorAll('.timeline-event');
    timelineEvents?.forEach((event, index) => {
      gsap.to(event, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: event,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="apollo11-blueprint">
      {/* Blueprint grid background */}
      <div className="blueprint-grid" />

      {/* Progress indicator */}
      <div className="mission-progress">
        <div ref={progressRef} className="progress-bar" />
        <div className="progress-label">Mission Progress</div>
      </div>

      {/* Fixed SVG container */}
      <div className="mission-svg-container">
        <MissionSVG />
      </div>

      <div className="mission-container">
        {/* Header Section */}
        <section className="mission-section">
          <div className="content-grid">
            <div className="content-text">
              <div className="mission-phase">
                Mission Overview • Apollo 11
              </div>
              <h1 className="section-title animate-in">
                Apollo Guidance Computer
              </h1>
              <p className="section-subtitle animate-in">
                The software that guided humanity to the moon
              </p>
              <p className="section-description animate-in">
                In July 1969, 36,000 words of carefully crafted assembly code powered the Apollo Guidance Computer,
                navigating the command and lunar modules through the most ambitious journey in human history.
                Led by Margaret Hamilton and the MIT Instrumentation Laboratory, this software represented
                the birth of modern software engineering.
              </p>

              <div className="tech-specs animate-in">
                <div className="tech-spec-item">
                  <div className="tech-spec-label">Memory</div>
                  <div className="tech-spec-value">4K Words</div>
                </div>
                <div className="tech-spec-item">
                  <div className="tech-spec-label">Processing</div>
                  <div className="tech-spec-value">1.024 MHz</div>
                </div>
                <div className="tech-spec-item">
                  <div className="tech-spec-label">Mission Duration</div>
                  <div className="tech-spec-value">8d 3h 18m</div>
                </div>
                <div className="tech-spec-item">
                  <div className="tech-spec-label">Lines of Code</div>
                  <div className="tech-spec-value">145K LOC</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Launch Sequence */}
        <section className="mission-section">
          <div className="content-grid">
            <div className="content-text">
              <div className="mission-phase">
                T-00:00:00 • Liftoff
              </div>
              <h2 className="section-title animate-in">
                Launch Sequence
              </h2>
              <p className="section-subtitle animate-in">
                Saturn V powered by 7.5 million pounds of thrust
              </p>
              <p className="section-description animate-in">
                At 9:32 AM EDT on July 16, 1969, the Saturn V rocket thundered to life.
                The Apollo Guidance Computer immediately began calculating trajectory,
                monitoring systems, and preparing for the journey ahead.
              </p>

              <div className="code-block animate-in" data-title="Launch Sequence Code">
{`BURNBABY     CAF     PRIO17      # EXECUTIVE PRIORITY
             TS      PHSPRDT1    # PHASE INCREMENT
             CAF     TWO         # ENGINE ON
             TS      DAPBITS     # DAP ENABLE

             TC      WAITLIST    # SCHEDULE NEXT
             EBANK=  WHICH       # BANK SETTING
             2CADR   COMFAIL     # FAILURE ROUTINE

             TC      PHASCHNG    # PHASE CHANGE
             OCT     04024       # NEW PHASE`}
              </div>

              <div className="tech-specs animate-in">
                <div className="tech-spec-item">
                  <div className="tech-spec-label">Launch Mass</div>
                  <div className="tech-spec-value">3,038,500 kg</div>
                </div>
                <div className="tech-spec-item">
                  <div className="tech-spec-label">First Stage Thrust</div>
                  <div className="tech-spec-value">34.02 MN</div>
                </div>
                <div className="tech-spec-item">
                  <div className="tech-spec-label">Burn Duration</div>
                  <div className="tech-spec-value">2m 41s</div>
                </div>
                <div className="tech-spec-item">
                  <div className="tech-spec-label">Max Acceleration</div>
                  <div className="tech-spec-value">4.0 g</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trans-Lunar Injection */}
        <section className="mission-section">
          <div className="content-grid">
            <div className="content-text">
              <div className="mission-phase">
                T+02:44:16 • TLI Burn
              </div>
              <h2 className="section-title animate-in">
                Trans-Lunar Injection
              </h2>
              <p className="section-subtitle animate-in">
                Breaking free from Earth's gravitational embrace
              </p>
              <p className="section-description animate-in">
                After one and a half Earth orbits, the S-IVB third stage reignites for Trans-Lunar Injection.
                The AGC calculates the precise burn duration and trajectory adjustments needed to reach
                the Moon's sphere of influence 240,000 miles away.
              </p>

              <div className="code-block animate-in" data-title="Navigation Code">
{`TLI          CAF     PRIO20      # HIGH PRIORITY
             TS      PHSPRDT1    # PHASE PRODUCT
             CAF     BIT15       # GUIDANCE ENABLE
             TS      GUIDBIT     # SET GUIDANCE

             TC      BANKCALL    # CALL NAVIGATION
             CADR    SERVICER    # SERVICE ROUTINE

TLIBURN      CAF     SIVBBURN    # S-IVB BURN TIME
             TS      SAVET       # SAVE TIME
             CAF     TLITARG     # TARGET VELOCITY
             TS      VT          # VELOCITY TARGET`}
              </div>

              <div className="tech-specs animate-in">
                <div className="tech-spec-item">
                  <div className="tech-spec-label">Burn Duration</div>
                  <div className="tech-spec-value">5m 48s</div>
                </div>
                <div className="tech-spec-item">
                  <div className="tech-spec-label">ΔV Required</div>
                  <div className="tech-spec-value">3.15 km/s</div>
                </div>
                <div className="tech-spec-item">
                  <div className="tech-spec-label">Final Velocity</div>
                  <div className="tech-spec-value">10.9 km/s</div>
                </div>
                <div className="tech-spec-item">
                  <div className="tech-spec-label">Distance to Moon</div>
                  <div className="tech-spec-value">384,400 km</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lunar Landing */}
        <section className="mission-section">
          <div className="content-grid">
            <div className="content-text">
              <div className="mission-phase">
                T+102:45:40 • Powered Descent
              </div>
              <h2 className="section-title animate-in">
                Lunar Landing
              </h2>
              <p className="section-subtitle animate-in">
                "The Eagle has landed"
              </p>
              <p className="section-description animate-in">
                The most critical 12 minutes of the mission. The Lunar Module's Descent Engine fires
                as the AGC navigates through program alarms 1201 and 1202. Margaret Hamilton's
                priority scheduling saves the mission, allowing Armstrong to land with just 17 seconds of fuel remaining.
              </p>

              <div className="code-block animate-in" data-title="Landing Guidance">
{`P63          CAF     PRIO24      # LANDING PRIORITY
             TS      PHSPRDT1    # PHASE PRODUCT
             TC      PHASCHNG    # CHANGE PHASE
             OCT     04024       # PHASE 04024

ALARM        TC      ALARM       # COMPUTER OVERLOAD
             OCT     01201       # EXECUTIVE OVERFLOW
             TC      RESUME      # CONTINUE DESCENT

FLAMEOUT     CAF     LOWFUEL     # FUEL WARNING
             TS      FUELWARN    # SET WARNING
             TC      CONTACT     # LUNAR CONTACT
             TCF     SHUTDOWN    # ENGINE SHUTDOWN`}
              </div>

              <div className="tech-specs animate-in">
                <div className="tech-spec-item">
                  <div className="tech-spec-label">Descent Duration</div>
                  <div className="tech-spec-value">12m 36s</div>
                </div>
                <div className="tech-spec-item">
                  <div className="tech-spec-label">Fuel Remaining</div>
                  <div className="tech-spec-value">17 seconds</div>
                </div>
                <div className="tech-spec-item">
                  <div className="tech-spec-label">Landing Site</div>
                  <div className="tech-spec-value">Sea of Tranquility</div>
                </div>
                <div className="tech-spec-item">
                  <div className="tech-spec-label">Touchdown Velocity</div>
                  <div className="tech-spec-value">1.7 m/s</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Timeline */}
        <section className="mission-section">
          <div className="mission-phase">
            Complete Mission Timeline
          </div>
          <h2 className="section-title animate-in">
            Mission Phases
          </h2>

          <div ref={timelineRef} className="mission-timeline">
            <div className="timeline-line"></div>
            <div className="timeline-progress"></div>

            <div className="timeline-event">
              <div className="timeline-marker"></div>
              <div className="timeline-time">T-00:00:00</div>
              <div className="timeline-title">Launch</div>
              <div className="timeline-description">
                Saturn V lifts off from Kennedy Space Center with 7.5 million pounds of thrust
              </div>
            </div>

            <div className="timeline-event">
              <div className="timeline-marker"></div>
              <div className="timeline-time">T+02:44:16</div>
              <div className="timeline-title">Trans-Lunar Injection</div>
              <div className="timeline-description">
                S-IVB third stage burns to send Apollo 11 toward the Moon
              </div>
            </div>

            <div className="timeline-event">
              <div className="timeline-marker"></div>
              <div className="timeline-time">T+75:49:50</div>
              <div className="timeline-title">Lunar Orbit Insertion</div>
              <div className="timeline-description">
                Service Module engine fires to capture Apollo 11 in lunar orbit
              </div>
            </div>

            <div className="timeline-event">
              <div className="timeline-marker"></div>
              <div className="timeline-time">T+100:39:52</div>
              <div className="timeline-title">Lunar Module Separation</div>
              <div className="timeline-description">
                Eagle separates from Columbia for powered descent to lunar surface
              </div>
            </div>

            <div className="timeline-event">
              <div className="timeline-marker"></div>
              <div className="timeline-time">T+102:45:40</div>
              <div className="timeline-title">Lunar Landing</div>
              <div className="timeline-description">
                "The Eagle has landed" - First human landing on the Moon
              </div>
            </div>

            <div className="timeline-event">
              <div className="timeline-marker"></div>
              <div className="timeline-time">T+124:22:00</div>
              <div className="timeline-title">Lunar Ascent</div>
              <div className="timeline-description">
                Eagle ascent stage launches from lunar surface to rendezvous with Columbia
              </div>
            </div>

            <div className="timeline-event">
              <div className="timeline-marker"></div>
              <div className="timeline-time">T+195:18:35</div>
              <div className="timeline-title">Splashdown</div>
              <div className="timeline-description">
                Command Module safely returns to Earth in the Pacific Ocean
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mission-footer">
          <div className="mission-stats">
            <div className="stat-item">
              <div className="stat-label">Mission</div>
              <div className="stat-value">Apollo 11</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Status</div>
              <div className="stat-value">Success</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Duration</div>
              <div className="stat-value">8d 3h 18m</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Crew</div>
              <div className="stat-value">3 Astronauts</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}