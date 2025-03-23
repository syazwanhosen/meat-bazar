import { useState } from "react";
import NavigationBar from "../navigation-bar";
import Footer from "../footer";

export default function Checkout() {
    const [order, setOrder] = useState({
        address: "",
        phone: "",
        quantity: 1,
        total: 570.0,
        deliveryFee: 4.0,
        paymentMethod: "Cash on Delivery",
    });

    const handleInputChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    const handleQuantityChange = (value) => {
        let newQuantity = order.quantity + value;
        if (newQuantity < 1) newQuantity = 1;
        setOrder({ ...order, quantity: newQuantity, total: newQuantity * 570.0 });
    };

    const handlePaymentChange = (e) => {
        setOrder({ ...order, paymentMethod: e.target.value });
    };

    const handleConfirm = () => {
        alert("Order Confirmed!");
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <NavigationBar />

            {/* Checkout Section */}
            <div className="relative flex justify-center items-center min-h-screen">
                <img src="/farm-background.jpg" alt="Farm Background" className="w-full h-full object-cover absolute" />
                <div className="relative  p-6 rounded-lg shadow-lg w-2/3 flex justify-between text-black">
                    {/* Left Section - Address and Payment */}
                    <div className="w-1/2 p-4">
                        <h2 className="text-lg font-bold mb-4">Details</h2>
                        <div>
                            <label className="block text-sm font-semibold">Address:</label>
                            <input
                                type="text"
                                name="address"
                                value={order.address}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="mt-2">
                            <label className="block text-sm font-semibold">Phone Number:</label>
                            <input
                                type="text"
                                name="phone"
                                value={order.phone}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <h2 className="text-lg font-bold mt-4">Payment Option</h2>
                        <div className="mt-2">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Cash on Delivery"
                                    checked={order.paymentMethod === "Cash on Delivery"}
                                    onChange={handlePaymentChange}
                                />
                                <span>Cash on Delivery</span>
                            </label>
                            <label className="flex items-center space-x-2 mt-2">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Credit / Debit Card"
                                    onChange={handlePaymentChange}
                                    disabled
                                />
                                <span className="text-gray-500">Credit / Debit Card (Currently not available)</span>
                            </label>
                        </div>
                    </div>

                    {/* Right Section - Order Summary */}
                    <div className="w-1/2 p-4">
                        <h2 className="text-lg font-bold mb-4">My Order (1)</h2>
                        <div className="flex items-center space-x-2">
                            <button
                                className="bg-gray-300 px-2 py-1 rounded"
                                onClick={() => handleQuantityChange(-1)}
                            >-</button>
                            <span>{order.quantity}</span>
                            <button
                                className="bg-gray-300 px-2 py-1 rounded"
                                onClick={() => handleQuantityChange(1)}
                            >+</button>
                            <span className="ml-4">Kadah-Kelantan Cow</span>
                        </div>
                        <div className="mt-2 flex justify-between text-sm">
                            <a href="#" className="text-red-500">Edit</a>
                            <a href="#" className="text-red-500">Remove</a>
                        </div>

                        <h2 className="text-lg font-bold mt-4">Order Notes</h2>
                        <textarea className="w-full p-2 border rounded h-16"></textarea>

                        <div className="mt-4">
                            <p>Total: RM {order.total.toFixed(2)}</p>
                            <p>Delivery Fee: RM {order.deliveryFee.toFixed(2)}</p>
                        </div>

                        <button
                            onClick={handleConfirm}
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
                        >CONFIRM</button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};
