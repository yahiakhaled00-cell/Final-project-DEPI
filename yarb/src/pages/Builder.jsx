import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const sections = ["Template", "About", "Skills", "Projects", "Contact", "Theme"];

const templates = [
  { id: "minimal", name: "Minimal", desc: "Editorial · serif · airy whitespace" },
  { id: "modern", name: "Modern", desc: "Glassmorphism · gradients · motion" },
  { id: "dark", name: "Developer Dark", desc: "Terminal · monospace · neon green" },
];

export default function Builder() {
  const navigate = useNavigate();
  const { portfolioData, setPortfolioData } = useApp();

  const [activeSection, setActiveSection] = useState("Template");

  // shortcut helpers
  const about = portfolioData.about;
  const skills = portfolioData.skills.length ? portfolioData.skills : [""];
  const projects = portfolioData.projects.length ? portfolioData.projects : [{ name: "", description: "", link: "", tech: "" }];
  const contact = portfolioData.contact;
  const theme = portfolioData.theme;
  const selectedTemplate = portfolioData.template;

  const update = (key, value) => setPortfolioData(prev => ({ ...prev, [key]: value }));

  const addSkill = () => update("skills", [...skills, ""]);
  const updateSkill = (i, val) => update("skills", skills.map((s, idx) => (idx === i ? val : s)));
  const removeSkill = (i) => update("skills", skills.filter((_, idx) => idx !== i));

  const addProject = () => update("projects", [...projects, { name: "", description: "", link: "", tech: "" }]);
  const updateProject = (i, field, val) =>
    update("projects", projects.map((p, idx) => (idx === i ? { ...p, [field]: val } : p)));
  const removeProject = (i) => update("projects", projects.filter((_, idx) => idx !== i));

  // image upload handler (base64 in state)
  const handleAboutImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      update("about", { ...about, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const removeAboutImage = () => update("about", { ...about, image: "" });

  return (
    <div className="d-flex" style={{ minHeight: "80vh" }}>

      {/* Sidebar */}
      <div className="d-flex flex-column gap-1 py-4 flex-shrink-0"
        style={{ width: "200px", background: "#1a1a2e" }}>
        {sections.map((s) => (
          <button key={s} onClick={() => setActiveSection(s)}
            className="btn border-0 text-start px-4 py-2"
            style={{
              background: activeSection === s ? "#6c63ff22" : "transparent",
              color: activeSection === s ? "#6c63ff" : "#aaa",
              fontWeight: activeSection === s ? 600 : 400,
              borderLeft: activeSection === s ? "3px solid #6c63ff" : "3px solid transparent",
              borderRadius: 0,
              transition: "all 0.2s",
              fontSize: "14px"
            }}>
            {s}
          </button>
        ))}

        {/* Open Preview Button */}
        <div className="mt-auto px-3 pt-4">
          <button onClick={() => navigate("/preview")}
            className="btn w-100 fw-semibold text-white"
            style={{ background: "#6c63ff", fontSize: "13px" }}>
            Open Preview ↗
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow-1 p-4 overflow-auto" style={{ background: "#f8f9ff" }}>

        {/* Template */}
        {activeSection === "Template" && (
          <div>
            <h2 className="fw-bold mb-1" style={{ fontSize: "22px", color: "#1a1a2e" }}>Pick a template</h2>
            <p className="text-secondary mb-4">Changes apply instantly to your live preview.</p>
            <div className="d-flex flex-wrap gap-3">
              {templates.map((t) => (
                <div key={t.id} onClick={() => update("template", t.id)}
                  className="p-3 rounded-3 bg-white"
                  style={{
                    width: "180px", cursor: "pointer",
                    border: selectedTemplate === t.id ? "2px solid #6c63ff" : "2px solid #ddd",
                    boxShadow: selectedTemplate === t.id ? "0 0 0 4px #6c63ff22" : "none",
                    transition: "all 0.2s"
                  }}>
                  <div className="rounded-3 mb-3 d-flex align-items-center justify-content-center fw-semibold"
                    style={{
                      height: "100px", fontSize: "12px",
                      background: t.id === "minimal" ? "#f5f5f5" : t.id === "modern" ? "linear-gradient(135deg,#0f0c29,#302b63)" : "#0d1117",
                      color: t.id === "minimal" ? "#333" : "#fff",
                    }}>
                    {t.id === "dark"
                      ? <span style={{ color: "#39ff14", fontFamily: "monospace" }}>{"$ npm start"}</span>
                      : "Your Name"}
                  </div>
                  <div className="fw-semibold" style={{ fontSize: "14px" }}>{t.name}</div>
                  <div className="text-secondary mt-1" style={{ fontSize: "11px" }}>{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About */}
        {activeSection === "About" && (
          <div>
            <h2 className="fw-bold mb-3" style={{ fontSize: "22px", color: "#1a1a2e" }}>About You</h2>
            <div className="bg-white rounded-3 p-4 shadow-sm">
              <label className="form-label fw-semibold text-secondary small">Full Name</label>
              <input className="form-control mb-3" placeholder="e.g. Ahmed Mohamed"
                value={about.name} onChange={(e) => update("about", { ...about, name: e.target.value })} />

              <label className="form-label fw-semibold text-secondary small">Title / Role</label>
              <input className="form-control mb-3" placeholder="e.g. Full Stack Developer"
                value={about.title} onChange={(e) => update("about", { ...about, title: e.target.value })} />

              <label className="form-label fw-semibold text-secondary small">Bio</label>
              <textarea className="form-control mb-3" rows={4} placeholder="Write a short bio about yourself..."
                value={about.bio} onChange={(e) => update("about", { ...about, bio: e.target.value })} />

              <label className="form-label fw-semibold text-secondary small">Profile Photo</label>
              <input type="file" accept="image/*" className="form-control mb-2"
                onChange={handleAboutImageUpload} />
              {about.image && (
                <div className="d-flex align-items-center gap-3 mt-2">
                  <img src={about.image} alt="Profile preview"
                    className="rounded-3"
                    style={{ width: "80px", height: "80px", objectFit: "cover", border: "1px solid #ddd" }} />
                  <button onClick={removeAboutImage}
                    className="btn btn-sm"
                    style={{ background: "#ff4d4d11", color: "#ff4d4d", border: "1px solid #ff4d4d44" }}>
                    ✕ Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Skills */}
        {activeSection === "Skills" && (
          <div>
            <h2 className="fw-bold mb-3" style={{ fontSize: "22px", color: "#1a1a2e" }}>Skills</h2>
            <div className="bg-white rounded-3 p-4 shadow-sm">
              {skills.map((skill, i) => (
                <div key={i} className="d-flex gap-2 mb-2">
                  <input className="form-control" placeholder={`Skill ${i + 1} (e.g. React)`}
                    value={skill} onChange={(e) => updateSkill(i, e.target.value)} />
                  <button onClick={() => removeSkill(i)}
                    className="btn btn-sm"
                    style={{ background: "#ff4d4d11", color: "#ff4d4d", border: "1px solid #ff4d4d44" }}>
                    ✕
                  </button>
                </div>
              ))}
              <button onClick={addSkill} className="btn mt-2 text-white fw-semibold"
                style={{ background: "#6c63ff" }}>
                + Add Skill
              </button>
            </div>
          </div>
        )}

        {/* Projects */}
        {activeSection === "Projects" && (
          <div>
            <h2 className="fw-bold mb-3" style={{ fontSize: "22px", color: "#1a1a2e" }}>Projects</h2>
            {projects.map((p, i) => (
              <div key={i} className="bg-white rounded-3 p-4 shadow-sm mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-semibold" style={{ color: "#6c63ff" }}>Project {i + 1}</span>
                  <button onClick={() => removeProject(i)}
                    className="btn btn-sm"
                    style={{ background: "#ff4d4d11", color: "#ff4d4d", border: "1px solid #ff4d4d44" }}>
                    ✕ Remove
                  </button>
                </div>

                <label className="form-label fw-semibold text-secondary small">Project Name</label>
                <input className="form-control mb-3" placeholder="e.g. Portfolio Website"
                  value={p.name} onChange={(e) => updateProject(i, "name", e.target.value)} />

                <label className="form-label fw-semibold text-secondary small">Description</label>
                <textarea className="form-control mb-3" rows={3} placeholder="What does this project do?"
                  value={p.description} onChange={(e) => updateProject(i, "description", e.target.value)} />

                <label className="form-label fw-semibold text-secondary small">Tech Stack</label>
                <input className="form-control mb-3" placeholder="e.g. React, Node.js, MongoDB"
                  value={p.tech} onChange={(e) => updateProject(i, "tech", e.target.value)} />

                <label className="form-label fw-semibold text-secondary small">Project Link</label>
                <input className="form-control" placeholder="https://github.com/..."
                  value={p.link} onChange={(e) => updateProject(i, "link", e.target.value)} />
              </div>
            ))}
            <button onClick={addProject} className="btn text-white fw-semibold"
              style={{ background: "#6c63ff" }}>
              + Add Project
            </button>
          </div>
        )}

        {/* Contact */}
        {activeSection === "Contact" && (
          <div>
            <h2 className="fw-bold mb-3" style={{ fontSize: "22px", color: "#1a1a2e" }}>Contact Info</h2>
            <div className="bg-white rounded-3 p-4 shadow-sm">
              <label className="form-label fw-semibold text-secondary small">Email</label>
              <input className="form-control mb-3" type="email" placeholder="you@example.com"
                value={contact.email} onChange={(e) => update("contact", { ...contact, email: e.target.value })} />

              <label className="form-label fw-semibold text-secondary small">Phone</label>
              <input className="form-control mb-3" placeholder="+20 1XX XXX XXXX"
                value={contact.phone} onChange={(e) => update("contact", { ...contact, phone: e.target.value })} />

              <label className="form-label fw-semibold text-secondary small">Location</label>
              <input className="form-control mb-3" placeholder="e.g. Cairo, Egypt"
                value={contact.location} onChange={(e) => update("contact", { ...contact, location: e.target.value })} />

              <label className="form-label fw-semibold text-secondary small">GitHub Username</label>
              <input className="form-control mb-3" placeholder="e.g. ahmeddev"
                value={contact.github} onChange={(e) => update("contact", { ...contact, github: e.target.value })} />

              <label className="form-label fw-semibold text-secondary small">LinkedIn URL</label>
              <input className="form-control" placeholder="https://linkedin.com/in/..."
                value={contact.linkedin} onChange={(e) => update("contact", { ...contact, linkedin: e.target.value })} />
            </div>
          </div>
        )}

        {/* Theme */}
        {activeSection === "Theme" && (
          <div>
            <h2 className="fw-bold mb-3" style={{ fontSize: "22px", color: "#1a1a2e" }}>Theme Settings</h2>
            <div className="bg-white rounded-3 p-4 shadow-sm">
              <label className="form-label fw-semibold text-secondary small">Primary Color</label>
              <div className="d-flex align-items-center gap-3 mb-3">
                <input type="color" value={theme.primaryColor}
                  onChange={(e) => update("theme", { ...theme, primaryColor: e.target.value })}
                  className="rounded-3 border-0"
                  style={{ width: "48px", height: "48px", cursor: "pointer" }} />
                <span className="text-secondary">{theme.primaryColor}</span>
              </div>

              <label className="form-label fw-semibold text-secondary small">Font Style</label>
              <select className="form-select mb-3" value={theme.fontStyle}
                onChange={(e) => update("theme", { ...theme, fontStyle: e.target.value })}>
                <option value="sans">Sans-serif (Modern)</option>
                <option value="serif">Serif (Editorial)</option>
                <option value="mono">Monospace (Developer)</option>
              </select>

              <label className="form-label fw-semibold text-secondary small">Mode</label>
              <div className="d-flex gap-3">
                {["Light", "Dark"].map((m) => (
                  <button key={m} onClick={() => update("theme", { ...theme, darkMode: m === "Dark" })}
                    className="btn px-4 py-2 fw-medium"
                    style={{
                      border: "2px solid",
                      borderColor: (theme.darkMode ? "Dark" : "Light") === m ? "#6c63ff" : "#ddd",
                      background: (theme.darkMode ? "Dark" : "Light") === m ? "#6c63ff11" : "#fff",
                      color: (theme.darkMode ? "Dark" : "Light") === m ? "#6c63ff" : "#666",
                    }}>
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
