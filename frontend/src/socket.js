import { io } from "socket.io-client";

const URL = "http://localhost:7777";

export const socket = io(URL, { autoConnect: false, withCredentials: true });
