import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore"; // Import Zustand store
import { axiosInstance } from "./lib/axios"; // Import axios instance
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
  const { authUser } = useAuthStore();
  return authUser ? element : <Navigate to="/signup" replace />;
};

// Layout Component
const Layout = () => {
  const location = useLocation();
  const fullScreenRoutes = ["/posts", "/profile"]; 
  const isFullScreenRoute = fullScreenRoutes.some(route => 
    location.pathname === route || location.pathname.startsWith(`${route}/`)
  );

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {!isFullScreenRoute && <Header />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts" element={<PrivateRoute element={<PostSection />} />} />
          <Route path="/UploadCode" element={<Repository />} />
          <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
        </Routes>
      </div>
      {!isFullScreenRoute && <Footer />}
    </div>
  );
};

// App Component with AuthProvider
const App = () => {
  const {checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
      <Router>
        <Layout />
      </Router>
  );
};

export default App;
