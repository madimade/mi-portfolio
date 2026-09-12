import { useEffect, useState } from "react";
import { Code2 } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
  isDark: boolean;
}

export function LoadingScreen({ onComplete, isDark }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFade(true);
            setTimeout(onComplete, 600);
          }, 200);
          return 100;
        }
        return prev + Math.random() * 12 + 4;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-600"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #03001c 0%, #050028 50%, #03001c 100%)"
          : "linear-gradient(135deg, #f0f4ff 0%, #e8edf8 50%, #f0f4ff 100%)",
        opacity: fade ? 0 : 1,
        pointerEvents: fade ? "none" : "all",
      }}
    >
      {/* Background orbs */}
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 -top-20 -left-20"
        style={{ background: "var(--neon-cyan)" }}
      />
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-15 -bottom-20 -right-20"
        style={{ background: "var(--neon-purple)" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Animated logo */}
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
            boxShadow: isDark
              ? "0 0 40px rgba(0, 245, 255, 0.4), 0 0 80px rgba(139, 92, 246, 0.2)"
              : "0 0 40px rgba(0, 153, 204, 0.3)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        >
          <Code2 size={36} className="text-white" />
        </div>

        {/* Name */}
        <div className="text-center">
          <h1
            className="text-2xl font-bold mb-1"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Mohamed Ibrahim
          </h1>
          <p
            className="text-sm font-medium tracking-widest uppercase"
            style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            Web Developer
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 flex flex-col gap-2">
          <div
            className="w-full h-1 rounded-full overflow-hidden"
            style={{ background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background: "linear-gradient(90deg, var(--neon-cyan), var(--neon-purple))",
                boxShadow: isDark ? "0 0 10px rgba(0, 245, 255, 0.5)" : "none",
              }}
            />
          </div>
          <span
            className="text-right text-xs"
            style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            {Math.min(Math.round(progress), 100)}%
          </span>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
