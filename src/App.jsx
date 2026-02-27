import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components
import FontStyle from "./components/layout/ui/FontStyle";
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

// Services
import AIChat from "./components/service/AIChat";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");
        
        if (savedUser && savedToken) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
        // Clear corrupted data
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    };

    loadUser();
  }, []);

  const handleAuthSuccess = (userData) => {
    // Ensure userData has all required fields
    const enhancedUserData = {
      ...userData,
      progress: userData.progress || 0,
      coursesEnrolled: userData.coursesEnrolled || 0,
      certificates: userData.certificates || 0,
      achievements: userData.achievements || ["New Member"],
      joinDate: userData.joinDate || new Date().toISOString().split('T')[0],
      role: userData.role || "Student"
    };

    setUser(enhancedUserData);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleAuthModalOpen = (mode) => {
    setIsLogin(mode === 'signin');
    setIsAuthModalOpen(true);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="nav-font min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-indigo-50/30">
        <FontStyle />
        
        <Navbar
          isAuthenticated={isAuthenticated}
          user={user}
          onLogout={handleLogout}
          onAuthModalOpen={handleAuthModalOpen}
        />

        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/" 
              element={<HomePage onAuthModalOpen={handleAuthModalOpen} />} 
            />
            <Route path="/lessons" element={<LessonsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/calendar" element={<CalendarPage />} />

            {/* Protected Routes - Require Authentication */}
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard user={user} /> : <Navigate to="/" />}
            />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile user={user} /> : <Navigate to="/" />}
            />
            <Route
              path="/my-courses"
              element={isAuthenticated ? <MyCourses user={user} /> : <Navigate to="/" />}
            />
            <Route
              path="/certificates"
              element={isAuthenticated ? <Certificates user={user} /> : <Navigate to="/" />}
            />
            <Route
              path="/schedule"
              element={isAuthenticated ? <Schedule user={user} /> : <Navigate to="/" />}
            />
            <Route
              path="/progress"
              element={isAuthenticated ? <ProgressTracker user={user} /> : <Navigate to="/" />}
            />
            <Route
              path="/settings"
              element={isAuthenticated ? <Settings user={user} onLogout={handleLogout} /> : <Navigate to="/" />}
            />

            {/* Catch all route - redirect to home */}
            <Route path="*" element={<Navigate to="/" />} />
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
    </Router>
  );
};

export default App;