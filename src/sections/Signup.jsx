import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Signup = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Background Logo */}
      <div className=" absolute inset-0 flex items-center justify-center opacity-10 top-20 left-3">
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
          onClick={() => navigate(-1)} // Navigate back when clicked
          className="absolute top-3 right-3 text-white text-2xl hover:text-red-500"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold mb-6 text-s4">Sign Up</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white"
          />
          <button
            type="submit"
            className="w-full py-3 bg-s4 text-white font-semibold rounded-lg"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
