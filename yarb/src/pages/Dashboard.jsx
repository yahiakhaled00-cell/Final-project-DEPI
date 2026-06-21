import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const { githubData, theme } = useApp();
  const navigate = useNavigate();

  const bg = theme === "dark" ? "#0d1117" : "#f8f9fa";
  const cardBg = theme === "dark" ? "#1a1a2e" : "#ffffff";
  const cardColor = theme === "dark" ? "white" : "#111";
  const mutedColor = theme === "dark" ? "#8b949e" : "#6c757d";
  const borderColor = theme === "dark" ? "#333" : "#dee2e6";
  const progressBg = theme === "dark" ? "#333" : "#e2e8f0";
  const badgeBg = theme === "dark" ? "#333" : "#e2e8f0";
  const badgeColor = theme === "dark" ? "#aaa" : "#555";

  if (!githubData) {
    return (
      <div
        className="py-5 text-center"
        style={{ backgroundColor: bg, minHeight: "100vh", color: cardColor }}
      >
        <h5 className="fw-bold mb-3">No GitHub data found</h5>
        <p style={{ color: mutedColor }} className="mb-4">
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
    <div style={{ backgroundColor: bg, minHeight: "100vh", color: cardColor }}>
      <div className="container py-5">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1">Dashboard</h2>
            <p style={{ color: mutedColor }}>
              Overview of your GitHub profile.
            </p>
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
          style={{
            borderRadius: 16,
            backgroundColor: cardBg,
            color: cardColor,
            border: `1px solid ${borderColor}`,
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <img
              src={user.avatar_url}
              alt="avatar"
              style={{ width: 80, height: 80, borderRadius: "50%" }}
            />
            <div>
              <h4 className="fw-bold mb-1">{user.name || user.login}</h4>
              <p style={{ color: mutedColor }} className="mb-1">
                {user.bio || "No bio available"}
              </p>
              {user.location && (
                <p style={{ color: mutedColor }} className="mb-1">
                  📍 {user.location}
                </p>
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
                  backgroundColor: cardBg,
                  color: cardColor,
                  border: `1px solid ${borderColor}`,
                }}
              >
                <p
                  className="fw-bold mb-1"
                  style={{ fontSize: 24, color: "#3b82f6" }}
                >
                  {stat.value}
                </p>
                <p style={{ color: mutedColor, fontSize: 13 }} className="mb-0">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Language Distribution */}
        <div
          className="card p-4 mb-4"
          style={{
            borderRadius: 16,
            backgroundColor: cardBg,
            color: cardColor,
            border: `1px solid ${borderColor}`,
          }}
        >
          <h6 className="fw-bold mb-4">Language Distribution</h6>
          {topLanguages.map(([lang, count], index) => (
            <div key={lang} className="mb-3">
              <div className="d-flex justify-content-between mb-1">
                <span style={{ color: colors[index], fontWeight: "bold" }}>
                  {lang}
                </span>
                <span style={{ color: mutedColor, fontSize: 13 }}>
                  {Math.round((count / totalRepos) * 100)}%
                </span>
              </div>
              <div
                className="progress"
                style={{
                  height: 8,
                  borderRadius: 10,
                  backgroundColor: progressBg,
                }}
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
          style={{
            borderRadius: 16,
            backgroundColor: cardBg,
            color: cardColor,
            border: `1px solid ${borderColor}`,
          }}
        >
          <h6 className="fw-bold mb-4">Top Repositories</h6>
          {topRepos.map((repo) => (
            <div
              key={repo.name}
              className="mb-3 pb-3"
              style={{ borderBottom: `1px solid ${borderColor}` }}
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
              <p style={{ color: mutedColor, fontSize: 14 }} className="mb-2">
                {repo.description || "No description"}
              </p>
              <div className="d-flex gap-3">
                {repo.language && (
                  <span
                    className="badge"
                    style={{ backgroundColor: badgeBg, color: badgeColor }}
                  >
                    {repo.language}
                  </span>
                )}
                <span style={{ color: mutedColor, fontSize: 13 }}>
                  ⭐ {repo.stargazers_count?.toLocaleString()}
                </span>
                <span style={{ color: mutedColor, fontSize: 13 }}>
                  🍴 {repo.forks_count?.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
