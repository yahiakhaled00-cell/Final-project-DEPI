import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const { githubData } = useApp();
  const navigate = useNavigate();

  if (!githubData) {
    return (
      <div className="container py-5 text-center">
        <h5 className="fw-bold mb-3">No GitHub data found</h5>
        <p className="text-muted mb-4">
          Please analyze a GitHub profile first.
        </p>
        <button
          className="btn fw-semibold"
          style={{
            backgroundColor: "#7c3aed",
            color: "white",
            borderRadius: 10,
          }}
          onClick={() => navigate("/github")}
        >
          Go to GitHub Analysis
        </button>
      </div>
    );
  }

  const { user, repos, totalStars, languages } = githubData;

  const totalForks = repos.reduce((acc, r) => acc + r.forks_count, 0);

  const languageCounts = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });

  const topLanguages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const totalRepos = Object.values(languageCounts).reduce((a, b) => a + b, 0);

  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"];

  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Dashboard</h2>
          <p className="text-muted">Overview of your GitHub profile.</p>
        </div>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => navigate("/github")}
        >
          ← New Search
        </button>
      </div>

      {/* Profile */}
      <div
        className="card p-4 mb-4"
        style={{ borderRadius: 16, backgroundColor: "#1a1a2e", color: "white" }}
      >
        <div className="d-flex align-items-center gap-3">
          <img
            src={user.avatar_url}
            alt="avatar"
            style={{ width: 80, height: 80, borderRadius: "50%" }}
          />
          <div>
            <h4 className="fw-bold mb-1">{user.name || user.login}</h4>
            <p className="text-muted mb-1">{user.bio || "No bio available"}</p>
            {user.location && (
              <p className="text-muted mb-1">📍 {user.location}</p>
            )}
            <a
              href={`https://github.com/${user.login}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#3b82f6", fontSize: 14 }}
            >
              @{user.login}
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {[
          { label: "Public Repos", value: user.public_repos },
          { label: "Followers", value: user.followers?.toLocaleString() },
          { label: "Following", value: user.following },
          { label: "Total Stars", value: totalStars?.toLocaleString() },
          { label: "Total Forks", value: totalForks?.toLocaleString() },
          { label: "Languages", value: languages.length },
        ].map((stat) => (
          <div className="col-6 col-md-4 col-lg-2" key={stat.label}>
            <div
              className="card text-center p-3 h-100"
              style={{
                borderRadius: 16,
                backgroundColor: "#1a1a2e",
                color: "white",
              }}
            >
              <p
                className="fw-bold mb-1"
                style={{ fontSize: 24, color: "#3b82f6" }}
              >
                {stat.value}
              </p>
              <p className="text-muted mb-0" style={{ fontSize: 13 }}>
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Language Distribution */}
      <div
        className="card p-4 mb-4"
        style={{ borderRadius: 16, backgroundColor: "#1a1a2e", color: "white" }}
      >
        <h6 className="fw-bold mb-4">Language Distribution</h6>
        {topLanguages.map(([lang, count], index) => (
          <div key={lang} className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <span style={{ color: colors[index], fontWeight: "bold" }}>
                {lang}
              </span>
              <span className="text-muted" style={{ fontSize: 13 }}>
                {Math.round((count / totalRepos) * 100)}%
              </span>
            </div>
            <div
              className="progress"
              style={{ height: 8, borderRadius: 10, backgroundColor: "#333" }}
            >
              <div
                className="progress-bar"
                style={{
                  width: `${(count / topLanguages[0][1]) * 100}%`,
                  backgroundColor: colors[index],
                  borderRadius: 10,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Top Repositories */}
      <div
        className="card p-4"
        style={{ borderRadius: 16, backgroundColor: "#1a1a2e", color: "white" }}
      >
        <h6 className="fw-bold mb-4">Top Repositories</h6>
        {topRepos.map((repo) => (
          <div
            key={repo.name}
            className="mb-3 pb-3"
            style={{ borderBottom: "1px solid #333" }}
          >
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#3b82f6",
                fontWeight: "bold",
                textDecoration: "none",
                fontSize: 16,
              }}
            >
              {repo.name}
            </a>
            <p className="text-muted mb-2" style={{ fontSize: 14 }}>
              {repo.description || "No description"}
            </p>
            <div className="d-flex gap-3">
              {repo.language && (
                <span
                  className="badge"
                  style={{ backgroundColor: "#333", color: "#aaa" }}
                >
                  {repo.language}
                </span>
              )}
              <span className="text-muted" style={{ fontSize: 13 }}>
                ⭐ {repo.stargazers_count?.toLocaleString()}
              </span>
              <span className="text-muted" style={{ fontSize: 13 }}>
                🍴 {repo.forks_count?.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
