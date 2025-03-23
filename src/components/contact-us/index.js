import { useState } from "react";
import NavigationBar from "../navigation-bar";
import Footer from "../footer";

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message Sent Successfully!");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <NavigationBar />

            {/* Contact Us Form Section */}
            <div className="relative flex justify-center items-center min-h-screen text-black">
                <img src="/farm-background.jpg" alt="Farm Background" className="w-full h-full object-cover absolute" />
                <div className="relative  p-6 rounded-lg shadow-lg w-1/3">
                    <h2 className="text-center font-bold text-xl mb-4">Contact Us</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold">Message:</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-2 border rounded h-24"
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="bg-orange-400 text-white px-4 py-2 rounded w-full">
                            Send
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
};

