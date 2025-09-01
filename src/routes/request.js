const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");
const { isAllowedStatus, fields } = require("../utils/validation");

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (request, response) => {
    try {
      const fromUserId = request.user._id;
      const toUserId = request.params.userId;
      const status = request.params.status;

      // 1. Check if target user exists
      const userExists = await User.findById(toUserId);
      if (!userExists) {
        return response.status(404).json({ message: "User doesn't exist" });
      }

      // 2. Prevent sending request to self
      if (fromUserId.toString() === toUserId) {
        return response
          .status(400)
          .json({ message: "Cannot send request to yourself" });
      }

      // 3. Validate status
      if (!isAllowedStatus(status, ["interested", "ignored"])) {
        return response.status(400).json({ message: "Invalid request status" });
      }

      // 4. Check if request already exists (both directions)
      const requestExists = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (requestExists) {
        return response
          .status(400)
          .json({ message: "Connection request already exists" });
      }

      // 5. Save new request
      const newRequest = new ConnectionRequest({
        toUserId,
        fromUserId,
        status,
      });

      await newRequest.save();

      return response.status(201).json({ message: "Connection request sent" });
    } catch (error) {
      console.error("Error in /request/send:", error);
      return response.status(500).json({ message: "Something went wrong" });
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (request, response) => {
    try {
      const userId = request.user._id;
      const status = request.params.status;
      const requestId = request.params.requestId;

      if (!isAllowedStatus(status, ["accepted", "rejected"]))
        return response.status(400).json({ message: "Invalid request status" });

      const connectionRequest = await ConnectionRequest.findOne({
        $and: [
          { _id: requestId },
          { status: "interested" },
          { toUserId: userId },
        ],
      });

      if (!connectionRequest)
        return response
          .status(404)
          .json({ message: "Connection Request not found" });

      await ConnectionRequest.findByIdAndUpdate(requestId, { status: status });

      return response
        .status(200)
        .json({ message: "Status updated successfully!!" });
    } catch (error) {
      console.error("Error in /request/review:", error);
      return response.status(500).json({ message: "Something went wrong" });
    }
  }
);

module.exports = requestRouter;
