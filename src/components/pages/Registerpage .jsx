import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../components/assets/image/logo.png";
import banner from "../assets/image/banner.jpg";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Student",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone] = useState(false);

  const validate = () => {
    const e = {};
    if (step === 1) {
      if (!formData.firstName.trim()) e.firstName = "First name is required";
      if (!formData.lastName.trim()) e.lastName = "Last name is required";
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
        e.email = "Enter a valid email";
    }
    if (step === 2) {
      if (formData.password.length < 8) e.password = "At least 8 characters";
      if (formData.password !== formData.confirmPassword)
        e.confirmPassword = "Passwords do not match";
      if (!formData.agreeTerms) e.agreeTerms = "Please agree to the terms";
    }
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    const user = {
      id: Date.now().toString(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      avatar: null,
      progress: 0,
      coursesEnrolled: 0,
      certificates: 0,
      achievements: ["New Member"],
      joinDate: new Date().toISOString().split("T")[0],
    };
    localStorage.setItem("registered_user", JSON.stringify(user));
    localStorage.setItem("has_registered", "true");
    setIsLoading(false);
    setDone(true);
    setTimeout(() => navigate("/login"), 1800);
  };

  const pwStr = (() => {
    const p = formData.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();
  const strLabel = ["", "Weak", "Fair", "Good", "Strong"][pwStr];
  const strColor = ["", "#f87171", "#fb923c", "#facc15", "#4ade80"][pwStr];

  const inputBase =
    "w-full bg-white/5 border rounded-xl text-gray-200 text-sm px-4 py-2.5 transition-all duration-200 focus:outline-none focus:border-cyan-400 focus:bg-cyan-500/10 focus:ring-2 focus:ring-cyan-500/20 placeholder-gray-600";

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

      {/* Page layout */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* INTRO PANEL */}
        <div
          className="
          w-full lg:flex-1
          flex flex-col
          px-6 pt-8 pb-7
          sm:px-10 sm:pt-10 sm:pb-8
          lg:px-10 xl:px-14 lg:py-14
          border-b lg:border-b-0 lg:border-r border-cyan-500/10
          mx-auto max-w-7xl
        "
        >
          {/* Logo + Brand */}
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
            <p className="text-cyan-400 text-[11px] font-bold tracking-widest uppercase mb-2.5">
              Start for free today
            </p>
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold leading-[1.05] tracking-tighter text-cyan-50 mb-3">
              Unlock smarter
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                learning.
              </span>
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-6">
              Hands-on courses, real projects, and a community of learners — all
              in one place.
            </p>

            <div className="hidden sm:block">
              <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent mb-2.5" />
              <p className="text-gray-600 text-xs italic leading-relaxed mb-1">
                "ELearning changed how I study — I actually finish courses now."
              </p>
            </div>
          </div>
        </div>

        {/* FORM PANEL */}
        <div
          className="
          w-full lg:w-[800px] xl:w-[740px]
          flex items-start lg:items-center justify-center
          py-8
          sm:px-8
          lg:p-10
        "
        >
          <div className="w-full max-w-md bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl animate-fadeUp">
            {done ? (
              <div className="flex flex-col items-center gap-4 py-8 animate-fadeUp">
                <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <circle
                      cx="18"
                      cy="18"
                      r="17"
                      stroke="#4ade80"
                      strokeWidth="2"
                    />
                    <path
                      d="M10 18l5.5 5.5L26 12"
                      stroke="#4ade80"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-50 tracking-tight">
                  Account created!
                </h2>
                <p className="text-gray-500 text-sm">Taking you to sign in…</p>
                <div className="flex gap-1.5 mt-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center mb-5">
                  {[1, 2].map((n, i) => (
                    <React.Fragment key={n}>
                      <div
                        className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          step >= n
                            ? "bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/40"
                            : "border-white/10 bg-white/5 text-gray-600"
                        }`}
                      >
                        {step > n ? (
                          <svg width="11" height="11" viewBox="0 0 11 11">
                            <path
                              d="M1.5 5.5l3 3 5-5"
                              stroke="white"
                              strokeWidth="1.6"
                              fill="none"
                              strokeLinecap="round"
                            />
                          </svg>
                        ) : (
                          n
                        )}
                      </div>
                      {i < 1 && (
                        <div
                          className={`flex-1 h-0.5 mx-2 max-w-[44px] transition-all duration-300 ${step > 1 ? "bg-cyan-500" : "bg-white/10"}`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <h2 className="text-xl font-bold text-cyan-50 tracking-tight mb-1">
                  {step === 1 ? "Create your account" : "Secure your account"}
                </h2>
                <p className="text-gray-600 text-sm mb-6">
                  {step === 1
                    ? "Step 1 of 2 — Basic info"
                    : "Step 2 of 2 — Set a password"}
                </p>

                <form
                  onSubmit={step === 1 ? handleNext : handleSubmit}
                  noValidate
                  className="flex flex-col gap-4"
                >
                  {step === 1 && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <Field label="First name" error={errors.firstName}>
                          <input
                            className={`${inputBase} ${errors.firstName ? "border-red-500" : "border-white/10"}`}
                            name="firstName"
                            placeholder="Alex"
                            value={formData.firstName}
                            onChange={handleChange}
                            autoFocus
                          />
                        </Field>
                        <Field label="Last name" error={errors.lastName}>
                          <input
                            className={`${inputBase} ${errors.lastName ? "border-red-500" : "border-white/10"}`}
                            name="lastName"
                            placeholder="Johnson"
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                        </Field>
                      </div>

                      <Field label="Email address" error={errors.email}>
                        <div className="relative">
                          <MailIcon />
                          <input
                            className={`${inputBase} pl-9 ${errors.email ? "border-red-500" : "border-white/10"}`}
                            name="email"
                            type="email"
                            placeholder="alex@example.com"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </Field>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                          I am a…
                        </label>
                        <div className="flex gap-2">
                          {["Student", "Teacher", "Professional"].map((r) => (
                            <button
                              key={r}
                              type="button"
                              className={`flex-1 py-2.5 px-2 border rounded-xl text-xs font-semibold transition-all ${
                                formData.role === r
                                  ? "border-cyan-400 bg-cyan-500/15 text-cyan-400"
                                  : "border-white/10 bg-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-400"
                              }`}
                              onClick={() =>
                                setFormData((p) => ({ ...p, role: r }))
                              }
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-xl text-white text-sm font-bold shadow-lg shadow-cyan-500/25 hover:opacity-90 active:scale-[0.98] transition-all mt-1"
                      >
                        Continue <ArrowIcon />
                      </button>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <Field label="Password" error={errors.password}>
                        <div className="relative">
                          <LockIcon />
                          <input
                            className={`${inputBase} pl-9 pr-10 ${errors.password ? "border-red-500" : "border-white/10"}`}
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Min. 8 characters"
                            value={formData.password}
                            onChange={handleChange}
                            autoFocus
                          />
                          <EyeToggle
                            show={showPassword}
                            onToggle={() => setShowPassword((v) => !v)}
                          />
                        </div>
                        {formData.password && (
                          <div className="flex items-center gap-2 mt-1.5">
                            <div className="flex gap-1 flex-1">
                              {[1, 2, 3, 4].map((i) => (
                                <div
                                  key={i}
                                  className="flex-1 h-1 rounded-full transition-all"
                                  style={{
                                    background:
                                      pwStr >= i
                                        ? strColor
                                        : "rgba(255,255,255,0.07)",
                                  }}
                                />
                              ))}
                            </div>
                            <span
                              className="text-[11px] font-bold"
                              style={{ color: strColor }}
                            >
                              {strLabel}
                            </span>
                          </div>
                        )}
                      </Field>

                      <Field
                        label="Confirm password"
                        error={errors.confirmPassword}
                      >
                        <div className="relative">
                          <CheckIcon />
                          <input
                            className={`${inputBase} pl-9 pr-10 ${errors.confirmPassword ? "border-red-500" : "border-white/10"}`}
                            name="confirmPassword"
                            type={showConfirm ? "text" : "password"}
                            placeholder="Repeat password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                          />
                          <EyeToggle
                            show={showConfirm}
                            onToggle={() => setShowConfirm((v) => !v)}
                          />
                        </div>
                      </Field>

                      <div>
                        <label
                          className="flex items-start gap-2.5 cursor-pointer text-gray-500 text-sm leading-relaxed select-none"
                          onClick={() =>
                            setFormData((p) => ({
                              ...p,
                              agreeTerms: !p.agreeTerms,
                            }))
                          }
                        >
                          <span
                            className={`w-4 h-4 min-w-4 border rounded flex items-center justify-center transition-all mt-0.5 ${
                              formData.agreeTerms
                                ? "bg-cyan-500 border-cyan-500"
                                : "border-white/15 bg-white/5"
                            }`}
                          >
                            {formData.agreeTerms && (
                              <svg width="10" height="8" viewBox="0 0 10 8">
                                <path
                                  d="M1 4l3 3 5-5"
                                  stroke="white"
                                  strokeWidth="1.6"
                                  fill="none"
                                  strokeLinecap="round"
                                />
                              </svg>
                            )}
                          </span>
                          <span>
                            I agree to the{" "}
                            <a
                              href="#"
                              className="text-cyan-400 font-semibold hover:underline"
                            >
                              Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                              href="#"
                              className="text-cyan-400 font-semibold hover:underline"
                            >
                              Privacy Policy
                            </a>
                          </span>
                        </label>
                        {errors.agreeTerms && (
                          <span className="text-red-400 text-xs mt-1 block">
                            {errors.agreeTerms}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          className="flex items-center justify-center gap-1.5 py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-gray-500 text-sm font-semibold hover:bg-white/10 hover:text-gray-400 active:scale-[0.98] transition-all"
                          onClick={() => setStep(1)}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M12 7H2M6 3L2 7l4 4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-xl text-white text-sm font-bold shadow-lg shadow-cyan-500/25 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <Spinner />
                          ) : (
                            <>
                              Create Account <ArrowIcon />
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </form>

                <p className="text-center text-gray-600 text-sm mt-5">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-cyan-400 font-semibold hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        body, input, button, select { font-family: 'Sora', sans-serif; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeUp { animation: fadeUp 0.4s ease; }
        @keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1); } }
        .animate-pulse { animation: pulse 1.2s ease-in-out infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 0.7s linear infinite; }
      `}</style>
    </div>
  );
};

const Field = ({ label, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
      {label}
    </label>
    {children}
    {error && <span className="text-red-400 text-xs">{error}</span>}
  </div>
);

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

const CheckIcon = () => (
  <svg
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
  >
    <path
      d="M2 7l3.5 3.5L12 3.5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EyeToggle = ({ show, onToggle }) => (
  <button
    type="button"
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors"
    onClick={onToggle}
  >
    {show ? (
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
    )}
  </button>
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

const Spinner = () => (
  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
);

export default RegisterPage;
