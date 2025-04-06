"use client";
import Link from "next/link";
import NavigationBar from "../navigation-bar";
import Footer from "../footer";

export default function WaitingForApproval() {
    return (
        <div >
            <NavigationBar />
            <div className="min-h-screen bg-white p-8 rounded-lg shadow-lg text-center text-black">
                <h2 className="text-2xl font-bold mb-4">Waiting for Admin Approval</h2>
                <p>Your seller account is under review. You will be notified once approved.</p>
                <p className="mt-4">Meanwhile, you can go back to <Link href="/" className="text-blue-500">Home</Link></p>
            </div>
            <Footer />
        </div>
    );
}
