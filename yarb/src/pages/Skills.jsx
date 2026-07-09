import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

const trending = ["GraphQL", "Docker", "Kubernetes", "Rust", "AWS Lambda", "System Design", "Terraform", "Next.js", "TypeScript", "Redis"];

export default function Skills() {
  const { githubData } = useApp();
  const navigate = useNavigate();

  if (!githubData) {
    return (
      <div className="container py-5 text-center">
        <h5 className="fw-bold mb-3" style={{ color: "white" }}>No GitHub data found</h5>
        <p className="text-muted mb-4">Please analyze a GitHub profile first.</p>
        <button className="btn fw-semibold" style={{ backgroundColor: "#7c3aed", color: "white", borderRadius: 10 }} onClick={() => navigate("/github")}>
          Go to GitHub Analysis
        </button>
      </div>
    );
  }

  const current = useMemo(() => {
    return [...new Set(githubData.languages || [])];
  }, [githubData.languages]);

  const recommended = trending.filter(t => !current.map(c => c.toLowerCase()).includes(t.toLowerCase()));

  const roadmap = [
    { phase: "Foundation", weeks: "0-4", topics: recommended.slice(0, 2), progress: 100 },
    { phase: "Intermediate", weeks: "4-10", topics: recommended.slice(2, 4), progress: 60 },
    { phase: "Advanced", weeks: "10-20", topics: recommended.slice(4, 6), progress: 15 },
  ];

  const cardStyle = {
    background: "rgba(15,23,42,0.7)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: 28,
    color: "white",
  };

  return (
    <div style={{ padding: "60px 8%" }}>

      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1" style={{ color: "white" }}>Skill gap analysis</h2>
        <p style={{ color: "#94a3b8" }}>What you have, what to learn, and how to get there.</p>
      </div>

      {/* Current + Recommended */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6">
          <div style={cardStyle}>
            <div className="fw-semibold mb-3 d-flex align-items-center gap-2">
              <span style={{ color: "#10b981" }}>✓</span> Current skills
            </div>
            <div className="d-flex flex-wrap gap-2">
              {current.length === 0
                ? <span style={{ color: "#64748b", fontSize: 13 }}>No skills found from GitHub.</span>
                : current.map(s => (
                  <span key={s} style={{ borderRadius: 50, border: "1px solid rgba(16,185,129,0.3)", backgroundColor: "rgba(16,185,129,0.1)", padding: "4px 14px", fontSize: 12, color: "#10b981" }}>
                    {s}
                  </span>
                ))
              }
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div style={cardStyle}>
            <div className="fw-semibold mb-3 d-flex align-items-center gap-2">
              <span style={{ color: "#7c3aed" }}>+</span> Recommended next
            </div>
            <div className="d-flex flex-wrap gap-2">
              {recommended.length === 0
                ? <span style={{ color: "#64748b", fontSize: 13 }}>You're covering trending stacks well.</span>
                : recommended.map(s => (
                  <span key={s} style={{ borderRadius: 50, border: "1px solid rgba(124,58,237,0.3)", backgroundColor: "rgba(124,58,237,0.1)", padding: "4px 14px", fontSize: 12, color: "#a78bfa" }}>
                    {s}
                  </span>
                ))
              }
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div>
        <div className="fw-semibold mb-3 d-flex align-items-center gap-2" style={{ color: "white" }}>
          📍 Learning roadmap
        </div>
        <div className="row g-4">
          {roadmap.map((r, i) => (
            <div className="col-12 col-md-4" key={r.phase}>
              <div style={{
                ...cardStyle,
                opacity: 0,
                animation: `fadeUp 0.5s ease ${i * 0.1}s forwards`,
              }}>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em", color: "#64748b", marginBottom: 4 }}>Phase {i + 1}</div>
                    <div className="fw-semibold">{r.phase}</div>
                  </div>
                  <span style={{ fontSize: 12, color: "#64748b" }}>{r.weeks}w</span>
                </div>

                <div style={{ height: 6, backgroundColor: "#1e293b", borderRadius: 50, overflow: "hidden", marginBottom: 6 }}>
                  <div style={{ height: "100%", width: `${r.progress}%`, background: "linear-gradient(to right, #7c3aed, #06b6d4)", borderRadius: 50 }} />
                </div>
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>{r.progress}% complete</div>

                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {r.topics.length === 0
                    ? <li style={{ color: "#64748b", fontSize: 12 }}>Nothing left in this phase.</li>
                    : r.topics.map(t => (
                      <li key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#e2e8f0", marginBottom: 8 }}>
                        <span style={{ color: "#94a3b8", fontSize: 12 }}>📖</span> {t}
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}