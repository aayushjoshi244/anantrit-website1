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

  login: async (email, password) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/api/auth/login", { email, password });
      set({ authUser: res.data });
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
      set({ authUser: null });
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  updateProfile: async(data) =>{
    set({ isUpdatingProfile: true});
    try {
      const res = await axiosInstance.put("/api/auth/update-profile", data);
      set({ authUser: res.data});
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);

    } finally {
      set({ isUpdatingProfile: false});
    }
  } 
}));