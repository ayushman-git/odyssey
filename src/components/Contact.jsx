import React, { useEffect, useRef } from "react";
import Me from "@/assets/images/cover.jpg";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

function Contact() {
  const imageRef = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null); // Added ref for the heading

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Heading animation: zoom in and move down behind image
    // (keeping opacity at 1 and only changing scale and position)
    gsap.fromTo(headingRef.current,
      {
        scale: 1,
        y: 0,
        zIndex: 10, // Start above the image
      },
      {
        scale: 1.15,
        y: 50, // Move down as user scrolls
        zIndex: 10, // End behind the image
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: headingRef.current, // Use the heading itself as the trigger
          start: "top 10%", // Start when the top of the heading is 10% from the top of viewport
          end: "top -20%", // End the animation a bit after scrolling past
          scrub: true,
        }
      }
    );
    
    // Image animation (existing code)
    gsap.fromTo(imageRef.current, 
      { 
        scale: 1.0,
        rotate: 0, // Start with no rotation
      },
      {
        scale: 1.4,
        rotate: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center", // Animation starts when the top of the section reaches the center of viewport
          end: "bottom top", 
          scrub: 0.5,
          // markers: true, // Uncomment for development to see trigger points
          anticipatePin: 1, // Improves performance by pre-computing pin positions
        }
      }
    );
    
    // Add a second animation to handle the initial state until scroll threshold is reached
    gsap.to(imageRef.current, {
      scale: 1.0, // Keep scale at 1 initially
      rotate: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "top center", // This ends exactly where the zoom animation starts
        scrub: true,
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative z-20">
      <h1 
        ref={headingRef} 
        className="text-9xl text-center font-bold relative z-30"
      >
        Ayushman Gupta
      </h1>
      <section ref={sectionRef} className="relative flex justify-center z-10">
        <section className="relative max-w-[800px]">
          <p className="text-black absolute z-10 left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 -rotate-90 whitespace-nowrap text-sm font-medium">
            New Delhi, India
          </p>

          <div className="overflow-hidden rounded-2xl">
            <img 
              ref={imageRef} 
              className="rounded-2xl w-full transform-gpu" 
              src={Me.src} 
              alt="Ayushman Gupta"
            />
          </div>

          <p className="text-black absolute z-10 right-0 top-1/2 transform -translate-y-1/2 translate-x-6 rotate-90 whitespace-nowrap text-sm font-medium">
            Full Stack Developer
          </p>
        </section>
      </section>
      <div className="flex justify-center mt-8">
        <article className="max-w-[800px] text-xl">
          <p className="mb-4">
            I’m a software engineer with a love for clean code, great UX, and
            building things that actually make sense. Whether it’s frontend,
            backend, or somewhere in between, I enjoy solving problems and
            making digital experiences smoother.
          </p>
          <p className="mb-4">
            Beyond code, I have a deep fascination with the cosmos—there’s
            something humbling about the vastness of space and the mysteries
            we’ve yet to uncover. When I’m not buried in tech or stargazing
            (figuratively, for now), you’ll probably find me reading, writing
            for my blog Odyssey, or exploring ways to push my limits.
          </p>
          <p>
            Currently, I’m on a journey to refine my skills, dive deeper into
            web technologies, and maybe, just maybe, land somewhere that
            challenges me in all the right ways.
          </p>
        </article>
      </div>
    </div>
  );
}

export default Contact;
