import axios from "axios";

export const login = async (formData) => {
    return axios.post(`${import.meta.env.VITE_BASE_URL}/login`, formData, {
        withCredentials: true,
      });
}

export const signup = async (formData) => {
    return axios.post(`${import.meta.env.VITE_BASE_URL}/signup`, formData, {
        withCredentials: true,
      });
}

export const logout = async () => {
    return axios.post(`${import.meta.env.VITE_BASE_URL}/logout`, {} ,{ withCredentials: true });
} 