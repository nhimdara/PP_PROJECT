import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Components
import FontStyle from "./components/layout/ui/FontStyle";
import GlobalStyles from "./components/layout/ui/GlobalStyles";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AuthModal from "./components/layout/auth/AuthModal";
import ScrollToTop from "./components/assets/ScrollToTop";

// Pages
import HomePage from "./components/pages/HomePage";
import LessonsPage from "./components/pages/LessonsPage";
import ProjectsPage from "./components/pages/ProjectsPage";
import CalendarPage from "./components/pages/CalendarPage";
import Profile from "./components/pages/Profile/Profile";
import MyCourses from "./components/pages/Profile/MyCourses";
import Certificates from "./components/pages/Profile/Certificates";
import Schedule from "./components/pages/Profile/Schedule";
import ProgressTracker from "./components/pages/Profile/ProgressTracker";
import Settings from "./components/pages/Profile/Settings";
import Dashboard from "./components/pages/Profile/Dashboard";

// Auth pages (standalone, no Navbar/Footer)
import RegisterPage from "./components/pages/Registerpage ";
import LoginPage from "./components/pages/Loginpage";

// Services
import AIChat from "./components/service/AIChat";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      const savedToken = localStorage.getItem("token");
      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, []);

  useEffect(() => {
    const savedSettings = localStorage.getItem("learnflow_settings");
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        if (
          settings.theme === "dark" ||
          (settings.theme === "system" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
          document.documentElement.classList.add("dark-mode");
        } else if (settings.theme === "light") {
          document.documentElement.classList.remove("dark-mode");
        }
      } catch {}
    }
  }, []);

  const handleAuthSuccess = (userData) => {
    const enhanced = {
      ...userData,
      progress: userData.progress || 0,
      coursesEnrolled: userData.coursesEnrolled || 0,
      certificates: userData.certificates || 0,
      achievements: userData.achievements || ["New Member"],
      joinDate: userData.joinDate || new Date().toISOString().split("T")[0],
      role: userData.role || "Student",
    };
    setUser(enhanced);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    localStorage.setItem("user", JSON.stringify(enhanced));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleAuthModalOpen = (mode) => {
    setIsLogin(mode === "signin");
    setIsAuthModalOpen(true);
  };

  const handleUserUpdate = (updatedUserData) => {
    setUser(updatedUserData);
    localStorage.setItem("user", JSON.stringify(updatedUserData));
  };

  // Has the user registered before? (even if not currently logged in)
  const hasRegistered = !!localStorage.getItem("has_registered");

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* ── REGISTER (shown first to new visitors) ── */}
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <RegisterPage />
            )
          }
        />

        {/* ── LOGIN (after registering) ── */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage onAuthSuccess={handleAuthSuccess} />
            )
          }
        />

        {/* ── ALL OTHER ROUTES (with Navbar + Footer) ── */}
        <Route
          path="*"
          element={
            <div className="nav-font min-h-screen flex flex-col">
              <FontStyle />
              <GlobalStyles />
              <Navbar
                isAuthenticated={isAuthenticated}
                user={user}
                onLogout={handleLogout}
                onAuthModalOpen={handleAuthModalOpen}
              />
              <main className="flex-grow">
                <Routes>
                  {/* Public */}
                  <Route
                    path="/"
                    element={<HomePage onAuthModalOpen={handleAuthModalOpen} />}
                  />
                  <Route path="/lessons" element={<LessonsPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/calendar" element={<CalendarPage />} />

                  {/* Protected — redirect to /register if never registered, /login if registered but not authed */}
                  <Route
                    path="/dashboard"
                    element={
                      isAuthenticated ? (
                        <Dashboard user={user} />
                      ) : hasRegistered ? (
                        <Navigate to="/login" replace />
                      ) : (
                        <Navigate to="/register" replace />
                      )
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      isAuthenticated ? (
                        <Profile user={user} onUserUpdate={handleUserUpdate} />
                      ) : hasRegistered ? (
                        <Navigate to="/login" replace />
                      ) : (
                        <Navigate to="/register" replace />
                      )
                    }
                  />
                  <Route
                    path="/my-courses"
                    element={
                      isAuthenticated ? (
                        <MyCourses user={user} />
                      ) : hasRegistered ? (
                        <Navigate to="/login" replace />
                      ) : (
                        <Navigate to="/register" replace />
                      )
                    }
                  />
                  <Route
                    path="/certificates"
                    element={
                      isAuthenticated ? (
                        <Certificates user={user} />
                      ) : hasRegistered ? (
                        <Navigate to="/login" replace />
                      ) : (
                        <Navigate to="/register" replace />
                      )
                    }
                  />
                  <Route
                    path="/schedule"
                    element={
                      isAuthenticated ? (
                        <Schedule user={user} />
                      ) : hasRegistered ? (
                        <Navigate to="/login" replace />
                      ) : (
                        <Navigate to="/register" replace />
                      )
                    }
                  />
                  <Route
                    path="/progress"
                    element={
                      isAuthenticated ? (
                        <ProgressTracker user={user} />
                      ) : hasRegistered ? (
                        <Navigate to="/login" replace />
                      ) : (
                        <Navigate to="/register" replace />
                      )
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      isAuthenticated ? (
                        <Settings user={user} onLogout={handleLogout} />
                      ) : hasRegistered ? (
                        <Navigate to="/login" replace />
                      ) : (
                        <Navigate to="/register" replace />
                      )
                    }
                  />

                  {/* Catch-all */}
                  <Route
                    path="*"
                    element={
                      isAuthenticated ? (
                        <Navigate to="/dashboard" replace />
                      ) : hasRegistered ? (
                        <Navigate to="/login" replace />
                      ) : (
                        <Navigate to="/register" replace />
                      )
                    }
                  />
                </Routes>
              </main>
              <Footer />
              <AIChat />
              <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                onAuthSuccess={handleAuthSuccess}
              />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
