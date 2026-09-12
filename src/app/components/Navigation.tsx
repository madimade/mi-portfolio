import { useState, useEffect } from "react";
import { Menu, X, Code2, Sun, Moon } from "lucide-react";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

interface NavigationProps {
  activePage: string;
  onNavigate: (page: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Navigation({ activePage, onNavigate, isDark, onToggleTheme }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isScrolled
            ? isDark
              ? "rgba(3, 0, 28, 0.92)"
              : "rgba(240, 244, 255, 0.92)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          borderBottom: isScrolled
            ? isDark
              ? "1px solid rgba(0, 245, 255, 0.1)"
              : "1px solid rgba(0, 153, 204, 0.15)"
            : "none",
          boxShadow: isScrolled
            ? isDark
              ? "0 4px 30px rgba(0, 245, 255, 0.05)"
              : "0 4px 30px rgba(0, 0, 0, 0.05)"
            : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => handleNav("home")}
              className="flex items-center gap-2 group"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                  boxShadow: isDark ? "0 0 15px rgba(0, 245, 255, 0.4)" : "0 0 15px rgba(0, 153, 204, 0.3)",
                }}
              >
                <Code2 size={18} className="text-white" />
              </div>
              <span
                className="hidden sm:block font-bold tracking-tight"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.1rem",
                  background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Mohamed.dev
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color:
                      activePage === link.id
                        ? "var(--neon-cyan)"
                        : "var(--muted-foreground)",
                    background:
                      activePage === link.id
                        ? isDark
                          ? "rgba(0, 245, 255, 0.08)"
                          : "rgba(0, 153, 204, 0.08)"
                        : "transparent",
                    borderBottom:
                      activePage === link.id
                        ? "1px solid var(--neon-cyan)"
                        : "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (activePage !== link.id) {
                      e.currentTarget.style.color = "var(--foreground)";
                      e.currentTarget.style.background = isDark
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(0,0,0,0.04)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activePage !== link.id) {
                      e.currentTarget.style.color = "var(--muted-foreground)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleTheme}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{
                  background: isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.06)",
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
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              <button
                onClick={() => handleNav("contact")}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                  color: isDark ? "#03001c" : "#ffffff",
                  boxShadow: isDark
                    ? "0 0 20px rgba(0, 245, 255, 0.25)"
                    : "0 4px 15px rgba(0, 153, 204, 0.3)",
                }}
              >
                Hire Me
              </button>

              <button
                className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  background: isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.06)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="md:hidden border-t"
            style={{
              background: isDark ? "rgba(3, 0, 28, 0.97)" : "rgba(240, 244, 255, 0.97)",
              borderColor: "var(--border)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: activePage === link.id ? "var(--neon-cyan)" : "var(--foreground)",
                    background:
                      activePage === link.id
                        ? isDark
                          ? "rgba(0, 245, 255, 0.08)"
                          : "rgba(0, 153, 204, 0.08)"
                        : "transparent",
                  }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav("contact")}
                className="w-full mt-2 px-4 py-2.5 rounded-lg text-sm font-semibold"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                  color: isDark ? "#03001c" : "#ffffff",
                }}
              >
                Hire Me
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
