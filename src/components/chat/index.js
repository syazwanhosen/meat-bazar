import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

const Chat = ({ userId, receiverId }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.emit("joinChat", userId);

        socket.on("receiveMessage", (newMessage) => {
            console.log("New message received:", newMessage);
            setMessages((prev) => [...prev, newMessage]); // ✅ Real-time update
        });

        return () => {
            socket.off("receiveMessage"); // ✅ Cleanup
        };
    }, []); // ✅ Remove dependency (should run only once)


    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/chat/${userId}/${receiverId}`);
                setMessages(res.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        fetchMessages();
    }, [userId, receiverId]);

    const sendMessage = async () => {
        if (message.trim() === "") return;

        const msgData = { sender: userId, receiver: receiverId, message };

        try {
            // ✅ Emit message only after saving
            socket.emit("sendMessage", msgData);

            // ✅ Update UI instantly
            setMessages((prev) => [...prev, msgData]);

            setMessage(""); // Clear input field
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };


    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <p key={index} className={msg.sender === userId ? "sent" : "received"}>
                        {msg.message}
                    </p>
                ))}
            </div>
            <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
