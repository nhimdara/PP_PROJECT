import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import FontStyle from "./components/layout/ui/FontStyle";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AuthModal from "./components/layout/auth/AuthModal";

// Pages
import HomePage from "./components/pages/HomePage";
import LessonsPage from "./components/pages/LessonsPage";
import ProjectsPage from "./components/pages/ProjectsPage";
import CalendarPage from "./components/pages/CalendarPage";

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
    } catch (e) {}
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleAuthModalOpen = (isLoginMode) => {
    setIsLogin(isLoginMode);
    setIsAuthModalOpen(true);
  };

  return (
    <Router>
      <div className="nav-font">
        <FontStyle />
        <Navbar 
          isAuthenticated={isAuthenticated}
          user={user}
          onLogout={handleLogout}
          onAuthModalOpen={handleAuthModalOpen}
        />
        
        <Routes>
          <Route path="/" element={<HomePage onAuthModalOpen={handleAuthModalOpen} />} />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>

        <Footer />

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