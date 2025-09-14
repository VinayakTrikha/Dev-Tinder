import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as userService from "../services/user.service";

const Chat = () => {
  const { targetId } = useParams();
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const currentUser = useSelector((store) => store.user);
  const messagesEndRef = useRef(null);

  const fetchChats = async () => {
    const res = await userService.fetchAllChats(targetId);
    const chatArr = res.data.map((chat) => {
      return {
        mssg: chat.text,
        fromUserId: chat.senderId,
        toUserId: targetId,
        firstName: chat.senderName,
      };
    });
    setChatMessages(chatArr);
  };
  useEffect(() => {
    if (currentUser) {
      socket.connect();
      socket.emit("joinChat", {
        fromUserId: currentUser._id,
        toUserId: targetId,
        firstName: currentUser.firstName,
      });
      socket.on("receivedMssg", (messageData) => {
        setChatMessages((prevMessages) => [...prevMessages, messageData]);
      });
    }
    return () => socket.disconnect();
  }, [currentUser]);

  useEffect(() => {
    const res = fetchChats();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSendMessage = () => {
    socket.emit("message", {
      mssg: currentMessage,
      fromUserId: currentUser._id,
      toUserId: targetId,
      firstName: currentUser.firstName,
    });
    setCurrentMessage("");
  };

  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5 ">
        {chatMessages.map((message, idx) => (
          <div
            className={`chat ${
              currentUser._id === message.fromUserId ? "chat-end" : "chat-start"
            }`}
            key={idx}
          >
            <div className="chat-header">
              {message.firstName}
              {/* <time className="text-xs opacity-50">2 hours ago</time> */}
            </div>
            <div className="chat-bubble">{message.mssg}</div>
            {/* <div className="chat-footer opacity-50">Seen</div> */}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-500 bg-black text-white rounded p-2"
          value={currentMessage}
          onChange={(event) => setCurrentMessage(event.target.value)}
        />
        <button className="btn btn-secondary" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
