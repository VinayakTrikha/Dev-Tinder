const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const connectionRequestSchema = new Schema(
  {
    // This type is specifically designed to store MongoDB's ObjectId values. ObjectId is a 12-byte BSON type optimized for use as primary keys in MongoDB collections.
    toUserId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: "{VALUE} is not supported",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
