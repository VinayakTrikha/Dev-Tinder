import axios from "axios";

export const editProfile = async (formData) => {
  return axios.patch(`${import.meta.env.VITE_BASE_URL}/profile/edit/`, formData, {
    withCredentials: true,
  });
};

export const fetchUserInfo = async () => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/profile/view`, {
    withCredentials: true,
  });
};
