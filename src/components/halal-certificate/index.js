"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../footer";
import NavigationBar from "../navigation-bar";

export default function HalalCertificate() {
    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState("");
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ✅ Fetch supplier list on mount
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/user/sellers");
                setSuppliers(res.data);
                if (res.data.length > 0) {
                    setSelectedSupplier(res.data[0]._id);
                }
            } catch (err) {
                setError("Failed to load suppliers.");
            }
        };
        fetchSuppliers();
    }, []);

    // ✅ Fetch certificates based on selected supplier
    useEffect(() => {
        if (!selectedSupplier) return;

        const fetchCertificates = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:5000/api/halal-certificates?supplierId=${selectedSupplier}`);
                setCertificates(res.data);
            } catch (err) {
                setError("Failed to load certificates.");
            } finally {
                setLoading(false);
            }
        };
        fetchCertificates();
    }, [selectedSupplier]);

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <NavigationBar />
            <div className="flex flex-col items-center justify-center flex-grow p-6">
                <h1 className="text-3xl font-bold mb-4 text-black">Halal Certificates by Supplier</h1>

                {/* ✅ Supplier dropdown */}
                <select
                    value={selectedSupplier}
                    onChange={(e) => setSelectedSupplier(e.target.value)}
                    className="mb-6 p-2 border rounded bg-white text-black font-semibold"
                >
                    {suppliers.map((supplier) => (
                        <option key={supplier._id} value={supplier._id}>
                            {supplier.name}
                        </option>
                    ))}
                </select>

                {loading && <p className="text-black">Loading certificates...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                    {certificates.length ? certificates.map((cert) => (
                        <div key={cert._id} className="bg-white rounded-lg shadow-lg p-4">
                            <p className="font-semibold mb-2 text-black">
                                Supplier: {cert.userId?.name || "Unknown"}
                            </p>

                            {/* ✅ File type display logic */}
                            {(() => {
                                const fileUrl = `http://localhost:5000/${cert.filePath}`;
                                const extension = cert.filePath.split(".").pop().toLowerCase();

                                if (["jpg", "jpeg", "png", "webp", "gif"].includes(extension)) {
                                    return (
                                        <img
                                            src={fileUrl}
                                            alt="Halal Certificate"
                                            className="w-full h-64 object-contain border rounded"
                                        />
                                    );
                                }

                                if (extension === "pdf") {
                                    return (
                                        <iframe
                                            src={fileUrl}
                                            className="w-full h-64 border rounded"
                                            title="PDF Certificate"
                                        />
                                    );
                                }

                                return (
                                    <a
                                        href={fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        View / Download Certificate ({extension.toUpperCase()})
                                    </a>
                                );
                            })()}
                        </div>
                    )) : <p className="text-black">No certificate is found</p>}
                </div>
            </div>
            <Footer />
        </div>
    );
}
