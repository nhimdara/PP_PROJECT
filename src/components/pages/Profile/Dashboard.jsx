import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  TrendingUp,
  Award,
  Clock,
  ArrowRight,
  Star,
  Users,
  PlayCircle,
  GraduationCap,
  Flame,
  ChevronRight,
  Zap,
} from "lucide-react";

const Dashboard = ({ user }) => {
  const recentCourses = [
    {
      id: 1,
      title: "Advanced React Development",
      progress: 75,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      instructor: "Sarah Johnson",
      tag: "Web Dev",
      tagColor: "#6366f1",
    },
    {
      id: 2,
      title: "Full Stack JavaScript",
      progress: 30,
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      instructor: "David Kim",
      tag: "Backend",
      tagColor: "#0ea5e9",
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      progress: 100,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      instructor: "Michael Chen",
      tag: "Design",
      tagColor: "#10b981",
    },
  ];

  const upcomingEvents = [
    { title: "Advanced React Workshop", time: "Today, 10:00 AM", type: "class", color: "#6366f1" },
    { title: "Project Submission Deadline", time: "Tomorrow, 11:59 PM", type: "deadline", color: "#ef4444" },
    { title: "Study Group: JavaScript", time: "Mar 1, 4:00 PM", type: "study", color: "#8b5cf6" },
  ];

  const firstName = user?.name?.split(" ")[0] || "Learner";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:wght@700;800&display=swap');
        .dash-root { font-family: 'DM Sans', sans-serif; }
        .dash-heading { font-family: 'Playfair Display', serif; }
        .stat-card {
          background: #fff;
          border: 1px solid rgba(99,102,241,0.08);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(99,102,241,0.04);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(99,102,241,0.12); }
        .course-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border-radius: 16px;
          background: #fafafa;
          border: 1px solid #f0f0f5;
          transition: all 0.2s;
          cursor: pointer;
        }
        .course-card:hover { background: #f3f4ff; border-color: rgba(99,102,241,0.2); transform: translateX(4px); }
        .progress-track { height: 6px; background: #ede9fe; border-radius: 99px; overflow: hidden; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, #6366f1, #a78bfa); border-radius: 99px; }
        .event-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          padding: 12px;
          border-radius: 12px;
          background: #fafafa;
          transition: background 0.2s;
        }
        .event-item:hover { background: #f3f4ff; }
        .quick-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          border-radius: 14px;
          transition: all 0.2s;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
        }
        .badge-glow {
          background: linear-gradient(135deg, #f59e0b, #ef4444);
          border-radius: 20px;
          padding: 24px;
          color: white;
          position: relative;
          overflow: hidden;
        }
        .badge-glow::before {
          content: '';
          position: absolute;
          top: -40%;
          right: -20%;
          width: 200px;
          height: 200px;
          background: rgba(255,255,255,0.08);
          border-radius: 50%;
        }
      `}</style>

      <div className="dash-root min-h-screen pt-24 pb-16" style={{ background: "linear-gradient(160deg, #f8f8ff 0%, #f0f0fe 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Welcome Banner */}
          <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-indigo-500 uppercase tracking-widest mb-1">Dashboard</p>
              <h1 className="dash-heading text-4xl font-bold text-gray-900">
                Welcome back, {firstName}! <span style={{ fontSize: "2rem" }}>👋</span>
              </h1>
              <p className="text-gray-500 mt-1.5 text-base">You're making great progress. Keep going!</p>
            </div>
            <Link
              to="/lessons"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-white text-sm font-semibold"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 20px rgba(99,102,241,0.35)" }}
            >
              <Zap className="h-4 w-4" />
              Explore Lessons
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Courses Active", value: user?.coursesEnrolled || "3", icon: BookOpen, color: "#6366f1", bg: "#eef2ff" },
              { label: "Hours Learned", value: "47.5", icon: Clock, color: "#10b981", bg: "#ecfdf5" },
              { label: "Achievements", value: user?.achievements?.length || "4", icon: Award, color: "#f59e0b", bg: "#fffbeb" },
              { label: "Day Streak", value: "7", icon: Flame, color: "#ef4444", bg: "#fef2f2" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="stat-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: stat.bg }}>
                      <Icon className="h-5 w-5" style={{ color: stat.color }} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Continue Learning */}
              <div className="bg-white rounded-3xl border border-gray-100 p-6" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-gray-900">Continue Learning</h2>
                  <Link to="/my-courses" className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 font-semibold">
                    View all <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="space-y-3">
                  {recentCourses.map((course) => (
                    <div key={course.id} className="course-card group">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                            style={{ background: course.tagColor }}
                          >
                            {course.tag}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{course.title}</h3>
                        <p className="text-xs text-gray-500 mb-2">{course.instructor}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 progress-track">
                            <div className="progress-fill" style={{ width: `${course.progress}%` }} />
                          </div>
                          <span className="text-xs font-bold text-indigo-600 whitespace-nowrap">{course.progress}%</span>
                        </div>
                      </div>
                      <PlayCircle className="h-8 w-8 text-gray-300 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended */}
              <div className="bg-white rounded-3xl border border-gray-100 p-6" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recommended for You</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Machine Learning Basics", hours: "12 hours", level: "Beginner", color: "#6366f1" },
                    { title: "TypeScript Mastery", hours: "8 hours", level: "Intermediate", color: "#0ea5e9" },
                  ].map((rec, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl border border-gray-100 cursor-pointer group"
                      style={{ transition: "all 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = "#c7d2fe"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "#f3f4f6"}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                        style={{ background: rec.color + "18" }}
                      >
                        <Star className="h-5 w-5" style={{ color: rec.color }} />
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm mb-1">{rec.title}</h3>
                      <p className="text-xs text-gray-500">{rec.hours} · {rec.level}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-5">
              {/* Quick Actions */}
              <div className="bg-white rounded-3xl border border-gray-100 p-6" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
                <h2 className="text-base font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  {[
                    { label: "Browse Lessons", to: "/lessons", bg: "#eef2ff", color: "#4f46e5", hbg: "#e0e7ff" },
                    { label: "View Schedule", to: "/schedule", bg: "#ecfdf5", color: "#059669", hbg: "#d1fae5" },
                    { label: "Explore Projects", to: "/projects", bg: "#faf5ff", color: "#7c3aed", hbg: "#ede9fe" },
                    { label: "My Progress", to: "/progress", bg: "#fff7ed", color: "#ea580c", hbg: "#ffedd5" },
                  ].map((action) => (
                    <Link
                      key={action.to}
                      to={action.to}
                      className="quick-link"
                      style={{ background: action.bg, color: action.color }}
                      onMouseEnter={e => e.currentTarget.style.background = action.hbg}
                      onMouseLeave={e => e.currentTarget.style.background = action.bg}
                    >
                      {action.label}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-3xl border border-gray-100 p-6" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
                <h2 className="text-base font-bold text-gray-900 mb-4">Upcoming Events</h2>
                <div className="space-y-2">
                  {upcomingEvents.map((event, i) => (
                    <div key={i} className="event-item">
                      <div className="w-1.5 h-12 rounded-full flex-shrink-0 mt-0.5" style={{ background: event.color }} />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{event.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/schedule" className="block text-center mt-4 text-sm text-indigo-600 font-semibold hover:text-indigo-700">
                  View Full Schedule →
                </Link>
              </div>

              {/* Achievement */}
              {user?.achievements && user.achievements.length > 0 && (
                <div className="badge-glow">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="h-5 w-5" />
                      <span className="text-sm font-bold uppercase tracking-wide opacity-80">Achievement</span>
                    </div>
                    <p className="text-2xl font-bold mb-1">{user.achievements[0]}</p>
                    <p className="text-sm opacity-75 mb-3">Keep up the great work!</p>
                    <div className="flex items-center gap-2 text-sm opacity-80">
                      <Users className="h-4 w-4" />
                      <span>Top 15% of learners</span>
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

export default Dashboard;