"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import NavigationBar from "../navigation-bar";
import Footer from "../footer";
import Card from "../card";
import { getUser } from "@/utils";

export default function Home() {
    const [sellers, setSellers] = useState([]); // ✅ Store seller list
    const [loading, setLoading] = useState(true); // ✅ Loading state
    const [error, setError] = useState(""); // ✅ Error handling
    const user = getUser()
    console.log({ user })
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
            <Head>
                <title>Meat Bazar - Home</title>
                <meta name="description" content="Online marketplace for halal meat" />
            </Head>
            <NavigationBar />
            <div className="min-h-screen">
                <section className="relative text-center text-white py-16 bg-cover bg-center" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
                    <h2 className="text-3xl font-semibold">Welcome to Meat Bazar</h2>
                    <p className="text-lg italic">Quality Halal Meat, Straight from the Farm</p>
                </section>
                <main className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-4 bg-blue-200 py-2 inline-block px-6 rounded-full">Top Farm</h3>

                    {loading && <p className="text-gray-600">Loading sellers...</p>}

                    {error && <p className="text-red-500">{error}</p>}

                    {< div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {sellers.map((seller) => (
                            <Card
                                key={seller._id}
                                id={seller._id}
                                name={seller.name}
                                photo="/farm.jpg" // ✅ Placeholder image (replace with actual seller images later)
                                buttonLabel="Visit Store"
                                href={`/product-list/${seller._id}`} // ✅ Dynamic seller page
                                chatLink={`/chat/${seller._id}/${user?.id}`} // ✅ Dynamic seller page
                            />
                        ))}
                    </div>}
                </main>
            </div >
            <Footer />
        </div >
    );
}
