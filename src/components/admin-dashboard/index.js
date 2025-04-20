"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "../navigation-bar";
import Footer from "../footer";

export default function AdminDashboard() {
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSeller = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/user/sellers");
                setSellers(res.data);
            } catch (err) {
                setError("Failed to fetch sellers.");
            } finally {
                setLoading(false);
            }
        };
        fetchSeller();
    }, []);

    const getToken = () => localStorage.getItem("token");

    const approveSeller = async (id) => {
        const token = getToken();
        if (!token) return setError("Unauthorized: No token found.");
        try {
            await axios.put(
                `http://localhost:5000/api/user/approve-seller/${id}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSellers((prev) =>
                prev.map((s) => (s._id === id ? { ...s, approved: "approved" } : s))
            );
        } catch (err) {
            setError(err.response?.data?.message || "Failed to approve seller.");
        }
    };

    const rejectSeller = async (id) => {
        const token = getToken();
        if (!token) return setError("Unauthorized: No token found.");
        try {
            await axios.put(
                `http://localhost:5000/api/user/reject-seller/${id}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSellers((prev) =>
                prev.map((s) => (s._id === id ? { ...s, approved: "rejected" } : s))
            );
        } catch (err) {
            setError(err.response?.data?.message || "Failed to reject seller.");
        }
    };

    const deleteSeller = async (id) => {
        const token = getToken();
        if (!token) return setError("Unauthorized: No token found.");
        try {
            await axios.delete(
                `http://localhost:5000/api/user/delete-seller/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSellers((prev) => prev.filter((s) => s._id !== id));
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete seller.");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <NavigationBar />
            <div className="p-6 text-black">
                <h2 className="text-2xl font-bold text-center mb-6">Admin Dashboard - Manage Suppliers</h2>

                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <table className="w-full bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.map((seller) => (
                            <tr key={seller._id} className="border-b">
                                <td className="p-2">{seller.name}</td>
                                <td className="p-2">{seller.email}</td>
                                <td className="p-2">
                                    {seller.approved ? seller.approved : "pending"}
                                </td>
                                <td className="p-2 space-x-2">
                                    {!seller.approved && (
                                        <button
                                            className="bg-green-500 text-white px-3 py-1 rounded"
                                            onClick={() => approveSeller(seller._id)}
                                        >
                                            Approve
                                        </button>
                                    )}
                                    {!seller.approved && (
                                        <button
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                            onClick={() => rejectSeller(seller._id)}
                                        >
                                            Reject
                                        </button>
                                    )}
                                    <button
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                        onClick={() => deleteSeller(seller._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}
