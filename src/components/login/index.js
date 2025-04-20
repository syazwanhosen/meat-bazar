"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import useRouter
import AuthContext from "../../context/AuthContext";
import Link from "next/link";
import NavigationBar from "../navigation-bar";
import Footer from "../footer";

// Login Page
export default function Login() {
    const router = useRouter(); // ✅ Initialize useRouter()
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // ✅ State for error messages

    const handleLogin = async () => {
        setErrorMessage(""); // ✅ Clear previous errors before login attempt

        try {
            const res = await login(email, password);
            if (res.user.role === 'buyer') {
                router.push("/seller-list"); // ✅ Redirect after successful login
            } else if (res.user.role === 'admin') {
                router.push("/admin-dashboard"); // ✅ Redirect after successful login
            } else if (res.user.role === 'seller') {
                if (res.user.is_approved === "approved") router.push("/"); // ✅ Redirect after successful login
                else if (res.user.is_approved === "rejected") router.push("/application-rejected"); // ✅ Redirect after successful login
                else router.push("/waiting-for-approval"); // ✅ Redirect after successful login
            } else {
                setErrorMessage("Invalid email or password"); // ✅ Set error if login fails

            }
        } catch (err) {
            setErrorMessage(err.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="bg-gray-100">
            <NavigationBar />
            <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center text-black" style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundSize: "cover" }}>
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-bold mb-4">Login</h2>

                    {/* ✅ Show error message if login fails */}
                    {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded mb-4" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded mb-4" />
                    <button className="w-full bg-blue-500 text-white py-2 rounded" onClick={handleLogin}>Login</button>

                    <p className="text-center mt-4">
                        Don't have an account? <Link href="/signup" className="text-blue-500">Sign up</Link>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
