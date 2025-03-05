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
import Posts from "./activities/posts";  
// import UploadCode from "./activities/UploadCode";  
// import Support from "./activities/Support";  
// import OtherPerks from "./activities/OtherPerks";  

// Create Auth Context
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
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Show Header on all pages */}
      <Header />

      {/* Page Content */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes (Only visible when logged in) */}
          <Route path="/posts" element={<PrivateRoute element={<Posts />} />} />
          {/* <Route path="/upload-code" element={<PrivateRoute element={<UploadCode />} />} />
          <Route path="/support" element={<PrivateRoute element={<Support />} />} />
          <Route path="/other-perks" element={<PrivateRoute element={<OtherPerks />} />} /> */}
        </Routes>
      </div>

      {/* Show Footer on all pages */}
      <Footer />
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
