"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "../navigation-bar";
import Footer from "../footer";

export default function EditProfile() {
    const [user, setUser] = useState({
        id: "",
        name: "",
        email: "",
        address: "",
        profilePicture: ""
    });
    const [message, setMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    useEffect(() => {
        const fetchSeller = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get("http://localhost:5000/api/user/seller", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const { _id, name, email, address, profilePicture } = res.data;
                setUser({ id: _id, name, email, address: address || "", profilePicture: profilePicture || "" });
                if (profilePicture) setPreviewUrl(`http://localhost:5000/${profilePicture}`);
            } catch (err) {
                setMessage(err.response?.data?.message || "Failed to fetch seller info.");
            }
        };
        fetchSeller();
    }, []);


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("address", user.address);
        if (selectedFile) {
            formData.append("profilePicture", selectedFile);
        }

        try {
            await axios.put(`http://localhost:5000/api/user/${user.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
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
                {message && <p className="text-red-500 mb-4">{message}</p>}

                {/* Profile Picture Preview */}
                {previewUrl && (
                    <img
                        src={previewUrl}
                        alt="Profile Preview"
                        className="w-32 h-32 rounded-full object-cover mb-4 border"
                    />
                )}

                {/* Upload New Profile Picture */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mb-4"
                />

                {/* Name */}
                <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="p-2 border rounded mb-4 w-96"
                    placeholder="Name"
                />

                {/* Email */}
                <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="p-2 border rounded mb-4 w-96"
                    placeholder="Email"
                />

                {/* Address */}
                <textarea
                    value={user.address}
                    onChange={(e) => setUser({ ...user, address: e.target.value })}
                    className="p-2 border rounded mb-4 w-96 h-24 resize-none"
                    placeholder="Address"
                />

                {/* Submit */}
                <button
                    onClick={handleUpdate}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Update Profile
                </button>
            </div>
            <Footer />
        </div>
    );
}
