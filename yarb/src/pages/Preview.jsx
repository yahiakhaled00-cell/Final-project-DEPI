import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const templates = [
  {
    id: "minimal",
    name: "Minimal",
    tagline: "Editorial · serif · airy whitespace",
  },
  {
    id: "modern",
    name: "Modern",
    tagline: "Glassmorphism · gradients · motion",
  },
  {
    id: "dark",
    name: "Developer Dark",
    tagline: "Terminal · monospace · neon green",
  },
];

function MinimalTemplate({ data }) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        color: "#111",
        padding: 48,
        minHeight: 500,
        fontFamily: "Georgia, serif",
      }}
    >
      {data.avatar && (
        <img
          src={data.avatar}
          alt={data.name}
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: 24,
          }}
        />
      )}
      <h1 style={{ fontSize: 40, fontWeight: "bold", marginBottom: 4 }}>
        {data.name || "Your Name"}
      </h1>
      <p style={{ color: "#666", fontSize: 16, marginBottom: 24 }}>
        {data.title || "Your Title"}
      </p>
      <p
        style={{
          color: "#444",
          lineHeight: 1.8,
          maxWidth: 600,
          marginBottom: 32,
        }}
      >
        {data.bio || "Your bio goes here."}
      </p>
      {data.skills?.length > 0 && (
        <div className="mb-4">
          <h3
            style={{
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: "#999",
              marginBottom: 12,
            }}
          >
            Skills
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {data.skills.map((s) => (
              <span
                key={s}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 4,
                  padding: "4px 12px",
                  fontSize: 13,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
      {data.projects?.length > 0 && (
        <div>
          <h3
            style={{
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: "#999",
              marginBottom: 12,
            }}
          >
            Projects
          </h3>
          {data.projects.slice(0, 3).map((p, i) => (
            <div
              key={i}
              style={{
                borderBottom: "1px solid #eee",
                paddingBottom: 16,
                marginBottom: 16,
              }}
            >
              <div style={{ fontWeight: "bold" }}>{p.name}</div>
              <div style={{ color: "#666", fontSize: 13 }}>{p.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ModernTemplate({ data }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        color: "white",
        padding: 48,
        minHeight: 500,
      }}
    >
      <div
        className="d-flex align-items-center gap-3 mb-3"
        style={{ flexWrap: "wrap" }}
      >
        {data.avatar && (
          <img
            src={data.avatar}
            alt={data.name}
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #7c3aed",
            }}
          />
        )}
        <div>
          <div
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.1)",
              borderRadius: 20,
              padding: "4px 12px",
              fontSize: 12,
              marginBottom: 8,
            }}
          >
            ● Available for new projects
          </div>
          <p style={{ color: "#94a3b8", marginBottom: 4 }}>Hi, I'm</p>
          <h1 style={{ fontSize: 40, fontWeight: "bold", marginBottom: 4 }}>
            {data.name || "Your Name"}
          </h1>
          <p style={{ color: "#7c3aed", fontSize: 20 }}>
            {data.title || "Your Title"}
          </p>
        </div>
      </div>
      <p
        style={{
          color: "#94a3b8",
          maxWidth: 500,
          lineHeight: 1.8,
          marginBottom: 32,
        }}
      >
        {data.bio || "Your bio goes here."}
      </p>
      <div style={{ display: "flex", gap: 12, marginBottom: 40 }}>
        {data.email && (
          <a
            href={`mailto:${data.email}`}
            style={{
              background: "#7c3aed",
              color: "white",
              padding: "10px 24px",
              borderRadius: 8,
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            ✉ Get in touch
          </a>
        )}
        {data.github && (
          <a
            href={`https://github.com/${data.github}`}
            target="_blank"
            rel="noreferrer"
            style={{
              border: "1px solid #444",
              color: "white",
              padding: "10px 24px",
              borderRadius: 8,
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            GitHub
          </a>
        )}
      </div>
      {data.skills?.length > 0 && (
        <div className="mb-4">
          <h3
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: "#64748b",
              marginBottom: 12,
            }}
          >
            Skills
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {data.skills.map((s) => (
              <span
                key={s}
                style={{
                  background: "rgba(124,58,237,0.2)",
                  border: "1px solid rgba(124,58,237,0.4)",
                  borderRadius: 6,
                  padding: "4px 12px",
                  fontSize: 13,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
      {data.projects?.length > 0 && (
        <div>
          <h3
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: "#64748b",
              marginBottom: 12,
            }}
          >
            Projects
          </h3>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            {data.projects.slice(0, 4).map((p, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 10,
                  padding: 16,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div style={{ fontWeight: "bold", marginBottom: 6 }}>
                  {p.name}
                </div>
                <div style={{ color: "#94a3b8", fontSize: 13 }}>
                  {p.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DarkTemplate({ data }) {
  return (
    <div
      style={{
        backgroundColor: "#0d1117",
        color: "#00ff41",
        padding: 48,
        minHeight: 500,
        fontFamily: "monospace",
      }}
    >
      <div className="d-flex align-items-center gap-3 mb-2">
        {data.avatar && (
          <img
            src={data.avatar}
            alt={data.name}
            style={{
              width: 56,
              height: 56,
              borderRadius: 6,
              objectFit: "cover",
              border: "1px solid #333",
            }}
          />
        )}
        <div>
          <div style={{ color: "#666" }}>$ whoami</div>
          <div style={{ fontSize: 28, fontWeight: "bold", color: "#00ff41" }}>
            {data.name || "your_name"}
          </div>
        </div>
      </div>
      <div style={{ color: "#58a6ff", marginBottom: 32 }}>
        {data.title || "// your title"}
      </div>
      <div style={{ marginBottom: 32 }}>
        <div style={{ color: "#666" }}>$ cat bio.txt</div>
        <div style={{ color: "#e6edf3", lineHeight: 1.8 }}>
          {data.bio || "Your bio goes here."}
        </div>
      </div>
      {data.skills?.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ color: "#666" }}>$ ls --skills</div>
          <div style={{ color: "#00ff41" }}>{data.skills.join(" · ")}</div>
        </div>
      )}
      {data.projects?.length > 0 && (
        <div>
          <div style={{ color: "#666" }}>$ ls projects/</div>
          {data.projects.slice(0, 4).map((p, i) => (
            <div
              key={i}
              style={{
                marginBottom: 12,
                paddingLeft: 16,
                borderLeft: "2px solid #00ff41",
              }}
            >
              <div style={{ color: "#58a6ff" }}>{p.name}/</div>
              <div style={{ color: "#8b949e", fontSize: 13 }}>
                {p.description}
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: 32, color: "#666" }}>
        {data.email && <div>$ contact --email {data.email}</div>}
        {data.github && <div>$ open github.com/{data.github}</div>}
      </div>
    </div>
  );
}

export default function Preview() {
  const navigate = useNavigate();
  const { profile, theme } = useApp();
  const [activeTemplate, setActiveTemplate] = useState(
    profile.template || "modern",
  );

  const bg = theme === "dark" ? "#0d1117" : "#f8f9fa";
  const cardColor = theme === "dark" ? "white" : "#111";
  const mutedColor = theme === "dark" ? "#94a3b8" : "#6c757d";
  const borderColor = theme === "dark" ? "#333" : "#dee2e6";
  const templateCardBg = theme === "dark" ? "#1a1a2e" : "#ffffff";

  const data = {
    name: profile.name || "",
    title: profile.title || "",
    bio: profile.bio || "",
    skills: profile.skills
      ? profile.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [],
    email: profile.email || "",
    github: profile.github || "",
    avatar: profile.avatar || null,
    projects: profile.builderProjects || [],
  };

  return (
    <div style={{ backgroundColor: bg, minHeight: "100vh", color: cardColor }}>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <div
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: 2,
                color: mutedColor,
              }}
            >
              Live preview · auto-updates
            </div>
            <h4 className="fw-bold mb-0">Your portfolio</h4>
          </div>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigate("/builder")}
          >
            Edit content →
          </button>
        </div>

        {/* Template Switcher */}
        <div className="row g-3 mb-4">
          {templates.map((t) => (
            <div className="col-12 col-md-4" key={t.id}>
              <div
                onClick={() => setActiveTemplate(t.id)}
                style={{
                  borderRadius: 12,
                  border: `2px solid ${activeTemplate === t.id ? "#7c3aed" : borderColor}`,
                  overflow: "hidden",
                  cursor: "pointer",
                  backgroundColor: templateCardBg,
                }}
              >
                <div
                  style={{
                    height: 100,
                    backgroundColor:
                      t.id === "dark"
                        ? "#0d1117"
                        : t.id === "modern"
                          ? "#0f2027"
                          : "#f8f9fa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {t.id === "minimal" && (
                    <div style={{ color: "#333", textAlign: "center" }}>
                      <div style={{ fontWeight: "bold" }}>
                        {data.name || "Your Name"}
                      </div>
                      <div style={{ fontSize: 12, color: "#666" }}>
                        {data.title || "Title"}
                      </div>
                    </div>
                  )}
                  {t.id === "modern" && (
                    <div style={{ color: "white", textAlign: "center" }}>
                      <div style={{ fontWeight: "bold" }}>
                        {data.name || "Your Name"}
                      </div>
                      <div style={{ fontSize: 12, color: "#7c3aed" }}>
                        {data.title || "Title"}
                      </div>
                    </div>
                  )}
                  {t.id === "dark" && (
                    <div
                      style={{
                        color: "#00ff41",
                        fontFamily: "monospace",
                        fontSize: 11,
                      }}
                    >
                      <div>$ whoami → {data.name || "name"}</div>
                    </div>
                  )}
                </div>
                <div className="p-2 d-flex justify-content-between align-items-center">
                  <div>
                    <div
                      className="fw-semibold small"
                      style={{ color: cardColor }}
                    >
                      {t.name}
                    </div>
                    <div style={{ fontSize: 11, color: mutedColor }}>
                      {t.tagline}
                    </div>
                  </div>
                  {activeTemplate === t.id && (
                    <span
                      className="badge"
                      style={{ backgroundColor: "#7c3aed" }}
                    >
                      Active
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Browser Frame */}
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            border: `1px solid ${borderColor}`,
          }}
        >
          <div
            style={{
              backgroundColor: theme === "dark" ? "#1a1a2e" : "#e2e8f0",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              borderBottom: `1px solid ${borderColor}`,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#ef4444",
                display: "inline-block",
              }}
            />
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#f59e0b",
                display: "inline-block",
              }}
            />
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#10b981",
                display: "inline-block",
              }}
            />
            <span
              style={{
                marginLeft: 12,
                fontSize: 12,
                color: mutedColor,
                fontFamily: "monospace",
              }}
            >
              portfoliogenie.app/@{data.github || "username"} ·{" "}
              {templates.find((t) => t.id === activeTemplate)?.name}
            </span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
              {data.email && (
                <a
                  href={`mailto:${data.email}`}
                  style={{
                    fontSize: 12,
                    color: mutedColor,
                    textDecoration: "none",
                  }}
                >
                  ✉ Email
                </a>
              )}
              {data.github && (
                <a
                  href={`https://github.com/${data.github}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: 12,
                    color: mutedColor,
                    textDecoration: "none",
                  }}
                >
                  GitHub
                </a>
              )}
            </div>
          </div>

          {activeTemplate === "minimal" && <MinimalTemplate data={data} />}
          {activeTemplate === "modern" && <ModernTemplate data={data} />}
          {activeTemplate === "dark" && <DarkTemplate data={data} />}
        </div>
      </div>
    </div>
  );
}
