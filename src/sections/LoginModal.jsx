import React from "react";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); // For navigation

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-xl"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold mb-6 text-s4">Sign In to ANANTRIT</h2>

        <form className="space-y-4">
          <input
            type="text"
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
            className="w-full py-3 bg-s4 text-white font-semibold rounded-lg transition duration-300 ease-in-out hover:text-glow"
          >
            Login
          </button>
        </form>

        <div className="flex flex-row justify-between mt-4">
          <small className="text-gray-300">
            Don’t have an account?{" "}
            <button
              className="text-blue-400 hover:underline"
              onClick={() => {
                onClose(); // Close the modal
                navigate("/signup"); // Navigate to Signup page
              }}
            >
              Sign up
            </button>
          </small>
          <button className="text-blue-400 hover:underline text-sm">
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
