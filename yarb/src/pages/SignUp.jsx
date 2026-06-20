import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function SignUp() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    login({ name: form.name, email: form.email });
    navigate("/dashboard");
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: 440, borderRadius: 16 }}>

        <div className="text-center mb-4">
          <div className="fw-bold fs-4 mb-1" style={{ color: "#7c3aed" }}>✦ PortfolioGenie</div>
          <h5 className="fw-bold">Create your account</h5>
          <p className="text-muted small">Start building your portfolio today</p>
        </div>

        {error && <div className="alert alert-danger py-2 small">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              style={{ borderRadius: 10 }}
            />
          </div>

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

          <div className="mb-3">
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

          <div className="mb-4">
            <label className="form-label small fw-semibold">Confirm Password</label>
            <input
              type="password"
              name="confirm"
              className="form-control"
              placeholder="••••••••"
              value={form.confirm}
              onChange={handleChange}
              style={{ borderRadius: 10, borderColor: form.confirm && form.password !== form.confirm ? "#dc3545" : "" }}
            />
            {form.confirm && form.password !== form.confirm && (
              <div className="text-danger small mt-1">Passwords do not match</div>
            )}
          </div>

          <button
            type="submit"
            className="btn w-100 fw-semibold"
            style={{ backgroundColor: "#7c3aed", color: "white", borderRadius: 10 }}
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-muted small mt-3 mb-0">
          Already have an account?{" "}
          <Link to="/signin" style={{ color: "#7c3aed" }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}