// backend/src/lib/socket.js  (or wherever you initialize Socket.IO)
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// === FIXED CORS & CONFIG ===
const allowedSocketOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
].filter(Boolean);

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedSocketOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Socket CORS policy does not allow access from ${origin}`));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,                  // Allow cookies
  },
  path: "/socket.io/",                  // Match Nginx location
  allowEIO3: true,                      // Optional: support older clients
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

const userSocketMap = {}; // { userId: socketId }

// === CONNECTION LOGIC ===
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  // Send updated online users to ALL clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // === DISCONNECT ===
  socket.on("disconnect", (reason) => {
    console.log("User disconnected:", socket.id, "Reason:", reason);
    if (userId) {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

export { io, app, server };