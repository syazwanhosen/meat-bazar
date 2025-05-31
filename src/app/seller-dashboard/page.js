"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";

export default function SellerDashboard() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState(null);

    const storedUser = typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("user") || "{}")
        : null;

    const getToken = () => localStorage.getItem("token");

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/products?seller_id=${storedUser.id}`, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            setProducts(res.data);
        } catch (err) {
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (storedUser?.id) fetchProducts();
    }, [storedUser?.id]);

    const handleDelete = async (id) => {
        const token = getToken();

        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSnackbar("Product deleted successfully.");
            fetchProducts(); // Refresh product list
        } catch (err) {
            console.error("Delete error:", err);
            setSnackbar("Failed to delete product.");
        } finally {
            // Auto-close snackbar
            setTimeout(() => setSnackbar(null), 3000);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen text-black">
            <NavigationBar />
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-6">Welcome, {storedUser?.name || "Seller"}!</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">Profile Info</h2>
                        <p><strong>Email:</strong> {storedUser?.email}</p>
                        <p><strong>Status:</strong> {storedUser?.is_approved}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">Product Management</h2>
                        <p>Manage your livestock listings.</p>
                        <button
                            onClick={() => router.push("/add-product")}
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Add New Product
                        </button>
                    </div>
                </div>

                {/* Product Table */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Your Products</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : products.length === 0 ? (
                        <p>No products listed yet.</p>
                    ) : (
                        <table className="w-full table-auto border">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 border">Name</th>
                                    <th className="px-4 py-2 border">Price</th>
                                    <th className="px-4 py-2 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="text-center">
                                        <td className="px-4 py-2 border">{product.name}</td>
                                        <td className="px-4 py-2 border">{product.price}</td>
                                        <td className="px-4 py-2 border">
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Snackbar Notification */}
            {snackbar && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity">
                    {snackbar}
                </div>
            )}

            <Footer />
        </div>
    );
}
