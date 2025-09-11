import axios from "axios";

export const sendRequest = ({ status, requestId }) => {
  return axios.post(`${import.meta.env.VITE_BASE_URL}/request/send/${status}/${requestId}`, {}, {withCredentials: true});
};
export const reviewRequest = ({ status, requestId }) => {
  return axios.post(`${import.meta.env.VITE_BASE_URL}/request/review/${status}/${requestId}`, {}, {withCredentials: true});
};
