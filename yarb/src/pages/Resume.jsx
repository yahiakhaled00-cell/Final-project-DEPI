import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function Resume() {
  const { githubData } = useApp();

  const [form, setForm] = useState({
    name: githubData?.user?.name || githubData?.user?.login || "",
    title: "",
    email: githubData?.user?.email || "",
    phone: "",
    location: githubData?.user?.location || "",
    skills: githubData?.languages?.join(", ") || "",
  });

  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState(
    githubData?.repos?.slice(0, 4).map(r => ({
      name: r.name,
      year: new Date(r.created_at).getFullYear().toString(),
      desc: r.description || "",
    })) || []
  );

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addExperience = () => setExperience([...experience, { role: "", company: "", from: "", to: "", desc: "" }]);
  const removeExperience = (i) => setExperience(experience.filter((_, idx) => idx !== i));
  const updateExperience = (i, field, val) => {
    const updated = [...experience];
    updated[i][field] = val;
    setExperience(updated);
  };

  const addEducation = () => setEducation([...education, { degree: "", school: "", from: "", to: "", desc: "" }]);
  const removeEducation = (i) => setEducation(education.filter((_, idx) => idx !== i));
  const updateEducation = (i, field, val) => {
    const updated = [...education];
    updated[i][field] = val;
    setEducation(updated);
  };

  const addProject = () => setProjects([...projects, { name: "", year: "", desc: "" }]);
  const removeProject = (i) => setProjects(projects.filter((_, idx) => idx !== i));
  const updateProject = (i, field, val) => {
    const updated = [...projects];
    updated[i][field] = val;
    setProjects(updated);
  };

  const handleDownload = () => {
    const content = `
${form.name}
${form.title}
${form.email} · ${form.phone} · ${form.location}

SKILLS
${form.skills}

EXPERIENCE
${experience.map(e => `${e.role} @ ${e.company} · ${e.from}-${e.to}\n${e.desc}`).join("\n\n")}

PROJECTS
${projects.map(p => `${p.name} (${p.year})\n${p.desc}`).join("\n\n")}

EDUCATION
${education.map(e => `${e.degree} — ${e.school} · ${e.from}-${e.to}\n${e.desc}`).join("\n\n")}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.name || "resume"}.txt`;
    a.click();
  };

  const inputStyle = {
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
    borderRadius: 8,
    color: "white",
    padding: "8px 12px",
    width: "100%",
    fontSize: 13,
  };

  const sectionStyle = {
    backgroundColor: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    color: "white",
  };

  const skills = form.skills.split(",").map(s => s.trim()).filter(Boolean);

  return (
    <div className="container-fluid py-4 px-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1" style={{ color: "white" }}>Resume builder</h4>
          <p className="mb-0" style={{ color: "#64748b", fontSize: 13 }}>Fill once, export forever.</p>
        </div>
        <button onClick={handleDownload} className="btn fw-semibold" style={{ backgroundColor: "#7c3aed", color: "white", borderRadius: 10 }}>
          ⬇ Export PDF
        </button>
      </div>

      <div className="row g-4">
        {/* Form Side */}
        <div className="col-12 col-lg-5">

          {/* Personal Info */}
          <div style={sectionStyle}>
            <h6 className="fw-bold mb-3">Personal info</h6>
            <div className="row g-2">
              <div className="col-6">
                <input name="name" style={inputStyle} placeholder="Full Name" value={form.name} onChange={handleChange} />
              </div>
              <div className="col-6">
                <input name="title" style={inputStyle} placeholder="Job Title" value={form.title} onChange={handleChange} />
              </div>
              <div className="col-6">
                <input name="email" style={inputStyle} placeholder="Email" value={form.email} onChange={handleChange} />
              </div>
              <div className="col-6">
                <input name="phone" style={inputStyle} placeholder="Phone" value={form.phone} onChange={handleChange} />
              </div>
              <div className="col-12">
                <input name="location" style={inputStyle} placeholder="Location" value={form.location} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div style={sectionStyle}>
            <h6 className="fw-bold mb-3">Skills</h6>
            <textarea name="skills" style={{ ...inputStyle, resize: "vertical" }} rows={3} placeholder="React, TypeScript, Node.js..." value={form.skills} onChange={handleChange} />
          </div>

          {/* Experience */}
          <div style={sectionStyle}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0">Experience</h6>
              <button className="btn btn-sm" style={{ backgroundColor: "#1e293b", color: "white", borderRadius: 8 }} onClick={addExperience}>+</button>
            </div>
            {experience.map((exp, i) => (
              <div key={i} className="mb-3 p-3" style={{ backgroundColor: "#1a2744", borderRadius: 10 }}>
                <div className="row g-2 mb-2">
                  <div className="col-6">
                    <input style={inputStyle} placeholder="Job Title" value={exp.role} onChange={e => updateExperience(i, "role", e.target.value)} />
                  </div>
                  <div className="col-6">
                    <input style={inputStyle} placeholder="Company · Date" value={exp.company} onChange={e => updateExperience(i, "company", e.target.value)} />
                  </div>
                </div>
                <textarea style={{ ...inputStyle, resize: "vertical" }} rows={2} placeholder="Description..." value={exp.desc} onChange={e => updateExperience(i, "desc", e.target.value)} />
                <div className="text-end mt-1">
                  <button className="btn btn-sm btn-outline-danger" onClick={() => removeExperience(i)}>🗑</button>
                </div>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div style={sectionStyle}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0">Projects</h6>
              <button className="btn btn-sm" style={{ backgroundColor: "#1e293b", color: "white", borderRadius: 8 }} onClick={addProject}>+</button>
            </div>
            {projects.map((p, i) => (
              <div key={i} className="mb-3 p-3" style={{ backgroundColor: "#1a2744", borderRadius: 10 }}>
                <div className="row g-2 mb-2">
                  <div className="col-8">
                    <input style={inputStyle} placeholder="Project Name" value={p.name} onChange={e => updateProject(i, "name", e.target.value)} />
                  </div>
                  <div className="col-4">
                    <input style={inputStyle} placeholder="Year" value={p.year} onChange={e => updateProject(i, "year", e.target.value)} />
                  </div>
                </div>
                <textarea style={{ ...inputStyle, resize: "vertical" }} rows={2} placeholder="Description..." value={p.desc} onChange={e => updateProject(i, "desc", e.target.value)} />
                <div className="text-end mt-1">
                  <button className="btn btn-sm btn-outline-danger" onClick={() => removeProject(i)}>🗑</button>
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div style={sectionStyle}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0">Education</h6>
              <button className="btn btn-sm" style={{ backgroundColor: "#1e293b", color: "white", borderRadius: 8 }} onClick={addEducation}>+</button>
            </div>
            {education.map((edu, i) => (
              <div key={i} className="mb-3 p-3" style={{ backgroundColor: "#1a2744", borderRadius: 10 }}>
                <div className="row g-2 mb-2">
                  <div className="col-6">
                    <input style={inputStyle} placeholder="Degree" value={edu.degree} onChange={e => updateEducation(i, "degree", e.target.value)} />
                  </div>
                  <div className="col-6">
                    <input style={inputStyle} placeholder="School · Year" value={edu.school} onChange={e => updateEducation(i, "school", e.target.value)} />
                  </div>
                </div>
                <textarea style={{ ...inputStyle, resize: "vertical" }} rows={2} placeholder="Description..." value={edu.desc} onChange={e => updateEducation(i, "desc", e.target.value)} />
                <div className="text-end mt-1">
                  <button className="btn btn-sm btn-outline-danger" onClick={() => removeEducation(i)}>🗑</button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Preview Side */}
        <div className="col-12 col-lg-7">
          <div style={{ position: "sticky", top: 80 }}>
            <div style={{ backgroundColor: "white", borderRadius: 16, padding: 40, color: "#111", minHeight: 500 }}>

              <h2 style={{ fontWeight: "bold", marginBottom: 4 }}>{form.name || "Your Name"}</h2>
              <p style={{ color: "#555", marginBottom: 4 }}>{form.title || "Your Title"}</p>
              <p style={{ color: "#888", fontSize: 13, marginBottom: 20 }}>
                {[form.email, form.phone, form.location].filter(Boolean).join(" · ")}
              </p>
              <hr style={{ borderColor: "#eee" }} />

              {skills.length > 0 && (
                <div className="mb-4">
                  <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: "#999", marginBottom: 10 }}>Skills</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {skills.map(s => (
                      <span key={s} style={{ border: "1px solid #ddd", borderRadius: 6, padding: "3px 10px", fontSize: 13 }}>{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {experience.length > 0 && (
                <div className="mb-4">
                  <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: "#999", marginBottom: 10 }}>Experience</div>
                  {experience.map((exp, i) => (
                    <div key={i} className="mb-3">
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontWeight: "bold" }}>{exp.role || "Job Title"}</span>
                        <span style={{ color: "#888", fontSize: 12 }}>{exp.company}</span>
                      </div>
                      <p style={{ color: "#555", fontSize: 13, marginBottom: 0 }}>{exp.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {projects.length > 0 && (
                <div className="mb-4">
                  <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: "#999", marginBottom: 10 }}>Projects</div>
                  {projects.map((p, i) => (
                    <div key={i} className="mb-3">
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontWeight: "bold" }}>{p.name || "Project Name"}</span>
                        <span style={{ color: "#888", fontSize: 12 }}>{p.year}</span>
                      </div>
                      <p style={{ color: "#555", fontSize: 13, marginBottom: 0 }}>{p.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {education.length > 0 && (
                <div className="mb-4">
                  <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: "#999", marginBottom: 10 }}>Education</div>
                  {education.map((edu, i) => (
                    <div key={i} className="mb-3">
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontWeight: "bold" }}>{edu.degree || "Degree"}</span>
                        <span style={{ color: "#888", fontSize: 12 }}>{edu.school}</span>
                      </div>
                      <p style={{ color: "#555", fontSize: 13, marginBottom: 0 }}>{edu.desc}</p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}