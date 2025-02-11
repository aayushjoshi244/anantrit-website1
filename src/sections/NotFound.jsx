import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gray-900">
      <h1 className="text-5xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-lg">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 text-blue-400 hover:underline">Go Home</Link>
    </div>
  );
};

export default NotFound;
