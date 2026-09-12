import { Mail, Phone, MapPin, Github, Linkedin, Facebook, Instagram, Code2 } from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
  isDark: boolean;
}

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
];

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export function Footer({ onNavigate, isDark }: FooterProps) {
  return (
    <footer
      className="relative overflow-hidden mt-0 border-t"
      style={{
        background: isDark
          ? "rgba(3, 0, 22, 0.95)"
          : "rgba(240, 244, 255, 0.95)",
        borderColor: "var(--border)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-48 blur-3xl opacity-10 rounded-full"
        style={{ background: "linear-gradient(90deg, var(--neon-cyan), var(--neon-purple))" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                }}
              >
                <Code2 size={18} className="text-white" />
              </div>
              <span
                className="font-bold"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Mohamed.dev
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted-foreground)" }}>
              Passionate web developer crafting modern, performant, and beautiful digital experiences.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--muted-foreground)",
                    background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--neon-cyan)";
                    e.currentTarget.style.borderColor = "var(--neon-cyan)";
                    e.currentTarget.style.background = isDark
                      ? "rgba(0,245,255,0.08)"
                      : "rgba(0,153,204,0.08)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--muted-foreground)";
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.background = isDark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,0,0,0.04)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-semibold mb-5 text-sm tracking-wider uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--neon-cyan)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavigate(link.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-sm transition-all duration-200 hover:translate-x-1"
                    style={{ color: "var(--muted-foreground)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--neon-cyan)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted-foreground)"; }}
                  >
                    → {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="font-semibold mb-5 text-sm tracking-wider uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--neon-cyan)" }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {["Web Development", "WordPress Dev", "PHP Development", "Frontend Dev", "Database Integration", "Landing Pages"].map((s) => (
                <li key={s}>
                  <button
                    onClick={() => {
                      onNavigate("services");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "var(--muted-foreground)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--neon-cyan)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted-foreground)"; }}
                  >
                    → {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-semibold mb-5 text-sm tracking-wider uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--neon-cyan)" }}
            >
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:madimade444@gmail.com"
                  className="flex items-center gap-3 text-sm transition-colors duration-200 group"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isDark ? "rgba(0,245,255,0.1)" : "rgba(0,153,204,0.1)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <Mail size={14} style={{ color: "var(--neon-cyan)" }} />
                  </div>
                  <span className="break-all group-hover:text-foreground transition-colors">
                    madimade444@gmail.com
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+20121168414"
                  className="flex items-center gap-3 text-sm transition-colors duration-200 group"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isDark ? "rgba(0,245,255,0.1)" : "rgba(0,153,204,0.1)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <Phone size={14} style={{ color: "var(--neon-cyan)" }} />
                  </div>
                  <span className="group-hover:text-foreground transition-colors">+20 121168414</span>
                </a>
              </li>
              <li>
                <div
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isDark ? "rgba(0,245,255,0.1)" : "rgba(0,153,204,0.1)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <MapPin size={14} style={{ color: "var(--neon-cyan)" }} />
                  </div>
                  <span>Egypt</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            © 2026 Mohamed Ibrahim Abd Elsalam. All Rights Reserved.
          </p>
          <p
            className="text-xs"
            style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            Built with React + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
