import { useState, useRef, useEffect } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Github, Linkedin, Facebook, Instagram } from "lucide-react";

interface ContactProps {
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

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  else if (data.name.trim().length < 2) errors.name = "Name must be at least 2 characters";

  if (!data.email.trim()) errors.email = "Email is required";
  else if (!emailRegex.test(data.email)) errors.email = "Please enter a valid email address";

  if (!data.subject.trim()) errors.subject = "Subject is required";
  else if (data.subject.trim().length < 5) errors.subject = "Subject must be at least 5 characters";

  if (!data.message.trim()) errors.message = "Message is required";
  else if (data.message.trim().length < 20) errors.message = "Message must be at least 20 characters";

  return errors;
}

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com", color: "var(--neon-cyan)" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", color: "var(--neon-purple)" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com", color: "#38bdf8" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com", color: "var(--neon-purple)" },
];

export function Contact({ isDark }: ContactProps) {
  const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const headerReveal = useScrollReveal();
  const formReveal = useScrollReveal();

  const cardStyle = {
    background: isDark ? "rgba(10, 8, 40, 0.6)" : "rgba(255, 255, 255, 0.8)",
    border: "1px solid var(--border)",
    backdropFilter: "blur(20px)",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newErrors = validate({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, subject: true, message: true };
    setTouched(allTouched);
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setStatus("sending");
    // Simulate sending — in production wire to a form backend (Formspree, EmailJS, etc.)
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTouched({});
      setErrors({});
    }, 1500);
  };

  const inputStyle = (field: keyof FormErrors) => ({
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    border: `1px solid ${touched[field] && errors[field] ? "#ef4444" : "var(--border)"}`,
    background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
    color: "var(--foreground)",
    fontSize: "0.9rem",
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    transition: "all 0.2s ease",
  });

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
            Get In Touch
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-5"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--foreground)" }}
          >
            Contact{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Me
            </span>
          </h2>
          <p className="max-w-lg mx-auto text-base" style={{ color: "var(--muted-foreground)" }}>
            Have a project in mind? Looking for a developer to join your team? I'd love to hear from you.
            Let's build something great together.
          </p>
        </div>

        <div
          ref={formReveal.ref}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8"
          style={{
            opacity: formReveal.visible ? 1 : 0,
            transform: formReveal.visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
          }}
        >
          {/* Contact info sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Contact details */}
            <div className="rounded-2xl p-7" style={cardStyle}>
              <h3
                className="font-bold text-lg mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--foreground)" }}
              >
                Contact Information
              </h3>
              <div className="space-y-5">
                {[
                  { icon: Mail, label: "Email", value: "madimade444@gmail.com", href: "mailto:madimade444@gmail.com" },
                  { icon: Phone, label: "Phone", value: "+20 121168414", href: "tel:+20121168414" },
                  { icon: MapPin, label: "Location", value: "Egypt", href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: isDark ? "rgba(0,245,255,0.08)" : "rgba(0,153,204,0.08)",
                        border: "1px solid var(--neon-cyan)",
                      }}
                    >
                      <Icon size={18} style={{ color: "var(--neon-cyan)" }} />
                    </div>
                    <div>
                      <p
                        className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                        style={{ color: "var(--muted-foreground)", fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm font-medium transition-colors hover:underline"
                          style={{ color: "var(--foreground)" }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--neon-cyan)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--foreground)"; }}
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response time */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: isDark
                  ? "linear-gradient(135deg, rgba(0,245,255,0.05), rgba(139,92,246,0.05))"
                  : "linear-gradient(135deg, rgba(0,153,204,0.05), rgba(124,58,237,0.05))",
                border: "1px solid var(--neon-cyan)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-pulse"
                  style={{ background: "var(--neon-cyan)" }}
                />
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--neon-cyan)", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Available for Work
                </span>
              </div>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                I typically respond within <strong style={{ color: "var(--foreground)" }}>24 hours</strong>.
                For urgent projects, please mention it in your message.
              </p>
            </div>

            {/* Social links */}
            <div className="rounded-2xl p-6" style={cardStyle}>
              <h4
                className="font-semibold mb-5 text-sm tracking-wider uppercase"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--neon-cyan)" }}
              >
                Social Media
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map(({ icon: Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                      border: "1px solid var(--border)",
                      color: "var(--muted-foreground)",
                      background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = color;
                      e.currentTarget.style.borderColor = color;
                      e.currentTarget.style.background = isDark ? `${color}12` : `${color}08`;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--muted-foreground)";
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <Icon size={16} />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl p-8" style={cardStyle}>
              <h3
                className="font-bold text-xl mb-8"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--foreground)" }}
              >
                Send a Message
              </h3>

              {status === "success" ? (
                <div
                  className="flex flex-col items-center justify-center py-16 text-center gap-5"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                      boxShadow: isDark ? "0 0 40px rgba(0,245,255,0.3)" : "none",
                    }}
                  >
                    <CheckCircle2 size={36} style={{ color: isDark ? "#03001c" : "#ffffff" }} />
                  </div>
                  <div>
                    <h4
                      className="text-xl font-bold mb-2"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--foreground)" }}
                    >
                      Message Sent Successfully!
                    </h4>
                    <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                      Thank you for reaching out. I'll get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
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
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    {/* Name */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          color: touched.name && errors.name ? "#ef4444" : "var(--foreground)",
                        }}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Mohamed Ibrahim"
                        style={inputStyle("name")}
                        onFocus={(e) => {
                          e.target.style.borderColor = errors.name ? "#ef4444" : "var(--neon-cyan)";
                          e.target.style.boxShadow = errors.name
                            ? "0 0 0 3px rgba(239,68,68,0.1)"
                            : "0 0 0 3px rgba(0,245,255,0.1)";
                        }}
                        onBlurCapture={(e) => {
                          e.target.style.boxShadow = "none";
                          if (!errors[e.target.name as keyof FormErrors]) {
                            e.target.style.borderColor = "var(--border)";
                          }
                        }}
                      />
                      {touched.name && errors.name && (
                        <p
                          className="mt-1.5 flex items-center gap-1 text-xs"
                          style={{ color: "#ef4444" }}
                        >
                          <AlertCircle size={12} /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          color: touched.email && errors.email ? "#ef4444" : "var(--foreground)",
                        }}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="your@email.com"
                        style={inputStyle("email")}
                        onFocus={(e) => {
                          e.target.style.borderColor = errors.email ? "#ef4444" : "var(--neon-cyan)";
                          e.target.style.boxShadow = errors.email
                            ? "0 0 0 3px rgba(239,68,68,0.1)"
                            : "0 0 0 3px rgba(0,245,255,0.1)";
                        }}
                        onBlurCapture={(e) => {
                          e.target.style.boxShadow = "none";
                          if (!errors[e.target.name as keyof FormErrors]) {
                            e.target.style.borderColor = "var(--border)";
                          }
                        }}
                      />
                      {touched.email && errors.email && (
                        <p
                          className="mt-1.5 flex items-center gap-1 text-xs"
                          style={{ color: "#ef4444" }}
                        >
                          <AlertCircle size={12} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="mb-5">
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: touched.subject && errors.subject ? "#ef4444" : "var(--foreground)",
                      }}
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Project discussion / Job opportunity / Collaboration"
                      style={inputStyle("subject")}
                      onFocus={(e) => {
                        e.target.style.borderColor = errors.subject ? "#ef4444" : "var(--neon-cyan)";
                        e.target.style.boxShadow = errors.subject
                          ? "0 0 0 3px rgba(239,68,68,0.1)"
                          : "0 0 0 3px rgba(0,245,255,0.1)";
                      }}
                      onBlurCapture={(e) => {
                        e.target.style.boxShadow = "none";
                        if (!errors[e.target.name as keyof FormErrors]) {
                          e.target.style.borderColor = "var(--border)";
                        }
                      }}
                    />
                    {touched.subject && errors.subject && (
                      <p
                        className="mt-1.5 flex items-center gap-1 text-xs"
                        style={{ color: "#ef4444" }}
                      >
                        <AlertCircle size={12} /> {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="mb-8">
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: touched.message && errors.message ? "#ef4444" : "var(--foreground)",
                      }}
                    >
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
                      rows={6}
                      style={{
                        ...inputStyle("message"),
                        resize: "vertical",
                        minHeight: "140px",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = errors.message ? "#ef4444" : "var(--neon-cyan)";
                        e.target.style.boxShadow = errors.message
                          ? "0 0 0 3px rgba(239,68,68,0.1)"
                          : "0 0 0 3px rgba(0,245,255,0.1)";
                      }}
                      onBlurCapture={(e) => {
                        e.target.style.boxShadow = "none";
                        if (!errors[e.target.name as keyof FormErrors]) {
                          e.target.style.borderColor = "var(--border)";
                        }
                      }}
                    />
                    <div className="flex items-start justify-between mt-1.5">
                      {touched.message && errors.message ? (
                        <p
                          className="flex items-center gap-1 text-xs"
                          style={{ color: "#ef4444" }}
                        >
                          <AlertCircle size={12} /> {errors.message}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span
                        className="text-xs"
                        style={{
                          color: form.message.length < 20 ? "var(--muted-foreground)" : "var(--neon-cyan)",
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {form.message.length} chars
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        background: status === "sending"
                          ? isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                          : "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                        color: status === "sending"
                          ? "var(--muted-foreground)"
                          : isDark ? "#03001c" : "#ffffff",
                        cursor: status === "sending" ? "not-allowed" : "pointer",
                        boxShadow: status === "sending" ? "none" : isDark
                          ? "0 0 30px rgba(0,245,255,0.25)"
                          : "0 4px 20px rgba(0,153,204,0.3)",
                      }}
                    >
                      {status === "sending" ? (
                        <>
                          <span
                            className="w-4 h-4 border-2 rounded-full animate-spin"
                            style={{ borderColor: "var(--muted-foreground)", borderTopColor: "transparent" }}
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} /> Send Message
                        </>
                      )}
                    </button>

                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                      Sent to{" "}
                      <span
                        style={{ color: "var(--neon-cyan)", fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        madimade444@gmail.com
                      </span>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
