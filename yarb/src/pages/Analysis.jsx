import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Analysis() {
  const { githubData, theme } = useApp();
  const navigate = useNavigate();

  const bg = theme === "dark" ? "#0d1117" : "#f8f9fa";
  const cardBg = theme === "dark" ? "#1a1a2e" : "#ffffff";
  const cardColor = theme === "dark" ? "white" : "#111";
  const mutedColor = theme === "dark" ? "#8b949e" : "#6c757d";

  if (!githubData) {
    return (
      <div
        className="container py-5 text-center"
        style={{ backgroundColor: bg, minHeight: "100vh", color: cardColor }}
      >
        <h5 className="fw-bold mb-3">No GitHub data found</h5>
        <p style={{ color: mutedColor }} className="mb-4">
          Please analyze a GitHub profile first to see your analysis.
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

  const { user, repos, totalStars, languages, score } = githubData;

  const getLevel = (score) => {
    if (score >= 80) return "Senior Developer";
    if (score >= 60) return "Mid-level Developer";
    if (score >= 40) return "Junior Developer";
    return "Beginner Developer";
  };

  return (
    <div style={{ backgroundColor: bg, minHeight: "100vh", color: cardColor }}>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1">Developer analysis</h2>
            <p style={{ color: mutedColor }}>
              AI evaluation based on your public activity.
            </p>
          </div>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigate("/github")}
          >
            ← New Search
          </button>
        </div>

        <div className="row g-4 mb-4">
          {/* Dev Score */}
          <div className="col-12 col-md-4">
            <div
              className="card h-100 text-center p-4"
              style={{
                borderRadius: 16,
                backgroundColor: cardBg,
                color: cardColor,
                border: theme === "light" ? "1px solid #dee2e6" : "none",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: 150,
                  height: 150,
                  margin: "0 auto 16px",
                }}
              >
                <svg
                  viewBox="0 0 36 36"
                  style={{
                    transform: "rotate(-90deg)",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9"
                    fill="none"
                    stroke={theme === "dark" ? "#333" : "#e2e8f0"}
                    strokeWidth="2.5"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                    strokeDasharray={`${score}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 32, fontWeight: "bold" }}>
                    {score}
                  </div>
                  <div style={{ fontSize: 11, color: mutedColor }}>
                    DEV SCORE
                  </div>
                </div>
              </div>
              <img
                src={user.avatar_url}
                alt="avatar"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  margin: "0 auto 8px",
                }}
              />
              <div className="fw-semibold">{user.name || user.login}</div>
              <span
                className="badge mt-2"
                style={{ backgroundColor: "#1e3a5f" }}
              >
                {getLevel(score)}
              </span>
            </div>
          </div>

          {/* Strengths */}
          <div className="col-12 col-md-4">
            <div
              className="card h-100 p-4"
              style={{
                borderRadius: 16,
                backgroundColor: cardBg,
                color: cardColor,
                border: theme === "light" ? "1px solid #dee2e6" : "none",
              }}
            >
              <h6 className="fw-bold mb-3">✦ Strengths</h6>
              <ul className="list-unstyled">
                {repos.length > 10 && (
                  <li className="mb-2">✅ Active repository history</li>
                )}
                {totalStars > 5 && (
                  <li className="mb-2">✅ Well-starred projects</li>
                )}
                {languages.length > 2 && (
                  <li className="mb-2">✅ Multi-language expertise</li>
                )}
                {user.followers > 5 && (
                  <li className="mb-2">✅ Strong community presence</li>
                )}
                {user.bio && (
                  <li className="mb-2">✅ Well-documented profile</li>
                )}
              </ul>
            </div>
          </div>

          {/* Weaknesses */}
          <div className="col-12 col-md-4">
            <div
              className="card h-100 p-4"
              style={{
                borderRadius: 16,
                backgroundColor: cardBg,
                color: cardColor,
                border: theme === "light" ? "1px solid #dee2e6" : "none",
              }}
            >
              <h6 className="fw-bold mb-3">⚠️ Weaknesses</h6>
              <ul className="list-unstyled">
                {repos.length < 5 && (
                  <li className="mb-2">❌ Few public repositories</li>
                )}
                {totalStars < 5 && (
                  <li className="mb-2">❌ Limited project visibility</li>
                )}
                {languages.length < 2 && (
                  <li className="mb-2">❌ Limited language diversity</li>
                )}
                {user.followers < 5 && (
                  <li className="mb-2">❌ Low community engagement</li>
                )}
                {!user.bio && <li className="mb-2">❌ Missing profile bio</li>}
              </ul>
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div
          className="card p-4"
          style={{
            borderRadius: 16,
            backgroundColor: cardBg,
            color: cardColor,
            border: theme === "light" ? "1px solid #dee2e6" : "none",
          }}
        >
          <h6 className="fw-bold mb-4">Score breakdown</h6>
          <div className="row g-3">
            {[
              { label: "Code quality", value: Math.min(100, repos.length * 3) },
              {
                label: "Activity",
                value: Math.min(100, user.public_repos * 2),
              },
              {
                label: "Diversity",
                value: Math.min(100, languages.length * 15),
              },
              { label: "Impact", value: Math.min(100, totalStars * 5) },
            ].map((item) => (
              <div className="col-12 col-md-6" key={item.label}>
                <div className="d-flex justify-content-between mb-1">
                  <span className="small">{item.label}</span>
                  <span className="small fw-bold">{item.value}</span>
                </div>
                <div
                  className="progress"
                  style={{
                    height: 6,
                    borderRadius: 10,
                    backgroundColor: theme === "dark" ? "#333" : "#e2e8f0",
                  }}
                >
                  <div
                    className="progress-bar"
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: "#3b82f6",
                      borderRadius: 10,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
