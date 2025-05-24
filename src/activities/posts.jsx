import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaUser,
  FaUpload,
  FaEdit,
  FaEnvelope,
  FaSignOutAlt,
  FaShoppingCart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import Button from "../components/Button.jsx";
import UploadCode from "./UploadCode";
import PostSection from "./posting.jsx";

const MainSection = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("posts"); // "posts" or "repository"
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser(currentUser);
    }
  
    useEffect(() => {
    // Redirect to home if not authenticated
    if (authUser === null && !useAuthStore.getState().isCheckingAuth) {
      navigate("/");
    }
  }, [authUser, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/"); // Redirect to home after logout
    } catch (error) {
      toast.error("Failed to logout");
      console.error("Logout error:", error);
    }
  };

  if (useAuthStore.getState().isCheckingAuth) {
    return <div>Loading...</div>; // Or your loading spinner
  }

  if (!authUser) {
    return null; // The useEffect will handle the redirect
  }
    
    setSuggestedUsers(["Alice", "Bob", "Charlie"]);
  }, []);

  return (
    <div className="relative flex min-h-screen bg-gray-900 text-white">
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <img
          src="/images/anantrit.svg"
          alt="Anantrit Logo"
          className="w-[35%] h-auto"
        />
      </div>

      {/* Left Sidebar */}
      <div className="w-[200px] p-4 bg-gray-800 bg-opacity-75 h-screen flex flex-col justify-between">
        <nav className="space-y-8">
          <Button
            className={`flex items-center gap-3 text-lg w-full max-w-[400px] justify-start px-6 py-3 ${
              activeSection === "posts" ? "bg-blue-600" : ""
            }`}
            onClick={() => setActiveSection("posts")}
          >
            <FaHome className="w-5 h-5 inline-block flex-shrink-0" />{" "}
            <span className="inline-block ml-2">Home</span>
          </Button>
          <Button className="flex items-center gap-3 text-lg w-full justify-start">
            <FaEnvelope className="w-5 h-5 inline-block flex-shrink-0" />{" "}
            <span className="inline-block ml-2">Message</span>
          </Button>
          <Button
            className={`flex items-center gap-3 text-lg w-full justify-start ${
              activeSection === "repository" ? "bg-blue-600" : ""
            }`}
            onClick={() => setActiveSection("repository")}
          >
            <FaUpload className="w-5 h-5 inline-block flex-shrink-0" />{" "}
            <span className="inline-block ml-2">Idea Git</span>
          </Button>
          <Button 
            className="flex items-center gap-3 text-lg w-full justify-start"
            onClick={() => navigate("/create-post")}
          >
            <FaEdit className="w-5 h-5 inline-block flex-shrink-0" />{" "}
            <span className="inline-block ml-2">New Post</span>
          </Button>
          <Button className="flex items-center gap-3 text-lg w-full justify-start">
            <FaShoppingCart className="w-5 h-5 inline-block flex-shrink-0" />{" "}
            <span className="inline-block ml-2">Let's Shop</span>
          </Button>
        </nav>
        <div className="mt-auto">
          <Button
            className="flex items-center justify-center w-full py-2 mt-auto space-x-2"
            onClick={() => navigate("/profile")}
          >
            <FaUser className="w-5 h-5 inline-block flex-shrink-0" />{" "}
            <span className="inline-block ml-2">Profile</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl p-5 mx-auto">
        {activeSection === "posts" ? (
          <PostSection user={user} />
        ) : (
          <UploadCode />
        )}
      </div>

      {/* Right Sidebar */}
      <div className="w-[200px] p-5 bg-gray-800 bg-opacity-75 h-screen flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-4">Suggested Users</h3>
          <ul className="space-y-3">
            {suggestedUsers.map((user, index) => (
              <li key={index} className="text-gray-300">
                {user}
              </li>
            ))}
          </ul>
        </div>

        <Button
          className="flex items-center justify-center w-full py-2 mt-auto space-x-2"
          onClick={() => {
            localStorage.removeItem("currentUser");
            window.location.reload();
          }}
        >
          <FaSignOutAlt className="w-5 h-5 inline-block flex-shrink-0" />
          <span className="inline-block ml-2">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default MainSection;