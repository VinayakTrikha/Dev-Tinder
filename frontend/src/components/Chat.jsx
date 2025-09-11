import { useEffect } from "react";
import { socket } from "../socket";

const Chat = () => {
  useEffect(() => {
    socket.connect();
  }, []);
  return <div>Chat</div>;
};

export default Chat;
