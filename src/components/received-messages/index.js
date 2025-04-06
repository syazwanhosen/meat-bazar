"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "../navigation-bar";
import Footer from "../footer";
import { getUser, getToken } from "@/utils";

export default function ReceivedMessages() {
    const user = getUser()
    const token = getToken()
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMessages = async () => {
            if (!token) return;

            try {
                const res = await axios.get(`http://localhost:5000/api/chat/received/${user.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMessages(res.data);
            } catch (err) {
                setError("Failed to load received messages.");
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen text-black">
            <NavigationBar />
            <div className="p-6">
                <h2 className="text-2xl font-bold text-center mb-6">Received Messages</h2>

                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <ul className="bg-white shadow-lg rounded-lg p-4">
                    {messages.length === 0 && !loading ? (
                        <p className="text-gray-600 text-center">No messages received.</p>
                    ) : (
                        messages.map((msg) => (
                            <li key={msg._id} className="border-b p-3">
                                <p className="text-gray-800 font-semibold">{msg.sender?.name || "Unknown"}</p>
                                <p className="text-gray-500 text-sm">{msg.sender?.email || "No email"}</p>
                                <p className="text-gray-600 mt-2">{msg.message}</p>
                            </li>
                        ))
                    )}
                </ul>
            </div>
            <Footer />
        </div>
    );
}
