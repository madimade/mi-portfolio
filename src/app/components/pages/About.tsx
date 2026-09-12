import { useRef, useState, useEffect } from "react";
import { MapPin, Mail, Phone, Download, ArrowRight, Calendar, Briefcase, GraduationCap } from "lucide-react";

interface AboutProps {
  onNavigate: (page: string) => void;
  isDark: boolean;
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

const experiences = [
  {
    role: "Freelance Web Developer",
    company: "Self-Employed",
    period: "2022 – Present",
    type: "work",
    description:
      "Building custom websites and web applications for clients across Egypt. Specializing in WordPress, PHP, and modern frontend development.",
    skills: ["PHP", "WordPress", "JavaScript", "MySQL"],
  },
  {
    role: "Junior Web Developer",
    company: "Tech Studio Egypt",
    period: "2021 – 2022",
    type: "work",
    description:
      "Developed responsive frontend interfaces and contributed to backend PHP systems for various client projects.",
    skills: ["HTML5", "CSS3", "JavaScript", "PHP"],
  },
  {
    role: "Computer Science Diploma",
    company: "Egyptian Learning Institute",
    period: "2020 – 2021",
    type: "education",
    description:
      "Completed specialized diploma in web technologies including database design, OOP principles, and modern web development frameworks.",
    skills: ["Web Development", "Databases", "OOP"],
  },
  {
    role: "Web Development Bootcamp",
    company: "IBM SkillsBuild",
    period: "2020",
    type: "education",
    description:
      "Intensive program covering full-stack development fundamentals, cloud basics, and professional developer practices.",
    skills: ["Full-Stack", "Cloud", "Git"],
  },
];

const personalInfo = [
  { label: "Name", value: "Mohamed Ibrahim Abd Elsalam" },
  { label: "Email", value: "madimade444@gmail.com" },
  { label: "Phone", value: "+20 121168414" },
  { label: "Location", value: "Egypt" },
  { label: "Availability", value: "Open to Work" },
  { label: "Languages", value: "Arabic, English" },
];

export function About({ onNavigate, isDark }: AboutProps) {
  const bioReveal = useScrollReveal();
  const timelineReveal = useScrollReveal();
  const infoReveal = useScrollReveal();

  const cardStyle = {
    background: isDark ? "rgba(10, 8, 40, 0.6)" : "rgba(255, 255, 255, 0.8)",
    border: "1px solid var(--border)",
    backdropFilter: "blur(20px)",
  };

  const SectionHeader = ({ label, title, highlight }: { label: string; title: string; highlight: string }) => (
    <div className="text-center mb-16">
      <p
        className="text-sm font-semibold tracking-widest uppercase mb-3"
        style={{ color: "var(--neon-cyan)", fontFamily: "'JetBrains Mono', monospace" }}
      >
        {label}
      </p>
      <h2
        className="text-3xl sm:text-4xl font-bold"
        style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--foreground)" }}
      >
        {title}{" "}
        <span
          style={{
            background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {highlight}
        </span>
      </h2>
    </div>
  );

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <SectionHeader label="Get to Know Me" title="About" highlight="Me" />

        {/* Bio + Info */}
        <div
          ref={bioReveal.ref}
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-24"
          style={{
            opacity: bioReveal.visible ? 1 : 0,
            transform: bioReveal.visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
          }}
        >
          {/* Profile card */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Avatar */}
            <div
              className="rounded-2xl p-8 text-center"
              style={cardStyle}
            >
              <div
                className="w-32 h-32 rounded-2xl mx-auto mb-5 flex items-center justify-center text-4xl font-bold"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                  color: isDark ? "#03001c" : "#ffffff",
                  boxShadow: isDark ? "0 0 30px rgba(0,245,255,0.2)" : "0 0 30px rgba(0,153,204,0.15)",
                }}
              >
                MI
              </div>
              <h3
                className="font-bold text-xl mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--foreground)" }}
              >
                Mohamed Ibrahim Abd Elsalam
              </h3>
              <p
                className="text-sm mb-5"
                style={{ color: "var(--neon-cyan)", fontFamily: "'JetBrains Mono', monospace" }}
              >
                Web Developer
              </p>

              {/* Quick contact */}
              <div className="space-y-3 text-sm">
                {[
                  { icon: Mail, text: "madimade444@gmail.com", href: "mailto:madimade444@gmail.com" },
                  { icon: Phone, text: "+20 121168414", href: "tel:+20121168414" },
                  { icon: MapPin, text: "Egypt", href: null },
                ].map(({ icon: Icon, text, href }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon size={15} style={{ color: "var(--neon-cyan)", flexShrink: 0 }} />
                    {href ? (
                      <a href={href} className="hover:text-foreground transition-colors" style={{ color: "var(--muted-foreground)" }}>
                        {text}
                      </a>
                    ) : (
                      <span style={{ color: "var(--muted-foreground)" }}>{text}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => onNavigate("contact")}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                    color: isDark ? "#03001c" : "#ffffff",
                  }}
                >
                  Hire Me
                </button>
                <a
                  href="#"
                  download
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-center flex items-center justify-center gap-1.5 transition-all duration-200"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                    background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
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
                  <Download size={14} /> CV
                </a>
              </div>
            </div>

            {/* Personal info table */}
            <div className="rounded-2xl p-6" style={cardStyle}>
              <h4
                className="font-semibold mb-5 text-sm tracking-wider uppercase"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--neon-cyan)" }}
              >
                Personal Info
              </h4>
              <div className="space-y-3">
                {personalInfo.map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b" style={{ borderColor: "var(--border)" }}>
                    <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace" }}>
                      {label}
                    </span>
                    <span
                      className="text-sm font-medium text-right"
                      style={{
                        color: label === "Availability" ? "var(--neon-cyan)" : "var(--foreground)",
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bio text */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="rounded-2xl p-8" style={cardStyle}>
              <h3
                className="font-bold text-2xl mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--foreground)" }}
              >
                My Story
              </h3>
              <div className="space-y-5 text-base leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                <p>
                  I'm a passionate and self-driven Web Developer based in Egypt with over 3 years of
                  hands-on experience building modern web applications. My journey into web development
                  started with curiosity about how websites work — and quickly evolved into a career
                  built on crafting digital experiences that matter.
                </p>
                <p>
                  I specialize in full-stack web development, with deep expertise in PHP, MySQL,
                  WordPress, and modern JavaScript/React. I take pride in writing clean, maintainable
                  code that not only works flawlessly but also scales with your business needs.
                </p>
                <p>
                  Beyond coding, I'm a continuous learner who stays up-to-date with the latest web
                  technologies and best practices. I've earned multiple IBM SkillsBuild certifications
                  and constantly invest in my professional growth.
                </p>
              </div>
            </div>

            {/* Career objective */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: isDark
                  ? "linear-gradient(135deg, rgba(0,245,255,0.05), rgba(139,92,246,0.05))"
                  : "linear-gradient(135deg, rgba(0,153,204,0.05), rgba(124,58,237,0.05))",
                border: "1px solid var(--neon-cyan)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                  }}
                >
                  <Briefcase size={18} style={{ color: isDark ? "#03001c" : "#ffffff" }} />
                </div>
                <h4
                  className="font-bold text-lg"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--foreground)" }}
                >
                  Career Objective
                </h4>
              </div>
              <p className="text-base leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                To leverage my full-stack web development expertise in a dynamic environment where
                I can contribute to impactful projects, collaborate with talented teams, and continue
                growing as a professional developer — while delivering scalable, high-quality digital
                solutions that drive real business value.
              </p>
              <button
                onClick={() => onNavigate("contact")}
                className="mt-6 flex items-center gap-2 text-sm font-semibold transition-colors"
                style={{ color: "var(--neon-cyan)", fontFamily: "'Space Grotesk', sans-serif" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--neon-purple)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--neon-cyan)"; }}
              >
                Let's work together <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div ref={timelineReveal.ref}>
          <SectionHeader label="My Journey" title="Experience &" highlight="Education" />
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px"
              style={{
                background: isDark
                  ? "linear-gradient(to bottom, var(--neon-cyan), var(--neon-purple), transparent)"
                  : "linear-gradient(to bottom, rgba(0,153,204,0.4), rgba(124,58,237,0.3), transparent)",
              }}
            />

            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className="relative flex gap-8"
                  style={{
                    opacity: timelineReveal.visible ? 1 : 0,
                    transform: timelineReveal.visible ? "translateX(0)" : "translateX(-20px)",
                    transition: `all 0.6s ease ${i * 0.15}s`,
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 z-10"
                    style={{
                      background: exp.type === "work"
                        ? "linear-gradient(135deg, var(--neon-cyan), rgba(0,200,220,0.7))"
                        : "linear-gradient(135deg, var(--neon-purple), rgba(100,60,220,0.7))",
                      boxShadow: isDark
                        ? exp.type === "work"
                          ? "0 0 20px rgba(0,245,255,0.3)"
                          : "0 0 20px rgba(139,92,246,0.3)"
                        : "none",
                    }}
                  >
                    {exp.type === "work"
                      ? <Briefcase size={20} style={{ color: isDark ? "#03001c" : "#ffffff" }} />
                      : <GraduationCap size={20} style={{ color: "#ffffff" }} />
                    }
                  </div>

                  {/* Content */}
                  <div
                    className="flex-1 rounded-2xl p-6 transition-all duration-300"
                    style={cardStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = exp.type === "work" ? "var(--neon-cyan)" : "var(--neon-purple)";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h4
                          className="font-bold text-base"
                          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--foreground)" }}
                        >
                          {exp.role}
                        </h4>
                        <p
                          className="text-sm font-medium"
                          style={{
                            color: exp.type === "work" ? "var(--neon-cyan)" : "var(--neon-purple)",
                          }}
                        >
                          {exp.company}
                        </p>
                      </div>
                      <div
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                          border: "1px solid var(--border)",
                          color: "var(--muted-foreground)",
                        }}
                      >
                        <Calendar size={11} /> {exp.period}
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted-foreground)" }}>
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium"
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            background: isDark ? "rgba(0,245,255,0.08)" : "rgba(0,153,204,0.08)",
                            border: "1px solid rgba(0,245,255,0.2)",
                            color: "var(--neon-cyan)",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
