export const skillTreeData = {
  name: "Skills",
  description: "My professional toolkit",
  level: 100,
  children: [
    {
      name: "Frontend",
      color: "#3B82F6", // Blue-500
      description: "User interface development",
      level: 90,
      children: [
        {
          name: "React.js",
          color: "#60A5FA", // Blue-400
          description: "Component-based UI library",
          level: 95,
          children: [
            { name: "Hooks", labelColor: "#93C5FD", description: "State & lifecycle management", level: 90 },
            { name: "Context API", labelColor: "#93C5FD", description: "State management solution", level: 85 },
            { name: "Redux", labelColor: "#93C5FD", description: "State container for JavaScript apps", level: 80 }
          ]
        },
        {
          name: "Next.js",
          color: "#60A5FA",
          description: "React framework with SSR/SSG",
          level: 85,
          children: [
            { name: "SSR", labelColor: "#93C5FD", description: "Server-side rendering", level: 85 },
            { name: "API Routes", labelColor: "#93C5FD", description: "Backend functionality", level: 80 },
            { name: "App Router", labelColor: "#93C5FD", description: "New routing system", level: 80 }
          ]
        },
        {
          name: "Styling",
          color: "#60A5FA",
          description: "UI presentation techniques",
          level: 90,
          children: [
            { name: "Tailwind", labelColor: "#93C5FD", description: "Utility-first CSS framework", level: 95 },
            { name: "CSS-in-JS", labelColor: "#93C5FD", description: "Component-scoped styling", level: 85 },
            { name: "SASS", labelColor: "#93C5FD", description: "CSS preprocessor", level: 80 }
          ]
        },
        {
          name: "UI/UX",
          color: "#60A5FA",
          description: "User experience design",
          level: 85,
          children: [
            { name: "Figma", labelColor: "#93C5FD", description: "Design & prototyping tool", level: 75 },
            { name: "Animations", labelColor: "#93C5FD", description: "Interactive motion design", level: 90 },
            { name: "Responsive", labelColor: "#93C5FD", description: "Multi-device layouts", level: 95 }
          ]
        }
      ]
    },
    {
      name: "Backend",
      color: "#8B5CF6", // Violet-500
      description: "Server-side development",
      level: 85,
      children: [
        {
          name: "Node.js",
          color: "#A78BFA", // Violet-400
          description: "JavaScript runtime environment",
          level: 85,
          children: [
            { name: "Express", labelColor: "#C4B5FD", description: "Web application framework", level: 90 },
            { name: "REST API", labelColor: "#C4B5FD", description: "RESTful service design", level: 90 },
            { name: "Authentication", labelColor: "#C4B5FD", description: "User identity management", level: 80 }
          ]
        },
        {
          name: "Databases",
          color: "#A78BFA",
          description: "Data storage solutions",
          level: 80,
          children: [
            { name: "MongoDB", labelColor: "#C4B5FD", description: "NoSQL document database", level: 85 },
            { name: "PostgreSQL", labelColor: "#C4B5FD", description: "Relational database", level: 75 },
            { name: "Redis", labelColor: "#C4B5FD", description: "In-memory data structure store", level: 70 }
          ]
        }
      ]
    },
    {
      name: "DevOps",
      color: "#10B981", // Emerald-500
      description: "Development operations",
      level: 75,
      children: [
        { 
          name: "Git", 
          color: "#34D399", // Emerald-400
          description: "Version control system",
          level: 90,
          children: [
            { name: "GitHub", labelColor: "#6EE7B7", description: "Git repository hosting", level: 90 },
            { name: "CI/CD", labelColor: "#6EE7B7", description: "Continuous integration/delivery", level: 80 }
          ]
        },
        { 
          name: "Deployment", 
          color: "#34D399",
          description: "Application hosting & delivery",
          level: 80,
          children: [
            { name: "Vercel", labelColor: "#6EE7B7", description: "Frontend deployment platform", level: 90 },
            { name: "AWS", labelColor: "#6EE7B7", description: "Cloud computing platform", level: 75 },
            { name: "Docker", labelColor: "#6EE7B7", description: "Containerization platform", level: 70 }
          ]
        }
      ]
    },
    {
      name: "Tools",
      color: "#F59E0B", // Amber-500
      description: "Development utilities",
      level: 85,
      children: [
        { name: "VS Code", color: "#FBBF24", labelColor: "#FCD34D", description: "Code editor", level: 95 },
        { name: "Postman", color: "#FBBF24", labelColor: "#FCD34D", description: "API testing tool", level: 85 },
        { name: "Webpack", color: "#FBBF24", labelColor: "#FCD34D", description: "Module bundler", level: 75 },
        { name: "Jest", color: "#FBBF24", labelColor: "#FCD34D", description: "Testing framework", level: 80 }
      ]
    },
    {
      name: "Languages",
      color: "#EF4444", // Red-500
      description: "Programming languages",
      level: 90,
      children: [
        { name: "TypeScript", color: "#F87171", labelColor: "#FCA5A5", description: "Typed JavaScript", level: 85 },
        { name: "JavaScript", color: "#F87171", labelColor: "#FCA5A5", description: "Web programming language", level: 95 },
        { name: "Python", color: "#F87171", labelColor: "#FCA5A5", description: "General-purpose language", level: 75 },
        { name: "HTML/CSS", color: "#F87171", labelColor: "#FCA5A5", description: "Web markup & styling", level: 95 }
      ]
    }
  ]
};
