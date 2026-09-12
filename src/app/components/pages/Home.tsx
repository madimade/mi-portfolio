import { useState, useEffect, useRef } from "react";
import { Download, Eye, ArrowRight, Star, Users, Briefcase, Award, Github, Linkedin, Mail, ChevronDown } from "lucide-react";

const typingTexts = [
  "Web Developer",
  "WordPress Developer",
  "PHP Developer",
  "Frontend Developer",
];

interface HomeProps {
  onNavigate: (page: string) => void;
  isDark: boolean;
}

function useTypingEffect(texts: string[]) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    const speed = isDeleting ? 60 : 100;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.slice(0, displayText.length + 1));
        if (displayText.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(current.slice(0, displayText.length - 1));
        if (displayText.length - 1 === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts]);

  return displayText;
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

const stats = [
  { icon: Briefcase, label: "Projects Completed", value: "20+", color: "var(--neon-cyan)" },
  { icon: Users, label: "Happy Clients", value: "15+", color: "var(--neon-purple)" },
  { icon: Award, label: "Certificates", value: "8+", color: "var(--neon-cyan)" },
  { icon: Star, label: "Years Experience", value: "3+", color: "var(--neon-purple)" },
];

const testimonials = [
  {
    name: "Ahmed Hassan",
    role: "Startup Founder",
    text: "Mohamed delivered an exceptional website that exceeded our expectations. His attention to detail and technical expertise are outstanding.",
    rating: 5,
    avatar: "AH",
  },
  {
    name: "Sara Mohamed",
    role: "E-commerce Owner",
    text: "Working with Mohamed was a pleasure. He built a complete WordPress store for us with great speed and professionalism.",
    rating: 5,
    avatar: "SM",
  },
  {
    name: "Omar Khalil",
    role: "Digital Agency CEO",
    text: "Mohamed's PHP and MySQL skills are top-notch. He handled our complex database integration flawlessly and on time.",
    rating: 5,
    avatar: "OK",
  },
];

const blogPosts = [
  {
    title: "Building Responsive Layouts with CSS Grid & Flexbox",
    date: "May 2026",
    category: "Frontend",
    excerpt: "A deep dive into modern CSS layout techniques and when to use Grid vs Flexbox for maximum impact.",
    readTime: "5 min read",
  },
  {
    title: "WordPress Performance Optimization: Speed Up Your Site",
    date: "April 2026",
    category: "WordPress",
    excerpt: "Practical tips to dramatically improve your WordPress site's loading speed and Core Web Vitals scores.",
    readTime: "7 min read",
  },
  {
    title: "PHP Best Practices for Secure Web Applications",
    date: "March 2026",
    category: "PHP",
    excerpt: "Security-first approach to PHP development — protecting your app from common vulnerabilities.",
    readTime: "6 min read",
  },
];

export function Home({ onNavigate, isDark }: HomeProps) {
  const typedText = useTypingEffect(typingTexts);
  const statsReveal = useScrollReveal();
  const testimonialsReveal = useScrollReveal();
  const blogReveal = useScrollReveal();

  const cardStyle = {
    background: isDark
      ? "rgba(10, 8, 40, 0.6)"
      : "rgba(255, 255, 255, 0.8)",
    border: "1px solid var(--border)",
    backdropFilter: "blur(20px)",
  };

  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center pt-20 overflow-hidden"
        style={{
          background: isDark
            ? "linear-gradient(135deg, #03001c 0%, #05002a 50%, #03001c 100%)"
            : "linear-gradient(135deg, #f0f4ff 0%, #e8edf8 50%, #f0f4ff 100%)",
        }}
      >
        {/* Animated background orbs */}
        <div
          className="absolute top-20 left-10 w-80 h-80 rounded-full blur-3xl opacity-15 animate-pulse"
          style={{ background: "var(--neon-cyan)" }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-10 animate-pulse"
          style={{ background: "var(--neon-purple)", animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-3xl opacity-5"
          style={{ background: "linear-gradient(90deg, var(--neon-cyan), var(--neon-purple))" }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--neon-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--neon-cyan) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text content */}
            <div className="order-2 lg:order-1">
              {/* Status badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
                style={{
                  background: isDark ? "rgba(0, 245, 255, 0.08)" : "rgba(0, 153, 204, 0.08)",
                  border: "1px solid var(--neon-cyan)",
                  color: "var(--neon-cyan)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: "var(--neon-cyan)" }}
                />
                Available for work
              </div>

              <h1
                className="mb-4 leading-tight"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(2.2rem, 5vw, 4rem)",
                  fontWeight: 700,
                  color: "var(--foreground)",
                }}
              >
                Hi, I'm{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Mohamed Ibrahim
                </span>
              </h1>

              {/* Typing effect */}
              <div className="flex items-center gap-2 mb-6">
                <h2
                  className="text-xl sm:text-2xl font-semibold"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: "var(--muted-foreground)",
                  }}
                >
                  I'm a{" "}
                  <span style={{ color: "var(--neon-cyan)" }}>{typedText}</span>
                  <span
                    className="inline-block w-0.5 h-6 ml-1 animate-pulse"
                    style={{ background: "var(--neon-cyan)", verticalAlign: "middle" }}
                  />
                </h2>
              </div>

              <p
                className="text-base leading-relaxed mb-10 max-w-lg"
                style={{ color: "var(--muted-foreground)" }}
              >
                Passionate about building high-performance web applications with modern technologies.
                I specialize in creating seamless user experiences — from pixel-perfect frontends
                to robust backend systems.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-10">
                <button
                  onClick={() => onNavigate("contact")}
                  className="group flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                    color: isDark ? "#03001c" : "#ffffff",
                    boxShadow: isDark
                      ? "0 0 30px rgba(0, 245, 255, 0.3)"
                      : "0 4px 20px rgba(0, 153, 204, 0.35)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = isDark
                      ? "0 0 40px rgba(0, 245, 255, 0.5)"
                      : "0 8px 30px rgba(0, 153, 204, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = isDark
                      ? "0 0 30px rgba(0, 245, 255, 0.3)"
                      : "0 4px 20px rgba(0, 153, 204, 0.35)";
                  }}
                >
                  Hire Me <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate("projects")}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
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
                  <Eye size={16} /> View Projects
                </button>

                <a
                  href="#"
                  download
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background: isDark ? "rgba(139, 92, 246, 0.1)" : "rgba(124, 58, 237, 0.08)",
                    border: "1px solid var(--neon-purple)",
                    color: "var(--neon-purple)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDark
                      ? "rgba(139, 92, 246, 0.2)"
                      : "rgba(124, 58, 237, 0.15)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isDark
                      ? "rgba(139, 92, 246, 0.1)"
                      : "rgba(124, 58, 237, 0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Download size={16} /> Download CV
                </a>
              </div>

              {/* Social quick links */}
              <div className="flex items-center gap-4">
                <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                  Find me on:
                </span>
                {[
                  { icon: Github, href: "https://github.com", label: "GitHub" },
                  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:madimade444@gmail.com", label: "Email" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                    style={{
                      border: "1px solid var(--border)",
                      color: "var(--muted-foreground)",
                      background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--neon-cyan)";
                      e.currentTarget.style.borderColor = "var(--neon-cyan)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--muted-foreground)";
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Profile image */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                {/* Outer glow ring */}
                <div
                  className="absolute inset-0 rounded-full animate-spin"
                  style={{
                    background: "conic-gradient(from 0deg, var(--neon-cyan), var(--neon-purple), transparent, var(--neon-cyan))",
                    padding: "3px",
                    borderRadius: "50%",
                    animation: "spin 6s linear infinite",
                    filter: "blur(1px)",
                  }}
                />

                {/* Profile image container */}
                <div
                  className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden"
                  style={{
                    border: "3px solid transparent",
                    background: isDark
                      ? "linear-gradient(rgba(3,0,28,1), rgba(3,0,28,1)) padding-box, linear-gradient(135deg, var(--neon-cyan), var(--neon-purple)) border-box"
                      : "linear-gradient(rgba(240,244,255,1), rgba(240,244,255,1)) padding-box, linear-gradient(135deg, var(--neon-cyan), var(--neon-purple)) border-box",
                    boxShadow: isDark
                      ? "0 0 50px rgba(0, 245, 255, 0.2), 0 0 100px rgba(139, 92, 246, 0.1)"
                      : "0 0 50px rgba(0, 153, 204, 0.15)",
                  }}
                >
                  <div
                    className="w-full h-full flex flex-col items-center justify-center gap-3"
                    style={{
                      background: isDark
                        ? "linear-gradient(135deg, rgba(10,8,40,0.9), rgba(20,15,60,0.9))"
                        : "linear-gradient(135deg, rgba(224,231,255,0.9), rgba(240,244,255,0.9))",
                    }}
                  >
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                        color: isDark ? "#03001c" : "#ffffff",
                      }}
                    >
                      MI
                    </div>
                    <div className="text-center px-4">
                      <p
                        className="font-bold text-lg"
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          color: "var(--foreground)",
                        }}
                      >
                        Mohamed Ibrahim
                      </p>
                      <p
                        className="text-xs"
                        style={{
                          color: "var(--neon-cyan)",
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        Web Developer
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating badge top-right */}
                <div
                  className="absolute -top-2 -right-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                    color: isDark ? "#03001c" : "#ffffff",
                    boxShadow: isDark ? "0 0 15px rgba(0,245,255,0.4)" : "none",
                  }}
                >
                  Open to Work
                </div>

                {/* Floating tech badge bottom-left */}
                <div
                  className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl text-xs font-medium"
                  style={{
                    ...cardStyle,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "var(--neon-purple)",
                  }}
                >
                  {'</ React + PHP >'}
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-16">
            <div
              className="flex flex-col items-center gap-2 animate-bounce cursor-pointer"
              style={{ color: "var(--muted-foreground)" }}
              onClick={() => {
                const el = document.getElementById("stats-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span
                className="text-xs tracking-widest uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Scroll Down
              </span>
              <ChevronDown size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats-section" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={statsReveal.ref}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map(({ icon: Icon, label, value, color }, i) => (
              <div
                key={label}
                className="rounded-2xl p-6 text-center transition-all duration-300"
                style={{
                  ...cardStyle,
                  opacity: statsReveal.visible ? 1 : 0,
                  transform: statsReveal.visible ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.6s ease ${i * 0.1}s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = color;
                  e.currentTarget.style.boxShadow = isDark
                    ? `0 0 30px ${color}20`
                    : `0 8px 25px ${color}25`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                  style={{
                    background: isDark ? `${color}15` : `${color}10`,
                    border: `1px solid ${color}40`,
                  }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <div
                  className="text-3xl font-bold mb-1"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color,
                  }}
                >
                  {value}
                </div>
                <div
                  className="text-sm"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--neon-cyan)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              Client Feedback
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--foreground)" }}
            >
              What Clients{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Say
              </span>
            </h2>
          </div>

          <div
            ref={testimonialsReveal.ref}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300"
                style={{
                  ...cardStyle,
                  opacity: testimonialsReveal.visible ? 1 : 0,
                  transform: testimonialsReveal.visible ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.6s ease ${i * 0.15}s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "var(--neon-cyan)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} fill="var(--neon-cyan)" style={{ color: "var(--neon-cyan)" }} />
                  ))}
                </div>
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                      color: isDark ? "#03001c" : "#ffffff",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--foreground)" }}
                    >
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-14">
            <div>
              <p
                className="text-sm font-semibold tracking-widest uppercase mb-3"
                style={{ color: "var(--neon-cyan)", fontFamily: "'JetBrains Mono', monospace" }}
              >
                Latest Articles
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--foreground)" }}
              >
                From the{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Blog
                </span>
              </h2>
            </div>
            <button
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                border: "1px solid var(--border)",
                color: "var(--muted-foreground)",
                background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--neon-cyan)";
                e.currentTarget.style.color = "var(--neon-cyan)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--muted-foreground)";
              }}
            >
              View All Posts <ArrowRight size={14} />
            </button>
          </div>

          <div
            ref={blogReveal.ref}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {blogPosts.map((post, i) => (
              <article
                key={post.title}
                className="rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
                style={{
                  ...cardStyle,
                  opacity: blogReveal.visible ? 1 : 0,
                  transform: blogReveal.visible ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.6s ease ${i * 0.15}s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "var(--neon-purple)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                {/* Blog image placeholder */}
                <div
                  className="h-48 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: isDark
                      ? "linear-gradient(135deg, rgba(0,245,255,0.05), rgba(139,92,246,0.08))"
                      : "linear-gradient(135deg, rgba(0,153,204,0.08), rgba(124,58,237,0.06))",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: `linear-gradient(var(--neon-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--neon-cyan) 1px, transparent 1px)`,
                      backgroundSize: "30px 30px",
                    }}
                  />
                  <span
                    className="relative z-10 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      background: isDark ? "rgba(0,245,255,0.1)" : "rgba(0,153,204,0.1)",
                      border: "1px solid var(--neon-cyan)",
                      color: "var(--neon-cyan)",
                    }}
                  >
                    {post.category}
                  </span>
                </div>

                <div className="p-6">
                  <div
                    className="flex items-center gap-2 mb-3 text-xs"
                    style={{
                      color: "var(--muted-foreground)",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3
                    className="font-bold mb-3 leading-snug"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "var(--foreground)",
                      fontSize: "1rem",
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {post.excerpt}
                  </p>
                  <div
                    className="mt-4 flex items-center gap-1 text-sm font-semibold transition-colors"
                    style={{ color: "var(--neon-cyan)", fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Read more <ArrowRight size={14} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl p-12 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
            }}
          >
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative z-10">
              <h2
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Ready to Build Something Amazing?
              </h2>
              <p className="text-white/80 text-base mb-8 max-w-xl mx-auto">
                Let's collaborate on your next project. I'm available for freelance work and exciting opportunities.
              </p>
              <button
                onClick={() => onNavigate("contact")}
                className="px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: isDark ? "#03001c" : "#ffffff",
                  color: isDark ? "var(--neon-cyan)" : "var(--neon-purple)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Let's Talk →
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
