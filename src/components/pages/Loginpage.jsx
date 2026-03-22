import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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

    // Check against registered user
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

  return (
    <div style={s.page}>
      {/* BG */}
      <div style={s.bg}>
        <div
          style={{
            ...s.blob,
            width: 600,
            height: 600,
            background: "radial-gradient(circle,#0c2340 0%,transparent 70%)",
            top: -180,
            right: -100,
          }}
        />
        <div
          style={{
            ...s.blob,
            width: 400,
            height: 400,
            background: "radial-gradient(circle,#0a1f36 0%,transparent 70%)",
            bottom: -80,
            left: -80,
          }}
        />
        <div style={s.grid} />
      </div>

      <div style={s.layout}>
        {/* LEFT decorative */}
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
            <p style={s.eyebrow}>Welcome back</p>
            <h1 style={s.h1}>
              Continue your
              <br />
              <span style={s.grad}>journey.</span>
            </h1>
            <p style={s.desc}>
              Pick up right where you left off. Your courses, progress, and
              certificates are waiting.
            </p>

            <div style={s.stats}>
              {[
                ["12K+", "Active learners"],
                ["300+", "Courses"],
                ["98%", "Satisfaction"],
              ].map(([val, lab]) => (
                <div key={lab} style={s.stat}>
                  <span style={s.statVal}>{val}</span>
                  <span style={s.statLab}>{lab}</span>
                </div>
              ))}
            </div>

            <div style={s.notice}>
              <div style={s.noticeIcon}>
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
              <p style={s.noticeText}>
                Don't have an account yet?{" "}
                <Link to="/register" style={s.a}>
                  Register first
                </Link>{" "}
                — it's free and only takes 2 minutes.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT form */}
        <div style={s.right}>
          <div style={{ ...s.card, ...(shake ? s.cardShake : {}) }}>
            <div style={s.cardIcon}>
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

            <h2 style={s.title}>Sign in to your account</h2>
            <p style={s.sub}>Enter your credentials to continue</p>

            {errors.general && (
              <div style={s.alert}>
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
              style={{ display: "flex", flexDirection: "column", gap: 15 }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={s.label}>Email address</label>
                <div style={s.iw}>
                  <MailIco />
                  <input
                    style={{
                      ...s.inp,
                      ...s.inpL,
                      ...(errors.email ? s.inpErr : {}),
                    }}
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
                {errors.email && <span style={s.err}>{errors.email}</span>}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <label style={s.label}>Password</label>
                  <a href="#" style={{ ...s.a, fontSize: 12 }}>
                    Forgot password?
                  </a>
                </div>
                <div style={s.iw}>
                  <LockIco />
                  <input
                    style={{
                      ...s.inp,
                      ...s.inpL,
                      ...s.inpR,
                      ...(errors.password ? s.inpErr : {}),
                    }}
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
                    style={s.eye}
                    onClick={() => setShowPw((v) => !v)}
                  >
                    <Eye open={showPw} />
                  </button>
                </div>
                {errors.password && (
                  <span style={s.err}>{errors.password}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "13px 18px",
                  background: "linear-gradient(135deg,#0ea5e9,#6366f1)",
                  border: "none",
                  borderRadius: 11,
                  color: "white",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 4px 18px rgba(14,165,233,0.3)",
                  marginTop: 4,
                  opacity: isLoading ? 0.7 : 1,
                  fontFamily: "inherit",
                }}
              >
                {isLoading ? (
                  <Spin />
                ) : (
                  <>
                    Sign In <Arr />
                  </>
                )}
              </button>
            </form>

            <p style={s.footer}>
              New to LearnFlow?{" "}
              <Link to="/register" style={s.a}>
                Create a free account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box}
        input,button{font-family:'Sora',sans-serif}
        input:focus{border-color:#0ea5e9!important;background:rgba(14,165,233,0.07)!important;box-shadow:0 0 0 3px rgba(14,165,233,0.15)!important;outline:none}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}
      `}</style>
    </div>
  );
};

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
const Spin = () => (
  <span
    style={{
      width: 18,
      height: 18,
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
    marginBottom: 40,
  },
  stats: { display: "flex", gap: 36, marginBottom: 40 },
  stat: { display: "flex", flexDirection: "column" },
  statVal: {
    fontSize: 26,
    fontWeight: 800,
    color: "#e0f2fe",
    letterSpacing: -1,
  },
  statLab: { fontSize: 12, color: "#334155", marginTop: 2 },
  notice: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    background: "rgba(56,189,248,0.06)",
    border: "1px solid rgba(56,189,248,0.12)",
    borderRadius: 12,
    padding: "14px 16px",
  },
  noticeIcon: { flexShrink: 0, marginTop: 1 },
  noticeText: { fontSize: 13, color: "#4b6d8a", lineHeight: 1.6 },
  a: { color: "#38bdf8", textDecoration: "none", fontWeight: 600 },
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
    padding: "36px 32px",
    backdropFilter: "blur(20px)",
    boxShadow: "0 28px 70px rgba(0,0,0,0.55)",
    animation: "fadeUp 0.4s ease",
  },
  cardShake: { animation: "shake 0.5s ease" },
  cardIcon: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "rgba(56,189,248,0.07)",
    border: "1px solid rgba(56,189,248,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  title: {
    fontSize: 21,
    fontWeight: 700,
    color: "#e0f2fe",
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  sub: { fontSize: 13, color: "#334155", marginBottom: 22 },
  alert: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(239,68,68,0.08)",
    border: "1px solid rgba(239,68,68,0.2)",
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 13,
    color: "#fca5a5",
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: 700,
    color: "#475569",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
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
  err: { fontSize: 12, color: "#f87171" },
  footer: {
    textAlign: "center",
    fontSize: 13,
    color: "#334155",
    marginTop: 20,
  },
};

export default LoginPage;
