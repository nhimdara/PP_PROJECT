import React from "react";
import { Link } from "react-router-dom";
import banner from "./../../assets/image/banner.jpg";
import {
  BookOpen,
  Users,
  CheckCircle,
  ArrowRight,
  Zap,
  Trophy,
  Play,
  GraduationCap,
} from "lucide-react";

const HomePage = ({ onAuthModalOpen }) => {
  const stats = [
    { icon: Users, value: "5k+", label: "Students" },
    { icon: BookOpen, value: "200+", label: "Courses" },
    { icon: Trophy, value: "98%", label: "Success Rate" },
  ];

  const features = [
    "Expert-led video courses",
    "Live mentorship sessions",
    "Industry certificates",
    "Lifetime course access",
  ];

  const aboutCards = [
    {
      icon: BookOpen,
      color: "from-indigo-500 to-violet-600",
      bg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      title: "200+ Expert Courses",
      desc: "From coding and design to business and creativity — our curriculum is crafted by industry professionals and updated regularly.",
    },
    {
      icon: Users,
      color: "from-cyan-500 to-indigo-600",
      bg: "bg-cyan-50",
      iconColor: "text-cyan-600",
      title: "Live Mentorship",
      desc: "Get real-time guidance from mentors who've been where you want to go. Weekly office hours, 1-on-1 sessions, and group workshops.",
    },
    {
      icon: Trophy,
      color: "from-amber-500 to-orange-600",
      bg: "bg-amber-50",
      iconColor: "text-amber-600",
      title: "Recognised Certificates",
      desc: "Earn certificates that employers trust. Our credentials are backed by top universities and Fortune 500 partners.",
    },
    {
      icon: Zap,
      color: "from-violet-500 to-pink-600",
      bg: "bg-violet-50",
      iconColor: "text-violet-600",
      title: "Learn at Your Pace",
      desc: "Lifetime access to every course you enrol in. Pause, replay, and revisit lessons whenever and wherever you want.",
    },
    {
      icon: CheckCircle,
      color: "from-rose-500 to-red-600",
      bg: "bg-rose-50",
      iconColor: "text-rose-600",
      title: "98% Success Rate",
      desc: "Our structured learning paths and accountability tools ensure you finish what you start and actually apply what you learn.",
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex flex-col overflow-hidden">
        <img
          src={banner}
          alt="EduLearn campus"
          className="hero-bg"
          loading="eager"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-transparent to-cyan-900/20" />

        {/* HERO CONTENT */}
        <div className="relative z-10 flex flex-col justify-center flex-1 pt-[66px]">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-28">
            <div className="max-w-xl lg:max-w-2xl">
              <div className="anim-1 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card mb-6 sm:mb-8">
                <Zap className="h-3.5 w-3.5 text-cyan-300" />
                <span className="text-[0.72rem] font-semibold text-white/90 tracking-wide uppercase">
                  #1 Online Learning Platform
                </span>
              </div>

              <h1 className="anim-2 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.08] tracking-[-0.03em] mb-4 sm:mb-6">
                Learn Without
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-300 to-violet-300">
                  Limits
                </span>
              </h1>

              <p className="anim-3 body-font text-base sm:text-lg text-white/75 leading-relaxed mb-6 sm:mb-8 max-w-lg">
                Join over{" "}
                <strong className="text-white font-semibold">
                  50,000+ students
                </strong>{" "}
                worldwide unlocking their potential with expert-led courses,
                live mentorship, and industry-recognised certificates.
              </p>

              <ul className="anim-3 body-font grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-8 sm:mb-10">
                {features.map((f, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-white/80">
                    <CheckCircle className="h-4 w-4 text-cyan-400 flex-shrink-0" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="anim-4 flex flex-wrap gap-3 sm:gap-4">
                <Link
                  to="/lessons"
                  className="learn-btn-pulse relative flex items-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 text-white text-[0.9rem] sm:text-base font-bold shadow-2xl shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
                >
                  <Play className="h-4 w-4 sm:h-5 sm:w-5 fill-white" />
                  Start Learning Now
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>

                <Link
                  to="/lessons"
                  className="flex items-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-white/10 backdrop-blur-sm text-white text-[0.9rem] sm:text-base font-semibold ring-1 ring-white/25 hover:bg-white/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                  Explore Courses
                </Link>
              </div>
            </div>
          </div>

          {/* Floating stat cards */}
          <div className="relative z-10 w-full pb-8 sm:pb-10">
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {stats.map(({ icon: Icon, value, label }, i) => (
                  <div
                    key={label}
                    className={`stat-card rounded-2xl px-4 sm:px-5 py-4 text-center ${i % 2 === 0 ? "float-badge" : "float-badge-2"}`}
                    style={{
                      background: "rgba(0,0,0,0.30)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/30 mb-2">
                      <Icon className="h-4 w-4 text-indigo-300" />
                    </div>
                    <p className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      {value}
                    </p>
                    <p className="text-[0.7rem] text-white/55 font-medium body-font">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="body-font bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-[0.72rem] font-bold uppercase tracking-[0.15em] text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full mb-4">
              About EduLearn
            </span>
            <h2 className="nav-font text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
              Built for the
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                {" "}future of learning
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-500 text-base sm:text-lg leading-relaxed">
              EduLearn is a next-generation online education platform that
              combines expert instruction, community, and technology to help you
              grow your career and knowledge — on your schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {aboutCards.map(({ icon: Icon, color, bg, iconColor, title, desc }) => (
              <div
                key={title}
                className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`absolute top-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${bg} mb-4`}>
                  <Icon className={`h-5 w-5 ${iconColor}`} strokeWidth={2} />
                </div>
                <h3 className="nav-font text-[1rem] font-bold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 sm:mt-20 relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 px-6 sm:px-10 py-12 sm:py-14 text-center">
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/5 blur-2xl" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative z-10">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.15em] text-indigo-200 mb-3">
                Ready to start?
              </p>
              <h3 className="nav-font text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 tracking-tight">
                Your future starts today.
              </h3>
              <p className="text-white/65 body-font mb-8 max-w-md mx-auto text-sm sm:text-base">
                Join thousands of learners who transformed their careers with
                EduLearn. First course is completely free.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => onAuthModalOpen(false)}
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-indigo-700 font-bold text-sm sm:text-base shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all"
                >
                  <Play className="h-4 w-4 fill-indigo-600" />
                  Start Learning Now
                </button>
                <Link
                  to="/lessons"
                  className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-white/10 ring-1 ring-white/20 text-white font-semibold text-sm sm:text-base hover:bg-white/20 transition-all"
                >
                  <BookOpen className="h-4 w-4" />
                  Browse Free Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;