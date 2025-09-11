const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

// require("./utils/cron");

const app = express();
const http = require("http");
const server = http.createServer(app);

// Setup CORS for both Express & Socket.IO
const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN,
  credentials: true,
};

// Attach Socket.IO to HTTP server with CORS
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: corsOptions,
});

// Socket.IO connection event
io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);
});

// Express Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// Database + Server Start
connectDB()
  .then(() => {
    server.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
    console.log("Cluster connected to the database");
  })
  .catch((err) => {
    console.error("❌ Database connection failed", err);
  });
