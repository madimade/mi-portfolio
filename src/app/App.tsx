import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { LoadingScreen } from "./components/LoadingScreen";
import { BackToTop } from "./components/BackToTop";
import { Footer } from "./components/Footer";
import { Home } from "./components/pages/Home";
import { About } from "./components/pages/About";
import { Skills } from "./components/pages/Skills";
import { Projects } from "./components/pages/Projects";
import { Certificates } from "./components/pages/Certificates";
import { Services } from "./components/pages/Services";
import { Contact } from "./components/pages/Contact";

type Page = "home" | "about" | "skills" | "projects" | "certificates" | "services" | "contact";

export default function App() {
  /* MARKER-MAKE-KIT-INVOKED */
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState<Page>("home");
  const [isDark, setIsDark] = useState(true);

  // Apply dark class to html element
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDark]);

  // Scroll to top on page change
  const handleNavigate = (page: string) => {
    setActivePage(page as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <Home onNavigate={handleNavigate} isDark={isDark} />;
      case "about":
        return <About onNavigate={handleNavigate} isDark={isDark} />;
      case "skills":
        return <Skills isDark={isDark} />;
      case "projects":
        return <Projects isDark={isDark} />;
      case "certificates":
        return <Certificates isDark={isDark} />;
      case "services":
        return <Services onNavigate={handleNavigate} isDark={isDark} />;
      case "contact":
        return <Contact isDark={isDark} />;
      default:
        return <Home onNavigate={handleNavigate} isDark={isDark} />;
    }
  };

  return (
    <>
      {loading && (
        <LoadingScreen
          onComplete={() => setLoading(false)}
          isDark={isDark}
        />
      )}

      <div
        className="min-h-screen flex flex-col"
        style={{
          background: "var(--background)",
          color: "var(--foreground)",
          fontFamily: "'Inter', system-ui, sans-serif",
          opacity: loading ? 0 : 1,
          transition: "opacity 0.5s ease",
        }}
      >
        {/* Page transition background orbs (decorative) */}
        {isDark && (
          <>
            <div
              className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(0,245,255,0.03) 0%, transparent 70%)",
                zIndex: 0,
              }}
            />
            <div
              className="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)",
                zIndex: 0,
              }}
            />
          </>
        )}

        {/* Navigation */}
        <Navigation
          activePage={activePage}
          onNavigate={handleNavigate}
          isDark={isDark}
          onToggleTheme={() => setIsDark((d) => !d)}
        />

        {/* Page content */}
        <main className="relative z-10 flex-1">
          {renderPage()}
        </main>

        {/* Footer */}
        <Footer onNavigate={handleNavigate} isDark={isDark} />

        {/* Back to top */}
        <BackToTop isDark={isDark} />
      </div>
    </>
  );
}
