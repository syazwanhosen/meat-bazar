const express = require("express");
const Message = require("../models/Message");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth")

// Send a Message
router.post("/", auth, async (req, res) => {
    const { sender, receiver, message } = req.body;

    try {
        const newMessage = new Message({ sender, receiver, message });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: "Error sending message", error });
    }
});

// Get Messages between Two Users
router.get("/:sender/:receiver", auth, async (req, res) => {
    const { sender, receiver } = req.params;

    // ✅ Validate sender & receiver as ObjectIds
    if (!mongoose.Types.ObjectId.isValid(sender) || !mongoose.Types.ObjectId.isValid(receiver)) {
        return res.json([]); // Return empty string if invalid ObjectId
    }

    try {
        const messages = await Message.find({
            $or: [
                { sender: new mongoose.Types.ObjectId(sender), receiver: new mongoose.Types.ObjectId(receiver) },
                { sender: new mongoose.Types.ObjectId(receiver), receiver: new mongoose.Types.ObjectId(sender) },
            ],
        }).sort({ timestamp: 1 });

        res.json(messages.length > 0 ? messages : []); // ✅ Return messages or empty string
    } catch (error) {
        res.status(500).json({ message: "Error fetching messages", error });
    }
});

// ✅ Get All Messages Where Logged-in User is the Receiver
router.get("/received/:receiverId", auth, async (req, res) => {
    const { receiverId } = req.params;

    try {
        const messages = await Chat.find({ receiver: receiverId }) // ✅ Get all messages where logged-in user is the receiver
            .populate("sender", "name email") // ✅ Include sender's name & email
            .sort({ createdAt: 1 }); // ✅ Sort by oldest first

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching received messages", error });
    }
});

module.exports = router;
