import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/api/auth/check');
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true }); // Set loading state
    try {
      const res = await axiosInstance.post("/api/auth/signup", data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      toast.success("Account created successfully"); // Fixed typo: 'sucess' -> 'success'
      set({ authUser: res.data });
      return res.data; // Return the response data
    } catch (error) {
      console.error("Signup error:", error.response);
      toast.error(error.response?.data?.message || "Signup failed. Please try again.");
      throw error; // Re-throw the error for handling in the component
    } finally {
      set({ isSigningUp: false });
    }
  },
}));