import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  Bell,
  ChevronDown,
  Menu,
  X,
  GraduationCap,
  Calendar,
  Home,
  Layers,
  User,
  BookMarked,
  Award,
  Clock,
  TrendingUp,
  Settings,
  Sparkles,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";

const Navbar = ({ isAuthenticated, user, onLogout, onAuthModalOpen }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const notifications = [
    { id: 1, message: "New lesson available", time: "5 min ago", read: false },
    {
      id: 2,
      message: "Your certificate is ready",
      time: "1 hr ago",
      read: false,
    },
    { id: 3, message: "Upcoming deadline", time: "2 hrs ago", read: true },
  ];
  const unreadCount = notifications.filter((n) => !n.read).length;

  const glassNav = isScrolled
    ? "bg-white/85 backdrop-blur-2xl border-b border-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.07)]"
    : "bg-black/15 backdrop-blur-lg border-b border-white/10";
  const textPrimary = isScrolled ? "text-gray-800" : "text-white";
  const textMuted = isScrolled ? "text-gray-500" : "text-white/60";
  const hoverBg = isScrolled ? "hover:bg-indigo-50/80" : "hover:bg-white/10";

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Lessons", href: "/lessons", icon: BookOpen },
    { name: "Projects", href: "/projects", icon: Layers },
    { name: "Calendar", href: "/calendar", icon: Calendar },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${glassNav}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex h-[66px] items-center justify-between gap-4">
          {/* LEFT */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden flex items-center justify-center w-9 h-9 rounded-xl transition-all ${hoverBg} ${textPrimary}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            <Link
              to="/"
              className="flex items-center gap-2.5 group select-none"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-[11px] flex-shrink-0 shimmer-badge shadow-lg shadow-indigo-500/40 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-indigo-500/50">
                <GraduationCap className="h-[18px] w-[18px] text-white" />
              </div>
              <span className={`text-[1.15rem] font-extrabold tracking-[-0.02em] whitespace-nowrap transition-colors duration-300 ${isScrolled ? "text-gray-900" : "text-white drop-shadow-sm"}`}>
                Edu
                <span className={isScrolled ? "text-indigo-600" : "text-cyan-300"}>
                  Learn
                </span>
              </span>
            </Link>
          </div>

          {/* CENTER - desktop links */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`
                  relative flex items-center gap-2 rounded-xl px-4 py-2
                  text-[0.82rem] font-semibold tracking-wide transition-all duration-200
                  ${location.pathname === link.href
                    ? isScrolled
                      ? "bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100"
                      : "bg-white/15 text-white ring-1 ring-white/20"
                    : isScrolled
                      ? `text-gray-600 ${hoverBg} hover:text-indigo-600`
                      : `text-white/75 ${hoverBg} hover:text-white`
                  }
                `}
              >
                <link.icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                {link.name}
                {location.pathname === link.href && (
                  <span className={`absolute -bottom-px left-4 right-4 h-[2px] rounded-full ${isScrolled ? "bg-gradient-to-r from-indigo-500 to-violet-500" : "bg-white/70"}`} />
                )}
              </Link>
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {isAuthenticated && user ? (
              <>
                <button className={`relative flex items-center justify-center w-9 h-9 rounded-xl transition-all ${hoverBg} ${textPrimary}`}>
                  <Bell className="h-[18px] w-[18px]" strokeWidth={2} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                    </span>
                  )}
                </button>

                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className={`group flex items-center gap-2 rounded-xl pl-1 pr-2.5 py-1 transition-all ${hoverBg} ring-1 ${isScrolled ? "ring-gray-200" : "ring-white/15"}`}
                  >
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-7 w-7 rounded-lg object-cover ring-2 ring-indigo-400"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-white" />
                    </div>
                    <div className="hidden lg:block text-left leading-tight">
                      <p className={`text-[0.78rem] font-semibold ${textPrimary}`}>
                        {user.name.split(" ")[0]}
                      </p>
                      <p className={`text-[0.68rem] ${textMuted}`}>
                        {user.role}
                      </p>
                    </div>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isProfileMenuOpen ? "rotate-180" : ""} ${textMuted}`} />
                  </button>

                  {isProfileMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsProfileMenuOpen(false)} />
                      <div className="dropdown-animate absolute right-0 mt-3 w-72 z-50">
                        <div className="rounded-2xl bg-white/95 backdrop-blur-2xl shadow-2xl shadow-black/12 ring-1 ring-black/5 overflow-hidden">
                          <div className="relative px-5 py-5 bg-gradient-to-br from-indigo-600 to-violet-700">
                            <div className="flex items-center gap-3">
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="h-12 w-12 rounded-xl object-cover ring-2 ring-white/30"
                              />
                              <div className="min-w-0">
                                <p className="text-sm font-bold text-white truncate">
                                  {user.name}
                                </p>
                                <p className="text-xs text-white/65 truncate">
                                  {user.email}
                                </p>
                                <span className="inline-block mt-1 text-[10px] font-medium bg-white/20 text-white px-2 py-0.5 rounded-full">
                                  Since {new Date(user.joinDate).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 mt-4">
                              {[
                                ["Progress", `${user.progress}%`],
                                ["Courses", user.coursesEnrolled],
                                ["Certs", user.certificates],
                              ].map(([l, v]) => (
                                <div key={l} className="text-center p-2 bg-white/10 rounded-xl">
                                  <p className="text-[10px] text-white/55">{l}</p>
                                  <p className="text-sm font-bold text-white">{v}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="py-2">
                            {[
                              { icon: User, label: "Your Profile", to: "/profile" },
                              { icon: BookMarked, label: "My Courses", to: "/my-courses", count: user.coursesEnrolled },
                              { icon: Award, label: "Certificates", to: "/certificates", count: user.certificates },
                              { icon: Clock, label: "Schedule", to: "/schedule" },
                              { icon: TrendingUp, label: "Progress Tracker", to: "/progress" },
                              { icon: Settings, label: "Settings", to: "/settings" },
                            ].map((item, i) => (
                              <Link
                                key={i}
                                to={item.to}
                                className="group flex items-center gap-3 px-5 py-2.5 text-[0.82rem] text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                                onClick={() => setIsProfileMenuOpen(false)}
                              >
                                <item.icon className="h-4 w-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                                <span className="font-medium">{item.label}</span>
                                {item.count !== undefined && (
                                  <span className="ml-auto text-[10px] font-semibold bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">
                                    {item.count}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                          <div className="border-t border-gray-100 px-5 py-3">
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
                              Achievements
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {user.achievements.map((a, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 text-[11px] font-medium rounded-full ring-1 ring-amber-200/60"
                                >
                                  <Sparkles className="h-2.5 w-2.5" />
                                  {a}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="border-t border-gray-100 p-2">
                            <button
                              onClick={() => {
                                onLogout();
                                setIsProfileMenuOpen(false);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-[0.82rem] font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                            >
                              <LogOut className="h-4 w-4" />
                              Sign out
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onAuthModalOpen(true)}
                  className={`hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-[0.82rem] font-semibold transition-all whitespace-nowrap ${isScrolled ? "text-gray-700 hover:bg-gray-100 ring-1 ring-gray-200" : "text-white hover:bg-white/15 ring-1 ring-white/25"}`}
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </button>
                <button
                  onClick={() => onAuthModalOpen(false)}
                  className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl text-[0.82rem] font-bold bg-white text-gray-900 hover:bg-white/90 shadow-lg shadow-black/10 transition-all whitespace-nowrap hover:scale-[1.02] active:scale-[0.98]"
                >
                  <UserPlus className="h-4 w-4" />
                  <span className="hidden sm:inline">Get Started</span>
                  <span className="sm:hidden">Join</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? "max-h-[36rem] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className={`${isScrolled ? "bg-white/90 backdrop-blur-2xl" : "bg-black/40 backdrop-blur-xl"} border-t ${isScrolled ? "border-gray-200/60" : "border-white/10"}`}>
          <div className="px-5 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all
                  ${location.pathname === link.href
                    ? isScrolled
                      ? "bg-indigo-50 text-indigo-700"
                      : "bg-white/15 text-white"
                    : isScrolled
                      ? "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
                {location.pathname === link.href && (
                  <span className="ml-auto text-[10px] font-bold bg-indigo-500 text-white px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </Link>
            ))}
            <div className="pt-4 mt-3 border-t border-white/15 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onAuthModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/15 text-white text-sm font-semibold"
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </button>
              <button
                onClick={() => {
                  onAuthModalOpen(false);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-gray-900 text-sm font-bold shadow-lg"
              >
                <UserPlus className="h-4 w-4" />
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;