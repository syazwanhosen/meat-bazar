require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const Message = require("./models/Message");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");
const chatRoutes = require("./routes/chat");
const userRoutes = require("./routes/user");

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST", "PUT"] })); // Ensure frontend can access WebSocket
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // ✅ Serve static files from uploads/

// Create HTTP Server
const server = http.createServer(app); // ✅ Use this for Socket.io

// Setup Socket.io
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Ensure Next.js frontend can connect
        methods: ["GET", "POST", "PUT"],
    },
});

// Store active users
let onlineUsers = {};

io.on("connection", (socket) => {
    console.log("✅ User Connected:", socket.id);

    // User joins chat
    socket.on("joinChat", (userId) => {
        onlineUsers[userId] = socket.id;
        io.emit("updateUserList", Object.keys(onlineUsers));
    });

    socket.on("sendMessage", async (data) => {
        const { sender, receiver, message } = data;
        const receiverSocket = onlineUsers[receiver];
        console.log(`📩 Message sent from ${sender} to ${receiver}:`, message);

        try {
            // ✅ Save message to MongoDB
            const newMessage = new Message({
                sender,
                receiver,
                message,
                timestamp: new Date(),
            });

            await newMessage.save(); // Save to database

            // ✅ Emit message to receiver if online
            if (receiverSocket) {
                io.to(receiverSocket).emit("receiveMessage", newMessage);
            }

        } catch (error) {
            console.error("❌ Error saving message:", error);
        }
    });


    // User disconnects
    socket.on("disconnect", () => {
        console.log("❌ User Disconnected:", socket.id);
        Object.keys(onlineUsers).forEach((key) => {
            if (onlineUsers[key] === socket.id) delete onlineUsers[key];
        });
        io.emit("updateUserList", Object.keys(onlineUsers));
    });
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("❌ MongoDB Error: ", err));

// Define a test route
app.get("/", (req, res) => {
    res.send("✅ Meat Bazar API is running...");
});

// Start Server (✅ Fix: Start `server` instead of `app`)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {  // ✅ Use `server.listen()` instead of `app.listen()`
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Define API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/user", userRoutes); // ✅ Include user routes
