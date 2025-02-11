import React from "react";

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-s4">Sign Up</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white" />
          <input type="email" placeholder="Email" className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white" />
          <input type="password" placeholder="Password" className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white" />
          <button type="submit" className="w-full py-3 bg-s4 text-white font-semibold rounded-lg">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
