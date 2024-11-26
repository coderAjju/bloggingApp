import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const useAuthStore = create((set,get) => ({

  // Initialize authUser from localStorage or default to null
  authUser: JSON.parse(localStorage.getItem("authUser")) || null,



  setUser: (user) => {
    set({ authUser: user });
    localStorage.setItem("authUser",JSON.stringify(get().authUser))
  },

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
      console.log(get().authUser);
      localStorage.setItem("authUser", JSON.stringify(get().authUser));
      toast.success(res.data.message);
      return true;
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  },
}));

export default useAuthStore;
