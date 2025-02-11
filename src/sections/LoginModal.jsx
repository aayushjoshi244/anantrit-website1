import { useNavigate } from "react-router-dom";

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); // Use navigate for React Router

  if (!isOpen) return null; // If modal is not open, return nothing

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-xl"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold mb-6 text-s4">
          Sign In to ANANTRIT
        </h2>

        <form className="form space-y-4">
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:border-blue-500 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:border-blue-500 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 bg-s4 text-white font-semibold rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>

        <div className="flex flex-row justify-between">
          <div className="mt-4 text-gray-300">
            <small>
              Don’t have an account?{" "}
              <button
                className="text-blue-400 hover:underline"
                onClick={() => navigate("/signup")} // Navigate to Signup page
              >
                Sign up
              </button>
            </small>
          </div>
          <div className="mt-4">
            <button className="text-blue-400 hover:underline text-sm">
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
