const { Server } = require("socket.io");
const crypto = require("crypto");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Chat = require("../models/chat");
const ConnectionRequest = require("../models/connectionRequest");

const getRoomId = (toUserId, fromUserId) => {
  return crypto
    .createHash("sha256")
    .update([fromUserId, toUserId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server, corsOptions) => {
  const io = new Server(server, {
    cors: corsOptions,
  });

  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers.cookie);
    const token = cookies.token;
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    const user = await User.findById(userId);
    if (!user) {
      return next(new Error("User not found"));
    }
    next();
  });

  // Socket.IO connection event
  io.on("connection", (socket) => {
    console.log("A user connected: ", socket.id);

    socket.on("joinChat", (data) => {
      const { fromUserId, toUserId, firstName } = data;
      const roomId = getRoomId(toUserId, fromUserId);
      socket.join(roomId);
      console.log(firstName + " joined the room " + roomId);
    });

    socket.on("message", async (data) => {
      try {
        const { fromUserId, toUserId, firstName, mssg } = data;

        const isConnected = await ConnectionRequest.findOne({
          toUserId,
          fromUserId,
          status: "accepted",
        });

        if (!isConnected) throw new Error("Not connected");

        const roomId = getRoomId(toUserId, fromUserId);
        let chat = await Chat.findOne({
          participants: { $all: [fromUserId, toUserId] },
        });
        if (!chat) {
          chat = new Chat({
            participants: [fromUserId, toUserId],
            messages: [],
          });
        }
        chat.messages.push({
          senderId: fromUserId,
          text: mssg,
        });
        await chat.save();
        io.to(roomId).emit("receivedMssg", data);
      } catch (error) {
        throw new Error("Not saved", error);
      }
    });

    socket.on("disconnect", (reason) => {
      console.log("User disconnected ", reason);
    });
  });
};

module.exports = initializeSocket;
