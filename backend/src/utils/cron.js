const cron = require("node-cron");
const ConnectionRequest = require("../models/connectionRequest");
const sendEmail = require("./sendEmail");
const { Queue, Worker } = require("bullmq");
// const QueueScheduler = require("bullmq").QueueScheduler;
const connection = { host: "127.0.0.1", port: 6379 };

const emailQueue = new Queue("email-queue", { connection });

// new QueueScheduler("email-queue", { connection });

cron.schedule("*/10 * * * * *", async () => {
  try {
    const pendingRequests = await ConnectionRequest.find({
      status: { $in: ["interested"] },
    }).populate("toUserId");
    const mailJobs = new Set(
      pendingRequests.map((request) => ({
        name: "send-email",
        data: { email: request.toUserId.emailId, userId: request.toUserId.id },
      }))
    );
    await emailQueue.add(mailJobs)
  } catch (error) {
    console.log(error);
  }
});

module.exports = cron;
