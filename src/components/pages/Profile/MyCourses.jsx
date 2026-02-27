import React, { useState } from "react";
import {
  BookOpen, Clock, Search, PlayCircle, Download,
  Star, Users, Award, CheckCircle, TrendingUp, Grid, List, BookMarked
} from "lucide-react";

const MyCourses = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const categories = [
    { id: "all", name: "All", count: 8 },
    { id: "in-progress", name: "In Progress", count: 3 },
    { id: "completed", name: "Completed", count: 2 },
    { id: "saved", name: "Saved", count: 1 },
  ];

  const courses = [
    { id: 1, title: "Advanced React Development", instructor: "Sarah Johnson", progress: 75, thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", category: "Web Development", level: "Advanced", duration: "12 hours", lessons: 48, status: "in-progress", rating: 4.8, students: 1234, certificate: true, lastAccessed: "2 days ago", accentColor: "#6366f1" },
    { id: 2, title: "UI/UX Design Masterclass", instructor: "Michael Chen", progress: 100, thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", category: "Design", level: "Intermediate", duration: "8 hours", lessons: 32, status: "completed", rating: 4.9, students: 2341, certificate: true, completedDate: "Jan 15, 2026", accentColor: "#10b981" },
    { id: 3, title: "Full Stack JavaScript", instructor: "David Kim", progress: 30, thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", category: "Web Development", level: "Intermediate", duration: "20 hours", lessons: 80, status: "in-progress", rating: 4.7, students: 3456, certificate: true, lastAccessed: "5 hours ago", accentColor: "#0ea5e9" },
    { id: 4, title: "Python for Data Science", instructor: "Emily Rodriguez", progress: 100, thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", category: "Data Science", level: "Beginner", duration: "15 hours", lessons: 60, status: "completed", rating: 4.6, students: 4567, certificate: true, completedDate: "Feb 1, 2026", accentColor: "#f59e0b" },
    { id: 5, title: "Mobile App with React Native", instructor: "Alex Thompson", progress: 15, thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", category: "Mobile", level: "Advanced", duration: "18 hours", lessons: 72, status: "in-progress", rating: 4.8, students: 2345, certificate: true, lastAccessed: "1 week ago", accentColor: "#8b5cf6" },
    { id: 6, title: "Digital Marketing Fundamentals", instructor: "Jessica Lee", progress: 0, thumbnail: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", category: "Marketing", level: "Beginner", duration: "10 hours", lessons: 40, status: "saved", rating: 4.5, students: 3456, certificate: true, accentColor: "#ef4444" },
  ];

  const filteredCourses = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === "all" || c.status === selectedCategory;
    return matchSearch && matchCat;
  });

  const statusConfig = {
    "in-progress": { label: "In Progress", bg: "#dbeafe", color: "#1d4ed8", icon: <Clock className="h-3 w-3" /> },
    completed: { label: "Completed", bg: "#d1fae5", color: "#065f46", icon: <CheckCircle className="h-3 w-3" /> },
    saved: { label: "Saved", bg: "#fef3c7", color: "#92400e", icon: <BookMarked className="h-3 w-3" /> },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Playfair+Display:wght@700&display=swap');
        .mc-root { font-family: 'DM Sans', sans-serif; background: linear-gradient(160deg, #f8f8ff 0%, #f0f0fe 100%); }
        .mc-heading { font-family: 'Playfair Display', serif; }
        .crs-card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid #f0f0f8;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .crs-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(99,102,241,0.12); }
        .progress-bar { height: 5px; background: #ede9fe; border-radius: 99px; overflow: hidden; }
        .progress-bar-fill { height: 100%; border-radius: 99px; }
        .cat-pill {
          padding: 6px 16px;
          border-radius: 99px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          border: 1.5px solid transparent;
          white-space: nowrap;
        }
        .cat-pill.active { background: #6366f1; color: white; border-color: #6366f1; }
        .cat-pill:not(.active) { background: white; color: #6b7280; border-color: #e5e7eb; }
        .cat-pill:not(.active):hover { border-color: #a5b4fc; color: #4f46e5; }
        .list-row {
          display: flex;
          gap: 16px;
          align-items: center;
          padding: 16px;
          background: white;
          border-radius: 16px;
          border: 1px solid #f0f0f8;
          box-shadow: 0 1px 4px rgba(0,0,0,0.03);
          transition: all 0.2s;
        }
        .list-row:hover { transform: translateX(4px); border-color: #c7d2fe; box-shadow: 0 4px 16px rgba(99,102,241,0.08); }
      `}</style>

      <div className="mc-root min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-semibold text-indigo-500 uppercase tracking-widest mb-1">Learning Hub</p>
              <h1 className="mc-heading text-4xl font-bold text-gray-900">My Courses</h1>
              <p className="text-gray-500 mt-1">Track progress and continue where you left off</p>
            </div>
            <div className="flex gap-3">
              {[
                { label: "Total", value: "8", color: "#6366f1" },
                { label: "Completed", value: "2", color: "#10b981" },
                { label: "Certified", value: "2", color: "#8b5cf6" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl px-4 py-3 text-center" style={{ border: "1px solid #f0f0f8", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                  <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl outline-none transition-all"
                style={{ background: "white", border: "1.5px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}
                onFocus={e => e.target.style.borderColor = "#a5b4fc"}
                onBlur={e => e.target.style.borderColor = "#e5e7eb"}
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`cat-pill ${selectedCategory === cat.id ? "active" : ""}`}
                >
                  {cat.name}
                  <span className="ml-1.5 opacity-60 text-xs">({cat.count})</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 ml-auto bg-white rounded-xl p-1" style={{ border: "1.5px solid #e5e7eb" }}>
              <button
                onClick={() => setViewMode("grid")}
                className="p-2 rounded-lg transition-all"
                style={{ background: viewMode === "grid" ? "#6366f1" : "transparent", color: viewMode === "grid" ? "white" : "#9ca3af" }}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className="p-2 rounded-lg transition-all"
                style={{ background: viewMode === "list" ? "#6366f1" : "transparent", color: viewMode === "list" ? "white" : "#9ca3af" }}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Courses */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCourses.map((course) => {
                const sc = statusConfig[course.status] || statusConfig["in-progress"];
                return (
                  <div key={course.id} className="crs-card">
                    <div className="relative h-44 overflow-hidden">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" style={{ transition: "transform 0.4s" }}
                        onMouseEnter={e => e.target.style.transform = "scale(1.06)"}
                        onMouseLeave={e => e.target.style.transform = "scale(1)"}
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />

                      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ background: sc.bg, color: sc.color }}>
                        {sc.icon}{sc.label}
                      </span>

                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}>
                        {course.level}
                      </span>

                      {/* bottom accent */}
                      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: course.accentColor }} />
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 mb-0.5 line-clamp-1 text-base">{course.title}</h3>
                      <p className="text-sm text-gray-500 mb-3">{course.instructor}</p>

                      {course.status === "in-progress" && (
                        <div className="mb-4">
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-gray-400 font-medium">Progress</span>
                            <span className="font-bold" style={{ color: course.accentColor }}>{course.progress}%</span>
                          </div>
                          <div className="progress-bar">
                            <div className="progress-bar-fill" style={{ width: `${course.progress}%`, background: `linear-gradient(90deg, ${course.accentColor}, ${course.accentColor}99)` }} />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration}</span>
                        <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{course.lessons}</span>
                        <span className="flex items-center gap-1"><Star className="h-3 w-3 text-amber-400" />{course.rating}</span>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                          style={{ background: course.accentColor, boxShadow: `0 4px 12px ${course.accentColor}40` }}
                          onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
                          onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                          <PlayCircle className="h-4 w-4" />
                          {course.status === "in-progress" ? "Continue" : course.status === "saved" ? "Start" : "Review"}
                        </button>
                        {course.certificate && course.status === "completed" && (
                          <button className="p-2.5 rounded-xl border transition-all hover:bg-gray-50" style={{ borderColor: "#e5e7eb" }}>
                            <Download className="h-4 w-4 text-gray-500" />
                          </button>
                        )}
                      </div>

                      {course.lastAccessed && (
                        <p className="text-xs text-gray-400 mt-3 text-center">Last accessed {course.lastAccessed}</p>
                      )}
                      {course.completedDate && (
                        <p className="text-xs font-medium mt-3 text-center" style={{ color: "#10b981" }}>✓ Completed {course.completedDate}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredCourses.map((course) => {
                const sc = statusConfig[course.status] || statusConfig["in-progress"];
                return (
                  <div key={course.id} className="list-row">
                    <div className="relative flex-shrink-0">
                      <img src={course.thumbnail} alt={course.title} className="w-20 h-20 rounded-xl object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl" style={{ background: course.accentColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-bold text-gray-900 text-sm truncate">{course.title}</h3>
                        <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{ background: sc.bg, color: sc.color }}>
                          {sc.icon}{sc.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{course.instructor}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration}</span>
                        <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{course.lessons} lessons</span>
                        <span className="flex items-center gap-1"><Star className="h-3 w-3 text-amber-400" />{course.rating}</span>
                      </div>
                      {course.status === "in-progress" && (
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex-1 max-w-[200px] progress-bar">
                            <div className="progress-bar-fill" style={{ width: `${course.progress}%`, background: course.accentColor }} />
                          </div>
                          <span className="text-xs font-bold" style={{ color: course.accentColor }}>{course.progress}%</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
                        style={{ background: course.accentColor }}>
                        {course.status === "in-progress" ? "Continue" : "Review"}
                      </button>
                      {course.certificate && course.status === "completed" && (
                        <button className="p-2 rounded-xl border hover:bg-gray-50" style={{ borderColor: "#e5e7eb" }}>
                          <Download className="h-4 w-4 text-gray-500" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {filteredCourses.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4" style={{ background: "#f3f4f6" }}>
                <BookOpen className="h-10 w-10 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">No courses found</h3>
              <p className="text-gray-500 mb-4 text-sm">Try adjusting your search or filter.</p>
              <button onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: "#6366f1" }}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCourses;