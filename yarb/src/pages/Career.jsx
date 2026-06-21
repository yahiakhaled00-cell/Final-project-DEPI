import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const careerRoles = [
  {
    title: "Frontend Developer",
    icon: "</>",
    color: "#7c3aed",
    description:
      "Strong React + TypeScript signals; great visual sense in your repos.",
    keywords: [
      "javascript",
      "typescript",
      "react",
      "vue",
      "css",
      "html",
      "sass",
    ],
    progressColor: "#7c3aed",
  },
  {
    title: "Full Stack Developer",
    icon: "⚡",
    color: "#06b6d4",
    description:
      "Good balance across client and server work — close to senior fullstack.",
    keywords: [
      "javascript",
      "typescript",
      "python",
      "node",
      "react",
      "express",
      "mongodb",
    ],
    progressColor: "#06b6d4",
  },
  {
    title: "AI Engineer",
    icon: "🤖",
    color: "#10b981",
    description:
      "Foundational ML projects detected; deepen with LLM frameworks.",
    keywords: [
      "python",
      "jupyter",
      "tensorflow",
      "pytorch",
      "machine learning",
      "ai",
    ],
    progressColor: "#10b981",
  },
  {
    title: "Backend Developer",
    icon: "⚙️",
    color: "#f59e0b",
    description: "Some API work; expand distributed systems and DB experience.",
    keywords: [
      "python",
      "java",
      "go",
      "rust",
      "c++",
      "node",
      "php",
      "ruby",
      "sql",
    ],
    progressColor: "#f59e0b",
  },
  {
    title: "Mobile Developer",
    icon: "📱",
    color: "#ef4444",
    description: "Limited native or React Native repos in your history.",
    keywords: [
      "swift",
      "kotlin",
      "dart",
      "flutter",
      "react native",
      "java",
      "objective-c",
    ],
    progressColor: "#ef4444",
  },
  {
    title: "DevOps Engineer",
    icon: "🔧",
    color: "#8b5cf6",
    description: "Infrastructure and deployment patterns found in your repos.",
    keywords: [
      "dockerfile",
      "yaml",
      "bash",
      "shell",
      "terraform",
      "kubernetes",
      "ansible",
    ],
    progressColor: "#8b5cf6",
  },
];

function calcMatch(role, languages, repos) {
  if (!languages || languages.length === 0)
    return Math.floor(Math.random() * 40 + 20);
  const langLower = languages.map((l) => l.toLowerCase());
  const repoNames = repos?.map((r) => r.name.toLowerCase()).join(" ") || "";
  let score = 0;
  role.keywords.forEach((kw) => {
    if (langLower.some((l) => l.includes(kw))) score += 15;
    if (repoNames.includes(kw)) score += 5;
  });
  return Math.min(99, Math.max(10, score));
}

export default function Career() {
  const { githubData, theme } = useApp();
  const navigate = useNavigate();

  const bg = theme === "dark" ? "#0d1117" : "#f8f9fa";
  const cardBg = theme === "dark" ? "#1a1a2e" : "#ffffff";
  const cardColor = theme === "dark" ? "white" : "#111";
  const mutedColor = theme === "dark" ? "#8b949e" : "#6c757d";
  const cardBorder =
    theme === "dark" ? "1px solid #2d2d4e" : "1px solid #dee2e6";
  const progressBg = theme === "dark" ? "#333" : "#e2e8f0";

  if (!githubData) {
    return (
      <div
        className="py-5 text-center"
        style={{ backgroundColor: bg, minHeight: "100vh", color: cardColor }}
      >
        <h5 className="fw-bold mb-3">No GitHub data found</h5>
        <p style={{ color: mutedColor }} className="mb-4">
          Please analyze a GitHub profile first to see career recommendations.
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

  const { languages, repos } = githubData;

  const roles = careerRoles
    .map((role) => ({ ...role, match: calcMatch(role, languages, repos) }))
    .sort((a, b) => b.match - a.match);

  return (
    <div style={{ backgroundColor: bg, minHeight: "100vh", color: cardColor }}>
      <div className="container py-5">
        <h4 className="fw-bold mb-1">Career recommendations</h4>
        <p style={{ color: mutedColor }} className="mb-4">
          Roles ranked by how well your profile fits.
        </p>

        <div className="row g-4">
          {roles.map((role) => (
            <div className="col-12 col-md-6" key={role.title}>
              <div
                className="card p-4 h-100"
                style={{
                  borderRadius: 16,
                  backgroundColor: cardBg,
                  color: cardColor,
                  border: cardBorder,
                }}
              >
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      backgroundColor: role.color + "33",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                    }}
                  >
                    {role.icon}
                  </div>
                  <div className="text-end">
                    <div
                      style={{
                        fontSize: 28,
                        fontWeight: "bold",
                        color: role.progressColor,
                      }}
                    >
                      {role.match}%
                    </div>
                    <div style={{ fontSize: 12, color: mutedColor }}>match</div>
                  </div>
                </div>
                <h6 className="fw-bold mb-1">{role.title}</h6>
                <p
                  style={{ fontSize: 13, color: mutedColor, marginBottom: 16 }}
                >
                  {role.description}
                </p>
                <div
                  className="progress"
                  style={{
                    height: 6,
                    borderRadius: 10,
                    backgroundColor: progressBg,
                  }}
                >
                  <div
                    className="progress-bar"
                    style={{
                      width: `${role.match}%`,
                      backgroundColor: role.progressColor,
                      borderRadius: 10,
                      transition: "width 1s ease",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
