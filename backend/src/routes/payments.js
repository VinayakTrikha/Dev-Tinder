const express = require("express");
const { userAuth } = require("../middlewares/auth");
const paymentRouter = express.Router();
const razorPayInstance = require("../config/razorpay");
const PaymentsModel = require("../models/payments");
const { membershipAmount } = require("../utils/common");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const User = require("../models/user");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;
    const { firstName, lastName, emailId } = req.user;

    const order = await razorPayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      notes: {
        // All the metadata
        firstName: firstName,
        lastName: lastName,
        plan: membershipType,
      },
    });
    //save it in database
    const payment = new PaymentsModel({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();

    //return back the details to frontend
    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
  } catch (error) {}
});

paymentRouter.post("/paymnet/webhook", async (req, res) => {
  try {
    const webhookSignature = req.get("X-Razorpay-Signature");
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );
    if (!isWebhookValid) {
      res.status(400).json({ message: "Not valid" });
    }

    // update my payment status in DB
    const paymentDetails = req.body.payload.payment.entity;

    const payment = await PaymentsModel.findOne({
      orderId: paymentDetails.order_id,
    });
    payment.status = paymentDetails.status;
    await payment.save();
    //update the user as premium
    const user = await User.findOne({
      _id: payment.userId,
    });
    user.isPremium = true;
    user.membershipType = payment.membershipType;
    await user.save();
    // return success response to razorpay

    // if (req.body.event === "payment.captured") {
    // }
    // if (req.body.event === "payment.failed") {
    // }

    return res.status(200).json({ mssg: "Webhook received" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
