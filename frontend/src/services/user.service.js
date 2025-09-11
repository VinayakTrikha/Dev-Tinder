import axios from "axios";

export const fetchRequests = async () => {
  return axios.get(
    `${import.meta.env.VITE_BASE_URL}/user/request/received`,
    {
      withCredentials: true,
    }
  );
};

export const fetchConnections = async () => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/user/connections`, {
    withCredentials: true,
  });
};

export const fetchAllFeed = async () => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/user/feed?page=1&limit=10`, {
    withCredentials: true,
  });
};
