import React, { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  Clock,
  PlayCircle,
  Star,
  Users,
  Filter,
  Search,
  ChevronDown,
  ChevronRight,
  Award,
  Zap,
  GraduationCap,
  Calendar,
} from "lucide-react";
import lessonImage from "./../assets/image/lessonpage.jpeg"; // FIX: Renamed import to avoid conflict with variable name
import { lessons } from "./../data/Lesson";

/* ─── Group lessons by year + semester ─── */
const buildSemesters = (lessons) => {
  const map = {};
  lessons.forEach((l) => {
    const key = l.semester || "Year 1 Semester 1"; // fallback if field missing
    if (!map[key]) map[key] = [];
    map[key].push(l);
  });

  // Ensure deterministic order: Y1S1 → Y1S2 → Y2S1 … Y4S2
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

/* ─── Single lesson card ─── */
const LessonCard = ({ lesson: l, index, style }) => {
  const [hovered, setHovered] = useState(false);

  // FIX 1: Provide default icon based on category if l.icon doesn't exist
  const getIcon = () => {
    if (l.icon) return l.icon;

    // Default icons based on category
    const iconMap = {
      Frontend: "💻",
      Backend: "⚙️",
      JavaScript: "🟨",
      Design: "🎨",
      CSS: "🎯",
      Database: "🗄️",
      DevOps: "🚀",
    };

    return iconMap[l.category] || "📚";
  };

  // FIX 2: Provide default gradient if l.color doesn't exist
  const cardGradient =
    l.color || style?.gradient || "from-indigo-500 to-purple-600";

  return (
    <div
      className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-indigo-100 transform hover:-translate-y-2"
      style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card header */}
      <div
        className={`relative h-44 bg-gradient-to-br ${cardGradient} overflow-hidden`}
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
          className={`absolute inset-0 flex items-center justify-center transition-all duration-400 ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
        >
          <div className="bg-white/30 backdrop-blur-sm rounded-full p-3">
            <PlayCircle className="h-10 w-10 text-white" />
          </div>
        </div>
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
          <span className="flex items-center text-gray-500 text-xs group-hover:text-indigo-600 transition-colors">
            <Users className="h-3.5 w-3.5 mr-1" />
            {/* FIX 3: Handle undefined students value */}
            {l.students ? l.students.toLocaleString() : "0"}
          </span>
        </div>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2 group-hover:text-gray-800 transition-colors">
          {l.description}
        </p>

        {/* Hover progress bar */}
        <div className="mb-4 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700"
            style={{ width: hovered ? "100%" : "0%", opacity: hovered ? 1 : 0 }}
          />
        </div>

        <button className="w-full bg-gray-50 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 text-gray-700 group-hover:text-white py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden">
          <span className="relative z-10">Start Learning</span>
          <PlayCircle className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </button>
      </div>
    </div>
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
}) => {
  const [open, setOpen] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const style = SEMESTER_STYLES[styleIndex % SEMESTER_STYLES.length];

  const filtered = items.filter((l) => {
    const matchSearch = l.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchCategory =
      selectedCategory === "All" || l.category === selectedCategory;
    const matchLevel =
      selectedLevel === "All Levels" || l.level === selectedLevel;
    return matchSearch && matchCategory && matchLevel;
  });

  if (filtered.length === 0) return null;

  // Parse label for display
  const [, yearNum, , semNum] = label.split(" "); // "Year 1 Semester 2"

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
              <LessonCard key={l.id} lesson={l} index={i} style={style} />
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

/* ─── Main page ─── */
const LessonsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const categories = [
    "All",
    "Frontend",
    "Backend",
    "JavaScript",
    "Design",
    "CSS",
  ];
  const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

  /* ── Scroll + mouse effects ── */
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

  /* ── Scroll reveal ── */
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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
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
        .animate-bounce-slow { animation: bounce 2s ease-in-out infinite; }
        @keyframes bounce { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
        .animate-scroll-dot { animation: sdot 1.5s ease-in-out infinite; }
        @keyframes sdot { 0%{transform:translateY(0);opacity:1;} 50%{transform:translateY(8px);opacity:.4;} 100%{transform:translateY(0);opacity:1;} }
      `}</style>

      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Back-to-top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:bg-indigo-700 transition-all duration-300 z-40 ${scrollProgress > 20 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
      >
        <ChevronDown className="h-6 w-6 rotate-180" />
      </button>

      {/* ── HERO ── */}
      <div className="relative w-full h-[580px] overflow-hidden">
        {/* FIX: Use the imported image correctly */}
        <img
          src={lessonImage}
          alt="Lesson Banner"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(1.1)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/60" style={{ zIndex: 1 }} />

        {/* Glow orbs */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 3 }}
        >
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <div
            className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* FIX: Hero text content with proper z-index */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
            <div
              className="max-w-3xl"
              style={{ animation: "fadeInUp 0.7s ease-out both" }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-5">
                <GraduationCap className="h-4 w-4 text-cyan-300" />
                <span className="text-xs font-semibold text-white uppercase tracking-widest">
                  ITE Programme
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
                Discover comprehensive lessons crafted by industry experts —
                organised by year and semester.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow z-10">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-scroll-dot" />
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-16">
        {/* Search */}
        <div data-reveal className="mb-6">
          <div className="flex max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-1 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex-1 flex items-center px-4">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent border-none text-gray-900 placeholder-gray-400 px-4 py-3 focus:outline-none"
              />
            </div>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-7 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center gap-2 hover:scale-105">
              <Search className="h-4 w-4" /> Search
            </button>
          </div>
        </div>

        {/* Filters */}
        <div
          data-reveal
          className="mb-12 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-indigo-200"
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
              className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {levels.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── SEMESTER SECTIONS ── */}
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
          />
        )}
      </div>
    </div>
  );
};

export default LessonsPage;
