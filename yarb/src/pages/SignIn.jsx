import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function SignIn() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    login({ name: form.email.split("@")[0], email: form.email });
    navigate("/dashboard");
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: 440, borderRadius: 16 }}>

        <div className="text-center mb-4">
          <div className="fw-bold fs-4 mb-1" style={{ color: "#7c3aed" }}>✦ PortfolioGenie</div>
          <h5 className="fw-bold">Welcome back</h5>
          <p className="text-muted small">Sign in to your account</p>
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
              style={{ borderRadius: 10 }}
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
              style={{ borderRadius: 10 }}
            />
          </div>

          <div className="text-end mb-4">
            <Link to="/forgot-password" className="small" style={{ color: "#7c3aed" }}>Forgot password?</Link>
          </div>

          <button
            type="submit"
            className="btn w-100 fw-semibold"
            style={{ backgroundColor: "#7c3aed", color: "white", borderRadius: 10 }}
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-muted small mt-3 mb-0">
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#7c3aed" }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}   