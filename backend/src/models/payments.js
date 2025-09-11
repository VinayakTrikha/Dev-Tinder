const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const PaymentsSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    orderId: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    receipt: {
      type: String,
      required: true,
    },
    notes: {
      lastName: {
        type: String,
      },
      firstName: {
        type: String,
      },
      memberShip: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PaymentsModel", PaymentsSchema);
