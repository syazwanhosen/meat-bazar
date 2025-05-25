"use client";

import { useRouter } from "next/navigation";
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";

export default function SellerDashboard() {
    const router = useRouter();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="bg-gray-100 min-h-screen text-black">
            <NavigationBar />
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-6">Welcome, {storedUser?.name || "Seller"}!</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">Profile Info</h2>
                        <p><strong>Email:</strong> {storedUser?.email}</p>
                        <p><strong>Status:</strong> {storedUser?.is_approved}</p>
                        {/* Add more profile details if needed */}
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
            </div>
            <Footer />
        </div>
    );
}
