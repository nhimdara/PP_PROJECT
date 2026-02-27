import React, { useState } from "react";
import {
  Calendar, Clock, BookOpen, Video, Users, ChevronLeft, ChevronRight, Plus, AlertCircle, GraduationCap,
} from "lucide-react";

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month");

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const events = [
    { id: 1, title: "Advanced React Workshop", type: "class", date: "2026-02-27", time: "10:00 AM – 12:00 PM", instructor: "Sarah Johnson", location: "Online (Zoom)", attendees: 45, status: "upcoming", hex: "#6366f1" },
    { id: 2, title: "Project Submission Deadline", type: "deadline", date: "2026-02-28", time: "11:59 PM", description: "Final project for Full Stack JavaScript", status: "upcoming", hex: "#ef4444" },
    { id: 3, title: "UI/UX Design Review", type: "meeting", date: "2026-02-25", time: "2:00 PM – 3:00 PM", instructor: "Michael Chen", location: "Design Lab", attendees: 12, status: "completed", hex: "#10b981" },
    { id: 4, title: "Study Group: JavaScript Fundamentals", type: "study", date: "2026-03-01", time: "4:00 PM – 6:00 PM", location: "Library, Room 203", attendees: 8, status: "upcoming", hex: "#8b5cf6" },
    { id: 5, title: "Guest Lecture: Industry Trends", type: "event", date: "2026-03-02", time: "11:00 AM – 1:00 PM", instructor: "Dr. Emily Rodriguez", location: "Auditorium A", attendees: 120, status: "upcoming", hex: "#f59e0b" },
  ];

  const getEventsForDate = (date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    return events.filter((e) => e.date === dateStr);
  };

  const getEventIcon = (type) => {
    const map = { class: BookOpen, deadline: AlertCircle, meeting: Users, study: Video, event: Calendar };
    return map[type] || Clock;
  };

  const navigateMonth = (dir) => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + dir, 1));
  const todayEvents = getEventsForDate(new Date());

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Playfair+Display:wght@700&display=swap');
        .sch-root { font-family: 'DM Sans', sans-serif; background: linear-gradient(160deg, #f8f8ff, #f0f0fe); }
        .sch-heading { font-family: 'Playfair Display', serif; }
        .cal-day {
          aspect-ratio: 1;
          padding: 6px;
          border-radius: 12px;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.15s;
          position: relative;
        }
        .cal-day:hover { background: #f3f4ff; border-color: #c7d2fe; }
        .cal-day.today { background: #eef2ff; border-color: #6366f1; }
        .cal-day.selected { background: #6366f1; border-color: #6366f1; }
        .cal-day.selected .day-num { color: white !important; }
        .event-dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; margin: 0.5px; }
        .event-card-styled {
          padding: 16px;
          border-radius: 16px;
          margin-bottom: 8px;
          border: 1px solid transparent;
        }
        .sidebar-event {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          padding: 10px 12px;
          border-radius: 12px;
          background: #fafafa;
          margin-bottom: 6px;
          transition: background 0.15s;
        }
        .sidebar-event:hover { background: #f0f0fe; }
        .view-btn {
          padding: 8px 18px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: 1.5px solid #e5e7eb;
          background: white;
          color: #374151;
          transition: all 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .view-btn:hover { border-color: #a5b4fc; color: #4f46e5; }
      `}</style>

      <div className="sch-root min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-semibold text-indigo-500 uppercase tracking-widest mb-1">Calendar</p>
              <h1 className="sch-heading text-4xl font-bold text-gray-900">Schedule</h1>
              <p className="text-gray-500 mt-1">Manage your classes, deadlines, and study sessions</p>
            </div>
            <div className="flex gap-3 items-center">
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
                className="view-btn pr-8"
                style={{ appearance: "none" }}
              >
                <option value="month">Month View</option>
                <option value="week">Week View</option>
                <option value="day">Day View</option>
              </select>
              <button className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-white text-sm font-semibold"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 20px rgba(99,102,241,0.35)" }}>
                <Plus className="h-4 w-4" />
                Add Event
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-5 sticky top-24" style={{ border: "1px solid #f0f0f8", boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
                <h3 className="text-base font-bold text-gray-900 mb-4">Today's Events</h3>

                {todayEvents.length > 0 ? (
                  todayEvents.map((ev) => {
                    const Icon = getEventIcon(ev.type);
                    return (
                      <div key={ev.id} className="sidebar-event">
                        <div className="w-1 rounded-full flex-shrink-0 mt-0.5" style={{ height: "40px", background: ev.hex }} />
                        <div>
                          <p className="text-sm font-semibold text-gray-800 leading-snug">{ev.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{ev.time}</p>
                          <p className="text-xs text-gray-400">{ev.location || ev.instructor}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-400 py-4 text-center">No events today 🎉</p>
                )}

                <div className="mt-5 pt-5" style={{ borderTop: "1px solid #f3f4f6" }}>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Upcoming</h4>
                  {events.filter((e) => e.status === "upcoming").slice(0, 3).map((ev) => (
                    <div key={ev.id} className="sidebar-event">
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: ev.hex }} />
                      <div>
                        <p className="text-sm font-semibold text-gray-800 leading-snug">{ev.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{ev.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Calendar */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl overflow-hidden" style={{ border: "1px solid #f0f0f8", boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
                {/* Cal Header */}
                <div className="p-6" style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <h2 className="sch-heading text-2xl font-bold text-gray-900">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                      </h2>
                      <div className="flex gap-1">
                        <button onClick={() => navigateMonth(-1)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500">
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button onClick={() => navigateMonth(1)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500">
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => { setCurrentDate(new Date()); setSelectedDate(new Date()); }}
                      className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-all"
                    >
                      Today
                    </button>
                  </div>
                </div>

                {/* Grid */}
                <div className="p-5">
                  {/* Weekday labels */}
                  <div className="grid grid-cols-7 mb-1">
                    {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
                      <div key={d} className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider py-2">{d}</div>
                    ))}
                  </div>

                  {/* Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, idx) => {
                      const day = idx + 1;
                      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                      const dayEvents = getEventsForDate(date);
                      const isToday = date.toDateString() === new Date().toDateString();
                      const isSelected = date.toDateString() === selectedDate.toDateString();

                      return (
                        <div
                          key={day}
                          onClick={() => setSelectedDate(date)}
                          className={`cal-day ${isToday ? "today" : ""} ${isSelected && !isToday ? "selected" : ""}`}
                        >
                          <span className={`day-num text-sm font-semibold block ${isToday ? "text-indigo-600" : isSelected ? "text-white" : "text-gray-700"}`}>
                            {day}
                          </span>
                          {dayEvents.length > 0 && (
                            <div className="flex flex-wrap gap-0.5 mt-1">
                              {dayEvents.slice(0, 3).map((ev) => (
                                <span key={ev.id} className="event-dot" style={{ background: isSelected && !isToday ? "rgba(255,255,255,0.7)" : ev.hex }} />
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Selected date events */}
                {selectedDate && (
                  <div className="p-6" style={{ borderTop: "1px solid #f3f4f6" }}>
                    <h3 className="text-base font-bold text-gray-900 mb-4">
                      {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                    </h3>

                    {getEventsForDate(selectedDate).length > 0 ? (
                      getEventsForDate(selectedDate).map((ev) => {
                        const Icon = getEventIcon(ev.type);
                        return (
                          <div
                            key={ev.id}
                            className="event-card-styled"
                            style={{
                              background: ev.hex + "10",
                              borderColor: ev.hex + "40",
                              borderLeftColor: ev.hex,
                              borderLeftWidth: "4px",
                            }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                                  style={{ background: ev.hex + "20" }}>
                                  <Icon className="h-4 w-4" style={{ color: ev.hex }} />
                                </div>
                                <div>
                                  <h4 className="font-bold text-gray-900">{ev.title}</h4>
                                  <p className="text-sm text-gray-500 mt-0.5">{ev.time}</p>
                                  {(ev.location || ev.instructor) && (
                                    <p className="text-sm text-gray-500">{ev.location || ev.instructor}</p>
                                  )}
                                  {ev.attendees && (
                                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                      <Users className="h-3 w-3" />{ev.attendees} attendees
                                    </p>
                                  )}
                                </div>
                              </div>
                              <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                                style={ev.status === "upcoming"
                                  ? { background: "#dbeafe", color: "#1d4ed8" }
                                  : { background: "#d1fae5", color: "#065f46" }}>
                                {ev.status}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-10 text-gray-400">
                        <Calendar className="h-10 w-10 mx-auto mb-2 text-gray-200" />
                        <p className="text-sm">No events scheduled for this day</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Schedule;