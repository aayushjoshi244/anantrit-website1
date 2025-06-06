import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import "./index.css";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import Pricing from "./sections/Pricing";
import Faq from "./sections/Faq";
import Testimonials from "./sections/Testimonials";
import Download from "./sections/Download";
import Footer from "./sections/Footer";
import LoginModal from "./sections/LoginModal";
import Signup from "./sections/Signup";
import PostSection from "./activities/posts";
import Repository from "./activities/UploadCode";
import ProfilePage from "./activities/profile";
import { Toaster } from "react-hot-toast";

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
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (!authUser) {
    // Store the attempted location to redirect after login
    return (
      <>
        <Navigate to="/" state={{ from: location }} replace />
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          redirectPath={location.pathname}
        />
      </>
    );
  }

  return element;
};

// Layout Component
const Layout = () => {
  const location = useLocation();
  const { authUser } = useAuthStore();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);
  const fullScreenRoutes = ["/posts", "/profile"];
  const isFullScreenRoute = fullScreenRoutes.some(
    (route) =>
      location.pathname === route || location.pathname.startsWith(`${route}/`)
  );

  const PrivateRouteWrapper = ({ element }) => {
    if (!authUser) {
      // Store the attempted path for redirect after login
      const from = location.pathname !== "/" ? location.pathname : "/posts"; // Default to '/posts' if coming from home
      setRedirectPath(from);
      setIsLoginModalOpen(true);
      return <Navigate to="/" replace />;
    }
    return element;
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {!isFullScreenRoute && <Header />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/posts"
            element={<PrivateRouteWrapper element={<PostSection />} />}
          />
          <Route
            path="/UploadCode"
            element={<PrivateRouteWrapper element={<Repository />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRouteWrapper element={<ProfilePage />} />}
          />
          {/* Add a catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => {
            setIsLoginModalOpen(false);
            setRedirectPath(null); // Reset redirect path when modal closes
          }}
          redirectPath={redirectPath}
        />
        <Toaster />
      </div>
      {!isFullScreenRoute && <Footer />}
    </div>
  );
};
// App Component with AuthProvider
const App = () => {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
