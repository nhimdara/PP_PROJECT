import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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

  return (
    <div style={s.page}>
      <div style={s.bg}>
        <div
          style={{
            ...s.blob,
            width: 700,
            height: 700,
            background: "radial-gradient(circle,#0c2340 0%,transparent 70%)",
            top: -200,
            left: -200,
          }}
        />
        <div
          style={{
            ...s.blob,
            width: 500,
            height: 500,
            background: "radial-gradient(circle,#0a1f36 0%,transparent 70%)",
            bottom: -100,
            right: -50,
          }}
        />
        <div style={s.grid} />
      </div>

      <div style={s.layout}>
        {/* LEFT */}
        <div style={s.left}>
          <div style={s.logo}>
            <div style={s.logoBox}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <polygon
                  points="11,2 20,7 20,15 11,20 2,15 2,7"
                  fill="rgba(56,189,248,0.15)"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                />
                <polygon
                  points="11,6 16,9 16,13 11,16 6,13 6,9"
                  fill="rgba(56,189,248,0.3)"
                />
                <circle cx="11" cy="11" r="2.5" fill="#38bdf8" />
              </svg>
            </div>
            <span style={s.logoName}>LearnFlow</span>
          </div>

          <div style={s.leftBody}>
            <p style={s.eyebrow}>Start for free today</p>
            <h1 style={s.h1}>
              Unlock smarter
              <br />
              <span style={s.grad}>learning.</span>
            </h1>
            <p style={s.desc}>
              Hands-on courses, real projects, and a community of learners — all
              in one place.
            </p>

            <div style={s.feats}>
              {[
                ["📚", "300+ guided courses"],
                ["🎯", "Project-based learning"],
                ["📊", "Track your progress"],
                ["🏆", "Earn certificates"],
              ].map(([icon, text]) => (
                <div key={text} style={s.feat}>
                  <span style={s.featIcon}>{icon}</span>
                  <span style={s.featText}>{text}</span>
                </div>
              ))}
            </div>

            <div style={s.testimonial}>
              <div style={s.tLine} />
              <p style={s.tQuote}>
                "LearnFlow changed how I study — I actually finish courses now."
              </p>
              <span style={s.tAuthor}>— Maria S., enrolled student</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={s.right}>
          <div style={s.card}>
            {done ? (
              <div style={s.success}>
                <div style={s.successRing}>
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
                <h2 style={s.successTitle}>Account created!</h2>
                <p style={s.successSub}>Taking you to sign in…</p>
                <div style={s.dots}>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{ ...s.dot, animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Steps */}
                <div style={s.steps}>
                  {[1, 2].map((n, i) => (
                    <React.Fragment key={n}>
                      <div
                        style={{
                          ...s.stepDot,
                          ...(step >= n ? s.stepDotOn : {}),
                        }}
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
                          style={{
                            ...s.stepLine,
                            ...(step > 1 ? s.stepLineOn : {}),
                          }}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <h2 style={s.cardTitle}>
                  {step === 1 ? "Create your account" : "Secure your account"}
                </h2>
                <p style={s.cardSub}>
                  {step === 1
                    ? "Step 1 of 2 — Basic info"
                    : "Step 2 of 2 — Set a password"}
                </p>

                <form
                  onSubmit={step === 1 ? handleNext : handleSubmit}
                  noValidate
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}
                >
                  {step === 1 && (
                    <>
                      <div style={s.row}>
                        <F label="First name" err={errors.firstName}>
                          <input
                            style={{
                              ...s.inp,
                              ...(errors.firstName ? s.inpErr : {}),
                            }}
                            name="firstName"
                            placeholder="Alex"
                            value={formData.firstName}
                            onChange={handleChange}
                            autoFocus
                          />
                        </F>
                        <F label="Last name" err={errors.lastName}>
                          <input
                            style={{
                              ...s.inp,
                              ...(errors.lastName ? s.inpErr : {}),
                            }}
                            name="lastName"
                            placeholder="Johnson"
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                        </F>
                      </div>

                      <F label="Email address" err={errors.email}>
                        <div style={s.iw}>
                          <MailIco />
                          <input
                            style={{
                              ...s.inp,
                              ...s.inpL,
                              ...(errors.email ? s.inpErr : {}),
                            }}
                            name="email"
                            type="email"
                            placeholder="alex@example.com"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </F>

                      <F label="I am a…">
                        <div style={s.roles}>
                          {["Student", "Teacher", "Professional"].map((r) => (
                            <button
                              key={r}
                              type="button"
                              style={{
                                ...s.roleBtn,
                                ...(formData.role === r ? s.roleBtnOn : {}),
                              }}
                              onClick={() =>
                                setFormData((p) => ({ ...p, role: r }))
                              }
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      </F>

                      <Btn>
                        Continue <Arr />
                      </Btn>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <F label="Password" err={errors.password}>
                        <div style={s.iw}>
                          <LockIco />
                          <input
                            style={{
                              ...s.inp,
                              ...s.inpL,
                              ...s.inpR,
                              ...(errors.password ? s.inpErr : {}),
                            }}
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Min. 8 characters"
                            value={formData.password}
                            onChange={handleChange}
                            autoFocus
                          />
                          <button
                            type="button"
                            style={s.eye}
                            onClick={() => setShowPassword((v) => !v)}
                          >
                            <Eye open={showPassword} />
                          </button>
                        </div>
                        {formData.password && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              marginTop: 5,
                            }}
                          >
                            <div style={{ display: "flex", gap: 4, flex: 1 }}>
                              {[1, 2, 3, 4].map((i) => (
                                <div
                                  key={i}
                                  style={{
                                    flex: 1,
                                    height: 3,
                                    borderRadius: 2,
                                    background:
                                      pwStr >= i
                                        ? strColor
                                        : "rgba(255,255,255,0.07)",
                                    transition: "background 0.3s",
                                  }}
                                />
                              ))}
                            </div>
                            <span
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                color: strColor,
                                minWidth: 34,
                              }}
                            >
                              {strLabel}
                            </span>
                          </div>
                        )}
                      </F>

                      <F label="Confirm password" err={errors.confirmPassword}>
                        <div style={s.iw}>
                          <CheckIco />
                          <input
                            style={{
                              ...s.inp,
                              ...s.inpL,
                              ...s.inpR,
                              ...(errors.confirmPassword ? s.inpErr : {}),
                            }}
                            name="confirmPassword"
                            type={showConfirm ? "text" : "password"}
                            placeholder="Repeat password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                          />
                          <button
                            type="button"
                            style={s.eye}
                            onClick={() => setShowConfirm((v) => !v)}
                          >
                            <Eye open={showConfirm} />
                          </button>
                        </div>
                      </F>

                      <div>
                        <label style={s.chkLabel}>
                          <input
                            type="checkbox"
                            name="agreeTerms"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                            style={{ display: "none" }}
                          />
                          <span
                            style={{
                              ...s.chkBox,
                              ...(formData.agreeTerms ? s.chkOn : {}),
                            }}
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
                            <a href="#" style={s.a}>
                              Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" style={s.a}>
                              Privacy Policy
                            </a>
                          </span>
                        </label>
                        {errors.agreeTerms && (
                          <span style={s.err}>{errors.agreeTerms}</span>
                        )}
                      </div>

                      <div style={{ display: "flex", gap: 10 }}>
                        <button
                          type="button"
                          style={s.btnSec}
                          onClick={() => setStep(1)}
                        >
                          <BackArr /> Back
                        </button>
                        <Btn style={{ flex: 1 }} disabled={isLoading}>
                          {isLoading ? (
                            <Spin />
                          ) : (
                            <>
                              Create Account <Arr />
                            </>
                          )}
                        </Btn>
                      </div>
                    </>
                  )}
                </form>

                <p style={s.footer}>
                  Already have an account?{" "}
                  <Link to="/login" style={s.a}>
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
        *{box-sizing:border-box}
        input,button{font-family:'Sora',sans-serif}
        input:focus{border-color:#0ea5e9!important;background:rgba(14,165,233,0.07)!important;box-shadow:0 0 0 3px rgba(14,165,233,0.15)!important;outline:none}
        button:hover{opacity:0.88}
        @keyframes pulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @media(max-width:860px){.lf-left{display:none!important}.lf-right{width:100%!important;min-width:unset!important}}
      `}</style>
    </div>
  );
};

/* sub-components */
const F = ({ label, err, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    <label
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: "#475569",
        letterSpacing: 0.8,
        textTransform: "uppercase",
      }}
    >
      {label}
    </label>
    {children}
    {err && <span style={{ fontSize: 12, color: "#f87171" }}>{err}</span>}
  </div>
);
const Btn = ({ children, style = {}, disabled }) => (
  <button
    type="submit"
    disabled={disabled}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      padding: "12px 18px",
      background: "linear-gradient(135deg,#0ea5e9,#6366f1)",
      border: "none",
      borderRadius: 11,
      color: "white",
      fontSize: 14,
      fontWeight: 700,
      cursor: "pointer",
      boxShadow: "0 4px 18px rgba(14,165,233,0.3)",
      opacity: disabled ? 0.7 : 1,
      ...style,
    }}
  >
    {children}
  </button>
);
const Arr = () => (
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
const BackArr = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M12 7H2M6 3L2 7l4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const Eye = ({ open }) =>
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
const MailIco = () => (
  <svg
    style={{
      position: "absolute",
      left: 11,
      top: "50%",
      transform: "translateY(-50%)",
      color: "#475569",
      pointerEvents: "none",
    }}
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
const LockIco = () => (
  <svg
    style={{
      position: "absolute",
      left: 11,
      top: "50%",
      transform: "translateY(-50%)",
      color: "#475569",
      pointerEvents: "none",
    }}
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
const CheckIco = () => (
  <svg
    style={{
      position: "absolute",
      left: 11,
      top: "50%",
      transform: "translateY(-50%)",
      color: "#475569",
      pointerEvents: "none",
    }}
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
const Spin = () => (
  <span
    style={{
      width: 17,
      height: 17,
      border: "2px solid rgba(255,255,255,0.3)",
      borderTop: "2px solid white",
      borderRadius: "50%",
      display: "inline-block",
      animation: "spin 0.7s linear infinite",
    }}
  />
);

const s = {
  page: {
    minHeight: "100vh",
    background: "#05090f",
    display: "flex",
    alignItems: "stretch",
    fontFamily: "'Sora',sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  bg: { position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 },
  blob: { position: "absolute", borderRadius: "50%", opacity: 0.7 },
  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(56,189,248,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.035) 1px,transparent 1px)",
    backgroundSize: "52px 52px",
  },
  layout: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    width: "100%",
    minHeight: "100vh",
  },
  left: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "44px 52px",
    color: "white",
    borderRight: "1px solid rgba(56,189,248,0.07)",
  },
  logo: { display: "flex", alignItems: "center", gap: 10, marginBottom: 68 },
  logoBox: {
    width: 40,
    height: 40,
    background: "rgba(56,189,248,0.08)",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(56,189,248,0.18)",
  },
  logoName: {
    fontSize: 17,
    fontWeight: 700,
    color: "#e0f2fe",
    letterSpacing: -0.3,
  },
  leftBody: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  eyebrow: {
    fontSize: 12,
    color: "#38bdf8",
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  h1: {
    fontSize: "clamp(36px,4.2vw,54px)",
    fontWeight: 800,
    lineHeight: 1.05,
    letterSpacing: -2,
    color: "#f0f9ff",
    margin: "0 0 16px",
  },
  grad: {
    background: "linear-gradient(135deg,#38bdf8,#818cf8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  desc: {
    fontSize: 15,
    lineHeight: 1.75,
    color: "#4b6d8a",
    maxWidth: 360,
    marginBottom: 36,
  },
  feats: {
    display: "flex",
    flexDirection: "column",
    gap: 11,
    marginBottom: 40,
  },
  feat: { display: "flex", alignItems: "center", gap: 12 },
  featIcon: {
    width: 34,
    height: 34,
    background: "rgba(56,189,248,0.06)",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(56,189,248,0.1)",
    fontSize: 16,
    flexShrink: 0,
  },
  featText: { fontSize: 14, color: "#4b6d8a" },
  testimonial: {},
  tLine: {
    width: 28,
    height: 2,
    background: "linear-gradient(to right,#38bdf8,transparent)",
    marginBottom: 10,
  },
  tQuote: {
    fontSize: 13,
    color: "#2d4a63",
    fontStyle: "italic",
    lineHeight: 1.6,
    marginBottom: 5,
  },
  tAuthor: {
    fontSize: 11,
    color: "#1e3a52",
    fontWeight: 700,
    letterSpacing: 0.3,
  },
  right: {
    width: 500,
    minWidth: 460,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 28px",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.065)",
    borderRadius: 20,
    padding: "34px 30px",
    backdropFilter: "blur(20px)",
    boxShadow: "0 28px 70px rgba(0,0,0,0.55)",
    animation: "fadeUp 0.4s ease",
  },
  steps: { display: "flex", alignItems: "center", marginBottom: 18 },
  stepDot: {
    width: 27,
    height: 27,
    borderRadius: "50%",
    border: "1.5px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.04)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 700,
    color: "#334155",
    transition: "all 0.3s",
  },
  stepDotOn: {
    background: "#0ea5e9",
    borderColor: "#0ea5e9",
    color: "white",
    boxShadow: "0 0 12px rgba(14,165,233,0.5)",
  },
  stepLine: {
    flex: 1,
    height: 2,
    background: "rgba(255,255,255,0.06)",
    margin: "0 8px",
    maxWidth: 44,
    transition: "background 0.3s",
  },
  stepLineOn: { background: "#0ea5e9" },
  cardTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#e0f2fe",
    letterSpacing: -0.5,
    marginBottom: 3,
  },
  cardSub: { fontSize: 13, color: "#334155", marginBottom: 22 },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  iw: { position: "relative" },
  inp: {
    width: "100%",
    padding: "10px 13px",
    background: "rgba(255,255,255,0.05)",
    border: "1.5px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    color: "#e2e8f0",
    fontSize: 14,
    transition: "all 0.2s",
  },
  inpL: { paddingLeft: 35 },
  inpR: { paddingRight: 34 },
  inpErr: { borderColor: "#ef4444" },
  eye: {
    position: "absolute",
    right: 9,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#475569",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: 2,
  },
  err: { fontSize: 12, color: "#f87171", marginTop: 2 },
  roles: { display: "flex", gap: 8 },
  roleBtn: {
    flex: 1,
    padding: "9px 6px",
    border: "1.5px solid rgba(255,255,255,0.07)",
    borderRadius: 9,
    background: "rgba(255,255,255,0.04)",
    color: "#334155",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  roleBtnOn: {
    borderColor: "#0ea5e9",
    background: "rgba(14,165,233,0.1)",
    color: "#38bdf8",
  },
  chkLabel: {
    display: "flex",
    alignItems: "flex-start",
    gap: 9,
    cursor: "pointer",
    fontSize: 13,
    color: "#475569",
    lineHeight: 1.55,
  },
  chkBox: {
    width: 17,
    height: 17,
    minWidth: 17,
    border: "1.5px solid rgba(255,255,255,0.1)",
    borderRadius: 5,
    background: "rgba(255,255,255,0.04)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
    marginTop: 1,
  },
  chkOn: { background: "#0ea5e9", borderColor: "#0ea5e9" },
  a: { color: "#38bdf8", textDecoration: "none", fontWeight: 600 },
  btnSec: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    padding: "12px 14px",
    background: "rgba(255,255,255,0.05)",
    border: "1.5px solid rgba(255,255,255,0.08)",
    borderRadius: 11,
    color: "#64748b",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  footer: {
    textAlign: "center",
    fontSize: 13,
    color: "#334155",
    marginTop: 18,
  },
  success: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    padding: "24px 0",
    animation: "fadeUp 0.4s ease",
  },
  successRing: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    background: "rgba(74,222,128,0.07)",
    border: "1px solid rgba(74,222,128,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#f0fdf4",
    letterSpacing: -0.5,
  },
  successSub: { fontSize: 14, color: "#334155" },
  dots: { display: "flex", gap: 6, marginTop: 4 },
  dot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#38bdf8",
    display: "inline-block",
    animation: "pulse 1.2s ease-in-out infinite",
  },
};

export default RegisterPage;
