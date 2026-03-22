import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

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

// AppInner uses useNavigate so it must live inside <Router>
const AppInner = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  // Check if user has ever registered
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
      const settings = JSON.parse(localStorage.getItem("learnflow_settings") || "{}");
      if (settings.theme === "dark" || (settings.theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        document.documentElement.classList.add("dark-mode");
      } else if (settings.theme === "light") {
        document.documentElement.classList.remove("dark-mode");
      }
    } catch {}
  }, []);

  const handleAuthSuccess = (userData) => {
    const enhanced = {
      progress: 0, coursesEnrolled: 0, certificates: 0,
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

  // After logout → redirect to register page
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

  return (
    <Routes>
      {/* Register — first page for new visitors */}
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

      {/* Login — after registering */}
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

      {/* Home page - public route */}
      <Route
        path="/"
        element={
          <div className="nav-font min-h-screen flex flex-col">
            <FontStyle />
            <GlobalStyles />
            <Navbar
              isAuthenticated={isAuthenticated}
              user={user}
              onLogout={handleLogout}
              onAuthModalOpen={(mode) => { setIsLogin(mode === "signin"); setIsAuthModalOpen(true); }}
            />
            <main className="flex-grow">
              <HomePage onAuthModalOpen={(mode) => { setIsLogin(mode === "signin"); setIsAuthModalOpen(true); }} />
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

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <div className="nav-font min-h-screen flex flex-col">
              <FontStyle />
              <GlobalStyles />
              <Navbar
                isAuthenticated={isAuthenticated}
                user={user}
                onLogout={handleLogout}
                onAuthModalOpen={(mode) => { setIsLogin(mode === "signin"); setIsAuthModalOpen(true); }}
              />
              <main className="flex-grow">
                <Dashboard user={user} />
              </main>
              <Footer />
              <AIChat />
            </div>
          ) : (
            <Navigate to={hasRegistered ? "/login" : "/register"} replace />
          )
        }
      />

      <Route
        path="/profile"
        element={
          isAuthenticated ? (
            <div className="nav-font min-h-screen flex flex-col">
              <FontStyle />
              <GlobalStyles />
              <Navbar
                isAuthenticated={isAuthenticated}
                user={user}
                onLogout={handleLogout}
                onAuthModalOpen={(mode) => { setIsLogin(mode === "signin"); setIsAuthModalOpen(true); }}
              />
              <main className="flex-grow">
                <Profile user={user} onUserUpdate={handleUserUpdate} />
              </main>
              <Footer />
              <AIChat />
            </div>
          ) : (
            <Navigate to={hasRegistered ? "/login" : "/register"} replace />
          )
        }
      />

      <Route
        path="/my-courses"
        element={
          isAuthenticated ? (
            <div className="nav-font min-h-screen flex flex-col">
              <FontStyle />
              <GlobalStyles />
              <Navbar
                isAuthenticated={isAuthenticated}
                user={user}
                onLogout={handleLogout}
                onAuthModalOpen={(mode) => { setIsLogin(mode === "signin"); setIsAuthModalOpen(true); }}
              />
              <main className="flex-grow">
                <MyCourses user={user} />
              </main>
              <Footer />
              <AIChat />
            </div>
          ) : (
            <Navigate to={hasRegistered ? "/login" : "/register"} replace />
          )
        }
      />

      <Route
        path="/certificates"
        element={
          isAuthenticated ? (
            <div className="nav-font min-h-screen flex flex-col">
              <FontStyle />
              <GlobalStyles />
              <Navbar
                isAuthenticated={isAuthenticated}
                user={user}
                onLogout={handleLogout}
                onAuthModalOpen={(mode) => { setIsLogin(mode === "signin"); setIsAuthModalOpen(true); }}
              />
              <main className="flex-grow">
                <Certificates user={user} />
              </main>
              <Footer />
              <AIChat />
            </div>
          ) : (
            <Navigate to={hasRegistered ? "/login" : "/register"} replace />
          )
        }
      />

      <Route
        path="/schedule"
        element={
          isAuthenticated ? (
            <div className="nav-font min-h-screen flex flex-col">
              <FontStyle />
              <GlobalStyles />
              <Navbar
                isAuthenticated={isAuthenticated}
                user={user}
                onLogout={handleLogout}
                onAuthModalOpen={(mode) => { setIsLogin(mode === "signin"); setIsAuthModalOpen(true); }}
              />
              <main className="flex-grow">
                <Schedule user={user} />
              </main>
              <Footer />
              <AIChat />
            </div>
          ) : (
            <Navigate to={hasRegistered ? "/login" : "/register"} replace />
          )
        }
      />

      <Route
        path="/progress"
        element={
          isAuthenticated ? (
            <div className="nav-font min-h-screen flex flex-col">
              <FontStyle />
              <GlobalStyles />
              <Navbar
                isAuthenticated={isAuthenticated}
                user={user}
                onLogout={handleLogout}
                onAuthModalOpen={(mode) => { setIsLogin(mode === "signin"); setIsAuthModalOpen(true); }}
              />
              <main className="flex-grow">
                <ProgressTracker user={user} />
              </main>
              <Footer />
              <AIChat />
            </div>
          ) : (
            <Navigate to={hasRegistered ? "/login" : "/register"} replace />
          )
        }
      />

      <Route
        path="/settings"
        element={
          isAuthenticated ? (
            <div className="nav-font min-h-screen flex flex-col">
              <FontStyle />
              <GlobalStyles />
              <Navbar
                isAuthenticated={isAuthenticated}
                user={user}
                onLogout={handleLogout}
                onAuthModalOpen={(mode) => { setIsLogin(mode === "signin"); setIsAuthModalOpen(true); }}
              />
              <main className="flex-grow">
                <Settings user={user} onLogout={handleLogout} />
              </main>
              <Footer />
              <AIChat />
            </div>
          ) : (
            <Navigate to={hasRegistered ? "/login" : "/register"} replace />
          )
        }
      />

      {/* Public pages with navbar and footer */}
      <Route
        path="/lessons"
        element={
          <div className="nav-font min-h-screen flex flex-col">
            <FontStyle />
            <GlobalStyles />
            <Navbar
              isAuthenticated={isAuthenticated}
              user={user}
              onLogout={handleLogout}
              onAuthModalOpen={(mode) => { setIsLogin(mode === "signin"); setIsAuthModalOpen(true); }}
            />
            <main className="flex-grow">
              <LessonsPage />
            </main>
            <Footer />
            <AIChat />
          </div>
        }
      />

      <Route
        path="/projects"
        element={
          <div className="nav-font min-h-screen flex flex-col">
            <FontStyle />
            <GlobalStyles />
            <Navbar
              isAuthenticated={isAuthenticated}
              user={user}
              onLogout={handleLogout}
              onAuthModalOpen={(mode) => { setIsLogin(mode === "signin"); setIsAuthModalOpen(true); }}
            />
            <main className="flex-grow">
              <ProjectsPage />
            </main>
            <Footer />
            <AIChat />
          </div>
        }
      />

      <Route
        path="/calendar"
        element={
          <div className="nav-font min-h-screen flex flex-col">
            <FontStyle />
            <GlobalStyles />
            <Navbar
              isAuthenticated={isAuthenticated}
              user={user}
              onLogout={handleLogout}
              onAuthModalOpen={(mode) => { setIsLogin(mode === "signin"); setIsAuthModalOpen(true); }}
            />
            <main className="flex-grow">
              <CalendarPage />
            </main>
            <Footer />
            <AIChat />
          </div>
        }
      />

      {/* Catch-all redirect */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
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