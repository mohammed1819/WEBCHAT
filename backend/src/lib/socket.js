// backend/src/lib/socket.js  (or wherever you initialize Socket.IO)
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// === FIXED CORS & CONFIG ===
const allowedSocketOrigins = [
  process.env.CLIENT_URL,
  process.env.CLIENT_URI,
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "https://pulsebridge-inky.vercel.app",
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

  const initialUserId = socket.handshake.auth?.userId || socket.handshake.query?.userId;
  if (initialUserId && initialUserId !== "undefined") {
    userSocketMap[initialUserId] = socket.id;
  }

  socket.on("join", (userId) => {
    if (!userId || userId === "undefined") return;
    userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

  // Send updated online users to all clients right away
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // === DISCONNECT ===
  socket.on("disconnect", (reason) => {
    console.log("User disconnected:", socket.id, "Reason:", reason);
    const currentUserId = Object.keys(userSocketMap).find((id) => userSocketMap[id] === socket.id);
    if (currentUserId) {
      delete userSocketMap[currentUserId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

export { io, app, server };