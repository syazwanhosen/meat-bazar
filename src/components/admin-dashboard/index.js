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

    const approveSeller = async (id) => {
        try {
            const token = localStorage.getItem("token"); // ✅ Retrieve token from localStorage
            if (!token) {
                setError("Unauthorized: No token found.");
                return;
            }

            await axios.put(
                `http://localhost:5000/api/user/approve-seller/${id}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` } // ✅ Send token in request
                }
            );

            setSellers((prevSeller) =>
                prevSeller.map((s) => (s._id === id ? { ...s, approved: true } : s))
            );
        } catch (err) {
            setError(err.response?.data?.message || "Failed to approve seller.");
        }
    };


    return (
        <div className="bg-gray-100 min-h-screen">
            <NavigationBar />
            <div className="p-6 text-black">
                <h2 className="text-2xl font-bold text-center mb-6">Admin Dashboard - Approve Suppliers</h2>

                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <table className="w-full bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.map((seller) => (
                            <tr key={seller._id} className="border-b">
                                <td className="p-2">{seller.name}</td>
                                <td className="p-2">{seller.email}</td>
                                <td className="p-2">{seller.approved ? "Approved" : "Pending"}</td>
                                <td className="p-2">
                                    {!seller.approved && (
                                        <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => approveSeller(seller._id)}>Approve</button>
                                    )}
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
