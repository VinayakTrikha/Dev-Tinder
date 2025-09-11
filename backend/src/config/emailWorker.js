const { Worker } = require("bullmq");
const connection = { host: "127.0.0.1", port: process.env.REDIS_PORT };
const sendEmail = require("../utils/sendEmail");

const emailWorker = new Worker(
  "email-queue",
  async (job) => {
    const { email, subject, body } = job.data;
    try {
      await sendEmail(email, subject, body);
      console.log("Mail sent: ", email);
    } catch (error) {
      console.log("Error From the worker: ", error);
    }
  },
  {
    connection: connection,
    concurrency: 5,
    limiter: {
      max: 5,
      duration: 1000,
    },
  }
);

emailWorker.on("completed", (job) => {
  console.log(`✅ Email sent to ${job.data.email}`);
});
emailWorker.on("failed", (job, err) => {
  console.error(`❌ Failed for ${job.data.email}:`, err.message);
});

module.exports = emailWorker;
