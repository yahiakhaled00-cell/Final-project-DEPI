import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function AITool() {
  const { githubData, profile } = useApp();
  const navigate = useNavigate();
  const [bio, setBio] = useState("");
  const [loadingBio, setLoadingBio] = useState(false);
  const [improvedDescs, setImprovedDescs] = useState({});
  const [loadingRepo, setLoadingRepo] = useState({});

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

  const generateBio = () => {
    setLoadingBio(true);
    setTimeout(() => {
      const { user, languages, repos } = githubData;
      const topLangs = languages?.slice(0, 3).join(", ") || "various technologies";
      const stars = repos?.reduce((s, r) => s + r.stargazers_count, 0) || 0;
      setBio(
        `I'm ${user.name || user.login}, a passionate developer with expertise in ${topLangs}. ` +
        `With ${repos?.length || 0} public repositories and ${stars} total stars on GitHub, ` +
        `I love building impactful projects and contributing to the open-source community. ` +
        `${user.bio ? user.bio : "Always learning and exploring new technologies."}`
      );
      setLoadingBio(false);
    }, 1000);
  };

  const improveDesc = (repo) => {
    setLoadingRepo(prev => ({ ...prev, [repo.id]: true }));
    setTimeout(() => {
      const improved = repo.description
        ? `⚡ ${repo.description.charAt(0).toUpperCase() + repo.description.slice(1)} — Built with ${repo.language || "modern tech"} and designed for performance.`
        : `A ${repo.language || "software"} project focused on clean code and best practices. Explore the repo to learn more.`;
      setImprovedDescs(prev => ({ ...prev, [repo.id]: improved }));
      setLoadingRepo(prev => ({ ...prev, [repo.id]: false }));
    }, 800);
  };

  return (
    <div className="container py-5">
      <h4 className="fw-bold mb-1">AI writing tools</h4>
      <p className="text-muted mb-4">Polish your bio and project descriptions in one click.</p>

      {/* About-Me Generator */}
      <div className="card p-4 mb-4" style={{ borderRadius: 16, backgroundColor: "#1a1a2e", color: "white" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold mb-0">About-Me generator</h6>
          <button
            className="btn btn-sm fw-semibold"
            style={{ backgroundColor: "#7c3aed", color: "white", borderRadius: 8 }}
            onClick={generateBio}
            disabled={loadingBio}
          >
            {loadingBio ? "Generating..." : "✨ Generate"}
          </button>
        </div>
        <textarea
          className="form-control"
          rows={4}
          placeholder="Click Generate to draft a professional bio..."
          value={bio}
          onChange={e => setBio(e.target.value)}
          style={{ backgroundColor: "#0f172a", color: "white", border: "1px solid #333", borderRadius: 10 }}
        />
        {bio && (
          <div className="mt-2 text-end">
            <button className="btn btn-sm btn-outline-secondary" onClick={() => navigator.clipboard.writeText(bio)}>
              📋 Copy
            </button>
          </div>
        )}
      </div>

      {/* Project Description Optimizer */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold text-white mb-0">Project description optimizer</h6>
        <span className="text-muted small">Repos from @{githubData.user.login}</span>
      </div>

      <div className="row g-3">
        {githubData.repos?.slice(0, 8).map(repo => (
          <div className="col-12 col-md-6" key={repo.id}>
            <div className="card p-3 h-100" style={{ borderRadius: 14, backgroundColor: "#1a1a2e", color: "white", border: "1px solid #2d2d4e" }}>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="fw-semibold" style={{ fontSize: 14 }}>{repo.name}</div>
                <button
                  className="btn btn-sm fw-semibold"
                  style={{ backgroundColor: "#7c3aed", color: "white", borderRadius: 8, fontSize: 12 }}
                  onClick={() => improveDesc(repo)}
                  disabled={loadingRepo[repo.id]}
                >
                  {loadingRepo[repo.id] ? "..." : "✨ Improve"}
                </button>
              </div>
              <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", marginBottom: 4 }}>
                {improvedDescs[repo.id] ? "IMPROVED" : "CURRENT"}
              </div>
              <p style={{ fontSize: 13, color: improvedDescs[repo.id] ? "#a78bfa" : "#94a3b8", margin: 0 }}>
                {improvedDescs[repo.id] || repo.description || "No description."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}