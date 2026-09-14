import { useRef, useState, useEffect } from "react";
import { Github, ExternalLink, Filter } from "lucide-react";

interface ProjectsProps {
  isDark: boolean;
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce solution built with PHP & MySQL. Includes product management, cart, checkout, user auth, and an admin dashboard.",
    tech: ["PHP", "MySQL", "JavaScript", "CSS3"],
    category: "PHP",
    gradient: "135deg, #00f5ff22, #8b5cf622",
    github: "https://madimade.github.io/e-ecomeres/",
    demo: "https://madimade.github.io/e-ecomeres/",
    featured: true,
  },
  {
    id: 2,
    title: "WordPress Business Site",
    description:
      "Custom WordPress theme development for a local business. Includes WooCommerce integration, custom post types, and performance optimization.",
    tech: ["WordPress", "PHP", "CSS3", "jQuery"],
    category: "WordPress",
    gradient: "135deg, #8b5cf622, #06b6d422",
    github: "https://madimade.github.io/tail-wind-/?authuser=0",
    demo: "https://madimade.github.io/tail-wind-/?authuser=0",
    featured: true,
  },
  {
    id: 3,
    title: "dintact template",
    description:
      "Dintact: A modern, minimal web experience. Explore a clean interface, smooth navigation, and a design built for clarity and performance.",
    tech: ["React", "CSS3", "JavaScript"],
    category: "React",
    gradient: "135deg, #6366f122, #ec489922",
    github: "https://dintact.vercel.app/",
    demo: "https://dintact.vercel.app/",
    featured: false,
  },
  {
    id: 4,
    title: "Restaurant Landing Page",
    description:
      "Visually stunning restaurant landing page with menu showcase, reservation form, animations, and mobile-first responsive design.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    category: "Frontend",
    gradient: "135deg, #f59e0b22, #8b5cf622",
    github: "https://madimade.github.io/food-lover/",
    demo: "https://madimade.github.io/food-lover/",
    featured: false,
  },
  {
    id: 5,
    title: "PHP Blog System",
    description:
      "Complete blogging platform with categories, tags, user roles, comment system, rich text editor, and SEO-friendly URLs.",
    tech: ["PHP", "MySQL", "HTML5", "CSS3"],
    category: "PHP",
    gradient: "135deg, #8b5cf622, #00f5ff22",
    github: "https://madimade.github.io/Onsite5/",
    demo: "https://example.com",
    featured: false,
  },
  {
    id: 6,
    title: "Portfolio Template",
    description:
      "Sleek, professional portfolio template for developers and designers with smooth animations, dark/light mode, and multi-section layout.",
    tech: ["React", "CSS3", "JavaScript"],
    category: "React",
    gradient: "135deg, #00f5ff22, #a78bfa22",
    github: "#",
    demo: "https://example.com",
    featured: false,
  },
  {
    id: 7,
    title: "game verse template",
    description:
      "Game Verse: Your ultimate gateway to the gaming world. Discover the latest releases, browse detailed game insights, and explore an immersive interface designed by gamers, for gamers.",
    tech: ["React", "CSS3", "JavaScript"],
    category: "React",
    gradient: "135deg, #00f5ff22, #a78bfa22",
    github: "https://game-verse-9tmk.vercel.app/",
    demo: "https://game-verse-9tmk.vercel.app/",
    featured: false,
  },
  {
    id: 8,
    title: "titan gym template",
    description:
      "Titan Gym: Your ultimate destination for fitness. Discover workout programs, browse trainers and class details, and enjoy an interface built for gym enthusiasts.",
    tech: ["React", "CSS3", "JavaScript"],
    category: "React",
    gradient: "135deg, #ff512f22, #f09b1922",
    github: "https://titan-gym-snowy.vercel.app/",
    demo: "https://titan-gym-snowy.vercel.app/",
    featured: false,
  },
  {
    id: 9,
    title: "madi market template",
    description:
      "Madi Market: Your ultimate online shopping destination. Browse a wide range of products, enjoy a smooth shopping experience, and explore a clean interface built for effortless online shopping.",
    tech: ["React", "CSS3", "JavaScript"],
    category: "React",
    gradient: "135deg, #34d39922, #3b82f622",
    github: "https://madi-market.vercel.app/",
    demo: "https://madi-market.vercel.app/",
    featured: false,
  },
  {
    id: 10,
    title: "appointment booking template",
    description:
    "Appointment Booking: A modern online booking platform that makes scheduling appointments simple and convenient. Browse available services, choose your preferred date and time, and manage your appointments through a clean and user-friendly interface.",
    tech: ["React", "CSS3", "JavaScript"],
    category: "React",
    gradient: "135deg, #8b5cf622, #ec489922",
    github: "https://madimade.github.io/hospital/",
    demo: "https://madimade.github.io/hospital/",
    featured: false,
    },
    {id: 11,
     title: "coffee shop booking template",
     description:
     "Coffee Shop Booking: A modern online reservation platform for your favorite café. Browse our menu, reserve your favorite table for any occasion, and book coffee tasting sessions through a clean and user-friendly interface.",
     tech: ["React", "CSS3", "JavaScript"],
     category: "React",
     gradient: "135deg, #8b5cf622, #ec489922",
     github: "https://your-username.github.io/coffee-shop/",
     demo: "https://your-username.github.io/coffee-shop/",
     featured: false,
    },
  ];

const filters = ["All", "PHP", "WordPress", "React", "Frontend"];

export function Projects({ isDark }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const headerReveal = useScrollReveal();
  const projectsReveal = useScrollReveal();

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const cardStyle = {
    background: isDark ? "rgba(10, 8, 40, 0.6)" : "rgba(255, 255, 255, 0.8)",
    border: "1px solid var(--border)",
    backdropFilter: "blur(20px)",
  };

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          ref={headerReveal.ref}
          className="text-center mb-16"
          style={{
            opacity: headerReveal.visible ? 1 : 0,
            transform: headerReveal.visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
          }}
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--neon-cyan)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            Portfolio
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-5"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--foreground)" }}
          >
            Featured{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Projects
            </span>
          </h2>
          <p className="max-w-lg mx-auto text-base mb-10" style={{ color: "var(--muted-foreground)" }}>
            A selection of real-world projects demonstrating my skills across different technologies and industries.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            <div
              className="flex items-center gap-1.5 mr-2 text-sm"
              style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              <Filter size={14} /> Filter:
            </div>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: activeFilter === f
                    ? "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))"
                    : isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                  color: activeFilter === f
                    ? isDark ? "#03001c" : "#ffffff"
                    : "var(--muted-foreground)",
                  border: `1px solid ${activeFilter === f ? "transparent" : "var(--border)"}`,
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== f) {
                    e.currentTarget.style.borderColor = "var(--neon-cyan)";
                    e.currentTarget.style.color = "var(--neon-cyan)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== f) {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--muted-foreground)";
                  }
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div
          ref={projectsReveal.ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className="rounded-2xl overflow-hidden group transition-all duration-300"
              style={{
                ...cardStyle,
                opacity: projectsReveal.visible ? 1 : 0,
                transform: projectsReveal.visible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease ${i * 0.1}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.borderColor = "var(--neon-cyan)";
                e.currentTarget.style.boxShadow = isDark
                  ? "0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(0,245,255,0.08)"
                  : "0 20px 40px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Project image placeholder */}
              <div
                className="h-52 relative overflow-hidden flex items-center justify-center"
                style={{
                  background: `linear-gradient(${project.gradient})`,
                }}
              >
                {/* Grid texture */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: `linear-gradient(var(--neon-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--neon-cyan) 1px, transparent 1px)`,
                    backgroundSize: "30px 30px",
                  }}
                />

                {/* Project number */}
                <div className="relative z-10 text-center">
                  <div
                    className="text-6xl font-black mb-2 opacity-10"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {String(project.id).padStart(2, "0")}
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      background: isDark ? "rgba(0,245,255,0.1)" : "rgba(0,153,204,0.1)",
                      border: "1px solid var(--neon-cyan)",
                      color: "var(--neon-cyan)",
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Hover overlay with links */}
                <div
                  className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: isDark ? "rgba(3,0,28,0.85)" : "rgba(240,244,255,0.85)" }}
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                      border: "1px solid var(--border)",
                      color: "var(--foreground)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--neon-cyan)";
                      e.currentTarget.style.color = "var(--neon-cyan)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.color = "var(--foreground)";
                    }}
                  >
                    <Github size={15} /> Code
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                      color: isDark ? "#03001c" : "#ffffff",
                    }}
                  >
                    <ExternalLink size={15} /> Demo
                  </a>
                </div>
              </div>

              {/* Project info */}
              <div className="p-6">
                <h3
                  className="font-bold text-lg mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--foreground)" }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                        border: "1px solid var(--border)",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium transition-colors"
                    style={{ color: "var(--muted-foreground)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--neon-cyan)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted-foreground)"; }}
                  >
                    <Github size={15} /> GitHub
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium transition-colors"
                    style={{ color: "var(--muted-foreground)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--neon-cyan)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted-foreground)"; }}
                  >
                    <ExternalLink size={15} /> Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-base mb-6" style={{ color: "var(--muted-foreground)" }}>
            Want to see more? Visit my GitHub profile for the full portfolio.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
              background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--neon-cyan)";
              e.currentTarget.style.color = "var(--neon-cyan)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--foreground)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Github size={18} /> View All on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
