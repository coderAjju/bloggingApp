import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({

  // Initialize authUser from localStorage or default to null
  authUser: JSON.parse(localStorage.getItem("authUser")) || null,


  setUser: (user) => set({ user }),

  signup: async (formData) => {
    try {
      const res = await axiosInstance.post("/api/auth/signup", formData);
      toast.success(res.data.message);
      return true;
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  },
  signin: async (formData) => {
    try {
      const res = await axiosInstance.post("/api/auth/signin", formData);
      set({ authUser: res.data.user });
      localStorage.setItem("authUser", JSON.stringify(res.data.user));
      toast.success(res.data.message);
      return true;
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  },
}));

export default useAuthStore;
