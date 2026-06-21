import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function Profile() {
  const { githubData, profile, setProfile } = useApp();

  const [avatar, setAvatar] = useState(profile.avatar || null);
  const [form, setForm] = useState({
    name: profile.name || githubData?.user?.name || "",
    title: profile.title || "",
    bio: profile.bio || githubData?.user?.bio || "",
    email: profile.email || "",
    phone: profile.phone || "",
    location: profile.location || githubData?.user?.location || "",
    github: profile.github || githubData?.user?.login || "",
    linkedin: profile.linkedin || "",
    twitter: profile.twitter || "",
    website: profile.website || githubData?.user?.blog || "",
    skills: profile.skills || githubData?.languages?.join(", ") || "",
  });

  const [experience, setExperience] = useState(profile.experience || []);
  const [education, setEducation] = useState(profile.education || []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfile({ ...form, avatar, experience, education });
    alert("Profile saved! ✅");
  };

  const addExperience = () => setExperience([...experience, { company: "", role: "", from: "", to: "", desc: "" }]);
  const removeExperience = (i) => setExperience(experience.filter((_, idx) => idx !== i));
  const updateExperience = (i, field, val) => {
    const updated = [...experience];
    updated[i][field] = val;
    setExperience(updated);
  };

  const addEducation = () => setEducation([...education, { school: "", degree: "", from: "", to: "" }]);
  const removeEducation = (i) => setEducation(education.filter((_, idx) => idx !== i));
  const updateEducation = (i, field, val) => {
    const updated = [...education];
    updated[i][field] = val;
    setEducation(updated);
  };

  const inputStyle = {
    borderRadius: 8,
    backgroundColor: "#0f172a",
    color: "white",
    border: "1px solid #333",
  };

  return (
    <div className="container py-5" style={{ maxWidth: 900 }}>
      <h4 className="fw-bold mb-1">Profile</h4>
      <p className="text-muted mb-4">Changes update your portfolio preview and resume instantly.</p>

      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6">
          <div className="card p-4" style={{ borderRadius: 16, backgroundColor: "#1a1a2e", color: "white" }}>
            <h6 className="fw-bold mb-3">Personal info</h6>

            <div className="d-flex align-items-center gap-3 mb-3">
              <div style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", backgroundColor: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: "white" }}>
                {avatar
                  ? <img src={avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <span>{form.name ? form.name[0].toUpperCase() : "?"}</span>
                }
              </div>
              <label className="btn btn-sm btn-outline-secondary" style={{ cursor: "pointer" }}>
                Upload image
                <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
              </label>
            </div>

            <div className="mb-3">
              <label className="form-label small text-uppercase" style={{ color: "#94a3b8", fontSize: 11 }}>Full Name</label>
              <input name="name" className="form-control" style={inputStyle} value={form.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label small text-uppercase" style={{ color: "#94a3b8", fontSize: 11 }}>Title</label>
              <input name="title" className="form-control" placeholder="e.g. Full Stack Developer" style={inputStyle} value={form.title} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label small text-uppercase" style={{ color: "#94a3b8", fontSize: 11 }}>Bio</label>
              <textarea name="bio" className="form-control" rows={3} style={inputStyle} value={form.bio} onChange={handleChange} />
            </div>
            <div className="row g-2 mb-3">
              <div className="col">
                <label className="form-label small text-uppercase" style={{ color: "#94a3b8", fontSize: 11 }}>Email</label>
                <input name="email" className="form-control" style={inputStyle} value={form.email} onChange={handleChange} />
              </div>
              <div className="col">
                <label className="form-label small text-uppercase" style={{ color: "#94a3b8", fontSize: 11 }}>Phone</label>
                <input name="phone" className="form-control" style={inputStyle} value={form.phone} onChange={handleChange} />
              </div>
            </div>
            <div className="mb-2">
              <label className="form-label small text-uppercase" style={{ color: "#94a3b8", fontSize: 11 }}>Location</label>
              <input name="location" className="form-control" style={inputStyle} value={form.location} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card p-4" style={{ borderRadius: 16, backgroundColor: "#1a1a2e", color: "white" }}>
            <h6 className="fw-bold mb-3">Social links</h6>
            {[
              { label: "GITHUB USERNAME", name: "github" },
              { label: "LINKEDIN URL", name: "linkedin" },
              { label: "TWITTER URL", name: "twitter" },
              { label: "PERSONAL WEBSITE", name: "website" },
            ].map(f => (
              <div className="mb-3" key={f.name}>
                <label className="form-label small text-uppercase" style={{ color: "#94a3b8", fontSize: 11 }}>{f.label}</label>
                <input name={f.name} className="form-control" style={inputStyle} value={form[f.name]} onChange={handleChange} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="card p-4 mb-4" style={{ borderRadius: 16, backgroundColor: "#1a1a2e", color: "white" }}>
        <h6 className="fw-bold mb-3">Skills</h6>
        <textarea name="skills" className="form-control mb-2" rows={2} placeholder="react, html, css..." style={inputStyle} value={form.skills} onChange={handleChange} />
        <div className="d-flex flex-wrap gap-2">
          {form.skills.split(",").map(s => s.trim()).filter(Boolean).map(s => (
            <span key={s} className="badge" style={{ backgroundColor: "#1e293b", color: "#e2e8f0", borderRadius: 8, padding: "6px 12px" }}>{s}</span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="card p-4 mb-4" style={{ borderRadius: 16, backgroundColor: "#1a1a2e", color: "white" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold mb-0">Experience</h6>
          <button className="btn btn-sm btn-outline-secondary" onClick={addExperience}>+ Add</button>
        </div>
        {experience.map((exp, i) => (
          <div key={i} className="p-3 mb-3 rounded" style={{ backgroundColor: "#0f172a", border: "1px solid #333" }}>
            <div className="row g-2 mb-2">
              <div className="col">
                <input className="form-control" placeholder="Company" style={inputStyle} value={exp.company} onChange={e => updateExperience(i, "company", e.target.value)} />
              </div>
              <div className="col">
                <input className="form-control" placeholder="Role" style={inputStyle} value={exp.role} onChange={e => updateExperience(i, "role", e.target.value)} />
              </div>
            </div>
            <div className="row g-2 mb-2">
              <div className="col">
                <input className="form-control" placeholder="From (e.g. 2022)" style={inputStyle} value={exp.from} onChange={e => updateExperience(i, "from", e.target.value)} />
              </div>
              <div className="col">
                <input className="form-control" placeholder="To (e.g. 2024)" style={inputStyle} value={exp.to} onChange={e => updateExperience(i, "to", e.target.value)} />
              </div>
            </div>
            <textarea className="form-control mb-2" rows={2} placeholder="Description..." style={inputStyle} value={exp.desc} onChange={e => updateExperience(i, "desc", e.target.value)} />
            <div className="text-end">
              <button className="btn btn-sm btn-outline-danger" onClick={() => removeExperience(i)}>🗑 Remove</button>
            </div>
          </div>
        ))}
        {experience.length === 0 && <p className="text-muted small">No experience added yet.</p>}
      </div>

      {/* Education */}
      <div className="card p-4 mb-4" style={{ borderRadius: 16, backgroundColor: "#1a1a2e", color: "white" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold mb-0">Education</h6>
          <button className="btn btn-sm btn-outline-secondary" onClick={addEducation}>+ Add</button>
        </div>
        {education.map((edu, i) => (
          <div key={i} className="p-3 mb-3 rounded" style={{ backgroundColor: "#0f172a", border: "1px solid #333" }}>
            <div className="row g-2 mb-2">
              <div className="col">
                <input className="form-control" placeholder="School" style={inputStyle} value={edu.school} onChange={e => updateEducation(i, "school", e.target.value)} />
              </div>
              <div className="col">
                <input className="form-control" placeholder="Degree" style={inputStyle} value={edu.degree} onChange={e => updateEducation(i, "degree", e.target.value)} />
              </div>
            </div>
            <div className="row g-2 mb-2">
              <div className="col">
                <input className="form-control" placeholder="From" style={inputStyle} value={edu.from} onChange={e => updateEducation(i, "from", e.target.value)} />
              </div>
              <div className="col">
                <input className="form-control" placeholder="To" style={inputStyle} value={edu.to} onChange={e => updateEducation(i, "to", e.target.value)} />
              </div>
            </div>
            <div className="text-end">
              <button className="btn btn-sm btn-outline-danger" onClick={() => removeEducation(i)}>🗑 Remove</button>
            </div>
          </div>
        ))}
        {education.length === 0 && <p className="text-muted small">No education added yet.</p>}
      </div>

      <button
        className="btn fw-semibold w-100"
        style={{ backgroundColor: "#7c3aed", color: "white", borderRadius: 10 }}
        onClick={handleSave}
      >
        Save Profile
      </button>
    </div>
  );
}