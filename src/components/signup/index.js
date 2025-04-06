"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Snackbar, Alert } from "@mui/material";
import NavigationBar from "../navigation-bar";
import Footer from "../footer";

export default function Signup() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("buyer"); // ✅ Default role to "buyer"
    const [error, setError] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                name,
                email,
                password,
                role,
            });

            if (res.status === 201) {
                setSnackbarOpen(true);

                // ✅ If supplier, show approval message
                if (role === "seller") {
                    setTimeout(() => router.push("/waiting-for-approval"), 2000);
                } else {
                    setTimeout(() => router.push("/login"), 2000);
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="bg-gray-100">
            <NavigationBar />
            <div className="min-h-screen flex flex-col justify-center items-center text-black">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-bold mb-4">Signup</h2>
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded mb-4" />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded mb-4" />
                    <input type="password" placeholder="Create password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded mb-4" />
                    <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 border rounded mb-4" />

                    {/* ✅ Role Selection */}
                    <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 border rounded mb-4">
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                    </select>

                    <button className="w-full bg-blue-500 text-white py-2 rounded" onClick={handleSignup}>Signup</button>

                    <p className="text-center mt-4">
                        Already have an account? <Link href="/login" className="text-blue-500">Login</Link>
                    </p>
                </div>
            </div>
            <Footer />

            {/* ✅ Snackbar Notification */}
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
                    {role === "seller" ? "Seller account created. Waiting for admin approval!" : "Account created successfully! Redirecting..."}
                </Alert>
            </Snackbar>
        </div>
    );
}
