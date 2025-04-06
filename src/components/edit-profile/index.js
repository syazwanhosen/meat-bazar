"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "../navigation-bar";
import Footer from "../footer";

export default function EditProfile() {
    const [user, setUser] = useState({ id: "", name: "", email: "" });
    const [message, setMessage] = useState("");
    const isSupplier = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        const { id, name, email } = isSupplier
        setUser({ id, name, email });
    }, []);

    const handleUpdate = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            await axios.put(`http://localhost:5000/api/user/${user.id}`, user, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            });
            setMessage("Profile updated successfully.");
        } catch (err) {
            setMessage(err.response?.data?.message || "Update failed.");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <NavigationBar />
            <div className="p-6 flex flex-col items-center text-black">
                <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                {message && <p className="text-red-500">{message}</p>}

                <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} className="p-2 border rounded mb-4 w-96" placeholder="Name" />
                <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="p-2 border rounded mb-4 w-96" placeholder="Email" />

                <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">Update Profile</button>
            </div>
            <Footer />
        </div>
    );
}
