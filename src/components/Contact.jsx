import React from "react";
import Me from "@/assets/images/cover.jpg";

function Contact() {
  return (
    <div className="relative z-20">
      <h1 className="text-9xl text-center font-bold">Ayushman Gupta</h1>
      <section className="flex justify-center">
        <section className="relative max-w-[800px]">
          <p className="text-black absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 -rotate-90 whitespace-nowrap text-sm font-medium">
            New Delhi, India
          </p>

          <img className="rounded-2xl" src={Me.src} alt="" srcset="" />

          <p className="text-black absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 rotate-90 whitespace-nowrap text-sm font-medium">
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
