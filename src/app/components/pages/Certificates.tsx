import { useRef, useState, useEffect } from "react";
import { Download, ExternalLink, Award, Calendar } from "lucide-react";

interface CertificatesProps {
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

const certificates = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    org: "IBM SkillsBuild",
    date: "March 2024",
    category: "IBM",
    credential: "IBM-WDF-2024",
    gradient: "135deg, rgba(0,245,255,0.12), rgba(139,92,246,0.08)",
    badgeColor: "var(--neon-cyan)",
  },
  {
    id: 2,
    title: "JavaScript Essentials",
    org: "IBM SkillsBuild",
    date: "May 2024",
    category: "IBM",
    credential: "IBM-JSE-2024",
    gradient: "135deg, rgba(139,92,246,0.12), rgba(0,245,255,0.08)",
    badgeColor: "var(--neon-purple)",
  },
  {
    id: 3,
    title: "PHP & MySQL Development",
    org: "Udemy",
    date: "January 2023",
    category: "Development",
    credential: "UC-PHP-MYSQL",
    gradient: "135deg, rgba(56,189,248,0.12), rgba(0,245,255,0.08)",
    badgeColor: "#38bdf8",
  },
  {
    id: 4,
    title: "Responsive Web Design",
    org: "freeCodeCamp",
    date: "September 2022",
    category: "Frontend",
    credential: "FCC-RWD-2022",
    gradient: "135deg, rgba(0,245,255,0.08), rgba(139,92,246,0.12)",
    badgeColor: "var(--neon-cyan)",
  },
  {
    id: 5,
    title: "WordPress Development",
    org: "LinkedIn Learning",
    date: "December 2023",
    category: "WordPress",
    credential: "LI-WP-DEV",
    gradient: "135deg, rgba(139,92,246,0.10), rgba(167,139,250,0.08)",
    badgeColor: "var(--neon-purple)",
  },
  {
    id: 6,
    title: "Git & GitHub Mastery",
    org: "IBM SkillsBuild",
    date: "June 2024",
    category: "IBM",
    credential: "IBM-GIT-2024",
    gradient: "135deg, rgba(0,245,255,0.10), rgba(56,189,248,0.08)",
    badgeColor: "var(--neon-cyan)",
  },
];

export function Certificates({ isDark }: CertificatesProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const headerReveal = useScrollReveal();
  const cardsReveal = useScrollReveal();

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
            Achievements
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
              Certificates
            </span>
          </h2>
          <p className="max-w-lg mx-auto text-base" style={{ color: "var(--muted-foreground)" }}>
            Professional certifications from globally recognized platforms demonstrating
            commitment to continuous learning and skill development.
          </p>
        </div>

        {/* IBM banner */}
        <div
          className="rounded-2xl p-7 mb-12 flex items-center gap-6"
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(0,245,255,0.06), rgba(139,92,246,0.06))"
              : "linear-gradient(135deg, rgba(0,153,204,0.06), rgba(124,58,237,0.06))",
            border: "1px solid var(--neon-cyan)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl font-black"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
              color: isDark ? "#03001c" : "#ffffff",
            }}
          >
            IBM
          </div>
          <div>
            <h3
              className="font-bold text-lg mb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--foreground)" }}
            >
              IBM SkillsBuild Certified
            </h3>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Multiple certifications from IBM's professional skills development platform —
              covering web development, cloud computing, and software engineering fundamentals.
            </p>
          </div>
          <div
            className="ml-auto flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold hidden sm:block"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
              color: isDark ? "#03001c" : "#ffffff",
            }}
          >
            3 Certs
          </div>
        </div>

        {/* Certificates grid */}
        <div
          ref={cardsReveal.ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certificates.map((cert, i) => (
            <div
              key={cert.id}
              className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
              style={{
                ...cardStyle,
                opacity: cardsReveal.visible ? 1 : 0,
                transform: cardsReveal.visible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease ${i * 0.1}s`,
              }}
              onClick={() => setSelected(selected === cert.id ? null : cert.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.borderColor = cert.badgeColor;
                e.currentTarget.style.boxShadow = isDark
                  ? `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${cert.badgeColor}20`
                  : `0 20px 40px rgba(0,0,0,0.08)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Certificate visual */}
              <div
                className="h-44 relative flex items-center justify-center overflow-hidden"
                style={{ background: `linear-gradient(${cert.gradient})` }}
              >
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: "25px 25px",
                  }}
                />

                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.6)",
                      border: `2px solid ${cert.badgeColor}40`,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Award size={28} style={{ color: cert.badgeColor }} />
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      background: isDark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.7)",
                      border: `1px solid ${cert.badgeColor}60`,
                      color: cert.badgeColor,
                    }}
                  >
                    {cert.category}
                  </span>
                </div>
              </div>

              {/* Certificate info */}
              <div className="p-6">
                <h3
                  className="font-bold text-base mb-1"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--foreground)" }}
                >
                  {cert.title}
                </h3>
                <p
                  className="text-sm font-medium mb-3"
                  style={{ color: cert.badgeColor }}
                >
                  {cert.org}
                </p>

                <div className="flex items-center gap-2 text-xs mb-5" style={{ color: "var(--muted-foreground)" }}>
                  <Calendar size={12} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{cert.date}</span>
                  <span className="mx-1">·</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>ID: {cert.credential}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                      color: isDark ? "#03001c" : "#ffffff",
                    }}
                  >
                    <Download size={14} /> Download
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200"
                    style={{
                      border: "1px solid var(--border)",
                      color: "var(--muted-foreground)",
                      background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = cert.badgeColor;
                      e.currentTarget.style.color = cert.badgeColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.color = "var(--muted-foreground)";
                    }}
                  >
                    <ExternalLink size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add more placeholder */}
        <div
          className="mt-8 rounded-2xl p-8 text-center border-2 border-dashed transition-all duration-300"
          style={{
            borderColor: "var(--border)",
            background: isDark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.01)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--neon-cyan)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
        >
          <div
            className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
            style={{
              background: isDark ? "rgba(0,245,255,0.05)" : "rgba(0,153,204,0.05)",
              border: "1px dashed var(--border)",
            }}
          >
            <Award size={20} style={{ color: "var(--muted-foreground)" }} />
          </div>
          <p
            className="font-semibold mb-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--muted-foreground)" }}
          >
            More Certificates Coming Soon
          </p>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Continuously learning and earning new professional certifications.
          </p>
        </div>
      </div>
    </div>
  );
}
