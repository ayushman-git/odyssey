export const skillTreeData = {
  name: "Skills",
  children: [
    {
      name: "Frontend",
      color: "#3B82F6", // Blue-500
      children: [
        {
          name: "React.js",
          color: "#60A5FA", // Blue-400
          children: [
            { name: "Hooks", labelColor: "#93C5FD" }, // Blue-300
            { name: "Context API", labelColor: "#93C5FD" },
            { name: "Redux", labelColor: "#93C5FD" }
          ]
        },
        {
          name: "Next.js",
          color: "#60A5FA",
          children: [
            { name: "SSR", labelColor: "#93C5FD" },
            { name: "API Routes", labelColor: "#93C5FD" },
            { name: "App Router", labelColor: "#93C5FD" }
          ]
        },
        {
          name: "Styling",
          color: "#60A5FA",
          children: [
            { name: "Tailwind", labelColor: "#93C5FD" },
            { name: "CSS-in-JS", labelColor: "#93C5FD" },
            { name: "SASS", labelColor: "#93C5FD" }
          ]
        },
        {
          name: "UI/UX",
          color: "#60A5FA",
          children: [
            { name: "Figma", labelColor: "#93C5FD" },
            { name: "Animations", labelColor: "#93C5FD" },
            { name: "Responsive", labelColor: "#93C5FD" }
          ]
        }
      ]
    },
    {
      name: "Backend",
      color: "#8B5CF6", // Violet-500
      children: [
        {
          name: "Node.js",
          color: "#A78BFA", // Violet-400
          children: [
            { name: "Express", labelColor: "#C4B5FD" }, // Violet-300
            { name: "REST API", labelColor: "#C4B5FD" },
            { name: "Authentication", labelColor: "#C4B5FD" }
          ]
        },
        {
          name: "Databases",
          color: "#A78BFA",
          children: [
            { name: "MongoDB", labelColor: "#C4B5FD" },
            { name: "PostgreSQL", labelColor: "#C4B5FD" },
            { name: "Redis", labelColor: "#C4B5FD" }
          ]
        }
      ]
    },
    {
      name: "DevOps",
      color: "#10B981", // Emerald-500
      children: [
        { 
          name: "Git", 
          color: "#34D399", // Emerald-400
          children: [
            { name: "GitHub", labelColor: "#6EE7B7" }, // Emerald-300
            { name: "CI/CD", labelColor: "#6EE7B7" }
          ]
        },
        { 
          name: "Deployment", 
          color: "#34D399",
          children: [
            { name: "Vercel", labelColor: "#6EE7B7" },
            { name: "AWS", labelColor: "#6EE7B7" },
            { name: "Docker", labelColor: "#6EE7B7" }
          ]
        }
      ]
    },
    {
      name: "Tools",
      color: "#F59E0B", // Amber-500
      children: [
        { name: "VS Code", color: "#FBBF24", labelColor: "#FCD34D" }, // Amber-400, 300
        { name: "Postman", color: "#FBBF24", labelColor: "#FCD34D" },
        { name: "Webpack", color: "#FBBF24", labelColor: "#FCD34D" },
        { name: "Jest", color: "#FBBF24", labelColor: "#FCD34D" }
      ]
    },
    {
      name: "Languages",
      color: "#EF4444", // Red-500
      children: [
        { name: "TypeScript", color: "#F87171", labelColor: "#FCA5A5" }, // Red-400, 300
        { name: "JavaScript", color: "#F87171", labelColor: "#FCA5A5" },
        { name: "Python", color: "#F87171", labelColor: "#FCA5A5" },
        { name: "HTML/CSS", color: "#F87171", labelColor: "#FCA5A5" }
      ]
    }
  ]
};
