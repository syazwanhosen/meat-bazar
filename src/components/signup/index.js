import Link from "next/link";
import NavigationBar from "../navigation-bar";
import Footer from "../footer";

export default function Signup() {
    return (
        <div className="bg-gray-100 ">
            <NavigationBar />
            <div className="min-h-screen flex flex-col justify-center items-center text-black" style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundSize: "cover" }}>
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-bold mb-4">Signup</h2>
                    <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-4 " />
                    <input type="password" placeholder="Create password" className="w-full p-2 border rounded mb-4" />
                    <input type="password" placeholder="Confirm password" className="w-full p-2 border rounded mb-4" />
                    <button className="w-full bg-blue-500 text-white py-2 rounded">Signup</button>
                    <p className="text-center mt-4">Already have an account? <Link href="/login" className="text-blue-500">Login</Link></p>
                </div>
            </div>
            <Footer />
        </div>
    );
}