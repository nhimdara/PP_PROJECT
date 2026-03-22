import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../components/assets/image/logo.png";
import banner from "../assets/image/banner.jpg";

const LoginPage = ({ onAuthSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const validate = () => {
    const e = {};
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    const stored = localStorage.getItem("registered_user");
    if (stored) {
      const user = JSON.parse(stored);
      if (user.email === email && user.password === password) {
        const { password: _, ...safeUser } = user;
        localStorage.setItem("user", JSON.stringify(safeUser));
        localStorage.setItem("token", "token-" + safeUser.id);
        setIsLoading(false);
        if (onAuthSuccess) onAuthSuccess(safeUser);
        navigate("/dashboard");
        return;
      }
    }

    setIsLoading(false);
    setErrors({ general: "Incorrect email or password. Please try again." });
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const inputBase =
    "w-full bg-white/5 border rounded-xl text-gray-200 text-sm py-2.5 transition-all duration-200 focus:outline-none focus:border-cyan-400 focus:bg-cyan-500/10 focus:ring-2 focus:ring-cyan-500/20 placeholder-gray-600";

  return (
    <div className="min-h-screen bg-[#05090f] font-sans relative overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute w-[700px] h-[700px] rounded-full top-[-200px] left-[-200px]" />
        <img
          src={banner}
          alt="Background Banner"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-20 blur-lg"
        />
      </div>

      {/* ── Page layout: column on mobile → row on lg ── */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* ══ INTRO PANEL — top on mobile, left sidebar on desktop ══ */}
        <div
          className="
          w-full lg:flex-1
          flex flex-col
          px-6 pt-8 pb-7
          sm:px-10 sm:pt-10 sm:pb-8
          lg:px-11 xl:px-14 lg:py-[44px]
          border-b lg:border-b-0 lg:border-r border-cyan-500/[0.07]
          mx-auto max-w-7xl
        "
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl blur-lg opacity-60" />
              <img
                src={logo}
                alt="LearnFlow Logo"
                className="relative w-full h-full"
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap">
              E<span className="text-indigo-300">learning</span>
            </span>
          </div>

          <div className="lg:flex-1 lg:flex lg:flex-col lg:justify-center">
            <p className="text-cyan-400 text-[11px] font-bold tracking-[2px] uppercase mb-2.5">
              Welcome back
            </p>
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold leading-[1.05] tracking-[-2px] text-[#f0f9ff] mb-3">
              Continue your
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                journey.
              </span>
            </h1>
            <p className="text-[#4b6d8a] text-sm leading-relaxed max-w-sm mb-8">
              Pick up right where you left off. Your courses, progress, and
              certificates are waiting.
            </p>

            {/* Notice */}
            <div className="flex gap-3 items-start bg-cyan-500/[0.06] border border-cyan-500/[0.12] rounded-xl p-3.5 sm:p-4">
              <div className="shrink-0 mt-0.5">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle
                    cx="8"
                    cy="8"
                    r="7"
                    stroke="#38bdf8"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M8 5v4M8 11v.5"
                    stroke="#38bdf8"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-[#4b6d8a] text-[13px] leading-relaxed">
                Don't have an account yet?{" "}
                <Link
                  to="/register"
                  className="text-cyan-400 font-semibold hover:underline"
                >
                  Register first
                </Link>{" "}
                — it's free and only takes 2 minutes.
              </p>
            </div>
          </div>
        </div>

        {/* ══ FORM PANEL — bottom on mobile, right column on desktop ══ */}
        <div
          className="
          w-full lg:w-[800px] xl:w-[740px]
          flex items-start lg:items-center justify-center
          px-5 py-8
          sm:px-8
          lg:p-10
        "
        >
          <div
            className={`w-full max-w-[420px] bg-white/[0.025] border border-white/[0.065] rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_28px_70px_rgba(0,0,0,0.55)] animate-fadeUp ${shake ? "animate-shake" : ""}`}
          >
            {/* Avatar icon */}
            <div className="w-14 h-14 rounded-full bg-cyan-500/[0.07] border border-cyan-500/[0.15] flex items-center justify-center mb-5">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle
                  cx="14"
                  cy="14"
                  r="13"
                  stroke="rgba(56,189,248,0.3)"
                  strokeWidth="1.5"
                />
                <circle
                  cx="14"
                  cy="11"
                  r="4"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                />
                <path
                  d="M5 24c0-4 4-7 9-7s9 3 9 7"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-[#e0f2fe] tracking-tight mb-1">
              Sign in to your account
            </h2>
            <p className="text-[#334155] text-sm mb-6">
              Enter your credentials to continue
            </p>

            {errors.general && (
              <div className="flex items-center gap-2 bg-red-500/[0.08] border border-red-500/20 rounded-xl px-3.5 py-3 text-[13px] text-red-300 mb-4">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <circle
                    cx="7.5"
                    cy="7.5"
                    r="6.5"
                    stroke="#f87171"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M7.5 4.5v4M7.5 10.5v.3"
                    stroke="#f87171"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
                {errors.general}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-4"
            >
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Email address
                </label>
                <div className="relative">
                  <MailIcon />
                  <input
                    className={`${inputBase} pl-9 pr-4 ${errors.email ? "border-red-500" : "border-white/10"}`}
                    type="email"
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((p) => ({ ...p, email: "", general: "" }));
                    }}
                    autoFocus
                  />
                </div>
                {errors.email && (
                  <span className="text-red-400 text-xs">{errors.email}</span>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-cyan-400 text-xs font-semibold hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <LockIcon />
                  <input
                    className={`${inputBase} pl-9 pr-10 ${errors.password ? "border-red-500" : "border-white/10"}`}
                    type={showPw ? "text" : "password"}
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((p) => ({ ...p, password: "", general: "" }));
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors"
                    onClick={() => setShowPw((v) => !v)}
                  >
                    <EyeIcon open={showPw} />
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-400 text-xs">
                    {errors.password}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-xl text-white text-[15px] font-bold shadow-lg shadow-cyan-500/25 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1"
              >
                {isLoading ? (
                  <span className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In <ArrowIcon />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-[#334155] text-sm mt-6">
              New to LearnFlow?{" "}
              <Link
                to="/register"
                className="text-cyan-400 font-semibold hover:underline"
              >
                Create a free account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        body, input, button { font-family: 'Sora', sans-serif; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeUp { animation: fadeUp 0.4s ease; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 0.7s linear infinite; }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
        .animate-shake { animation: shake 0.5s ease; }
      `}</style>
    </div>
  );
};

const MailIcon = () => (
  <svg
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
  >
    <rect
      x="1"
      y="3"
      width="12"
      height="8"
      rx="1.2"
      stroke="currentColor"
      strokeWidth="1.1"
    />
    <path
      d="M1 4.5l6 4 6-4"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
  >
    <rect
      x="2.5"
      y="6"
      width="9"
      height="6.5"
      rx="1.2"
      stroke="currentColor"
      strokeWidth="1.1"
    />
    <path
      d="M4 6V4.5a3 3 0 016 0V6"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
  </svg>
);

const EyeIcon = ({ open }) =>
  open ? (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M1 7s2.5-4.5 6-4.5S13 7 13 7s-2.5 4.5-6 4.5S1 7 1 7z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="7" cy="7" r="1.8" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M2 2l10 10"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M1 7s2.5-4.5 6-4.5S13 7 13 7s-2.5 4.5-6 4.5S1 7 1 7z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="7" cy="7" r="1.8" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2 7h10M8 3l4 4-4 4"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LoginPage;
