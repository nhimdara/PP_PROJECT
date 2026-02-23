import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Github,
  Chrome,
  GraduationCap,
  X,
} from "lucide-react";

const AuthModal = ({ isOpen, onClose, isLogin, setIsLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (authError) setAuthError("");
  };

  const mockAuthenticate = async (data, isLoginMode) => {
    await new Promise((r) => setTimeout(r, 1500));
    if (isLoginMode) {
      if (data.email === "test@example.com" && data.password === "password123") {
        return {
          success: true,
          user: {
            id: "1",
            name: "John Doe",
            email: data.email,
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            role: "Student",
            joinDate: "2024-01-15",
            progress: 75,
            coursesEnrolled: 8,
            certificates: 3,
            achievements: ["Quick Learner", "Top Performer"],
          },
          token: "mock-jwt-token-12345",
        };
      } else {
        throw new Error("Invalid email or password");
      }
    } else {
      return {
        success: true,
        user: {
          id: "2",
          name: data.name,
          email: data.email,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=6366f1&color=fff&size=256`,
          role: "Student",
          joinDate: new Date().toISOString().split("T")[0],
          progress: 0,
          coursesEnrolled: 0,
          certificates: 0,
          achievements: ["New Member"],
        },
        token: "mock-jwt-token-67890",
      };
    }
  };

  const handleAuthSubmit = async (e, onSuccess) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError("");

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setAuthError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setAuthError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      const res = await mockAuthenticate(formData, isLogin);
      if (res.success) {
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("token", res.token);
        onSuccess(res.user);
        onClose();
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          rememberMe: false,
        });
      }
    } catch (err) {
      setAuthError(err.message || "Authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    });
    setAuthError("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto body-font">
      <div className="flex min-h-screen items-end sm:items-center justify-center px-4 pt-4 pb-20 sm:p-0">
        <div className="fixed inset-0 bg-black/65 backdrop-blur-md" onClick={onClose} />
        <div className="relative w-full sm:max-w-md overflow-hidden rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl ring-1 ring-black/5">
          <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-400" />
          <button onClick={onClose} className="absolute right-5 top-5 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all z-10">
            <X className="h-4 w-4" />
          </button>
          <div className="px-7 sm:px-8 pt-7 pb-8 max-h-[90vh] overflow-y-auto">
            <div className="mb-7">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 mb-4 shadow-lg shadow-indigo-300/40">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h2 className="nav-font text-2xl font-extrabold text-gray-900 tracking-tight">
                {isLogin ? "Welcome back" : "Create account"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {isLogin ? "Sign in to continue your journey" : "Start learning for free today"}
              </p>
            </div>

            {authError && (
              <div className="mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
                <p className="text-sm text-red-600">{authError}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: Chrome, label: "Google" },
                { icon: Github, label: "GitHub" },
              ].map(({ icon: Icon, label }) => (
                <button key={label} className="group flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-700 transition-all">
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                or email
              </span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <form onSubmit={(e) => handleAuthSubmit(e, () => {})} className="space-y-4">
              {[
                ...(!isLogin ? [{
                  label: "Full Name",
                  name: "name",
                  type: "text",
                  placeholder: "John Doe",
                  icon: User,
                }] : []),
                {
                  label: "Email address",
                  name: "email",
                  type: "email",
                  placeholder: "you@example.com",
                  icon: Mail,
                },
                {
                  label: "Password",
                  name: "password",
                  type: showPassword ? "text" : "password",
                  placeholder: "••••••••",
                  icon: Lock,
                  isPassword: true,
                },
                ...(!isLogin ? [{
                  label: "Confirm password",
                  name: "confirmPassword",
                  type: showPassword ? "text" : "password",
                  placeholder: "••••••••",
                  icon: Lock,
                }] : []),
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                    {field.label}
                  </label>
                  <div className="relative">
                    <field.icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      placeholder={field.placeholder}
                      required={field.name !== "confirmPassword" || !isLogin}
                      className="custom-input w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl transition-all"
                    />
                    {field.isPassword && (
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {isLogin && (
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="h-3.5 w-3.5 rounded text-indigo-600 border-gray-300"
                    />
                    <span className="text-xs text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 mt-1 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-indigo-500/25 transition-all duration-200 disabled:opacity-60 hover:scale-[1.01] active:scale-[0.99]"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Please wait…
                  </span>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="mt-5 text-center">
              <button onClick={toggleAuthMode} className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                {isLogin ? "Don't have an account? Sign up →" : "Already have an account? Sign in"}
              </button>
            </div>
            {isLogin && (
              <p className="mt-4 text-[11px] text-center text-gray-400">
                Demo: test@example.com / password123
              </p>
            )}
            <p className="mt-5 text-[11px] text-center text-gray-400">
              By continuing you agree to our{" "}
              <a href="#" className="text-indigo-500 hover:underline font-medium">Terms</a> &amp;{" "}
              <a href="#" className="text-indigo-500 hover:underline font-medium">Privacy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;