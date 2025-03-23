import Link from "next/link";
import NavigationBar from "../navigation-bar";
import Footer from "../footer";

// Login Page
export default function Login() {
    return (
        <div className="bg-gray-100">

            <NavigationBar />
            <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center text-black" style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundSize: "cover" }}>
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-bold mb-4">Login</h2>
                    <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-4" />
                    <input type="password" placeholder="Password" className="w-full p-2 border rounded mb-4" />
                    <button className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
                    <p className="text-center mt-4">Don't have an account? <Link href="/signup" className="text-blue-500">Sign up</Link></p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
