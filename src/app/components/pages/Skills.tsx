import { useRef, useState, useEffect } from "react";

interface SkillsProps {
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

const skillCategories = [
  {
    label: "Frontend",
    color: "var(--neon-cyan)",
    skills: [
      { name: "HTML5", level: 95, icon: "🌐" },
      { name: "CSS3", level: 90, icon: "🎨" },
      { name: "JavaScript", level: 82, icon: "⚡" },
      { name: "React", level: 75, icon: "⚛️" },
      { name: "Responsive Design", level: 92, icon: "📱" },
    ],
  },
  {
    label: "Backend",
    color: "var(--neon-purple)",
    skills: [
      { name: "PHP", level: 88, icon: "🐘" },
      { name: "MySQL", level: 85, icon: "🗄️" },
      { name: "WordPress", level: 90, icon: "📝" },
    ],
  },
  {
    label: "Tools & Workflow",
    color: "#38bdf8",
    skills: [
      { name: "Git & GitHub", level: 80, icon: "🔗" },
      { name: "VS Code", level: 92, icon: "💻" },
      { name: "Figma (Basic)", level: 65, icon: "🎭" },
    ],
  },
];

const toolBadges = [
  "HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "WordPress",
  "React", "Git", "GitHub", "Responsive Design", "REST APIs",
  "Bootstrap", "jQuery", "cPanel", "Figma", "VS Code",
];

function SkillBar({ skill, color, visible, delay }: { skill: { name: string; level: number; icon: string }; color: string; visible: boolean; delay: number }) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s ease ${delay}s`,
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">{skill.icon}</span>
          <span
            className="text-sm font-semibold"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--foreground)" }}
          >
            {skill.name}
          </span>
        </div>
        <span
          className="text-xs font-semibold"
          style={{ color, fontFamily: "'JetBrains Mono', monospace" }}
        >
          {skill.level}%
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: "var(--muted)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: visible ? `${skill.level}%` : "0%",
            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
            boxShadow: `0 0 10px ${color}60`,
            transitionDelay: `${delay + 0.2}s`,
          }}
        />
      </div>
    </div>
  );
}

export function Skills({ isDark }: SkillsProps) {
  const headerReveal = useScrollReveal();
  const categoriesReveal = useScrollReveal();
  const badgesReveal = useScrollReveal();

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
            Technical Expertise
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-5"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--foreground)" }}
          >
            My{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Skills
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-base" style={{ color: "var(--muted-foreground)" }}>
            A comprehensive toolkit built through years of hands-on development experience,
            continuous learning, and real-world project delivery.
          </p>
        </div>

        {/* Skill categories */}
        <div
          ref={categoriesReveal.ref}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
        >
          {skillCategories.map((cat, ci) => (
            <div
              key={cat.label}
              className="rounded-2xl p-8"
              style={{
                ...cardStyle,
                opacity: categoriesReveal.visible ? 1 : 0,
                transform: categoriesReveal.visible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease ${ci * 0.15}s`,
              }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${cat.color}20`,
                    border: `1px solid ${cat.color}40`,
                  }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
                </div>
                <h3
                  className="font-bold text-lg"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: cat.color }}
                >
                  {cat.label}
                </h3>
              </div>

              <div className="space-y-6">
                {cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    color={cat.color}
                    visible={categoriesReveal.visible}
                    delay={ci * 0.1 + si * 0.08}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech badges cloud */}
        <div
          ref={badgesReveal.ref}
          className="rounded-2xl p-10"
          style={{
            ...cardStyle,
            opacity: badgesReveal.visible ? 1 : 0,
            transform: badgesReveal.visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
          }}
        >
          <h3
            className="text-xl font-bold text-center mb-8"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--foreground)" }}
          >
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {toolBadges.map((tool, i) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-default"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                  border: "1px solid var(--border)",
                  color: "var(--muted-foreground)",
                  opacity: badgesReveal.visible ? 1 : 0,
                  transform: badgesReveal.visible ? "scale(1)" : "scale(0.9)",
                  transition: `all 0.4s ease ${i * 0.04}s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--neon-cyan)";
                  e.currentTarget.style.borderColor = "var(--neon-cyan)";
                  e.currentTarget.style.background = isDark
                    ? "rgba(0,245,255,0.08)"
                    : "rgba(0,153,204,0.08)";
                  e.currentTarget.style.transform = "translateY(-2px) scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--muted-foreground)";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = isDark
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(0,0,0,0.04)";
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Learning section */}
        <div className="mt-16 text-center">
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              background: isDark ? "rgba(139,92,246,0.1)" : "rgba(124,58,237,0.08)",
              border: "1px solid var(--neon-purple)",
              color: "var(--neon-purple)",
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--neon-purple)" }} />
            Currently learning: TypeScript · Next.js · Docker
          </div>
        </div>
      </div>
    </div>
  );
}
