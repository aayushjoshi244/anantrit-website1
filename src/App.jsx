import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./index.css";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import Pricing from "./sections/Pricing";
import Faq from "./sections/Faq";
import Testimonials from "./sections/Testimonials";
import Download from "./sections/Download";
import Footer from "./sections/Footer";
import Signup from "./sections/Signup"; 
import PostSection from "./activities/posts"; 
import Repository from "./activities/UploadCode";
import ProfilePage from "./activities/profile"; 

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth Provider to manage login state
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulating login state persistence (e.g., from localStorage)
  useEffect(() => {
    const savedAuth = localStorage.getItem("isAuthenticated");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Home Page Component
const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <Faq />
      <Testimonials />
      <Download />
    </>
  );
};

// Private Route Component to Protect Certain Pages
const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/signup" replace />;
};

// Layout Component
const Layout = () => {
  const location = useLocation();

  // Define routes where Header & Footer should NOT be visible
  const fullScreenRoutes = ["/posts", "/profile"]; 

  const isFullScreenRoute = fullScreenRoutes.some(route => 
    location.pathname === route || location.pathname.startsWith(`${route}/`)
  );

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Conditionally Render Header */}
      {!isFullScreenRoute && <Header />}

      {/* Page Content */}
      <div className={isFullScreenRoute ? "flex-grow" : "flex-grow"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts" element={<PrivateRoute element={<PostSection />} />} />
          <Route path="/UploadCode" element={<Repository />} />
          <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
        </Routes>
      </div>

      {/* Conditionally Render Footer */}
      {!isFullScreenRoute && <Footer />}
    </div>
  );
};

// App Component with AuthProvider
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
};

export default App;