"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../footer";
import NavigationBar from "../navigation-bar";

export default function HalalCertificate() {
    const [farms, setFarms] = useState([]); // ✅ Store available farms
    const [selectedFarm, setSelectedFarm] = useState(""); // ✅ Selected farm
    const [certificate, setCertificate] = useState(null); // ✅ Store Halal Certificate
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ✅ Fetch Product List (Farms)
    useEffect(() => {
        const fetchFarms = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products"); // ✅ Get all farms/products
                setFarms(res.data);
                if (res.data.length > 0) {
                    setSelectedFarm(res.data[0]._id); // ✅ Select first farm by default
                }
            } catch (err) {
                setError("Failed to load farms");
            }
        };
        fetchFarms();
    }, []);

    // ✅ Fetch Halal Certificate when farm changes
    useEffect(() => {
        if (!selectedFarm) return;

        const fetchCertificate = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${selectedFarm}`);
                const certificatePath = res.data.image;

                // ✅ Ensure the full URL for the image
                if (certificatePath) {
                    setCertificate(`http://localhost:5000${certificatePath}`);
                } else {
                    setCertificate(null);
                }
            } catch (err) {
                setCertificate(null);
                setError("Failed to load certificate");
            } finally {
                setLoading(false);
            }
        };
        fetchCertificate();
    }, [selectedFarm]);

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <NavigationBar />
            <div className="flex flex-col items-center justify-center flex-grow p-6">
                <div className="relative w-full max-w-4xl">
                    <img src="/farm-background.jpg" alt="Farm Background" className="w-full h-80 object-cover rounded-lg shadow-lg" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-black bg-white/60 p-6 rounded-lg">
                        {/* ✅ Farm Selection Dropdown */}
                        <select
                            className="bg-green-300 px-4 py-2 rounded text-black font-bold"
                            value={selectedFarm}
                            onChange={(e) => setSelectedFarm(e.target.value)}
                        >
                            {farms.map((farm) => (
                                <option key={farm._id} value={farm._id}>
                                    {farm.name}
                                </option>
                            ))}
                        </select>

                        <h1 className="text-2xl font-bold mt-4">
                            Halal Certificate of {farms.find(f => f._id === selectedFarm)?.name || "Selected Farm"}
                        </h1>

                        {/* ✅ Show loading, error, or certificate */}
                        <div className="mt-4 p-4 border-2 border-blue-600 bg-white w-full max-w-lg rounded-lg shadow-lg">
                            {loading && <p className="text-gray-600">Loading certificate...</p>}
                            {error && <p className="text-red-500">{error}</p>}
                            {certificate ? (
                                <img src={certificate} alt="Halal Certificate" className="w-full h-auto max-h-96 rounded-lg border border-gray-300 shadow" />
                            ) : (
                                !loading && <p className="text-gray-600">No Halal Certificate available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
