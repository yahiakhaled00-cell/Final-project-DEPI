import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const templates = [
  { id: "minimal", name: "Minimal", tagline: "Editorial · serif · airy whitespace" },
  { id: "modern", name: "Modern", tagline: "Glassmorphism · gradients · motion" },
  { id: "dark", name: "Developer Dark", tagline: "Terminal · monospace · neon green" },
];

const sections = [
  { id: "template", label: "Template", icon: "🖼" },
  { id: "about", label: "About", icon: "👤" },
  { id: "skills", label: "Skills", icon: "🔧" },
  { id: "projects", label: "Projects", icon: "📁" },
  { id: "contact", label: "Contact", icon: "✉️" },
  { id: "theme", label: "Theme", icon: "🎨" },
];

const accents = [
  { id: "violet", color: "#7c3aed" },
  { id: "cyan", color: "#06b6d4" },
  { id: "emerald", color: "#10b981" },
  { id: "amber", color: "#f59e0b" },
  { id: "rose", color: "#f43f5e" },
];

export default function Builder() {
  const navigate = useNavigate();
  const { profile, setProfile, theme } = useApp();
  const [active, setActive] = useState("template");

  const isDark = theme === "dark";
  const bg = isDark ? "#0d1117" : "#f8f9fa";
  const cardBg = isDark ? "#1a1a2e" : "#ffffff";
  const cardColor = isDark ? "white" : "#111";
  const mutedColor = isDark ? "#94a3b8" : "#6c757d";
  const borderColor = isDark ? "#333" : "#dee2e6";
  const inputBg = isDark ? "#0f172a" : "#ffffff";

  const inputStyle = {
    borderRadius: 8,
    backgroundColor: inputBg,
    color: cardColor,
    border: `1px solid ${borderColor}`,
  };

  const portfolio = {
    name: profile.name || "",
    title: profile.title || "",
    bio: profile.bio || "",
    skills: profile.skills ? profile.skills.split(",").map((s) => s.trim()).filter(Boolean) : [],
    email: profile.email || "",
    github: profile.github || "",
    phone: profile.phone || "",
    linkedin: profile.linkedin || "",
    avatar: profile.avatar || null,
    template: profile.template || "minimal",
    accent: profile.accent || "violet",
    projects: profile.builderProjects || [],
  };

  const update = (key, value) => setProfile({ ...profile, [key]: value });

  const updateProject = (i, field, value) => {
    const next = [...portfolio.projects];
    next[i] = { ...next[i], [field]: value };
    update("builderProjects", next);
  };

  const addProject = () => update("builderProjects", [...portfolio.projects, { name: "", description: "", title: "", link: "" }]);
  const removeProject = (i) => update("builderProjects", portfolio.projects.filter((_, idx) => idx !== i));

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => update("avatar", reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ backgroundColor: bg, minHeight: "100vh", color: cardColor }}>
      <div className="container py-4">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 className="fw-bold mb-1">Portfolio builder</h4>
            <p className="small mb-0" style={{ color: mutedColor }}>Edits sync instantly to your live preview.</p>
          </div>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate("/preview")}>
            👁 Open preview
          </button>
        </div>

        <div className="row g-3">
          {/* Sidebar */}
          <div className="col-12 col-lg-auto">
            <div className="card p-2" style={{ borderRadius: 16, backgroundColor: cardBg, minWidth: 200, border: `1px solid ${borderColor}` }}>
              {sections.map((s) => (
                <button key={s.id} onClick={() => setActive(s.id)}
                  className="btn btn-sm w-100 text-start mb-1 d-flex align-items-center gap-2"
                  style={{ backgroundColor: active === s.id ? "#7c3aed" : "transparent", color: active === s.id ? "white" : mutedColor, borderRadius: 10 }}>
                  <span>{s.icon}</span> {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="col">
            <div className="card p-4" style={{ borderRadius: 16, backgroundColor: cardBg, color: cardColor, minHeight: 400, border: `1px solid ${borderColor}` }}>

              {/* Template */}
              {active === "template" && (
                <div>
                  <p className="small mb-3" style={{ color: mutedColor }}>Pick a template — changes apply instantly to your live preview.</p>
                  <div className="row g-3">
                    {templates.map((t) => (
                      <div className="col-12 col-md-4" key={t.id}>
                        <div onClick={() => update("template", t.id)}
                          className="rounded-3 overflow-hidden"
                          style={{ border: `2px solid ${portfolio.template === t.id ? "#7c3aed" : borderColor}`, cursor: "pointer" }}>
                          <div className="d-flex align-items-center justify-content-center p-3"
                            style={{ height: 140, backgroundColor: t.id === "dark" ? "#0d1117" : t.id === "modern" ? "#0f2027" : "#f8f9fa" }}>
                            {t.id === "minimal" && (
                              <div className="text-center" style={{ color: "#333" }}>
                                <div className="fw-bold" style={{ fontSize: 16 }}>{portfolio.name || "Your Name"}</div>
                                <div className="small" style={{ color: "#666" }}>{portfolio.title || "Your Title"}</div>
                              </div>
                            )}
                            {t.id === "modern" && (
                              <div className="text-center text-white">
                                <div className="fw-bold" style={{ fontSize: 16 }}>{portfolio.name || "Your Name"}</div>
                                <div className="small" style={{ color: "#94a3b8" }}>{portfolio.title || "Your Title"}</div>
                              </div>
                            )}
                            {t.id === "dark" && (
                              <div style={{ color: "#00ff41", fontFamily: "monospace", fontSize: 12 }}>
                                <div>$ whoami</div>
                                <div>{portfolio.name || "Your Name"}</div>
                                <div>$ ls --skills</div>
                                <div>{portfolio.skills.slice(0, 3).join(" · ") || "your skills"}</div>
                              </div>
                            )}
                          </div>
                          <div className="p-2 d-flex justify-content-between align-items-center" style={{ backgroundColor: cardBg }}>
                            <div>
                              <div className="fw-semibold small">{t.name}</div>
                              <div style={{ fontSize: 11, color: mutedColor }}>{t.tagline}</div>
                            </div>
                            {portfolio.template === t.id && (
                              <span className="badge" style={{ backgroundColor: "#7c3aed" }}>✓</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* About */}
              {active === "about" && (
                <div>
                  <label className="form-label small text-uppercase" style={{ color: mutedColor, fontSize: 11 }}>Profile Photo</label>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", backgroundColor: "#7c3aed" }}>
                      {portfolio.avatar
                        ? <img src={portfolio.avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        : <span className="text-white" style={{ fontSize: 22 }}>{portfolio.name ? portfolio.name[0].toUpperCase() : "?"}</span>
                      }
                    </div>
                    <label className="btn btn-sm btn-outline-secondary mb-0" style={{ cursor: "pointer" }}>
                      Upload image
                      <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
                    </label>
                    {portfolio.avatar && (
                      <button className="btn btn-sm" onClick={() => update("avatar", null)}
                        style={{ background: "#ff4d4d11", color: "#ff4d4d", border: "1px solid #ff4d4d44" }}>
                        ✕ Remove
                      </button>
                    )}
                  </div>

                  <label className="form-label small text-uppercase" style={{ color: mutedColor, fontSize: 11 }}>Name</label>
                  <input className="form-control mb-3" placeholder="e.g. Ahmed Mohamed" style={inputStyle}
                    value={portfolio.name} onChange={(e) => update("name", e.target.value)} />

                  <label className="form-label small text-uppercase" style={{ color: mutedColor, fontSize: 11 }}>Title</label>
                  <input className="form-control mb-3" placeholder="e.g. Full Stack Developer" style={inputStyle}
                    value={portfolio.title} onChange={(e) => update("title", e.target.value)} />

                  <label className="form-label small text-uppercase" style={{ color: mutedColor, fontSize: 11 }}>Bio</label>
                  <textarea className="form-control" rows={5} placeholder="Write a short bio about yourself..." style={inputStyle}
                    value={portfolio.bio} onChange={(e) => update("bio", e.target.value)} />
                </div>
              )}

              {/* Skills */}
              {active === "skills" && (
                <div>
                  <label className="form-label small text-uppercase" style={{ color: mutedColor, fontSize: 11 }}>Skills (comma separated)</label>
                  <input className="form-control mb-3" placeholder="React, Node.js, Python..." style={inputStyle}
                    value={portfolio.skills.join(", ")} onChange={(e) => update("skills", e.target.value)} />
                  <div className="d-flex flex-wrap gap-2">
                    {portfolio.skills.map((s) => (
                      <span key={s} className="badge px-3 py-2 rounded-3"
                        style={{ backgroundColor: isDark ? "#1e293b" : "#e2e8f0", color: isDark ? "#e2e8f0" : "#374151" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {active === "projects" && (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="small" style={{ color: mutedColor }}>Your projects</span>
                    <button className="btn btn-sm btn-outline-secondary" onClick={addProject}>+ Add Project</button>
                  </div>
                  {portfolio.projects.length === 0 && (
                    <p className="small" style={{ color: mutedColor }}>No projects yet. Click "+ Add Project" to add one.</p>
                  )}
                  {portfolio.projects.map((p, i) => (
                    <div key={i} className="p-3 mb-3 rounded-3" style={{ border: `1px solid ${borderColor}` }}>
                      <label className="form-label small text-uppercase" style={{ color: mutedColor, fontSize: 11 }}>Project Name</label>
                      <input className="form-control mb-2" placeholder="e.g. Portfolio Website" style={inputStyle}
                        value={p.name} onChange={(e) => updateProject(i, "name", e.target.value)} />

                      <label className="form-label small text-uppercase" style={{ color: mutedColor, fontSize: 11 }}>Project Title</label>
                      <input className="form-control mb-2" placeholder="e.g. My Portfolio" style={inputStyle}
                        value={p.title || ""} onChange={(e) => updateProject(i, "title", e.target.value)} />

                      <label className="form-label small text-uppercase" style={{ color: mutedColor, fontSize: 11 }}>Description</label>
                      <textarea className="form-control mb-2" rows={2} placeholder="What does this project do?" style={inputStyle}
                        value={p.description} onChange={(e) => updateProject(i, "description", e.target.value)} />

                      <label className="form-label small text-uppercase" style={{ color: mutedColor, fontSize: 11 }}>Project Link</label>
                      <input className="form-control mb-2" placeholder="https://github.com/..." style={inputStyle}
                        value={p.link || ""} onChange={(e) => updateProject(i, "link", e.target.value)} />

                      <div className="text-end">
                        <button className="btn btn-sm btn-outline-danger" onClick={() => removeProject(i)}>🗑 Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Contact */}
              {active === "contact" && (
                <div>
                  <label className="form-label small text-uppercase" style={{ color: mutedColor, fontSize: 11 }}>Email</label>
                  <input className="form-control mb-3" placeholder="you@example.com" style={inputStyle}
                    value={portfolio.email} onChange={(e) => update("email", e.target.value)} />

                  <label className="form-label small text-uppercase" style={{ color: mutedColor, fontSize: 11 }}>GitHub</label>
                  <input className="form-control mb-3" placeholder="e.g. ahmeddev" style={inputStyle}
                    value={portfolio.github} onChange={(e) => update("github", e.target.value)} />

                  <label className="form-label small text-uppercase" style={{ color: mutedColor, fontSize: 11 }}>Phone Number</label>
                  <input className="form-control mb-3" placeholder="+20 1XX XXX XXXX" style={inputStyle}
                    value={portfolio.phone} onChange={(e) => update("phone", e.target.value)} />

                  <label className="form-label small text-uppercase" style={{ color: mutedColor, fontSize: 11 }}>LinkedIn</label>
                  <input className="form-control" placeholder="https://linkedin.com/in/..." style={inputStyle}
                    value={portfolio.linkedin} onChange={(e) => update("linkedin", e.target.value)} />
                </div>
              )}

              {/* Theme */}
              {active === "theme" && (
                <div>
                  <div className="small mb-2" style={{ color: mutedColor }}>Accent color</div>
                  <div className="d-flex gap-2">
                    {accents.map((a) => (
                      <button key={a.id} onClick={() => update("accent", a.id)}
                        className="rounded-3 border-0"
                        style={{ width: 40, height: 40, backgroundColor: a.color, border: `2px solid ${portfolio.accent === a.id ? "white" : "transparent"}`, cursor: "pointer" }} />
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
