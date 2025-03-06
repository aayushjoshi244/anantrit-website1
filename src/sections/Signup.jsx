import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App"; // Import useAuth to manage authentication

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.fullName || !user.email || !user.password) {
      alert("Please fill in all fields.");
      return;
    }

    // Save user data in localStorage
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Authenticate user
    login(user); // Call login function to set authentication state

    // Redirect to Posts Page
    navigate("/posts");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 top-20 left-3">
        <img
          src="/images/anantrit.svg"
          alt="Anantrit Logo"
          className="w-[35%] h-auto"
        />
      </div>

      {/* Signup Form Container */}
      <div className="bg-gray-800 bg-opacity-75 p-8 rounded-lg shadow-lg max-w-md w-full z-10 relative">
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 right-3 text-white text-2xl hover:text-red-500"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={user.fullName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
