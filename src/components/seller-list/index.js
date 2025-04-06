"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "../navigation-bar";
import Footer from "../footer";
import Card from "../card";

export default function SellerList() {
    const [sellers, setSellers] = useState([]); // ✅ Store seller list
    const [loading, setLoading] = useState(true); // ✅ Loading state
    const [error, setError] = useState(""); // ✅ Error handling

    useEffect(() => {
        const fetchSellers = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/user/sellers");
                setSellers(res.data);
            } catch (err) {
                setError("Failed to load sellers");
            } finally {
                setLoading(false);
            }
        };
        fetchSellers();
    }, []);

    return (
        <div className="bg-gray-100">
            <NavigationBar />
            <div className="min-h-screen p-6 text-center">
                <h2 className="text-2xl font-semibold mb-4">Top Sellers</h2>

                {/* ✅ Show loading state */}
                {loading && <p className="text-gray-600">Loading sellers...</p>}

                {/* ✅ Show error message if fetch fails */}
                {error && <p className="text-red-500">{error}</p>}

                {/* ✅ Show sellers if data is available */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {sellers.length > 0 ? (
                        sellers.map((seller) => (
                            <Card
                                key={seller._id}
                                id={seller._id}
                                name={seller.name}
                                photo="/farm.jpg" // ✅ Placeholder image (replace with actual seller images later)
                                buttonLabel="Visit Store"
                                href={`/product-list/${seller._id}`} // ✅ Dynamic seller page
                            />
                        ))
                    ) : (
                        !loading && <p className="text-gray-500">No sellers found.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
