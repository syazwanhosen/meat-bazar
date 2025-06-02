"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user") || "{}");
                const token = localStorage.getItem("token");

                if (!user?.id || !token) {
                    setError("User not authenticated.");
                    setLoading(false);
                    return;
                }

                const res = await axios.get(
                    `http://localhost:5000/api/orders/seller/${user.id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setOrders(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load orders.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return (
        <div className="bg-gray-100 min-h-screen text-black">
            <NavigationBar />
            <div className="container mx-auto p-8">
                <div className="min-h-screen bg-gray-100 p-6 text-black">
                    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="px-6 py-4 border-b">
                            <h2 className="text-xl font-bold">Order History</h2>
                        </div>
                        {orders.length === 0 ? (
                            <div className="p-6 text-gray-600">No orders found.</div>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left font-medium">Product</th>
                                        <th className="px-6 py-3 text-left font-medium">Buyer</th>
                                        <th className="px-6 py-3 text-left font-medium">Quantity</th>
                                        <th className="px-6 py-3 text-left font-medium">Total</th>
                                        <th className="px-6 py-3 text-left font-medium">Address</th>
                                        <th className="px-6 py-3 text-left font-medium">Phone</th>
                                        <th className="px-6 py-3 text-left font-medium">Notes</th>
                                        <th className="px-6 py-3 text-left font-medium">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {orders.map((order, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">{order.productName}</td>
                                            <td className="px-6 py-4">{order.buyerName}</td>
                                            <td className="px-6 py-4">{order.quantity}</td>
                                            <td className="px-6 py-4">{order.total}</td>
                                            <td className="px-6 py-4">{order.address}</td>
                                            <td className="px-6 py-4">{order.phone}</td>
                                            <td className="px-6 py-4">{order.orderNotes}</td>
                                            <td className="px-6 py-4">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
