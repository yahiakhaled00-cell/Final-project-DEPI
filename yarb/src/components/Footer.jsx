import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export function Footer() {
  const { isAuthenticated } = useApp();
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const accountItems = isAuthenticated
    ? [
        { label: "Profile", to: "/profile" },
        { label: "Dashboard", to: "/dashboard" },
      ]
    : [
        { label: "Login", to: "/signin" },
        { label: "Sign Up", to: "/signup" },
      ];

  const toolItems = [
    { label: "GitHub", to: "/github" },
    { label: "Dashboard", to: "/dashboard" },
    { label: "Analysis", to: "/analysis" },
    { label: "Portfolio Builder", to: "/builder" },
    { label: "Resume Builder", to: "/resume" },
    { label: "Export Center", to: "/export" },
    { label: "AI Tool", to: "/aitool" },
    { label: "Career", to: "/career" },
    { label: "Skills", to: "/skills" },
  ];

  return (
    <footer className="mt-5 pt-5 border-top" style={{ backgroundColor: "#1a1a2e", color: "#e2e8f0" }}>
      <div className="container">
        <div className="row g-4 pb-4">
          <div className="col-12 col-md-3">
            <div className="fw-bold fs-5 mb-2" style={{ color: "#7c3aed" }}>✦ PortfolioGenie</div>
            <p className="text-secondary small">Build a professional portfolio in minutes with AI.</p>
          </div>

          {/* Product */}
          <div className="col-6 col-md">
            <div className="fw-semibold mb-3 text-white">Product</div>
            <ul className="list-unstyled">
              <li className="mb-2">
                <span onClick={() => scrollToSection("features")} className="text-secondary small"
                  style={{ cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#fff"}
                  onMouseLeave={e => e.target.style.color = ""}>
                  Features
                </span>
              </li>
              <li className="mb-2">
                <span onClick={() => scrollToSection("templates")} className="text-secondary small"
                  style={{ cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#fff"}
                  onMouseLeave={e => e.target.style.color = ""}>
                  Templates
                </span>
              </li>
            </ul>
          </div>

          {/* Tools - يظهر بس لو مسجل دخول */}
          {isAuthenticated && (
            <div className="col-6 col-md">
              <div className="fw-semibold mb-3 text-white">Tools</div>
              <ul className="list-unstyled">
                {toolItems.map(i => (
                  <li key={i.to} className="mb-2">
                    <Link to={i.to} className="text-secondary text-decoration-none small"
                      style={{ transition: "color 0.2s" }}
                      onMouseEnter={e => e.target.style.color = "#fff"}
                      onMouseLeave={e => e.target.style.color = ""}>
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resources */}
          <div className="col-6 col-md">
            <div className="fw-semibold mb-3 text-white">Resources</div>
            <ul className="list-unstyled">
              {[
                { label: "Contact", to: "/contact" },
                { label: "Privacy Policy", to: "/privacy" },
                { label: "Terms of Service", to: "/terms" },
              ].map(i => (
                <li key={i.to} className="mb-2">
                  <Link to={i.to} className="text-secondary text-decoration-none small"
                    style={{ transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "#fff"}
                    onMouseLeave={e => e.target.style.color = ""}>
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div className="col-6 col-md">
            <div className="fw-semibold mb-3 text-white">Account</div>
            <ul className="list-unstyled">
              {accountItems.map(i => (
                <li key={i.to} className="mb-2">
                  <Link to={i.to} className="text-secondary text-decoration-none small"
                    style={{ transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "#fff"}
                    onMouseLeave={e => e.target.style.color = ""}>
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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