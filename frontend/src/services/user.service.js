import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchRequests = async () => {
  return axios.get(`${BASE_URL}/user/request/received`, {
    withCredentials: true,
  });
};

export const fetchConnections = async () => {
  return axios.get(`${BASE_URL}/user/connections`, {
    withCredentials: true,
  });
};

export const fetchAllFeed = async () => {
  return axios.get(`${BASE_URL}/user/feed?page=1&limit=10`, {
    withCredentials: true,
  });
};

export const fetchAllChats = async (targetId) => {
  return axios.get(`${BASE_URL}/user/chats/${targetId}`, {
    withCredentials: true
  });
};
