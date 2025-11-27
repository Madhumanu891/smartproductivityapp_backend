// server.js

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const projectRoutes = require("./routes/projectRoutes");
const chatRoutes = require("./routes/chatRoutes");
const meetingRoutes = require("./routes/meetingRoutes");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Socket.IO initialization
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Chat events
  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/meetings", meetingRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
