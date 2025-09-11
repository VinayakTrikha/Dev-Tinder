const { Worker } = require("bullmq");
const connection = { host: "127.0.0.1", port: process.env.REDIS_PORT };
const sendEmail = require("../utils/sendEmail");

const worker = new Worker(
  "email-queue",
  async (job) => {
    try {
      const { email, userId } = job.data;
      await sendEmail(email, "Test email", "Test email");
    } catch (error) {
      console.log("Error: ", error);
    }
  },
  {
    connection: connection,
    concurrency: 5,
    limiter: { max: 5, duration: 1000 },
  }
);
