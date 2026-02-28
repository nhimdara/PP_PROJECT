// pages/LessonsPage.jsx
import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Clock,
  PlayCircle,
  Star,
  Users,
  Filter,
  Search,
  ChevronDown,
  GraduationCap,
  Calendar,
  ListVideo,
  Film,
  Layers,
  Lock,
} from "lucide-react";
import lessonImage from "./../assets/image/lessonpage.jpeg";
import { lessons } from "./../data/Lesson";
import VideoModal from "./video/VideoModal";
import VideoPlaylistModal from "./video/VideoPlaylistModal";

/* ── Dark mode hook ── */
const useDarkMode = () => {
  const [dark, setDark] = React.useState(() =>
    document.documentElement.classList.contains("dark-mode")
  );
  React.useEffect(() => {
    const obs = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains("dark-mode"))
    );
    obs.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
};


/* ─── Constants ─── */
const FREE_VIDEO_LIMIT = 2;

/* ─── Group lessons by year + semester ─── */
const buildSemesters = (lessons) => {
  const map = {};
  lessons.forEach((l) => {
    const key = l.semester || "Year 1 Semester 1";
    if (!map[key]) map[key] = [];
    map[key].push(l);
  });

  const order = [];
  for (let y = 1; y <= 4; y++) {
    for (let s = 1; s <= 2; s++) {
      order.push(`Year ${y} Semester ${s}`);
    }
  }

  return order.filter((k) => map[k]).map((k) => ({ label: k, items: map[k] }));
};

/* ─── Semester color palette ─── */
const SEMESTER_STYLES = [
  {
    gradient: "from-indigo-500 to-violet-600",
    light: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
    badge: "bg-indigo-600",
  },
  {
    gradient: "from-cyan-500 to-indigo-600",
    light: "bg-cyan-50",
    text: "text-cyan-700",
    border: "border-cyan-200",
    badge: "bg-cyan-600",
  },
  {
    gradient: "from-emerald-500 to-teal-600",
    light: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    badge: "bg-emerald-600",
  },
  {
    gradient: "from-amber-500 to-orange-600",
    light: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    badge: "bg-amber-600",
  },
  {
    gradient: "from-rose-500 to-pink-600",
    light: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    badge: "bg-rose-600",
  },
  {
    gradient: "from-violet-500 to-purple-600",
    light: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-200",
    badge: "bg-violet-600",
  },
  {
    gradient: "from-sky-500 to-blue-600",
    light: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-200",
    badge: "bg-sky-600",
  },
  {
    gradient: "from-fuchsia-500 to-pink-600",
    light: "bg-fuchsia-50",
    text: "text-fuchsia-700",
    border: "border-fuchsia-200",
    badge: "bg-fuchsia-600",
  },
];

/* ─── Video count badge ─── */
const VideoCountBadge = ({ count }) => {
  if (!count) return null;
  return (
    <div className="absolute top-4 left-16 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
      <Film className="h-3 w-3" />
      {count} {count === 1 ? "Video" : "Videos"}
    </div>
  );
};

/* ─── Subscription Modal ─── */
const SubscriptionModal = ({ onClose, onSubscribe }) => {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
        style={{ animation: "fadeInUp 0.3s ease-out both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 px-8 pt-10 pb-8 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          >
            ✕
          </button>
          <div className="text-5xl mb-3">🔓</div>
          <h2 className="text-2xl font-bold mb-1">Unlock Full Access</h2>
          <p className="text-indigo-200 text-sm">
            You've used your {FREE_VIDEO_LIMIT} free preview videos
          </p>
        </div>

        {/* Body */}
        <div className="p-8">
          <div className="space-y-3 mb-6">
            {[
              { icon: "🎬", text: "Unlimited video access for all courses" },
              { icon: "📜", text: "Course completion certificates" },
              { icon: "💬", text: "Discussion forums & instructor Q&A" },
              { icon: "⬇️", text: "Downloadable resources & lecture notes" },
              { icon: "📊", text: "Progress tracking & analytics" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xl">{f.icon}</span>
                <span className="text-gray-700 text-sm">{f.text}</span>
              </div>
            ))}
          </div>

          <div className="bg-indigo-50 rounded-2xl p-4 mb-6 text-center">
            <div className="text-3xl font-bold text-indigo-700">
              $9.99
              <span className="text-base font-normal text-indigo-400">/month</span>
            </div>
            <div className="text-xs text-indigo-500 mt-1">
              or $79.99/year — save 33%
            </div>
          </div>

          <button
            onClick={onSubscribe}
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold py-3.5 rounded-2xl hover:from-indigo-700 hover:to-violet-700 transition-all shadow-lg shadow-indigo-200"
          >
            Subscribe Now →
          </button>
          <p className="text-center text-xs text-gray-400 mt-3">
            7-day free trial · Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};

/* ─── Single lesson card ─── */
const LessonCard = ({ lesson: l, index, style, isSubscribed, onSubscribeRequest }) => {
  const [hovered, setHovered] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const getIcon = () => {
    if (l.icon) return l.icon;
    const iconMap = {
      Frontend: "💻",
      Backend: "⚙️",
      JavaScript: "🟨",
      Design: "🎨",
      CSS: "🎯",
      Database: "🗄️",
      DevOps: "🚀",
      Mathematics: "📐",
      Science: "⚛️",
      Networking: "🌐",
      Security: "🔒",
      AI: "🤖",
    };
    return iconMap[l.category] || "📚";
  };

  const cardGradient =
    l.color || style?.gradient || "from-indigo-500 to-purple-600";

  const hasVideos = l.videos && l.videos.length > 0;
  const videoCount = hasVideos ? l.videos.length : 0;

  // Backward-compat single video
  const singleVideo = l.videoLink
    ? {
        title: l.videoTitle || l.title,
        link: l.videoLink,
        duration: l.videoDuration || 30,
      }
    : null;

  const handlePlayVideo = () => {
    if (videoCount > 1) {
      setShowPlaylist(true);
    } else if (videoCount === 1) {
      // Check free limit for single video
      if (!isSubscribed && 0 >= FREE_VIDEO_LIMIT) {
        onSubscribeRequest();
        return;
      }
      setSelectedVideo(l.videos[0]);
      setIsVideoModalOpen(true);
    } else if (singleVideo) {
      setSelectedVideo(singleVideo);
      setIsVideoModalOpen(true);
    }
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setIsVideoModalOpen(true);
    setShowPlaylist(false);
  };

  return (
    <>
      <div
        className="group rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border transform hover:-translate-y-2"
        style={{
          background: document.documentElement.classList.contains("dark-mode") ? "#1a1a35" : "white",
          borderColor: document.documentElement.classList.contains("dark-mode") ? "#2a2a4a" : "#f3f4f6"
        }}
        style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both` }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Card header */}
        <div
          className={`relative h-44 bg-gradient-to-br ${cardGradient} overflow-hidden cursor-pointer`}
          onClick={handlePlayVideo}
        >
          <div
            className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${hovered ? "opacity-40" : "opacity-0"}`}
          />

          {/* Category badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium border border-white/30">
              {l.category}
            </span>
          </div>

          {/* Icon */}
          <div className="absolute top-4 left-4 text-4xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
            {getIcon()}
          </div>

          {/* Video count badge */}
          {(hasVideos || l.videoLink) && (
            <VideoCountBadge count={videoCount || 1} />
          )}

          {/* Title + meta */}
          <div className="absolute bottom-4 left-4 right-4 transform transition-all duration-500 group-hover:-translate-y-2">
            <h3 className="text-lg font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">
              {l.title}
            </h3>
            <div className="flex items-center gap-4 text-white/90 text-xs">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {l.duration}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {l.rating}
              </span>
            </div>
          </div>

          {/* Play overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
          >
            <div className="bg-white/30 backdrop-blur-sm rounded-full p-3">
              {videoCount > 1 ? (
                <Layers className="h-10 w-10 text-white" />
              ) : (
                <PlayCircle className="h-10 w-10 text-white" />
              )}
            </div>
          </div>

          {/* Lock overlay for no subscription */}
          {!isSubscribed && videoCount > FREE_VIDEO_LIMIT && (
            <div className="absolute bottom-16 right-4">
              <div className="flex items-center gap-1 bg-amber-500/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                <Lock className="h-3 w-3" />
                <span>{videoCount - FREE_VIDEO_LIMIT} locked</span>
              </div>
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                l.level === "Beginner"
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : l.level === "Intermediate"
                    ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                    : "bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              {l.level}
            </span>
            <span className="flex items-center text-xs group-hover:text-indigo-500 transition-colors" style={{ color: document.documentElement.classList.contains("dark-mode") ? "#7777aa" : "#6b7280" }}>
              <Users className="h-3.5 w-3.5 mr-1" />
              {l.students ? l.students.toLocaleString() : "0"}
            </span>
          </div>

          <p className="text-sm mb-4 line-clamp-2 transition-colors" style={{ color: document.documentElement.classList.contains("dark-mode") ? "#9999cc" : "#6b7280" }}>
            {l.description}
          </p>

          {/* Video playlist preview */}
          {videoCount > 1 && (
            <div className="mb-3 space-y-1">
              <div className="text-xs font-semibold text-gray-400 flex items-center gap-1">
                <ListVideo className="h-3 w-3" /> Video playlist:
              </div>
              <div className="flex flex-wrap gap-1">
                {l.videos.slice(0, 3).map((v, i) => {
                  const isLocked = !isSubscribed && i >= FREE_VIDEO_LIMIT;
                  return (
                    <span
                      key={i}
                      className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                        isLocked
                          ? "bg-amber-50 text-amber-600 border border-amber-200"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {isLocked && <Lock className="h-2.5 w-2.5" />}
                      {i + 1}. {v.title.substring(0, 14)}…
                    </span>
                  );
                })}
                {videoCount > 3 && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    +{videoCount - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Hover progress bar */}
          <div className="mb-4 h-1 rounded-full overflow-hidden" style={{ background: document.documentElement.classList.contains("dark-mode") ? "#2a2a4a" : "#f3f4f6" }}>
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700"
              style={{ width: hovered ? "100%" : "0%", opacity: hovered ? 1 : 0 }}
            />
          </div>

          {/* CTA button */}
          <button
            onClick={handlePlayVideo}
            className="w-full group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:text-white py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
            style={{ background: document.documentElement.classList.contains("dark-mode") ? "#14142b" : "#f9fafb", color: document.documentElement.classList.contains("dark-mode") ? "#9999cc" : "#374151" }}
          >
            <span className="relative z-10">
              {videoCount > 1
                ? `View ${videoCount} Videos`
                : hasVideos || l.videoLink
                  ? "Watch Video Lesson"
                  : "Start Learning"}
            </span>
            {videoCount > 1 ? (
              <Layers className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            ) : (
              <PlayCircle className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            )}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </button>

          {/* Duration info */}
          {(videoCount === 1 || singleVideo) && (
            <div className="mt-2 text-xs text-center" style={{ color: document.documentElement.classList.contains("dark-mode") ? "#6666aa" : "#9ca3af" }}>
              ⏱️ {(videoCount === 1 ? l.videos[0].duration : l.videoDuration) || 30} minutes
            </div>
          )}
          {videoCount > 1 && (
            <div className="mt-2 text-xs text-gray-400 text-center">
              ⏱️ {l.videos.reduce((acc, v) => acc + (v.duration || 30), 0)} total min ·{" "}
              <span className="text-indigo-500 font-medium">
                {Math.min(FREE_VIDEO_LIMIT, videoCount)} free
              </span>{" "}
              · {Math.max(0, videoCount - FREE_VIDEO_LIMIT)} premium
            </div>
          )}
        </div>
      </div>

      {/* Single Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => {
          setIsVideoModalOpen(false);
          setSelectedVideo(null);
        }}
        videoLink={selectedVideo?.link}
        videoTitle={selectedVideo?.title || l.title}
      />

      {/* Playlist Modal */}
      {showPlaylist && (
        <VideoPlaylistModal
          isOpen={showPlaylist}
          onClose={() => setShowPlaylist(false)}
          videos={l.videos}
          lessonTitle={l.title}
          onSelectVideo={handleVideoSelect}
          isSubscribed={isSubscribed}
          onSubscribeRequest={onSubscribeRequest}
        />
      )}
    </>
  );
};

/* ─── Collapsible semester section ─── */
const SemesterSection = ({
  label,
  items,
  styleIndex,
  searchTerm,
  selectedCategory,
  selectedLevel,
  isSubscribed,
  onSubscribeRequest,
}) => {
  const [open, setOpen] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const style = SEMESTER_STYLES[styleIndex % SEMESTER_STYLES.length];

  const filtered = items.filter((l) => {
    const matchSearch = l.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === "All" || l.category === selectedCategory;
    const matchLevel = selectedLevel === "All Levels" || l.level === selectedLevel;
    return matchSearch && matchCategory && matchLevel;
  });

  if (filtered.length === 0) return null;

  const [, yearNum, , semNum] = label.split(" ");

  const totalVideos = filtered.reduce((acc, l) => {
    if (l.videos) return acc + l.videos.length;
    if (l.videoLink) return acc + 1;
    return acc;
  }, 0);

  return (
    <div className="mb-14">
      {/* Section header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-gradient-to-r ${style.gradient} shadow-lg mb-6 group transition-all hover:shadow-xl hover:scale-[1.01] duration-200`}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div className="text-left">
            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5">
              <Calendar className="h-3 w-3" /> ITE Programme
            </p>
            <h2 className="text-white text-xl font-extrabold tracking-tight">
              Year {yearNum} — Semester {semNum}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-white text-xs font-semibold border border-white/20">
            <BookOpen className="h-3 w-3" /> {filtered.length} subjects
            {totalVideos > 0 && (
              <span className="ml-1 text-red-300 flex items-center gap-1">
                <Film className="h-3 w-3" /> {totalVideos} videos
              </span>
            )}
          </span>
          <div
            className={`w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          >
            <ChevronDown className="h-5 w-5 text-white" />
          </div>
        </div>
      </button>

      {/* Card grid */}
      {open && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.slice(0, visibleCount).map((l, i) => (
              <LessonCard
                key={l.id}
                lesson={l}
                index={i}
                style={style}
                isSubscribed={isSubscribed}
                onSubscribeRequest={onSubscribeRequest}
              />
            ))}
          </div>

          {visibleCount < filtered.length && (
            <div className="text-center mt-8">
              <button
                onClick={() => setVisibleCount((v) => v + 3)}
                className="px-7 py-3 bg-white border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:border-indigo-500 hover:text-indigo-600 transition-all duration-300 hover:shadow-md flex items-center gap-2 mx-auto"
              >
                Show more
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

/* ─── Main LessonsPage ─── */
const LessonsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const categories = ["All", ...new Set(lessons.map((l) => l.category))];
  const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

  const totalVideos = lessons.reduce((acc, l) => {
    if (l.videos) return acc + l.videos.length;
    if (l.videoLink) return acc + 1;
    return acc;
  }, 0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    const onMouse = (e) =>
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const semesters = buildSemesters(lessons);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative">
      <style>{`
        @keyframes fadeInUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        [data-reveal] { opacity:0; transform:translateY(24px); transition:opacity .6s ease, transform .6s ease; }
        [data-reveal].revealed { opacity:1; transform:none; }
        .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .animate-pulse-slow { animation: pulse 4s ease-in-out infinite; }
        @keyframes pulse { 0%,100%{opacity:.3;transform:scale(1);} 50%{opacity:.5;transform:scale(1.1);} }
        .animate-bounce-slow { animation: bounce-custom 2s ease-in-out infinite; }
        @keyframes bounce-custom { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
        .animate-scroll-dot { animation: sdot 1.5s ease-in-out infinite; }
        @keyframes sdot { 0%{transform:translateY(0);opacity:1;} 50%{transform:translateY(8px);opacity:.4;} 100%{transform:translateY(0);opacity:1;} }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }

        /* ── Dark Mode ── */
        html.dark-mode .min-h-screen.bg-gradient-to-b { background: #0d0d1a !important; }
        html.dark-mode .group.bg-white,
        html.dark-mode .bg-white { background-color: #1a1a35 !important; }
        html.dark-mode .bg-gray-50 { background-color: #14142b !important; }
        html.dark-mode .bg-gray-100 { background-color: #1e1e38 !important; }
        html.dark-mode .text-gray-900 { color: #e8e8f5 !important; }
        html.dark-mode .text-gray-800 { color: #d0d0e8 !important; }
        html.dark-mode .text-gray-700 { color: #b8b8d8 !important; }
        html.dark-mode .text-gray-600 { color: #9999bb !important; }
        html.dark-mode .text-gray-500 { color: #7777aa !important; }
        html.dark-mode .text-gray-400 { color: #6666aa !important; }
        html.dark-mode .border-gray-100 { border-color: #2a2a4a !important; }
        html.dark-mode .border-gray-200 { border-color: #2e2e50 !important; }
        html.dark-mode .shadow-sm { box-shadow: 0 1px 8px rgba(0,0,0,0.4) !important; }
        html.dark-mode .hover\:shadow-2xl:hover { box-shadow: 0 8px 40px rgba(0,0,0,0.6) !important; }
        html.dark-mode .hover\:border-indigo-100:hover { border-color: #3a3a6a !important; }
        /* Search box */
        html.dark-mode input[type="text"] { background-color: #1a1a35 !important; color: #e8e8f5 !important; }
        html.dark-mode input::placeholder { color: #6666aa !important; }
        /* Filter pills */
        html.dark-mode .bg-white.text-gray-600 { background-color: #1a1a35 !important; color: #9999cc !important; border-color: #2a2a4a !important; }
        /* Level badges */
        html.dark-mode .bg-green-100  { background-color: #0e2a1e !important; }
        html.dark-mode .text-green-700 { color: #4ade80 !important; }
        html.dark-mode .border-green-200 { border-color: #166534 !important; }
        html.dark-mode .bg-yellow-100  { background-color: #2a200e !important; }
        html.dark-mode .text-yellow-700 { color: #fbbf24 !important; }
        html.dark-mode .border-yellow-200 { border-color: #854d0e !important; }
        html.dark-mode .bg-red-100  { background-color: #2a0e0e !important; }
        html.dark-mode .text-red-700 { color: #f87171 !important; }
        html.dark-mode .border-red-200 { border-color: #991b1b !important; }
        /* Playlist tags */
        html.dark-mode .bg-gray-100.text-gray-600 { background-color: #1e1e38 !important; color: #9999cc !important; }
        html.dark-mode .bg-amber-50 { background-color: #2a200e !important; }
        html.dark-mode .text-amber-600 { color: #fbbf24 !important; }
        html.dark-mode .border-amber-200 { border-color: #92400e !important; }
        /* Free preview banner */
        html.dark-mode .bg-amber-50.border-amber-200 { background-color: #1e1608 !important; border-color: #78350f !important; }
        html.dark-mode .text-amber-900 { color: #fde68a !important; }
        html.dark-mode .text-amber-700 { color: #fcd34d !important; }
        /* Hover progress bar bg */
        html.dark-mode .bg-gray-100 { background-color: #1e1e38 !important; }
        /* CTA button on card */
        html.dark-mode .bg-gray-50 { background-color: #14142b !important; color: #9999cc !important; }
        /* Select */
        html.dark-mode select { background-color: #1a1a35 !important; color: #e8e8f5 !important; border-color: #2a2a4a !important; }
      `}</style>

      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Back-to-top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className={`fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
          scrollProgress > 20
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-spin-slow opacity-80" />
        <span className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 hover:scale-110 group shadow-lg shadow-indigo-500/40">
          <ChevronDown className="h-5 w-5 text-white rotate-180 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </span>
      </button>

      {/* Subscription badge (top-right) */}
      <div className="fixed top-4 right-4 z-40">
        {isSubscribed ? (
          <div className="flex items-center gap-2 bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
            ✅ Subscribed
          </div>
        ) : (
          <button
            onClick={() => setShowSubscriptionModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg hover:from-indigo-700 hover:to-violet-700 transition-all"
          >
            🔓 Subscribe to Unlock All
          </button>
        )}
      </div>

      {/* HERO */}
      <div className="relative w-full h-[580px] overflow-hidden">
        <img
          src={lessonImage}
          alt="Lesson Banner"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(1.1)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div className="absolute inset-0 bg-black/60" style={{ zIndex: 1 }} />

        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <div
            className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="absolute inset-0 z-10 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="max-w-3xl" style={{ animation: "fadeInUp 0.7s ease-out both" }}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-5">
                <GraduationCap className="h-4 w-4 text-cyan-300" />
                <span className="text-xs font-semibold text-white uppercase tracking-widest">
                  ITE Programme · {totalVideos} Videos Available
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight tracking-tight">
                Expand Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">
                  Knowledge Horizon
                </span>
              </h1>
              <p
                className="text-lg text-gray-200 max-w-xl"
                style={{ animation: "fadeInUp 0.7s 0.2s ease-out both" }}
              >
                Comprehensive video lessons crafted by industry experts — organised by year and
                semester.{" "}
                <span className="text-amber-300 font-semibold">
                  First {FREE_VIDEO_LIMIT} videos per course are free.
                </span>
              </p>

              {/* Hero CTA */}
              {!isSubscribed && (
                <button
                  onClick={() => setShowSubscriptionModal(true)}
                  className="mt-6 inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-6 py-3 rounded-2xl hover:bg-indigo-50 transition-all shadow-xl"
                  style={{ animation: "fadeInUp 0.7s 0.35s ease-out both" }}
                >
                  🔓 Unlock All Videos — $9.99/mo
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow z-10">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-scroll-dot" />
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-16">

        {/* Free preview banner */}
        {!isSubscribed && (
          <div
            data-reveal
            className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">👋</span>
              <div>
                <p className="font-semibold text-amber-900 text-sm">Free Preview Mode</p>
                <p className="text-amber-700 text-xs">
                  Watch the first {FREE_VIDEO_LIMIT} videos in any course for free. Subscribe to
                  unlock everything.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSubscriptionModal(true)}
              className="shrink-0 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              Unlock All →
            </button>
          </div>
        )}

        {/* Search */}
        <div data-reveal className="mb-6">
          <div className="flex max-w-2xl mx-auto shadow-lg rounded-2xl p-1 border hover:shadow-xl transition-shadow"
            style={{ background: document.documentElement.classList.contains("dark-mode") ? "#1a1a35" : "white", borderColor: document.documentElement.classList.contains("dark-mode") ? "#2a2a4a" : "#f3f4f6" }}>
            <div className="flex-1 flex items-center px-4">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent border-none text-gray-900 placeholder-gray-400 px-4 py-3 focus:outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-7 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center gap-2 hover:scale-105">
              <Search className="h-4 w-4" /> Search
            </button>
          </div>
        </div>

        {/* Filters */}
        <div data-reveal className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200"
                    : `${document.documentElement.classList.contains("dark-mode") ? "text-gray-300 border-[#2a2a4a] hover:border-indigo-500" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-indigo-200"}`
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              style={{ background: document.documentElement.classList.contains("dark-mode") ? "#1a1a35" : "white", borderColor: document.documentElement.classList.contains("dark-mode") ? "#2a2a4a" : "#e5e7eb", color: document.documentElement.classList.contains("dark-mode") ? "#e8e8f5" : "#4b5563", border: "1.5px solid" }}
            >
              {levels.map((lv) => (
                <option key={lv}>{lv}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Semester sections */}
        {semesters.length > 0 ? (
          semesters.map((sem, idx) => (
            <SemesterSection
              key={sem.label}
              label={sem.label}
              items={sem.items}
              styleIndex={idx}
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              selectedLevel={selectedLevel}
              isSubscribed={isSubscribed}
              onSubscribeRequest={() => setShowSubscriptionModal(true)}
            />
          ))
        ) : (
          <SemesterSection
            label="Year 1 Semester 1"
            items={lessons}
            styleIndex={0}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            selectedLevel={selectedLevel}
            isSubscribed={isSubscribed}
            onSubscribeRequest={() => setShowSubscriptionModal(true)}
          />
        )}
      </div>

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <SubscriptionModal
          onClose={() => setShowSubscriptionModal(false)}
          onSubscribe={() => {
            setIsSubscribed(true);
            setShowSubscriptionModal(false);
          }}
        />
      )}
    </div>
  );
};

export default LessonsPage;