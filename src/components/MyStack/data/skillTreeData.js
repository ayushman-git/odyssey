export const skillTreeData = {
  name: "Skills",
  description: "My professional toolkit",
  children: [
    {
      name: "Frontend",
      color: "#3B82F6",
      description: "User interface development",
      children: [
        {
          name: "React.js",
          icon: "react",
          color: "#60A5FA",
          description: "Component-based UI library",
          children: [
            { name: "Hooks", labelColor: "#93C5FD", description: "State & lifecycle management" },
            { name: "Context API", labelColor: "#93C5FD", description: "State management solution" },
            { name: "Redux", icon: "redux", labelColor: "#93C5FD", description: "State container for JavaScript apps" }
          ]
        },
        {
          name: "Next.js",
          icon: "nextdotjs",
          color: "#60A5FA",
          description: "React framework with SSR/SSG",
          children: [
            { name: "App Router", labelColor: "#93C5FD", description: "File-based routing system" },
            { name: "SSR / SSG", labelColor: "#93C5FD", description: "Server & static rendering" },
            { name: "API Routes", labelColor: "#93C5FD", description: "Backend functionality" }
          ]
        },
        {
          name: "Styling",
          color: "#60A5FA",
          description: "UI presentation techniques",
          children: [
            { name: "Tailwind CSS", icon: "tailwindcss", labelColor: "#93C5FD", description: "Utility-first CSS framework" },
            { name: "Framer Motion", icon: "framer", labelColor: "#93C5FD", description: "Production-ready animation library" },
            { name: "SASS", icon: "sass", labelColor: "#93C5FD", description: "CSS preprocessor" }
          ]
        },
        {
          name: "UI/UX",
          color: "#60A5FA",
          description: "User experience design",
          children: [
            { name: "Figma", icon: "figma", labelColor: "#93C5FD", description: "Design & prototyping tool" },
            { name: "Responsive Design", labelColor: "#93C5FD", description: "Multi-device layouts" },
            { name: "Accessibility", labelColor: "#93C5FD", description: "Inclusive design principles" }
          ]
        }
      ]
    },
    {
      name: "Backend",
      color: "#8B5CF6",
      description: "Server-side development",
      children: [
        {
          name: "Node.js",
          icon: "nodedotjs",
          color: "#A78BFA",
          description: "JavaScript runtime environment",
          children: [
            { name: "Express", icon: "express", labelColor: "#C4B5FD", description: "Web application framework" },
            { name: "tRPC", icon: "trpc", labelColor: "#C4B5FD", description: "End-to-end typesafe APIs" },
            { name: "GraphQL", icon: "graphql", labelColor: "#C4B5FD", description: "Query language for APIs" },
            { name: "REST API", labelColor: "#C4B5FD", description: "RESTful service design" }
          ]
        },
        {
          name: "Databases",
          color: "#A78BFA",
          description: "Data storage solutions",
          children: [
            { name: "PostgreSQL", icon: "postgresql", labelColor: "#C4B5FD", description: "Relational database" },
            { name: "MongoDB", icon: "mongodb", labelColor: "#C4B5FD", description: "NoSQL document database" },
            { name: "Supabase", icon: "supabase", labelColor: "#C4B5FD", description: "Open source Firebase alternative" },
            { name: "Prisma", icon: "prisma", labelColor: "#C4B5FD", description: "Next-gen ORM for Node.js" },
            { name: "Redis", icon: "redis", labelColor: "#C4B5FD", description: "In-memory data store" }
          ]
        }
      ]
    },
    {
      name: "DevOps",
      color: "#10B981",
      description: "Development operations",
      children: [
        {
          name: "Git",
          icon: "git",
          color: "#34D399",
          description: "Version control system",
          children: [
            { name: "GitHub", icon: "github", labelColor: "#6EE7B7", description: "Git repository hosting" },
            { name: "CI/CD", labelColor: "#6EE7B7", description: "Continuous integration & delivery" }
          ]
        },
        {
          name: "Deployment",
          color: "#34D399",
          description: "Application hosting & delivery",
          children: [
            { name: "Vercel", icon: "vercel", labelColor: "#6EE7B7", description: "Frontend deployment platform" },
            { name: "Docker", icon: "docker", labelColor: "#6EE7B7", description: "Containerization platform" },
            { name: "AWS", icon: "amazonwebservices", labelColor: "#6EE7B7", description: "Cloud computing platform" },
            { name: "Turborepo", icon: "turborepo", labelColor: "#6EE7B7", description: "High-performance monorepo build system" }
          ]
        }
      ]
    },
    {
      name: "Tools",
      color: "#F59E0B",
      description: "Development utilities",
      children: [
        { name: "VS Code", icon: "visualstudiocode", color: "#FBBF24", labelColor: "#FCD34D", description: "Code editor" },
        { name: "pnpm", icon: "pnpm", color: "#FBBF24", labelColor: "#FCD34D", description: "Fast, disk-efficient package manager" },
        { name: "Postman", icon: "postman", color: "#FBBF24", labelColor: "#FCD34D", description: "API testing tool" },
        { name: "Jest", icon: "jest", color: "#FBBF24", labelColor: "#FCD34D", description: "JavaScript testing framework" }
      ]
    },
    {
      name: "Languages",
      color: "#EF4444",
      description: "Programming languages",
      children: [
        { name: "TypeScript", icon: "typescript", color: "#F87171", labelColor: "#FCA5A5", description: "Typed JavaScript superset" },
        { name: "JavaScript", icon: "javascript", color: "#F87171", labelColor: "#FCA5A5", description: "Web programming language" },
        { name: "Python", icon: "python", color: "#F87171", labelColor: "#FCA5A5", description: "General-purpose language" },
        { name: "HTML / CSS", icon: "html5", color: "#F87171", labelColor: "#FCA5A5", description: "Web markup & styling" }
      ]
    }
  ]
};
