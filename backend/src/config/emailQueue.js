const { Queue } = require("bullmq");
const QueueScheduler = require("bullmq").QueueScheduler;

const connection = { host: "127.0.0.1", port: process.env.REDIS_PORT };

const emailQueue = new Queue("email-queue", { connection });

module.exports = emailQueue;
