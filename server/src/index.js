import http from "http";
import dotenv from "dotenv";
import connectDB from "./db.js";
import app from "./app.js";
import { initSocket } from "./socket.js";

dotenv.config();

// 🛢️ Connect DB
connectDB();

// 🌐 Create HTTP server using Express app
const server = http.createServer(app);

// 🔌 Attach Socket.IO to SAME server
initSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server + WebSocket running on port ${PORT}`);
});
