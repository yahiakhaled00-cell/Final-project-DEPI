import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Skills() {
  const { githubData } = useApp();
  const navigate = useNavigate();

  if (!githubData) {
    return (
      <div className="container py-5 text-center">
        <h5 className="fw-bold mb-3">No GitHub data found</h5>
        <p className="text-muted mb-4">Please analyze a GitHub profile first.</p>
        <button className="btn fw-semibold" style={{ backgroundColor: "#7c3aed", color: "white", borderRadius: 10 }} onClick={() => navigate("/github")}>
          Go to GitHub Analysis
        </button>
      </div>
    );
  }

  const { repos, languages } = githubData;

  // حساب عدد الـ repos لكل language
  const langCount = {};
  repos.forEach(r => {
    if (r.language) {
      langCount[r.language] = (langCount[r.language] || 0) + 1;
    }
  });

  const maxCount = Math.max(...Object.values(langCount), 1);

  const skillsWithLevel = Object.entries(langCount)
    .map(([lang, count]) => ({
      name: lang,
      level: Math.round((count / maxCount) * 100),
      count,
    }))
    .sort((a, b) => b.level - a.level);

  // تقسيم الـ skills لـ categories
  const frontendLangs = ["JavaScript", "TypeScript", "HTML", "CSS", "Vue", "React"];
  const backendLangs = ["Python", "Java", "Go", "Rust", "C++", "C#", "PHP", "Ruby", "C"];
  const otherLangs = ["Shell", "Dockerfile", "Makefile", "Kotlin", "Swift", "Dart"];

  const frontend = skillsWithLevel.filter(s => frontendLangs.includes(s.name));
  const backend = skillsWithLevel.filter(s => backendLangs.includes(s.name));
  const other = skillsWithLevel.filter(s => !frontendLangs.includes(s.name) && !backendLangs.includes(s.name));

  const tools = [...new Set(repos.map(r => r.language).filter(Boolean))];

  const cardStyle = {
    background: "rgba(15,23,42,.7)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: 25,
    padding: 35,
    color: "white",
  };

  const SkillBar = ({ skill }) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span>{skill.name}</span>
        <span style={{ color: "#94a3b8" }}>{skill.level}%</span>
      </div>
      <div style={{ height: 8, background: "#1e293b", borderRadius: 50, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${skill.level}%`, background: "linear-gradient(to right, #3b82f6, #8b5cf6)", borderRadius: 50, transition: "width 1s ease" }} />
      </div>
    </div>
  );

  return (
    <div style={{ padding: "60px 8%" }}>

      {/* Header */}
      <div className="text-center mb-5">
        <span className="badge mb-2" style={{ backgroundColor: "#1e293b", color: "#94a3b8", padding: "6px 16px", borderRadius: 50 }}>
          Skills Overview
        </span>
        <h2 className="fw-bold mt-2" style={{ color: "white" }}>Skills & Technologies</h2>
        <p style={{ color: "#94a3b8" }}>
          Based on <strong style={{ color: "#7c3aed" }}>@{githubData.user.login}</strong>'s GitHub activity across {repos.length} repositories.
        </p>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-5 text-center">
        {[
          { value: languages?.length || 0, label: "Languages" },
          { value: repos.length, label: "Repositories" },
          { value: repos.reduce((s, r) => s + r.stargazers_count, 0), label: "Total Stars" },
        ].map(s => (
          <div className="col-4" key={s.label}>
            <div style={{ ...cardStyle, padding: 24 }}>
              <h3 className="fw-bold mb-1" style={{ color: "#7c3aed" }}>{s.value}</h3>
              <p className="mb-0" style={{ color: "#94a3b8", fontSize: 13 }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Skills Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 30, marginBottom: 30 }}>

        {/* Frontend */}
        {frontend.length > 0 && (
          <div style={cardStyle}>
            <h3 className="fw-bold mb-4">🎨 Frontend</h3>
            {frontend.map(s => <SkillBar key={s.name} skill={s} />)}
          </div>
        )}

        {/* Backend */}
        {backend.length > 0 && (
          <div style={cardStyle}>
            <h3 className="fw-bold mb-4">⚙️ Backend</h3>
            {backend.map(s => <SkillBar key={s.name} skill={s} />)}
          </div>
        )}

        {/* Other */}
        {other.length > 0 && (
          <div style={cardStyle}>
            <h3 className="fw-bold mb-4">🔧 Other</h3>
            {other.map(s => <SkillBar key={s.name} skill={s} />)}
          </div>
        )}

        {/* Tools */}
        <div style={cardStyle}>
          <h3 className="fw-bold mb-4">🛠 All Languages</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {tools.map(tool => (
              <span key={tool} style={{ padding: "10px 16px", borderRadius: 50, background: "#0f172a", border: "1px solid rgba(255,255,255,.08)", color: "white", fontSize: 13 }}>
                {tool}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}