"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../card";
import Footer from "../footer";
import NavigationBar from "../navigation-bar";

export default function SellerProductList({ sellerId }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSellerProducts = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem("user"));
                const res = await axios.get(`http://localhost:5000/api/products/seller/${sellerId}`);
                const formatted = res.data.map((product) => {
                    return {
                        id: product._id,
                        name: product.name,
                        photo: `http://localhost:5000${product.image}`,
                        buttonLabel: !storedUser?.role ? "" : storedUser.role === "buyer" ? "Add to cart" : storedUser.id === product.seller._id ? "Edit Product" : null,
                        href: !storedUser?.role ? "" : storedUser.role === "buyer" ? `/checkout//${product._id}` : `/edit-product/${product._id}`,
                        itemList: [
                            { id: 1, name: `Height: ${product.height || "N/A"}` },
                            { id: 2, name: `Length: ${product.length || "N/A"}` },
                            { id: 3, name: `Weight: ${product.weight} kg` },
                            { id: 4, name: `Price per kg: RM ${product.price}` },
                            { id: 5, name: `Total: RM ${product.weight * product.price}` },
                            { id: 6, name: `Halal: ${product.halalCertified ? "Yes" : "No"}` },
                            { id: 7, name: `Delivery Time: ${product.deliveryTime ? new Date(product.deliveryTime).toLocaleDateString() : "N/A"}` },
                            { id: 8, name: `Date Added: ${product.createdAt ? new Date(product.createdAt).toLocaleDateString() : "N/A"}` }
                        ]
                    }
                });
                setProducts(formatted);
            } catch (error) {
                console.error("Error fetching seller's products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSellerProducts();
    }, [sellerId]);

    return (
        <div className="bg-gray-100">
            <NavigationBar />
            <div className="min-h-screen p-6">
                {loading ? (
                    <p className="text-center text-gray-500">Loading products...</p>
                ) : products.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg">No products found for this seller.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Card key={product.id} {...product} />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
