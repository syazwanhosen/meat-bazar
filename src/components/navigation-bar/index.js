"use client"
import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useRouter } from "next/navigation"; // ✅ Import useRouter
import { getUser, getToken } from "@/utils";

export default function NavigationBar() {
    const isLoggedIn = getToken()
    const isSupplier = getUser()
    const router = useRouter(); // ✅ Initialize useRouter()
    console.log({ isSupplier })
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
        router.push("/login");
    }

    return (
        <header className="bg-blue-300 text-white p-4 flex justify-between items-center shadow-md">
            <h1 className="text-2xl font-bold">MeatBazar</h1>
            <nav>
                <ul className="flex space-x-6">
                    <li><Link href={`${isLoggedIn && isSupplier.role === "seller" && (isSupplier.is_approved === "approved") ? '/seller-dashboard' : '/'}`} className="hover:underline">Home</Link></li>
                    <li><Link href="/seller-list" className="hover:underline">Seller List</Link></li>
                    <li><Link href="/promotion" className="hover:underline">Promotion</Link></li>
                    <li><Link href="/news" className="hover:underline">News</Link></li>
                    <li><Link href="/halal-certificate" className="hover:underline">Halal Certificate</Link></li>
                    {isLoggedIn && isSupplier.role === "seller" && (isSupplier.is_approved === "approved") && <li><Link href="/edit-profile" className="hover:underline">Edit Profile</Link></li>}
                    {isLoggedIn && isSupplier.role === "seller" && (isSupplier.is_approved === "approved") && <li><Link href="/add-product" className="hover:underline">Add Product</Link></li>}
                </ul>
            </nav>
            <div className="flex space-x-4">
                {isLoggedIn ? <button onClick={handleLogout}>Logout</button> : <button className="bg-white text-blue-600 px-4 py-2 rounded"><Link href="/login">👤</Link></button>}
            </div>
        </header>
    )
}
