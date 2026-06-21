import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function SignIn() {
  const { signin, theme } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const bg = theme === "dark" ? "#0d1117" : "#f8f9fa";
  const cardBg = theme === "dark" ? "#1a1a2e" : "#ffffff";
  const cardColor = theme === "dark" ? "white" : "#111";
  const mutedColor = theme === "dark" ? "#8b949e" : "#6c757d";
  const borderColor = theme === "dark" ? "#333" : "#dee2e6";
  const inputBg = theme === "dark" ? "#0f172a" : "#ffffff";
  const inputColor = theme === "dark" ? "white" : "#111";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    const result = signin(form.email, form.password);
    if (!result.success) {
      setError(result.message);
      return;
    }
    navigate("/github");
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: bg }}
    >
      <div
        className="card shadow-sm p-4"
        style={{
          width: "100%",
          maxWidth: 440,
          borderRadius: 16,
          backgroundColor: cardBg,
          color: cardColor,
          border: `1px solid ${borderColor}`,
        }}
      >
        <div className="text-center mb-4">
          <div className="fw-bold fs-4 mb-1" style={{ color: "#7c3aed" }}>
            ✦ PortfolioGenie
          </div>
          <h5 className="fw-bold">Welcome back</h5>
          <p style={{ color: mutedColor }} className="small">
            Sign in to your account
          </p>
        </div>

        {error && <div className="alert alert-danger py-2 small">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
              style={{
                borderRadius: 10,
                backgroundColor: inputBg,
                color: inputColor,
                border: `1px solid ${borderColor}`,
              }}
            />
          </div>

          <div className="mb-2">
            <label className="form-label small fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              style={{
                borderRadius: 10,
                backgroundColor: inputBg,
                color: inputColor,
                border: `1px solid ${borderColor}`,
              }}
            />
          </div>

          <div className="text-end mb-4">
            <Link
              to="/forgot-password"
              className="small"
              style={{ color: "#7c3aed" }}
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn w-100 fw-semibold"
            style={{
              backgroundColor: "#7c3aed",
              color: "white",
              borderRadius: 10,
            }}
          >
            Sign In
          </button>
        </form>

        <p
          className="text-center small mt-3 mb-0"
          style={{ color: mutedColor }}
        >
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#7c3aed" }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
