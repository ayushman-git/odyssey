import React, { useEffect, useRef } from "react";
import Me from "@/assets/images/cover.webp";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

function Contact() {
  const imageRef = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const locationRef = useRef(null);
  const roleRef = useRef(null);
  const bioRef = useRef(null);
  const backgroundShapesRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Heading animation: zoom in and move down behind image
    // (keeping opacity at 1 and only changing scale and position)
    gsap.fromTo(
      headingRef.current,
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
        },
      }
    );

    // Image animation (existing code)
    gsap.fromTo(
      imageRef.current,
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
        },
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
      },
    });

    // Parallax animations for side text
    gsap.fromTo(
      locationRef.current,
      { y: 0, x: -20 },
      {
        y: -30,
        x: -35,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      }
    );

    gsap.fromTo(
      roleRef.current,
      { y: 0, x: 20 },
      {
        y: 30,
        x: 35,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      }
    );

    // Background shapes animation
    gsap.fromTo(
      backgroundShapesRef.current?.children || [],
      { rotate: 0, scale: 0.8, opacity: 0.3 },
      {
        rotate: 360,
        scale: 1.2,
        opacity: 0.1,
        duration: 20,
        repeat: -1,
        ease: "none",
        stagger: 3,
      }
    );

    // Image overlay color animation
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      {
        opacity: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // Bio text animation
    const bioWords = bioRef.current?.querySelectorAll('.word');
    if (bioWords) {
      gsap.fromTo(
        bioWords,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const splitTextIntoWords = (text) => {
    return text.split(' ').map((word, index) => (
      <span key={index} className="word inline-block mr-1">
        {word}
      </span>
    ));
  };

  return (
    <div className="relative z-20 my-20 md:my-36 lg:my-52 px-4 sm:px-6 md:px-0 overflow-hidden">
      {/* Background floating shapes */}
      <div ref={backgroundShapesRef} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-br from-pink-400/15 to-orange-400/15 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-3/4 w-24 h-24 bg-gradient-to-br from-green-400/25 to-blue-400/25 rounded-full blur-lg"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-yellow-400/30 to-red-400/30 rotate-45 blur-md"></div>
        <div className="absolute bottom-1/4 left-1/2 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 rounded-full blur-xl"></div>
      </div>

      <h1
        ref={headingRef}
        className="text-gray-200 text-4xl sm:text-6xl md:text-7xl lg:text-9xl text-center font-semibold relative z-30"
      >
        Ayushman Gupta
      </h1>
      <section
        ref={sectionRef}
        className="relative flex justify-center z-10 mt-8 md:mt-0"
      >
        <section className="relative max-w-[800px] w-full">
          <p
            ref={locationRef}
            className="text-black absolute z-10 left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 sm:-translate-x-6 -rotate-90 whitespace-nowrap text-xs sm:text-sm font-medium transition-all duration-300"
          >
            Hyderabad, India
          </p>

          <div className="overflow-hidden rounded-2xl relative">
            {/* Color overlay */}
            <div
              ref={overlayRef}
              className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 z-10 rounded-2xl pointer-events-none"
            ></div>

            <Image
              ref={imageRef}
              src={Me}
              width={800}
              height={600}
              priority
              className="rounded-2xl w-full transform-gpu"
              alt="Ayushman Gupta"
            />
          </div>

          <p
            ref={roleRef}
            className="text-black absolute z-10 right-0 top-1/2 transform -translate-y-1/2 translate-x-2 sm:translate-x-6 rotate-90 whitespace-nowrap text-xs sm:text-sm font-medium transition-all duration-300"
          >
            Full Stack Engineer
          </p>
        </section>
      </section>
      <div className="flex justify-center mt-8">
        <article ref={bioRef} className="text-gray-200 max-w-[800px] text-base sm:text-lg md:text-xl px-4 sm:px-6 md:px-0">
          <p className="mb-4">
            {splitTextIntoWords("I'm a software engineer passionate about crafting intuitive, user-centric digital experiences. My journey in tech has taken me through diverse domains—developing educational applications, contributing to agri-tech platforms, and driving front-end innovation in the insurance sector. With a strong foundation in React, React Native, Next.js, Python, and TypeScript, I focus on building products that don't just function well but feel effortless to use.")}
          </p>
          <p className="mb-4">
            {splitTextIntoWords("Beyond code, I have a deep fascination with the cosmos—there's something humbling about the vastness of space and the mysteries we've yet to uncover. When I'm not buried in tech or stargazing (figuratively, for now), you'll probably find me reading, writing for my blog Odyssey, or exploring ways to push my limits.")}
          </p>
          <p>
            {splitTextIntoWords("Currently, I'm on a journey to refine my skills, dive deeper into web technologies, and maybe, just maybe, land somewhere that challenges me in all the right ways.")}
          </p>
        </article>
      </div>
    </div>
  );
}

export default Contact;
