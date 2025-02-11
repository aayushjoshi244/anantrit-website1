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
import Signup from "./sections/Signup"; // Import Signup page

const Layout = () => {
  const location = useLocation(); // Get current route

  return (
    <main className="overflow-hidden">
      {/* Hide Header only on Signup page */}
      {location.pathname !== "/signup" && <Header />} 
      
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/download" element={<Download />} />
      </Routes>

      {location.pathname !== "/signup" && <Footer />} {/* Hide Footer on Signup */}
    </main>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
