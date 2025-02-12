import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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

const Layout = () => {
  const location = useLocation(); // Get current route

  return (
    <div className="overflow-hidden">
      {/* Show Header only if the route is NOT Signup */}
      {location.pathname !== "/signup" && <Header />}

      {/* Page Content */}
      <div className="content">
        <Routes>
          <Route path="/signup" element={<Signup />} /> {/* Signup Page */}
        </Routes>
      </div>

      
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
      <Hero />
      <Features />
      <Pricing />
      <Faq />
      <Testimonials />
      <Download />
      <Footer />
    </Router>
  );
};

export default App;
