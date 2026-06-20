import { Link } from "react-router-dom";

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
  return (
    <footer className="mt-5 pt-5 border-top" style={{ backgroundColor: "#1a1a2e", color: "#e2e8f0" }}>
      <div className="container">
        <div className="row g-4 pb-4">
          <div className="col-12 col-md-4">
            <div className="fw-bold fs-5 mb-2" style={{ color: "#7c3aed" }}>✦ PortfolioGenie</div>
            <p className="text-secondary small">Build a professional portfolio in minutes with AI.</p>
          </div>

          {columns.map(col => (
            <div className="col-6 col-md" key={col.title}>
              <div className="fw-semibold mb-3 text-white">{col.title}</div>
              <ul className="list-unstyled">
                {col.items.map(i => (
                  <li key={i.to} className="mb-2">
                    <Link to={i.to} className="text-secondary text-decoration-none small" style={{ transition: "color 0.2s" }}
                      onMouseEnter={e => e.target.style.color = "#fff"}
                      onMouseLeave={e => e.target.style.color = ""}
                    >
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-top border-secondary py-4 d-flex flex-wrap justify-content-between align-items-center gap-3">
          <span className="text-secondary small">
            © {new Date().getFullYear()} PortfolioGenie AI. Crafted for developers.
          </span>
          <div className="d-flex gap-3">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-secondary text-decoration-none small">GitHub</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-secondary text-decoration-none small">Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-secondary text-decoration-none small">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}