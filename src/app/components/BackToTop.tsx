import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

interface BackToTopProps {
  isDark: boolean;
}

export function BackToTop({ isDark }: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
      style={{
        background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
        color: isDark ? "#03001c" : "#ffffff",
        boxShadow: isDark
          ? "0 0 20px rgba(0, 245, 255, 0.4)"
          : "0 4px 20px rgba(0, 153, 204, 0.35)",
        animation: "fadeInUp 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = isDark
          ? "0 0 30px rgba(0, 245, 255, 0.6)"
          : "0 8px 25px rgba(0, 153, 204, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = isDark
          ? "0 0 20px rgba(0, 245, 255, 0.4)"
          : "0 4px 20px rgba(0, 153, 204, 0.35)";
      }}
    >
      <ArrowUp size={18} />
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </button>
  );
}
