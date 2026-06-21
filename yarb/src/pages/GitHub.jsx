import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function GitHub() {
  const { setGithubData, theme } = useApp();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = async () => {
    if (!username.trim()) return;
    setLoading(true);
    setError("");

    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
      ]);

      if (!userRes.ok) throw new Error("User not found");

      const user = await userRes.json();
      const repos = await reposRes.json();

      const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
      const languages = [
        ...new Set(repos.map((r) => r.language).filter(Boolean)),
      ];
      const score = Math.min(
        100,
        Math.floor(
          user.followers * 0.3 + totalStars * 0.3 + repos.length * 0.4,
        ),
      );

      setGithubData({ user, repos, totalStars, languages, score });
      navigate("/analysis");
    } catch (e) {
      setError("GitHub user not found. Please check the username.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: theme === "dark" ? "#0d1117" : "#f8f9fa",
        color: theme === "dark" ? "white" : "#111",
      }}
    >
      <div className="text-center">
        <h2 className="fw-bold mb-2">Analyze a GitHub profile</h2>
        <p
          style={{ color: theme === "dark" ? "#8b949e" : "#6c757d" }}
          className="mb-4"
        >
          Enter a username — we'll fetch repos, stars, and languages.
        </p>
        <div className="d-flex justify-content-center gap-2">
          <input
            type="text"
            className="form-control"
            style={{
              maxWidth: 400,
              borderRadius: 10,
              backgroundColor: theme === "dark" ? "#161b22" : "white",
              color: theme === "dark" ? "white" : "#111",
              border:
                theme === "dark" ? "1px solid #21262d" : "1px solid #ced4da",
            }}
            placeholder="e.g. torvalds"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && analyze()}
          />
          <button
            className="btn fw-semibold"
            style={{
              backgroundColor: "#7c3aed",
              color: "white",
              borderRadius: 10,
            }}
            onClick={analyze}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>
        {error && (
          <div
            className="alert alert-danger mt-3 mx-auto"
            style={{ maxWidth: 400 }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
