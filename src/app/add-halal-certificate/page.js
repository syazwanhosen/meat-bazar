"use client";

import { useState } from "react";
import axios from "axios";
import Head from "next/head";
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";

const HalalCertificateForm = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        const storedUser = typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("user") || "{}")
            : null;

        e.preventDefault();
        if (!file) {
            setMessage("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("certificate", file);
        formData.append("userId", storedUser?.id);

        try {
            const response = await axios.post("http://localhost:5000/api/halal-certificates", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage("Upload successful!");
        } catch (err) {
            setMessage("Upload failed.");
        }
    };

    return (
        <div className="bg-gray-100">
            <Head>
                <title>Meat Bazar - Home</title>
                <meta name="description" content="Online marketplace for halal meat" />
            </Head>
            <NavigationBar />
            <div className=" flex justify-center items-center mt-20">
                <form onSubmit={handleSubmit} className="min-h-screen" >
                    <h2 className="text-lg font-bold text-black mb-2">Upload Halal Certificate</h2>
                    <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mb-2 text-black " />
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded text-black ">Upload</button>
                    {message && <p className="mt-2 text-sm text-black ">{message}</p>}
                </form>
            </div>
            <Footer />
        </div >
    );
};

export default HalalCertificateForm;
