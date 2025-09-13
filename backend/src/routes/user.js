const express = require("express");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const Chat = require("../models/chat");
const { userAuth } = require("../middlewares/auth");
const { fields } = require("../utils/validation");
const requestRouter = require("./request");

requestRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const data = await ConnectionRequest.find({
      $and: [{ toUserId: user._id }, { status: "interested" }],
    }).populate("fromUserId", fields);
    const structuredData = data.map((val) => ({
      ...val.fromUserId.toObject(),
      requestId: val._id,
    }));
    res.status(200).json({ message: "Data fetched", data: structuredData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

requestRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const data = await ConnectionRequest.find({
      $or: [
        { toUserId: req.user._id, status: "accepted" },
        { fromUserId: req.user._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", fields)
      .populate("toUserId", fields);

    const filteredData = data.map((val) => {
      if (val.toUserId._id.toString() === req.user._id.toString()) {
        return val.fromUserId;
      }
      return val.toUserId;
    });
    res.status(200).json({ message: "Data fetched", data: filteredData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

requestRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");
    const hideUserFromFeed = new Set();
    connectionRequest.forEach((connection) => {
      hideUserFromFeed.add(connection.toUserId);
      hideUserFromFeed.add(connection.fromUserId);
    });
    const userData = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(fields)
      .skip(skip)
      .limit(limit);
    res.status(200).json({ message: "Data fetched", data: userData || [] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

requestRouter.get("/user/chats/:targetId", userAuth, async (req, res) => {
  try {
    const { targetId } = req.params;
    const senderId = req.user._id.toString();
    let chat = await Chat.findOne({
      participants: { $all: [senderId, targetId] },
    }).populate("messages.senderId", "firstName");

    if (!chat) return res.status(204).json();

    const messagesWithSender = chat.messages.map((msg) => ({
      _id: msg._id,
      text: msg.text,
      senderId: msg.senderId._id,
      senderName: msg.senderId.firstName,
      createdAt: msg.createdAt,
    }));

    return res.status(200).json(messagesWithSender);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = userRouter;
