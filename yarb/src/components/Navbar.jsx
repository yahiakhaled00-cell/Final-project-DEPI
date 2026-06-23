import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useApp } from "../context/AppContext";

const publicLinks = [
  { to: "/", label: "Home" },
  { to: "/#features", label: "Features" },
  { to: "/#templates", label: "Templates" },
];

const authedLinks = [
  { to: "/github", label: "GitHub" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/analysis", label: "Analysis" },
  { to: "/builder", label: "Portfolio Builder" },
  { to: "/resume", label: "Resume Builder" },
  { to: "/export", label: "Export Center" },
  { to: "/aitool", label: "AITool" },
  { to: "/career", label: "Career" },
  { to: "/skills", label: "Skills" },
];

export function Navbar() {
  const { theme, toggleTheme, isAuthenticated, user, logout } = useApp();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = isAuthenticated ? authedLinks : publicLinks;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const renderLink = (l) => {
    if (l.to.includes("#")) {
      return React.createElement(
        "a",
        {
          href: l.to,
          className: "nav-link",
          style: { color: theme === "dark" ? "#e2e8f0" : "#374151", textDecoration: "none" },
          onClick: () => setMenuOpen(false),
        },
        l.label
      );
    }
    return (
      <Link
        to={l.to}
        className={`nav-link ${pathname === l.to ? "active fw-semibold" : ""}`}
        style={{ color: theme === "dark" ? "#e2e8f0" : "#374151" }}
        onClick={() => setMenuOpen(false)}
      >
        {l.label}
      </Link>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm" style={{ backgroundColor: theme === "dark" ? "#1a1a2e" : "#ffffff" }}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" style={{ color: "#7c3aed" }}>
          ✦ PortfolioGenie
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {links.map((l) => (
              <li className="nav-item" key={l.to}>
                {renderLink(l)}
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-2">
            <button
              onClick={toggleTheme}
              className="btn btn-sm btn-outline-secondary rounded-circle"
              style={{ width: 36, height: 36 }}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            {!isAuthenticated ? (
              <>
                <Link to="/signin" className="btn btn-sm btn-outline-secondary">Login</Link>
                <Link to="/signup" className="btn btn-sm" style={{ backgroundColor: "#7c3aed", color: "white" }}>Sign Up</Link>
              </>
            ) : (
              <div className="dropdown">
                <button className="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                  {(user?.name ?? "U").slice(0, 1).toUpperCase()} {user?.name}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                  <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}