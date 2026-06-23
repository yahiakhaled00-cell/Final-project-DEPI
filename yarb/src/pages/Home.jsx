import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaGithub, FaRocket, FaArrowRight, FaCheck } from "react-icons/fa";
import { FaGitAlt, FaUserPen, FaChartBar, FaBullseye, FaFileCode, FaPalette } from "react-icons/fa6";

const features = [
  { icon: FaGithub, title: "GitHub Analysis", desc: "Deep insights from your repos, languages, and activity." },
  { icon: FaUserPen, title: "AI About-Me", desc: "Professionally written bios that sound like you." },
  { icon: FaChartBar, title: "Developer Score", desc: "Benchmark your skills with a 0–100 rating." },
  { icon: FaBullseye, title: "Career Matching", desc: "See which roles fit your profile best." },
  { icon: FaFileCode, title: "Project Optimizer", desc: "AI rewrites repo descriptions that convert." },
  { icon: FaPalette, title: "Live Builder", desc: "Drag, edit, theme — preview updates in real time." },
];

const templates = [
  { name: "Minimal", bg: "linear-gradient(135deg, #f8f9fa, #e2e8f0)", color: "#333" },
  { name: "Modern", bg: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)", color: "white" },
  { name: "Developer Dark", bg: "linear-gradient(135deg, #0d1117, #161b22)", color: "#00ff41" },
];

const testimonials = [
  { quote: "PortfolioGenie turned my messy GitHub into a professional portfolio in minutes.", name: "Sara Lin", role: "Senior Engineer @ Stripe" },
  { quote: "The whole workflow takes less than 10 minutes. Absolutely incredible.", name: "Marcus Reed", role: "Frontend Dev @ Vercel" },
  { quote: "Finally a tool that actually understands developer portfolios.", name: "Piyya Shah", role: "Tech Lead @ Linear" },
];

const stats = [
  { k: "Repos analyzed", v: "12,480+" },
  { k: "Portfolios built", v: "3,210+" },
  { k: "Dev score avg.", v: "78 / 100" },
];

// Simple animation hook
function useInView(threshold = 0.1) {
  const [ref, setRef] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold });
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return [setRef, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const fullText = "professional portfolio";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ color: "white" }}>

      {/* Hero */}
      <section className="text-center py-5" style={{ padding: "80px 8% 100px" }}>
        <FadeIn>
          <a href="#features" style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 50, padding: "6px 16px", fontSize: 12, color: "#a78bfa", textDecoration: "none", marginBottom: 32 }}>
            <span style={{ background: "#7c3aed", borderRadius: "50%", width: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>✨</span>
            New · AI portfolios for developers
            <FaArrowRight style={{ fontSize: 10 }} />
          </a>

          <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 24 }}>
            Build your <br />
            <span style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {typedText}
              <span style={{ WebkitTextFillColor: "#7c3aed", animation: "blink 1s infinite" }}>|</span>
            </span>
            <br /> with AI
          </h1>

          <p style={{ color: "#94a3b8", fontSize: 18, maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.7 }}>
            Turn your GitHub profile into a polished portfolio in minutes. Get insights, match roles, and close skill gaps — automatically.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
            <Link to="/github" style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "#7c3aed", color: "white", padding: "12px 24px", borderRadius: 12, fontWeight: 600, textDecoration: "none", fontSize: 15 }}>
              Get Started <FaArrowRight />
            </Link>
            <Link to="/preview" style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "white", padding: "12px 24px", borderRadius: 12, fontWeight: 500, textDecoration: "none", fontSize: 15, backdropFilter: "blur(10px)" }}>
              View Demo
            </Link>
          </div>

          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {["No credit card", "GitHub OAuth", "Export anywhere"].map(t => (
              <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748b" }}>
                <FaCheck style={{ color: "#10b981" }} /> {t}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Hero Card */}
        <FadeIn delay={0.2}>
          <div style={{ maxWidth: 800, margin: "60px auto 0", position: "relative" }}>
            <div style={{ position: "absolute", inset: "-30px", background: "radial-gradient(ellipse at center, rgba(124,58,237,0.2), transparent 70%)", borderRadius: "3rem", filter: "blur(20px)", zIndex: 0 }} />
            <div style={{ position: "relative", zIndex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 8, backdropFilter: "blur(20px)" }}>
              <div style={{ background: "rgba(15,23,42,0.8)", borderRadius: 18, overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#ef4444", display: "inline-block" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#f59e0b", display: "inline-block" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#10b981", display: "inline-block" }} />
                  <span style={{ marginLeft: 12, fontFamily: "monospace", fontSize: 12, color: "#64748b" }}>portfoliogenie.app/@octocat</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, padding: 24 }}>
                  {stats.map(s => (
                    <div key={s.k} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 20 }}>
                      <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em", color: "#64748b", marginBottom: 8 }}>{s.k}</div>
                      <div style={{ fontSize: 28, fontWeight: 700, background: "linear-gradient(135deg, #7c3aed, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "80px 8%" }}>
        <FadeIn>
          <div className="text-center mb-5">
            <span style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 50, padding: "4px 14px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#94a3b8", marginBottom: 16 }}>Features</span>
            <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>Everything you need to ship a portfolio</h2>
            <p style={{ color: "#94a3b8", maxWidth: 500, margin: "0 auto" }}>Built on top of your real GitHub work — no fluff, no templates that everyone else uses.</p>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.08}>
              <div style={{ background: "rgba(15,23,42,0.7)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 28, transition: "transform 0.2s, border-color 0.2s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                <div style={{ width: 44, height: 44, background: "linear-gradient(135deg, #7c3aed, #06b6d4)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontSize: 20 }}>
                  <f.icon />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Templates */}
      <section id="templates" style={{ padding: "80px 8%" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 12 }}>
            <div>
              <span style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 50, padding: "4px 14px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#94a3b8", marginBottom: 12 }}>Templates</span>
              <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 8 }}>Pick a starting point</h2>
              <p style={{ color: "#94a3b8" }}>Hand-crafted, fully responsive.</p>
            </div>
            <Link to="/builder" style={{ color: "#7c3aed", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Browse all →</Link>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {templates.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", transition: "transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ height: 140, background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.15)", padding: 16, backdropFilter: "blur(10px)", minWidth: 120 }}>
                    <div style={{ height: 6, width: "60%", borderRadius: 50, background: "rgba(255,255,255,0.4)", marginBottom: 8 }} />
                    <div style={{ height: 4, width: "80%", borderRadius: 50, background: "rgba(255,255,255,0.2)", marginBottom: 6 }} />
                    <div style={{ height: 4, width: "50%", borderRadius: 50, background: "rgba(255,255,255,0.15)" }} />
                  </div>
                </div>
                <div style={{ padding: "14px 16px", background: "#0f172a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</span>
                  <span style={{ color: "#7c3aed", fontSize: 16 }}>⚡</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "80px 8%" }}>
        <FadeIn>
          <div className="text-center mb-5">
            <span style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 50, padding: "4px 14px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "#94a3b8", marginBottom: 16 }}>Testimonials</span>
            <h2 style={{ fontSize: 36, fontWeight: 700 }}>Loved by developers</h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 28, backdropFilter: "blur(10px)" }}>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>"{t.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 38, height: 38, background: "linear-gradient(135deg, #7c3aed, #06b6d4)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                    <div style={{ color: "#64748b", fontSize: 12 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 8% 100px" }}>
        <FadeIn>
          <div style={{ position: "relative", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 28, padding: "80px 40px", textAlign: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.2), transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(124,58,237,0.5), transparent)" }} />
            <div style={{ position: "relative" }}>
              <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, marginBottom: 16 }}>
                Ship your portfolio{" "}
                <span style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>tonight</span>.
              </h2>
              <p style={{ color: "#94a3b8", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.7 }}>
                Connect GitHub, pick a template, publish. The whole flow takes less than 10 minutes.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link to="/github" style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "#7c3aed", color: "white", padding: "12px 28px", borderRadius: 12, fontWeight: 600, textDecoration: "none" }}>
                  Start free <FaArrowRight />
                </Link>
                <Link to="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "white", padding: "12px 28px", borderRadius: 12, fontWeight: 500, textDecoration: "none", backdropFilter: "blur(10px)" }}>
                  See dashboard
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}