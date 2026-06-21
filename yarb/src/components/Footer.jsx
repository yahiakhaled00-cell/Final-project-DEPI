import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const columns = [
  {
    title: "Product",
    items: [
      { label: "Features", to: "/features" },
      { label: "Templates", to: "/templates" },
      { label: "Dashboard", to: "/dashboard" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Contact", to: "/contact" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Login", to: "/signin" },
      { label: "Sign Up", to: "/signup" },
      { label: "Profile", to: "/profile" },
    ],
  },
];

export function Footer() {
  const { theme } = useApp();

  const bg = theme === "dark" ? "#1a1a2e" : "#f1f5f9";
  const color = theme === "dark" ? "#e2e8f0" : "#374151";
  const mutedColor = theme === "dark" ? "#94a3b8" : "#6c757d";
  const borderColor = theme === "dark" ? "#2d2d4e" : "#dee2e6";
  const titleColor = theme === "dark" ? "white" : "#111";

  return (
    <footer
      className="mt-5 pt-5"
      style={{
        backgroundColor: bg,
        color,
        borderTop: `1px solid ${borderColor}`,
      }}
    >
      <div className="container">
        <div className="row g-4 pb-4">
          <div className="col-12 col-md-4">
            <div className="fw-bold fs-5 mb-2" style={{ color: "#7c3aed" }}>
              ✦ PortfolioGenie
            </div>
            <p style={{ color: mutedColor }} className="small">
              Build a professional portfolio in minutes with AI.
            </p>
          </div>

          {columns.map((col) => (
            <div className="col-6 col-md" key={col.title}>
              <div className="fw-semibold mb-3" style={{ color: titleColor }}>
                {col.title}
              </div>
              <ul className="list-unstyled">
                {col.items.map((i) => (
                  <li key={i.to} className="mb-2">
                    <Link
                      to={i.to}
                      className="text-decoration-none small"
                      style={{ color: mutedColor, transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.target.style.color = titleColor)}
                      onMouseLeave={(e) => (e.target.style.color = mutedColor)}
                    >
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="py-4 d-flex flex-wrap justify-content-between align-items-center gap-3"
          style={{ borderTop: `1px solid ${borderColor}` }}
        >
          <span style={{ color: mutedColor }} className="small">
            © {new Date().getFullYear()} PortfolioGenie AI. Crafted for
            developers.
          </span>
          <div className="d-flex gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none small"
              style={{ color: mutedColor }}
            >
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none small"
              style={{ color: mutedColor }}
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none small"
              style={{ color: mutedColor }}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
