const cron = require("node-cron");
const ConnectionRequest = require("../models/connectionRequest");
const { Queue } = require("bullmq");
// const QueueScheduler = require("bullmq").QueueScheduler;
const connection = { host: "127.0.0.1", port: 6379 };

const emailQueue = new Queue("email-queue", { connection });

// new QueueScheduler("email-queue", { connection });

cron.schedule("55 13 * * *", async () => {
  try {
    const pendingRequests = await ConnectionRequest.find({
      status: { $in: ["interested"] },
    }).populate("toUserId");
    for (let request of pendingRequests) {
      await emailQueue.add(
        "send-email",
        {
          email: request.toUserId.emailId,
          userId: request.toUserId._id.toString(), // always string
        },
        {
          attempts: 3,
          backoff: 1000,
          removeOnComplete: true,
        }
      );
      console.log(`Job added for: ${request.toUserId.emailId}`);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = cron;
