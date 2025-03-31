// Import the images from the assets folder
import astronomiaImg from "@/assets/images/astronomia.webp";
import protoImg from "@/assets/images/proto.webp";
import taskImg from "@/assets/images/task.webp";

export const projects = [
  {
    id: 1,
    title: "Astronomia",
    tagline: "Your cosmic companion for Discord adventures",
    image: astronomiaImg,
    gif: "",
    techStack: ["Node.js", "Discord.js", "Firebase", "Puppeteer"],
    codeUrl: "https://github.com/ayushman-git/astronomia-bot",
    liveUrl: "https://ayushman-git.github.io/astronomia-site/",
    description:
      "Astronomia is a versatile Discord bot designed to keep your community informed and entertained. Whether you're fascinated by the cosmos or just looking for a great movie recommendation, Astronomia has you covered!",
  },
  {
    id: 2,
    title: "Proto",
    tagline: "Project management, minus the clutter",
    image: protoImg,
    gif: "",
    techStack: ["React", "Next.js", "Firebase", "Sass"],
    codeUrl: "https://github.com/ayushman-git/project-manager",
    liveUrl: "https://proto-lilac.vercel.app",
    description:
      "Designed for makers and builders, Proto offers an effortless way to track your projects with a clean Kanban board, quick links, and references—all in a seamless, distraction-free interface.",
  },
  {
    id: 3,
    title: "Task",
    tagline: "Minimal task management, right from your terminal",
    image: taskImg,
    gif: "",
    techStack: ["Deno.js", "TypeScript", "Sql"],
    codeUrl: "https://github.com/ayushman-git/task",
    liveUrl: "",
    description:
      "Task is a lightweight CLI-based task manager built with Deno and TypeScript, designed for simple and efficient task tracking directly from your terminal. No clutter, just a straightforward way to manage your to-dos.",
  },
];
