import React, { useState } from "react";
import {
  User, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap,
  BookOpen, Award, Globe, Github, Linkedin, Twitter,
  Camera, Save, X, Edit2, Check, Shield, Star
} from "lucide-react";

const Profile = ({ user: initialUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [newSkill, setNewSkill] = useState("");

  const [user, setUser] = useState(initialUser || {
    name: "Nhim Dara",
    email: "daracombodia54@gmail.com",
    avatar: "https://ui-avatars.com/api/?name=Nhim+Dara&background=6366f1&color=fff&size=128",
    role: "Student",
    joinDate: "2026-02-15",
    progress: 68,
    coursesEnrolled: 3,
    certificates: 2,
    achievements: ["New Member", "Fast Learner"],
    phone: "+855 12 345 678",
    location: "Phnom Penh, Cambodia",
    bio: "Passionate learner and aspiring web developer. Currently mastering React and modern web technologies.",
    occupation: "Student",
    education: "Computer Science",
    website: "daracombodia.dev",
    github: "daracombodia",
    linkedin: "nhim-dara",
    twitter: "@daracombodia",
    skills: ["React", "JavaScript", "HTML/CSS", "Node.js"],
    languages: ["Khmer (Native)", "English (Fluent)"],
  });

  const [editForm, setEditForm] = useState({ ...user });

  const handleInput = (e) => setEditForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = () => {
    setUser(editForm);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => { setEditForm({ ...user }); setIsEditing(false); };

  const addSkill = () => {
    if (newSkill.trim() && !editForm.skills.includes(newSkill.trim())) {
      setEditForm((p) => ({ ...p, skills: [...p.skills, newSkill.trim()] }));
      setNewSkill("");
    }
  };

  const removeSkill = (s) => setEditForm((p) => ({ ...p, skills: p.skills.filter((x) => x !== s) }));

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "skills", label: "Skills", icon: Star },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Playfair+Display:wght@700;800&display=swap');
        .prof-root { font-family: 'DM Sans', sans-serif; background: linear-gradient(160deg, #f8f8ff, #f0f0fe); }
        .prof-heading { font-family: 'Playfair Display', serif; }
        .prof-card { background: white; border-radius: 24px; border: 1px solid #f0f0f8; box-shadow: 0 2px 20px rgba(0,0,0,0.04); }
        .form-field {
          width: 100%; padding: 10px 14px; border-radius: 12px; font-size: 14px; outline: none;
          border: 1.5px solid #e5e7eb; background: #fafafa; transition: all 0.15s; font-family: 'DM Sans', sans-serif;
        }
        .form-field:focus { border-color: #a5b4fc; background: white; box-shadow: 0 0 0 3px rgba(165,180,252,0.2); }
        .tab-btn {
          display: flex; align-items: center; gap: 8px; padding: 8px 18px;
          border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer;
          border: none; background: transparent; transition: all 0.15s; font-family: 'DM Sans', sans-serif;
        }
        .tab-btn.active { background: #eef2ff; color: #4f46e5; }
        .tab-btn:not(.active) { color: #6b7280; }
        .tab-btn:not(.active):hover { background: #f9fafb; color: #374151; }
        .info-row { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f9fafb; }
        .info-row:last-child { border-bottom: none; }
        .skill-chip {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 14px; border-radius: 99px; font-size: 13px; font-weight: 600;
          background: #eef2ff; color: #4f46e5; border: 1.5px solid #c7d2fe;
          transition: all 0.15s;
        }
        .skill-chip:hover { background: #e0e7ff; }
        .success-toast {
          position: fixed; top: 80px; right: 20px; z-index: 1000;
          background: white; border: 1.5px solid #a7f3d0;
          border-radius: 14px; padding: 12px 20px;
          display: flex; align-items: center; gap: 10px;
          box-shadow: 0 8px 32px rgba(16,185,129,0.15);
          animation: slideInRight 0.3s ease;
        }
        @keyframes slideInRight { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .primary-btn {
          padding: 10px 20px; border-radius: 14px; font-size: 14px; font-weight: 600;
          background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border: none; cursor: pointer;
          box-shadow: 0 4px 16px rgba(99,102,241,0.3); transition: all 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .primary-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .ghost-btn {
          padding: 10px 20px; border-radius: 14px; font-size: 14px; font-weight: 600;
          background: white; color: #374151; border: 1.5px solid #e5e7eb; cursor: pointer;
          transition: all 0.15s; font-family: 'DM Sans', sans-serif;
        }
        .ghost-btn:hover { border-color: #a5b4fc; color: #4f46e5; }
      `}</style>

      {showSuccess && (
        <div className="success-toast">
          <Check className="h-5 w-5 text-green-500" />
          <p className="text-sm font-semibold text-green-700">Profile updated successfully!</p>
        </div>
      )}

      <div className="prof-root min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-semibold text-indigo-500 uppercase tracking-widest mb-1">Account</p>
              <h1 className="prof-heading text-4xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-500 mt-1">Manage your personal information</p>
            </div>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="primary-btn inline-flex items-center gap-2">
                <Edit2 className="h-4 w-4" />Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button onClick={handleCancel} className="ghost-btn">Cancel</button>
                <button onClick={handleSave} className="primary-btn inline-flex items-center gap-2">
                  <Save className="h-4 w-4" />Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}>
                  <Icon className="h-4 w-4" />{tab.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="prof-card overflow-hidden sticky top-24">
                {/* Cover */}
                <div className="h-24 relative" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa)" }}>
                  <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px), radial-gradient(circle at 70% 50%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                </div>

                <div className="px-6 pb-6">
                  <div className="flex justify-center">
                    <div className="relative -mt-12">
                      <img src={user.avatar} alt={user.name}
                        className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-xl" />
                      {!isEditing && (
                        <button className="absolute -bottom-1 -right-1 p-1.5 rounded-xl text-white"
                          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                          <Camera className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="text-center mt-4 mb-5">
                    <h2 className="prof-heading text-xl font-bold text-gray-900">{user.name}</h2>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1"
                      style={{ background: "#eef2ff", color: "#4f46e5" }}>{user.role}</span>
                    <p className="text-xs text-gray-400 mt-1">
                      Joined {new Date(user.joinDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 py-4" style={{ borderTop: "1px solid #f3f4f6", borderBottom: "1px solid #f3f4f6" }}>
                    {[
                      { label: "Courses", value: user.coursesEnrolled || 0, color: "#6366f1" },
                      { label: "Certificates", value: user.certificates || 0, color: "#10b981" },
                      { label: "Progress", value: `${user.progress || 0}%`, color: "#f59e0b" },
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
                        <p className="text-xs text-gray-500">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Achievements */}
                  {user.achievements?.length > 0 && (
                    <div className="mt-5">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Achievements</p>
                      <div className="flex flex-wrap gap-1.5">
                        {user.achievements.map((ach) => (
                          <span key={ach} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                            style={{ background: "#fffbeb", color: "#92400e", border: "1px solid #fde68a" }}>
                            ✦ {ach}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-5">
              {activeTab === "profile" && (
                <>
                  {/* Personal Info */}
                  <div className="prof-card p-6">
                    <h3 className="text-base font-bold text-gray-900 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {[
                        { icon: User, label: "Full Name", name: "name", value: user.name },
                        { icon: Mail, label: "Email", name: "email", value: user.email, type: "email" },
                        { icon: Phone, label: "Phone", name: "phone", value: user.phone },
                        { icon: MapPin, label: "Location", name: "location", value: user.location },
                        { icon: Briefcase, label: "Occupation", name: "occupation", value: user.occupation },
                        { icon: GraduationCap, label: "Education", name: "education", value: user.education },
                      ].map((field) => {
                        const Icon = field.icon;
                        return (
                          <div key={field.name}>
                            <label className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                              <Icon className="h-3 w-3" />{field.label}
                            </label>
                            {isEditing ? (
                              <input type={field.type || "text"} name={field.name}
                                value={editForm[field.name] || ""}
                                onChange={handleInput}
                                className="form-field" />
                            ) : (
                              <p className="text-sm text-gray-800 font-medium">{field.value || "—"}</p>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Bio</label>
                      {isEditing ? (
                        <textarea name="bio" value={editForm.bio || ""} onChange={handleInput} rows={3}
                          className="form-field resize-none" />
                      ) : (
                        <p className="text-sm text-gray-700 leading-relaxed">{user.bio}</p>
                      )}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="prof-card p-6">
                    <h3 className="text-base font-bold text-gray-900 mb-4">Social & Web</h3>
                    <div className="space-y-3">
                      {[
                        { icon: Globe, label: "Website", name: "website" },
                        { icon: Github, label: "GitHub", name: "github" },
                        { icon: Linkedin, label: "LinkedIn", name: "linkedin" },
                        { icon: Twitter, label: "Twitter", name: "twitter" },
                      ].map((s) => {
                        const Icon = s.icon;
                        return (
                          <div key={s.name} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ background: "#f3f4f6" }}>
                              <Icon className="h-4 w-4 text-gray-500" />
                            </div>
                            {isEditing ? (
                              <input type="text" name={s.name} value={editForm[s.name] || ""}
                                onChange={handleInput} placeholder={s.label} className="form-field flex-1" />
                            ) : (
                              <span className="text-sm text-gray-700 font-medium">{user[s.name] || "—"}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {activeTab === "skills" && (
                <>
                  <div className="prof-card p-6">
                    <h3 className="text-base font-bold text-gray-900 mb-4">Skills & Expertise</h3>

                    {isEditing && (
                      <div className="flex gap-2 mb-4">
                        <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Add a skill..." className="form-field flex-1"
                          onKeyDown={(e) => e.key === "Enter" && addSkill()} />
                        <button onClick={addSkill} className="primary-btn">Add</button>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {(isEditing ? editForm.skills : user.skills).map((skill) => (
                        <span key={skill} className="skill-chip">
                          {skill}
                          {isEditing && (
                            <button onClick={() => removeSkill(skill)} className="hover:text-red-400 transition-colors">
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="prof-card p-6">
                    <h3 className="text-base font-bold text-gray-900 mb-4">Languages</h3>
                    <div className="space-y-3">
                      {user.languages.map((lang) => (
                        <div key={lang} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "#fafafa" }}>
                          <span className="text-sm font-medium text-gray-700">{lang}</span>
                          <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                            style={{ background: "#ecfdf5", color: "#065f46" }}>Active</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === "security" && (
                <div className="prof-card p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-5">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                      <div key={label}>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">{label}</label>
                        <input type="password" placeholder="••••••••" className="form-field" />
                      </div>
                    ))}
                    <button className="primary-btn mt-2">Update Password</button>
                  </div>

                  <div className="mt-8 pt-6" style={{ borderTop: "1px solid #f3f4f6" }}>
                    <h4 className="text-sm font-bold text-gray-700 mb-3">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between p-4 rounded-2xl" style={{ background: "#f9fafb", border: "1px solid #f3f4f6" }}>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">Authenticator App</p>
                        <p className="text-xs text-gray-500 mt-0.5">Add an extra layer of security</p>
                      </div>
                      <button className="ghost-btn text-sm">Enable</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;