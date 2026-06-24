import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const templates = [
  { id: "minimal", name: "Minimal", tagline: "Editorial · serif · airy whitespace" },
  { id: "modern", name: "Modern", tagline: "Glassmorphism · gradients · motion" },
  { id: "dark", name: "Developer Dark", tagline: "Terminal · monospace · neon green" },
];

function MinimalTemplate({ data }) {
  return (
    <div className="p-5" style={{ backgroundColor: "#fff", color: "#111", minHeight: 500, fontFamily: "Georgia, serif" }}>
      {data.avatar && (
        <img src={data.avatar} alt={data.name}
          className="mb-4"
          style={{ width: 96, height: 96, borderRadius: "50%", objectFit: "cover" }} />
      )}
      <h1 className="fw-bold mb-1" style={{ fontSize: 40 }}>{data.name || "Your Name"}</h1>
      <p className="mb-4" style={{ color: "#666", fontSize: 16 }}>{data.title || "Your Title"}</p>
      <p className="mb-5" style={{ color: "#444", lineHeight: 1.8, maxWidth: 600 }}>{data.bio || "Your bio goes here."}</p>

      {data.skills?.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-3" style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: 2, color: "#999" }}>Skills</h3>
          <div className="d-flex flex-wrap gap-2">
            {data.skills.map((s) => (
              <span key={s} className="px-3 py-1 rounded" style={{ border: "1px solid #ddd", fontSize: 13 }}>{s}</span>
            ))}
          </div>
        </div>
      )}

      {data.projects?.length > 0 && (
        <div>
          <h3 className="mb-3" style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: 2, color: "#999" }}>Projects</h3>
          {data.projects.slice(0, 3).map((p, i) => (
            <div key={i} className="pb-3 mb-3" style={{ borderBottom: "1px solid #eee" }}>
              <div className="fw-bold">{p.name}</div>
              <div style={{ color: "#666", fontSize: 13 }}>{p.description}</div>
              <div className="mt-1">
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer" className="text-decoration-none" style={{ color: "#7c3aed", fontSize: 13 }}>
                    View Project
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ModernTemplate({ data }) {
  return (
    <div className="p-5 text-white" style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", minHeight: 500 }}>
      <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
        {data.avatar && (
          <img src={data.avatar} alt={data.name}
            style={{ width: 96, height: 96, borderRadius: "50%", objectFit: "cover", border: "2px solid #7c3aed" }} />
        )}
        <div>
          <div className="d-inline-block rounded-pill px-3 py-1 mb-2" style={{ background: "rgba(255,255,255,0.1)", fontSize: 12 }}>
            ● Available for new projects
          </div>
          <p className="mb-1" style={{ color: "#94a3b8" }}>Hi, I'm</p>
          <h1 className="fw-bold mb-1" style={{ fontSize: 40 }}>{data.name || "Your Name"}</h1>
          <p style={{ color: "#7c3aed", fontSize: 20 }}>{data.title || "Your Title"}</p>
        </div>
      </div>

      <p className="mb-5" style={{ color: "#94a3b8", maxWidth: 500, lineHeight: 1.8 }}>{data.bio || "Your bio goes here."}</p>

      <div className="d-flex gap-3 mb-5">
        {data.email && (
          <a href={`mailto:${data.email}`} className="text-decoration-none text-white px-4 py-2 rounded-2" style={{ background: "#7c3aed", fontSize: 14 }}>
            ✉ Get in touch
          </a>
        )}
        {data.github && (
          <a href={`https://github.com/${data.github}`} target="_blank" rel="noreferrer"
            className="text-decoration-none text-white px-4 py-2 rounded-2" style={{ border: "1px solid #444", fontSize: 14 }}>
            GitHub
          </a>
        )}
      </div>

      {data.skills?.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-3" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 2, color: "#64748b" }}>Skills</h3>
          <div className="d-flex flex-wrap gap-2">
            {data.skills.map((s) => (
              <span key={s} className="px-3 py-1 rounded-2" style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", fontSize: 13 }}>{s}</span>
            ))}
          </div>
        </div>
      )}

      {data.projects?.length > 0 && (
        <div>
          <h3 className="mb-3" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 2, color: "#64748b" }}>Projects</h3>
          <div className="row g-3">
            {data.projects.slice(0, 4).map((p, i) => (
              <div key={i} className="col-6">
                <div className="p-3 rounded-3" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="fw-bold mb-1">{p.name}</div>
                  <div style={{ color: "#94a3b8", fontSize: 13 }}>{p.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DarkTemplate({ data }) {
  return (
    <div className="p-5" style={{ backgroundColor: "#0d1117", color: "#00ff41", minHeight: 500, fontFamily: "monospace" }}>
      <div className="d-flex align-items-center gap-3 mb-2">
        {data.avatar && (
          <img src={data.avatar} alt={data.name}
            className="rounded-2"
            style={{ width: 56, height: 56, objectFit: "cover", border: "1px solid #333" }} />
        )}
        <div>
          <div style={{ color: "#666" }}>$ whoami</div>
          <div className="fw-bold" style={{ fontSize: 28, color: "#00ff41" }}>{data.name || "your_name"}</div>
        </div>
      </div>

      <div className="mb-4" style={{ color: "#58a6ff" }}>{data.title || "// your title"}</div>

      <div className="mb-4">
        <div style={{ color: "#666" }}>$ cat bio.txt</div>
        <div style={{ color: "#e6edf3", lineHeight: 1.8 }}>{data.bio || "Your bio goes here."}</div>
      </div>

      {data.skills?.length > 0 && (
        <div className="mb-4">
          <div style={{ color: "#666" }}>$ ls --skills</div>
          <div style={{ color: "#00ff41" }}>{data.skills.join(" · ")}</div>
        </div>
      )}

      {data.projects?.length > 0 && (
        <div>
          <div style={{ color: "#666" }}>$ ls projects/</div>
          {data.projects.slice(0, 4).map((p, i) => (
            <div key={i} className="mb-3 ps-3" style={{ borderLeft: "2px solid #00ff41" }}>
              <div style={{ color: "#58a6ff" }}>{p.name}/</div>
              <div style={{ color: "#8b949e", fontSize: 13 }}>{p.description}</div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4" style={{ color: "#666" }}>
        {data.email && <div>$ contact --email {data.email}</div>}
        {data.github && <div>$ open github.com/{data.github}</div>}
      </div>
    </div>
  );
}

export default function Preview() {
  const navigate = useNavigate();
  const { profile, theme } = useApp();
  const [activeTemplate, setActiveTemplate] = useState(profile.template || "modern");

  const isDark = theme === "dark";
  const bg = isDark ? "#0d1117" : "#f8f9fa";
  const cardColor = isDark ? "white" : "#111";
  const mutedColor = isDark ? "#94a3b8" : "#6c757d";
  const borderColor = isDark ? "#333" : "#dee2e6";
  const templateCardBg = isDark ? "#1a1a2e" : "#ffffff";

  const data = {
    name: profile.name || "",
    title: profile.title || "",
    bio: profile.bio || "",
    skills: profile.skills ? profile.skills.split(",").map((s) => s.trim()).filter(Boolean) : [],
    email: profile.email || "",
    github: profile.github || "",
    avatar: profile.avatar || null,
    projects: profile.builderProjects || [],
  };

  return (
    <div style={{ backgroundColor: bg, minHeight: "100vh", color: cardColor }}>
      <div className="container py-4">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <div className="small text-uppercase mb-1" style={{ letterSpacing: 2, color: mutedColor }}>
              Live preview · auto-updates
            </div>
            <h4 className="fw-bold mb-0">Your portfolio</h4>
          </div>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate("/builder")}>
            Edit content →
          </button>
        </div>

        {/* Template Switcher */}
        <div className="row g-3 mb-4">
          {templates.map((t) => (
            <div className="col-12 col-md-4" key={t.id}>
              <div onClick={() => setActiveTemplate(t.id)}
                className="rounded-3 overflow-hidden"
                style={{ border: `2px solid ${activeTemplate === t.id ? "#7c3aed" : borderColor}`, cursor: "pointer", backgroundColor: templateCardBg }}>
                <div className="d-flex align-items-center justify-content-center"
                  style={{ height: 100, backgroundColor: t.id === "dark" ? "#0d1117" : t.id === "modern" ? "#0f2027" : "#f8f9fa" }}>
                  {t.id === "minimal" && (
                    <div className="text-center" style={{ color: "#333" }}>
                      <div className="fw-bold">{data.name || "Your Name"}</div>
                      <div className="small" style={{ color: "#666" }}>{data.title || "Title"}</div>
                    </div>
                  )}
                  {t.id === "modern" && (
                    <div className="text-center text-white">
                      <div className="fw-bold">{data.name || "Your Name"}</div>
                      <div className="small" style={{ color: "#7c3aed" }}>{data.title || "Title"}</div>
                    </div>
                  )}
                  {t.id === "dark" && (
                    <div style={{ color: "#00ff41", fontFamily: "monospace", fontSize: 11 }}>
                      $ whoami → {data.name || "name"}
                    </div>
                  )}
                </div>
                <div className="p-2 d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-semibold small" style={{ color: cardColor }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: mutedColor }}>{t.tagline}</div>
                  </div>
                  {activeTemplate === t.id && (
                    <span className="badge" style={{ backgroundColor: "#7c3aed" }}>Active</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Browser Frame */}
        <div className="rounded-3 overflow-hidden" style={{ border: `1px solid ${borderColor}` }}>
          <div className="d-flex align-items-center gap-2 px-3 py-2"
            style={{ backgroundColor: isDark ? "#1a1a2e" : "#e2e8f0", borderBottom: `1px solid ${borderColor}` }}>
            <span className="rounded-circle d-inline-block" style={{ width: 10, height: 10, backgroundColor: "#ef4444" }} />
            <span className="rounded-circle d-inline-block" style={{ width: 10, height: 10, backgroundColor: "#f59e0b" }} />
            <span className="rounded-circle d-inline-block" style={{ width: 10, height: 10, backgroundColor: "#10b981" }} />
            <span className="ms-3 small" style={{ color: mutedColor, fontFamily: "monospace" }}>
              portfoliogenie.app/@{data.github || "username"} · {templates.find((t) => t.id === activeTemplate)?.name}
            </span>
            <div className="ms-auto d-flex gap-3">
              {data.email && (
                <a href={`mailto:${data.email}`} className="text-decoration-none small" style={{ color: mutedColor }}>✉ Email</a>
              )}
              {data.github && (
                <a href={`https://github.com/${data.github}`} target="_blank" rel="noreferrer"
                  className="text-decoration-none small" style={{ color: mutedColor }}>GitHub</a>
              )}
            </div>
          </div>

          {activeTemplate === "minimal" && <MinimalTemplate data={data} />}
          {activeTemplate === "modern" && <ModernTemplate data={data} />}
          {activeTemplate === "dark" && <DarkTemplate data={data} />}
        </div>

      </div>
    </div>
  );
}