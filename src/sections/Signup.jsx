import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"; // Updated import path


const Signup = () => {
  const navigate = useNavigate();
  const { signup, isSigningUp } = useAuthStore(); // Using Zustand store

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.fullName || !user.email || !user.password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await signup(user); // Using Zustand's signup action
      navigate("/posts");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
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
        
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={user.fullName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing Up...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;