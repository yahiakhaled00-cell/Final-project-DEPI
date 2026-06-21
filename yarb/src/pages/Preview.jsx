import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const FONT_MAP = {
  sans: "'Inter', sans-serif",
  serif: "Georgia, serif",
  mono: "'Courier New', monospace",
};

export default function Preview() {
  const { portfolioData } = useApp();
  const navigate = useNavigate();
  const { template, about, skills, projects, contact, theme: portfolioTheme } = portfolioData;
const profileImage = about.image;

  return (
    <div style={{ minHeight: "100vh", background: "#000" }}>
      {/* Top bar */}
      <div className="d-flex align-items-center justify-content-between px-4 py-2"
        style={{ background: "#111", borderBottom: "1px solid #222" }}>
        <div className="d-flex gap-3">
          {["Minimal", "Modern", "Developer Dark"].map((t, i) => (
            <span key={i} className="text-secondary" style={{ fontSize: "13px", cursor: "pointer" }}
              onClick={() => navigate("/builder")}>
              {t}
            </span>
          ))}
        </div>
        <button onClick={() => navigate("/builder")} className="btn btn-sm text-secondary"
          style={{ fontSize: "12px" }}>
          ← Back to Builder
        </button>
      </div>

      {/* Preview Frame */}
      <div className="mx-auto" style={{ maxWidth: "800px", padding: "32px 16px" }}>
        {template === "minimal" && <MinimalTemplate about={about} skills={skills} projects={projects} contact={contact} theme={portfolioTheme} profileImage={profileImage} />}
        {template === "modern" && <ModernTemplate about={about} skills={skills} projects={projects} contact={contact} theme={portfolioTheme} profileImage={profileImage} />}
        {template === "dark" && <DarkTemplate about={about} skills={skills} projects={projects} contact={contact} theme={portfolioTheme} profileImage={profileImage} />}
      </div>
    </div>
  );
}

// ─── Minimal Template ───────────────────────────────────────────
function MinimalTemplate({ about, skills, projects, contact, theme, profileImage }) {
  const isDark = theme?.darkMode;
  const primary = theme?.primaryColor || "#6c63ff";
  const fontFamily = FONT_MAP[theme?.fontStyle] || "Georgia, serif";

  // primaryColor → background, darkMode → text color
  const bg = primary;
  const textPrimary = isDark ? "#f2f2f2" : "#1a1a1a";
  const textSecondary = isDark ? "#ddd" : "#444";
  const textBody = isDark ? "#ccc" : "#333";
  const borderColor = isDark ? "#ffffff33" : "#00000022";

  return (
    <div style={{ background: bg, minHeight: "100vh", padding: "48px 64px", fontFamily }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <span style={{ fontSize: "13px", letterSpacing: "2px", color: textSecondary }}>
          {about.name ? about.name[0] + "." : "Y."}
        </span>
        <span style={{ fontSize: "11px", letterSpacing: "3px", color: textSecondary }}>PORTFOLIO · 2026</span>
      </div>
      <hr style={{ borderColor, marginBottom: "40px" }} />

      {/* About */}
      {profileImage && (
        <img src={profileImage} alt={about.name || "Profile"}
          style={{ width: "96px", height: "96px", borderRadius: "50%", objectFit: "cover", marginBottom: "24px", border: `2px solid ${borderColor}` }} />
      )}
      <h1 style={{ fontSize: "52px", fontWeight: 400, marginBottom: "8px", color: textPrimary }}>
        {about.name || "Your Name"}
      </h1>
      <p style={{ fontStyle: "italic", color: textSecondary, marginBottom: "16px", fontSize: "16px" }}>
        {about.title || "Your Title"}
      </p>
      <p style={{ color: textBody, marginBottom: "24px", lineHeight: 1.7, fontSize: "15px", wordBreak: "break-word", whiteSpace: "pre-wrap" }}>
        {about.bio || "Your bio goes here."}
      </p>
      {contact.email && (
        <a href={`mailto:${contact.email}`}
          style={{ color: textPrimary, fontSize: "14px", textDecoration: "underline" }}>
          {contact.email}
        </a>
      )}

      <hr style={{ borderColor, margin: "40px 0" }} />

      {/* Projects */}
      {projects.filter(p => p.name).length > 0 && (
        <div className="mb-5">
          <p style={{ fontSize: "11px", letterSpacing: "3px", color: textSecondary, marginBottom: "24px" }}>SELECTED WORK</p>
          {projects.filter(p => p.name).map((p, i) => (
            <div key={i} className="d-flex align-items-baseline gap-4 mb-3">
              <span style={{ fontSize: "12px", color: textPrimary, fontStyle: "italic", flexShrink: 0 }}>0{i + 1}</span>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: "20px", fontWeight: 400, marginBottom: "4px", color: textPrimary }}>{p.name}</p>
                {p.description && <p style={{ fontSize: "13px", color: textSecondary, wordBreak: "break-word", whiteSpace: "pre-wrap" }}>{p.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      <hr style={{ borderColor, margin: "40px 0" }} />

      {/* Skills */}
      {skills.filter(s => s).length > 0 && (
        <div>
          <p style={{ fontSize: "11px", letterSpacing: "3px", color: textSecondary, marginBottom: "16px" }}>SKILLS</p>
          <div className="d-flex flex-wrap gap-3">
            {skills.filter(s => s).map((s, i) => (
              <span key={i} style={{ fontSize: "14px", color: textBody }}>{s}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Modern Template ─────────────────────────────────────────────
function ModernTemplate({ about, skills, projects, contact, theme, profileImage }) {
  const isDark = theme?.darkMode ?? true;
  const primary = theme?.primaryColor || "#6c63ff";
  const fontFamily = FONT_MAP[theme?.fontStyle] || "Inter, sans-serif";

  // primaryColor → background gradient base, darkMode → text
 const bg = primary;
  const textPrimary = isDark ? "#fff" : "#1a1a2e";
  const textSecondary = isDark ? "#aaa" : "#666";
  const textBody = isDark ? "#bbb" : "#555";
  const borderColor = isDark ? "#ffffff22" : "#00000014";
  const cardBg = isDark ? "#ffffff0d" : "#00000007";
  const cardBorder = isDark ? "#ffffff15" : "#00000012";
  const badgeBg = isDark ? "#ffffff11" : "#00000008";
  const badgeBorder = isDark ? "#ffffff22" : "#00000018";

  return (
    <div style={{ background: bg, minHeight: "100vh", padding: "48px 48px", color: textPrimary, fontFamily }}>
      {/* Hero */}
      <div className="mb-5 d-flex align-items-center gap-4 flex-wrap" style={{ paddingBottom: "48px", borderBottom: `1px solid ${borderColor}` }}>
        {profileImage && (
          <img src={profileImage} alt={about.name || "Profile"}
            style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", border: `2px solid ${primary}`, flexShrink: 0 }} />
        )}
        <div style={{ minWidth: 0 }}>
          <div className="d-flex align-items-center gap-2 mb-3">
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }}></span>
            <span style={{ fontSize: "13px", color: textSecondary }}>Available for new projects</span>
          </div>
          <p style={{ fontSize: "14px", color: textSecondary, marginBottom: "8px" }}>Hi, I'm</p>
          <h1 style={{ fontSize: "52px", fontWeight: 700, marginBottom: "8px", color: textPrimary }}>
            {about.name || "Your Name"}
          </h1>
          <p style={{ fontSize: "18px", color: primary, marginBottom: "16px" }}>
            {about.title || "Your Title"}
          </p>
          <p style={{ color: textBody, lineHeight: 1.7, marginBottom: "24px", wordBreak: "break-word", whiteSpace: "pre-wrap" }}>
            {about.bio || "Your bio goes here."}
          </p>
          {contact.email && (
            <a href={`mailto:${contact.email}`}
              className="btn px-4 py-2"
              style={{ background: primary, color: "#fff", borderRadius: "24px", fontSize: "14px", textDecoration: "none" }}>
              ✉ Get in touch
            </a>
          )}
        </div>
      </div>

      {/* Skills */}
      {skills.filter(s => s).length > 0 && (
        <div className="mb-5">
          <p style={{ fontSize: "11px", letterSpacing: "3px", color: textSecondary, marginBottom: "16px" }}>SKILLS</p>
          <div className="d-flex flex-wrap gap-2">
            {skills.filter(s => s).map((s, i) => (
              <span key={i} className="px-3 py-1"
                style={{ background: badgeBg, border: `1px solid ${badgeBorder}`, borderRadius: "20px", fontSize: "13px", color: textBody }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.filter(p => p.name).length > 0 && (
        <div className="mb-5">
          <p style={{ fontSize: "11px", letterSpacing: "3px", color: textSecondary, marginBottom: "16px" }}>PROJECTS</p>
          <div className="d-flex flex-column gap-3">
            {projects.filter(p => p.name).map((p, i) => (
              <div key={i} className="d-flex justify-content-between align-items-start p-3"
                style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "12px" }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p style={{ fontWeight: 600, marginBottom: "4px", color: textPrimary }}>{p.name}</p>
                  {p.description && <p style={{ fontSize: "13px", color: textSecondary, marginBottom: 0, wordBreak: "break-word", whiteSpace: "pre-wrap" }}>{p.description}</p>}
                  {p.tech && <p style={{ fontSize: "12px", color: primary, marginBottom: 0, marginTop: "4px" }}>{p.tech}</p>}
                </div>
                {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ color: textSecondary, fontSize: "18px", textDecoration: "none", flexShrink: 0, marginLeft: "12px" }}>↗</a>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact */}
      {(contact.email || contact.phone || contact.location) && (
        <div>
          <p style={{ fontSize: "11px", letterSpacing: "3px", color: textSecondary, marginBottom: "16px" }}>CONTACT</p>
          <div className="d-flex flex-column gap-2">
            {contact.email && <p style={{ color: textBody, marginBottom: 0, fontSize: "14px" }}>✉ {contact.email}</p>}
            {contact.phone && <p style={{ color: textBody, marginBottom: 0, fontSize: "14px" }}>📞 {contact.phone}</p>}
            {contact.location && <p style={{ color: textBody, marginBottom: 0, fontSize: "14px" }}>📍 {contact.location}</p>}
            {contact.github && <p style={{ color: textBody, marginBottom: 0, fontSize: "14px" }}>GitHub: {contact.github}</p>}
            {contact.linkedin && <p style={{ color: textBody, marginBottom: 0, fontSize: "14px" }}>LinkedIn: {contact.linkedin}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Developer Dark Template ─────────────────────────────────────
function DarkTemplate({ about, skills, projects, contact, theme, profileImage }) {
  const isDark = theme?.darkMode ?? true;
  const primary = theme?.primaryColor || "#39ff14";
  const fontFamily = FONT_MAP[theme?.fontStyle] || "monospace";

  // primaryColor → accent color, darkMode → page background
  const pageBg = primary;
  const boxBg = isDark ? "#161b22" : "#ffffff";
  const boxBorder = isDark ? "#30363d" : "#d0d7de";
  const textPrimary = isDark ? "#c9d1d9" : "#24292f";
  const textSecondary = isDark ? "#888" : "#6e7781";
  const promptText = isDark ? "#fff" : "#24292f";

  return (
    <div style={{ background: pageBg, minHeight: "100vh", padding: "48px", fontFamily, color: textPrimary }}>

      {/* Terminal Box */}
      <div style={{ background: boxBg, border: `1px solid ${boxBorder}`, borderRadius: "12px", padding: "24px", marginBottom: "32px" }}>
        <div className="d-flex align-items-center gap-2 mb-4">
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f57", display: "inline-block" }}></span>
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }}></span>
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#28c840", display: "inline-block" }}></span>
          <span style={{ marginLeft: "12px", fontSize: "12px", color: textSecondary }}>~/{about.name?.toLowerCase().replace(" ", "") || "you"} — zsh</span>
        </div>

        <div style={{ fontSize: "14px", lineHeight: 2 }}>
          <p style={{ marginBottom: 0 }}>
            <span style={{ color: primary }}>you@portfolio</span>
            <span style={{ color: promptText }}>:~$ </span>
            <span>whoami</span>
          </p>
          <div className="d-flex align-items-center gap-3">
            {profileImage && (
              <img src={profileImage} alt={about.name || "Profile"}
                style={{ width: "48px", height: "48px", borderRadius: "6px", objectFit: "cover", border: `1px solid ${boxBorder}` }} />
            )}
            <p style={{ marginBottom: 0, color: promptText }}>
              {about.name || "Your Name"}
              {about.title && <span style={{ color: textSecondary }}> — {about.title}</span>}
            </p>
          </div>
          {about.bio && <>
            <p style={{ marginBottom: 0 }}>
              <span style={{ color: primary }}>you@portfolio</span>
              <span style={{ color: promptText }}>:~$ </span>
              <span>cat about.md</span>
            </p>
            <p style={{ marginBottom: 0, color: promptText, wordBreak: "break-word", whiteSpace: "pre-wrap" }}>{about.bio}</p>
          </>}
          {skills.filter(s => s).length > 0 && <>
            <p style={{ marginBottom: 0 }}>
              <span style={{ color: primary }}>you@portfolio</span>
              <span style={{ color: promptText }}>:~$ </span>
              <span>ls --skills</span>
            </p>
            <p style={{ marginBottom: 0, color: primary }}>{skills.filter(s => s).join("  ")}</p>
          </>}
          <p style={{ marginBottom: 0 }}>
            <span style={{ color: primary }}>you@portfolio</span>
            <span style={{ color: promptText }}>:~$ </span>
            <span style={{ borderRight: `2px solid ${primary}`, paddingRight: "2px" }}></span>
          </p>
        </div>
      </div>

      {/* Projects */}
      {projects.filter(p => p.name).length > 0 && (
        <div className="mb-4">
          <p style={{ color: primary, fontSize: "13px", marginBottom: "16px" }}>{">"} ./PROJECTS</p>
          <div className="d-flex flex-column gap-2">
            {projects.filter(p => p.name).map((p, i) => (
              <div key={i} className="d-flex justify-content-between align-items-start px-3 py-2"
                style={{ background: boxBg, border: `1px solid ${boxBorder}`, borderRadius: "8px" }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <span style={{ color: primary }}>{about.name?.split(" ")[0]?.toLowerCase() || "you"}/</span>
                  <span style={{ color: promptText }}>{p.name}</span>
                  {p.tech && <span style={{ color: textSecondary, fontSize: "12px", marginLeft: "12px" }}>{p.tech}</span>}
                  {p.description && <p style={{ color: textSecondary, fontSize: "12px", marginBottom: 0, marginTop: "4px", wordBreak: "break-word", whiteSpace: "pre-wrap" }}>{p.description}</p>}
                </div>
                {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ color: textSecondary, textDecoration: "none", flexShrink: 0, marginLeft: "12px" }}>★</a>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact */}
      {(contact.email || contact.github) && (
        <div style={{ background: boxBg, border: `1px solid ${boxBorder}`, borderRadius: "8px", padding: "16px" }}>
          <p style={{ color: textSecondary, fontSize: "12px", marginBottom: "12px" }}>./CONTACT</p>
          {contact.email && <p style={{ color: textPrimary, fontSize: "14px", marginBottom: "4px" }}>
            email = <span style={{ color: primary }}>"{contact.email}"</span>
          </p>}
          {contact.github && <p style={{ color: textPrimary, fontSize: "14px", marginBottom: "4px" }}>
            github = <span style={{ color: primary }}>"{contact.github}"</span>
          </p>}
          {contact.linkedin && <p style={{ color: textPrimary, fontSize: "14px", marginBottom: 0 }}>
            linkedin = <span style={{ color: primary }}>"{contact.linkedin}"</span>
          </p>}
        </div>
      )}
    </div>
  );
}
