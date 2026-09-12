import { useRef, useState, useEffect } from "react";
import { Globe, Layout, Wrench, FileCode, Database, ArrowRight, CheckCircle2 } from "lucide-react";

interface ServicesProps {
  onNavigate: (page: string) => void;
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

const services = [
  {
    icon: Globe,
    title: "Web Development",
    subtitle: "Full-Stack Solutions",
    description:
      "End-to-end web development from concept to deployment. I build robust, scalable web applications using PHP, MySQL, and modern JavaScript frameworks tailored to your business needs.",
    features: [
      "Custom web application development",
      "RESTful API design & integration",
      "Database architecture & optimization",
      "Authentication & security implementation",
      "Performance optimization",
    ],
    color: "var(--neon-cyan)",
    popular: false,
  },
  {
    icon: Layout,
    title: "WordPress Development",
    subtitle: "Custom Themes & Plugins",
    description:
      "Professional WordPress solutions from custom theme development to complex plugin creation. Get a powerful, easy-to-manage website built on the world's most popular CMS.",
    features: [
      "Custom theme development from scratch",
      "WooCommerce store setup & customization",
      "Plugin development & customization",
      "Page builder (Elementor/Divi) expert",
      "WordPress migration & optimization",
    ],
    color: "var(--neon-purple)",
    popular: true,
  },
  {
    icon: Wrench,
    title: "Website Maintenance",
    subtitle: "Ongoing Support",
    description:
      "Keep your website running smoothly with regular maintenance, security updates, performance monitoring, and technical support. Focus on your business while I handle the tech.",
    features: [
      "Regular security updates & patches",
      "Performance monitoring & optimization",
      "Content updates & backups",
      "Bug fixes & troubleshooting",
      "Monthly reporting",
    ],
    color: "#38bdf8",
    popular: false,
  },
  {
    icon: FileCode,
    title: "Landing Page Development",
    subtitle: "Conversion-Focused Design",
    description:
      "High-converting landing pages designed to capture leads and drive sales. Fast, responsive, and optimized for search engines — built to turn visitors into customers.",
    features: [
      "Conversion-optimized layouts",
      "Mobile-first responsive design",
      "Fast loading (Core Web Vitals)",
      "SEO-friendly structure",
      "A/B testing ready",
    ],
    color: "var(--neon-cyan)",
    popular: false,
  },
  {
    icon: Database,
    title: "Database Integration",
    subtitle: "MySQL & Data Solutions",
    description:
      "Expert MySQL database design, optimization, and integration. From schema design to complex queries, I ensure your data layer is efficient, secure, and scalable.",
    features: [
      "Database schema design & normalization",
      "Complex query optimization",
      "Data migration & ETL processes",
      "Backup & recovery strategies",
      "API & CMS integration",
    ],
    color: "var(--neon-purple)",
    popular: false,
  },
];

const process = [
  { step: "01", title: "Discovery", desc: "Understanding your goals, requirements, and target audience." },
  { step: "02", title: "Planning", desc: "Defining technical architecture, timeline, and deliverables." },
  { step: "03", title: "Development", desc: "Building your solution with clean, maintainable code." },
  { step: "04", title: "Delivery", desc: "Testing, deployment, and handover with full documentation." },
];

export function Services({ onNavigate, isDark }: ServicesProps) {
  const headerReveal = useScrollReveal();
  const cardsReveal = useScrollReveal();
  const processReveal = useScrollReveal();

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
            What I Offer
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
              Services
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-base" style={{ color: "var(--muted-foreground)" }}>
            From custom web apps to WordPress solutions — I deliver quality digital products
            that drive real results for your business.
          </p>
        </div>

        {/* Services grid */}
        <div
          ref={cardsReveal.ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="relative rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300"
                style={{
                  ...cardStyle,
                  opacity: cardsReveal.visible ? 1 : 0,
                  transform: cardsReveal.visible ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.6s ease ${i * 0.1}s`,
                  ...(service.popular
                    ? {
                        border: "1px solid var(--neon-purple)",
                        boxShadow: isDark
                          ? "0 0 30px rgba(139,92,246,0.15)"
                          : "0 0 30px rgba(124,58,237,0.08)",
                      }
                    : {}),
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  if (!service.popular) {
                    e.currentTarget.style.borderColor = service.color;
                    e.currentTarget.style.boxShadow = isDark
                      ? `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${service.color}15`
                      : `0 20px 40px rgba(0,0,0,0.08)`;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  if (!service.popular) {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                {service.popular && (
                  <div
                    className="absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                      color: isDark ? "#03001c" : "#ffffff",
                    }}
                  >
                    Most Popular
                  </div>
                )}

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: isDark ? `${service.color}12` : `${service.color}10`,
                    border: `1px solid ${service.color}30`,
                  }}
                >
                  <Icon size={26} style={{ color: service.color }} />
                </div>

                <div>
                  <h3
                    className="font-bold text-xl mb-1"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--foreground)" }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-sm font-medium"
                    style={{ color: service.color, fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {service.subtitle}
                  </p>
                </div>

                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--muted-foreground)" }}>
                      <CheckCircle2
                        size={15}
                        style={{ color: service.color, flexShrink: 0, marginTop: "2px" }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onNavigate("contact")}
                  className="mt-2 flex items-center gap-2 py-3 px-5 rounded-xl text-sm font-semibold transition-all duration-200 justify-center"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background: service.popular
                      ? "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))"
                      : isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                    color: service.popular
                      ? isDark ? "#03001c" : "#ffffff"
                      : service.color,
                    border: service.popular ? "none" : `1px solid ${service.color}40`,
                  }}
                  onMouseEnter={(e) => {
                    if (!service.popular) {
                      e.currentTarget.style.background = isDark
                        ? `${service.color}15`
                        : `${service.color}10`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!service.popular) {
                      e.currentTarget.style.background = isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.05)";
                    }
                  }}
                >
                  Get Started <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Process section */}
        <div
          ref={processReveal.ref}
          className="rounded-3xl p-10"
          style={cardStyle}
        >
          <div className="text-center mb-10">
            <h3
              className="text-2xl font-bold mb-3"
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
                Process
              </span>
            </h3>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              How I approach every project for maximum quality and clarity
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <div
                key={step.step}
                className="relative text-center"
                style={{
                  opacity: processReveal.visible ? 1 : 0,
                  transform: processReveal.visible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s ease ${i * 0.12}s`,
                }}
              >
                {i < process.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-7 left-[60%] w-full h-px"
                    style={{
                      background: `linear-gradient(90deg, var(--neon-cyan)40, transparent)`,
                    }}
                  />
                )}
                <div
                  className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-lg font-black"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                    color: isDark ? "#03001c" : "#ffffff",
                    boxShadow: isDark ? "0 0 20px rgba(0,245,255,0.25)" : "none",
                  }}
                >
                  {step.step}
                </div>
                <h4
                  className="font-bold mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--foreground)" }}
                >
                  {step.title}
                </h4>
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
