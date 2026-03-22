import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

// Layout
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

// Auth pages — separate files
import RegisterPage from "./components/pages/Registerpage ";
import LoginPage from "./components/pages/Loginpage";

// Services
import AIChat from "./components/service/AIChat";

// ── Reusable layout wrapper for pages that need Navbar + Footer ──
const PageLayout = ({
  isAuthenticated,
  user,
  onLogout,
  onAuthModalOpen,
  children,
  showAIChat = true,
}) => (
  <div className="nav-font min-h-screen flex flex-col">
    <FontStyle />
    <GlobalStyles />
    <Navbar
      isAuthenticated={isAuthenticated}
      user={user}
      onLogout={onLogout}
      onAuthModalOpen={onAuthModalOpen}
    />
    <main className="flex-grow">{children}</main>
    <Footer />
    {showAIChat && <AIChat />}
  </div>
);

// AppInner uses useNavigate so it must live inside <Router>
const AppInner = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const hasRegistered = !!localStorage.getItem("has_registered");

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
    try {
      const settings = JSON.parse(
        localStorage.getItem("learnflow_settings") || "{}",
      );
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
  }, []);

  const handleAuthSuccess = (userData) => {
    const enhanced = {
      progress: 0,
      coursesEnrolled: 0,
      certificates: 0,
      achievements: ["New Member"],
      joinDate: new Date().toISOString().split("T")[0],
      role: "Student",
      ...userData,
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
    navigate("/register", { replace: true });
  };

  const handleUserUpdate = (updated) => {
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  const openAuthModal = (mode) => {
    setIsLogin(mode === "signin");
    setIsAuthModalOpen(true);
  };

  // Shared props for PageLayout
  const layoutProps = {
    isAuthenticated,
    user,
    onLogout: handleLogout,
    onAuthModalOpen: openAuthModal,
  };

  return (
    <Routes>
      {/* ── Register — first page for new visitors ── */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/home" replace />
          ) : (
            <div className="min-h-screen flex flex-col">
              <RegisterPage />
              <Footer />
            </div>
          )
        }
      />

      {/* ── Login ── */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/home" replace />
          ) : (
            <div className="min-h-screen flex flex-col">
              <LoginPage onAuthSuccess={handleAuthSuccess} />
              <Footer />
            </div>
          )
        }
      />

      {/* ── Home — public ── */}
      <Route
        path="/home"
        element={
          <PageLayout {...layoutProps}>
            <HomePage onAuthModalOpen={openAuthModal} />
            <AuthModal
              isOpen={isAuthModalOpen}
              onClose={() => setIsAuthModalOpen(false)}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              onAuthSuccess={handleAuthSuccess}
            />
          </PageLayout>
        }
      />

      {/* ── Protected routes ── */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <PageLayout {...layoutProps}>
              <Dashboard user={user} />
            </PageLayout>
          ) : (
            <Navigate to={hasRegistered ? "/login" : "/"} replace />
          )
        }
      />

      <Route
        path="/profile"
        element={
          isAuthenticated ? (
            <PageLayout {...layoutProps}>
              <Profile user={user} onUserUpdate={handleUserUpdate} />
            </PageLayout>
          ) : (
            <Navigate to={hasRegistered ? "/login" : "/"} replace />
          )
        }
      />

      <Route
        path="/my-courses"
        element={
          isAuthenticated ? (
            <PageLayout {...layoutProps}>
              <MyCourses user={user} />
            </PageLayout>
          ) : (
            <Navigate to={hasRegistered ? "/login" : "/"} replace />
          )
        }
      />

      <Route
        path="/certificates"
        element={
          isAuthenticated ? (
            <PageLayout {...layoutProps}>
              <Certificates user={user} />
            </PageLayout>
          ) : (
            <Navigate to={hasRegistered ? "/login" : "/"} replace />
          )
        }
      />

      <Route
        path="/schedule"
        element={
          isAuthenticated ? (
            <PageLayout {...layoutProps}>
              <Schedule user={user} />
            </PageLayout>
          ) : (
            <Navigate to={hasRegistered ? "/login" : "/"} replace />
          )
        }
      />

      <Route
        path="/progress"
        element={
          isAuthenticated ? (
            <PageLayout {...layoutProps}>
              <ProgressTracker user={user} />
            </PageLayout>
          ) : (
            <Navigate to={hasRegistered ? "/login" : "/"} replace />
          )
        }
      />

      <Route
        path="/settings"
        element={
          isAuthenticated ? (
            <PageLayout {...layoutProps}>
              <Settings user={user} onLogout={handleLogout} />
            </PageLayout>
          ) : (
            <Navigate to={hasRegistered ? "/login" : "/"} replace />
          )
        }
      />

      {/* ── Public pages ── */}
      <Route
        path="/lessons"
        element={
          <PageLayout {...layoutProps}>
            <LessonsPage />
          </PageLayout>
        }
      />
      <Route
        path="/projects"
        element={
          <PageLayout {...layoutProps}>
            <ProjectsPage />
          </PageLayout>
        }
      />
      <Route
        path="/calendar"
        element={
          <PageLayout {...layoutProps}>
            <CalendarPage />
          </PageLayout>
        }
      />

      {/* ── Catch-all ── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => (
  <Router>
    <ScrollToTop />
    <AppInner />
  </Router>
);

export default App;
