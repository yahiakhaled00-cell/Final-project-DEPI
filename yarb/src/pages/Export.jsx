import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

function generateHTML(profile, template) {
  const name = profile.name || "Your Name";
  const title = profile.title || "Your Title";
  const bio = profile.bio || "";
  const skills = profile.skills ? profile.skills.split(",").map(s => s.trim()).filter(Boolean) : [];
  const email = profile.email || "";
  const github = profile.github || "";
  const projects = profile.builderProjects || [];
  const avatar = profile.avatar || null;

  if (template === "minimal") {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${name} — Portfolio</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Georgia, serif; background: #fff; color: #111; padding: 60px 8%; max-width: 860px; margin: 0 auto; }
    .avatar { width: 96px; height: 96px; border-radius: 50%; object-fit: cover; margin-bottom: 24px; }
    h1 { font-size: 40px; font-weight: bold; margin-bottom: 6px; }
    .title { color: #666; font-size: 18px; margin-bottom: 24px; }
    .bio { color: #444; line-height: 1.8; max-width: 600px; margin-bottom: 40px; }
    .section-label { font-size: 12px; text-transform: uppercase; letter-spacing: 3px; color: #999; margin-bottom: 14px; }
    .skills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 40px; }
    .skill { border: 1px solid #ddd; border-radius: 4px; padding: 4px 14px; font-size: 13px; }
    .project { border-bottom: 1px solid #eee; padding-bottom: 18px; margin-bottom: 18px; }
    .project-name { font-weight: bold; margin-bottom: 4px; }
    .project-desc { color: #666; font-size: 13px; }
    .contact { margin-top: 40px; display: flex; gap: 16px; }
    .contact a { color: #333; font-size: 14px; }
  </style>
</head>
<body>
  ${avatar ? `<img class="avatar" src="${avatar}" alt="${name}" />` : ""}
  <h1>${name}</h1>
  <div class="title">${title}</div>
  <p class="bio">${bio}</p>
  ${skills.length > 0 ? `
  <div class="section-label">Skills</div>
  <div class="skills">${skills.map(s => `<span class="skill">${s}</span>`).join("")}</div>` : ""}
  ${projects.length > 0 ? `
  <div class="section-label">Projects</div>
  ${projects.map(p => `<div class="project"><div class="project-name">${p.name}</div><div class="project-desc">${p.description}</div></div>`).join("")}` : ""}
  <div class="contact">
    ${email ? `<a href="mailto:${email}">✉ ${email}</a>` : ""}
    ${github ? `<a href="https://github.com/${github}" target="_blank">GitHub</a>` : ""}
  </div>
</body>
</html>`;
  }

  if (template === "modern") {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${name} — Portfolio</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, sans-serif; background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); color: white; min-height: 100vh; padding: 60px 8%; }
    .badge { display: inline-block; background: rgba(255,255,255,0.1); border-radius: 20px; padding: 4px 14px; font-size: 12px; margin-bottom: 24px; }
    .hero { display: flex; align-items: center; gap: 32px; margin-bottom: 40px; flex-wrap: wrap; }
    .avatar { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 2px solid #7c3aed; }
    .subtitle { color: #94a3b8; margin-bottom: 6px; }
    h1 { font-size: 48px; font-weight: 700; margin-bottom: 6px; }
    .role { color: #7c3aed; font-size: 22px; margin-bottom: 0; }
    .bio { color: #94a3b8; max-width: 500px; line-height: 1.8; margin-bottom: 40px; }
    .btns { display: flex; gap: 12px; margin-bottom: 48px; flex-wrap: wrap; }
    .btn-primary { background: #7c3aed; color: white; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; }
    .btn-secondary { border: 1px solid #444; color: white; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; }
    .section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #64748b; margin-bottom: 14px; }
    .skills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 40px; }
    .skill { background: rgba(124,58,237,0.2); border: 1px solid rgba(124,58,237,0.4); border-radius: 6px; padding: 4px 14px; font-size: 13px; }
    .projects { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; }
    .project { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 18px; }
    .project-name { font-weight: bold; margin-bottom: 6px; }
    .project-desc { color: #94a3b8; font-size: 13px; }
  </style>
</head>
<body>
  <div class="badge">● Available for new projects</div>
  <div class="hero">
    ${avatar ? `<img class="avatar" src="${avatar}" alt="${name}" />` : ""}
    <div>
      <div class="subtitle">Hi, I'm</div>
      <h1>${name}</h1>
      <div class="role">${title}</div>
    </div>
  </div>
  <p class="bio">${bio}</p>
  <div class="btns">
    ${email ? `<a class="btn-primary" href="mailto:${email}">✉ Get in touch</a>` : ""}
    ${github ? `<a class="btn-secondary" href="https://github.com/${github}" target="_blank">GitHub</a>` : ""}
  </div>
  ${skills.length > 0 ? `
  <div class="section-label">Skills</div>
  <div class="skills">${skills.map(s => `<span class="skill">${s}</span>`).join("")}</div>` : ""}
  ${projects.length > 0 ? `
  <div class="section-label" style="margin-top:32px">Projects</div>
  <div class="projects">${projects.map(p => `<div class="project"><div class="project-name">${p.name}</div><div class="project-desc">${p.description}</div></div>`).join("")}</div>` : ""}
</body>
</html>`;
  }

  // dark template
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${name} — Portfolio</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: monospace; background: #0d1117; color: #00ff41; min-height: 100vh; padding: 60px 8%; }
    .hero { display: flex; align-items: center; gap: 20px; margin-bottom: 32px; }
    .avatar { width: 56px; height: 56px; border-radius: 6px; object-fit: cover; border: 1px solid #333; }
    .cmd { color: #666; font-size: 13px; }
    h1 { font-size: 32px; font-weight: bold; color: #00ff41; }
    .role { color: #58a6ff; margin-bottom: 32px; }
    .block { margin-bottom: 32px; }
    .bio-text { color: #e6edf3; line-height: 1.8; }
    .skills-text { color: #00ff41; }
    .project { margin-bottom: 14px; padding-left: 18px; border-left: 2px solid #00ff41; }
    .project-name { color: #58a6ff; }
    .project-desc { color: #8b949e; font-size: 13px; }
    .contact { margin-top: 32px; color: #666; }
  </style>
</head>
<body>
  <div class="hero">
    ${avatar ? `<img class="avatar" src="${avatar}" alt="${name}" />` : ""}
    <div>
      <div class="cmd">$ whoami</div>
      <h1>${name}</h1>
    </div>
  </div>
  <div class="role">${title}</div>
  <div class="block">
    <div class="cmd">$ cat bio.txt</div>
    <div class="bio-text">${bio}</div>
  </div>
  ${skills.length > 0 ? `
  <div class="block">
    <div class="cmd">$ ls --skills</div>
    <div class="skills-text">${skills.join(" · ")}</div>
  </div>` : ""}
  ${projects.length > 0 ? `
  <div class="block">
    <div class="cmd">$ ls projects/</div>
    ${projects.map(p => `<div class="project"><div class="project-name">${p.name}/</div><div class="project-desc">${p.description}</div></div>`).join("")}
  </div>` : ""}
  <div class="contact">
    ${email ? `<div>$ contact --email ${email}</div>` : ""}
    ${github ? `<div>$ open github.com/${github}</div>` : ""}
  </div>
</body>
</html>`;
}

export default function Export() {
  const { profile } = useApp();
  const [copied, setCopied] = useState(false);

  const template = profile.template || "modern";

  const handleDownloadZip = async () => {
    const html = generateHTML(profile, template);
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    zip.file("index.html", html);
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${profile.name || "portfolio"}.zip`;
    a.click();
  };

  const handleDownloadHTML = () => {
    const html = generateHTML(profile, template);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${profile.name || "portfolio"}.html`;
    a.click();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + "/preview");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cardStyle = {
    backgroundColor: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: 16,
    padding: 28,
    color: "white",
  };

  const iconBox = (color, emoji) => (
    <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 16 }}>
      {emoji}
    </div>
  );

  return (
    <div className="container py-5">
      <h4 className="fw-bold mb-1" style={{ color: "white" }}>Export center</h4>
      <p className="mb-4" style={{ color: "#64748b" }}>Ship your portfolio anywhere.</p>

      <div className="row g-3 mb-3">

        {/* Download Resume */}
        <div className="col-12 col-md-4">
          <div style={cardStyle}>
            {iconBox("#3b82f620", "📄")}
            <h6 className="fw-bold mb-1">Download resume</h6>
            <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>Generate a print-ready PDF.</p>
            <Link to="/resume" className="btn w-100 fw-semibold" style={{ backgroundColor: "#7c3aed", color: "white", borderRadius: 10 }}>
              Open resume
            </Link>
          </div>
        </div>

        {/* Export Portfolio */}
        <div className="col-12 col-md-4">
          <div style={{ ...cardStyle, border: "1px solid #06b6d4" }}>
            {iconBox("#06b6d420", "⬇️")}
            <h6 className="fw-bold mb-1">Export portfolio</h6>
            <p style={{ color: "#64748b", fontSize: 13, marginBottom: 12 }}>
              Download as HTML using your <strong style={{ color: "#06b6d4" }}>{template}</strong> template.
            </p>
            <button onClick={handleDownloadHTML} className="btn w-100 fw-semibold mb-2" style={{ backgroundColor: "#06b6d4", color: "white", borderRadius: 10 }}>
              Download .html
            </button>
            <button onClick={handleDownloadZip} className="btn w-100 fw-semibold btn-outline-info" style={{ borderRadius: 10 }}>
              Download .zip
            </button>
          </div>
        </div>

        {/* Share Link */}
        <div className="col-12 col-md-4">
          <div style={cardStyle}>
            {iconBox("#10b98120", "🔗")}
            <h6 className="fw-bold mb-1">Share link</h6>
            <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>Send a live URL to recruiters.</p>
            <div className="d-flex gap-2">
              <input
                readOnly
                value={window.location.origin + "/preview"}
                className="form-control form-control-sm"
                style={{ backgroundColor: "#1e293b", border: "1px solid #334155", color: "#94a3b8", borderRadius: 8, fontSize: 12 }}
              />
              <button onClick={handleCopyLink} className="btn btn-sm" style={{ backgroundColor: "#1e293b", border: "1px solid #334155", color: "white", borderRadius: 8, whiteSpace: "nowrap" }}>
                {copied ? "✓" : "📋"}
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}